import type { Page } from "../types";

export function Footer({ openPage }: { openPage: (page: Page) => void }) {
  return (
    <footer className="siteFooter">
      <div>
        <strong>TimeBridge</strong>
        <p>Timezone tools and plain-English guides for global work, remote teams, travel, interviews, webinars, and deadline planning.</p>
      </div>
      <nav aria-label="Footer navigation">
        <button onClick={() => openPage("guides")}>Guides</button>
        <button onClick={() => openPage("about")}>About</button>
        <button onClick={() => openPage("privacy")}>Privacy</button>
        <button onClick={() => openPage("contact")}>Contact</button>
      </nav>
    </footer>
  );
}
