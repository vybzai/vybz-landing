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

## When to read this doc

Only if you are:
- Adding a new mockup tabbed “screen” feature, or
- Debugging “button highlights but screenshot doesn’t switch/cycle” in the phone mockup.

If you’re working on legal routing, polaroid cards, or other sections, you don’t need this.

