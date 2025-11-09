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

#### Standard Cards (Square/Vertical)
- **Border:** 4px solid `#434F4D` (Outer Space) on all sides
- **Left Accent Border:** Additional 4px solid `#40B291` (Jungle Green) layered on top of the left border
- **Shadow (Default):** `4px 4px 0px 0px rgba(67, 79, 77, 1)` — brutalist offset shadow in Outer Space
- **Shadow (Hover):** `6px 6px 0px 0px rgba(64, 178, 145, 1)` — larger offset shadow in Jungle Green
- **Hover Transform:** `translate(-2px, -2px)` — card shifts up and left on hover
- **Corners:** All sharp (90° corners), no rounding
- **Background:** White (`#FFFFFF`)
- **Padding:** 1.5–2rem (24–32px) internal padding
- **Transition:** `transition-all` for smooth hover effects

**Example Implementation:**
```tsx
<div className="bg-white border-4 border-outer-space shadow-[4px_4px_0px_0px_rgba(67,79,77,1)] hover:shadow-[6px_6px_0px_0px_rgba(64,178,145,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
  <div className="p-6 border-l-4 border-jungle-green">
    {/* Card content */}
  </div>
</div>
```

#### Rectangular Cards (Multi-Purpose Pattern)

**Use this pattern for any rectangular content including:**
- Blog posts and articles
- Portfolio items
- Product cards
- Event listings
- Team member profiles
- Case studies
- Resource cards
- Any content with a landscape/horizontal aspect ratio

**Core Visual Pattern:**
- **Outer Border:** 4px solid `#B5B5B5` (light gray `border-gray-300`) on left side ONLY
- **Hover Border:** Changes to `#40B291` (Jungle Green) on hover
- **Featured Media Section (Image/Video/Graphic):**
  - No border on the media container itself
  - Media fills container with `object-fit: cover`
  - Recommended aspect ratio: 16:10, 16:9, or 3:2 (height: 224px / 14rem works well)
  - **Top-right corner ONLY:** `rounded-r-md` (0.375rem / 6px border-radius)
  - Other 3 corners: Sharp (90°)
  - `overflow: hidden` to clip media to rounded corner
- **Shadow (Default):** Standard Material Design shadow (`shadow-md`)
- **Shadow (Hover):** Elevated shadow (`shadow-xl`)
- **No Position Transform:** Unlike square cards, these don't shift position on hover (prevents layout shift)
- **Content Section:**
  - White background
  - Padding: 1.5rem (24px) or 2rem (32px) for larger cards
  - Typical structure: eyebrow/category label (uppercase, green), title, description/excerpt, metadata
- **Layout:** Vertical stack (media on top, content below)
- **Transition:** `transition-all` for smooth border and shadow changes

**Visual Breakdown:**
```
┌─────────────────────────╮  ← Top-right: rounded-r-md (6px radius)
│                         │
│   Featured Media        │
│   (Image/Video/etc)     │
│   object-fit: cover     │
│   h-56 recommended      │
│                         │
├─────────────────────────┤  ← All other corners: sharp 90°
│ 4px left border         │
│ (gray → green on hover) │
│                         │
│  Label/Category (GREEN) │
│  Title (hover → green)  │
│  Description/Excerpt    │
│  Metadata/Footer Info   │
│                         │
└─────────────────────────┘
```

**Example Implementation (Blog Post):**
```tsx
<a
  href="/blog/post-slug"
  className="group bg-white border-l-4 border-gray-300 hover:border-jungle-green shadow-md hover:shadow-xl transition-all flex flex-col"
>
  <div className="relative w-full h-56 overflow-hidden rounded-r-md">
    <Image src={imageUrl} alt={title} fill style={{ objectFit: 'cover' }} />
  </div>
  <div className="p-6 flex flex-col flex-grow">
    <p className="text-xs font-semibold uppercase tracking-widest text-jungle-green mb-3">
      {category}
    </p>
    <h3 className="text-lg font-bold text-outer-space mb-3 group-hover:text-jungle-green transition-colors">
      {title}
    </h3>
    <p className="text-sm text-feldgrau">{excerpt}</p>
  </div>
</a>
```

**Example Implementation (Product Card):**
```tsx
<div className="group bg-white border-l-4 border-gray-300 hover:border-jungle-green shadow-md hover:shadow-xl transition-all flex flex-col">
  <div className="relative w-full h-56 overflow-hidden rounded-r-md">
    <Image src={productImage} alt={productName} fill style={{ objectFit: 'cover' }} />
  </div>
  <div className="p-6">
    <p className="text-xs font-semibold uppercase tracking-widest text-jungle-green mb-2">
      {category}
    </p>
    <h3 className="text-xl font-bold text-outer-space mb-2 group-hover:text-jungle-green transition-colors">
      {productName}
    </h3>
    <p className="text-sm text-feldgrau mb-4">{description}</p>
    <p className="text-lg font-bold text-outer-space">{price}</p>
  </div>
</div>
```

**Example Implementation (Team Member):**
```tsx
<div className="group bg-white border-l-4 border-gray-300 hover:border-jungle-green shadow-md hover:shadow-xl transition-all flex flex-col">
  <div className="relative w-full h-56 overflow-hidden rounded-r-md">
    <Image src={photoUrl} alt={name} fill style={{ objectFit: 'cover' }} />
  </div>
  <div className="p-6">
    <p className="text-xs font-semibold uppercase tracking-widest text-jungle-green mb-2">
      {role}
    </p>
    <h3 className="text-xl font-bold text-outer-space mb-2 group-hover:text-jungle-green transition-colors">
      {name}
    </h3>
    <p className="text-sm text-feldgrau">{bio}</p>
  </div>
</div>
```

**Key Visual Elements:**
1. **Left border accent** — 4px gray that becomes green on hover (visual indicator of interactivity)
2. **Single rounded corner** — top-right only (`rounded-r-md`), creates asymmetric, modern feel
3. **Three sharp corners** — maintains brutalist aesthetic while softening the visual transition between media and content
4. **Green label/category** — always visible at top of content, provides consistent color anchor
5. **Title color shift** — dark gray (`#434F4D`) to green (`#40B291`) on hover, reinforces clickability
6. **Shadow elevation** — subtle to prominent on hover, creates depth hierarchy without position shift

**Design Rationale:**
- **Why one rounded corner?** Creates visual softness and modern appeal while maintaining the brutalist sharp-corner aesthetic. The asymmetry adds visual interest.
- **Why left border only?** Minimalist accent that doesn't compete with the media. Becomes an intuitive hover indicator when it changes color.
- **Why no position transform?** Prevents layout shift in grids, maintains stable visual rhythm, especially important for content-heavy pages.
- **Why gray to green?** Subtle in default state, vibrant on hover — follows progressive disclosure principles.

**When to Use:**
- **Any rectangular content card** where the media (image, video, illustration) is a primary visual element
- Content with landscape/horizontal orientation
- Grid layouts where consistent card heights matter
- Interactive elements (links, buttons) that benefit from hover feedback
- Situations where you want a softer, more modern feel than the full brutalist cards

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
