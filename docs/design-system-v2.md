# Design System: V2 Dark Green

How to replicate the `brand-t` / `v2` landing page aesthetic exactly in any project.

---

## Identity at a glance

| Property | Value |
|---|---|
| Style | Dark SaaS / developer tool |
| Background | Near-black forest `#0a100d` |
| Primary accent | WhatsApp green `#25d366` |
| Secondary accent | Lime `#c7f284` |
| Display font | Bricolage Grotesque |
| Body font | Geist |
| Mono font | JetBrains Mono |
| Border radius | 18px cards · 999px pills · 12px buttons |
| Grid unit | 64px background grid |

---

## 1. Fonts

Load from Google Fonts. Put these in `<head>` before any styles:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" />
```

Usage rules:
- **Bricolage Grotesque** — all headings (`h1`–`h3`), logo, large numbers. Weight 600. Letter-spacing `-0.02em` to `-0.04em`.
- **Geist** — body copy, paragraphs, nav links. Weight 400–500.
- **JetBrains Mono** — eyebrows, labels, timestamps, code blocks, meta strips, stat labels. Font-size typically 10–13px.

---

## 2. Color tokens

Define these as CSS custom properties on the root wrapper element (not `:root` — scope them to a class so they don't bleed into the rest of the app):

```css
.your-root {
  --bg:        #0a100d;   /* page background */
  --bg-2:      #0f1612;   /* slightly lighter bg (marquee, preview bar) */
  --panel:     #131a16;   /* card / nav background */
  --panel-2:   #1a221d;   /* hovered card, inner surfaces */
  --line:      #1f2924;   /* borders, dividers */
  --line-2:    #2a3530;   /* secondary borders */
  --ink:       #e8ede9;   /* primary text */
  --ink-2:     #b9c4be;   /* secondary text */
  --mute:      #7a8580;   /* placeholder, timestamps */
  --green:     #25d366;   /* primary accent */
  --green-deep:#1faa53;   /* darker green for shadows/borders */
  --lime:      #c7f284;   /* secondary accent (highlights, badges) */
  --lime-soft: #2a3a1f;   /* lime at low opacity — badge backgrounds */
  --warn:      #ca8a04;   /* warning state */
  --red:       #ff5d5d;   /* error / destructive */
}
```

Color usage pattern:
- Buttons: `background: var(--green)`, `color: var(--bg)`
- Hover: switch to `var(--lime)`
- Active nav item: `color: var(--green)` with `background: color-mix(in srgb, var(--green) 12%, transparent)`
- Badges / tags: `background: var(--lime-soft)`, `color: var(--lime)`
- Gradient text: `linear-gradient(120deg, var(--green) 0%, var(--lime) 60%, var(--green) 100%)`

---

## 3. Background atmosphere

Two layers that create depth. Both are `position: fixed`, `pointer-events: none`, `z-index: 0`.

**Grid lines:**
```css
.grid-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, color-mix(in srgb, var(--green) 6%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, var(--green) 6%, transparent) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(circle at 50% 0%, black 0%, transparent 70%);
}
```

**Ambient glows** (two radial blobs, blurred circles):
```css
.glow {
  position: fixed;
  width: 600px; height: 600px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  filter: blur(80px);
  opacity: 0.4;
}
.glow-1 {
  background: radial-gradient(circle, var(--green) 0%, transparent 60%);
  top: -200px; left: -200px;
}
.glow-2 {
  background: radial-gradient(circle, var(--lime) 0%, transparent 60%);
  top: 30%; right: -250px;
  opacity: 0.18;
}
```

All content sections need `position: relative; z-index: 1` to sit above these layers.

---

## 4. Navigation — floating pill

The nav floats inside the page with `position: sticky; top: 16px` and has a pill/capsule shape. It's three-part: logo | center pill links | right CTA.

```css
.nav {
  position: sticky;
  top: 16px;
  z-index: 50;
  margin: 16px 32px 0;           /* 16–32px side margins */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px 10px 18px;
  background: color-mix(in srgb, var(--panel) 70%, transparent);
  backdrop-filter: blur(16px) saturate(140%);
  border: 1px solid var(--line);
  border-radius: 999px;
}
```

**Logo:** Bricolage Grotesque 17px weight 600, letter-spacing -0.02em. SVG icon in `var(--green)`.

**Center pill** (nav links inside their own pill):
```css
.nav-pill {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 999px;
}
.nav-pill a {
  padding: 8px 14px;
  font-size: 13.5px;
  color: var(--ink-2);
  border-radius: 999px;
  transition: background 0.18s, color 0.18s;
}
.nav-pill a:hover { background: var(--panel-2); color: var(--ink); }
```

**CTA button** (right side):
```css
.cta-mini {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  background: var(--green);
  color: var(--bg);
  border-radius: 999px;
  font-size: 13.5px;
  font-weight: 600;
}
.cta-mini:hover { background: var(--lime); }
```

**Pulse dot** (live indicator inside CTA):
```css
.dot-on {
  width: 8px; height: 8px;
  border-radius: 999px;
  background: var(--bg);
  animation: pulse 1.6s ease-out infinite;
}
@keyframes pulse {
  0%   { box-shadow: 0 0 0 0 currentColor; }
  100% { box-shadow: 0 0 0 6px transparent; }
}
```

---

## 5. Hero section

Layout: full-width, `max-width: 1280px`, centered. Padding `clamp(40px, 7vw, 88px)` top.

**Eyebrow tag** (small label above h1):
```css
.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--mute);
  margin-bottom: 32px;
}
/* Structure: [01] ——————— descriptive text */
/* [01] in var(--lime), line is a 60px gradient fade */
```

**H1:**
```css
h1 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 600;
  font-size: clamp(48px, 9vw, 130px);
  line-height: 0.92;
  letter-spacing: -0.04em;
}
```

**Gradient text** (applied to a `<span>` inside h1 or h2):
```css
.grad {
  background: linear-gradient(120deg, var(--green) 0%, var(--lime) 60%, var(--green) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 100%;
  animation: grad-shift 6s ease-in-out infinite;
}
@keyframes grad-shift {
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
}
```

**Primary CTA button:**
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 22px;
  background: var(--green);
  color: var(--bg);
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  box-shadow:
    0 0 0 1px var(--green-deep),
    0 12px 30px -8px color-mix(in srgb, var(--green) 60%, transparent);
  transition: background 0.18s, box-shadow 0.2s;
}
.btn-primary:hover {
  background: var(--lime);
  box-shadow:
    0 0 0 1px var(--lime),
    0 14px 36px -8px color-mix(in srgb, var(--lime) 70%, transparent);
}
```

**Ghost button:**
```css
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  border: 1px solid var(--line-2);
  background: var(--panel);
  color: var(--ink);
  border-radius: 12px;
  font-weight: 500;
  font-size: 15px;
}
.btn-ghost:hover { background: var(--panel-2); border-color: var(--green); }
```

**Meta strip** (trust signals below CTA row):
```css
.meta-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  color: var(--mute);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
  margin-bottom: 56px;
}
/* Each item: <span><b style="color:var(--lime)">●</b> Label</span> */
```

---

## 6. Browser/app preview frame

Simulates a browser window with a 3D tilt. Place inside `.v2-preview { perspective: 1500px }`.

```css
.prev-frame {
  background: var(--panel);
  border: 1px solid var(--line-2);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 40px 80px -30px rgba(0,0,0,0.7), 0 0 0 1px var(--line);
  transform: rotateX(2deg);
  transform-style: preserve-3d;
}
```

**Title bar** (top strip with traffic-light dots):
```css
.prev-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--bg-2);
  border-bottom: 1px solid var(--line);
}
/* Dots: width/height 11px, border-radius 999px */
/* red: #ff5f57  yellow: #febc2e  green: #28c840  */
/* URL: JetBrains Mono 12px var(--mute), flex: 1 */
/* Live pill: JetBrains Mono 11px, bg var(--lime), color var(--bg) */
```

**Body** is a CSS grid: sidebar + main content.

---

## 7. Marquee strip

Full-width scrolling text between hero and sections:

```css
.marquee {
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  overflow: hidden;
  padding: 18px 0;
  background: var(--bg-2);
}
.marquee-track {
  display: flex;
  gap: 36px;
  white-space: nowrap;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(20px, 2.4vw, 30px);
  font-weight: 500;
  color: var(--mute);
  animation: marquee 28s linear infinite;
}
/* Odd items: var(--ink)  Even items (separators ·): var(--green), JetBrains Mono 0.8em */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

Duplicate all items once so the loop is seamless.

---

## 8. Section structure

Every content section follows the same pattern:

```css
.section {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(80px, 11vw, 140px) clamp(20px, 4vw, 48px);
}
```

**Section header** (`.head`, max-width 760px, `margin-bottom: 60px`):
```
// 02 · eyebrow     ← JetBrains Mono 12px var(--lime)
Big heading         ← Bricolage 600 clamp(40px, 6.5vw, 88px) line-height 0.95 letter-spacing -0.035em
Subtitle text       ← Geist 18px var(--ink-2) max-width 560px margin-top 22px
```

---

## 9. Feature cards grid

2-column grid, `gap: 14px`. Each card:

```css
.card {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 28px;
  transition: border-color 0.2s, background 0.2s;
}
.card:hover { border-color: var(--green); background: var(--panel-2); }
```

Card anatomy:
1. Eyebrow: `// label` — JetBrains Mono 11px `var(--lime)`
2. H3: Bricolage 600 24px letter-spacing -0.02em
3. Body: Geist 15px `var(--ink-2)`
4. Visual block: `background: var(--bg)`, `border: 1px solid var(--line)`, `border-radius: 12px`, `padding: 18px`

---

## 10. Numbered flow / how-it-works

Ordered list, each item is a CSS grid: big number + card.

```css
ol.flow { list-style: none; padding: 0; display: grid; gap: 16px; }
ol.flow li { display: grid; grid-template-columns: 120px 1fr; gap: 16px; }

.flow-num {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(60px, 10vw, 120px);
  font-weight: 600;
  line-height: 0.85;
  letter-spacing: -0.04em;
  color: transparent;
  -webkit-text-stroke: 1px var(--line-2);   /* outline-only number */
}

.flow-card {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 28px;
}
.flow-card:hover { border-color: var(--green); }
```

**Code line** (terminal-style snippet inside flow cards):
```css
.codeline {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
  color: var(--ink-2);
  background: var(--bg);
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid var(--line);
}
.codeline.highlight { color: var(--lime); }
```

---

## 11. Pricing cards

2-column grid, `max-width: 920px`, centered.

```css
.price-card {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 22px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  transition: transform 0.25s, border-color 0.2s;
}
.price-card:hover { transform: translateY(-4px); border-color: var(--green); }

/* Featured card */
.price-card.featured {
  background: var(--bg-2);
  border-color: var(--green);
  box-shadow:
    0 0 0 1px var(--green-deep),
    0 30px 80px -30px color-mix(in srgb, var(--green) 50%, transparent);
}
```

**Featured glow** (decorative blob inside featured card):
```css
.price-glow {
  position: absolute;
  width: 380px; height: 380px;
  background: radial-gradient(circle, var(--lime) 0%, transparent 65%);
  top: -150px; right: -150px;
  opacity: 0.15;
  pointer-events: none;
}
```

**Price amount:**
```css
.price-amount {
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-family: 'Bricolage Grotesque', sans-serif;
}
/* Currency label: JetBrains Mono 14px var(--mute) */
/* Amount: 56px weight 600 letter-spacing -0.04em */
/* Period: JetBrains Mono 14px var(--mute) */
```

**Feature list checkmarks** (CSS-only, no icons):
```css
.price-card li {
  font-size: 14.5px;
  color: var(--ink-2);
  padding-left: 24px;
  position: relative;
}
.price-card li::before {
  content: '';
  position: absolute;
  left: 0; top: 8px;
  width: 12px; height: 7px;
  border-left: 2px solid var(--green);
  border-bottom: 2px solid var(--green);
  transform: rotate(-45deg);
}
```

---

## 12. FAQ accordion

Uses native `<details>`/`<summary>`. No JS required.

```css
.faq {
  max-width: 760px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 18px;
  overflow: hidden;
}
.faq details { border-bottom: 1px solid var(--line); }
.faq details:last-child { border-bottom: none; }

.faq summary {
  padding: 22px 26px;
  cursor: pointer;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 500;
  font-size: 17px;
  color: var(--ink);
  transition: background 0.18s;
}
.faq summary:hover { background: var(--panel-2); }
.faq summary::-webkit-details-marker { display: none; }

/* Q.01 label: JetBrains Mono 12px var(--lime) */
/* + caret: JetBrains Mono 18px var(--mute), rotates 45deg when open */
.faq details[open] .caret { transform: rotate(45deg); color: var(--green); }

.faq p { padding: 0 26px 22px; color: var(--ink-2); font-size: 15px; }
```

---

## 13. Final CTA section

Rounded card that floats within the page layout (not full-width):

```css
.final-cta {
  position: relative;
  margin: 0 clamp(20px, 4vw, 48px) 60px;
  padding: clamp(70px, 12vw, 160px) clamp(28px, 6vw, 80px);
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 32px;
  text-align: center;
  overflow: hidden;
}
```

**Background radial gradient overlay** (decorative):
```css
.final-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 30% 0%,   color-mix(in srgb, var(--green) 30%, transparent) 0%, transparent 50%),
    radial-gradient(circle at 70% 100%, color-mix(in srgb, var(--lime)  25%, transparent) 0%, transparent 50%);
  pointer-events: none;
}
```

H2 inside: same `.grad` gradient text treatment, `font-size: clamp(44px, 8vw, 110px)`, `line-height: 0.95`.

---

## 14. Footer

```css
.footer {
  max-width: 1280px;
  margin: 0 auto;
  padding: 60px clamp(20px, 4vw, 48px) 40px;
  border-top: 1px solid var(--line);
}
/* Top row: grid 1fr 2fr — logo left, link columns right */
/* Bottom row: flex space-between — copyright + status indicator */
/* Column headers: JetBrains Mono 11px var(--lime) uppercase letter-spacing 0.06em */
/* Links: Geist 14px var(--ink-2), hover var(--lime) */
```

---

## 15. Reusable micro-components

### Inline badge / tag
```css
.badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10–11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 3px 8–10px;
  border-radius: 999px;
}
/* Lime variant: bg var(--lime), color var(--bg) */
/* Subtle variant: bg var(--lime-soft), color var(--lime) */
/* Green subtle: bg color-mix(in srgb, var(--green) 12%, transparent), color var(--green) */
```

### Stat card (inside dashboard preview)
```css
.stat-card {
  background: var(--bg-2);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 14px;
}
/* Label: JetBrains Mono 10px var(--mute) uppercase */
/* Number: Bricolage 22px weight 600 var(--ink) letter-spacing -0.02em */
/* Delta: JetBrains Mono 10px — green for up, var(--warn) for warning */
```

### Activity feed row
```css
.feed-item {
  display: grid;
  grid-template-columns: 30px 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 8px 10px;
  border-radius: 8px;
  background: var(--bg-2);
  border: 1px solid var(--line);
}
/* Avatar: 30px square, border-radius 8px, initials centered */
/* Name: Geist 12.5px var(--ink) */
/* Time: JetBrains Mono 10px var(--mute) */
```

---

## 16. Spacing & sizing rules

| Token | Value |
|---|---|
| Section padding (vertical) | `clamp(80px, 11vw, 140px)` |
| Section padding (horizontal) | `clamp(20px, 4vw, 48px)` |
| Hero padding (vertical) | `clamp(40px, 7vw, 88px)` |
| Card gap | `14px` |
| Card padding | `28px` |
| Card border-radius | `18px` |
| Pill border-radius | `999px` |
| Button border-radius | `12px` |
| Large border-radius | `22–32px` |

---

## 17. Adapting the palette

To swap to a different color scheme, only these four variables need to change. Everything else derives from them.

```css
--green:      /* primary accent — buttons, active states, highlights */
--green-deep: /* slightly darker version of --green — shadows, borders */
--lime:       /* secondary accent — badges, eyebrows, code labels */
--lime-soft:  /* very muted version of --lime — badge backgrounds */
```

For **light mode**, also change:
```css
--bg:      /* to a light cream or white */
--bg-2:    /* slightly darker than --bg */
--panel:   /* white */
--panel-2: /* very light gray */
--ink:     /* near-black */
--ink-2:   /* mid-gray */
```

Light mode gotchas:
- Nav backdrop: use 88% opacity instead of 70% (`color-mix(in srgb, var(--panel) 88%, transparent)`) and add `box-shadow: 0 1px 0 var(--line)`
- Dashboard shadow: reduce to `0 20px 60px -20px rgba(0,0,0,0.12)` (the dark version's `rgba(0,0,0,0.7)` is too heavy)
- Glow opacity: cut to ~0.07 or use explicit `rgba()` values

---

## 18. Accessibility & motion

```css
/* Focus rings — green glow */
a:focus-visible,
button:focus-visible,
summary:focus-visible {
  outline: 2px solid var(--lime);
  outline-offset: 3px;
  border-radius: 8px;
}

/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .grid-bg, .glow { display: none; }
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 19. Framework notes

The design system is framework-agnostic CSS. In this project it's used in Astro with `<style is:global>` scoped to the root wrapper class. To use elsewhere:

- **React / Next.js** — paste into a CSS module or a global stylesheet. Scope to a wrapper `div` with the root class.
- **Plain HTML** — paste the `<style>` block. No build step required; all effects are pure CSS.
- **Tailwind projects** — define the color tokens as Tailwind theme extensions, then use arbitrary values `[var(--green)]` for the gradients and `color-mix()` values that Tailwind can't express natively.

The only external dependency is the Google Fonts link. Everything else — grid, glows, animations, accordion — is pure CSS with no JavaScript.
