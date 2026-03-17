---
title: "Case Study: CyberStudy Scheduler"
order: 2
---

### Case Study: CyberStudy Scheduler

[View the code on GitHub](https://github.com/ajtran303/cyberstudy-scheduler)

#### Overview

CyberStudy Scheduler is a study management system designed around a specific constraint: the only manual input should be taking notes during lectures. Everything else — quiz generation, grading, topic prioritization, flashcard creation, and review scheduling — is either automated by an AI agent or derived from spaced repetition algorithms.

The system tracks cybersecurity coursework through a four-tier mastery model (NOT_STARTED, LEARNING, PROFICIENT, MASTERED) where promotions only happen through explicit manual updates, never automatically. Topics at LEARNING or PROFICIENT participate in SM-2 spaced repetition scheduling, with each flashcard review recording a quality rating (0–5) that determines when the topic surfaces again. The REST API exposes 20+ endpoints designed specifically for consumption by an autonomous AI study agent, creating a closed-loop system where note-taking feeds into automated study sessions that feed back into the dashboard.

#### Technical Challenges & Solutions

##### Designing an API for AI Agent Consumption

The central design challenge was building an API contract between a human user and an autonomous AI agent without either side stepping on the other's data. Early iterations had the agent updating mastery levels and triggering SRS reviews, which corrupted the spaced repetition schedule because the agent's grading cadence differed fundamentally from the human review cadence.

The solution was establishing strict data boundaries with clear ownership. The API is the source of truth for study performance (mastery, quiz history, Teach It Back outcomes). Obsidian is the source of truth for note content and completeness. SRS scheduling is decoupled entirely from agent activity — only flashcard reviews in the dashboard UI can advance review dates. The agent reads mastery data for briefings and topic selection but never writes it. This separation means the agent can grade quizzes and log results aggressively without ever pushing out a flashcard due date, keeping the two feedback loops independent.

##### Making Two Feedback Loops Reinforce Without Conflicting

Wrong answers needed to surface through two independent mechanisms: the agent should weight future quizzes toward missed topics, and SM-2 should independently schedule those same topics for earlier review. The risk was double-penalizing: if both systems aggressively targeted weak topics, study sessions would become repetitive and demotivating.

The solution involved keeping the feedback loops on separate data paths. Quiz performance flows through `GET /topics/performance-summary`, which returns per-topic miss rates from the last 10 attempts. The agent uses this to weight question emphasis in generated quizzes. SM-2 operates on a completely separate data stream — only flashcard review quality ratings (0–5) affect the repetition interval. A topic can have a high quiz miss rate while maintaining a comfortable SRS interval if the student reviews flashcards well, or vice versa. The loops converge on the same weak topics naturally but through different mechanisms, avoiding the repetition problem while ensuring gaps get addressed from multiple angles.

##### Consolidating Agent Queries Without N+1 Explosions

The agent's weekly quiz generation originally required fetching individual topic data for every topic across every course — over 22 separate API calls for a single quiz. Each call included quiz history and Teach It Back outcomes to weight question emphasis. This created noticeable latency in the quiz generation workflow and put unnecessary load on the database.

The solution was the `GET /topics/performance-summary` endpoint, which returns per-topic quiz miss rates (last 10 attempts) and Teach It Back history (last 30 days) in a single response. One call replaces the full fan-out. The endpoint uses database-level aggregation rather than fetching all records and computing in application code. This pattern was applied elsewhere: the daily briefing endpoint returns per-course topic priorities, upcoming deadlines, and coverage descriptions in one call instead of requiring the agent to query courses, topics, assignments, and exams separately.

##### Handling Partial Success in Batch Operations

Importing a full course with topics, assignments, and exams in a single API call introduced a partial failure problem. If topic 15 of 40 had a validation error, should the entire import roll back, or should the 14 valid topics persist? Rolling back felt correct but meant a single typo in a syllabus import would waste all the valid data. Accepting partial success meant the response needed to communicate which items succeeded and which failed.

The solution used HTTP 207 (Multi-Status) responses for the batch import endpoint. Each item in the request gets its own status code in the response. Valid topics are created and returned with 201 status. Invalid items return their specific validation errors without affecting the rest of the batch. The endpoint validates all topic IDs upfront before any writes for operations that reference existing data (like bulk quiz attempt logging), failing fast if any reference is invalid. This gives the agent clear, programmatic feedback about what succeeded without requiring retry logic for the entire payload.

#### Architecture Decisions

##### Append-Only Logs for Study Performance

Quiz attempts and Teach It Back sessions are stored as append-only logs rather than mutable records. A quiz attempt records the question, the answer correctness, and the session it belongs to — and none of that ever changes. This makes the performance summary endpoint's aggregation straightforward (count misses in the last N attempts) and provides a complete audit trail of study history. The tradeoff is storage growth, but study data accumulates slowly enough that this is not a practical concern.

##### Explicit Mastery Promotion Only

Mastery levels never advance automatically based on quiz scores or review performance. A topic stays at LEARNING until the student manually promotes it to PROFICIENT. This was a deliberate choice against convenience: automated promotion based on metrics would obscure whether the student actually felt confident in the material. The manual gate forces a moment of honest self-assessment that no algorithm can replace.

##### Dual Authentication Modes

The API supports both NextAuth sessions (for the browser dashboard) and Bearer JWT tokens (for the AI agent) against the same endpoints. Rather than maintaining separate API surfaces, every endpoint checks for a valid session first, then falls back to Bearer token validation. This means the Swagger UI documentation accurately reflects what the agent can do because it is the same API the dashboard uses.

#### Lessons Learned

##### Data Boundaries Matter More Than Data Models

The most important architectural decision was not the database schema or the API shape but the ownership contract: who writes what and who reads what. The agent writes quiz results and Teach It Back outcomes. The human writes mastery levels and SRS reviews. The agent reads mastery data and performance summaries. The human reads daily briefings and review queues. Getting this contract right eliminated an entire category of bugs where the agent and the dashboard would fight over the same state.

##### Design APIs for Your Actual Consumer

Building the API "REST-fully" first and then trying to make the agent work with it produced endpoints that required multiple round-trips for simple workflows. Redesigning around the agent's actual access patterns — what does it need to generate a quiz, what does it need to log results — produced fewer, more purposeful endpoints. The performance summary endpoint exists because the agent needs that exact shape of data, not because it maps to a database table.

##### Spaced Repetition Works Best When Protected

SM-2 scheduling is fragile in the sense that external interference ruins its effectiveness. If anything other than genuine human recall performance affects the repetition interval, the schedule stops reflecting actual retention. Keeping SRS reviews as the only input to the scheduling algorithm — not quiz scores, not agent grades, not time-on-topic — preserves the integrity of the spaced repetition curve. The temptation to "help" by adjusting intervals based on related performance data would have undermined the one system with the strongest evidence base.

##### Build the Briefing You Actually Want to Read

The daily briefing endpoint went through several iterations. The first version returned raw data: lists of topics sorted by mastery, deadlines sorted by date. It was accurate but required mental effort to turn into a study plan. The current version returns opinionated recommendations: "these are your priorities today, these deadlines are approaching, this is your coverage gap." The agent consumes this directly for its daily study pings. Building the briefing around "what would I want to see at 5 PM on a weekday" rather than "what data is available" made the difference between a tool that gets checked and one that gets ignored.
