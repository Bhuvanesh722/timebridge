import type { Preferences } from "../types";

export const defaultPrefs: Preferences = {
  homeTimeZone: "Asia/Kolkata",
  timeFormat: "12h",
  theme: "light",
  favoriteTimeZones: ["Asia/Kolkata", "America/New_York", "America/Los_Angeles", "Europe/London"],
  recentTimeZones: ["Asia/Dubai", "Asia/Singapore"],
  clockMode: "digital",
};

export function loadPrefs(): Preferences {
  try {
    const saved = localStorage.getItem("timebridge.preferences");
    return saved ? { ...defaultPrefs, ...JSON.parse(saved) } : defaultPrefs;
  } catch {
    return defaultPrefs;
  }
}

export function savePrefs(prefs: Preferences) {
  localStorage.setItem("timebridge.preferences", JSON.stringify(prefs));
}
