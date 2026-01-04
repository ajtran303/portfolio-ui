---
title: "Haunted House Tycoon"
order: 4
images:
  - url: "/images/haunt-tycoon/gameplay.gif"
    alt: "Gameplay showing visitors navigating a haunted house attraction"
---

## Haunted House Tycoon

### Summary

A deterministic park management game where players balance fear and profit. Build haunted attractions that scare visitors for money, but push too hard and they panic, leave, or die. Pure function architecture keeps core logic testable without rendering. Same inputs always produce same outputs.

[View the code on GitHub](https://github.com/ajtran303/haunted-house-tycoon/frontend)

---

### Highlights

- **Deterministic Simulation:** No hidden randomness. Seeded RNG where variation is needed. Reproducible runs, reliable tests.
- **Three-Layer Architecture:** Core (pure functions), Runtime (Zustand store), UI (React + Phaser). Core has zero framework dependencies.
- **Two-Grid System:** Midway hub with attraction sub-grids connected via portals. Different rules per zone: fear recovers on midway, not in attractions.
- **Visitor Emotions:** Fear and happiness drive spending. High fear = high spending = risk of panic death.
- **Blocking States:** Visitors enter spatial states (queued, trapped) creating visible congestion and cascading failures.
- **Dev Mode:** Cheat panel, console commands (`__gameState()`, `__tick()`), debug toggles, 10x speed.

---

### Tech Stack

- React 19 + TypeScript (strict)
- Phaser 3 for game rendering
- Zustand for state management
- Jest + React Testing Library
- Tailwind CSS 4
- Vite

---

### Status

Alpha complete, Beta in progress. Core loop complete with two-grid system, visitor emotions, spending, amenities, warnings, and death tracking. Staff system, room demolition, and save/load coming next.
