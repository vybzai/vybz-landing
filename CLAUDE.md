# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
