export function Guides() {
  return (
    <section className="contentPage">
      <p className="eyebrow">Timezone guides</p>
      <h1>Practical guides for global scheduling and timezone coordination.</h1>
      <p>
        These guides cover the most common timezone challenges for Indian professionals, remote workers,
        students, and international teams coordinating across India, the United States, the United Kingdom,
        Europe, the Middle East, and Asia-Pacific. Each guide explains a specific scheduling problem and
        how to handle it correctly.
      </p>

      <article className="contentBlock">
        <h2>How to convert IST to US time zones correctly</h2>
        <p>
          India Standard Time (IST) is UTC+5:30 throughout the entire year. India does not observe
          daylight saving time, which makes IST a stable reference. The United States, however, switches
          between standard time and daylight saving time twice a year, so the hour gap between IST and
          US cities is not a fixed number.
        </p>
        <p>
          During US standard time — from the first Sunday in November through the second Sunday in March
          — India is 10 hours and 30 minutes ahead of the US East Coast (EST, UTC-5) and 13 hours and
          30 minutes ahead of the US West Coast (PST, UTC-8). During US daylight saving time — from the
          second Sunday in March through the first Sunday in November — those gaps shrink by one hour:
          IST is 9 hours and 30 minutes ahead of EDT (UTC-4) and 12 hours and 30 minutes ahead of PDT
          (UTC-7). US Central Time (Chicago, Dallas) sits at 11.5 hours behind IST in winter (CST,
          UTC-6) and 10.5 hours in summer (CDT, UTC-5).
        </p>
        <p>
          A concrete example: 9:00 PM IST on a Tuesday in January equals 7:30 AM EST in New York on the
          same Tuesday. If the same meeting is held in June, 9:00 PM IST equals 8:30 AM EDT in New York
          — one hour later, because the US has moved its clocks forward. This shift happens each year in
          mid-March and again in early November, and is the most common reason a standing weekly call
          appears to drift without warning for either the Indian or the US team.
        </p>
        <p>
          Always use a converter that knows the specific date of the meeting. A tool that applies a
          fixed offset will be wrong for half the year in any US timezone that observes DST. TimeBridge
          uses the IANA database behind the scenes and selects the correct offset for the exact date
          entered, showing both the abbreviation (EST or EDT) and the UTC offset so the result is
          verifiable at a glance.
        </p>
      </article>

      <article className="contentBlock">
        <h2>Daylight saving time explained for Indian professionals</h2>
        <p>
          Daylight saving time (DST) is a practice where clocks are moved forward by one hour in spring
          and back by one hour in autumn, primarily to extend usable evening daylight in countries at
          higher latitudes. India discontinued DST in 1945, and the country has remained on a single
          year-round offset (UTC+5:30) ever since. This means Indian professionals must track when their
          counterparts in the US, UK, Canada, and Europe change their clocks, because the offset to India
          changes accordingly.
        </p>
        <p>
          The United States and Canada (most provinces) spring forward on the second Sunday in March and
          fall back on the first Sunday in November. The United Kingdom switches from GMT (UTC+0) to
          British Summer Time (BST, UTC+1) on the last Sunday in March and returns to GMT on the last
          Sunday in October. Most of continental Europe — including Germany, France, the Netherlands,
          Spain, and Italy — switches from Central European Time (CET, UTC+1) to Central European Summer
          Time (CEST, UTC+2) on the last Sunday in March and reverts on the last Sunday in October.
        </p>
        <p>
          For an Indian team, this creates two periods of change to watch every year. In late March, the
          offsets to the UK, Europe, and the US all shrink by one hour within roughly two to three weeks
          of each other. In late October and early November, those gaps widen again. If you have a
          recurring call set at a fixed IST time, the other party effectively attends one hour earlier
          after the spring transition and one hour later after the autumn transition — even though
          nothing changed on the Indian calendar.
        </p>
        <p>
          The safest practice is to set recurring international meetings inside the other party's
          calendar system rather than converting from a fixed IST slot, and to verify the conversion
          with a date-aware tool whenever the DST transition period approaches. Always include the
          current UTC offset when sharing a time — not just the abbreviation — so recipients can
          independently verify the conversion is correct for that specific date.
        </p>
      </article>

      <article className="contentBlock">
        <h2>Timezone abbreviation reference: why three-letter codes cause confusion</h2>
        <p>
          Many commonly used timezone abbreviations are shared across multiple countries and regions.
          Relying on an abbreviation alone — without a city, country, or UTC offset — is one of the
          most frequent causes of scheduling mistakes in international communication.
        </p>
        <p>
          IST is used for India Standard Time (UTC+5:30), Ireland Standard Time (UTC+1 in summer, the
          same as British Summer Time), and Israel Standard Time (UTC+2 in winter, UTC+3 in summer).
          If an email says "call at 9am IST," a recipient in Dublin and a recipient in Bengaluru would
          understand completely different times — times that are 4.5 hours apart. CST covers US Central
          Standard Time (UTC-6), China Standard Time (UTC+8), and Cuba Standard Time (UTC-5). The same
          abbreviation refers to times that are up to 14 hours apart. EST is typically US Eastern
          Standard Time (UTC-5) but is also used for Ecuador Standard Time and, in older usage, for
          Australian Eastern Standard Time. BST means British Summer Time (UTC+1) in the UK but
          Bangladesh Standard Time (UTC+6) in another context. GST is Gulf Standard Time (UTC+4) for
          the UAE and Oman, but South Georgia Time (UTC-2) in the South Atlantic.
        </p>
        <p>
          The IANA timezone database solves this problem by using region-specific identifiers that are
          globally unique. Instead of CST, you write America/Chicago or Asia/Shanghai. Instead of IST,
          you write Asia/Kolkata or Europe/Dublin. These identifiers are unambiguous, account for
          daylight saving time automatically, and are the standard used by calendaring systems,
          programming languages, operating systems, and cloud infrastructure worldwide.
        </p>
        <p>
          When sharing meeting times in an email or message, the clearest format is to include both
          the city name and the current UTC offset: "9:00 PM IST (India, UTC+5:30) = 9:00 AM EDT
          (New York, UTC-4)." TimeBridge generates this kind of copy-ready output so you do not have
          to format it manually.
        </p>
      </article>

      <article className="contentBlock">
        <h2>Finding the best meeting time between India and the United States</h2>
        <p>
          India-US scheduling is one of the most challenging timezone pairing in regular business use
          because the two countries sit on nearly opposite sides of the 24-hour clock. A standard
          9am-6pm workday in New York corresponds to roughly 7:30 PM-4:30 AM IST in winter, and
          6:30 PM-3:30 AM IST in summer. This means most normal US East Coast business hours fall
          in the Indian evening, with the later US hours extending past midnight India time.
        </p>
        <p>
          The most workable overlap window for India-East Coast teams is between 8:00 AM and 1:00 PM
          EST, which corresponds to 6:30 PM-11:30 PM IST in winter (during EDT, one hour less). A
          9:00 AM EST standup in January becomes a 7:30 PM IST check-in — uncomfortable but
          sustainable as a regular pattern. As US meeting times push later into the afternoon, the
          IST equivalent crosses into late evening. Any US East Coast call after 2:00 PM EST extends
          past 11:30 PM IST in winter.
        </p>
        <p>
          For India-West Coast teams, the gap is even larger. A 9:00 AM PST call maps to 10:30 PM
          IST in winter (13.5-hour difference). The entire 9 AM-6 PM workday in Los Angeles falls
          between 10:30 PM and 7:30 AM IST — almost entirely outside regular Indian working hours.
          The common compromise is to schedule calls at 8:00-9:00 AM PST (9:30-10:30 PM IST), which
          is late for India but manageable. Many India-West Coast teams rotate the inconvenient slot
          between team members on a weekly basis to distribute the burden fairly.
        </p>
        <p>
          For recurring meetings with no good mutual overlap, it helps to use TimeBridge's meeting
          planner. The planner scores time slots against each participant's working hours and returns
          the five highest-scoring options. Slots that rate "Excellent" or "Good" indicate genuine
          work-hour overlap. Slots rated "Manageable" or "Difficult" confirm that someone will need
          to attend outside normal hours.
        </p>
      </article>

      <article className="contentBlock">
        <h2>India and UK/Europe scheduling: a practical guide</h2>
        <p>
          India has significantly better time zone overlap with Europe and the United Kingdom than
          with the United States, making India-Europe scheduling more manageable for most professional
          scenarios.
        </p>
        <p>
          IST is ahead of UK time by 5 hours and 30 minutes in winter, when the UK observes GMT
          (UTC+0), and 4 hours and 30 minutes in summer, when the UK observes British Summer Time
          (BST, UTC+1). A 9:00 AM GMT meeting in London in January is 2:30 PM IST in India — within
          standard afternoon working hours. A 12:00 PM GMT meeting is 5:30 PM IST. The afternoon
          overlap window in UK winter runs roughly from 11:00 AM to 5:00 PM UK time, which equals
          4:30 PM to 10:30 PM IST, giving Indian teams a shared window through late afternoon
          and early evening.
        </p>
        <p>
          For continental Europe — Germany, France, Netherlands, Belgium, and most of western Europe
          — the timezone is Central European Time (CET, UTC+1) in winter and Central European Summer
          Time (CEST, UTC+2) in summer. The IST-to-CET gap is 4.5 hours in winter and 3.5 hours in
          summer. A 10:00 AM CET meeting in Berlin in January is 2:30 PM IST. A 4:00 PM CET meeting
          in Paris is 8:30 PM IST — still reasonable for both teams. The practical overlap window for
          India-Germany scheduling runs from approximately 10:00 AM-3:30 PM CET in winter (2:30 PM-
          8:00 PM IST).
        </p>
        <p>
          For India-Middle East coordination, the scheduling is the most straightforward. The UAE and
          Oman use Gulf Standard Time (GST, UTC+4), and IST is only 1 hour and 30 minutes ahead of
          Dubai and Abu Dhabi. A 9:00 AM GST meeting is 10:30 AM IST. Neither country observes DST,
          so this gap never changes. India-Gulf scheduling has no seasonal transitions to account for
          and is consistent throughout the year.
        </p>
      </article>

      <article className="contentBlock">
        <h2>Understanding UTC and why it matters for global scheduling</h2>
        <p>
          UTC, or Coordinated Universal Time, is the primary global time reference used in aviation,
          computing, broadcasting, and international communication. Unlike Greenwich Mean Time (GMT),
          which is a timezone observed in the UK in winter, UTC is a precise atomic-clock standard that
          does not observe daylight saving time and never changes. Every timezone in the world is defined
          as an offset from UTC.
        </p>
        <p>
          India Standard Time is UTC+5:30, meaning India is 5 hours and 30 minutes ahead of UTC.
          US Eastern Standard Time is UTC-5, so New York is 5 hours behind UTC in winter. During
          daylight saving, New York moves to UTC-4. London in winter is UTC+0 (no offset). Dubai is
          UTC+4 throughout the year. Singapore is UTC+8. When you know the UTC offset, you can
          calculate the local time in any location by adding or subtracting the appropriate number
          of hours and minutes.
        </p>
        <p>
          When you see a UTC offset in a calendar invite or technical document, it gives you an
          unambiguous time reference. "Meeting at 14:00 UTC" is the same moment everywhere in the
          world — recipients add their local UTC offset to find their local time. A recipient in India
          (UTC+5:30) knows the meeting is at 19:30 IST. A recipient in New York on EST (UTC-5) knows
          it is 9:00 AM. This is why UTC is preferred in engineering, finance, broadcast scheduling,
          and global operations where precision and universality matter.
        </p>
        <p>
          For Indian professionals who regularly see UTC timestamps in application logs, API responses,
          or technical documentation, the UTC-to-IST conversion is simply: add 5 hours and 30 minutes.
          UTC midnight (00:00) is 05:30 AM IST. UTC noon (12:00) is 17:30 (5:30 PM) IST. UTC 18:30 is
          midnight IST. Late UTC timestamps — particularly anything after UTC 18:30 — will fall on the
          next calendar day in India, which is a common source of off-by-one-day errors in log analysis.
        </p>
      </article>

      <article className="contentBlock">
        <h2>How to avoid date-change mistakes in global scheduling</h2>
        <p>
          One of the most disruptive timezone errors is not getting the hour wrong — it is getting the
          day wrong. Because India is ahead of the Americas by a substantial margin, certain scheduling
          conversations have an inherent date mismatch: when it is past midnight in India, it is still
          yesterday afternoon or evening in the United States.
        </p>
        <p>
          A concrete example: Monday at 12:30 AM IST equals Sunday at 7:00 PM EDT in New York and
          Sunday at 4:00 PM PDT in Los Angeles. If an Indian developer sends a deployment notification
          at 12:30 AM on Monday saying "deployed successfully on Monday morning," a US West Coast
          colleague receiving the message at 4:00 PM on Sunday will likely be confused, since their
          day is Sunday and Monday has not started yet. Similarly, a deadline described as "end of
          Monday IST" is Monday 7:00 PM EDT or Monday 4:00 PM PDT for the US team — well before their
          Monday ends. This kind of ambiguity can cause teams to believe they have more time than they do.
        </p>
        <p>
          The date shift also works across East Asia and Australia. When it is Thursday at 8:00 PM IST
          in India, it is already Friday at 12:30 AM SGT in Singapore and Friday at 2:30 AM AEDT in
          Sydney. Teams coordinating between India and Australia must check the date carefully, as the
          day in Australia is often one step ahead of India.
        </p>
        <p>
          TimeBridge marks each conversion result with a badge — "Yesterday," "Today," or "Tomorrow"
          — relative to the source date. This label appears before you copy or share the result, making
          the date shift visible rather than hidden. When scheduling, always include both the full date
          (not just the day name) and the day of week alongside the time and timezone: "Monday, June 9
          at 9:30 PM IST" rather than just "9:30 PM IST." This prevents recipients from misidentifying
          which calendar day the meeting falls on.
        </p>
      </article>

      <article className="contentBlock">
        <h2>Common international scheduling mistakes and how to prevent them</h2>
        <p>
          Timezone-related scheduling errors are surprisingly common even among experienced remote teams.
          Most fall into a small set of repeating patterns that are straightforward to prevent once
          identified.
        </p>
        <p>
          The most frequent mistake is applying a fixed offset throughout the year when DST changes it
          seasonally. An Indian team that always adds 5.5 hours to calculate UK time will be wrong by
          one hour between late March and late October, when the UK observes BST (UTC+1) instead of
          GMT (UTC+0). The same applies to US and European offsets. Always verify the offset for the
          specific date of the meeting, not from memory.
        </p>
        <p>
          The second most common mistake is using a three-letter abbreviation without context. Writing
          "meeting at 10am CST" without specifying whether you mean Chicago, Shanghai, or Havana leaves
          recipients to guess. An Indian recipient calculating from China Standard Time (UTC+8) would
          arrive 14 hours early compared to someone calculating from US Central Standard Time (UTC-6).
          Always pair an abbreviation with a city name or explicit UTC offset.
        </p>
        <p>
          A third category involves forgetting AM/PM or treating 12:00 as noon by default. In 12-hour
          format, 12:00 PM is noon and 12:00 AM is midnight — but this specific case still trips up many
          people. Using 24-hour time in written meeting communication ("14:00 IST" instead of "2:00 PM
          IST") removes this ambiguity entirely. Another related issue: a meeting described as "evening"
          in one timezone may be night or early morning in another; avoid descriptive terms and use
          explicit times.
        </p>
        <p>
          Finally, scheduling mistakes happen because multiple people each do the timezone arithmetic
          independently and occasionally get it wrong. Using a shared conversion link — like the Share
          URL that TimeBridge generates — means everyone is reading from the same verified result rather
          than each person doing their own calculation.
        </p>
      </article>
    </section>
  );
}
