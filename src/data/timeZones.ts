import { getTimeZones, timeZonesNames } from "@vvo/tzdb";
import type { ZoneInfo } from "../types";

const curatedZones: ZoneInfo[] = [
  { id: "Asia/Kolkata", city: "India", country: "India", label: "India / IST", group: "Asia", keywords: ["india", "ist", "kolkata", "chennai", "mumbai", "delhi", "bangalore"], workStart: 9, workEnd: 18 },
  { id: "America/New_York", city: "New York", country: "USA", label: "New York / Eastern Time", group: "Americas", keywords: ["new york", "usa", "eastern", "et", "est", "edt"], workStart: 9, workEnd: 17 },
  { id: "America/Los_Angeles", city: "Los Angeles", country: "USA", label: "Los Angeles / Pacific Time", group: "Americas", keywords: ["los angeles", "california", "pacific", "pt", "pst", "pdt", "san francisco"], workStart: 8, workEnd: 17 },
  { id: "Europe/London", city: "London", country: "United Kingdom", label: "London / UK Time", group: "Europe", keywords: ["london", "uk", "united kingdom", "gmt", "bst"], workStart: 9, workEnd: 17 },
  { id: "Asia/Dubai", city: "Dubai", country: "UAE", label: "Dubai / Gulf Time", group: "Middle East", keywords: ["dubai", "uae", "gst", "abu dhabi"], workStart: 9, workEnd: 18 },
  { id: "Asia/Singapore", city: "Singapore", country: "Singapore", label: "Singapore / SGT", group: "Asia", keywords: ["singapore", "sgt", "sg"], workStart: 9, workEnd: 18 },
  { id: "UTC", city: "UTC", country: "Global", label: "UTC / Coordinated Universal Time", group: "Global", keywords: ["utc", "gmt", "zulu"], workStart: 9, workEnd: 17 },
  { id: "Europe/Berlin", city: "Berlin", country: "Germany", label: "Berlin / Central Europe", group: "Europe", keywords: ["berlin", "germany", "cet", "cest", "central europe"], workStart: 9, workEnd: 17 },
  { id: "Europe/Paris", city: "Paris", country: "France", label: "Paris / Central Europe", group: "Europe", keywords: ["paris", "france", "cet", "cest"], workStart: 9, workEnd: 17 },
  { id: "Asia/Tokyo", city: "Tokyo", country: "Japan", label: "Tokyo / JST", group: "Asia", keywords: ["tokyo", "japan", "jst"], workStart: 9, workEnd: 18 },
  { id: "Australia/Sydney", city: "Sydney", country: "Australia", label: "Sydney / AET", group: "Oceania", keywords: ["sydney", "australia", "aet", "aedt", "aest"], workStart: 9, workEnd: 17 },
  { id: "America/Chicago", city: "Chicago", country: "USA", label: "Chicago / Central Time", group: "Americas", keywords: ["chicago", "central", "ct", "cst", "cdt", "texas"], workStart: 9, workEnd: 17 },
  { id: "America/Denver", city: "Denver", country: "USA", label: "Denver / Mountain Time", group: "Americas", keywords: ["denver", "mountain", "mt", "mst", "mdt", "colorado"], workStart: 9, workEnd: 17 },
];

const regionCountryAliases: Record<string, string[]> = {
  "America/Toronto": ["canada", "ontario", "eastern canada"],
  "America/Vancouver": ["canada", "british columbia", "pacific canada"],
  "America/Edmonton": ["canada", "alberta", "mountain canada"],
  "America/Winnipeg": ["canada", "manitoba", "central canada"],
  "America/Halifax": ["canada", "nova scotia", "atlantic canada"],
  "America/St_Johns": ["canada", "newfoundland"],
  "America/Regina": ["canada", "saskatchewan"],
  "America/Whitehorse": ["canada", "yukon"],
  "America/New_York": ["usa", "united states", "america", "eastern"],
  "America/Los_Angeles": ["usa", "united states", "america", "california", "pacific"],
  "America/Chicago": ["usa", "united states", "america", "central"],
  "America/Denver": ["usa", "united states", "america", "mountain"],
  "Europe/London": ["uk", "united kingdom", "england", "britain"],
  "Asia/Kolkata": ["india", "bharat"],
  "Asia/Dubai": ["uae", "emirates", "middle east"],
  "Asia/Singapore": ["singapore"],
};

