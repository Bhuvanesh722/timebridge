import { Copy } from "lucide-react";
import { useMemo, useState } from "react";
import { zones, zoneMap } from "../data/timeZones";
import { copyText } from "../lib/share";
import { abbreviation, dateTimeToInstant, formatInZone, minutesInZone } from "../lib/time";
import type { Preferences } from "../types";

export function MeetingPlanner({ prefs, setToast }: { prefs: Preferences; setToast: (value: string) => void }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [duration, setDuration] = useState(30);
  const [participants, setParticipants] = useState(["Asia/Kolkata", "America/New_York", "America/Los_Angeles"]);
  const featuredZones = ["Asia/Kolkata", "America/New_York", "America/Los_Angeles", "Europe/London", "Asia/Dubai", "Asia/Singapore", "UTC", "Europe/Berlin"]
    .map((id) => zoneMap.get(id))
    .filter(Boolean);

  const slots = useMemo(() => {
    const start = dateTimeToInstant(date, "00:00", "UTC");
    return Array.from({ length: 48 }, (_, index) => new Date(start.getTime() + index * 30 * 60000))
      .map((instant) => {
        const scores = participants.map((id) => {
          const zone = zoneMap.get(id)!;
          const mins = minutesInZone(instant, id);
          const hour = mins / 60;
          if (hour >= zone.workStart && hour + duration / 60 <= zone.workEnd) return 100;
          if (hour >= 7 && hour <= 22) return 65;
          return 25;
        });
        return { instant, score: Math.round(scores.reduce((sum, item) => sum + item, 0) / scores.length) };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [date, duration, participants]);

  const details = slots[0] ? `Best meeting option (${slots[0].score}/100):\n${participants.map((id) => `${zoneMap.get(id)?.city}: ${formatInZone(slots[0].instant, id, prefs.timeFormat)} ${abbreviation(slots[0].instant, id)}`).join("\n")}` : "";

  return (
    <section className="toolLayout">
      <div className="panel">
        <h2>Meeting Planner</h2>
        <div className="formGrid plannerForm">
          <label className="field"><span>Date</span><input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
          <label className="field"><span>Duration</span><select value={duration} onChange={(event) => setDuration(Number(event.target.value))}><option value={30}>30 minutes</option><option value={45}>45 minutes</option><option value={60}>60 minutes</option><option value={90}>90 minutes</option></select></label>
        </div>
        <div className="participantChips">
          {featuredZones.map((zone) => (
            <button key={zone!.id} className={participants.includes(zone!.id) ? "selected" : ""} onClick={() => {
              setParticipants((current) => current.includes(zone!.id) ? current.filter((id) => id !== zone!.id) : current.length < 6 ? [...current, zone!.id] : current);
            }}>{zone!.city}</button>
          ))}
        </div>
      </div>
      <div className="timeline">
        {participants.map((id) => (
          <div key={id} className="timelineRow">
            <strong>{zoneMap.get(id)?.city}</strong>
            <div>{Array.from({ length: 24 }, (_, hour) => <span key={hour} className={hour >= zoneMap.get(id)!.workStart && hour < zoneMap.get(id)!.workEnd ? "work" : ""} />)}</div>
          </div>
        ))}
      </div>
      <div className="resultsGrid">
        {slots.map((slot) => (
          <article key={slot.instant.toISOString()} className="card slotCard">
            <span className="score">{slot.score}/100</span>
            <h3>{slot.score >= 90 ? "Excellent" : slot.score >= 75 ? "Good" : slot.score >= 50 ? "Manageable" : "Difficult"}</h3>
            {participants.map((id) => <p key={id}>{zoneMap.get(id)?.city}: <strong>{formatInZone(slot.instant, id, prefs.timeFormat)}</strong> {abbreviation(slot.instant, id)}</p>)}
          </article>
        ))}
      </div>
      <div className="actionBar"><button onClick={() => copyText(details, setToast)}><Copy size={18} /> Copy meeting details</button></div>
      <section className="supportContent">
        <article>
          <h2>How meeting scores are calculated</h2>
          <p>
            Each half-hour slot in the selected day is scored against every participant's local working
            hours. A slot that falls entirely within standard working hours (typically 9 AM–6 PM local
            time) for a given participant scores 100. A slot that falls between 7 AM and 10 PM local
            time scores 65 — outside core hours but not unreasonable for an occasional call. A slot
            outside that range scores 25, indicating the participant would need to attend outside
            comfortable working hours. The final score for each slot is the average across all
            participants.
          </p>
        </article>
        <article>
          <h2>Interpreting "Excellent", "Good", "Manageable", and "Difficult"</h2>
          <p>
            An "Excellent" rating (90–100) means all selected participants have the slot within their
            standard working hours — the ideal outcome. "Good" (75–89) means most participants are
            comfortably within their day, with at most one person near the edge. "Manageable" (50–74)
            means at least one participant is outside core hours but not yet in an unreasonable range
            (for example, early morning or late evening). "Difficult" (below 50) means one or more
            participants would need to attend late at night, very early in the morning, or at another
            time that is genuinely inconvenient on a recurring basis.
          </p>
        </article>
        <article>
          <h2>When no good overlap exists</h2>
          <p>
            For some timezone combinations — particularly India and the US West Coast — there is often
            no slot that scores "Excellent." India Standard Time is 12.5 to 13.5 hours ahead of US
            Pacific Time, meaning the two standard working days barely overlap at all. When the planner
            returns only "Manageable" or "Difficult" results, the practical options are to choose the
            highest-scoring slot available, rotate the inconvenient slot between team members on a
            weekly basis, or split the meeting into asynchronous segments with recorded video and
            written summaries instead of a live call.
          </p>
        </article>
        <article>
          <h2>Using the timeline view</h2>
          <p>
            The timeline above the results shows each participant's 24-hour day as a row of hourly
            blocks. Highlighted blocks represent each location's standard working hours. By scanning
            across rows, you can visually identify where working-hour bands overlap. A column where
            all rows show highlighted blocks is a candidate slot for an "Excellent" or "Good" meeting.
            This overview is useful when planning recurring meetings where you want to understand the
            structural overlap at a glance rather than reading individual slot scores.
          </p>
        </article>
      </section>
    </section>
  );
}
