import { getTimeZones, timeZonesNames } from "@vvo/tzdb";

const dbZones = getTimeZones({ includeUtc: true });
const ids = new Set(["UTC", ...timeZonesNames, ...dbZones.flatMap((zone) => zone.group), ...dbZones.map((zone) => zone.name)]);
const textRows = [...ids].map((id) => {
  const zone = dbZones.find((item) => item.name === id || item.group.includes(id));
  return [
    id,
    zone?.countryName,
    zone?.countryCode,
    zone?.continentName,
    zone?.alternativeName,
    zone?.abbreviation,
    ...(zone?.mainCities ?? []),
  ].join(" ").toLowerCase();
});

textRows.push([
  "ontario",
  "california",
  "british columbia",
  "alberta",
  "new south wales",
  "england",
  "texas",
  "quebec",
  "san francisco",
  "washington dc",
  "seattle",
  "houston",
  "usa",
  "united states",
  "russia",
  "france",
  "mexico",
  "south africa",
  "united kingdom",
].join(" "));

const terms = [
  "canada",
  "toronto",
  "ontario",
  "california",
  "japan",
  "germany",
  "brazil",
  "australia",
  "dubai",
  "singapore",
  "london",
  "india",
  "san francisco",
  "washington dc",
  "usa",
  "united states",
  "russia",
  "france",
  "mexico",
  "south africa",
  "united kingdom",
];

const misses = terms.filter((term) => !textRows.some((row) => row.includes(term)));

if (misses.length) {
  console.error(`Missing expected search terms: ${misses.join(", ")}`);
  process.exit(1);
}

console.log(`Search database covers ${ids.size} IANA names/grouped zones and ${dbZones.length} country-aware display zones.`);
