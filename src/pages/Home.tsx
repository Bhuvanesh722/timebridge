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
            TimeBridge focuses on practical scheduling problems: Indian teams working with US clients,
            students joining overseas webinars, freelancers sharing availability, and remote teams
            comparing work-hour overlap across several countries. The site handles the details that
            matter most — date shifts, daylight saving offsets, and timezone abbreviations — so the
            result you copy is one your recipient can actually verify.
          </p>
        </article>
        <article>
          <h2>Clear dates, offsets, and daylight saving labels</h2>
          <p>
            The site avoids silent offset assumptions. Every converted result includes the full date,
            local time, current timezone abbreviation, and UTC offset. A Yesterday/Today/Tomorrow badge
            marks any result that falls on a different calendar day from the source, so date-line
            confusion is visible before you send the invite.
          </p>
        </article>
      </section>
      <section className="homeContent">
        <article>
          <h2>Who uses TimeBridge and how</h2>
          <p>
            Software engineers at Indian IT companies use TimeBridge for daily standups and release
            windows with US or European clients. Freelancers use it to send accurate availability
            blocks when pitching international clients. Support engineers convert UTC log timestamps
            to IST to match incidents to their working day. Students verify webinar start times
            before registering. Travel planners check flight arrival times across multiple time
            zones for multi-leg itineraries. Business professionals with Gulf and Southeast Asia
            clients use it to confirm meeting times for the day.
          </p>
        </article>
        <article>
          <h2>Reliable results for shared meeting invitations</h2>
          <p>
            A conversion is only useful if the recipient can verify it independently. TimeBridge includes
            the city name, full date, timezone abbreviation, and UTC offset in every result so the
            recipient can cross-check the time against their own calendar without relying on the sender's
            arithmetic. The copy-to-clipboard outputs include all of these details in a format that reads
            clearly in WhatsApp, email, or chat messages.
          </p>
        </article>
      </section>
      <section className="homeContent">
        <article>
          <h2>Daylight saving time and why it complicates scheduling</h2>
          <p>
            India does not observe daylight saving time. The United States, Canada, the United Kingdom,
            and most of Europe do. This means the offset between India and these regions shifts by one
            hour twice a year: once in spring when those regions spring forward, and once in autumn when
            they fall back. For Indian professionals with recurring calls to US or UK counterparts, the
            gap changes in mid-March and again in late October or early November. TimeBridge uses the
            date entered in the converter to apply the correct seasonal offset automatically — no mental
            adjustment needed.
          </p>
        </article>
        <article>
          <h2>Timezone abbreviations and when they are ambiguous</h2>
          <p>
            Abbreviations such as IST, CST, and BST are shared across multiple countries. IST may mean
            India Standard Time (UTC+5:30), Ireland Standard Time (UTC+1), or Israel Standard Time
            (UTC+2). CST may mean US Central Standard Time (UTC-6), China Standard Time (UTC+8), or
            Cuba Standard Time (UTC-5). Searching by city or country name, as TimeBridge supports,
            avoids this ambiguity entirely. The converted result shows the full city name, current
            abbreviation, and UTC offset together so the intended timezone is clear to both sender
            and recipient.
          </p>
        </article>
      </section>
      <section className="homeContent">
        <article>
          <h2>India and the United States: scheduling across a large gap</h2>
          <p>
            IST is 10.5 hours ahead of US Eastern Standard Time in winter and 9.5 hours ahead during
            US daylight saving. For most India-East Coast teams, the workable call window is
            7:30 PM–11:00 PM IST (matching 9:00 AM–1:00 PM EST). The IST-to-West-Coast gap is
            even larger — 13.5 hours in winter — meaning most US Pacific working hours fall in
            the Indian late night. TimeBridge's meeting planner can identify the highest-scoring
            time slots given each participant's location, taking the guesswork out of finding a
            mutual window.
          </p>
        </article>
        <article>
          <h2>India and Europe: a more manageable overlap</h2>
          <p>
            IST is only 4.5–5.5 hours ahead of the UK and 3.5–4.5 hours ahead of central Europe,
            depending on the season. This means a wide afternoon window in Europe (roughly 11:00 AM–5:00
            PM) maps to the Indian late afternoon and evening (4:30 PM–10:30 PM IST in winter).
            India-Dubai scheduling is the simplest of all: the UAE's Gulf Standard Time is only
            1.5 hours behind IST, with no DST on either side, making the gap constant throughout
            the year.
          </p>
        </article>
      </section>
    </>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <article className="card feature">{icon}<h3>{title}</h3><p>{text}</p></article>;
}
