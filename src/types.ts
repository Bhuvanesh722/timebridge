export type Page = "home" | "converter" | "clocks" | "planner" | "directory" | "guides" | "about" | "privacy" | "contact";
export type TimeFormat = "12h" | "24h";
export type Theme = "light" | "dark";

export type ConversionPreset = {
  slug: string;
  label: string;
  source: string;
  targets: string[];
  title: string;
  description: string;
};

export type ZoneInfo = {
  id: string;
  city: string;
  country: string;
  label: string;
  group: string;
  keywords: string[];
  workStart: number;
  workEnd: number;
};

export type Preferences = {
  homeTimeZone: string;
  timeFormat: TimeFormat;
  theme: Theme;
  favoriteTimeZones: string[];
  recentTimeZones: string[];
  clockMode: "digital" | "analog";
};
