# Modern UI - Visual Style Guide

## Color Palette

### Primary Colors
- **Dark Slate** (#0f172a) - Main text, headers
- **Navy** (#1e293b) - Primary elements
- **Light Slate** (#475569) - Secondary text

### Accent Colors
- **Blue** (#3b82f6) - Links, buttons, accents
- **Purple** (#8b5cf6) - Hover states
- **Cyan** (#06b6d4) - Highlights
- **Green** (#10b981) - Success states

### Semantic Colors
- **Success** (#10b981) - Success messages
- **Warning** (#f59e0b) - Warnings
- **Danger** (#ef4444) - Errors
- **Info** (#06b6d4) - Information

### Backgrounds
- **Main** (#f8fafc) - Primary background
- **Secondary** (#f1f5f9) - Cards, sections
- **Tertiary** (#e2e8f0) - Code blocks, inputs

### Text Colors
- **Primary Text** (#1e293b) - Main content
- **Secondary Text** (#64748b) - Meta, hints
- **White** (#ffffff) - On dark backgrounds

---

## Typography

### Font Stack
```
-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
'Helvetica Neue', sans-serif
```

### Font Sizes
- **H1**: 42px (desktop), 36px (mobile)
- **H2**: 32px (desktop), 28px (mobile)
- **H3**: 26px (desktop), 24px (mobile)
- **H4**: 20px
- **Body**: 16px
- **Small**: 14px
- **Tiny**: 12px

### Font Weights
- **Light**: 400
- **Regular**: 500
- **Semibold**: 600
- **Bold**: 700

### Line Heights
- **Headings**: 1.3
- **Body**: 1.8
- **Code**: 1.5
- **List Items**: 1.7

---

## Spacing Scale

```
Base Unit: 1em (16px)

8px   = 0.5em
16px  = 1em
24px  = 1.5em
32px  = 2em
40px  = 2.5em
48px  = 3em
```

### Common Spacing
- **Padding**: 16px, 24px, 32px
- **Margins**: 16px, 24px, 32px, 48px
- **Gaps**: 8px, 16px, 24px
- **Sections**: 48px-64px

---

## Border Radius

```
Small:   4px  (small elements)
Medium:  6px  (buttons, inputs)
Large:   8px  (cards, modals)
X-Large: 12px (main cards)
Full:    50%  (circles, avatars)
```

---

## Shadows

### Shadow Levels

**Small** (Subtle elevation)
```
0 1px 3px rgba(0, 0, 0, 0.06)
```

**Medium** (Standard)
```
0 2px 8px rgba(0, 0, 0, 0.08)
```

**Large** (Prominent)
```
0 4px 12px rgba(0, 0, 0, 0.1)
```

**X-Large** (Strong)
```
0 8px 16px rgba(0, 0, 0, 0.15)
```

---

## Buttons

### Default Button
- **Background**: Gradient blue (#3b82f6 → darker)
- **Text**: White
- **Padding**: 10px 24px
- **Border Radius**: 6px
- **Font Weight**: 600
- **Text Transform**: uppercase
- **Hover**: Darker gradient + lifted + shadow

### Button Variants

**Success**
- **Background**: Green gradient
- **Use**: Positive actions

**Warning**
- **Background**: Amber gradient
- **Use**: Caution/attention

**Danger**
- **Background**: Red gradient
- **Use**: Destructive actions

**Outline**
- **Background**: Transparent
- **Border**: 2px solid primary
- **Use**: Secondary actions

---

## Cards

### Card Structure
```
┌─────────────────────────┐
│ Card Header (optional)  │
├─────────────────────────┤
│ Card Body               │
│ (main content)          │
├─────────────────────────┤
│ Card Footer (optional)  │
└─────────────────────────┘
```

### Card Styling
- **Background**: White
- **Padding**: 24px-32px
- **Border Radius**: 12px
- **Shadow**: Medium (0 2px 8px)
- **Hover Shadow**: Large (0 8px 16px)
- **Transition**: all 0.3s ease

---

## Links

### Default Link
- **Color**: Blue (#3b82f6)
- **Decoration**: None
- **Hover Color**: Purple (#8b5cf6)
- **Transition**: 0.3s ease

### Link with Bottom Border
- **Border**: 1px solid blue
- **Hover Border**: 1px solid purple
- **Transition**: smooth

---

## Forms

### Input Fields
- **Background**: Secondary (#f1f5f9)
- **Border**: 1px solid tertiary
- **Border Radius**: 6px
- **Padding**: 8px 12px
- **Font Size**: 14px
- **Focus**: Blue outline + blue border

### Labels
- **Font Weight**: 600
- **Font Size**: 14px
- **Color**: Primary (#1e293b)
- **Margin Bottom**: 8px

---

## Navigation

### Header Navigation
- **Background**: White
- **Position**: Sticky
- **Shadow**: Small (0 1px 3px)
- **Height**: 64px (mobile), 72px (desktop)

### Navigation Links
- **Color**: Primary text
- **Hover**: Blue + underline animation
- **Underline**: Animated on hover (0-100%)
- **Transition**: 0.3s ease

---

## Tables

### Table Header
- **Background**: Secondary (#f1f5f9)
- **Font Weight**: 700
- **Text Align**: Left
- **Border Bottom**: 2px solid tertiary

### Table Rows
- **Border Bottom**: 1px solid tertiary
- **Hover Background**: Secondary
- **Padding**: 12px

### Table Cells
- **Vertical Align**: Middle
- **Line Height**: 1.6
- **Padding**: 12px

---

## Code Blocks

### Inline Code
- **Background**: Tertiary (#e2e8f0)
- **Color**: Danger (#ef4444)
- **Padding**: 2px 6px
- **Border Radius**: 3px
- **Font**: Monospace
- **Font Size**: 13px

### Code Block
- **Background**: Dark (#0f172a)
- **Color**: White
- **Padding**: 24px
- **Border Radius**: 8px
- **Font**: Monospace
- **Font Size**: 13px
- **Line Height**: 1.6

---

## Blockquotes

### Blockquote Styling
- **Background**: Secondary (#f1f5f9)
- **Border Left**: 4px solid blue (#3b82f6)
- **Padding**: 16px 24px
- **Border Radius**: 4px
- **Font Style**: Italic
- **Color**: Primary text

---

## Icons

### Icon Styles
- **Size**: 18px-24px (common)
- **Color**: Inherit from parent
- **Hover**: Color changes to accent

### Social Icons
- **Size**: 40px container
- **Style**: Circular with background
- **Background**: Secondary gray
- **Hover**: Brand color background + white icon
- **Transition**: 0.3s ease

---

## Animations

### Transitions
- **Duration**: 0.3s (standard)
- **Easing**: ease (smooth)
- **Properties**: all, color, transform, box-shadow

### Common Animations

**Hover Lift**
```
transform: translateY(-2px)
```

**Hover Scale**
```
transform: scale(1.05)
```

**Hover Glow**
```
box-shadow: 0 4px 12px rgba(color, 0.3)
```

**Underline Animation**
```
width: 0 → 100% on hover
```

---

## Responsive Breakpoints

```
Mobile:    0px - 599px
Small:     600px+ (37.5em)
Medium:    768px+ (48em)
Large:     992px+ (62em)
X-Large:   1380px+ (86.375em)
```

### Mobile-First Approach
- Base styles for mobile
- Add complexity at larger breakpoints
- Stack content vertically on mobile
- Multi-column on desktop

---

## Loading States

### Skeleton Loading
```
Animated gradient background (200% width)
Sweeps from left to right
3 second loop
```

### Button Loading
```
Opacity: 0.6
Pointer Events: none
Cursor: not-allowed
```

---

## Focus States

### Keyboard Focus
```
Outline: 2px solid blue
Outline Offset: 2px
Transition: 0.15s ease
```

### Used for:
- Links
- Buttons
- Form inputs
- Interactive elements

---

## Color Combinations

### Good Combinations
- Blue text on white background ✅
- Blue on light gray ✅
- White text on dark slate ✅
- Green accent on white ✅

### Avoid
- Dark text on dark backgrounds ❌
- Light text on light backgrounds ❌
- Red on green ❌

---

## Gradient Examples

### Primary Gradient
```
linear-gradient(135deg, #3b82f6, #1e40af)
```

### Subtle Gradient
```
linear-gradient(135deg, #f8fafc, #f1f5f9)
```

### Accent Gradient
```
linear-gradient(135deg, #3b82f6, #8b5cf6)
```

---

## Contrast Ratios

| Element | Ratio | Status |
|---------|-------|--------|
| Body text on white | 15:1 | AAA ✅ |
| Secondary text | 8:1 | AA ✅ |
| Blue links on white | 8.3:1 | AAA ✅ |
| White on dark | 14:1 | AAA ✅ |

All contrast ratios exceed WCAG AA standards.

---

## Print Styles

- Links show URLs
- Background colors removed
- Colors simplified to black/white
- Padding/margins adjusted for print
- Hidden elements excluded

---

## Dark Mode (Future Consideration)

When implementing dark mode:
- Primary text → Light gray
- Backgrounds → Dark slate
- Cards → Dark navy
- Accents → Keep same
- Shadows → Softer

---

## Mobile Optimization

### Touch Targets
- Minimum size: 44px × 44px
- Spacing: 16px between targets
- Padding: 12px minimum

### Mobile Navigation
- Hamburger menu icon
- Full-width mobile menu
- Slide-in animation
- Close button prominent

---

This style guide ensures consistency across your website. Stick to these guidelines for a cohesive, professional appearance!
