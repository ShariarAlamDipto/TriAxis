# TRI AXIS - Theme System Documentation

## Overview
The application now supports **Dark Mode** (default) and **Light Mode** with a toggle button in the navbar.

## Color System

### Dark Mode
- **Background**: Pure Black (#000000)
- **Primary Text**: White (#FFFFFF)
- **Secondary Text**: Off-White (#E5E5E5)
- **Muted Text**: Gray (#6B7280)
- **Borders**: rgba(255, 255, 255, 0.2)
- **Panel Background**: rgba(12, 45, 58, 0.5) - Navy translucent
- **Hover Background**: #1A1A1A

### Light Mode
- **Background**: White (#FFFFFF)
- **Primary Text**: Black (#000000)
- **Secondary Text**: Dark Gray (#1A1A1A)
- **Muted Text**: Gray (#6B7280)
- **Borders**: rgba(0, 0, 0, 0.2)
- **Panel Background**: rgba(232, 243, 247, 0.8) - Light Navy translucent
- **Hover Background**: #F3F4F6

### Brand Accent Colors (Both Modes)
- **Orange** (#E4602A) - Primary accent for hover, CTA, interaction feedback ★★★★★
- **Teal** (#63A5C8 dark / #2E7D99 light) - Soft UI highlights, codes, metadata ★★★☆☆
- **Navy** (#0C2D3A dark / #E8F3F7 light) - Secondary background panels ★★★★☆
- **Gold** (#F0B23E dark / #C48D1A light) - Special actions, prices ★★☆☆☆

## CSS Variables
All colors are defined as CSS custom properties:

```css
/* Use these variables in your code */
--background        /* Page background */
--text-primary      /* Main headings, important text */
--text-secondary    /* Body text */
--text-muted        /* Less important text */
--border            /* Border colors */
--panel-bg          /* Card/panel backgrounds */
--hover-bg          /* Hover states */

/* Brand colors */
--brand-orange
--brand-teal
--brand-navy
--brand-gold
```

## Utility Classes
Use these Tailwind utility classes for theme-aware styling:

```css
.bg-theme            /* Background color */
.text-theme-primary  /* Primary text */
.text-theme-secondary /* Secondary text */
.text-theme-muted    /* Muted text */
.border-theme        /* Border color */
.bg-panel            /* Panel background */
.text-brand-orange   /* Orange accent text */
.text-brand-gold     /* Gold accent text */
.text-brand-teal     /* Teal accent text */
.border-brand-orange /* Orange border */
```

## Theme Toggle
- Located in the Navbar (top right)
- Sun icon = Currently Dark Mode, click to switch to Light
- Moon icon = Currently Light Mode, click to switch to Dark
- Theme preference saved in localStorage
- Persists across page reloads

## Usage Examples

### In React Components
```tsx
// Use utility classes
<div className="bg-theme text-theme-primary">
  <h1 className="text-brand-orange">Title</h1>
  <p className="text-theme-muted">Description</p>
</div>

// Or use CSS variables directly
<div style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
  Content
</div>
```

### In CSS Files
```css
.my-component {
  background: var(--background);
  color: var(--text-primary);
  border: 1px solid var(--border);
}

.my-component:hover {
  background: var(--hover-bg);
  border-color: var(--brand-orange);
}
```

## Component Updates

### ✅ Updated Components
- [x] globals.css - Theme variables and utility classes
- [x] ThemeContext.tsx - Theme state management
- [x] Navbar.tsx - Theme toggle button, theme-aware colors
- [x] layout.tsx - ThemeProvider wrapper
- [x] page.tsx (Homepage) - Theme-aware colors

### 🔄 Components to Update (use utility classes)
- [ ] ProductCard.tsx
- [ ] Cart page
- [ ] Checkout page
- [ ] Subject list pages
- [ ] Papers pages
- [ ] Booklets pages

## Design Consistency

### Orange Usage (Primary - ★★★★★)
- Nav item hover underlines
- Card border on hover
- Button hover backgrounds
- Cart badge
- Section dividers
- Primary CTA buttons

### Teal Usage (Soft UI - ★★★☆☆)
- Subject codes
- Metadata tags
- Form input focus
- "In Cart" indicators
- Small UI highlights

### Navy Usage (Depth - ★★★★☆)
- Order summary panels (cart/checkout)
- Background cards
- Alternative sections

### Gold Usage (Special - ★★☆☆☆)
- Price displays
- Checkout button
- "Place Order" CTA
- Promotional tags

## Testing Checklist
- [ ] Toggle theme button works
- [ ] Theme persists on page reload
- [ ] All text is readable in both modes
- [ ] Hover states work correctly
- [ ] Form inputs are visible
- [ ] Cart badge is visible
- [ ] Product cards display correctly
- [ ] Checkout flow works in both modes
