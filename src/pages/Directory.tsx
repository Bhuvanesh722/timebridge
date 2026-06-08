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
          <h2>About IANA timezone identifiers</h2>
          <p>
            The directory is based on IANA timezone identifiers — the global standard for referring
            to timezones without ambiguity. An IANA identifier uses the format Region/City, for
            example Asia/Kolkata, America/New_York, or Europe/London. Unlike three-letter
            abbreviations such as IST or CST, IANA identifiers are globally unique and point to
            a single specific timezone. They also carry the full historical and future daylight
            saving time rules for that region, so any date-specific conversion using an IANA
            identifier applies the correct offset automatically.
          </p>
        </article>
        <article>
          <h2>Why countries have multiple timezone entries</h2>
          <p>
            Large countries with significant east-west geographic span often span multiple timezones.
            The United States has four main timezone regions plus territories. Russia spans eleven
            timezone zones. Australia has three mainland zones plus external territories. Some countries
            also have unusual offsets: India uses UTC+5:30 (a 30-minute offset), Nepal uses UTC+5:45
            (a 45-minute offset), and Iran uses UTC+3:30. These fractional-hour offsets exist for
            historical and geographic reasons and are handled correctly by the IANA database.
          </p>
        </article>
        <article>
          <h2>How to use the directory for timezone research</h2>
          <p>
            Search by city name, country name, or timezone abbreviation to find the IANA identifier
            for a specific location. The directory shows each timezone's current local time,
            abbreviation, and UTC offset so you can verify the offset before using it in a
            conversion. If you need to find all timezones in a specific country — for example, all
            US timezones or all Australian timezones — searching by country name returns every
            IANA entry associated with that country. The IANA identifier shown in each row can
            be used in calendar software, programming languages, and operating systems to
            perform accurate date-and-time calculations.
          </p>
        </article>
      </section>
    </section>
  );
}
