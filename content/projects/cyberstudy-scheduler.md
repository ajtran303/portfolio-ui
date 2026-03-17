---
title: "CyberStudy Scheduler"
order: 1
images:
  - url: "/images/cyberstudy-scheduler/dashboard.png"
    alt: "Daily briefing dashboard showing study priorities and SRS reviews due"
  - url: "/images/cyberstudy-scheduler/flashcards.png"
    alt: "3D-flippable flashcard interface with key terms"
  - url: "/images/cyberstudy-scheduler/analytics.png"
    alt: "Mastery distribution analytics chart across courses"
---

### CyberStudy Scheduler

#### Summary

A personal study tracker built for cybersecurity coursework with spaced repetition scheduling and AI agent integration. Tracks courses, topics, assignments, and exams through a four-tier mastery system (NOT_STARTED through MASTERED) driven by SM-2 spaced repetition. An autonomous AI agent ("Hex") connects via REST API to run nightly quizzes, Teach It Back sessions, and daily study pings — creating a closed-loop system where wrong answers compound through two independent feedback loops.

[View the code on GitHub](https://github.com/ajtran303/cyberstudy-scheduler)

---

#### Highlights

- **SM-2 Spaced Repetition:** Topics at LEARNING or PROFICIENT participate in review scheduling. Each review takes a quality rating (0–5) and computes the next review date.
- **Daily Briefing Engine:** Surfaces what's due, what's coming up, and what to focus on — the single entry point for "what should I study now?"
- **AI Agent Integration:** Full REST API designed for an autonomous study agent that generates quizzes, grades teach-back sessions, and syncs key terms from Obsidian notes.
- **Dual Feedback Loops:** Quiz misses weight future questions toward weak topics while SM-2 independently surfaces those same topics at shorter review intervals.
- **Review Queue:** Multiple sort modes including mastery priority, SRS due date, interleaved (cross-course round-robin), and least-recently-reviewed.
- **3D Flashcards:** Per-topic key terms with flippable card UI, shuffle, and keyboard navigation.
- **Calendar Views:** Week and month views aggregating topics, assignments, and exams in one place.
- **Batch Import:** Populate an entire course in one API call with HTTP 207 partial-success support.

---

#### Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript
- **Database:** Prisma 7, PostgreSQL
- **Auth:** NextAuth v5 (credentials + JWT), dual-mode Bearer token and session auth
- **UI:** shadcn/ui, Tailwind CSS v4
- **Visualization:** Recharts
- **API Docs:** Swagger UI

---

#### Status

In active use for cybersecurity coursework. AI agent runs on a cron schedule handling daily study pings, quiz generation and grading, Teach It Back sessions, and key terms sync from Obsidian.
