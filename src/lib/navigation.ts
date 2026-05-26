import { conversionPresets } from "../data/presets";
import type { Page } from "../types";

function currentRoute() {
  return location.hash.startsWith("#/") ? location.hash.replace("#/", "") : location.pathname.replace(/^\/+/, "");
}

export function pageFromLocation(): Page {
  const route = currentRoute();
  if (route === "clocks") return "clocks";
  if (route === "planner") return "planner";
  if (route === "directory") return "directory";
  if (route === "guides") return "guides";
  if (route === "about") return "about";
  if (route === "privacy") return "privacy";
  if (route === "contact") return "contact";
  if (route === "converter" || conversionPresets.some((preset) => preset.slug === route)) return "converter";
  return "home";
}

export function presetFromLocation() {
  const route = currentRoute();
  return conversionPresets.find((preset) => preset.slug === route) ?? null;
}
