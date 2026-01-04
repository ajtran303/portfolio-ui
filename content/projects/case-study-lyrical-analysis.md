---
title: "Case Study: Lyrical Analysis"
order: 2
---

### Case Study: Lyrical Analysis

[View the code on GitHub](https://github.com/ajtran303/artist_analyzer)

#### Overview

A full-stack web application that performs NLP on song lyrics to discover hidden themes, analyze sentiment patterns, and identify lyrical motifs. Users search for an artist or an album, and receive comprehensive lyrical analysis: making NLP accessible to anyone curious about the deeper patterns in music.

#### Technical Challenges & Solutions

##### Long-Running Analysis Tasks

NLP analysis including LDA topic modeling and sentiment analysis takes 30-60 seconds per album, causing HTTP timeouts and a frozen UI experience.

Celery with Redis handles async processing. Users receive an immediate job ID while workers process in the background. The frontend polls for status with progress indicators and rotating fun facts to keep users engaged. Completed results cache in PostgreSQL for instant retrieval on repeat visits.

##### Security & Input Validation

User input flows through search queries, artist names, and album titles before reaching the database and external APIs. Without proper sanitization, these become vectors for XSS, SQL injection, and API manipulation.

A multi-layer defense handles this. Bleach strips HTML tags from all inputs at the API boundary, preventing script injection. SQLAlchemy's parameterized queries protect the database layer. Artist and album names must match a validated character pattern that permits legitimate punctuation (ampersands, slashes, parentheses, apostrophes) while rejecting control characters and angle brackets. Error messages are sanitized before display to prevent reflected XSS, and a logging filter redacts sensitive tokens from application logs. The test suite includes dedicated security tests covering injection attempts, malformed payloads, and boundary conditions.

##### Handling Artist Names with Punctuation

Artist names like "AC/DC", "Guns N' Roses", and "Sunn O)))" contain characters that break naive string handling. Slashes confuse URL routing, ampersands split query parameters, and apostrophes corrupt database queries or API calls.

The solution treats punctuation as legitimate input rather than escaping it away. The validation regex explicitly allows common music punctuation: `[\w\s\-\.\'\&/\(\),!?]+`. URL encoding preserves these characters through HTTP transport. The Discogs client strips API-specific markers (disambiguation numbers like "(7)" and ANV asterisks) while preserving the artist's actual punctuation. This approach lets users search naturally while keeping the data pipeline intact.

##### Cloud-Based Lyrics Retrieval

Lyrics APIs present unique challenges for cloud-hosted applications. Direct scraping of lyrics websites returns 403 errors from cloud provider IPs, and most lyrics databases have restrictive terms or limited coverage.

The solution was a multi-source waterfall approach. Musixmatch API serves as the primary source with the largest commercial lyrics database. When unavailable, the system falls back to lyrics.ovh, a free community API. This layered approach maximizes lyrics coverage while gracefully degrading when services are unavailable. Genius was initially included as a fallback but was removed since cloud provider IPs are blocked by their anti-scraping measures.

##### Metadata and Lyrics Source Separation

The original architecture used a single API for both artist metadata and lyrics, creating a single point of failure. When that API blocked cloud requests, the entire application stopped working.

Separating concerns solved this problem. Discogs API handles all artist discovery, album metadata, and tracklists reliably from any IP address. Lyrics fetching became an independent concern with its own fallback chain. This separation means metadata always works, and lyrics retrieval degrades gracefully rather than failing completely.

##### Album Comparison Feature

Users wanted to compare albums side-by-side to see how an artist's lyrical style evolved or how two different artists approach similar themes. This required combining data from two separate analyses and generating new insights.

The solution reuses existing analysis results stored in PostgreSQL. When comparing, the API fetches both completed analyses and runs a combined LDA analysis on lyrics from both albums to discover shared themes. The comparison page shows sentiment differences, vocabulary statistics, word overlap, and jointly discovered topics: all computed on-demand without requiring re-analysis of individual albums.

#### Architecture Decisions

Flask was chosen over Django for its lightweight nature and clean Celery integration. Redis serves double duty as both task broker and result backend, simplifying infrastructure. The architecture scales horizontally by adding workers.

LDA was selected for topic modeling because it excels at discovering latent themes and produces interpretable results: topics appear as word distributions that humans can understand. 5-8 topics balances granularity against coherence for typical album sizes (10-15 songs). Fewer topics produce overly broad themes while more topics fragment into noise or duplicates when there aren't enough documents per topic. The default of 7 also aligns with ease of users interpreting results.

Server-side rendering with vanilla JavaScript was chosen over a frontend framework for faster initial page loads and minimal bundle size.

#### Lessons Learned

Progress indicators and fun facts dramatically improved perceived performance during long operations, even though actual analysis time remained unchanged.

Input validation should accommodate real-world data, not just sanitize it. Artist names contain legitimate punctuation that naive escaping would destroy. The goal is permitting valid input while blocking malicious payloads, which requires understanding the domain.

API reliability varies significantly between providers and deployment environments. Building fallback strategies with multiple data sources proved essential when the primary approach failed in production.

Separating metadata retrieval from content retrieval creates more resilient systems. When lyrics APIs fail, users can still browse artists and albums: partial functionality beats complete failure.
