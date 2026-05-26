import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Toast } from "./components/Toast";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Converter } from "./pages/Converter";
import { Directory } from "./pages/Directory";
import { Guides } from "./pages/Guides";
import { Home } from "./pages/Home";
import { MeetingPlanner } from "./pages/MeetingPlanner";
import { Privacy } from "./pages/Privacy";
import { WorldClocks } from "./pages/WorldClocks";
import { pageFromLocation, presetFromLocation } from "./lib/navigation";
import { loadPrefs, savePrefs } from "./lib/preferences";
import type { ConversionPreset, Page } from "./types";

export function App() {
  const [page, setPage] = useState<Page>(pageFromLocation);
  const [activePreset, setActivePreset] = useState<ConversionPreset | null>(presetFromLocation);
  const [prefs, setPrefs] = useState(loadPrefs);
  const [toast, setToast] = useState("");

  const openPage = (nextPage: Page, preset: ConversionPreset | null = null) => {
    setPage(nextPage);
    setActivePreset(preset);
    const path = preset ? preset.slug : nextPage === "home" ? "" : nextPage;
    history.pushState(null, "", path ? `/${path}` : "/");
  };

  useEffect(() => savePrefs(prefs), [prefs]);
  useEffect(() => {
    document.documentElement.dataset.theme = prefs.theme;
  }, [prefs.theme]);
  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timeout);
  }, [toast]);
  useEffect(() => {
    const syncRoute = () => {
      setPage(pageFromLocation());
      setActivePreset(presetFromLocation());
    };
    window.addEventListener("popstate", syncRoute);
    window.addEventListener("hashchange", syncRoute);
    return () => {
      window.removeEventListener("popstate", syncRoute);
      window.removeEventListener("hashchange", syncRoute);
    };
  }, []);

  return (
    <main>
      <Header page={page} prefs={prefs} openPage={openPage} setPrefs={setPrefs} />
      {page === "home" && <Home openPage={openPage} prefs={prefs} />}
      {page === "converter" && <Converter prefs={prefs} setPrefs={setPrefs} setToast={setToast} activePreset={activePreset} />}
      {page === "clocks" && <WorldClocks prefs={prefs} setPrefs={setPrefs} setToast={setToast} />}
      {page === "planner" && <MeetingPlanner prefs={prefs} setToast={setToast} />}
      {page === "directory" && <Directory prefs={prefs} />}
      {page === "guides" && <Guides />}
      {page === "about" && <About />}
      {page === "privacy" && <Privacy />}
      {page === "contact" && <Contact />}
      <Footer openPage={openPage} />
      <Toast message={toast} />
    </main>
  );
}
