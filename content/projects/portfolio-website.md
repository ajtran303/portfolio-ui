---
title: "Portfolio Website"
order: 4
images:
  - "/images/portfolio-website/hero_page.png"
  - "/images/portfolio-website/about_page.png"
  - "/images/portfolio-website/project_page.png"
---

## Portfolio Website

### Summary

A developer portfolio showcasing my projects and skills. Originally built as a TypeScript/React SPA with a separate Python API, later consolidated into a single Next.js static site for improved performance and maintainability.

[View the code on GitHub](https://github.com/ajtran303/portfolio-ui)

---

### Highlights

- **Animated Hero:** Smooth transitions with call-to-action navigation
- **Interactive About Section:** Vanta.NET animated background with translucent glass card overlay and gradient fallback for WebGL errors
- **Projects Carousel:** Navigate between projects with auto-scroll to section top, inner image carousel for screenshots, responsive controls
- **Markdown Content Management:** Project data stored as Markdown files with frontmatter
- **Fully Accessible:** Content renders without JavaScript (post-migration)
- **React Patterns:** useState, useRef, useEffect, useMemo, useLayoutEffect for state management, DOM manipulation, HTML parsing, and flicker-free rendering
- **Type-safe & Tested:** Full TypeScript coverage with Vitest and React Testing Library

---

### Tech Stack

**Current:** Next.js, TypeScript, React, gray-matter, remark

**Original:** React 19, TypeScript, Vite, Python, FastAPI, GraphQL, Vitest + React Testing Library

---

### Migration to Next.js from React

The original architecture used a React SPA that fetched HTML from a Python/FastAPI/GraphQL API at runtime. The API processed Markdown files and served project images. This worked, but meant running two services for a site with static content.

I migrated to Next.js with static export, moving Markdown processing to build time and images into the repository. The result: one deployment instead of two, content that renders without JavaScript, and no ongoing server costs.

Read the full case study for more details.

---

### Live Demo

[AJ Tran Portfolio](https://ajtran-dev.onrender.com)
