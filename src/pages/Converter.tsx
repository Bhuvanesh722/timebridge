import { Copy, Link, Plus, RefreshCcw, Share2, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SelectZone } from "../components/SelectZone";
import { friendlyLabel, zoneMap } from "../data/timeZones";
import { ambiguousWarning, abbreviation, dateBadge, dateLabel, dateTimeToInstant, formatInZone, offsetLabel, timeOnly } from "../lib/time";
import { copyText, rememberRecent, shareText } from "../lib/share";
import type { ConversionPreset, Preferences, TimeFormat } from "../types";

type ConverterProps = {
  prefs: Preferences;
  setPrefs: React.Dispatch<React.SetStateAction<Preferences>>;
  setToast: (value: string) => void;
  activePreset: ConversionPreset | null;
};

export function Converter({ prefs, setPrefs, setToast, activePreset }: ConverterProps) {
  const today = new Date().toISOString().slice(0, 10);
  const params = new URLSearchParams(location.search);
  const [sourceZone, setSourceZone] = useState(activePreset?.source ?? (params.get("source") && zoneMap.has(params.get("source")!) ? params.get("source")! : "Asia/Kolkata"));
  const [sourceQuery, setSourceQuery] = useState("India");
  const [date, setDate] = useState(params.get("date") ?? today);
  const [time, setTime] = useState(params.get("time") ?? "21:00");
  const [targets, setTargets] = useState(() => {
    const urlTargets = params.get("targets")?.split(",").map(decodeURIComponent).filter((id) => zoneMap.has(id));
    return activePreset?.targets ?? (urlTargets?.length ? urlTargets : ["America/New_York", "America/Los_Angeles", "Europe/London", "Asia/Dubai"]);
  });
  const [targetZone, setTargetZone] = useState("Asia/Singapore");
  const [targetQuery, setTargetQuery] = useState("");
  const instant = useMemo(() => dateTimeToInstant(date, time, sourceZone), [date, time, sourceZone]);
  const warning = ambiguousWarning(sourceQuery || targetQuery, sourceZone, instant) || targets.map((id) => ambiguousWarning(targetQuery, id, instant)).find(Boolean);
  const lines = targets.map((id) => `${zoneMap.get(id)?.city}: ${formatInZone(instant, id, prefs.timeFormat)} ${abbreviation(instant, id)}`);
  const whatsapp = `Meeting time:\n${zoneMap.get(sourceZone)?.city}: ${formatInZone(instant, sourceZone, prefs.timeFormat)} ${abbreviation(instant, sourceZone)}\n${lines.join("\n")}`;
  const email = `Hi,\n\nPlease find the meeting time across time zones:\n\n* ${zoneMap.get(sourceZone)?.city}: ${formatInZone(instant, sourceZone, prefs.timeFormat)} ${abbreviation(instant, sourceZone)}\n${lines.map((line) => `* ${line}`).join("\n")}\n\nThanks.`;
  const short = `${timeOnly(instant, sourceZone, prefs.timeFormat)} ${abbreviation(instant, sourceZone)} = ${targets.map((id) => `${timeOnly(instant, id, prefs.timeFormat)} ${abbreviation(instant, id)}`).join(" = ")}`;
  const shareUrl = `${location.origin}${location.pathname}?source=${encodeURIComponent(sourceZone)}&date=${date}&time=${time}&targets=${targets.map(encodeURIComponent).join(",")}`;

  useEffect(() => {
    if (!activePreset) return;
    setSourceZone(activePreset.source);
    setTargets(activePreset.targets);
    setSourceQuery(zoneMap.get(activePreset.source)?.city ?? "");
  }, [activePreset]);

  const changeSourceZone = (id: string) => {
    setSourceZone(id);
    rememberRecent(id, setPrefs);
  };

  const addTargetZone = () => {
    if (targets.includes(targetZone)) return;
    setTargets([...targets, targetZone]);
    rememberRecent(targetZone, setPrefs);
  };

  return (
    <section className="toolLayout">
      <div className="panel">
        <h2>{activePreset?.title ?? "Time Converter"}</h2>
        {activePreset && <p className="toolIntro">{activePreset.description}</p>}
        <div className="formGrid">
          <SelectZone value={sourceZone} onChange={changeSourceZone} label="Source time zone" query={sourceQuery} setQuery={setSourceQuery} />
          <label className="field"><span>Date</span><input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
          <label className="field"><span>Time</span><input type="time" value={time} onChange={(event) => setTime(event.target.value)} /></label>
          <label className="field"><span>Format</span><select value={prefs.timeFormat} onChange={(event) => setPrefs((current) => ({ ...current, timeFormat: event.target.value as TimeFormat }))}><option value="12h">12-hour</option><option value="24h">24-hour</option></select></label>
        </div>
        <div className="addRow">
          <SelectZone value={targetZone} onChange={setTargetZone} label="Add target zone" query={targetQuery} setQuery={setTargetQuery} />
          <button className="primary compact" onClick={addTargetZone}><Plus size={18} /> Add</button>
        </div>
        {prefs.recentTimeZones.length > 0 && (
          <div className="recentRow">
            <span>Recent</span>
            {prefs.recentTimeZones.map((id) => (
              <button key={id} onClick={() => { setTargetZone(id); setTargetQuery(zoneMap.get(id)?.city ?? ""); }}>{zoneMap.get(id)?.city ?? id}</button>
            ))}
          </div>
        )}
        {warning && <div className="warning">{warning}</div>}
      </div>

      <div className="resultsGrid">
        {targets.map((id) => (
          <article key={id} className="card resultCard">
            <button className="remove" onClick={() => setTargets(targets.filter((target) => target !== id))} aria-label={`Remove ${friendlyLabel(id)}`}><Trash2 size={17} /></button>
            <span className={`badge ${dateBadge(date, instant, id).toLowerCase()}`}>{dateBadge(date, instant, id)}</span>
            <h3>{zoneMap.get(id)?.city}</h3>
            <strong>{timeOnly(instant, id, prefs.timeFormat)}</strong>
            <p>{dateLabel(instant, id)}</p>
            <small>{zoneMap.get(id)?.label} - {abbreviation(instant, id)} - {offsetLabel(instant, id)}</small>
          </article>
        ))}
      </div>

      <div className="actionBar">
        <button onClick={() => copyText(whatsapp, setToast)}><Copy size={18} /> WhatsApp</button>
        <button onClick={() => copyText(email, setToast)}><Copy size={18} /> Email</button>
        <button onClick={() => copyText(short, setToast)}><Copy size={18} /> Short</button>
        <button onClick={() => copyText(shareUrl, setToast)}><Link size={18} /> Share URL</button>
        <button onClick={() => shareText("TimeBridge conversion", `${whatsapp}\n\n${shareUrl}`, setToast)}><Share2 size={18} /> Share</button>
        <button onClick={() => { setDate(today); setTime("21:00"); setSourceZone("Asia/Kolkata"); }}><RefreshCcw size={18} /> Reset</button>
      </div>
    </section>
  );
}