const stateProvinceAliases: Record<string, string[]> = {
  "America/Anchorage": ["alaska"],
  "America/Chicago": ["alabama", "arkansas", "illinois", "iowa", "louisiana", "minnesota", "mississippi", "missouri", "oklahoma", "wisconsin", "texas", "tennessee", "central time"],
  "America/Denver": ["arizona", "colorado", "montana", "new mexico", "utah", "wyoming", "mountain time"],
  "America/Detroit": ["michigan"],
  "America/Indiana/Indianapolis": ["indiana"],
  "America/Kentucky/Louisville": ["kentucky"],
  "America/Los_Angeles": ["california", "washington state", "oregon", "nevada", "pacific time"],
  "America/New_York": ["connecticut", "delaware", "florida", "georgia", "maine", "maryland", "massachusetts", "new hampshire", "new jersey", "new york state", "north carolina", "ohio", "pennsylvania", "rhode island", "south carolina", "vermont", "virginia", "west virginia", "washington dc", "eastern time"],
  "Pacific/Honolulu": ["hawaii"],
  "America/Toronto": ["ontario", "quebec", "nunavut", "eastern canada"],
  "America/Vancouver": ["british columbia", "bc", "pacific canada"],
  "America/Edmonton": ["alberta", "northwest territories", "mountain canada"],
  "America/Winnipeg": ["manitoba", "central canada"],
  "America/Regina": ["saskatchewan"],
  "America/Halifax": ["nova scotia", "new brunswick", "prince edward island", "atlantic canada"],
  "America/St_Johns": ["newfoundland and labrador"],
  "America/Whitehorse": ["yukon"],
  "Australia/Sydney": ["new south wales", "act", "australian capital territory"],
  "Australia/Melbourne": ["victoria"],
  "Australia/Brisbane": ["queensland"],
  "Australia/Adelaide": ["south australia"],
  "Australia/Perth": ["western australia"],
  "Australia/Hobart": ["tasmania"],
  "Europe/London": ["england", "scotland", "wales", "northern ireland"],
};

const cityAliases: Record<string, string[]> = {
  "America/Anchorage": ["anchorage", "fairbanks", "juneau"],
  "America/Boise": ["boise"],
  "America/Chicago": [
    "austin",
    "chicago",
    "dallas",
    "fort worth",
    "houston",
    "kansas city",
    "milwaukee",
    "minneapolis",
    "nashville",
    "new orleans",
    "oklahoma city",
    "san antonio",
    "st louis",
  ],
  "America/Denver": ["albuquerque", "boulder", "denver", "salt lake city"],
  "America/Detroit": ["detroit"],
  "America/Indiana/Indianapolis": ["indianapolis"],
  "America/Los_Angeles": [
    "bay area",
    "hollywood",
    "las vegas",
    "los angeles",
    "oakland",
    "portland",
    "sacramento",
    "san diego",
    "san francisco",
    "sanfrancisco",
    "sanfranisco",
    "san jose",
    "sanjose",
    "seattle",
    "silicon valley",
  ],
  "America/New_York": [
    "atlanta",
    "baltimore",
    "boston",
    "charlotte",
    "cleveland",
    "columbus",
    "miami",
    "new york",
    "newyork",
    "nyc",
    "orlando",
    "philadelphia",
    "pittsburgh",
    "raleigh",
    "tampa",
    "washington",
    "washington dc",
    "washington d.c.",
    "washingtondc",
    "dc",
  ],
  "America/Phoenix": ["phoenix", "scottsdale", "tucson"],
  "Pacific/Honolulu": ["honolulu", "waikiki"],
};

function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function titleCase(value: string) {
  return value
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : word)
    .join(" ");
}

