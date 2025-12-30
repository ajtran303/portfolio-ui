---
title: "Case Study: Simplifying My Portfolio Architecture"
order: 5
---

## Case Study: Simplifying My Portfolio Architecture

### The Problem

My portfolio site was running on two separate services: a React SPA for the frontend and a Python API server that processed Markdown files and served images. When JavaScript was disabled, visitors saw nothing but a page title.

The API converted Markdown to HTML, which the client fetched, parsed to extract images, and restructured into a project carousel with nested image galleries. It worked, but the architecture was more complex than it needed to be.

### The Insight

I realized I was paying to run a server whose main job was transforming content at runtime—content that rarely changed. My portfolio has about four projects with a few screenshots each. That's not dynamic data. That's static content pretending to be dynamic.

### The Solution

I migrated to Next.js with static export, consolidating everything into a single repository and deployment.

**Before:**

- TypeScript/React SPA (Render Static Site)
- Separate Python API server with GraphQL/FastAPI (Render Web Service)
- Runtime Markdown processing
- Client-side HTML parsing
- No content without JavaScript

**After:**

- Next.js static site (Render Static Site)
- Markdown processed at build time
- Images served from `/public`
- Full content in initial HTML

### Implementation

The migration involved three main changes:

**Content Pipeline:** I moved my Markdown files into a `/content` directory and used `gray-matter` to parse frontmatter and `remark` to convert content to HTML. This runs once during `npm run build`, not on every page load.

```markdown
---
title: Project Name
images:
  - /images/project1/screenshot1.png
  - /images/project1/screenshot2.png
---

Project description goes here...
```

**Image Handling:** Rather than serving images from an API, I dropped them directly into `/public/images`. For a portfolio with 12-15 screenshots, there's no need for a dedicated image server. I optimized them once locally before committing.

**Carousel Refactor:** The project carousel became a client component that receives pre-structured data instead of fetching and parsing HTML. The image URLs come from frontmatter, so there's no DOM parsing required.

### Results

**Reduced complexity:** One repo, one deployment, no API to maintain.

**Better accessibility:** Content renders in the initial HTML. Visitors with JavaScript disabled see my projects, not a blank page.

**Lower cost:** Static hosting is free tier–eligible. I stopped paying for a Python server that was doing work better suited for build time.

**Faster loads:** No runtime API calls. The HTML arrives complete.

### Lessons Learned

**Match architecture to content.** A portfolio with a handful of projects that change infrequently doesn't need a runtime API. Static generation fits the problem better.

**Server components aren't always server-dependent.** In Next.js, "server component" can mean "runs at build time." For static export, the server is just your build process.

**Question inherited complexity.** The original architecture made sense when I built it, but requirements evolved. Periodically re-evaluating whether your stack still fits your needs is worthwhile.
