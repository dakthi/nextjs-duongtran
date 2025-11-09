# Design System & Style Guide - Green Palette

This document outlines the visual language, design principles, and implementation guidelines for the website. The design balances **editorial authenticity** with **professional clarity**, reflecting a grounded, modern identity built on trust, growth, and calm.

---

## 🎨 Colour Science & Application Guidelines

### Palette Base

| Name | Hex | Description |
|------|-----|-------------|
| **Outer Space** | `#434F4D` | Dark Neutral |
| **Jungle Green** | `#40B291` | Primary |
| **Mint Green** | `#D2E8E2` | Light Neutral |
| **Feldgrau** | `#3F6059` | Supporting Neutral |
| **Outer Space Variant** | `#454E4D` | Variant Neutral |

### 1. Colour Theory Overview

This palette follows a **cool, analogous scheme** (teal–green–grey range). It's rooted in natural hues—evoking calm, trust, and balance—ideal for sustainability, wellness, or modern tech themes.

The combination achieves:
- **Harmony** (due to proximity on the colour wheel)
- **Depth** (dark neutrals anchor lighter tones)
- **Freshness** (Jungle Green and Mint Green introduce light energy)

### 2. Functional Colour Roles

| Role | Colour | Hex | Description | Usage Notes |
|------|--------|-----|-------------|-------------|
| **Primary** | Jungle Green | `#40B291` | Brand-defining hue. Represents growth, action, and clarity. | Buttons, highlights, logo accents, links, icons. |
| **Primary Light** | Mint Green | `#D2E8E2` | Airy, refreshing tone for open spaces. | Backgrounds, hover states, form fields, section dividers. |
| **Primary Dark** | Feldgrau | `#3F6059` | Muted, stable companion for balance. | Secondary buttons, nav hover, cards, or dark themes. |
| **Neutral Dark** | Outer Space | `#434F4D` | Deep anchor tone that replaces pure black. | Page backgrounds, headers, footers, overlays. |
| **Neutral Variant** | Outer Space Variant | `#454E4D` | Adds subtle contrast variety. | Text dividers, subtle shadows, secondary panels. |
| **Accent / Success** | Jungle Green (lightened) | `#58C9A6` | Optional accessible variant for feedback or highlights. | Status chips, badges, or confirmation messages. |

### 3. Contrast & Accessibility

**Text contrast targets:**
- Minimum WCAG AA ratio of **4.5:1** for body text
- Maintain sufficient contrast between:
  - `#D2E8E2` background and `#3F6059` text (good readability)
  - `#434F4D` background and `#D2E8E2` or white text (ideal for dark themes)
- Avoid pairing `#40B291` text directly on `#D2E8E2` backgrounds — it lacks depth; darken text slightly to `#3F6059` or use bold weight

🧩 **Tip:** In Figma, create a "Contrast Checker" frame and test all combinations systematically.

### 4. Emotional Palette Mapping

| Emotion | Visual Cue | Colour |
|---------|------------|--------|
| Stability & trust | Deep, grounded base | `#434F4D` |
| Growth & energy | Vibrant primary | `#40B291` |
| Calm & clarity | Open whitespace | `#D2E8E2` |
| Professionalism | Subtle contrast | `#3F6059`, `#454E4D` |

Together, they create a **grounded-fresh identity** — serious enough for professionals, approachable enough for modern audiences.

### 5. Usage Hierarchy

**Background Layers:**
- Primary background: `#D2E8E2` (light theme) or `#434F4D` (dark theme)
- Surface cards/panels: `#3F6059`
- Accent sections (hero, CTA): `#40B291`

**Text Colours:**
- Primary text: `#D2E8E2` (on dark) or `#3F6059` (on light)
- Secondary text: `#B7CCC7` (Mint Green 60% opacity)
- Links & actions: `#40B291` (default), darken on hover to `#3AA084`

**Borders & Dividers:**
- Use translucent overlays (e.g. `#D2E8E2` @ 20%) for soft separations

### 6. Colour Ratios

To maintain balance and hierarchy:
- **60%** neutral background (`#434F4D`, `#D2E8E2`)
- **30%** supporting tone (`#3F6059`)
- **10%** primary accent (`#40B291`)

Think of it like interior design — the darks ground the space, the mints breathe, and the jungle green gives personality.

### 7. Extended Variants (Optional)

If your design system needs scalable variants:

| Variant | Base | Lighten (30%) | Darken (20%) |
|---------|------|---------------|--------------|
| Jungle Green | `#40B291` | `#58C9A6` | `#2F8E75` |
| Feldgrau | `#3F6059` | `#587D74` | `#2B4A44` |
| Outer Space | `#434F4D` | `#5B6664` | `#2E3937` |

Use these for hover states, shadows, and dark/light theme balancing.

---

## 📐 Typography

### Font Families
- **Sans-Serif (All Text):** `'Inter', sans-serif`
  - Used for **ALL TEXT** throughout the entire design — headings, paragraphs, UI, navigation, logos, labels
  - Ensures clarity, modern professionalism, and consistent visual hierarchy
  - **NO serif fonts (Times New Roman-like fonts)** should be used anywhere

### Type Scale

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| **H1** | 2.5–4rem | Bold | 1.2 | Hero titles, main page headers |
| **H2** | 2–3rem | Bold | 1.3 | Section headings |
| **H3** | 1.5–2rem | Semibold | 1.4 | Subsection titles |
| **Body** | 1rem (16px) | Regular | 1.6 | Main text content |
| **Small** | 0.875rem | Regular | 1.5 | Captions, metadata |
| **Eyebrow** | 0.75rem | Semibold | 1.4 | All caps labels |

