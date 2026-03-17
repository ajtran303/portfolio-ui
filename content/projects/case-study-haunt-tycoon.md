---
title: "Case Study: Haunted House Tycoon"
order: 7
---

### Case Study: Haunted House Tycoon

[View the code on GitHub](https://github.com/ajtran303/haunted-house-tycoon/frontend)

#### Overview

Haunted House Tycoon is a browser-based simulation game where players design and manage a haunted attraction business. Players construct themed rooms (hallways, scare rooms, and exits) to guide visitors through their haunted house while balancing finances and visitor emotions. The game features a central midway hub connecting multiple attractions via portals, creating an expandable park experience.

The project combines real-time simulation with strategic resource management. Visitors navigate the attractions autonomously, responding emotionally to different room types. Players must carefully balance scaring visitors enough to create excitement without pushing them into panic or misery, which causes them to flee the park. Financial sustainability requires managing construction costs, ongoing upkeep, and visitor spending patterns. The game includes adjustable speed controls for pacing gameplay and clear win/fail conditions: players lose if they go bankrupt, and win by reaching the end of the season (October 31).

#### Technical Challenges & Solutions

##### Separating Game Logic from Framework Dependencies

The most significant challenge was ensuring the core game simulation remained testable and deterministic. Early prototypes tightly coupled game logic with React state and Phaser rendering, making unit testing nearly impossible and introducing subtle bugs when the same logic executed differently across environments.

The solution involved extracting all game rules into a pure TypeScript layer with zero framework dependencies. This core layer handles visitor pathfinding, emotion calculations, room effects, and spending logic using only plain functions and data structures. The framework-specific code became thin adapters that simply read from and write to this core layer. This separation enabled comprehensive test coverage of game mechanics and made determinism verification straightforward through seeded random number generation.

##### Synchronizing React UI with Phaser Rendering

React and Phaser have fundamentally different approaches to state and rendering. React uses declarative component updates while Phaser relies on an imperative game loop. Naively bridging these systems caused performance issues and visual inconsistencies, with the UI and game canvas occasionally showing different states.

The solution centered on Zustand as a shared state layer accessible to both systems. React components subscribe to relevant state slices and re-render naturally. The Phaser scene subscribes to the same store but only redraws when specific state properties change. This selective subscription pattern prevents unnecessary rendering work while keeping both systems synchronized through a single source of truth.

##### Providing Meaningful Player Feedback

Players struggled to understand why their attractions were failing. Visitors would leave unhappy or the park would go bankrupt without clear indication of what went wrong. The simulation's complexity made cause and effect relationships opaque.

The solution introduced an event tracking system that logs significant occurrences with timestamps. Exit events record when and why visitors left: whether from completed visits, panic, or misery. Rather than maintaining aggregate statistics that update in place, the system records discrete events and derives statistics on demand. A warning system analyzes these events using sliding time windows to detect concerning patterns like fear spikes or unusual death rates. This approach enables time-windowed analysis while providing debugging capability since the event log shows exactly what happened and when. Warnings surface actionable information to players, transforming raw simulation data into understandable feedback about their park's performance.

##### Managing Visitor Simulation at Scale

Each visitor maintains individual state including position, previous position for animation, emotional levels, and navigation intent. With dozens of visitors moving simultaneously, the naive approach of updating and re-rendering everything each tick created performance bottlenecks.

The solution involved structuring the tick pipeline as a series of focused transformation passes. Each pass handles one concern (movement, room effects, emotion decay, exit conditions) operating on the visitor collection efficiently. Visitors track their previous position explicitly, allowing the renderer to interpolate animations without recalculating paths. The pipeline processes all visitors in batch rather than handling each visitor's full lifecycle individually, improving cache locality and reducing redundant calculations.

#### Architecture Decisions

##### Single Store with Computed Selectors

All mutable game state lives in a single Zustand store rather than being distributed across components or multiple stores. Derived values like visitor statistics and death counts are computed through selector functions rather than stored directly. This centralization makes state changes predictable and debuggable, with any modification flowing through defined store actions.

##### Accessibility as a First-Class Constraint

Color choices follow the Wong palette, a colorblind-friendly color scheme incorporated from initial design. Accessibility constraints shaped design in unexpected ways: the need for distinguishable colors limited the palette, which simplified the visual design by forcing consistency. The mood legend exists partly because color alone shouldn't be the only way to understand visitor states. Keyboard navigation is on the roadmap. Screen reader support is out of scope given Phaser's canvas-based rendering, though other accessibility features remain under consideration.

#### Lessons Learned

##### Test Determinism Needs Explicit Seeding

The core simulation is deterministic through seeded RNG, verified by a dedicated determinism check script. However, unit tests don't seed the RNG, so visitor movement tests required building constrained grids that blocked alternate paths to force predictable outcomes. This workaround is brittle; the better approach would be seeding the RNG in tests directly.

##### Framework Boundaries Are Worth the Investment

The pure core became the most stable part of the codebase. When React or Phaser APIs changed, only the thin adapter layer needed updates. When bugs appeared, the pure functions could be tested in isolation without mocking framework internals. The initial investment in clean separation paid for itself many times over.

##### Player Understanding Is More Important Than Simulation Accuracy

Several technically correct simulation behaviors confused players. Visitors making optimal pathfinding decisions sometimes looked erratic because humans don't think in terms of graph traversal. The simulation needed modifications not because it was wrong but because players couldn't build mental models of it. A game simulation serves players, not mathematical elegance.

##### State Management Complexity Grows Non-Linearly

The Zustand store started simple and grew complex as features accumulated. Adding the portal system required tracking which attraction the player was viewing, which portal they were placing, and visitor positions across multiple grids. Event tracking added exit events, park exit events, and warning dismissal state. Speed controls introduced pause state and tick timing. Each feature seemed minor but their interactions multiplied: pausing while a visitor crosses a portal mid-animation, dismissing a warning triggered by events in an attraction you're not viewing. Earlier investment in state organization patterns would have helped, even when the initial scope seemed manageable.
