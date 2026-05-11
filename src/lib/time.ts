import type { TimeFormat } from "../types";
import { usableZone } from "../data/timeZones";

export function dateTimeToInstant(date: string, time: string, timeZone: string) {
  const safeZone = usableZone(timeZone);
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const parts = partsInZone(utcGuess, safeZone);
  const offsetMs = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute) - utcGuess.getTime();
  return new Date(utcGuess.getTime() - offsetMs);
}

export function partsInZone(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: usableZone(timeZone),
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  return { year: get("year"), month: get("month"), day: get("day"), hour: get("hour") === 24 ? 0 : get("hour"), minute: get("minute") };
}

export function formatInZone(date: Date, timeZone: string, timeFormat: TimeFormat) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: usableZone(timeZone),
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: timeFormat === "12h",
  }).format(date);
}

export function dateLabel(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: usableZone(timeZone),
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function timeOnly(date: Date, timeZone: string, timeFormat: TimeFormat) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: usableZone(timeZone),
    hour: "numeric",
    minute: "2-digit",
    hour12: timeFormat === "12h",
  }).format(date);
}

export function abbreviation(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: usableZone(timeZone), timeZoneName: "short" }).formatToParts(date);
  return parts.find((part) => part.type === "timeZoneName")?.value ?? "";
}

export function offsetLabel(date: Date, timeZone: string) {
  const parts = partsInZone(date, timeZone);
  const asUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute);
  const diff = Math.round((asUtc - date.getTime()) / 60000);
  const sign = diff >= 0 ? "+" : "-";
  const abs = Math.abs(diff);
  return `UTC${sign}${String(Math.floor(abs / 60)).padStart(2, "0")}:${String(abs % 60).padStart(2, "0")}`;
}

export function localDateKey(date: Date, timeZone: string) {
  const parts = partsInZone(date, timeZone);
  return `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}

export function dateBadge(sourceDate: string, converted: Date, targetZone: string) {
  const targetDate = localDateKey(converted, targetZone);
  if (targetDate === sourceDate) return "Today";
  return targetDate < sourceDate ? "Yesterday" : "Tomorrow";
}

export function minutesInZone(date: Date, timeZone: string) {
  const parts = partsInZone(date, timeZone);
  return parts.hour * 60 + parts.minute;
}

export function ambiguousWarning(query: string, zoneId: string, instant: Date) {
  const q = query.trim().toLowerCase();
  if (!["pst", "pdt", "pt", "est", "edt", "et", "cst", "cdt", "ct", "gmt"].includes(q)) return "";
  if (zoneId === "America/Los_Angeles") return `Pacific Time is ${abbreviation(instant, zoneId)} for this date. Use PT for business communication unless PST/PDT is specifically required.`;
  if (zoneId === "America/New_York") return `Eastern Time is ${abbreviation(instant, zoneId)} for this date. ET is clearer than guessing EST or EDT.`;
  if (zoneId === "America/Chicago") return `Central Time is ${abbreviation(instant, zoneId)} for this date, and CST/CDT can be ambiguous globally.`;
  if (q === "gmt") return "GMT is often used casually for UK time, but London may use BST during daylight saving.";
  return "This abbreviation can map to more than one location. Check the city and UTC offset before sharing.";
}
