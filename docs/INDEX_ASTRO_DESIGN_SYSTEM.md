# MasSocios `index.astro` Design System — Replication Guide

This document is the **authoritative specification** for reproducing the visual and structural design of the production homepage at `src/pages/index.astro`. Every token, class, breakpoint, and pattern below is taken directly from that file. Follow it literally when building new pages, components, or exports.

**Source file:** `src/pages/index.astro`  
**Root wrapper class:** `.v3-root` (historical name; this is the live homepage design, not a draft)  
**Layout:** `Layout.astro` with `showHeader={false}` and `showFooter={false}` — the page owns nav and footer entirely.

---

## Table of contents

1. [Design philosophy](#1-design-philosophy)
2. [Technical setup](#2-technical-setup)
3. [Color system](#3-color-system)
4. [Typography](#4-typography)
5. [Spacing, layout, and grids](#5-spacing-layout-and-grids)
6. [Visual language (neo-brutalist rules)](#6-visual-language-neo-brutalist-rules)
7. [Motion and animation](#7-motion-and-animation)
8. [Accessibility](#8-accessibility)
9. [Page structure (sections in order)](#9-page-structure-sections-in-order)
10. [Component reference](#10-component-reference)
11. [WhatsApp UI subsystems](#11-whatsapp-ui-subsystems)
12. [Responsive breakpoints](#12-responsive-breakpoints)
13. [Replication checklist](#13-replication-checklist)
14. [Differences from `v3.astro`](#14-differences-from-v3astro)

---

## 1. Design philosophy

**North star:** Warm, editorial, Latin-American SaaS landing page with **neo-brutalist** cues — thick ink borders, offset hard shadows, slight rotations on highlights, and high-contrast accent blocks (yellow + magenta on cream/teal).

**Tone:**

- Confident, direct Spanish copy; short sentences; numbers and proof points up front.
- Headlines are **huge** (Bricolage Grotesque), body is readable (Manrope), labels/meta use **DM Mono** uppercase styling.
- CTAs are pill-shaped with **magenta offset shadows**; hover lifts the control up-left (`translate(-2px, -2px)`) and deepens the shadow.
- Product proof is shown via **WhatsApp-native UI** (phone mockup + desktop inbox frame), not generic dashboards.

**What to avoid when replicating:**

- Soft gradients as primary brand (only allowed inside WA avatar gradients and phone chat wallpaper).
- Thin 1px gray borders without ink (`--ink`) weight.
- Rounded corners above ~32px except pills (`999px`) and specific cards.
- Inter/Roboto/system-only typography without the three Google fonts.
- Removing hard shadows or replacing them with blur-only elevation.

---

## 2. Technical setup

### 2.1 Astro page shell

```astro
---
import Layout from '../layouts/Layout.astro';
import { createPageMeta, PAGE_META, SITE_CONFIG } from '../utils/meta';

const metaData = createPageMeta('/', PAGE_META.home);
const registroUrl = SITE_CONFIG.appRegistrationUrl;
---

<Layout {...metaData} showHeader={false} showFooter={false}>
  <!-- fonts in head slot -->
  <div class="v3-root">
    <!-- all sections -->
  </div>
</Layout>

<style is:global>
  /* all .v3-root scoped rules */
</style>
```

- **`is:global`** is required: styles are written as `.v3-root .child` so they apply inside the page without Astro scoping collisions.
- All custom CSS lives in the page (not `global.css`). `global.css` only provides Tailwind import and base `box-sizing` / font smoothing.

### 2.2 Google Fonts (head)

Preconnect + stylesheet:

```
https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Manrope:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap
```

| Family | Weights used | Role |
|--------|----------------|------|
| **Bricolage Grotesque** | 500, 700, 800 | Display: logo, H1, H2, buttons, stat numbers, card titles, stickers |
| **Manrope** | 400–800 | Body, nav links, lead, card body, WA inbox (except mono bits) |
| **DM Mono** | 400, 500 | Eyebrows, URL bar, pills, step times, final CTA subline, footer copyright |

### 2.3 External links

- Registration CTAs: `SITE_CONFIG.appRegistrationUrl` with `target="_blank"` and `rel="noopener noreferrer"`.
- In-page anchors: `#problema`, `#solucion`, `#precios`.

---

## 3. Color system

All brand colors are **CSS custom properties on `.v3-root`**. Never hardcode hex in new components unless matching a documented exception (WhatsApp greens, chat bubbles, traffic-light dots).

### 3.1 Core tokens

| Token | Hex | Usage |
|-------|-----|--------|
| `--bg` | `#fffbf2` | Page background (warm cream) |
| `--bg-2` | `#f5f0e0` | Secondary surface (defined; rarely used on index) |
| `--paper` | `#ffffff` | Cards, eyebrows, chat bubbles (in mock), inputs |
| `--ink` | `#0e3b43` | Primary text, borders, dark buttons, teal brand |
| `--ink-2` | `#1f5660` | Secondary text, lead paragraph |
| `--mute` | `#6b7e84` | Muted text, strikethrough, price metadata |
| `--line` | `#e6dfc8` | Dividers, dashed price borders |
| `--yellow` | `#ffd23f` | Highlights, stat block, solution section bg, accents |
| `--yellow-deep` | `#f5b800` | Defined; hover depth (minimal on index) |
| `--magenta` | `#e8336b` | Accent, shadows, tags, featured pricing |
| `--magenta-deep` | `#c41e54` | Hot tab text, link hovers |
| `--teal` | `#0e3b43` | Alias of ink (stat-teal uses ink bg) |
| `--green` | `#1fae5c` | Online dots, inbox traffic light |
| `--cream` | `#fff5d6` | Stat card, FAQ open state |

### 3.2 Semantic pairings

| Context | Background | Text | Border / shadow |
|---------|------------|------|-----------------|
| Default page | `--bg` | `--ink` | `--ink` 2px |
| Primary button | `--ink` | `--yellow` | `6px 6px 0 var(--magenta)` |
| Primary button hover | `--magenta` | `--paper` | `8px 8px 0 var(--magenta)` |
| Nav CTA | `--ink` | `--yellow` | pill, hover → magenta + lift |
| Solution section | `--yellow` | `--ink` | top/bottom 2px `--ink` |
| Featured price card | `--ink` | `--paper` | shadow `--magenta` |
| Final CTA card | `--magenta` | `--paper` | `8px 8px 0 var(--ink)` |
| Footer | `--ink` | `--paper` | logo dot → `--yellow` |

### 3.3 `color-mix` usage

Used for translucent UI on dark surfaces:

- `color-mix(in srgb, var(--paper) 14%, transparent)` — inbox bar border
- `color-mix(in srgb, var(--paper) 55%, transparent)` — footer links, URL text
- `color-mix(in srgb, var(--paper) 20%, transparent)` — testimonial divider, featured price dashed borders
- `color-mix(in srgb, var(--paper) 60–88%, transparent)` — muted text on dark cards
- `color-mix(in srgb, var(--wa-green) 18%, transparent)` — active WA tab
- `color-mix(in srgb, var(--magenta) 12%, transparent)` — hot WA tab

### 3.4 WhatsApp-specific tokens (`.v3-inbox` only)

Scoped under `.v3-inbox`:

| Token | Hex | Role |
|-------|-----|------|
| `--wa-bg` | `#efeae2` | Chat wallpaper base |
| `--wa-panel` | `#f0f2f5` | Sidebar panels, tabs |
| `--wa-panel-2` | `#ffffff` | Main panels |
| `--wa-border` | `#e9edef` | Dividers |
| `--wa-text` | `#111b21` | Primary WA text |
| `--wa-text-2` | `#54656f` | Secondary |
| `--wa-text-3` | `#667781` | Timestamps, previews |
| `--wa-out` | `#d9fdd3` | Outgoing bubble |
| `--wa-out-2` | `#cdf6c4` | AI bubble gradient end |
| `--wa-in` | `#ffffff` | Incoming bubble |
| `--wa-header` | `#f0f2f5` | Headers |
| `--wa-green` | `#00a884` | WA brand green |
| `--wa-green-deep` | `#008069` | Status, links |
| `--wa-blue-read` | `#53bdeb` | Read receipts |

### 3.5 Phone mockup (hero) — non-token hex

| Element | Color |
|---------|--------|
| Chat wallpaper | `#ece5dd` + radial yellow tint |
| WA header bar | `#075e54` |
| Outgoing bubble | `#dcf8c6` |
| Incoming bubble | `white` |
| Confirm bubble | `var(--yellow)` |
| Meta pill bg | `rgba(225, 245, 254, 0.85)` |
| Bubble text | `#303030` |
| Typing dots | `#999` |

### 3.6 Avatar gradients (inbox list)

| Class | Gradient |
|-------|----------|
| `.wa-av.av-m` | `135deg, #ff7e5f → #feb47b` |
| `.wa-av.av-l` | `135deg, #6a82fb → #fc5c7d` |
| `.wa-av.av-p` | `135deg, #00b09b → #96c93d` |
| `.wa-av.av-s` | `135deg, #f7971e → #ffd200` (text `--ink`) |
| `.wa-av.av-d` | `135deg, #4568dc → #b06ab3` |

### 3.7 macOS window dots

| Class | Hex |
|-------|-----|
| `.inbox-dot.red` | `#ff5f57` |
| `.inbox-dot.yel` | `var(--yellow)` |
| `.inbox-dot.grn` | `var(--green)` |

---

## 4. Typography

### 4.1 Base

```css
.v3-root {
  font-family: 'Manrope', system-ui, sans-serif;
  line-height: 1.55;
  color: var(--ink);
}
```

### 4.2 Type scale

| Element | Class | Font | Weight | Size | Line-height | Letter-spacing | Notes |
|---------|-------|------|--------|------|-------------|----------------|-------|
| H1 | `.v3-h1` | Bricolage | 800 | `clamp(56px, 9vw, 124px)` | 0.88 | -0.04em | Color `--ink` |
| H2 | `.v3-h2` | Bricolage | 800 | `clamp(40px, 6vw, 84px)` | 0.95 | -0.035em | `em` → magenta italic 700 |
| Final H2 | `.v3-final-h` | Bricolage | 800 | `clamp(40px, 6.5vw, 90px)` | 0.95 | -0.035em | On magenta card |
| Lead | `.v3-lead` | Manrope | 400 | `clamp(17px, 1.3vw, 20px)` | 1.6 | — | max-width 540px; `strong` → ink 700 |
| Sub | `.v3-sub` | Manrope | 400 | 17px | — | — | `--ink-2`, max 540px |
| Logo | `.logo-text` | Bricolage | 800 | 24px | 1 | -0.03em | Dot `.logo-dot` magenta 700 |
| Eyebrow | `.eyebrow` | DM Mono | 600 | 12px | — | 0.06em | Uppercase feel via tracking |
| Stat number | `.stat-num` | Bricolage | 800 | `clamp(40px, 5vw, 64px)` | 1 | -0.04em | |
| Stat label | `.stat-lbl` | Manrope | 500 | 14px | 1.4 | — | opacity 0.85 |
| Strip number | `.strip-n` | Bricolage | 800 | 30px | — | -0.03em | magenta |
| Strip label | `.strip-l` | Manrope | 500 | 12px | 1.2 | — | ink-2 |
| Primary btn | `.v3-btn-primary` | Bricolage | 700 | 16px (18px `.big`) | — | 0.02em | |
| Nav link | `.v3-nav-links a` | Manrope | 600 | 15px | — | — | |
| Prob/Sol h3 | card h3 | Bricolage | 700 | 24px / 22px | — | -0.02em | |
| Testimonial | `.testi-text` | Bricolage | 500 | `clamp(22px, 2.6vw, 32px)` | 1.3 | -0.02em | |
| Price tier | `header h3` | Bricolage | 800 | 28px | — | 0.02em | |
| Price amount | `.amt` | Bricolage | 800 | 64px | 1 | -0.04em | Featured: yellow |
| FAQ summary | `.faq-item summary` | Bricolage | 600 | 17px | — | — | |

### 4.3 Text highlight utilities

| Class | Background | Text | Transform | Shadow |
|-------|------------|------|-----------|--------|
| `.hl-yellow` | `--yellow` | `--ink` | `rotate(-2deg)` | `6px 6px 0 var(--ink)` |
| `.hl-magenta` | `--magenta` | `--paper` | `rotate(1.5deg)` | `6px 6px 0 var(--ink)` |
| `.hl-magenta-block` | `--magenta` | `--paper` | none | `5px 5px 0 var(--ink)` |
| `.hl-magenta.italic` | (inherits) | — | `font-style: italic` | — |
| `.strike` | — | `--mute` | line-through magenta 4px | — |

Padding on highlights: `0 14px` (yellow/magenta), `0 12px` (block); `display: inline-block`; `margin: 6px 0` on rotated highlights.

### 4.4 Lead emphasis

- `.v3-lead strong` → `--ink`, weight 700
- `.v3-lead .and` → inline-block, magenta, weight 700

---

## 5. Spacing, layout, and grids

### 5.1 Content width

| Container | max-width | Horizontal padding |
|-----------|-----------|-------------------|
| Most sections (`.v3-block`, hero, final, foot inner) | **1320px** | `clamp(20px, 4vw, 48px)` |
| Testimonial (`.v3-testi`) | **920px** | (inherits block padding) |
| Price grid | **920px** | centered `margin: 0 auto` |
| Block head copy | **760px** | — |

### 5.2 Section vertical padding

| Section | Padding |
|---------|---------|
| `.v3-block` | `clamp(80px, 11vw, 140px)` vertical |
| `.v3-inbox` | top/bottom `clamp(60px, 9vw, 110px)` (overrides block default feel) |
| `.v3-hero` | top `clamp(40px, 7vw, 90px)`, bottom `clamp(40px, 6vw, 80px)` |
| `.v3-final` | `60px` top, `80px` bottom |
| `.v3-foot` | `48px` top, `28px` bottom |

### 5.3 Grids

| Grid | Columns | Gap | Breakpoints |
|------|---------|-----|-------------|
| `.hero-grid` | `1.1fr 0.9fr` | `clamp(40px, 6vw, 80px)` | → 1fr at **≤960px** |
| `.v3-stats` | 4 equal | 0 | → 2×2 at **≤760px** |
| `.problem-grid` | 2 | 20px | → 1fr at **≤720px** |
| `.sol-grid` | 3 | 16px | → 2 at **≤960px**, 1 at **≤600px** |
| `.wa-body` | `320px 1fr` | — | → 1 col at **≤820px** |
| `.steps-grid` | `1fr auto 1fr auto 1fr` | 14px | → 1 col at **≤860px** |
| `.price-grid` | 2 | 24px | → 1fr at **≤720px** |
| `.faq-grid` | 2 | 14px | → 1fr at **≤720px** |

### 5.4 Block head spacing

- `.block-head` → `margin-bottom: 56px`
- `.block-head.center` → centered text, auto horizontal margins
- Eyebrow → `margin-bottom: 24px`

---

## 6. Visual language (neo-brutalist rules)

### 6.1 Borders

- **Standard stroke:** `2px solid var(--ink)` on cards, nav bottom, stats band, solution band, hero strip, inbox frame.
- **Footer divider:** `1px solid color-mix(paper 20%)` inside dark footer.
- **WA internal:** `1px solid var(--wa-border)` — lighter, only inside inbox mock.

### 6.2 Hard shadows (offset, no blur)

| Component | Shadow |
|-----------|--------|
| Eyebrow | `3px 3px 0 var(--ink)` (inverse: `0 var(--paper)`) |
| Hero strip | `4px 4px 0 var(--ink)` |
| Primary button | `6px 6px 0 var(--magenta)` (big: 8px) |
| Problem/solution cards | `5px 5px` / `4px 4px 0 var(--ink)` |
| Hover cards | `8px 8px 0 var(--ink)` + `translate(-3px, -3px)` |
| Phone | `12px 12px 0 var(--magenta)` + soft `0 30px 60px -20px rgba(14,59,67,0.3)` |
| Stickers | `4px 4px 0 var(--ink)` |
| Inbox frame | `8px 8px 0 var(--magenta)` |
| Testimonial | `8px 8px 0 var(--magenta)` |
| Price card | `6px 6px 0 var(--ink)` (featured: magenta) |
| Final card | `8px 8px 0 var(--ink)` |
| Price flag | `3px 3px 0 var(--ink)` |

### 6.3 Border radius

| Radius | Usage |
|--------|--------|
| `999px` | Pills: buttons, nav CTA, eyebrows, tags, step number circle |
| `32px` | Final CTA card |
| `24px` | Testimonial card, price cards |
| `22px` | Inbox outer frame |
| `18px` | Problem, solution, step cards |
| `16px` | Hero strip |
| `14px` | Stickers, sol icon, FAQ items |
| `8px` | Chat bubbles, WA bubbles |
| `38px` / `28px` | Phone outer / inner screen |

### 6.4 Rotations (playful emphasis)

- Highlight spans: ±1.5–2deg
- Phone mockup: `2deg`
- Sol icon box: `-4deg`
- Price flag: `-2deg`
- Stickers: `8deg` / `-8deg`
- FAQ plus when open: `45deg`

### 6.5 Hover interaction pattern

**Duration:** `0.15s` (links, buttons) or `0.2s` (cards)  
**Easing:** `ease`  
**Card hover:** `transform: translate(-3px, -3px)` + larger shadow  
**Button hover:** `translate(-2px, -2px)` + shadow increase + often background flip to magenta

---

## 7. Motion and animation

### 7.1 Keyframes

| Name | Purpose | Definition |
|------|---------|------------|
| `v3pulse` | Online indicator ring | box-shadow 0 → 6px transparent green |
| `v3type` | Hero phone typing dots | opacity + translateY loop 1.2s |
| `wa-typing` | Inbox typing dots | opacity + translateY(-3px) 1.2s |

### 7.2 Animated elements

- `.online` / `.wa-online` — `v3pulse` 1.6s infinite on green dot
- `.typing span` / `.wa-typing span` — staggered delays 0s, 0.2s, 0.4s
- `.v3-btn-primary:hover .big-arrow` — `translateX(4px)` 0.2s

**Note:** `index.astro` does **not** include the marquee banner animation present in `v3.astro`.

---

## 8. Accessibility

### 8.1 Screen reader

```html
<h2 class="sr-only">MasSocios — el bot de WhatsApp que llena tu gym</h2>
```

```css
.v3-root .sr-only {
  position: absolute; width: 1px; height: 1px;
  overflow: hidden; clip: rect(0 0 0 0);
}
```

### 8.2 Landmarks and labels

- `<nav class="v3-nav" aria-label="Principal">`
- Logo links: `aria-label="massocios"`
- Decorative: `aria-hidden="true"` on SVGs, final star, inbox icons marked decorative where appropriate

### 8.3 Focus visible

```css
.v3-root a:focus-visible,
.v3-root button:focus-visible,
.v3-root summary:focus-visible {
  outline: 3px solid var(--magenta);
  outline-offset: 4px;
  border-radius: 8px;
}
```

### 8.4 FAQ

Native `<details>` / `<summary>`; webkit marker hidden; `+` icon rotates 45° when `[open]`.

---

## 9. Page structure (sections in order)

| # | Section | ID / class | Background |
|---|---------|------------|------------|
| 0 | SR-only H2 | — | — |
| 1 | Nav | `.v3-nav` | `--bg`, sticky top |
| 2 | Hero | `.v3-hero` | `--bg` |
| 3 | Stats | `.v3-stats` | 4 color blocks, full bleed |
| 4 | Problem | `.v3-problem` `#problema` | `--bg` |
| 5 | Solution | `.v3-solution` `#solucion` | `--yellow` full bleed |
| 6 | Inbox preview | `.v3-inbox` | `--bg` |
| 7 | Steps | `.v3-steps` | `--bg` |
| 8 | Testimonial | `.v3-testi` | `--bg` |
| 9 | Pricing | `.v3-pricing` `#precios` | `--bg` |
| 10 | FAQ | `.v3-faq` | `--bg` |
| 11 | Final CTA | `.v3-final` | `--bg` |
| 12 | Footer | `.v3-foot` | `--ink` |

---

## 10. Component reference

### 10.1 Navigation (`.v3-nav`)

- `position: sticky; top: 0; z-index: 50`
- Flex space-between; padding `18px clamp(20px, 4vw, 48px)`
- Bottom border `2px solid var(--ink)`
- Links gap `28px`; hover link color `--magenta`
- **`.v3-nav-cta`:** pill, `padding: 10px 18px`, bg ink, text yellow, `border-radius: 999px`
- **Mobile ≤760px:** hide all `.v3-nav-links a` except `.v3-nav-cta`

**Logo (index variant):** text only — `mas<span class="logo-dot">·</span>socios` — no icon mark.

### 10.2 Hero (`.v3-hero`)

**Left column:**

- H1 with `.hl-yellow` and `.hl-magenta` spans on key words
- Lead + CTA row: `.v3-btn-primary` + `.v3-btn-link`
- `.hero-strip`: white card, 3 stats with `.strip-n` / `.strip-l`, `.divider` 1×36px

**Right column — phone (`.phone`):**

- `width: min(340px, 100%)`, `aspect-ratio: 9/19`
- Outer bg `--ink`, padding 12px, radius 38px, rotate 2deg
- Screen bg `#ece5dd`, radius 28px
- Stickers `.sticker-1` (magenta, top-right), `.sticker-2` (cream, bottom-left)
- Mobile ≤540px: reduce sticker negative offsets

### 10.3 Stats band (`.v3-stats`)

Full-width grid, **no gap**, shared top/bottom ink borders.

| Card class | BG | Text |
|------------|-----|------|
| `.stat-yellow` | yellow | ink |
| `.stat-teal` | ink | yellow |
| `.stat-magenta` | magenta | paper |
| `.stat-cream` | cream | ink |

Right borders between cells; 2×2 layout adjusts borders at ≤760px.

### 10.4 Eyebrow + section headings

```html
<div class="block-head [center]">
  <span class="eyebrow [inverse]">LABEL</span>
  <h2 class="v3-h2 [inverse]">...</h2>
  <p class="v3-sub">...</p> <!-- optional -->
</div>
```

- **`.eyebrow`:** paper bg, magenta text, ink border, pill, mono 12px
- **`.eyebrow.inverse`:** ink bg, yellow text, paper border/shadow (for yellow solution section)

### 10.5 Problem cards (`.prob-card`)

- Paper bg, ink border 2px, radius 18px, padding 32px
- `.prob-num` — magenta, 14px, letter-spacing 0.04em (e.g. `01`)
- h3 — 24px Bricolage 700; p — 15px ink-2

### 10.6 Solution cards (`.sol-card`)

- Same card treatment as problem; padding 28px
- **`.sol-icon`:** 56×56, ink bg, yellow stroke icon, radius 14px, rotate -4deg; SVG 26px
- h3 `em` → magenta italic

### 10.7 Inbox frame (`.inbox-frame`)

- Outer ink border, radius 22px, shadow magenta 8px
- **`.inbox-bar`:** traffic lights + DM Mono URL + yellow “live” pill
- **`.wa-body`:** min-height 560px (0 on mobile stack)

### 10.8 Step cards (`.step-card`)

- Default: paper + ink shadow
- **`.step-card.hot`:** magenta bg, paper text; step-num yellow/ink
- **`.step-arrow`:** magenta, Bricolage 36px; rotates 90° when grid stacks

### 10.9 Testimonial (`.testi-card`)

- Ink bg, paper text, radius 24px, padding clamp 36–64px
- Giant `.testi-quote` “"” in yellow, 140px, absolute top-left
- `.testi-av` — 48px circle magenta; stars yellow, `margin-left: auto`

### 10.10 Pricing (`.price-card`)

- Standard vs **`.featured`:** ink bg, yellow price amount, magenta shadow
- **`.price-flag`:** absolute top -16px, centered, yellow badge rotated -2deg
- **`.price-amount`:** dashed top/bottom borders
- **`.price-cta`** vs **`.price-cta.primary`:** outlined paper vs solid magenta

### 10.11 FAQ (`.faq-item`)

- Closed: paper, ink border 14px radius
- Open: cream bg, `4px 4px 0 ink` shadow
- **`.plus`:** 28px circle ink/yellow; open → magenta, rotate 45deg

### 10.12 Final CTA (`.final-card`)

- Magenta fill, ink border 2px, radius 32px
- Decorative `★` `.final-deco` — 280px, yellow 20% opacity, bottom-right
- Subline: DM Mono 13px uppercase tracking
- Button override: yellow bg, ink text, shadow ink 8px (hover paper)

### 10.13 Footer (`.v3-foot`)

- Ink bg; logo paper with yellow dot
- Links 14px, 75% paper mix, hover yellow
- Bottom: DM Mono 12px centered, 55% paper mix

### 10.14 Buttons (shared)

**Primary (`.v3-btn-primary`):**

```
padding: 18px 28px (22px 36px .big)
border-radius: 999px
bg: ink, color: yellow
shadow: 6px 6px 0 magenta
font: Bricolage 700 16px
gap: 12px (arrow .big-arrow 22px)
```

**Text link (`.v3-btn-link`):**

- underline 3px, offset 6px, color yellow → hover magenta

---

## 11. WhatsApp UI subsystems

The page implements **two separate WA UIs**:

### 11.1 Hero phone (simplified mobile chat)

**Structure:**

```
.phone
  .phone-notch
  .phone-screen
    .phone-bar (status)
    .phone-conv-head (WA green #075e54)
    .phone-msgs
      .m-meta
      .msg.out | .msg.in | .msg.in.confirm
      .typing
  .sticker.sticker-1 | .sticker-2
```

**Bubbles:** max-width 78%, padding `6px 10px 16px`, radius 8px, tail via smaller bottom corner radius on one side. **`.msg-time`** absolute bottom-right 9px.

### 11.2 Desktop inbox (WhatsApp Web clone)

**Structure:**

```
.inbox-frame
  .inbox-bar
  .wa-body
    aside.wa-side (list)
    main.wa-main (thread + input)
```

**Sidebar:** head with gym avatar (ink/yellow), “IA activa” magenta pill, search, tabs, `.wa-list` rows with avatars and badges.

**Thread:** `.wa-msg.in` / `.wa-msg.out` with CSS tail `::before` clip-path triangles; **`.wa-msg.out.ai`** magenta left border + gradient + `.wa-msg-prefix` “IA · MasSocios”.

**Input:** `.wa-input-auto` magenta DM Mono + inline typing dots.

**Replicate rule:** Use WA tokens inside `.v3-inbox` only; do not mix WA greens into main landing buttons.

---

## 12. Responsive breakpoints

| Breakpoint | Effect |
|------------|--------|
| **960px** | Hero single column; solution grid 3→2 cols |
| **860px** | Steps grid vertical; arrows rotate 90° |
| **820px** | Inbox sidebar stacks above thread |
| **760px** | Stats 2×2; nav text links hidden |
| **720px** | Problem, price, FAQ → 1 column |
| **600px** | Solution grid → 1 column |
| **540px** | Phone stickers closer to device |

**Fluid typography:** All major headings and section padding use `clamp()` — always preserve those formulas when scaling.

---

## 13. Replication checklist

Use this when building a new page or porting to React/Vue/Figma.

- [ ] Wrap entire page in `.v3-root` with all 14 CSS variables on the root
- [ ] Load Bricolage, Manrope, DM Mono with exact weights
- [ ] Disable default site header/footer if using `Layout.astro`
- [ ] Use `2px solid var(--ink)` borders on brand surfaces
- [ ] Use offset hard shadows (magenta or ink), not Material-style blur cards
- [ ] Apply `clamp()` padding and max-width 1320px / 920px where specified
- [ ] H1/H2 only in Bricolage 800 with negative letter-spacing
- [ ] Eyebrows always DM Mono in pill with 3px shadow
- [ ] Primary CTA: ink + yellow + magenta shadow; hover magenta + lift
- [ ] Stats band: 4 cells, zero gap, full-bleed horizontal borders
- [ ] Solution section: full-bleed yellow with inverse eyebrow
- [ ] Inbox: separate `--wa-*` scope; frame uses ink + magenta shadow
- [ ] Focus rings: 3px magenta, 4px offset
- [ ] Include `sr-only` H1/H2 pattern for SEO/a11y
- [ ] External registration links: `noopener noreferrer`
- [ ] Do not import v3 banner or logo-mark unless intentionally diverging

---

## 14. Differences from `v3.astro`

`src/pages/v3.astro` is a sibling prototype. **`index.astro` is the production subset.** When replicating the homepage, **do not** copy these from v3 unless product asks:

| Feature | `v3.astro` | `index.astro` |
|---------|------------|---------------|
| Top marquee banner | `.v3-banner` + `v3marquee` animation | **Absent** |
| Logo | `.logo-mark` “M” tile + text | **Text only** (`logo-text` + `logo-dot`) |
| Meta / layout | May differ | `createPageMeta('/', PAGE_META.home)` |

All CSS class names and tokens otherwise align with the `.v3-*` namespace in both files.

---

## Appendix A — Complete CSS variable block

Copy exactly onto your root element:

```css
.v3-root {
  --bg: #fffbf2;
  --bg-2: #f5f0e0;
  --paper: #ffffff;
  --ink: #0e3b43;
  --ink-2: #1f5660;
  --mute: #6b7e84;
  --line: #e6dfc8;
  --yellow: #ffd23f;
  --yellow-deep: #f5b800;
  --magenta: #e8336b;
  --magenta-deep: #c41e54;
  --teal: #0e3b43;
  --green: #1fae5c;
  --cream: #fff5d6;

  background: var(--bg);
  color: var(--ink);
  font-family: 'Manrope', system-ui, sans-serif;
  line-height: 1.55;
  position: relative;
  overflow-x: hidden;
}
```

## Appendix B — Class inventory (alphabetical)

`and`, `arrow`, `av-d`, `av-l`, `av-m`, `av-p`, `av-s`, `big`, `big-arrow`, `block-head`, `center`, `check`, `confirm`, `cur`, `divider`, `dbl`, `eyebrow`, `featured`, `final-card`, `final-deco`, `foot-bottom`, `foot-links`, `foot-row`, `grn`, `hero-grid`, `hero-left`, `hero-right`, `hero-strip`, `hl-magenta`, `hl-magenta-block`, `hl-yellow`, `hot`, `in`, `inverse`, `italic`, `inline`, `inbox-bar`, `inbox-dot`, `inbox-frame`, `inbox-pill`, `inbox-url`, `logo-dot`, `logo-text`, `m-meta`, `msg`, `msg-time`, `online`, `out`, `phone`, `phone-av`, `phone-back`, `phone-bar`, `phone-conv-head`, `phone-icons`, `phone-msgs`, `phone-name`, `phone-notch`, `phone-screen`, `phone-status`, `phone-time`, `plus`, `price-amount`, `price-card`, `price-cta`, `price-flag`, `price-grid`, `price-list`, `primary`, `prob-card`, `prob-num`, `problem-grid`, `read`, `red`, `sol-card`, `sol-grid`, `sol-icon`, `solution-inner`, `stat-card`, `stat-cream`, `stat-lbl`, `stat-magenta`, `stat-num`, `stat-teal`, `stat-yellow`, `step-arrow`, `step-card`, `step-num`, `step-tag`, `step-time`, `steps-grid`, `sticker`, `sticker-1`, `sticker-2`, `strip-i`, `strip-l`, `strip-n`, `strike`, `testi-author`, `testi-av`, `testi-card`, `testi-name`, `testi-quote`, `testi-role`, `testi-stars`, `testi-text`, `typing`, `v3-block`, `v3-btn-link`, `v3-btn-primary`, `v3-cta-row`, `v3-faq`, `v3-final`, `v3-final-h`, `v3-foot`, `v3-h1`, `v3-h2`, `v3-hero`, `v3-inbox`, `v3-lead`, `v3-logo`, `v3-nav`, `v3-nav-cta`, `v3-nav-links`, `v3-pricing`, `v3-problem`, `v3-root`, `v3-solution`, `v3-stats`, `v3-steps`, `v3-sub`, `v3-testi`, `wa-av`, `wa-badge`, `wa-body`, `wa-checks`, `wa-conv-head`, `wa-conv-id`, `wa-conv-meta`, `wa-conv-name`, `wa-conv-sub`, `wa-day`, `wa-icon-btn`, `wa-input`, `wa-input-auto`, `wa-input-box`, `wa-input-icon`, `wa-list`, `wa-main`, `wa-msg`, `wa-msg-prefix`, `wa-msg-text`, `wa-msg-time`, `wa-online`, `wa-pill`, `wa-pill-dot`, `wa-row-body`, `wa-row-bot`, `wa-row-msg`, `wa-row-time`, `wa-row-top`, `wa-search`, `wa-side`, `wa-side-av`, `wa-side-head`, `wa-side-me`, `wa-side-name`, `wa-side-sub`, `wa-tab`, `wa-tabs`, `wa-tag`, `wa-thread`, `wa-typing`, `yel`.

## Appendix C — SVG icon standards

- Inline SVGs: `viewBox="0 0 24 24"`, `aria-hidden="true"` when decorative
- Solution icons: `stroke="currentColor"`, `stroke-width="2.4"`, round caps/joins
- Sizes: sol icons 26px; WA UI icons 16–22px; phone status 14px

---

*Document generated from `src/pages/index.astro` (lines 1–2135). Update this file whenever the homepage design changes.*
