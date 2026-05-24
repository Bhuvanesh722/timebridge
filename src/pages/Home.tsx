import { ArrowRight, Clock, Copy, Globe2, Users } from "lucide-react";
import { conversionPresets } from "../data/presets";
import { zoneMap } from "../data/timeZones";
import { abbreviation, offsetLabel, timeOnly } from "../lib/time";
import type { ConversionPreset, Page, Preferences } from "../types";

export function Home({ openPage, prefs }: { openPage: (page: Page, preset?: ConversionPreset | null) => void; prefs: Preferences }) {
  const now = new Date();
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Built for IST-first global work</p>
          <h1>Time zone conversion made simple.</h1>
          <p>Convert IST, ET, PT, UTC, London, Dubai, Singapore, and more. Plan global calls without timezone confusion.</p>
          <div className="heroActions">
            <button className="primary" onClick={() => openPage("converter")}>Convert Time Now <ArrowRight size={18} /></button>
            <button className="secondary" onClick={() => openPage("clocks")}>Open World Clocks</button>
          </div>
        </div>
        <div className="livePanel">
          {prefs.favoriteTimeZones.slice(0, 4).map((id) => (
            <div key={id} className="miniClock">
              <span>{zoneMap.get(id)?.city}</span>
              <strong>{timeOnly(now, id, prefs.timeFormat)}</strong>
              <small>{abbreviation(now, id)} - {offsetLabel(now, id)}</small>
            </div>
          ))}
        </div>
      </section>
      <section className="popular">
        {conversionPresets.map((preset) => (
          <button key={preset.slug} onClick={() => openPage("converter", preset)}>{preset.label}</button>
        ))}
      </section>
      <section className="featureGrid">
        <Feature icon={<Globe2 />} title="Convert across time zones" text="Pick a date and time, then instantly see matching times across multiple countries." />
        <Feature icon={<Users />} title="Plan better meetings" text="Find comfortable meeting slots across India, US, UK, Europe, and more." />
        <Feature icon={<Clock />} title="Avoid timezone mistakes" text="See date changes, daylight saving labels, UTC offsets, and clear timezone names." />
        <Feature icon={<Copy />} title="Copy and share quickly" text="Copy meeting times for WhatsApp, email, or chat in one click." />
      </section>
      <section className="homeContent">
        <article>
          <h2>Timezone conversion for everyday global work</h2>
          <p>
            TimeBridge focuses on practical scheduling problems: Indian teams working with US clients, students joining overseas webinars,
            freelancers sharing availability, and remote teams comparing work-hour overlap across several countries.
          </p>
        </article>
        <article>
          <h2>Clear dates, offsets, and daylight saving labels</h2>
          <p>
            The site avoids silent offset assumptions. Results include the converted date, local time, timezone abbreviation, and UTC offset so
            users can spot yesterday/today/tomorrow changes before sharing a meeting time.
          </p>
        </article>
      </section>
    </>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <article className="card feature">{icon}<h3>{title}</h3><p>{text}</p></article>;
}
