export function About() {
  return (
    <section className="contentPage">
      <p className="eyebrow">About TimeBridge</p>
      <h1>A simple timezone utility for people working across borders.</h1>
      <p>
        TimeBridge helps users convert time zones, compare world clocks, and plan meeting slots without
        creating an account. The site is designed for everyday international coordination: client calls,
        interviews, webinars, remote work, travel planning, and deadline checks.
      </p>
      <div className="contentGrid">
        <article className="contentBlock">
          <h2>What the site provides</h2>
          <p>
            The converter uses browser-supported timezone data and IANA timezone names where possible.
            Results include local date, local time, abbreviation, UTC offset, and date-change labels so
            users can copy clearer, fully verified meeting information before sending it.
          </p>
        </article>
        <article className="contentBlock">
          <h2>Privacy-first by design</h2>
          <p>
            TimeBridge does not require login. Preferences such as pinned clocks, theme, home timezone,
            and recent zones are stored locally in the browser. No personal data leaves your device for
            scheduling calculations — the entire timezone conversion runs client-side.
          </p>
        </article>
      </div>

      <article className="contentBlock">
        <h2>Why timezone conversion needs careful handling</h2>
        <p>
          Timezone arithmetic looks simple on the surface — add or subtract a few hours — but has
          several non-obvious failure points. Daylight saving time causes the offset gap between
          countries to shift by one hour twice a year in most of the US, UK, Canada, and Europe, while
          countries like India, China, Japan, and the UAE keep a fixed offset all year. Three-letter
          abbreviations like IST, CST, and EST are reused across different regions to mean completely
          different times. Date changes happen at different points in different timezones, so a Monday
          meeting in India can fall on Sunday in the US or Tuesday in Australia.
        </p>
        <p>
          TimeBridge surfaces all of these details together with each conversion: the city name,
          timezone abbreviation, UTC offset, full date, and a date badge (Yesterday/Today/Tomorrow)
          relative to the source. This lets users see the complete picture before copying or sharing
          a meeting time, rather than discovering a mistake after participants have already joined the
          wrong call.
        </p>
      </article>

      <article className="contentBlock">
        <h2>Who uses TimeBridge</h2>
        <p>
          TimeBridge is used by professionals, students, and remote workers who regularly coordinate
          across India and other countries. Common user groups include software developers at Indian IT
          companies managing standups and releases with US or UK clients; freelancers sending accurate
          availability windows to international clients; support engineers converting UTC server
          timestamps to local IST for log analysis; students joining overseas university lectures or
          webinars; remote job candidates verifying interview times sent in unfamiliar timezone formats;
          and business professionals managing client calls across India, the Gulf, Southeast Asia,
          or Europe.
        </p>
        <p>
          The site is also used for travel planning — verifying departure and arrival times when
          flights cross multiple timezones — and for coordinating international deadlines, particularly
          in contexts where the cutoff time is defined in a foreign timezone (for example, an
          application deadline stated in US Eastern Time that an Indian applicant needs to translate
          into IST).
        </p>
      </article>

      <article className="contentBlock">
        <h2>Tools available on TimeBridge</h2>
        <p>
          The <strong>Time Converter</strong> is the core tool: select a source timezone, date, and
          time, then compare the result across multiple target timezones simultaneously. Results include
          the date, time, abbreviation, and UTC offset for each zone. Conversion output can be copied
          in WhatsApp format, email format, a short reference string, or as a shareable URL that
          preserves all conversion parameters for recipients to verify independently.
        </p>
        <p>
          The <strong>Meeting Planner</strong> lets you select a date, meeting duration, and up to
          six participant locations. It scores all 48 half-hour slots in the selected day against each
          location's working hours and returns the five highest-scoring options. Slots rated "Excellent"
          mean everyone is within standard business hours. "Good" and "Manageable" indicate one or
          more participants are near the edge of their day. "Difficult" confirms that at least one
          location is well outside normal hours for that slot.
        </p>
        <p>
          The <strong>World Clocks</strong> page displays up to ten pinned timezones with live-updating
          times every minute, day/night indicators, UTC offsets, and relative difference labels compared
          to a chosen home timezone. Both digital and analog clock modes are available. The
          <strong> Timezone Directory</strong> provides a searchable list of all supported IANA timezone
          identifiers, showing each zone's current local time, abbreviation, and UTC offset.
        </p>
      </article>

      <article className="contentBlock">
        <h2>Preset conversion pages</h2>
        <p>
          TimeBridge includes pre-configured conversion pages for the most common India-international
          timezone pairs: IST to Eastern Time (New York), IST to Pacific Time (Los Angeles), IST to
          London (GMT/BST), IST to Dubai (GST), IST to Singapore (SGT), and UTC to IST. Each preset
          page opens the converter with the source and target timezones already set, and includes
          specific guidance about the offset, seasonal changes, and best call times for that pairing.
        </p>
      </article>

      <article className="contentBlock">
        <h2>Technical notes</h2>
        <p>
          All timezone calculations in TimeBridge use the browser's built-in <code>Intl.DateTimeFormat</code>
          API, which draws on the IANA timezone database bundled with the operating system. This means
          conversion accuracy depends on the user's browser and OS having up-to-date timezone data,
          which modern devices receive through regular operating system updates. For recent changes to
          timezone rules in specific countries (which happen occasionally when governments change
          their DST policy), results should be verified against official sources if precision is
          critical.
        </p>
        <p>
          The site is a client-side application with no server required for timezone operations.
          Preferences persist in browser localStorage. When localStorage is cleared, the application
          reverts to default settings: India timezone, light theme, and the standard preset clock
          locations. The application works offline once loaded, since it does not rely on network
          requests for calculations.
        </p>
      </article>
    </section>
  );
}
