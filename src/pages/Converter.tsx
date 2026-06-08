import { Copy, Link, Plus, RefreshCcw, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SelectZone } from "../components/SelectZone";
import { friendlyLabel, zoneMap } from "../data/timeZones";
import { ambiguousWarning, abbreviation, dateBadge, dateLabel, dateTimeToInstant, formatInZone, offsetLabel, timeOnly } from "../lib/time";
import { copyText, rememberRecent } from "../lib/share";
import type { ConversionPreset, Preferences, TimeFormat } from "../types";

type ConverterProps = {
  prefs: Preferences;
  setPrefs: React.Dispatch<React.SetStateAction<Preferences>>;
  setToast: (value: string) => void;
  activePreset: ConversionPreset | null;
};

const presetGuides: Record<string, React.ReactNode> = {
  "ist-to-et": (
    <>
      <article className="contentBlock">
        <h2>IST to Eastern Time: understanding the seasonal offset</h2>
        <p>
          India Standard Time (IST) is UTC+5:30 throughout the entire year. India does not observe
          daylight saving time, so IST is always the same fixed offset. The US East Coast, however,
          switches between Eastern Standard Time (EST, UTC-5) from the first Sunday in November
          through the second Sunday in March, and Eastern Daylight Time (EDT, UTC-4) for the
          rest of the year. The IST-to-ET gap is therefore 10 hours and 30 minutes in winter
          and 9 hours and 30 minutes in summer.
        </p>
        <p>
          A 9:00 PM IST call in January equals 7:30 AM EST in New York. The same 9:00 PM IST call
          in June equals 8:30 AM EDT — one hour later in New York because the US has moved its
          clocks forward. If you have a recurring weekly call at a fixed IST time, expect it to
          shift by one hour for US East Coast colleagues each time the DST transition occurs,
          typically around the second Sunday in March and the first Sunday in November.
        </p>
      </article>
      <article className="contentBlock">
        <h2>Best call times for India and New York</h2>
        <p>
          The most comfortable India-East Coast overlap window is between 7:30 PM and 11:00 PM IST
          in winter (EST), which corresponds to 9:00 AM–12:30 PM EST in New York. In summer (EDT),
          the same New York morning window maps to 6:30 PM–10:00 PM IST. Both allow normal
          afternoon work for India and a standard morning in New York. Calls scheduled after
          2:00 PM ET push past 11:00 PM IST in winter, which is sustainable occasionally but
          becomes tiring as a daily or weekly pattern.
        </p>
        <p>
          For teams that need an early IST start instead, a 6:30 AM IST call equals 9:00 PM EST the
          previous evening in New York — sometimes used by global teams when the US East Coast
          needs a late-day slot. The date badge in the converter above will show "Yesterday" or
          "Tomorrow" for results that cross the calendar day boundary, helping you catch these
          shifts before sending an invite.
        </p>
      </article>
      <article className="contentBlock">
        <h2>Why EST and EDT both matter for Indian scheduling</h2>
        <p>
          Indian professionals sometimes use "EST" to refer to US Eastern time year-round, but EST
          technically only applies from November to March. The rest of the year the US East Coast
          observes EDT, which is UTC-4 instead of UTC-5. Using a fixed "EST offset" in summer
          will give a result that is one hour off. The IANA identifier America/New_York covers
          both periods automatically, applying the right offset for any date entered. TimeBridge
          uses city-based zone selection for exactly this reason, so you do not have to remember
          which abbreviation is active for a given date.
        </p>
      </article>
    </>
  ),
  "ist-to-pt": (
    <>
      <article className="contentBlock">
        <h2>IST to Pacific Time: the largest common India-US gap</h2>
        <p>
          India Standard Time is 13 hours and 30 minutes ahead of Pacific Standard Time (PST, UTC-8)
          from early November through mid-March, and 12 hours and 30 minutes ahead of Pacific Daylight
          Time (PDT, UTC-7) from mid-March through early November. This is the widest time gap in
          everyday India-US business scheduling. When it is 9:00 PM IST in India, it is 7:30 AM PST
          in Los Angeles in winter — or 8:30 AM PDT in summer. The entire standard US West Coast
          working day (9 AM–6 PM) falls between 10:30 PM and 7:30 AM IST in winter, almost entirely
          outside normal Indian working hours.
        </p>
        <p>
          The most commonly used window for India-West Coast meetings is 8:00–9:00 AM PST, which
          maps to 9:30–10:30 PM IST in winter or 8:30–9:30 PM IST in summer. This slot is early
          for Los Angeles but manageable as a daily standup, and stays before midnight in India.
          For teams that cannot agree on a shared window, rotating the inconvenient slot between
          participants on a weekly basis distributes the burden more fairly.
        </p>
      </article>
      <article className="contentBlock">
        <h2>PST vs PDT: the seasonal shift for Indian teams</h2>
        <p>
          Like the US East Coast, US Pacific time switches between PST (UTC-8) in winter and PDT
          (UTC-7) in summer. The transition happens on the second Sunday in March (spring forward)
          and the first Sunday in November (fall back). For Indian professionals, the gap shrinks
          by one hour in March: a 9:00 AM PST call that maps to 10:30 PM IST in January maps to
          9:30 PM IST by late March. The reverse happens in November, when the gap widens again.
        </p>
        <p>
          Around each DST transition, any manually calculated recurring schedule needs to be
          verified. Using the converter above with the specific date ensures the correct offset is
          applied. The abbreviation shown in the result (PST or PDT) confirms which offset the
          converter has applied for that date.
        </p>
      </article>
    </>
  ),
  "ist-to-london": (
    <>
      <article className="contentBlock">
        <h2>IST to London time: GMT, BST, and the seasonal offset</h2>
        <p>
          India Standard Time (UTC+5:30) is 5 hours and 30 minutes ahead of Greenwich Mean Time
          (GMT, UTC+0), which the UK observes in winter from the last Sunday in October through
          the last Sunday in March. During British Summer Time (BST, UTC+1), from the last Sunday
          in March to the last Sunday in October, the gap narrows to 4 hours and 30 minutes.
          A 9:00 AM GMT meeting in London in January is 2:30 PM IST. The same 9:00 AM meeting
          in London in June is 1:30 PM IST — one hour earlier in India because the UK has
          moved its clocks forward.
        </p>
        <p>
          India-UK scheduling has much better work-hour overlap than India-US scheduling. Morning
          and early afternoon in London (9:00 AM–3:00 PM GMT) maps to 2:30 PM–8:30 PM IST in
          winter. The whole window falls within a normal working day for India. The afternoon
          UK window (1:00 PM–5:00 PM GMT) is 6:30 PM–10:30 PM IST in winter — workable for
          Indian teams, though it extends into the evening.
        </p>
      </article>
      <article className="contentBlock">
        <h2>Scheduling around UK DST transitions</h2>
        <p>
          The UK's DST transition date is the last Sunday of March (spring forward, GMT to BST)
          and the last Sunday of October (fall back, BST to GMT). The US switches on the second
          Sunday in March and first Sunday in November, which are different dates. This means
          there is typically a 1–3 week window each spring where the UK has already changed its
          clocks but the US has not (or vice versa), temporarily changing the India-UK and
          India-US gaps independently.
        </p>
        <p>
          For Indian professionals with calls to both US and UK counterparts, the two-to-three
          week window around late March is the most likely time for scheduling errors. Using the
          converter with the specific date for each timezone separately — rather than applying
          a remembered offset — ensures the right result for both parties, regardless of where
          each country is in its own seasonal switch.
        </p>
      </article>
    </>
  ),
  "ist-to-dubai": (
    <>
      <article className="contentBlock">
        <h2>IST to Dubai time: the smallest common India-international gap</h2>
        <p>
          India Standard Time (UTC+5:30) and Gulf Standard Time (GST, UTC+4) are only 1 hour and
          30 minutes apart — India is ahead. A meeting at 9:00 AM in Dubai is 10:30 AM in India.
          A 5:00 PM meeting in India is 3:30 PM in Dubai. Neither side needs to work outside
          normal business hours for any reasonable scheduling scenario, making India-UAE
          coordination the simplest of any common India-international timezone pair.
        </p>
        <p>
          The UAE does not observe daylight saving time. Gulf Standard Time is a fixed UTC+4
          throughout the year. India also does not observe DST. As a result, the 1.5-hour
          difference between IST and GST never changes. There are no seasonal transitions to
          account for, no DST dates to track, and no offset recalculations needed for recurring
          meetings. A standing weekly call at 10:00 AM IST is always 8:30 AM GST, in January
          and in August.
        </p>
      </article>
      <article className="contentBlock">
        <h2>Practical IST to Dubai conversion reference</h2>
        <p>
          Common reference points for IST-to-Dubai conversions: 8:00 AM GST = 9:30 AM IST.
          9:00 AM GST = 10:30 AM IST. 12:00 PM GST (noon) = 1:30 PM IST. 5:00 PM GST =
          6:30 PM IST. 8:00 AM IST = 6:30 AM GST. 12:00 PM IST = 10:30 AM GST.
          6:00 PM IST = 4:30 PM GST. These conversions are consistent throughout the year.
        </p>
        <p>
          Other Gulf cities sharing the same UTC+4 offset include Abu Dhabi, Sharjah, and
          Muscat in Oman. Bahrain, Qatar, and Saudi Arabia use UTC+3 (Arabia Standard Time),
          placing them 2 hours and 30 minutes behind IST. Kuwait City also observes UTC+3.
          For calls involving Saudi or Qatari counterparts, the calculation differs from
          Dubai: a 9:00 AM AST meeting is 11:30 AM IST.
        </p>
      </article>
    </>
  ),
  "ist-to-singapore": (
    <>
      <article className="contentBlock">
        <h2>IST to Singapore time: consistent India-APAC scheduling</h2>
        <p>
          Singapore Standard Time (SGT) is UTC+8, and India Standard Time is UTC+5:30. Singapore
          is 2 hours and 30 minutes ahead of India throughout the year. Neither country observes
          daylight saving time, so this gap is constant in every month. A 9:00 AM meeting in
          Singapore is 6:30 AM IST. A 10:00 AM IST meeting is 12:30 PM SGT. Most of the Indian
          workday (9:30 AM–5:30 PM IST) falls within the middle of the Singapore workday
          (12:00 PM–8:00 PM SGT), giving both teams a generous shared window.
        </p>
        <p>
          Because neither country changes clocks, India-Singapore scheduling requires no seasonal
          adjustment. The same conversion applies in January, April, August, and December. This
          consistency makes Singapore one of the most predictable timezone partners for Indian
          teams in technology, finance, and logistics. Recurring weekly calls do not shift after
          DST transitions, and there is no need to recalculate offsets twice a year.
        </p>
      </article>
      <article className="contentBlock">
        <h2>India and Southeast and East Asia timezone context</h2>
        <p>
          Singapore is in the UTC+8 timezone group, which also includes Malaysia, the Philippines,
          Hong Kong, and Taiwan. All of these are consistently 2.5 hours ahead of IST.
          China observes a single timezone (China Standard Time, CST, UTC+8) across its entire
          territory, so Beijing, Shanghai, and Chengdu are also 2.5 hours ahead of India.
          Japan and South Korea use UTC+9, placing them 3.5 hours ahead of IST. Indonesia
          uses multiple offsets: the western region (Jakarta) is UTC+7 (1.5 hours ahead of IST),
          and the eastern region is UTC+8 or UTC+9.
        </p>
        <p>
          For Indian teams coordinating with multiple Southeast Asian locations simultaneously,
          the spread is small: from Jakarta (UTC+7, 1.5 hours ahead) to Tokyo (UTC+9, 3.5 hours
          ahead) is only a 2-hour range. None of these countries observe DST, making India-APAC
          scheduling the most predictable of any major India-international corridor.
        </p>
      </article>
    </>
  ),
  "utc-to-ist": (
    <>
      <article className="contentBlock">
        <h2>Converting UTC to IST: the permanent UTC+5:30 offset</h2>
        <p>
          India Standard Time is exactly UTC+5:30 — India is 5 hours and 30 minutes ahead of
          Coordinated Universal Time. To convert a UTC timestamp to IST, add 5 hours and
          30 minutes. UTC 00:00 (midnight) equals 05:30 AM IST. UTC 06:00 equals 11:30 AM IST.
          UTC 12:00 (noon) equals 17:30 (5:30 PM) IST. UTC 18:30 equals 00:00 IST (midnight,
          the start of the next calendar day). UTC 20:00 equals 01:30 AM IST the following day.
        </p>
        <p>
          India does not observe daylight saving time, so the UTC+5:30 offset is always accurate
          regardless of the time of year. A UTC-to-IST calculation in January and the same
          calculation in August use the same formula. This consistency makes IST reliable as a
          reference for fixed UTC offsets in technical systems.
        </p>
      </article>
      <article className="contentBlock">
        <h2>Common UTC to IST use cases for engineers and support teams</h2>
        <p>
          UTC is the standard for timestamps in software systems, cloud infrastructure, and
          databases. Application logs, server events, AWS CloudWatch, GCP Logging, Datadog,
          and most monitoring platforms record in UTC. When debugging an incident or reviewing
          logs, Indian engineers need to convert UTC timestamps to IST to understand when events
          occurred relative to their working day. A UTC timestamp of "03:15 on Monday" is
          "08:45 AM IST on Monday" — the same calendar day, before business hours. A UTC
          timestamp of "20:00 on Friday" is "01:30 AM IST on Saturday" — a different day in India.
        </p>
        <p>
          Support teams handling international tickets frequently receive time references in UTC.
          A customer reporting "the outage started at 22:00 UTC on Thursday" is describing
          03:30 AM IST on Friday from the Indian team's perspective. Using the converter above
          with the specific date and time ensures the correct IST calendar day is identified,
          particularly for late UTC events (past 18:30 UTC) that cross midnight and shift to
          the following day in India.
        </p>
      </article>
      <article className="contentBlock">
        <h2>UTC vs GMT: why the distinction matters</h2>
        <p>
          UTC and GMT are often used interchangeably, but they are technically different. GMT
          (Greenwich Mean Time) is a timezone observed in the United Kingdom during winter (it
          is replaced by BST in summer). UTC is an atomic-clock standard that never observes
          daylight saving time and never changes. For all practical purposes in India, UTC and
          GMT give the same result when the UK is on GMT — but since the UK switches to BST
          (UTC+1) in summer, a timestamp described as "GMT" during UK summer is ambiguous.
          UTC is unambiguous. In technical systems, logs, and API documentation, UTC is the
          correct term, and TimeBridge converts from UTC directly.
        </p>
      </article>
    </>
  ),
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
        <button onClick={() => copyText(shareUrl, setToast)}><Link size={18} /> Copy link</button>
        <button onClick={() => { setDate(today); setTime("21:00"); setSourceZone("Asia/Kolkata"); }}><RefreshCcw size={18} /> Reset</button>
      </div>

      {activePreset && presetGuides[activePreset.slug] ? (
        <section className="presetGuide">
          {presetGuides[activePreset.slug]}
        </section>
      ) : (
        <section className="supportContent">
          <article>
            <h2>Reading converted timezone results</h2>
            <p>
              A converted time is only reliable when the date, city, abbreviation, and UTC offset are
              shown together. TimeBridge keeps those details visible alongside every result so that
              copied meeting text is easy for recipients to verify. The date badge (Yesterday/Today/
              Tomorrow) highlights when the converted time falls on a different calendar day than
              the source time — a common issue in India-US and India-Australia scheduling.
            </p>
          </article>
          <article>
            <h2>Why city names matter more than abbreviations</h2>
            <p>
              Abbreviations like IST, CST, and EST are reused across multiple countries and refer to
              completely different UTC offsets. Searching by city or country name selects the correct
              IANA timezone identifier, which accounts for daylight saving time automatically based
              on the date. This is why TimeBridge shows the city name alongside the abbreviation in
              every result — so there is no ambiguity about which timezone was actually used.
            </p>
          </article>
          <article>
            <h2>How daylight saving affects your conversion</h2>
            <p>
              If the source or target timezone observes daylight saving time, the correct offset
              for the selected date is applied automatically. The abbreviation in the result will
              change between standard and daylight variants (for example, EST versus EDT for New
              York) to confirm which offset is active on that date. India and some other countries
              (UAE, Singapore, Japan, China) do not observe DST and always show a fixed offset.
            </p>
          </article>
          <article>
            <h2>Sharing converted times with recipients</h2>
            <p>
              The Share URL button generates a link that opens TimeBridge with the same source zone,
              date, time, and target zones pre-loaded. Sending this link allows the recipient to see
              the verified conversion directly rather than trusting a manually typed time. The WhatsApp
              and Email copy buttons format the result with city names and abbreviations so the output
              is readable in any chat or email client without needing to open a separate tool.
            </p>
          </article>
        </section>
      )}
    </section>
  );
}
