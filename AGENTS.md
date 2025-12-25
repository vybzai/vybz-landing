# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Project Overview

VYBZ landing page - static HTML website for a real-time social app. Deployed to Vercel.

**Production URL:** https://vybz-landing.vercel.app
**Custom Domain:** https://vybzapp.com (when configured)

## Development

No build step required. Open `index.html` directly in a browser.

```bash
# Quick preview
open index.html
```

## Deployment

Push to `main` branch triggers automatic Vercel deployment.

```bash
git push origin main
```

## Architecture

Single-file architecture - everything is in `index.html`:
- **CSS:** Tailwind CDN with custom config (colors, animations)
- **JS:** Inline GSAP animations with ScrollTrigger
- **3D:** Spline embed (iframe) for hero background

## Routing & Navigation (Important)

This site is a lightweight SPA: all “pages” are rendered from `index.html` and shown/hidden with JS.

- **Home:** `#home`
- **Legal pages:** content is injected into `#legal-content` via `pageContent[...]` + `showLegal(title)`

### Adding a new legal page

1. Add the page HTML to `pageContent['Your Title']` in `index.html`
2. Add a slug mapping in `slugToPage` (`'your-slug': 'Your Title'`)
3. Add a rewrite in `vercel.json` so `'/your-slug'` rewrites to `'/'` (direct loads must still serve `index.html`)
4. Add/update a link using this pattern (keeps deployed URLs shareable/SEO-friendly):
   - `href="/your-slug"`
   - `onclick="showLegal('Your Title'); return false;"`

### Local preview (file://)

When opening `index.html` directly (no server), `history.pushState('/your-slug')` would produce URLs like `file:///your-slug`.

- The router uses hash URLs locally instead: open `index.html#your-slug` to deep-link to a legal page.
- Deployed URLs still use path routes (`/your-slug`) thanks to Vercel rewrites.

### Scroll behavior

- Legal-page navigation should always start at the top: `showLegal()` scrolls to the top and `history.scrollRestoration` is set to `manual`.
- `showPage()` scrolls to the top by default; if you need to navigate to home and then scroll to a section, call:
  - `showPage('home', undefined, { scrollToTop: false, onShown: () => {/* scroll */} })`
  - See `scrollToHow()` in `index.html` for the fixed-header offset pattern.

### Key Styling Tokens
```javascript
colors: {
  'main-black': '#050505',
  'main-purple': '#7D6EFC',
  'sunset-orange': '#EFB521',
  'electric-blue': '#2C71F6'
}
```

### Image Paths

Use relative paths (`./images/`) for local development compatibility:
```html
<img src="./images/logos/LogoTypeWithMarkWhite.svg" ...>
```

Absolute paths (`/images/`) only work on deployed Vercel.

## Analytics Setup

Placeholders in `index.html` (commented out):
1. **Google Analytics 4:** Replace `G-XXXXXXXXXX`
2. **Facebook Pixel:** Replace `XXXXXXXXXXXXXXXXX`

## OG Image / Social Sharing

Update these meta tags when changing domains:
```html
<meta property="og:image" content="https://vybz-landing.vercel.app/images/og-image.png">
<meta name="twitter:image" content="https://vybz-landing.vercel.app/images/og-image.png">
```

## File Structure

```
images/
├── cards/      # Polaroid-style activity cards
├── map/        # Riyadh map section assets
├── avatars/    # User pin avatars
├── logos/      # VYBZ brand assets (SVG)
└── og-image.png
```

---

## Known Issues & Fixes

### Border-Radius Flash on Hover (Polaroid Cards)

**Problem:** When using nested CSS transforms (e.g., parent card has `rotate` transform, child image has `scale` transform on hover), the border-radius can flash/glitch momentarily during the animation.

**Solution:** Add these three classes to the image container `<div>`:

```html
<div class="... transform-gpu isolate [-webkit-mask-image:-webkit-radial-gradient(white,black)]">
  <img src="..." class="... group-hover:scale-105">
</div>
```

**What each class does:**
- `transform-gpu` - Forces hardware acceleration to prevent momentary loss of border-radius during scale animation
- `isolate` - Creates a proper stacking context so the parent's rotation transform doesn't interfere with the child's scale transform
- `[-webkit-mask-image:-webkit-radial-gradient(white,black)]` - Forces WebKit browsers (Safari/Chrome) to properly clip the border-radius during nested transform animations

**When to use:** Any time you have a rounded image container with hover scale effects inside a parent that also has transforms (rotation, scale, etc.).
