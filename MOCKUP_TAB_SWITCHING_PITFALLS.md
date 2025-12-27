# Mockup Tab Switching Pitfalls (See who’s nearby)

This repo has an interactive phone mockup in the **“See who’s nearby”** section with tabs:
**Home View / Map View / Chat View / Profile View**.

If the tab highlight changes but the screenshot does **not**, or **Map View** doesn’t show/cycle the map screenshots, read this before re-implementing.

---

## The Bug Pattern

### Symptom
- Clicking **Map View** highlights the button, but the phone screenshot stays on **Home View**.

### Root causes (what went wrong)
1. **Contradictory initial state in HTML**
   - A Map screenshot was marked `.active` **and** had `style="display: none;"`.
   - That creates a “logically active but hard-hidden” element.

2. **Mixed visibility systems**
   - CSS was fading screenshots via `.active` (opacity/z-index),
   - while JS also tried to force visibility via `element.style.display`.
   - Mixing these often produces “looks active but doesn’t show” behavior and makes debugging misleading.

3. **Unscoped / conflicting event handlers**
   - A global `button[data-screen]` listener can collide with other handlers or future UI that also uses `data-screen`.
   - In this incident, debugging showed “button state updates happen, but the `.screen-image` loop doesn’t run”, which strongly indicates handler interference.

---

## The Fix Pattern (recommended)

### HTML (initial state must be consistent)
- Do **not** put inline `style="display: none;"` on mockup screenshots.
- Only one screenshot should start as `.active` (Home).
- Add scope anchors so JS can target only this mockup:
  - `data-mockup-tabs` on the tab button container
  - `data-mockup-phone` on the phone mockup container

### CSS (drive visibility from `.active`)
- Treat screenshots as stacked layers:
  - default: `opacity: 0; z-index: 0`
  - `.active`: `opacity: 1; z-index: 1`
- Give the phone container a stable size even though screenshots are absolutely positioned:
  - `.phone-mockup { aspect-ratio: 9 / 19.5; }`

### JS (scope + idempotent init + robust click handling)
- Scope queries to the mockup root nodes (avoid global selectors).
- Make initialization idempotent (avoid double-init if scripts load twice).
- Use a **capture-phase** delegated click listener **inside the scoped root** and call:
  - `stopImmediatePropagation()` to prevent other broken/legacy handlers from interfering.
- For Map View:
  - Clear any existing interval when leaving Map View.
  - Show the first map screenshot immediately, then cycle if there are multiple.

Implementation reference:
- `scripts/interactions.js` (`initMockupTabs` IIFE)
- `index.html` (adds `data-mockup-tabs` / `data-mockup-phone`, removes inline display styles)
- `styles/main.css` (`.phone-mockup`, `.screen-image`, `.map-image` rules)

---

## Phone Mockup Image Clipping Issue

### Symptom
- Phone mockup image appears clipped/cropped on the left and right sides
- The phone frame edges are cut off, showing only the center of the image

### Root Cause
The source images (e.g., `map_new.png`, `VYBZ_Home_resized.jpg`) are **full phone mockup images** that include the phone bezel/frame as part of the image itself. The issue occurs when:

1. **CSS creates a duplicate phone frame**
   - Container has `border-[8px] border-black rounded-[3rem]` creating a CSS phone frame
   - But the image already has a phone frame built-in → "frame within a frame"

2. **`object-cover` clips the image**
   - Images use `object-cover` which scales to fill the container height
   - This causes horizontal overflow which gets clipped by `overflow-hidden`

3. **Aspect ratio mismatch**
   - Container aspect ratio: `9 / 19.5` = 1:2.167
   - Actual image aspect ratio: ~1339×2716 = 1:2.03
   - The mismatch causes `object-cover` to scale and clip

### The Fix

Since our phone mockup images **include the phone frame/bezel**:

1. **Remove CSS phone frame styling** from the container:
   ```html
   <!-- DON'T: Creates duplicate frame -->
   <div class="... border-[8px] border-black rounded-[3rem] bg-zinc-900 ...">

   <!-- DO: Let the image's built-in frame show -->
   <div class="... shadow-2xl overflow-hidden ...">
   ```

2. **Use `object-contain` instead of `object-cover`**:
   ```html
   <!-- DON'T: Clips sides to fill container -->
   <img class="... object-cover ..." />

   <!-- DO: Shows full image without clipping -->
   <img class="... object-contain ..." />
   ```

3. **Match the CSS aspect ratio to the images** in `styles/main.css`:
   ```css
   .phone-mockup {
     /* Match actual image ratio (~1339×2716) */
     aspect-ratio: 9 / 18.3;
   }
   ```

### When Adding New Phone Screenshots

- **If images include phone frame/bezel**: Use `object-contain`, no CSS border, match aspect ratio
- **If images are screen-only (no bezel)**: Use `object-cover`, add CSS border/rounded corners for frame

Check your source images first! View them directly to see if they include the phone frame or just screen content.

---

## When to read this doc

Only if you are:
- Adding a new mockup tabbed "screen" feature, or
- Debugging "button highlights but screenshot doesn't switch/cycle" in the phone mockup, or
- **Adding new phone mockup screenshots and seeing clipping issues**.

If you're working on legal routing, polaroid cards, or other sections, you don't need this.

