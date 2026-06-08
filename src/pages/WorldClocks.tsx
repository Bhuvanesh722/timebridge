import { ArrowUp, Moon, Plus, Sun, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { SelectZone } from "../components/SelectZone";
import { friendlyLabel, zoneMap } from "../data/timeZones";
import { defaultPrefs } from "../lib/preferences";
import { abbreviation, dateLabel, minutesInZone, offsetLabel, partsInZone, timeOnly } from "../lib/time";
import type { Preferences } from "../types";

type WorldClocksProps = {
  prefs: Preferences;
  setPrefs: React.Dispatch<React.SetStateAction<Preferences>>;
  setToast: (value: string) => void;
};

export function WorldClocks({ prefs, setPrefs, setToast }: WorldClocksProps) {
  const [now, setNow] = useState(new Date());
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("Asia/Dubai");

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(interval);
  }, []);

  const addClock = () => {
    if (prefs.favoriteTimeZones.length >= 10 || prefs.favoriteTimeZones.includes(selected)) return;
    setPrefs((current) => ({ ...current, favoriteTimeZones: [...current.favoriteTimeZones, selected] }));
  };

  const moveClock = (id: string, direction: -1 | 1) => {
    setPrefs((current) => {
      const next = [...current.favoriteTimeZones];
      const index = next.indexOf(id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return { ...current, favoriteTimeZones: next };
    });
  };

  return (
    <section className="toolLayout">
      <div className="panel">
        <h2>World Clocks</h2>
        <div className="addRow">
          <SelectZone value={selected} onChange={setSelected} label="Add clock" query={query} setQuery={setQuery} />
          <button className="primary compact" onClick={addClock}><Plus size={18} /> Add</button>
        </div>
        <div className="segmented">
          <button className={prefs.timeFormat === "12h" ? "active" : ""} onClick={() => setPrefs((current) => ({ ...current, timeFormat: "12h" }))}>12h</button>
          <button className={prefs.timeFormat === "24h" ? "active" : ""} onClick={() => setPrefs((current) => ({ ...current, timeFormat: "24h" }))}>24h</button>
          <button className={prefs.clockMode === "digital" ? "active" : ""} onClick={() => setPrefs((current) => ({ ...current, clockMode: "digital" }))}>Digital</button>
          <button className={prefs.clockMode === "analog" ? "active" : ""} onClick={() => setPrefs((current) => ({ ...current, clockMode: "analog" }))}>Analog</button>
          <button onClick={() => { localStorage.removeItem("timebridge.preferences"); setPrefs(defaultPrefs); setToast("Saved data cleared"); }}>Clear saved data</button>
        </div>
      </div>
      <div className="clockGrid">
        {prefs.favoriteTimeZones.map((id) => (
          <ClockCard key={id} id={id} now={now} prefs={prefs} setPrefs={setPrefs} setToast={setToast} moveClock={moveClock} />
        ))}
      </div>
      <section className="supportContent">
        <article>
          <h2>Using world clocks for daily coordination</h2>
          <p>
            Pinning a set of clocks that matches your regular working relationships gives you a quick
            reference for the current time in each location without needing to open a converter.
            Keeping your home timezone alongside the locations of your most frequent contacts makes
            it immediately visible whether a spontaneous call would fall within the other person's
            working hours. The day/night indicator on each clock provides an at-a-glance signal
            for whether it is currently daytime or nighttime in that location.
          </p>
        </article>
        <article>
          <h2>Setting your home timezone</h2>
          <p>
            The home timezone is used to calculate the relative offset shown on each clock card —
            for example, "5h 30m ahead of Kolkata" or "10h 30m behind New York." Setting your home
            timezone to your own location makes these relative labels meaningful. You can set any
            clock as your home timezone by clicking the "Set home" button on that card. The home
            timezone is also the default source in the time converter and the reference for
            recent zones.
          </p>
        </article>
        <article>
          <h2>Reordering and managing pinned clocks</h2>
          <p>
            The up and down arrows on each clock card let you change the display order. Grouping
            clocks by region or by how frequently you contact those locations can make the
            world clocks page easier to scan quickly. You can pin up to ten clocks. If you want
            to start fresh, the "Clear saved data" button removes all pinned clocks, the home
            timezone, theme setting, and recent zones from your browser, and resets the application
            to its default state with the standard preset locations.
          </p>
        </article>
      </section>
    </section>
  );
}

function ClockCard({ id, now, prefs, setPrefs, setToast, moveClock }: { id: string; now: Date; prefs: Preferences; setPrefs: React.Dispatch<React.SetStateAction<Preferences>>; setToast: (value: string) => void; moveClock: (id: string, direction: -1 | 1) => void }) {
  const localMinutes = minutesInZone(now, id);
  const homeMinutes = minutesInZone(now, prefs.homeTimeZone);
  const diff = Math.round((localMinutes - homeMinutes) / 60);
  const isDay = localMinutes >= 360 && localMinutes < 1080;
  return (
    <article className="card clockCard">
      <button className="remove" onClick={() => setPrefs((current) => ({ ...current, favoriteTimeZones: current.favoriteTimeZones.filter((zone) => zone !== id) }))} aria-label={`Remove ${friendlyLabel(id)}`}><Trash2 size={17} /></button>
      <div className="clockTitle"><h3>{zoneMap.get(id)?.city}</h3>{isDay ? <Sun size={19} /> : <Moon size={19} />}</div>
      {prefs.clockMode === "analog" && <AnalogClock date={now} zone={id} />}
      <strong>{timeOnly(now, id, prefs.timeFormat)}</strong>
      <p>{dateLabel(now, id)}</p>
      <small>{abbreviation(now, id)} - {offsetLabel(now, id)} - {Math.abs(diff)}h {diff >= 0 ? "ahead of" : "behind"} {zoneMap.get(prefs.homeTimeZone)?.city}</small>
      <div className="clockActions">
        <button onClick={() => moveClock(id, -1)} aria-label={`Move ${friendlyLabel(id)} earlier`}><ArrowUp size={16} /></button>
        <button onClick={() => moveClock(id, 1)} aria-label={`Move ${friendlyLabel(id)} later`}><ArrowUp className="downIcon" size={16} /></button>
        <button onClick={() => { setPrefs((current) => ({ ...current, homeTimeZone: id })); setToast("Home timezone updated"); }}>Set home</button>
      </div>
    </article>
  );
}

function AnalogClock({ date, zone }: { date: Date; zone: string }) {
  const parts = partsInZone(date, zone);
  const hour = ((parts.hour % 12) + parts.minute / 60) * 30;
  const minute = parts.minute * 6;
  return (
    <div className="analog">
      {Array.from({ length: 12 }, (_, i) => (
        <i key={i} className="tick" style={{ transform: `rotate(${i * 30}deg)` }} />
      ))}
      <span style={{ transform: `rotate(${hour}deg)` }} />
      <b style={{ transform: `rotate(${minute}deg)` }} />
    </div>
  );
}
