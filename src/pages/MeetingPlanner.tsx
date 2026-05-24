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
          <h2>How meeting score is interpreted</h2>
          <p>
            Meeting scores compare the suggested time against each selected zone's working hours. A high score means the slot is comfortable for
            most participants, while a lower score means at least one location is early, late, or outside normal work hours.
          </p>
        </article>
      </section>
    </section>
  );
}
