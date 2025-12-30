---
title: "Case Study: Artist Lyrical Analysis"
order: 4
---

## Case Study: Artist Lyrical Analysis

### Overview

A full-stack web application that performs NLP on song lyrics to discover hidden themes, analyze sentiment patterns, and identify lyrical motifs. Users search for an artist, select an album, and receive comprehensive lyrical analysis: making NLP accessible to anyone curious about the deeper patterns in music.

### Technical Challenges & Solutions

#### Cloud-Based Lyrics Retrieval

Lyrics APIs present unique challenges for cloud-hosted applications. Direct scraping of lyrics websites returns 403 errors from cloud provider IPs, and most lyrics databases have restrictive terms or limited coverage.

The solution was a multi-source waterfall approach. Musixmatch API serves as the primary source with the largest commercial lyrics database. When unavailable, the system falls back to lyrics.ovh, a free community API. This layered approach maximizes lyrics coverage while gracefully degrading when services are unavailable. Genius was initially included as a fallback but was removed since cloud provider IPs are blocked by their anti-scraping measures.

#### Metadata and Lyrics Source Separation

The original architecture used a single API for both artist metadata and lyrics, creating a single point of failure. When that API blocked cloud requests, the entire application stopped working.

Separating concerns solved this problem. Discogs API handles all artist discovery, album metadata, and tracklists reliably from any IP address. Lyrics fetching became an independent concern with its own fallback chain. This separation means metadata always works, and lyrics retrieval degrades gracefully rather than failing completely.

#### Long-Running Analysis Tasks

NLP analysis including LDA topic modeling and sentiment analysis takes 30-60 seconds per album, causing HTTP timeouts and a frozen UI experience.

Celery with Redis handles async processing. Users receive an immediate job ID while workers process in the background. The frontend polls for status with progress indicators and rotating fun facts to keep users engaged. Completed results cache in PostgreSQL for instant retrieval on repeat visits.

#### Sparse Pagination Results

Discogs returns all releases including singles, compilations, and guest appearances, but users only want studio albums. After filtering, some API pages had zero qualifying results, breaking infinite scroll: the UI would stop loading even though more albums existed.

The solution was adaptive pagination that fetches multiple API pages until enough filtered results accumulate. Instead of mapping one frontend page to one API page, the backend collects results across multiple calls before responding, ensuring consistent batches for the frontend.

#### Mobile Responsiveness

The Winamp-inspired UI with playlist-style album lists overflowed horizontally on mobile devices, requiring sideways scrolling to reach the analyze button.

Responsive breakpoints adapt the layout progressively: full playlist with index numbers and inline buttons on desktop, hidden index and compact text on tablets, and full-width stacked buttons on mobile for easy tapping.

#### Album Comparison Feature

Users wanted to compare albums side-by-side to see how an artist's lyrical style evolved or how two different artists approach similar themes. This required combining data from two separate analyses and generating new insights.

The solution reuses existing analysis results stored in PostgreSQL. When comparing, the API fetches both completed analyses and runs a combined LDA analysis on lyrics from both albums to discover shared themes. The comparison page shows sentiment differences, vocabulary statistics, word overlap, and jointly discovered topics: all computed on-demand without requiring re-analysis of individual albums.

### Architecture Decisions

Flask was chosen over Django for its lightweight nature and clean Celery integration. Redis serves double duty as both task broker and result backend, simplifying infrastructure. The architecture scales horizontally by adding workers.

LDA was selected for topic modeling because it excels at discovering latent themes and produces interpretable results: topics appear as weighted word distributions that humans can understand.

Server-side rendering with vanilla JavaScript was chosen over a frontend framework for faster initial page loads and minimal bundle size.

### Lessons Learned

API reliability varies significantly between providers and deployment environments. Building fallback strategies with multiple data sources proved essential when the primary approach failed in production.

Separating metadata retrieval from content retrieval creates more resilient systems. When lyrics APIs fail, users can still browse artists and albums: partial functionality beats complete failure.

Progress indicators and fun facts dramatically improved perceived performance during long operations, even though actual analysis time remained unchanged.

Mobile-first design should be built in from the start. Adapting the desktop-optimized Winamp aesthetic to mobile required rethinking the entire album list interaction pattern.
