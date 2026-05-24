export function About() {
  return (
    <section className="contentPage">
      <p className="eyebrow">About TimeBridge</p>
      <h1>A simple timezone utility for people working across borders.</h1>
      <p>
        TimeBridge helps users convert time zones, compare world clocks, and plan meeting slots without creating an account. The site is
        designed for everyday coordination: client calls, interviews, webinars, remote work, travel planning, and deadline checks.
      </p>
      <div className="contentGrid">
        <article className="contentBlock">
          <h2>What the site provides</h2>
          <p>
            The converter uses browser-supported timezone data and IANA timezone names where possible. Results include local date, local time,
            abbreviation, UTC offset, and date-change labels so users can copy clearer meeting information.
          </p>
        </article>
        <article className="contentBlock">
          <h2>Privacy-first by design</h2>
          <p>
            TimeBridge does not require login. Preferences such as pinned clocks, theme, home timezone, and recent zones are stored locally in
            the browser. No backend database is required for the core tool experience.
          </p>
        </article>
      </div>
    </section>
  );
}
