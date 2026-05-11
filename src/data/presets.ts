import type { ConversionPreset } from "../types";

export const conversionPresets: ConversionPreset[] = [
  {
    slug: "ist-to-et",
    label: "IST to ET",
    source: "Asia/Kolkata",
    targets: ["America/New_York"],
    title: "IST to EST/EDT Time Converter",
    description: "Convert India time to Eastern Time with the correct date, UTC offset, and daylight saving label.",
  },
  {
    slug: "ist-to-pt",
    label: "IST to PT",
    source: "Asia/Kolkata",
    targets: ["America/Los_Angeles"],
    title: "IST to PST/PDT Time Converter",
    description: "Convert India time to Pacific Time and avoid guessing between PST and PDT.",
  },
  {
    slug: "ist-to-london",
    label: "IST to London",
    source: "Asia/Kolkata",
    targets: ["Europe/London"],
    title: "IST to London Time Converter",
    description: "Check India and London time with GMT or BST handled for the selected date.",
  },
  {
    slug: "ist-to-dubai",
    label: "IST to Dubai",
    source: "Asia/Kolkata",
    targets: ["Asia/Dubai"],
    title: "IST to Dubai Time Converter",
    description: "Convert India time to Dubai Gulf Time for calls, travel, and deadlines.",
  },
  {
    slug: "ist-to-singapore",
    label: "IST to Singapore",
    source: "Asia/Kolkata",
    targets: ["Asia/Singapore"],
    title: "IST to Singapore Time Converter",
    description: "Convert India time to Singapore time with clear date and offset details.",
  },
  {
    slug: "utc-to-ist",
    label: "UTC to IST",
    source: "UTC",
    targets: ["Asia/Kolkata"],
    title: "UTC to IST Time Converter",
    description: "Convert UTC timestamps into India time for engineering, support, and event schedules.",
  },
];
