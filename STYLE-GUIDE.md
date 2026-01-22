# Duong Tran - Design Style Guide

Based on the Jules Nguyen Storyteller design system, adapted for a life coach & student mentor brand.

---

## 1. Color Palette

### CSS Custom Properties (Light Mode)
```css
--bg: #FFFFFF;           /* White background */
--fg: #1A1A1A;           /* Near-black text */
--muted: #6B7280;        /* Gray for secondary text */
--accent: #1E3A5F;       /* Deep navy blue - trust & professionalism */
--accent-2: #C9A227;     /* Warm gold - premium accent */
--card: #FAF8F5;         /* Warm cream - card backgrounds */
--ring: rgba(30, 58, 95, 0.2);  /* Focus ring */
```

### CSS Custom Properties (Dark Mode)
```css
--bg: #0F0F10;           /* Dark charcoal */
--fg: #F5F5F5;           /* Off-white text */
--muted: #9CA3AF;        /* Light gray */
--card: #1A1A1A;         /* Dark card background */
--accent: #1E3A5F;       /* Consistent navy */
--accent-2: #C9A227;     /* Consistent gold */
```

### Semantic Colors
- **Primary Action**: Navy (#1E3A5F) - buttons, links, emphasis
- **Premium Accent**: Gold (#C9A227) - eyebrows, badges, highlights
- **Background**: Cream (#FAF8F5) - sections, cards
- **Text Primary**: Charcoal (#1A1A1A)
- **Text Secondary**: Gray (#6B7280)

---

## 2. Typography

### Font Stack
```typescript
fontFamily: {
  serif: ['Libre Baskerville', 'Georgia', 'serif'],     // Headings
  sans: ['Inter', 'system-ui', 'sans-serif'],           // Body text
}
```

### Typography Scale
| Element | Size | Weight | Line Height | Use Case |
|---------|------|--------|-------------|----------|
| H1 Hero | 4xl-6xl | Bold (700) | 1.1 | Hero sections |
| H2 Section | 3xl-4xl | Bold (700) | 1.2 | Section titles |
| H3 Card | xl-2xl | Semibold (600) | 1.3 | Card titles |
| Body Large | lg (18px) | Normal (400) | 1.75 | Hero descriptions |
| Body | base (16px) | Normal (400) | 1.6 | Paragraphs |
| Small/Muted | sm (14px) | Medium (500) | 1.5 | Captions, meta |
| Eyebrow | sm (14px) | Medium (500) | - | Uppercase, tracking-widest |

### Usage Examples
```jsx
// Hero title
<h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-fg">

// Eyebrow text
<p className="text-sm font-medium tracking-widest uppercase text-accent-2">

// Body text
<p className="text-lg leading-relaxed text-muted">

// Section title
<h2 className="text-3xl md:text-4xl font-serif font-bold text-fg">
```

---

## 3. Spacing System

### Container
- **Max Width**: 1200px (`max-w-6xl`)
- **Padding X**: 24px mobile → 40px tablet → 80px desktop
- **Padding Y**: 64px mobile → 96px desktop

```jsx
<div className="max-w-6xl mx-auto px-6 md:px-10 xl:px-20">
```

### Section Spacing
| Context | Mobile | Desktop |
|---------|--------|---------|
| Section padding | py-16 | py-24 |
| Between sections | my-12 | my-20 |
| Component gap | gap-8 | gap-12 |

### Component Spacing
| Element | Spacing |
|---------|---------|
| Eyebrow to title | mb-4 |
| Title to description | mb-6 |
| Description to CTA | mb-10 |
| Card padding | p-6 md:p-8 |
| List items | space-y-4 |

---

## 4. Component Styles

### Buttons

**Primary Button**
```jsx
className="inline-flex items-center px-8 py-4 text-base font-semibold
           text-white bg-accent hover:bg-accent/90
           rounded-full transition-all shadow-soft hover:shadow-lg"
```

**Secondary Button**
```jsx
className="inline-flex items-center px-8 py-4 text-base font-semibold
           text-accent border-2 border-accent hover:bg-accent hover:text-white
           rounded-full transition-all"
```

**Ghost Button**
```jsx
className="text-accent hover:text-accent/80 font-medium transition-colors"
```

### Cards
```jsx
className="bg-card rounded-2xl shadow-soft p-6 md:p-8
           border border-gray-100 hover:shadow-lg transition-all"
```

**Card with accent border**
```jsx
className="bg-white rounded-xl shadow-soft p-8
           border-l-4 border-accent-2"
```

### Form Inputs
```jsx
className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200
           focus:border-accent focus:outline-none focus:ring-4 focus:ring-ring
           transition-all duration-300"
```

### Badges/Eyebrows
```jsx
className="text-sm font-medium tracking-widest uppercase text-accent-2"
```

---

## 5. Shadows

```typescript
boxShadow: {
  'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
  'warm': '0 4px 20px -2px rgba(201, 162, 39, 0.15)',
}
```

| Use Case | Shadow |
|----------|--------|
| Cards | shadow-soft |
| Hover states | shadow-lg |
| Images | shadow-soft or shadow-xl |
| Buttons | shadow-soft → hover:shadow-lg |

---

## 6. Border Radius

| Element | Radius |
|---------|--------|
| Buttons | rounded-full |
| Cards | rounded-xl or rounded-2xl |
| Images | rounded-2xl |
| Inputs | rounded-xl |
| Badges | rounded-full |
| Small elements | rounded-lg |

---

## 7. Animations & Transitions

### Standard Transitions
```css
transition-all duration-300    /* Default for most */
transition-colors duration-200 /* Color changes only */
transition-transform duration-500 /* Scale/position */
```

### Hover Effects
- **Buttons**: opacity change, shadow increase
- **Cards**: subtle lift (`hover:-translate-y-1`), shadow increase
- **Links**: color change, underline animation
- **Images**: subtle scale (`hover:scale-105`)

### Entry Animations (Framer Motion)
```jsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

---

## 8. Layout Patterns

### Hero Section
```
┌────────────────────────────────────────┐
│  [Cream background]                     │
│                                         │
│  EYEBROW (gold, uppercase)              │
│  Main Headline                          │
│  (serif, bold, large)                   │
│                                         │
│  Supporting description text            │
│  (sans, muted color, relaxed leading)   │
│                                         │
│  [Primary Button]  [Secondary]          │
│                                         │
│         [Image - rounded]               │
│                                         │
└────────────────────────────────────────┘
```

### Section with Cards
```
┌────────────────────────────────────────┐
│  [White or cream background]            │
│                                         │
│        EYEBROW (centered, gold)         │
│        Section Title (centered)         │
│        Description (centered)           │
│                                         │
│  ┌──────┐  ┌──────┐  ┌──────┐          │
│  │ Card │  │ Card │  │ Card │          │
│  │      │  │      │  │      │          │
│  └──────┘  └──────┘  └──────┘          │
│                                         │
└────────────────────────────────────────┘
```

### Two-Column Content
```
┌────────────────────────────────────────┐
│                                         │
│  ┌─────────────┐  ┌─────────────────┐  │
│  │             │  │ EYEBROW         │  │
│  │   Image     │  │ Title           │  │
│  │             │  │ Description     │  │
│  │             │  │ [CTA Button]    │  │
│  └─────────────┘  └─────────────────┘  │
│                                         │
└────────────────────────────────────────┘
```

---

## 9. Responsive Breakpoints

| Breakpoint | Width | Use |
|------------|-------|-----|
| Default | 0px | Mobile-first base |
| sm | 640px | Small mobile |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |

### Common Patterns
```jsx
// Text sizing
text-base md:text-lg lg:text-xl

// Grid columns
grid-cols-1 md:grid-cols-2 lg:grid-cols-3

// Padding
px-6 md:px-10 xl:px-20
py-16 md:py-24

// Layout
flex-col lg:flex-row
w-full lg:w-1/2
```

---

## 10. Dark Mode

Enable with `dark:` prefix. Maintain same accent colors, adjust backgrounds and text.

```jsx
// Background
className="bg-bg dark:bg-gray-900"

// Text
className="text-fg dark:text-gray-100"

// Cards
className="bg-card dark:bg-gray-800"

// Borders
className="border-gray-200 dark:border-gray-700"
```

---

## 11. Accessibility

- **Focus states**: Always visible with ring
- **Color contrast**: Minimum 4.5:1 for text
- **Interactive elements**: Minimum 44x44px touch target
- **Semantic HTML**: Proper heading hierarchy

```jsx
// Focus visible
className="focus:outline-none focus:ring-4 focus:ring-accent/20"

// Skip to content (add to layout)
<a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>
```

---

## 12. Brand Voice in Design

### Tone
- **Warm but professional**: Cream backgrounds, serif headings
- **Trustworthy**: Navy blue primary color
- **Premium**: Gold accents, generous whitespace
- **Approachable**: Rounded corners, soft shadows

### Photography Style
- Natural lighting
- Warm tones
- Authentic moments
- Minimal editing

### Iconography
- Simple line icons
- Consistent stroke width
- Match accent colors when appropriate

---

## Quick Reference

### Most Used Classes

```jsx
// Backgrounds
bg-card        // Cream sections
bg-white       // Pure white
bg-accent      // Navy buttons
bg-accent-2    // Gold accents

// Text
text-fg        // Primary text
text-muted     // Secondary text
text-accent    // Navy links
text-accent-2  // Gold highlights

// Typography
font-serif     // Headings
font-sans      // Body (default)

// Layout
max-w-6xl mx-auto px-6 md:px-10 xl:px-20  // Container
py-16 md:py-24                             // Section padding
gap-8 md:gap-12                            // Grid gaps

// Interactive
rounded-full   // Buttons
rounded-2xl    // Cards/images
shadow-soft    // Default shadow
hover:shadow-lg // Hover shadow
transition-all duration-300 // Smooth transitions
```
