---
title: "Lyrical Analysis"
order: 3
images:
  - url: "/images/lyrical-analysis/search_page.png"
    alt: "Search page with artist input field"
  - url: "/images/lyrical-analysis/result_page.png"
    alt: "Analysis results showing sentiment and topic breakdown"
  - url: "/images/lyrical-analysis/compare_page.png"
    alt: "Side-by-side album comparison view"
---

### Lyrical Analysis

#### Summary

A full-stack web application that analyzes song lyrics using natural language processing. Users search for an artist, select an album, and receive insights including hidden themes discovered through topic modeling, sentiment analysis across tracks, emotional profiling with 8 distinct emotions, and recurring metaphors. The retro Winamp-inspired interface makes NLP accessible to anyone interested in exploring the deeper patterns in their favorite music. 90% test coverage (350+ pytest examples).

[View the code on GitHub](https://github.com/ajtran303/artist_analyzer)

---

#### Highlights

- **Multi-source lyrics retrieval** with Musixmatch and lyrics.ovh fallback chain
- **Discogs API** for reliable artist and album metadata from any deployment environment
- **Async processing** with Celery and Redis handles 30-60 second NLP analyses without HTTP timeouts
- **Adaptive pagination** fetches multiple API pages to ensure consistent results after filtering
- **LDA topic modeling** automatically discovers and names 5-8 latent themes per album
- **Emotional profiling** with NRC Emotion Lexicon identifies 8 distinct emotions (joy, trust, fear, etc.)
- **Album comparison** with side-by-side sentiment, emotion face-offs, and shared theme discovery
- **Sentiment timeline** visualizes emotional arc across tracks with colorblind-friendly colors
- **Winamp-inspired UI** with responsive breakpoints for mobile compatibility
- **Production-ready security** including rate limiting (10 submissions per minute), input sanitization, and CSRF protection

---

#### Tech Stack

- **Backend**: Python, Flask, Gunicorn, Celery
- **Database**: PostgreSQL, SQLAlchemy, Redis
- **NLP**: Gensim (LDA), TextBlob, NLTK, NRCLex
- **APIs**: Discogs, Musixmatch, lyrics.ovh
- **Frontend**: HTML, CSS, vanilla JavaScript
- **Infrastructure**: Docker, Docker Compose, Render
- **Security**: Flask-Limiter, Flask-Talisman, Bleach

---

#### Live Demo

[Lyrical Analysis](https://artist-analyzer-web.onrender.com/)
