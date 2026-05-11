import { Search } from "lucide-react";
import { searchZones } from "../data/timeZones";

type SelectZoneProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  query: string;
  setQuery: (value: string) => void;
};

export function SelectZone({ value, onChange, label, query, setQuery }: SelectZoneProps) {
  const results = searchZones(query).slice(0, 8);
  const handleQueryChange = (nextQuery: string) => {
    setQuery(nextQuery);
    const [firstResult] = searchZones(nextQuery);
    if (firstResult) onChange(firstResult.id);
  };

  return (
    <label className="field">
      <span>{label}</span>
      <div className="searchbox">
        <Search size={18} />
        <input value={query} onChange={(event) => handleQueryChange(event.target.value)} placeholder="Search Canada, Toronto, ET, UTC..." />
      </div>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {results.map((zone) => (
          <option key={zone.id} value={zone.id}>
            {zone.label}
          </option>
        ))}
      </select>
    </label>
  );
}