### Best Practices
- Keep line lengths between **45–75 characters** for optimal readability
- Use **1.5–1.6 line-height** for body text
- Headings should breathe — add generous margin-bottom
- Avoid pure black text; use `#3F6059` on light backgrounds for softer contrast

---

## 🧱 Layout & Spacing

### Container System
- **Max-width:** `1280px` (5xl) for main content
- **Padding:** Responsive horizontal padding (3–12 on scale)
- **Breakpoints:**
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

### Spacing Scale
Based on Tailwind's 4px increment system:
- **Tight:** `0.5rem` (2) — Between icon and text
- **Base:** `1rem` (4) — Standard component spacing
- **Loose:** `2rem` (8) — Section padding
- **Section:** `5rem` (20) — Between major sections

### Grid Philosophy
- Use **asymmetric layouts** to create visual interest
- Alternate image/text placement on different sections
- Maintain whitespace as a design element, not an afterthought

---

## 🎭 Visual Components

### Cards
- **Border:** 2–4px solid `#434F4D`
- **Accent:** Left border in `#40B291` (4px)
- **Shadow:** `4px 4px 0px 0px rgba(67, 79, 77, 1)` (brutalist offset)
- **Hover:** Shift to `6px 6px 0px 0px rgba(64, 178, 145, 1)` + translate `(-2px, -2px)`
- **Padding:** 1.5–2rem internal

### Buttons
- **Primary:**
  - Background: `#40B291`
  - Text: `#FFFFFF`
  - Hover: `#3AA084`
  - Padding: `0.75rem 2rem`
  - Font: Semibold, uppercase tracking

- **Secondary:**
  - Background: `transparent`
  - Border: `2px solid #3F6059`
  - Text: `#3F6059`
  - Hover: Background `#D2E8E2`

### Images
- **Border:** 4px solid `#434F4D`
- **Aspect Ratios:**
  - Hero: 16:9 or 3:2
  - Portrait: 4:5
  - Blog thumbnails: 16:10
- Use `object-fit: cover` with strategic `object-position` for focal control

---

## ✍️ Content Principles

### Voice & Tone
- **Clear over clever** — Avoid jargon; explain complex topics simply
- **Personal but professional** — First-person narrative when appropriate
- **Honest and grounded** — Acknowledge complexity, share real experiences

### Structure
- **Lead with value** — Start sections with the benefit, not the feature
- **Short paragraphs** — Break text into 2–4 sentence chunks
- **Scannable hierarchy** — Use headings, lists, and bold for key points

---

## 🎨 Design Patterns

### Section Alternation
Alternate background colors to create rhythm:
```
Section 1: bg-mint-green (#D2E8E2)
Section 2: bg-white
Section 3: bg-feldgrau (#3F6059) + light text
Section 4: bg-mint-green (#D2E8E2)
```

### Hero Sections
- Large serif heading (3–4rem)
- Supporting paragraph (1.25rem)
- Single CTA with jungle green background
- Optional background image with overlay

### Blog Post Layout
- **Featured image:** Full-width with 4px border
- **Metadata:** Small, uppercase, spaced tracking in `#3F6059`
- **Body:** Max-width 65ch, generous line-height
- **Quotes:** Italic, larger text, left border accent in `#40B291`

### Navigation
- **Desktop:** Horizontal, uppercase, small (0.875rem)
- **Mobile:** Hamburger menu, slide-in panel
- **Active state:** Underline or background in `#40B291`
- **Sticky header:** Background `#434F4D`, text `#D2E8E2`

---

## 🚀 Implementation Guidelines

### CSS Custom Properties
```css
:root {
  /* Colors */
  --color-outer-space: #434F4D;
  --color-jungle-green: #40B291;
  --color-mint-green: #D2E8E2;
  --color-feldgrau: #3F6059;
  --color-outer-space-variant: #454E4D;

  /* Extended Variants */
  --color-jungle-green-light: #58C9A6;
  --color-jungle-green-dark: #2F8E75;

  /* Typography */
  --font-sans: 'Inter', sans-serif;

  /* Spacing */
  --space-tight: 0.5rem;
  --space-base: 1rem;
  --space-loose: 2rem;
  --space-section: 5rem;
}
```

### Tailwind Configuration
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        'outer-space': '#434F4D',
        'jungle-green': '#40B291',
        'mint-green': '#D2E8E2',
        'feldgrau': '#3F6059',
        'outer-space-variant': '#454E4D',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'brutalist': '4px 4px 0px 0px rgba(67, 79, 77, 1)',
        'brutalist-hover': '6px 6px 0px 0px rgba(64, 178, 145, 1)',
      }
    }
  }
}
```

---

## ✅ Checklist for New Components

Before implementing a new component, ensure:
- [ ] Colors follow the 60-30-10 ratio
- [ ] Typography uses established scale
- [ ] Spacing follows 4px increment system
- [ ] Contrast meets WCAG AA standards
- [ ] Hover states provide clear feedback
- [ ] Component works on mobile (320px+)
- [ ] Images have proper borders and aspect ratios
- [ ] Text content is scannable and clear

---

## 🎯 Key Takeaways

1. **Grounded-fresh identity** — Natural hues create trust and calm
2. **Brutalist touches** — Bold borders, offset shadows, asymmetric layouts
3. **Editorial warmth** — Serif headings, personal voice, real stories
4. **Functional hierarchy** — Clear visual organization guides the eye
5. **Accessible by default** — Contrast, spacing, and clarity are non-negotiable

This system is designed to **scale with intention** — every choice should reinforce clarity, authenticity, and professional warmth.
