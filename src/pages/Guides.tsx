export function Guides() {
  return (
    <section className="contentPage">
      <p className="eyebrow">Timezone guide</p>
      <h1>Practical timezone notes for global calls and deadlines.</h1>
      <p>
        TimeBridge is built for people who regularly coordinate between India, the United States, Europe, the Middle East, and Asia-Pacific.
        The biggest mistakes usually come from date changes, daylight saving time, and abbreviations that mean different things in different places.
      </p>

      <article className="contentBlock">
        <h2>Why IST to ET or PT can change during the year</h2>
        <p>
          India Standard Time does not currently use daylight saving time. Many US regions do. That means the difference between India and
          New York or Los Angeles is not a fixed number for the entire year. For business communication, it is often clearer to write ET or PT
          and include the city, date, and UTC offset shown by the converter.
        </p>
      </article>

      <article className="contentBlock">
        <h2>How to avoid date-change mistakes</h2>
        <p>
          A meeting that is Monday evening in India can still be Monday morning in California, while a late US meeting can become the next day
          in Asia. Always check the converted date, not just the time. TimeBridge marks results as yesterday, today, or tomorrow compared with
          the source date so the shift is visible before you copy the result.
        </p>
      </article>

      <article className="contentBlock">
        <h2>Common abbreviation confusion</h2>
        <p>
          Abbreviations such as CST, IST, and GST are reused in different parts of the world. CST may mean Central Time in North America,
          China Standard Time, or Cuba Standard Time. IST may mean India, Ireland, or Israel depending on context. A city or IANA timezone
          name is safer for scheduling.
        </p>
      </article>

      <article className="contentBlock">
        <h2>Better meeting planning habits</h2>
        <p>
          For recurring international calls, compare work-hour overlap instead of choosing a single convenient local time. Rotate difficult
          slots when teams are spread across India, Europe, and the Americas, and include copied timezone details in the invite so participants
          do not need to recalculate.
        </p>
      </article>
    </section>
  );
}
