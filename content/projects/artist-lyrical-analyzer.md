---
title: "Artist Lyrical Analyzer"
order: 3
images:
  - "/images/artist-lyrical-analyzer/search_page.png"
  - "/images/artist-lyrical-analyzer/result_page.png"
  - "/images/artist-lyrical-analyzer/compare_page.png"
---

## Artist Lyrical Analyzer

### Summary

A full-stack web application that analyzes song lyrics using natural language processing. Users search for an artist, select an album, and receive insights including hidden themes discovered through topic modeling, sentiment analysis across tracks, word frequency patterns, and recurring metaphors. The retro Winamp-inspired interface makes NLP accessible to anyone interested in exploring the deeper patterns in their favorite music.

---

### Highlights

- **Multi-source lyrics retrieval** with Musixmatch and lyrics.ovh fallback chain
- **Discogs API** for reliable artist and album metadata from any deployment environment
- **Async processing** with Celery and Redis handles 30-60 second NLP analyses without HTTP timeouts
- **Adaptive pagination** fetches multiple API pages to ensure consistent results after filtering
- **LDA topic modeling** automatically discovers and names 5-8 latent themes per album
- **Album comparison** with side-by-side sentiment, vocabulary stats, and shared theme discovery
- **Sentiment timeline** visualizes emotional arc across tracks with colorblind-friendly colors
- **Winamp-inspired UI** with responsive breakpoints for mobile compatibility
- **Production-ready security** including rate limiting, input sanitization, and CSRF protection

---

### Tech Stack

- **Backend**: Python, Flask, Gunicorn, Celery
- **Database**: PostgreSQL, SQLAlchemy, Redis
- **NLP**: Gensim (LDA), TextBlob, NLTK
- **APIs**: Discogs, Musixmatch, lyrics.ovh
- **Frontend**: HTML, CSS, vanilla JavaScript
- **Infrastructure**: Docker, Docker Compose, Render
- **Security**: Flask-Limiter, Flask-Talisman, Bleach

---

### Live Demo

[Artist Lyrical Analyzer](https://artist-analyzer-web.onrender.com/)
