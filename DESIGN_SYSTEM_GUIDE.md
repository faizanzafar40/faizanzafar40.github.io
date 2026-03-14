# Modern UI Design System - Quick Reference Guide

## Getting Started

Your website has been upgraded with a complete modern design system. This guide helps you use and customize it.

---

## Color System

### Primary Colors
```
$primary-dark:   #0f172a - Dark blue (main text)
$primary:        #1e293b - Navy (headers)
```

### Accent Colors
```
$accent-blue:    #3b82f6 - Links, buttons
$accent-purple:  #8b5cf6 - Hover states
$accent-cyan:    #06b6d4 - Footer links
$accent-green:   #10b981 - Success states
```

### Semantic Colors
```
$success:        #10b981 - Success messages
$warning:        #f59e0b - Warning alerts
$danger:         #ef4444 - Errors
$info:           #06b6d4 - Info messages
```

### Backgrounds
```
$bodycolor:      #f8fafc - Main background
$bg-secondary:   #f1f5f9 - Secondary bg
$bg-tertiary:    #e2e8f0 - Code blocks
```

---

## Typography Classes

### Text Alignment
```html
<p class="text-center">Centered text</p>
<p class="text-left">Left aligned</p>
<p class="text-right">Right aligned</p>
```

### Text Colors
```html
<p class="text-muted">Muted text</p>
<p class="text-primary">Primary color</p>
<p class="text-accent">Accent blue</p>
<p class="text-success">Success</p>
<p class="text-warning">Warning</p>
<p class="text-danger">Danger</p>
```

### Text Styles
```html
<p class="font-weight-bold">Bold</p>
<p class="font-weight-normal">Normal</p>
<p class="font-weight-light">Light</p>
<p class="font-italic">Italic</p>
<p class="text-uppercase">Uppercase</p>
```

---

## Spacing Classes

### Margins
```html
<div class="m-1">0.5em margin all around</div>
<div class="m-2">1em margin all around</div>
<div class="m-3">1.5em margin all around</div>
<div class="m-4">2em margin all around</div>

<div class="mt-2">1em margin top</div>
<div class="mb-3">1.5em margin bottom</div>
```

### Padding
```html
<div class="p-2">1em padding all around</div>
<div class="pt-3">1.5em padding top</div>
<div class="pb-2">1em padding bottom</div>
```

### Gaps (Flexbox)
```html
<div class="d-flex gap-2">Items with 1em gap</div>
<div class="d-flex gap-4">Items with 2em gap</div>
```

---

## Layout Classes

### Display
```html
<div class="d-block">Block element</div>
<div class="d-inline-block">Inline block</div>
<div class="d-flex">Flexbox container</div>
<div class="d-grid">Grid container</div>
```

### Flexbox
```html
<div class="d-flex justify-center">Centered flex</div>
<div class="d-flex justify-between">Space between</div>
<div class="d-flex flex-column">Column layout</div>
<div class="d-flex flex-wrap">Wrap items</div>
<div class="d-flex align-center gap-2">Centered with gap</div>
```

---

## Card Components

### Basic Card
```html
<div class="card">
  <p>Your content here</p>
</div>
```

### Card with Header & Footer
```html
<div class="card">
  <div class="card-header">
    <h3>Card Title</h3>
  </div>
  <div class="card-body">
    <p>Card content</p>
  </div>
  <div class="card-footer">
    <p>Footer content</p>
  </div>
</div>
```

---

## Button Classes

### Default Button
```html
<button class="btn">Click me</button>
```

### Button Variants
```html
<button class="btn btn-success">Success</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-info">Info</button>
<button class="btn btn-outline">Outline</button>
```

---

## Shadow Classes

### Shadow Levels
```html
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Medium shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-xl">Extra large shadow</div>
```

---

## Background & Border Classes

### Backgrounds
```html
<div class="bg-white">White background</div>
<div class="bg-light">Light gray</div>
<div class="bg-primary">Primary color</div>
<div class="bg-accent">Accent blue</div>
```

### Borders
```html
<div class="border-1">All borders</div>
<div class="border-top">Top border only</div>
<div class="border-bottom">Bottom border only</div>
<div class="border-left">Left accent border</div>
```