function zoneCountry(id: string) {
  const region = id.split("/")[0] ?? "Global";
  const aliases = regionCountryAliases[id] ?? [];
  const countryAlias = aliases.find((item) => !["usa", "uk", "america", "eastern", "pacific", "central", "mountain"].includes(item));
  if (countryAlias) return titleCase(countryAlias);
  if (region === "America") return "Americas";
  if (region === "Europe") return "Europe";
  if (region === "Asia") return "Asia";
  if (region === "Africa") return "Africa";
  if (region === "Australia" || region === "Pacific") return "Oceania";
  return region;
}

function buildZones(): ZoneInfo[] {
  const intlWithValues = Intl as typeof Intl & { supportedValuesOf?: (key: "timeZone") => string[] };
  const supported = typeof intlWithValues.supportedValuesOf === "function" ? intlWithValues.supportedValuesOf("timeZone") : [];
  const dbZones = getTimeZones({ includeUtc: true });
  const dbByName = new Map(dbZones.map((zone) => [zone.name, zone]));
  const groupedNames = dbZones.flatMap((zone) => zone.group);
  const allIds = Array.from(new Set(["UTC", ...curatedZones.map((zone) => zone.id), ...supported, ...timeZonesNames, ...groupedNames])).sort();
  return allIds.map((id) => {
    const curated = curatedZones.find((zone) => zone.id === id);
    if (curated) return curated;
    const dbZone = dbByName.get(id) ?? dbZones.find((zone) => zone.group.includes(id));
    const parts = id.split("/");
    const city = dbZone?.mainCities[0] ?? titleCase(parts[parts.length - 1] ?? id);
    const group = dbZone?.continentName ?? parts[0] ?? "Global";
    const country = dbZone?.countryName ?? zoneCountry(id);
    const aliases = [
      ...(regionCountryAliases[id] ?? []),
      ...(stateProvinceAliases[id] ?? []),
      ...(cityAliases[id] ?? []),
      ...(dbZone?.mainCities ?? []).map((item) => item.toLowerCase()),
      dbZone?.alternativeName?.toLowerCase() ?? "",
      dbZone?.abbreviation?.toLowerCase() ?? "",
      dbZone?.countryCode?.toLowerCase() ?? "",
      dbZone?.continentName?.toLowerCase() ?? "",
    ].filter(Boolean);
    return {
      id,
      city,
      country,
      label: `${city} / ${country}`,
      group,
      keywords: [city.toLowerCase(), country.toLowerCase(), group.toLowerCase(), id.toLowerCase(), ...aliases],
      workStart: 9,
      workEnd: 17,
    };
  });
}

export const zones: ZoneInfo[] = buildZones();
export const zoneMap = new Map(zones.map((zone) => [zone.id, zone]));
export const canonicalZoneMap = new Map(getTimeZones({ includeUtc: true }).flatMap((zone) => zone.group.map((id) => [id, zone.name])));

export function usableZone(id: string) {
  return id === "UTC" ? "UTC" : canonicalZoneMap.get(id) ?? id;
}

export function friendlyLabel(id: string) {
  return zoneMap.get(id)?.label ?? id;
}

export function searchZones(query: string) {
  const q = query.trim().toLowerCase();
  const normalizedQuery = normalizeSearch(query);
  if (!q) return zones.slice(0, 80);
  return zones
    .map((zone) => {
      const text = [zone.city, zone.country, zone.label, zone.id, ...zone.keywords].join(" ").toLowerCase();
      const normalizedText = normalizeSearch(text);
      const exact = zone.keywords.includes(q) || zone.city.toLowerCase() === q || zone.country.toLowerCase() === q ? 20 : 0;
      const normalizedExact = zone.keywords.some((keyword) => normalizeSearch(keyword) === normalizedQuery) || normalizeSearch(zone.city) === normalizedQuery ? 22 : 0;
      const starts = text.split(/\s|\/|_/).some((part) => part.startsWith(q)) ? 8 : 0;
      const normalizedStarts = normalizedText.includes(normalizedQuery) ? 6 : 0;
      return { zone, score: text.includes(q) || normalizedText.includes(normalizedQuery) ? 1 + exact + normalizedExact + starts + normalizedStarts : 0 };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.zone);
}
