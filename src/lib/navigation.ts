import { conversionPresets } from "../data/presets";
import type { Page } from "../types";

export function pageFromHash(): Page {
  const hash = location.hash.replace("#/", "");
  if (hash === "clocks") return "clocks";
  if (hash === "planner") return "planner";
  if (hash === "directory") return "directory";
  if (hash === "guides") return "guides";
  if (hash === "about") return "about";
  if (hash === "privacy") return "privacy";
  if (hash === "contact") return "contact";
  if (hash === "converter" || conversionPresets.some((preset) => preset.slug === hash)) return "converter";
  return "home";
}

export function presetFromHash() {
  const hash = location.hash.replace("#/", "");
  return conversionPresets.find((preset) => preset.slug === hash) ?? null;
}
