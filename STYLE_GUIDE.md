# Duong Tran Website Style Guide

A traditional accounting firm design system emphasizing trust, professionalism, and clarity.

---

## Color Palette

### Primary Colors

**Navy Slate** - Trust, Stability, Professionalism
- `slate-800` (#1e293b) - Primary dark, navbar, footer, borders
- `slate-900` (#0f172a) - Body text, headings
- `slate-700` (#334155) - Secondary text
- `slate-600` (#475569) - Tertiary text, pre-titles

**Amber Gold** - Premium, Excellence, Achievement
- `amber-500` (#f59e0b) - Primary accent, CTAs, highlights
- `amber-400` (#fbbf24) - Hover states, secondary accents
- `amber-600` (#d97706) - Emphasized text in hero

### Neutral Colors

**Backgrounds**
- White (#ffffff) - Primary background
- `slate-50` (#f8fafc) - Alternating section backgrounds
- `amber-50` (#fffbeb) - Hero background, testimonial cards

---

## Typography

### Font Families

**Serif Font** - Used for headings (Formal, Traditional)
```css
font-family: font-serif
```

**Sans-serif Font** - Used for body text (Clean, Readable)
```css
font-family: Inter, system-ui, sans-serif
```

### Heading Hierarchy

**H1 - Hero Title**
```css
font-size: 3xl md:5xl (1.875rem - 3rem)
font-family: font-serif
font-weight: bold
color: slate-900 / white (on dark bg)
line-height: tight
```

**H2 - Section Titles**
```css
font-size: 3xl md:4xl (1.875rem - 2.25rem)
font-family: font-serif
font-weight: bold
color: slate-900 / white (on dark bg)
line-height: tight
margin-bottom: 1.5rem
```

**H3 - Benefit/Feature Titles**
```css
font-size: 3xl md:4xl (1.875rem - 2.25rem)
font-family: font-serif
font-weight: bold
color: slate-900
line-height: tight
```

**H4 - Benefit Card Titles**
```css
font-size: lg (1.125rem)
font-weight: bold
color: slate-900
margin-bottom: 0.75rem
```

### Body Text

**Primary Body Text**
```css
font-size: lg (1.125rem)
line-height: relaxed (1.625)
color: slate-900
font-weight: medium
```

**Secondary Body Text**
```css
font-size: base (1rem)
line-height: relaxed
color: slate-700
```

**Pre-titles (Eyebrow Text)**
```css
font-size: xs (0.75rem)
font-weight: semibold
text-transform: uppercase
letter-spacing: widest
color: slate-600 / amber-400 (on dark bg)
```

---

## Spacing System

### Section Spacing
- **Vertical padding**: `py-20` (5rem top & bottom)
- **Alternating backgrounds**: White / `slate-50` / `slate-800`

### Content Width
- **Container max-width**: `max-w-5xl` (64rem)
- **Horizontal padding**: `px-8 xl:px-12`
- **Text content max-width**: `max-w-3xl` (48rem) for readability

### Component Spacing
- **Between sections**: Handled by page-level `py-20`
- **Within components**: `mb-4`, `mb-6`, `mb-8`, `mb-12` depending on hierarchy
- **Grid gaps**: `gap-6`, `gap-8`, `gap-12`, `gap-16` depending on content density

---

## Component Patterns

### Navbar
```css
background: slate-800
padding: py-4 md:py-5, px-8 xl:px-12
position: sticky top-0
z-index: 50

Logo:
- font-serif, bold, text-white, text-2xl
- Tagline: text-amber-400, text-sm

Navigation Links:
- text-slate-200
- hover: text-amber-400

CTA Button:
- bg-amber-500
- hover: bg-amber-400
- text-slate-900
- font-semibold
```

### Hero Section
```css
background: amber-50
border-bottom: 4px border-amber-500
padding: py-20

Layout: Two columns (flex-1 each)
- Text content (left)
- Image (right, aspect-[4/5])

Image border: 4px slate-800
CTA button: amber-500 bg, slate-900 text
```

### Section Title
```css
text-align: center
max-width: 3xl

Pre-title: slate-600, uppercase, xs
Title: slate-900, serif, 3xl-4xl
Description: slate-900, medium weight, lg
```

### Benefit Cards
```css
Layout: grid-cols-1 md:2 lg:3
gap: 1.5rem

Card:
- background: white
- padding: 1.5rem
- border-left: 4px amber-500
- shadow: md
- Title: slate-900, bold, lg
- Text: slate-700, base
```

### Testimonial Cards
```css
Layout: grid-cols-1 lg:2
gap: 2rem

Card:
- background: amber-50
- border: 2px slate-800
- padding: 2rem
- shadow: md
- hover: shadow-xl

Quote mark: text-6xl amber-500
Text: slate-700, italic
Author border: 2px amber-500 (top)
Avatar: 56px, border-2 slate-800
```

### FAQ Accordion
```css
Button:
- background: amber-50
- border: 2px slate-800
- padding: py-5 px-6
- font-semibold slate-800
- hover: amber-100

Icon: amber-600, w-6 h-6

Panel:
- background: white
- border: 2px slate-800 (no top)
- padding: py-5 px-6
- text: slate-700
```

### Footer
```css
background: slate-900
margin-top: 6rem
padding: pt-12 pb-8

Logo: font-serif, white, text-2xl
Tagline: amber-400, text-sm
Links: slate-300, hover: amber-400
Social icons: slate-400, hover: amber-400
Copyright border: slate-800 (top)
```

---

## Buttons

### Primary CTA
```css
background: amber-500
color: slate-900
hover: amber-400
padding: px-8 py-3
font-size: base
font-weight: semibold
transition: colors
```

### Secondary Button
```css
background: slate-800
color: white
hover: slate-700
padding: px-6 py-2
font-size: sm
font-weight: medium
```

---

## Borders & Shadows

### Borders
- **Accent borders**: `border-l-4 border-amber-500` (left accent)
- **Card borders**: `border-2 border-slate-800`
- **Image borders**: `border-4 border-slate-800`
- **Section dividers**: `border-b-4 border-amber-500`

### Shadows
- **Cards**: `shadow-md`
- **Interactive cards**: `shadow-md hover:shadow-xl`
- **Images**: `shadow-lg`

---

## Grid Layouts

### Benefits Grid
```css
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
gap: 1.5rem
```

### Testimonials Grid
```css
grid-cols-1 lg:grid-cols-2
gap: 2rem
```

### Two-Column Layout (Hero, Benefits with images)
```css
flex-col lg:flex-row
gap: 3rem
Split: 5/12 and 7/12 or flex-1 each
```

---

## Accessibility

### Contrast Ratios
- All text meets WCAG AAA standards (7:1 minimum)
- Body text: `slate-900` (#0f172a) on white
- Light text: `slate-200` on `slate-800` backgrounds

### Focus States
- All interactive elements have visible focus states
- Focus rings: `focus:ring-2 focus:ring-amber-500`

### Font Sizes
- Minimum body text: 16px (1rem)
- Preferred body text: 18px (1.125rem) for better readability

---

## Animation & Transitions

### Hover Transitions
```css
transition: colors
transition: shadow
```

### Timing
- Standard transitions: 150-200ms
- No complex animations to maintain professional appearance

---

## Best Practices

### Do's
✅ Use serif fonts for headings to convey tradition and trust
✅ Maintain generous spacing between sections (py-20)
✅ Use alternating backgrounds for visual rhythm
✅ Keep text content within max-w-3xl for readability
✅ Use amber-500 sparingly as an accent color
✅ Ensure all text has sufficient contrast

### Don'ts
❌ Don't use dark mode variants
❌ Don't use rounded corners larger than 4px
❌ Don't mix too many colors - stick to navy and gold
❌ Don't use decorative elements that distract from content
❌ Don't use light text on light backgrounds
❌ Don't use animations or transitions longer than 200ms

---

## Implementation Notes

### Container Component
```tsx
<Container className="max-w-5xl mx-auto px-8 xl:px-12">
  {children}
</Container>
```

### Section Wrapper Pattern
```tsx
<div className="py-20 bg-white">
  <Container>
    <SectionTitle />
    <Content />
  </Container>
</div>

<div className="py-20 bg-slate-50">
  {/* Alternating section */}
</div>
```

### Global CSS
```css
body {
  color: #0f172a; /* slate-900 for high contrast */
}

em {
  font-weight: bold;
  color: black;
  font-style: normal;
}
```

---

## Responsive Breakpoints

```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

### Mobile-First Approach
- Stack columns on mobile
- Single column grids on mobile
- Smaller padding on mobile (maintained through container)
- Reduce font sizes on mobile (handled by Tailwind responsive classes)

---

## Version History

**v1.0** - January 2025
- Initial traditional accounting design system
- Navy slate and amber gold color palette
- Serif typography for headings
- Removed all dark mode variants
- Established WCAG AAA accessibility standards
