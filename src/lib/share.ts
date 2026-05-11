import type { Preferences } from "../types";
import type React from "react";

export function copyText(text: string, setToast: (value: string) => void) {
  navigator.clipboard?.writeText(text).then(
    () => setToast("Copied to clipboard"),
    () => setToast("Copy failed. Select the text and copy manually."),
  );
}

export function shareText(title: string, text: string, setToast: (value: string) => void) {
  if ("share" in navigator) {
    navigator.share({ title, text }).then(
      () => setToast("Share sheet opened"),
      () => copyText(text, setToast),
    );
    return;
  }
  copyText(text, setToast);
}

export function rememberRecent(id: string, setPrefs: React.Dispatch<React.SetStateAction<Preferences>>) {
  setPrefs((current) => ({
    ...current,
    recentTimeZones: [id, ...current.recentTimeZones.filter((zone) => zone !== id)].slice(0, 6),
  }));
}
