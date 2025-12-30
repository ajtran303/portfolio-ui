---
title: "Artist Lyrical Analyzer"
order: 3
# images:
#   - "/images/artist-lyrical-analyzer/"
#   - "/images/artist-lyrical-analyzer/"
#   - "/images/artist-lyrical-analyzer/"
---

## Artist Lyrical Analyzer

### Summary

A full-stack web application that analyzes song lyrics using natural language processing. Users search for an artist, select an album, and receive insights including hidden themes discovered through topic modeling, sentiment analysis across tracks, word frequency patterns, and recurring metaphors. The retro Winamp-inspired interface makes NLP accessible to anyone interested in exploring the deeper patterns in their favorite music.

### Highlights

- Hybrid API architecture combining Discogs for metadata and Genius for lyrics, solving cloud IP blocking issues
- Async processing with Celery and Redis handles 30-60 second NLP analyses without HTTP timeouts
- Adaptive pagination fetches multiple API pages to ensure consistent results after filtering
- LDA topic modeling automatically discovers and names 5-8 latent themes per album
- Sentiment timeline visualizes emotional arc across tracks with colorblind-friendly colors
- Winamp-inspired UI with responsive breakpoints for mobile compatibility
- Production-ready security including rate limiting, input sanitization, and CSRF protection

### Tech Stack

- **Backend**: Flask, Gunicorn, Celery
- **Database**: PostgreSQL, SQLAlchemy, Redis
- **NLP**: Gensim (LDA), TextBlob, NLTK
- **APIs**: Discogs, Genius
- **Frontend**: HTML, CSS, vanilla JavaScript
- **Infrastructure**: Docker, Docker Compose
- **Security**: Flask-Limiter, Flask-Talisman, Bleach
- **A Love For Music**

### Live Demo

[Artist Lyrical Analyzer](https://artist-analyzer-web.onrender.com/)
