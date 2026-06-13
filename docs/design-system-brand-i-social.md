# MasSocios — Brand I · Social Content Design System

Replication guide for **static and motion social assets** (Instagram, LinkedIn, Stories, Reels, ads) using the exact visual language from `src/pages/brand-i.astro`.

**Source:** `src/pages/brand-i.astro`  
**Codename:** Brand I — *Midnight Navy + Electric Indigo* (dark SaaS / developer-tool aesthetic)  
**Product angle:** Gym management platform (clientes, turnos, cobos, métricas). **No WhatsApp** in this brand variant.

**Related docs:** `docs/design-system-v2.md` (shared v2 patterns; **different palette**), `PRODUCT.md` (voice and audience).

---

## Table of contents

1. [Identity at a glance](#1-identity-at-a-glance)
2. [Canvas sizes and safe zones](#2-canvas-sizes-and-safe-zones)
3. [Color tokens (Brand I only)](#3-color-tokens-brand-i-only)
4. [Typography for social](#4-typography-for-social)
5. [Background and atmosphere](#5-background-and-atmosphere)
6. [Logo and wordmark](#6-logo-and-wordmark)
7. [Layout templates](#7-layout-templates)
8. [UI micro-components](#8-ui-micro-components)
9. [Copy, voice, and content bank](#9-copy-voice-and-content-bank)
10. [Motion and video](#10-motion-and-video)
11. [Accessibility and export](#11-accessibility-and-export)
12. [Do / don't checklist](#12-do--dont-checklist)
13. [Replication checklist](#13-replication-checklist)

---

## 1. Identity at a glance

| Property | Value |
|---|---|
| Style | Dark SaaS · dev-tool · gym ops dashboard |
| Background | Midnight navy `#080b14` |
| Primary accent | Electric indigo `#6366f1` (CSS token `--green`) |
| Secondary accent | Periwinkle `#a5b4fc` (token `--lime`) |
| Display font | Bricolage Grotesque 600 |
| Body font | Geist 400–500 |
| Mono font | JetBrains Mono 400–600 |
| Card radius | 18px (modules), 22px (pricing), 12px (inner UI) |
| Pill radius | `999px` (nav, badges, chips) |
| Button radius | 12px |
| Grid unit | 64px background grid (subtle indigo lines) |
| Market | Spanish · UYU pricing · Uruguay/Argentina gym owners |

**Visual signature:** dark panels + thin borders + indigo glow blobs + monospace `//` eyebrows + animated gradient headline words + optional browser-frame product mock.

---

## 2. Canvas sizes and safe zones

Use these artboards in Figma, Canva, or After Effects. Always place text and logo inside **safe zones** so platform UI (likes, captions, profile chrome) does not crop content.

| Format | Size (px) | Ratio | Safe zone (margin from edge) |
|---|---|---|---|
| Instagram feed (square) | 1080 × 1080 | 1:1 | 80px all sides |
| Instagram feed (portrait) | 1080 × 1350 | 4:5 | 80px sides, 120px top/bottom |
| Instagram Story / Reel | 1080 × 1920 | 9:16 | 96px sides, 220px top, 280px bottom |
| LinkedIn post | 1200 × 627 | ~1.91:1 | 72px all sides |
| LinkedIn square | 1080 × 1080 | 1:1 | 80px |
| X / Twitter | 1600 × 900 | 16:9 | 80px |
| Carousel slide | 1080 × 1080 | 1:1 | Same as feed; keep headline in top 70% |

**Brand bar (recommended on every export):** bottom-left or top-left lockup — logo mark + `massocios` in Bricolage 600, 17px equivalent at 1080w (scale proportionally on other sizes).

**Background on all formats:** full-bleed `#080b14` + grid + glows (see §5). Do not use white or cream backgrounds for Brand I social.

---

## 3. Color tokens (Brand I only)

Copy exactly from `.h-root` in `brand-i.astro`. Token names say `green` / `lime` for historical v2 compatibility — **they are indigo/periwinkle**, not WhatsApp green.

```css
/* Brand I — scope to artboard root */
.brand-i-social {
  --bg:         #080b14;
  --bg-2:       #0d1120;
  --panel:      #111828;
  --panel-2:    #18213a;
  --line:       #1e2a42;
  --line-2:     #273550;
  --ink:        #e4e8f4;
  --ink-2:      #9aa5c4;
  --mute:       #5a6680;
  --green:      #6366f1;   /* primary accent — indigo */
  --green-deep: #4f46e5;
  --lime:       #a5b4fc;   /* secondary accent */
  --lime-soft:  #1e2040;   /* badge / chip backgrounds */
  --red:        #f87171;
  --warn:       #fbbf24;
}
```

### Semantic usage (social)

| Role | Token | Hex (reference) |
|---|---|---|
| Canvas fill | `--bg` | `#080b14` |
| Card / panel | `--panel` | `#111828` |
| Card hover / emphasis | `--panel-2` | `#18213a` |
| Primary text | `--ink` | `#e4e8f4` |
| Body / subcopy | `--ink-2` | `#9aa5c4` |
| Timestamps, URLs | `--mute` | `#5a6680` |
| Borders | `--line` / `--line-2` | `#1e2a42` / `#273550` |
| CTA fill, logo icon | `--green` | `#6366f1` |
| CTA hover, gradient end | `--lime` | `#a5b4fc` |
| Eyebrows, mono highlights | `--lime` | `#a5b4fc` |
| Badge background | `--lime-soft` | `#1e2040` |
| Warning stat border | `--warn` at ~40% | `#fbbf24` |
| Traffic-light red (frame only) | — | `#ff5f57` |
| Traffic-light yellow | — | `#febc2e` |
| Traffic-light green | — | `#28c840` |

### Gradient text (headline accent words)

```css
.grad-text {
  background: linear-gradient(
    120deg,
    #6366f1 0%,
    #a5b4fc 60%,
    #6366f1 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  /* Optional motion: shift background-position 0% → 100% over 6s ease-in-out loop */
}
```

### Avatar / chip accent colors (activity feed)

Use for circular initials in product UI crops:

| Initial | Background | Text |
|---|---|---|
| M | `rgba(37,99,235,.15)` | `#60a5fa` |
| L | `rgba(124,58,237,.15)` | `#a78bfa` |
| P | `rgba(5,150,105,.15)` | `#34d399` |

---

## 4. Typography for social

### 4.1 Font files

```
https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap
```

| Family | Role on `brand-i` |
|---|---|
| **Bricolage Grotesque** | Headlines, logo wordmark, stat numbers, marquee phrases, card titles |
| **Geist** | Body, lead paragraphs, module descriptions |
| **JetBrains Mono** | Eyebrows (`// 02 ·`), meta strip, stat labels, chips, code lines, FAQ IDs |

### 4.2 Type scale at 1080px width (reference)

Scale proportionally for other canvas widths: `size × (canvasWidth / 1080)`.

| Element | Font | Weight | Size @1080 | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| Hero H1 | Bricolage | 600 | 96–110px | 0.92 | -0.04em |
| Section H2 | Bricolage | 600 | 64–72px | 0.95 | -0.035em |
| Card H3 | Bricolage | 600 | 24px | 1.1 | -0.02em |
| Lead | Geist | 400 | 20–21px | 1.55 | 0 |
| Body | Geist | 400 | 15–18px | 1.55 | 0 |
| Eyebrow | JetBrains Mono | 400 | 12px | 1.4 | 0.04em |
| Meta strip | JetBrains Mono | 400 | 13px | 1.4 | 0 |
| Stat number | Bricolage | 600 | 22–56px | 1 | -0.02em |
| Stat label | JetBrains Mono | 400 | 10–11px | 1.3 | 0 |
| Code line | JetBrains Mono | 400 | 13px | 1.4 | 0 |
| CTA button | Geist/Bricolage | 600 | 15–17px | 1 | 0 |
| Logo wordmark | Bricolage | 600 | 17px | 1 | -0.02em |

### 4.3 Text treatments

- **Gradient span:** one or two words per headline (e.g. *Sin caos.*, *Todo tu negocio.*).
- **Ink emphasis:** body phrase in `--ink` with dashed underline `1px dashed #6366f1` (class `.h-ink` on web).
- **Mono bullet meta:** `●` in `--lime` + label in `--mute` (JetBrains Mono).
- **Eyebrow pattern:** `// 02 · capacidades` — always lowercase module id after the dot when possible.

---

## 5. Background and atmosphere

Every social frame should feel like the site hero: **grid + two glows** on `--bg`.

### 5.1 Base fill

Solid `#080b14` edge to edge.

### 5.2 Grid overlay

- Lines: `color-mix(in srgb, #6366f1 6%, transparent)` at 1px
- Cell size: **64 × 64px**
- Fade: radial mask centered top — full opacity at top, transparent ~70% down the canvas  
  (`mask-image: radial-gradient(circle at 50% 0%, black 0%, transparent 70%)`)

### 5.3 Ambient glows (two blobs)

| Blob | Size | Position | Fill | Blur | Opacity |
|---|---|---|---|---|---|
| Glow 1 | 600×600 | top-left, partly off-canvas | `radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 60%)` | 80px | 0.4 |
| Glow 2 | 600×600 | right ~30% vertical | `radial-gradient(circle, rgba(165,180,252,0.3) 0%, transparent 60%)` | 80px | 0.4 |

Content and cards sit **above** grid and glows (higher z-index).

### 5.4 Panel card treatment

```
background: #111828
border: 1px solid #1e2a42
border-radius: 18px
padding: 28px (scale for small formats)
```

Hover/emphasis in static posts: use `--panel-2` border `#6366f1` (no hover animation required).

---

## 6. Logo and wordmark

### 6.1 Mark (SVG)

ViewBox `0 0 32 32`, stroke + fill:

- Outer ring: circle `cx=16 cy=16 r=14`, `stroke=currentColor`, `stroke-width=1.4`, no fill
- Inner dot: circle `cx=16 cy=16 r=5`, `fill=currentColor`
- Color: `#6366f1` on dark backgrounds; on indigo CTA buttons use `#080b14` for contrast

**Sizes @1080px:** nav 22×22px, footer 18×18px — for social header use **32–40px** mark + wordmark gap **10px**.

### 6.2 Wordmark

- Text: `massocios` (lowercase)
- Bricolage Grotesque **600**
- Color: `#e4e8f4` on dark; on primary CTA use `#080b14`

### 6.3 Clear space

Minimum padding around lockup = **height of the mark** on all sides.

---

## 7. Layout templates

Eight repeatable compositions mapped to `brand-i` sections. Pick one per slide/post.

### Template A — Hero statement

**Use:** launch posts, paid ads, cover slide.

```
[optional hero-tag: [01] ——— v.2026 · gestión para gimnasios]
H1: Gestioná tu gym. + grad "Sin caos."
Lead: 1–2 lines Geist ink-2, max ~620px wide
CTA row: primary button OR meta strip only
```

- Primary button: bg `#6366f1`, text `#080b14`, radius 12px, shadow `0 12px 30px -8px` indigo 60% mix
- Include **pulse dot** 8px `#080b14` left of CTA label when mimicking live product

### Template B — Marquee band

**Use:** Stories middle beat, Reels text overlay, carousel divider.

- Full-width band, bg `#0d1120`, border top/bottom `#1e2a42`, padding ~18px vertical
- Phrases: Bricolage 500, ~28px @1080, alternating `--ink` and `--mute`
- Separators: `·` in JetBrains Mono, color `#6366f1`, ~80% size of phrase

**Phrase bank (from page):**  
`+ 120 gimnasios` · `cobros automáticos` · `agenda online` · `métricas en vivo` · `app para clientes` · `sin Excel`

### Template C — Module card (2×2 grid crop)

**Use:** feature carousels (4 slides).

Each card:

1. Eyebrow: `// clientes` | `// agenda` | `// cobros` | `// stats`
2. Title: Bricolage 24px
3. Body: Geist 15px `#9aa5c4`
4. Inner vis block: bg `#080b14`, border `#1e2a42`, radius 12px, padding 18px

Reuse inner visuals from the page: client rows with dots, schedule list, payment flow steps, bar chart.

### Template D — Stat quad

**Use:** proof posts, “numbers” Stories.

Four cells in 2×2:

```
Label: JetBrains Mono 10px #5a6680
Number: Bricolage 22–40px #e4e8f4
Delta: JetBrains Mono 10px (up: #6366f1, warn: #fbbf24)
```

Example copy:

| Label | Number | Delta |
|---|---|---|
| Clientes activos | 248 | +12 este mes |
| Cobros este mes | 89.4k | +8% vs anterior |
| Turnos hoy | 34 | 8 disponibles |
| Vencen esta semana | 17 | requieren acción (warn card) |

Warn card: border `rgba(251,191,36,.4)`, bg `rgba(251,191,36,.04)`.

### Template E — Product frame crop

**Use:** “see the product” posts, demo Reels still.

Browser chrome strip:

- Dots 11px: `#ff5f57`, `#febc2e`, `#28c840`
- URL: JetBrains Mono 12px `#5a6680` — `app.massocios.com / panel`
- Live pill: bg `#a5b4fc`, text `#080b14`, uppercase `live`

Frame: radius 18px, shadow `0 40px 80px -30px rgba(0,0,0,.7)`. Optional slight `rotateX(2deg)` for depth in 3D-aware tools.

Crop **main panel only** (stats + activity) for square posts; include sidebar for landscape.

### Template F — Numbered step

**Use:** onboarding carousel, tutorial Reels.

- Left: outline number `01`–`03`, Bricolage 120px, transparent fill, stroke `#273550` 1px
- Right: panel card with title, short body, optional `h-codeline` mono snippet

Example code lines:

```
$ massocios init --gym="Iron Gym"
→ clientes.csv · 248 registros · importados ✓
→ status: live · 248 clientes · 34 turnos hoy  (lime text)
```

### Template G — Pricing

**Use:** promo posts, Stories swipe-up context.

Two cards side by side (stack on 9:16):

| | Starter | Pro (featured) |
|---|---|---|
| Tag | `// para empezar` | `// todo incluido` + pill `popular` |
| Price | UYU 1.800 / mes | UYU 3.200 / mes (grad on amount) |
| Featured | — | border `#6366f1`, glow blob top-right 15% opacity |

Checklist bullets: Geist 14.5px, checkmark via indigo L-shape (not icon font).

### Template H — Final CTA

**Use:** last carousel slide, Story end frame.

- Outer panel `#111828`, radius 32px, centered
- Radial accents: indigo 30% top-left, periwinkle 25% bottom-right (soft)
- Eyebrow: `// next step` centered
- H2 + grad line + mono subline: `30 días sin tarjeta · setup asistido`
- Large primary CTA with pulse dot

---

## 8. UI micro-components

Portable pieces for compositing inside templates.

### 8.1 Eyebrow tag (hero)

`[01]` in `#a5b4fc` + 60px gradient line (`#a5b4fc` → transparent) + muted label.

### 8.2 Meta strip items

`●` `#a5b4fc` + text `#5a6680`:

- Sin tarjeta de crédito
- Setup en < 1h
- Soporte humano local
- Cancelás cuando querés

### 8.3 Chips

| Variant | Background | Text |
|---|---|---|
| green | `color-mix(#6366f1 12%, transparent)` | `#6366f1` |
| lime | `#1e2040` | `#a5b4fc` |

Labels: `pagado`, `turno`, `nuevo`, `plan pro · activo`, `vence en 3 días` (hot uses lime-soft + lime text).

### 8.4 Status dot (live)

8px circle `#080b14` on CTA; 6px `#6366f1` on badges. Optional pulse ring: indigo 40% → transparent 6px over 1.6s.

### 8.5 Buttons

| Type | Background | Text | Border / shadow |
|---|---|---|---|
| Primary | `#6366f1` | `#080b14` | 1px `#4f46e5`, soft indigo glow |
| Primary hover (static alt state) | `#a5b4fc` | `#080b14` | — |
| Ghost | `#111828` | `#e4e8f4` | 1px `#273550` |
| Nav CTA mini | `#6366f1` pill | `#080b14` | radius 999px |

### 8.6 Schedule row (agenda vis)

`08:00` mono mute · class name Geist 600 · `12/15 · instructor` mute · dot 10px full `#6366f1` or ok `#a5b4fc`.

### 8.7 Bar chart (métricas vis)

Container height ~110px; bars `#18213a`; highlight bar gradient `180deg, #a5b4fc → #6366f1`; radius top 4px.

---

## 9. Copy, voice, and content bank

Aligned with `PRODUCT.md` and `brand-i` copy. Spanish, direct, outcomes-first.

### 9.1 Voice rules

- **Confident, practical** — no spa/wellness tone, no hype stacks
- **Outcome > feature** — “cobros automáticos” not “payment module”
- **Numbers when possible** — 248 clientes, 14 días, UYU 3.200
- **voseo** where natural: *Gestioná*, *Cancelás*, *querés*
- Avoid WhatsApp in Brand I assets (use “plataforma”, “app”, “panel”)

### 9.2 Headlines (approved variants)

- Gestioná tu gym. **Sin caos.**
- Una plataforma. **Todo tu negocio.**
- En un día, **listo para siempre.**
- Pagás **menos** que un día de staff.
- El gym que gestionás **como un profesional.**

### 9.3 Subheads / leads

- Turnos, membresías, pagos y clientes en una sola plataforma.
- Cuatro módulos. Una sola app. Reemplaza el Excel, la libreta y los grupos de WhatsApp del staff.
- Sin permanencia. Cancelás cuando querés. Soporte humano en español.

### 9.4 CTAs

- Iniciar prueba · 14 días
- Empezar / Empezar gratis ahora
- Probar 14 días gratis →
- Ver el producto

### 9.5 FAQ one-liners (Story FAQ stickers)

| ID | Question | Answer (short) |
|---|---|---|
| Q.01 | ¿Necesito saber programar? | No. Setup visual en español, menos de 1 hora. |
| Q.02 | ¿Importar desde Excel? | Sí — nombre, plan, vencimiento, contacto. |
| Q.03 | ¿Cobros automáticos? | Recordatorios y links antes del vencimiento. |
| Q.04 | ¿Clientes instalan algo? | No — web sin login para reservar y pagar. |
| Q.05 | ¿Probar antes de pagar? | 14 días gratis, sin tarjeta. |

### 9.6 Hashtags (optional, end card)

Keep minimal: `#gimnasio` `#fitnessbusiness` `#gestión` `#MasSocios` — adjust per market campaign.

---

## 10. Motion and video

For Reels, Stories video, and paid motion.

| Element | Spec |
|---|---|
| Gradient headline | Background-position 0% ↔ 100%, **6s** ease-in-out infinite |
| Marquee band | Translate X 0 → -50%, **28s** linear infinite; duplicate text for seamless loop |
| Live pulse dot | Box-shadow ring **1.4–1.6s** ease-out infinite |
| Card hover | Not required in video; use scale 1.02 on beat instead |
| Reduced motion | Export still frame version: static gradient, no marquee |

**Beat structure (15–30s Story):**

1. Template A (2s)
2. Template B scroll (3s)
3. Template D stats (4s)
4. Template E product crop (5s)
5. Template H CTA (3s)

Audio: neutral electronic or no music; prioritize legible Spanish supers.

---

## 11. Accessibility and export

- Body text on `#080b14` / `#111828`: use `#e4e8f4` or `#9aa5c4` only; verify **≥ 4.5:1** contrast for small mono labels (mute on bg may be borderline — use ink-2 for critical copy).
- Minimum text on Stories: **24px** Geist equivalent @1080×1920 for body.
- Do not rely on gradient alone for meaning; repeat key word in solid `#e4e8f4` when possible.
- Export: PNG for static; MP4 H.264 for video; embed sRGB; no CMYK.

**File naming:**

```
massocios-brand-i_{format}_{template}_{slug}_v01.png
例: massocios-brand-i_1080x1080_template-a_hero-sin-caos_v01.png
```

---

## 12. Do / don't checklist

### Do

- Use Brand I indigo palette only (`#6366f1` / `#a5b4fc` / navy bg)
- Include grid + glow atmosphere on every piece
- Use Bricolage + Geist + JetBrains Mono trio
- Use `//` mono eyebrows and `Q.01` FAQ ids for dev-tool consistency
- Show product via browser frame or stat cards when proving value
- Price in **UYU** for Uruguay campaigns
- Keep copy in Spanish with voseo

### Don't

- Import v2 **green** palette from `design-system-v2.md` (`#25d366`, `#0a100d`) — wrong brand
- Use index.astro neo-brutalist cream/magenta/yellow system
- Use generic Inter-only layouts or white cards on white
- Lead with WhatsApp UI in Brand I social (wrong variant)
- Over-animation on small text; respect reduced-motion exports
- Stretch logo mark or switch to uppercase MASSOCIOS

---

## 13. Replication checklist

Before publishing a social asset:

- [ ] Canvas size and safe zones from §2
- [ ] Background `#080b14` + 64px grid + two indigo glows
- [ ] All colors from §3 (no v2 green, no index cream)
- [ ] Fonts loaded: Bricolage, Geist, JetBrains Mono
- [ ] At most 1–2 gradient words per headline
- [ ] Logo mark + `massocios` with clear space
- [ ] Copy matches §9 voice; CTAs consistent
- [ ] Contrast checked for body and CTA text
- [ ] File named per §11 convention
- [ ] Source reference noted: `brand-i.astro` / Brand I

---

## Appendix A — Complete CSS variable block

```css
.brand-i-social {
  --bg: #080b14;
  --bg-2: #0d1120;
  --panel: #111828;
  --panel-2: #18213a;
  --line: #1e2a42;
  --line-2: #273550;
  --ink: #e4e8f4;
  --ink-2: #9aa5c4;
  --mute: #5a6680;
  --green: #6366f1;
  --green-deep: #4f46e5;
  --lime: #a5b4fc;
  --lime-soft: #1e2040;
  --red: #f87171;
  --warn: #fbbf24;

  background: var(--bg);
  color: var(--ink);
  font-family: 'Geist', 'Inter Tight', system-ui, sans-serif;
  line-height: 1.55;
}
```

## Appendix B — Border radius quick reference

| Element | Radius |
|---|---|
| Nav / pills / badges | 999px |
| Primary / ghost buttons | 12px |
| Module cards, FAQ, frame | 18px |
| Pricing cards | 22px |
| Final CTA section | 32px |
| Inner vis / stats / activity rows | 8–10px |
| Bar chart bars | 4px top |

## Appendix C — Class mapping (`brand-i.astro` → social name)

| Web class | Social label |
|---|---|
| `.h-root` | Artboard root |
| `.h-grad` | Gradient headline span |
| `.h-hero-tag` | Template A tag row |
| `.h-meta-strip` | Trust bullets |
| `.h-marquee` | Template B |
| `.h-mod` | Template C card |
| `.h-stat` | Template D cell |
| `.h-prev-frame` | Template E |
| `.h-flow` | Template F |
| `.h-vprice` | Template G |
| `.h-final` | Template H |

---

*Document generated from `src/pages/brand-i.astro`. Update when Brand I palette or copy changes on that page.*
