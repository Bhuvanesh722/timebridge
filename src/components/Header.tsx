import { CalendarClock, Moon, Sun } from "lucide-react";
import type { Page, Preferences } from "../types";

type HeaderProps = {
  page: Page;
  prefs: Preferences;
  openPage: (page: Page) => void;
  setPrefs: React.Dispatch<React.SetStateAction<Preferences>>;
};

export function Header({ page, prefs, openPage, setPrefs }: HeaderProps) {
  return (
    <header className="topbar">
      <button className="brand" onClick={() => openPage("home")} aria-label="Open home">
        <CalendarClock size={28} />
        <span>TimeBridge</span>
      </button>
      <nav aria-label="Primary navigation">
        {(["converter", "clocks", "planner", "directory"] as Page[]).map((item) => (
          <button key={item} className={page === item ? "active" : ""} onClick={() => openPage(item)}>
            {item === "clocks" ? "World Clocks" : item[0].toUpperCase() + item.slice(1)}
          </button>
        ))}
      </nav>
      <button className="iconButton" onClick={() => setPrefs((current) => ({ ...current, theme: current.theme === "light" ? "dark" : "light" }))} aria-label="Toggle theme">
        {prefs.theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
      </button>
    </header>
  );
}
