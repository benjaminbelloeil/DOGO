# Studio section: dual expanding cards

## Context

`src/components/site/studio.tsx` (section label "Alquilá tu espacio o anunciá tu marca", `id="estudio"`) currently renders one large white panel split into two `md:grid-cols-2` columns: a plain feature list ("Reservá el estudio") and a dashed-border empty ad slot ("Anunciantes"). It reads as one complicated card, not two distinct offers. Below it, two CTA buttons live in a separate row.

The section was reordered earlier in this session to appear right after the hero (`src/app/page.tsx`), as part of a push toward renting/promotion. This redesign is scoped to the card content only — it does not change the section's position, header copy, or the surrounding `<Container>`/`RevealHeader` structure.

## Goal

Replace the single complicated panel with two side-by-side cards — "Alquilá tu espacio" and "Anunciá tu marca" — that read clearly at a glance and reveal detail on interaction, instead of showing everything at once.

## Interaction design (validated via live browser mockups)

Desktop/pointer-fine (`md:` and up):
- Two cards sit side by side, equal width, fixed height (~420px / `h-[420px]`).
- At rest, each card shows: icon badge, eyebrow label, title, one-line tagline — anchored to the bottom of the card.
- On hover, the hovered card's `flex-grow` increases (`flex-1.75` open / `flex-0.62` shrunk via `has(~ :hover)` sibling CSS), pushing the other card narrower.
- The shrunk card's text content fades out; a centered icon badge (`mini`) fades in — same icon as its badge, just alone and centered.
- The expanded card reveals a perks row (pill chips with icon + label, from existing copy) and a CTA link, via `max-height`/`opacity` transitions timed so text arrives after the width settles.
- Motion uses the site's existing easing curve `cubic-bezier(0.16,1,0.3,1)` (already used in `navbar.tsx` and `studio-gallery.tsx`) — no new easing invented.
- Both cards' `flex` transition is the only width/layout animation; everything else animates `opacity`/`max-height`/`transform` only.

Mobile/touch (below `md`, or `pointer: coarse`):
- No hover affordance exists, so cards stack full-width, vertically, with full content always visible (icon, title, tagline, perks, CTA) — no shrink/expand state.
- This follows the existing sitewide pattern of `pointer-fine:` hover-reveal vs. always-visible-on-touch, already used in `how-it-works.tsx` for the team bios.

## Visual design (validated via live browser mockups)

- **No photography.** Earlier iterations tried a real studio photo on the left card; user explicitly rejected it in favor of the flat/graphic treatment already used on the right (gold) card.
- Both cards use a brand-color gradient fill, not a neutral/white card shell:
  - "Alquilá tu espacio": `linear-gradient(160deg, #501f80, #3a1660)` (grape → grape-deep).
  - "Anunciá tu marca": `linear-gradient(160deg, #fcb034, #e0951a)` (gold → gold-deep).
- A faint oversized rotated watermark word sits behind the content on each card ("AL AIRE" / "TU MARCA"), echoing the existing watermark treatment already used on `/estudio` and `/anuncia`'s closing CTA sections (`text-grape/[0.06]` / `text-gold/[0.08]` at `text-[9rem]`/`text-[13rem]`, `-rotate-6`).
- **All text is white on both cards**, including on the gold card. Because white directly on the light gold gradient fails contrast, the gold card gets a dark scrim behind its content: `linear-gradient(180deg, transparent 30%, rgba(36,16,67,0.55) 70%, rgba(36,16,67,0.82) 100%)` (uses the existing `--color-ink` value). The grape card needs no scrim — it's already dark enough for white text on its own.
- Icon badges: `rgba(255,255,255,0.16)` fill, `rgba(255,255,255,0.24)` border, white icon, on both cards (not the grape/gold-tinted badges used elsewhere on the site, since both cards are now colored fills rather than white surfaces).
- Perk pills: `rgba(255,255,255,0.16)` fill / white text / white 0.26-alpha border, on both cards.
- Typography: `font-display` (Fredoka, matching the rest of the site) for eyebrow, title; existing body text styling for tagline.
- Icons: swap the mockup's placeholder emoji for real `lucide-react` icons, matching the icon set already used in `studio.tsx`/`estudio/page.tsx`: `Mic`, `Video`/`MonitorPlay`, `Wifi` for the studio card's perks; `Radio`, `Mic`, `Share2` for the ad card's perks (these are the existing `features`/`adPerks` arrays already in `studio.tsx` — reuse their copy, don't invent new copy).
- CTA: arrow-nudge-on-hover pattern already used across the site (`ArrowUpRight` translating on `group-hover`).

## Content mapping (reuse existing copy, no new invented content)

- Card 1 — "Alquilá tu espacio" (links to `/estudio`, "Agendar el estudio"):
  - Tagline: reuse existing studio intro copy ("Grabá tu podcast, transmití en vivo o producí tu contenido...").
  - Perks: 3 of the existing 4 `features` items (Audio profesional, Streaming, Internet veloz) — drop "Espacio climatizado" to keep the pill row from wrapping to a second line at this card width; the full 4-item rider list still lives on `/estudio`.
- Card 2 — "Anunciá tu marca" (links to `/anuncia`, "Anunciá con DOGO"):
  - Tagline: reuse existing ad copy framing ("Tu logo, tu mensaje... sonando todas las mañanas" — condensed to one line).
  - Perks: reuse the existing `adPerks` array as-is (FM 99.9 + streaming, Menciones en vivo, Contenido en redes).

## Component scope

- Rewrite the card-rendering portion of `src/components/site/studio.tsx` (the `Reveal` block currently containing the white panel + two-column grid). Keep `RevealHeader`/`SectionLabel`/`SectionTitle`/`SectionIntro` above it unchanged (aside from the label text change already applied: "Alquilá tu espacio o anunciá tu marca").
- The separate CTA row below the panel (the `Link` buttons to `/estudio` and `/anuncia`) becomes redundant once each card carries its own CTA — remove it, since both destinations are now reachable from their respective card.
- `features` and `adPerks` data arrays stay, trimmed/reused as described above. `ctaClass` constant becomes unused and should be removed if nothing else references it.
- New client-side behavior needed: none — this is pure CSS (`:has()` sibling selector, already used in the approved mockup and supported in current evergreen browsers; Tailwind arbitrary variants or a small scoped `<style>`/CSS module can express it). No JS state, no Framer Motion required — matches the "isolate interactivity" principle by not needing any interactivity isolation at all.

## Out of scope

- No changes to section position, header copy (already done), or any other section on the page.
- No new imagery/photography.
- No changes to `/estudio` or `/anuncia` pages themselves beyond what a shared card might link to.