### Border Radius
```html
<div class="rounded">6px radius</div>
<div class="rounded-lg">12px radius</div>
<div class="rounded-full">50% radius (circle)</div>
```

---

## Gradients

### Gradient Classes
```html
<div class="gradient-primary">Primary gradient</div>
<div class="gradient-accent">Accent gradient</div>
<div class="gradient-subtle">Subtle gradient</div>
```

---

## Lists

### Unstyled List
```html
<ul class="list-unstyled">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

### Inline List
```html
<ul class="list-inline">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

### List Group
```html
<ul class="list-group">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

---

## Tables

### Striped Table
```html
<table class="table-striped">
  <!-- table content -->
</table>
```

### Hoverable Table
```html
<table class="table-hover">
  <!-- table content -->
</table>
```

---

## Utilities

### Transition
```html
<div class="transition-all">Smooth all transitions</div>
<div class="transition-colors">Color transitions</div>
<div class="transition-transform">Transform transitions</div>
```

### Transform
```html
<div class="scale-hover">Scales on hover</div>
<div class="lift-hover">Lifts on hover</div>
<div class="rotate-hover">Rotates on hover</div>
```

### Opacity
```html
<div class="opacity-50">50% opacity</div>
<div class="opacity-75">75% opacity</div>
<div class="opacity-100">100% opacity</div>
```

---

## Responsive Classes

### Hide/Show
```html
<div class="hide-small">Hidden on small screens</div>
<div class="show-small">Shown only on small screens</div>
<div class="hide-large">Hidden on large screens</div>
<div class="show-large">Shown only on large screens</div>
```

---

## Example: Modern Article Card

```html
<article class="card">
  <div class="card-header">
    <h2>Article Title</h2>
    <p class="text-muted">Published on March 15, 2026</p>
  </div>
  
  <div class="card-body">
    <p>Your article content here...</p>
    
    <div class="d-flex gap-2 mt-3">
      <button class="btn">Read More</button>
      <button class="btn btn-outline">Share</button>
    </div>
  </div>
</article>
```

---

## Example: Feature Section

```html
<section class="d-flex flex-column gap-3 p-4 rounded-lg bg-light">
  <h2 class="text-primary">Section Title</h2>
  
  <div class="d-flex gap-2 flex-wrap">
    <button class="btn btn-success">Action 1</button>
    <button class="btn btn-accent">Action 2</button>
  </div>
</section>
```

---

## Color Variables in SCSS

Use these variables in your custom SCSS:

```scss
// Primary colors
$primary-dark, $primary

// Accent colors
$accent-blue, $accent-purple, $accent-cyan, $accent-green

// Semantic colors
$success, $warning, $danger, $info

// Text colors
$text-color, $text-light

// Backgrounds
$bodycolor, $bg-secondary, $bg-tertiary

// Borders
$border-color

// Social media colors
$facebook-color, $github-color, $linkedin-color, etc.
```

---

## Breakpoints

```scss
$micro:    "only screen and (min-width: 30em)"      // 480px
$small:    "only screen and (min-width: 37.5em)"    // 600px
$medium:   "only screen and (min-width: 48em)"      // 768px
$large:    "only screen and (min-width: 62em)"      // 992px
$x-large:  "only screen and (min-width: 86.375em)"  // 1380px
```

---

## Tips & Best Practices

1. **Use semantic classes**: Use `.text-danger` instead of `.text-red`
2. **Combine utilities**: `<div class="d-flex gap-2 align-center">` for layout
3. **Maintain hierarchy**: Use proper heading levels (h1, h2, h3, etc.)
4. **Accessibility**: Always include alt text for images
5. **Performance**: Minimize custom CSS; use utility classes
6. **Consistency**: Follow the spacing scale (0.5em, 1em, 1.5em, 2em)
7. **Colors**: Use design system colors, not custom ones

---

## Need Help?

- Check `MODERN_UI_CHANGES.md` for detailed changes
- Review `_sass/variables.scss` for all color definitions
- Check utility classes in `_sass/utilities.scss`
- Test responsiveness at all breakpoints

Happy designing! 🎨
