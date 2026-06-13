# Tutreino — Brand L · Social Content Design System

Replication guide for **static and motion social assets** (Instagram, LinkedIn, Stories, Reels, ads) using the exact visual language from `src/pages/brand-l.astro`.

**Source:** `src/pages/brand-l.astro`  
**Codename:** Brand L — *Cool Gray + Cobalt Blue* (light SaaS / gym-ops dashboard aesthetic)  
**Product angle:** Gym management platform (clientes, turnos, cobros, métricas). **No WhatsApp** in this brand variant.

**Related docs:** `docs/design-system-v2.md` (shared v2 layout patterns; **different palette**), `docs/design-system-brand-i-social.md` (dark indigo sibling), `PRODUCT.md` (voice and audience).

---

## Table of contents

1. [Identity at a glance](#1-identity-at-a-glance)
2. [Canvas sizes and safe zones](#2-canvas-sizes-and-safe-zones)
3. [Color tokens (Brand L only)](#3-color-tokens-brand-l-only)
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
| Style | Light SaaS · product dashboard · gym ops |
| Background | Cool gray `#f8f9fb` |
| Primary accent | Cobalt `#1d4ed8` (CSS token `--green`) |
| Secondary accent | Sky blue `#3b82f6` (token `--lime`) |
| Display font | Bricolage Grotesque 600 |
| Body font | Geist 400–500 |
| Mono font | JetBrains Mono 400–600 |
| Card radius | 18px (modules), 22px (pricing), 12px (inner UI) |
| Pill radius | `999px` (nav, badges, chips) |
| Button radius | 12px |
| Grid unit | 64px background grid (subtle cobalt lines) |
| Market | Spanish · UYU pricing · Uruguay gym owners and personal trainers |

**Visual signature:** white panels + cool gray borders + soft cobalt glow blobs + plain-text eyebrows (no `//` prefix) + animated gradient headline words + optional browser-frame product mock + floating pill nav aesthetic.

**vs Brand I:** Brand L is **light** (`#f8f9fb` canvas, `#0f1623` text). Do not swap palettes between brands.

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

**Brand bar (recommended on every export):** bottom-left or top-left lockup — logo mark + `tutreino` in Bricolage 600, 17px equivalent at 1080w (scale proportionally on other sizes).

**Background on all formats:** full-bleed `#f8f9fb` + grid + glows (see §5). Do not use dark navy (Brand I) or v2 dark green backgrounds for Brand L social.

---

## 3. Color tokens (Brand L only)

Copy exactly from `.h-root` in `brand-l.astro`. Token names say `green` / `lime` for historical v2 compatibility — **they are cobalt/sky blue**, not WhatsApp green.

```css
/* Brand L — scope to artboard root */
.brand-l-social {
  --bg:         #f8f9fb;
  --bg-2:       #f0f2f6;
  --panel:      #ffffff;
  --panel-2:    #e8ecf4;
  --line:       #dde2ed;
  --line-2:     #c8d0e0;
  --ink:        #0f1623;
  --ink-2:      #3d4f6a;
  --mute:       #8494ae;
  --green:      #1d4ed8;   /* primary accent — cobalt */
  --green-deep: #1e40af;
  --lime:       #3b82f6;   /* secondary accent — sky */
  --lime-soft:  #dbeafe;   /* badge / chip backgrounds */
  --red:        #dc2626;
  --warn:       #d97706;
}
```

### Semantic usage (social)

| Role | Token | Hex (reference) |
|---|---|---|
| Canvas fill | `--bg` | `#f8f9fb` |
| Band / sidebar / inner vis | `--bg-2` | `#f0f2f6` |
| Card / panel | `--panel` | `#ffffff` |
| Card hover / emphasis | `--panel-2` | `#e8ecf4` |
| Primary text | `--ink` | `#0f1623` |
| Body / subcopy | `--ink-2` | `#3d4f6a` |
| Timestamps, URLs, meta strip | `--mute` | `#8494ae` |
| Borders | `--line` / `--line-2` | `#dde2ed` / `#c8d0e0` |
| CTA fill, logo icon, stat deltas (up) | `--green` | `#1d4ed8` |
| CTA hover, gradient end, eyebrows | `--lime` | `#3b82f6` |
| Badge background | `--lime-soft` | `#dbeafe` |
| Warning stat border | `--warn` at ~40% | `#d97706` |
| Traffic-light red (frame only) | — | `#ff5f57` |
| Traffic-light yellow | — | `#febc2e` |
| Traffic-light green | — | `#28c840` |

### Gradient text (headline accent words)

```css
.grad-text {
  background: linear-gradient(
    120deg,
    #1d4ed8 0%,
    #3b82f6 60%,
    #1d4ed8 100%
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

| Family | Role on `brand-l` |
|---|---|
| **Bricolage Grotesque** | Headlines, logo wordmark, stat numbers, marquee phrases, card titles |
| **Geist** | Body, lead paragraphs, module descriptions |
| **JetBrains Mono** | Eyebrows, meta strip, stat labels, chips, code lines, FAQ IDs, pricing tags |

### 4.2 Type scale at 1080px width (reference)

Scale proportionally for other canvas widths: `size × (canvasWidth / 1080)`.

| Element | Font | Weight | Size @1080 | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| Hero H1 | Bricolage | 600 | 96–130px | 0.92 | -0.04em |
| Section H2 | Bricolage | 600 | 64–88px | 0.95 | -0.035em |
| Card H3 | Bricolage | 600 | 24px | 1.1 | -0.02em |
| Lead | Geist | 400 | 20–21px | 1.55 | 0 |
| Body | Geist | 400 | 15–18px | 1.55 | 0 |
| Eyebrow | JetBrains Mono | 400 | 12px | 1.4 | 0.04em |
| Meta strip | JetBrains Mono | 400 | 13px | 1.4 | 0 |
| Stat number | Bricolage | 600 | 22–56px | 1 | -0.02em |
| Stat label | JetBrains Mono | 400 | 10–11px | 1.3 | 0 |
| Code line | JetBrains Mono | 400 | 13px | 1.4 | 0 |
| CTA button | Geist | 600 | 15–17px | 1 | 0 |
| Logo wordmark | Bricolage | 600 | 17px | 1 | -0.02em |

### 4.3 Text treatments

- **Gradient span:** one or two words per headline (e.g. *Sin caos.*, *Todo tu negocio.*).
- **Ink emphasis:** body phrase in `--ink` with dashed underline `1px dashed #1d4ed8` (class `.h-ink` on web).
- **Mono bullet meta:** `●` in `--lime` (`#3b82f6`) + label in `--mute`.
- **Eyebrow pattern (Brand L):** plain label, sentence case — e.g. `Capacidades`, `Flujo`, `Planes`, `FAQ`, `Próximo paso`. Color `#3b82f6`. **No** `//` prefix (unlike Brand I).

---

## 5. Background and atmosphere

Every social frame should feel like the site hero: **grid + two soft glows** on `--bg`.

### 5.1 Base fill

Solid `#f8f9fb` edge to edge.

### 5.2 Grid overlay

- Lines: `color-mix(in srgb, #1d4ed8 6%, transparent)` at 1px
- Cell size: **64 × 64px**
- Fade: radial mask centered top — full opacity at top, transparent ~70% down the canvas  
  (`mask-image: radial-gradient(circle at 50% 0%, black 0%, transparent 70%)`)

### 5.3 Ambient glows (two blobs)

| Blob | Size | Position | Fill | Blur | Opacity |
|---|---|---|---|---|---|
| Glow 1 | 600×600 | top-left, partly off-canvas | `radial-gradient(circle, rgba(29,78,216,0.08) 0%, transparent 60%)` | 80px | 0.4 |
| Glow 2 | 600×600 | right ~30% vertical | `radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 60%)` | 80px | 1.0 |

Content and cards sit **above** grid and glows (higher z-index).

### 5.4 Panel card treatment

```
background: #ffffff
border: 1px solid #dde2ed
border-radius: 18px
padding: 28px (scale for small formats)
```

Hover/emphasis in static posts: border `#1d4ed8`, background `#e8ecf4` (optional; no animation required).

### 5.5 Nav pill (optional in social headers)

Mimic sticky nav for “product UI” style posts:

```
background: color-mix(#ffffff 88%, transparent)
backdrop-filter: blur(16px) saturate(140%)
border: 1px solid #dde2ed
border-radius: 999px
box-shadow: 0 2px 12px rgba(15,22,35,0.06)
```

---

## 6. Logo and wordmark

### 6.1 Mark (SVG)

ViewBox `0 0 32 32`, stroke + fill:

- Outer ring: circle `cx=16 cy=16 r=14`, `stroke=currentColor`, `stroke-width=1.4`, no fill
- Inner dot: circle `cx=16 cy=16 r=5`, `fill=currentColor`
- Color: `#1d4ed8` on light backgrounds; on primary CTA use `#f8f9fb` for contrast

**Sizes @1080px:** nav 22×22px, footer 18×18px — for social header use **32–40px** mark + wordmark gap **10px**.

### 6.2 Wordmark

- Text: `tutreino` (lowercase)
- Bricolage Grotesque **600**
- Color: `#0f1623` on light; on primary CTA use `#f8f9fb`

### 6.3 Clear space

Minimum padding around lockup = **height of the mark** on all sides.

---

## 7. Layout templates

Eight repeatable compositions mapped to `brand-l` sections. Pick one per slide/post.

### Template A — Hero statement

**Use:** launch posts, paid ads, cover slide.

```
H1: Gestioná tu gym. + grad "Sin caos."
Lead: 1–2 lines Geist #3d4f6a, max ~620px wide
CTA row: primary button + ghost OR meta strip only
```

- Primary button: bg `#1d4ed8`, text `#f8f9fb`, radius 12px, shadow `0 12px 30px -8px` cobalt 60% mix, border ring `#1e40af`
- Ghost button: bg `#ffffff`, border `#c8d0e0`, text `#0f1623`
- Include **pulse dot** 8px `#f8f9fb` left of CTA label when mimicking live product

### Template B — Marquee band

**Use:** Stories middle beat, Reels text overlay, carousel divider.

- Full-width band, bg `#f0f2f6`, border top/bottom `#dde2ed`, padding ~18px vertical
- Phrases: Bricolage 500, ~28px @1080, alternating `#0f1623` (odd) and `#8494ae` (even)
- Separators: `·` in JetBrains Mono, color `#1d4ed8`, ~80% size of phrase

**Phrase bank (from page):**  
`+ 120 gimnasios` · `cobros automáticos` · `agenda online` · `métricas en vivo` · `app para clientes` · `sin Excel`

### Template C — Module card (2×2 grid crop)

**Use:** feature carousels (4 slides).

Each card:

1. Eyebrow (section-level, once per carousel): `Capacidades`
2. Section H2: `Una plataforma.` + grad `Todo tu negocio.`
3. Title: Bricolage 24px — one of four modules below
4. Body: Geist 15px `#3d4f6a`
5. Inner vis block: bg `#f8f9fb`, border `#dde2ed`, radius 12px, padding 18px

| Module | Title | Body (short) |
|---|---|---|
| 1 | Gestión de clientes | Ficha completa: asistencia, membresía, pagos, notas. |
| 2 | Turnos y clases | Clases grupales, individuales, reserva autónoma. |
| 3 | Membresías y pagos | Suscripciones, recordatorios, cobro automático. |
| 4 | Reportes y métricas | Ingresos, retención, ocupación, clientes en riesgo. |

Reuse inner visuals: client rows with dots, schedule list, payment flow (D−3 → D+1), bar chart.

### Template D — Stat quad

**Use:** proof posts, “numbers” Stories.

Four cells in 2×2:

```
Label: JetBrains Mono 10px #8494ae
Number: Bricolage 22–40px #0f1623
Delta: JetBrains Mono 10px (up: #1d4ed8, warn: #d97706)
```

Example copy:

| Label | Number | Delta |
|---|---|---|
| Clientes activos | 248 | +12 este mes |
| Cobros este mes | 89.4k | +8% vs anterior |
| Turnos hoy | 34 | 8 disponibles |
| Vencen esta semana | 17 | requieren acción (warn card) |

Warn card: border `rgba(217,119,6,.4)`, bg `rgba(217,119,6,.04)`.

### Template E — Product frame crop

**Use:** “see the product” posts, demo Reels still.

Browser chrome strip:

- Dots 11px: `#ff5f57`, `#febc2e`, `#28c840`
- URL: JetBrains Mono 12px `#8494ae` — `app.tutreino.com / panel`
- Live pill: bg `#3b82f6`, text `#f8f9fb`, uppercase `live`

Frame: radius 18px, shadow `0 20px 60px -20px rgba(15,22,35,0.12)`. Optional slight `rotateX(2deg)` for depth.

**Sidebar labels:** Panel, Clientes (248), Turnos, Cobros, Métricas · example gym **Iron Gym**.

Crop **main panel only** (stats + activity) for square posts; include sidebar for landscape.

**Activity feed copy:**

- Marcos González renovó su membresía · hace 2 min · `pagado`
- Lucía R. reservó clase de pilates · jue 19h · hace 8 min · `turno`
- Pedro C. completó onboarding · hace 23 min · `nuevo`

### Template F — Numbered step

**Use:** onboarding carousel, tutorial Reels.

- Eyebrow: `Flujo`
- H2: `En un día,` + grad `listo para siempre.`
- Left: outline number `01`–`03`, Bricolage 120px, transparent fill, stroke `#c8d0e0` 1px
- Right: panel card with title, short body, optional mono snippet

| Step | Title | Body | Code line |
|---|---|---|---|
| 01 | Creás tu cuenta | Nombre del gym, planes, horarios. Menos de 10 min. | `$ tutreino init --gym="Iron Gym"` |
| 02 | Cargás tus clientes | Excel o uno por uno. Membresías y vencimientos. | `→ clientes.csv · 248 registros · importados ✓` |
| 03 | La plataforma trabaja | Cobros, recordatorios, agenda online. | `→ status: live · 248 clientes · 34 turnos hoy` (lime `#3b82f6`) |

### Template G — Pricing

**Use:** promo posts, Stories swipe-up context.

Eyebrow: `Planes` · H2: `Pagás` + grad `menos` + `que un día de staff.`

Two cards side by side (stack on 9:16):

| | Starter | Pro (featured) |
|---|---|---|
| Tag | `para empezar` | `todo incluido` + pill `popular` |
| Price | UYU 1.800 / mes | UYU 3.200 / mes (grad on amount) |
| Featured | — | border `#1d4ed8`, glow blob top-right 15% opacity |

**Starter bullets:** Hasta 50 clientes · Gestión de membresías · Agenda básica · Cobros manuales

**Pro bullets:** Clientes ilimitados · Cobros automáticos recurrentes · Agenda avanzada + app cliente · Sin límite de turnos · Reportes completos · Soporte prioritario

Checklist bullets: Geist 14.5px, checkmark via cobalt L-shape (not icon font).

### Template H — Final CTA

**Use:** last carousel slide, Story end frame.

- Outer panel `#ffffff`, radius 32px, centered, border `#dde2ed`
- Radial accents: cobalt 30% top-left, sky 25% bottom-right (soft, on white)
- Eyebrow: `Próximo paso` centered, `#3b82f6`
- H2: `El gym que gestionás` + grad `como un profesional.`
- Mono subline: `14 días sin tarjeta · setup asistido`
- Large primary CTA: `Empezar gratis ahora` + pulse dot

---

## 8. UI micro-components

Portable pieces for compositing inside templates.

### 8.1 Meta strip items

`●` `#3b82f6` + text `#8494ae` (JetBrains Mono 12.5px):

- Sin tarjeta de crédito
- Setup en < 1h
- Soporte humano local
- Cancelás cuando querés

### 8.2 Chips

| Variant | Background | Text |
|---|---|---|
| green | `color-mix(#1d4ed8 12%, transparent)` | `#1d4ed8` |
| lime | `#dbeafe` | `#3b82f6` |

Labels: `pagado`, `turno`, `nuevo`, `plan pro · activo`, `vence en 3 días` (hot uses lime-soft + lime text).

### 8.3 Status dot (live)

8px circle `#f8f9fb` on CTA; 6px `#1d4ed8` on badges. Optional pulse ring: cobalt 40% → transparent 6px over 1.6s.

### 8.4 Buttons

| Type | Background | Text | Border / shadow |
|---|---|---|---|
| Primary | `#1d4ed8` | `#f8f9fb` | 1px `#1e40af`, soft cobalt glow |
| Primary hover (static alt state) | `#3b82f6` | `#f8f9fb` | — |
| Ghost | `#ffffff` | `#0f1623` | 1px `#c8d0e0` |
| Nav CTA mini | `#1d4ed8` pill | `#f8f9fb` | radius 999px |

### 8.5 Client row (clientes vis)

Dot 8px: cobalt `#1d4ed8`, sky `#3b82f6`, or gray `#8494ae` · name `#0f1623` · tag pill uppercase 10px.

Examples: `Marcos G.` · `plan pro · activo` · `Lucía R.` · `vence en 3 días` (hot) · `Pedro C.` · `onboarding`

### 8.6 Schedule row (agenda vis)

`08:00` mono mute · class name Geist 600 · `12/15 · instructor` mute · dot 10px full `#1d4ed8` or ok `#3b82f6`.

Classes: Funcional A, Pilates Core, Spinning.

### 8.7 Payment flow (cobros vis)

Steps on `#e8ecf4` panels; labels `D−3`, `D−1`, `D+1` in `#3b82f6`:

1. recordatorio de vencimiento  
2. link de pago automático  
3. pago confirmado ✓ (success: bg `#dbeafe`, border `#3b82f6`)

### 8.8 Bar chart (métricas vis)

Container height ~110px; bars `#e8ecf4`; highlight bar gradient `180deg, #3b82f6 → #1d4ed8`; radius top 4px.

### 8.9 FAQ row

Summary: Bricolage 500 17px `#0f1623` · ID `Q.01`–`Q.05` in `#3b82f6` · caret `+` in mute.  
Panel: white bg, border `#dde2ed`, radius 18px.

---

## 9. Copy, voice, and content bank

Aligned with `brand-l.astro` and gym-SaaS positioning. Spanish, direct, outcomes-first.

### 9.1 Voice rules

- **Confident, practical** — no spa/wellness tone, no hype stacks
- **Outcome > feature** — “cobros automáticos” not “payment module”
- **Numbers when possible** — 248 clientes, 14 días, UYU 3.200, +120 gimnasios
- **voseo** where natural: *Gestioná*, *Cancelás*, *querés*, *Creás*, *Cargás*
- Avoid WhatsApp in Brand L assets (use “plataforma”, “app”, “panel”)
- **Audience:** gimnasios y entrenadores personales que quieren crecer sin perder el control

### 9.2 Headlines (approved variants)

- Gestioná tu gym. **Sin caos.**
- Una plataforma. **Todo tu negocio.**
- En un día, **listo para siempre.**
- Pagás **menos** que un día de staff.
- Las dudas que ya nos hicieron **100 veces**.
- El gym que gestionás **como un profesional.**

### 9.3 Subheads / leads

- Turnos, membresías, pagos y clientes en una sola plataforma. Para gimnasios y entrenadores personales que quieren crecer **sin perder el control**.
- Cuatro módulos. Una sola app. Reemplaza el Excel, la libreta y los grupos de WhatsApp del staff.
- Sin permanencia. Cancelás cuando querés. Soporte humano en español.

### 9.4 Module bodies (full)

**Gestión de clientes**  
Ficha completa por cliente: historial de asistencia, membresía activa, pagos y notas del entrenador.

**Turnos y clases**  
Clases grupales, sesiones individuales, disponibilidad por instructor. Los clientes reservan solos.

**Membresías y pagos**  
Suscripciones recurrentes, planes a medida, recordatorios de vencimiento. El dinero entra solo.

**Reportes y métricas**  
Ingresos, retención, ocupación por clase, clientes en riesgo. Decisiones basadas en datos reales.

### 9.5 CTAs

| Label | Context |
|---|---|
| Empezar | Nav mini CTA |
| Iniciar prueba · 14 días | Hero primary |
| Ver el producto | Hero ghost (with `→` kbd) |
| Empezar → | Starter pricing |
| Probar 14 días gratis → | Pro pricing |
| Empezar gratis ahora | Final CTA |

### 9.6 Nav labels (optional in crops)

Producto · Flujo · Precios · FAQ

### 9.7 FAQ one-liners (Story FAQ stickers)

| ID | Question | Answer (short) |
|---|---|---|
| Q.01 | ¿Necesito saber programar? | No. Setup visual en español, menos de 1 hora. Configuración asistida disponible. |
| Q.02 | ¿Importar desde Excel? | Sí — nombre, plan, vencimiento, contacto. |
| Q.03 | ¿Cobros automáticos? | Recordatorios y links antes del vencimiento. |
| Q.04 | ¿Clientes instalan algo? | No — web sin login para reservar y pagar. |
| Q.05 | ¿Probar antes de pagar? | 14 días gratis, sin tarjeta. Conservás tus datos. |

### 9.8 Footer / legal microcopy

- © 2026 Tutreino · hecho en Montevideo
- all systems operational (status line, mono, `#3b82f6`)
- Contacto: info@tutreino.com
- Columns: producto · empresa · legal

### 9.9 Instagram caption templates

**Launch (Template A)**  
```
Gestioná tu gym sin caos.

Turnos, membresías, pagos y clientes en una sola plataforma — para gimnasios y entrenadores que quieren crecer sin perder el control.

14 días gratis · sin tarjeta · setup en menos de 1h

Link en bio →
```

**Feature carousel (Template C, 4 slides)**  
Slide 1: Clientes · Slide 2: Turnos · Slide 3: Cobros · Slide 4: Métricas — each ends with “Una plataforma. Todo tu negocio.” on slide 4 or 5.

**Proof (Template D)**  
```
248 clientes activos. 89.4k en cobros este mes. 34 turnos hoy.

Así se ve tu panel cuando dejás el Excel atrás.

Probá 14 días gratis → link en bio
```

**Pricing (Template G)**  
```
Menos que un día de staff.

Starter UYU 1.800 · Pro UYU 3.200 (popular)

Sin permanencia · soporte humano en español

Empezá gratis → link en bio
```

### 9.10 LinkedIn variants

- **Tone:** slightly more formal; keep voseo light or use “tú” if brand guidelines require neutral Spanish for LATAM-wide posts.
- **Hook line:** “¿Tu gym sigue en Excel y WhatsApp?” → pivot to single platform outcome.
- **CTA:** “Probar 14 días gratis” + link to registro (same as web `registroUrl`).

### 9.11 Story sticker copy (short)

- Sin tarjeta
- Setup < 1h
- 14 días gratis
- Soporte humano
- live · panel
- +120 gimnasios

### 9.12 Hashtags (optional, end card)

Keep minimal: `#gimnasio` `#fitnessbusiness` `#gestión` `#Tutreino` `#emprendimiento` — adjust per campaign.

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

- Body text on `#f8f9fb` / `#ffffff`: use `#0f1623` or `#3d4f6a`; verify **≥ 4.5:1** contrast for small mono labels (`#8494ae` on white may fail for tiny text — use `#3d4f6a` for critical copy).
- CTA `#f8f9fb` on `#1d4ed8`: passes for large buttons; avoid cobalt text on sky blue without checking size.
- Minimum text on Stories: **24px** Geist equivalent @1080×1920 for body.
- Do not rely on gradient alone for meaning; repeat key word in solid `#0f1623` when possible.
- Export: PNG for static; MP4 H.264 for video; embed sRGB; no CMYK.

**File naming:**

```
tutreino-brand-l_{format}_{template}_{slug}_v01.png
例: tutreino-brand-l_1080x1080_template-a_hero-sin-caos_v01.png
```

---

## 12. Do / don't checklist

### Do

- Use Brand L light cobalt palette only (`#1d4ed8` / `#3b82f6` / `#f8f9fb` canvas)
- Include grid + soft glow atmosphere on every piece
- Use Bricolage + Geist + JetBrains Mono trio
- Use plain eyebrows (`Capacidades`, `Flujo`) and `Q.01` FAQ ids
- Show product via browser frame or stat cards when proving value
- Price in **UYU** for Uruguay campaigns
- Keep copy in Spanish with voseo
- Use wordmark **tutreino** and URL **app.tutreino.com**

### Don't

- Import Brand I **dark indigo** palette (`#080b14`, `#6366f1`) — wrong brand
- Import v2 **dark green** palette from `design-system-v2.md` (`#25d366`, `#0a100d`) — wrong brand
- Use index.astro neo-brutalist cream/magenta/yellow system
- Use `//` mono eyebrows (Brand I pattern) on Brand L assets
- Use white text on white panels without contrast check
- Lead with WhatsApp UI in Brand L social
- Use **massocios** wordmark or `app.massocios.com` on Brand L exports
- Over-animation on small text; respect reduced-motion exports
- Stretch logo mark or switch to uppercase TUTREINO

---

## 13. Replication checklist

Before publishing a social asset:

- [ ] Canvas size and safe zones from §2
- [ ] Background `#f8f9fb` + 64px grid + two cobalt glows
- [ ] All colors from §3 (no Brand I navy, no v2 dark green)
- [ ] Fonts loaded: Bricolage, Geist, JetBrains Mono
- [ ] At most 1–2 gradient words per headline
- [ ] Logo mark + `tutreino` with clear space
- [ ] Copy matches §9 voice; CTAs consistent
- [ ] Contrast checked for body and CTA text on light bg
- [ ] File named per §11 convention
- [ ] Source reference noted: `brand-l.astro` / Brand L

---

## Appendix A — Complete CSS variable block

```css
.brand-l-social {
  --bg: #f8f9fb;
  --bg-2: #f0f2f6;
  --panel: #ffffff;
  --panel-2: #e8ecf4;
  --line: #dde2ed;
  --line-2: #c8d0e0;
  --ink: #0f1623;
  --ink-2: #3d4f6a;
  --mute: #8494ae;
  --green: #1d4ed8;
  --green-deep: #1e40af;
  --lime: #3b82f6;
  --lime-soft: #dbeafe;
  --red: #dc2626;
  --warn: #d97706;

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
| Kbd hint in ghost CTA | 5px |

## Appendix C — Class mapping (`brand-l.astro` → social name)

| Web class | Social label |
|---|---|
| `.h-root` | Artboard root |
| `.h-grad` | Gradient headline span |
| `.h-hero` | Template A |
| `.h-meta-strip` | Trust bullets |
| `.h-marquee` | Template B |
| `.h-mod` | Template C card |
| `.h-stat` | Template D cell |
| `.h-prev-frame` | Template E |
| `.h-flow` | Template F |
| `.h-vprice` | Template G |
| `.h-final` | Template H |
| `.h-nav` | Optional header chrome |
| `.h-eyebrow` | Section label (plain text) |

## Appendix D — Brand L vs Brand I quick diff

| Aspect | Brand L (this doc) | Brand I |
|---|---|---|
| Theme | Light | Dark |
| Canvas | `#f8f9fb` | `#080b14` |
| Primary | `#1d4ed8` cobalt | `#6366f1` indigo |
| Secondary | `#3b82f6` sky | `#a5b4fc` periwinkle |
| CTA text on button | `#f8f9fb` | `#080b14` |
| Eyebrow | `Capacidades` | `// capacidades` |
| Wordmark | tutreino | massocios |
| Product URL | app.tutreino.com | app.massocios.com |

---

*Document generated from `src/pages/brand-l.astro`. Update when Brand L palette or copy changes on that page.*
