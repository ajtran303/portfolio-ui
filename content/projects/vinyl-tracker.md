---
title: "Vinyl Tracker"
order: 9
images:
  - url: "/images/vinyl-tracker/profile.png"
    alt: "Shareable profile card with collector type and stats"
  - url: "/images/vinyl-tracker/timeline.png"
    alt: "Release year timeline showing collection distribution"
  - url: "/images/vinyl-tracker/labels.png"
    alt: "Bar chart of top record labels in collection"
  - url: "/images/vinyl-tracker/genres.png"
    alt: "Radar chart showing genre breakdown"
---

### Vinyl Tracker

#### Summary

A CLI tool that analyzes a Discogs vinyl collection and generates visualizations plus a shareable taste profile card. Pulls collection data via the Discogs API, calculates statistics across decades, genres, labels, and artists, then determines a "collector type" label based on listening patterns. Built to answer the question: "What kind of record collector am I?"

[View the code on GitHub](https://github.com/ajtran303/vinyl-tracker)

---

#### Highlights

- **Discogs API integration** fetches full collection with pagination and rate limit handling
- **Local JSON caching** avoids redundant API calls and enables offline analysis
- **Decade distribution** shows release year patterns across 1960s–2020s
- **Genre and style breakdowns** with percentage calculations and top-N rankings
- **Label loyalty detection** identifies favorite record labels
- **Artist completionism tracking** finds artists with 3+ records in collection
- **Collector type classification** assigns labels like "80s Goth Archivist" or "Genre Fluid" based on rule matching
- **Dark-themed visualizations** including decade histogram, genre radar chart, label bars, and release timeline
- **Shareable profile card** generates a 1200x630 social-ready image with key stats and collector type

---

#### Tech Stack

- **Language**: Python 3.14
- **API**: Discogs API via discogs_client
- **Data Processing**: NumPy
- **Visualization**: Matplotlib, Seaborn
- **Image Generation**: Pillow
- **Configuration**: python-dotenv
