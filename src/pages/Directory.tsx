import { Search } from "lucide-react";
import { useState } from "react";
import { searchZones } from "../data/timeZones";
import { abbreviation, offsetLabel, timeOnly } from "../lib/time";
import type { Preferences } from "../types";

export function Directory({ prefs }: { prefs: Preferences }) {
  const [query, setQuery] = useState("");
  const now = new Date();
  return (
    <section className="toolLayout">
      <div className="panel">
        <h2>Time Zone Directory</h2>
        <div className="searchbox"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search time zones" /></div>
      </div>
      <div className="directory">
        {searchZones(query).map((zone) => (
          <article key={zone.id} className="card directoryRow">
            <div><h3>{zone.city}</h3><p>{zone.country} - {zone.id}</p></div>
            <strong>{timeOnly(now, zone.id, prefs.timeFormat)}</strong>
            <small>{abbreviation(now, zone.id)} - {offsetLabel(now, zone.id)}</small>
          </article>
        ))}
      </div>
      <section className="supportContent">
        <article>
          <h2>Timezone directory coverage</h2>
          <p>
            The directory is based on IANA timezone identifiers and country-aware timezone data. Some countries have one official timezone while
            others include overseas territories or regions with separate local rules.
          </p>
        </article>
      </section>
    </section>
  );
}
