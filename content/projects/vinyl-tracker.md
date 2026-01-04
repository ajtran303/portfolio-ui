---
title: "Vinyl Tracker"
order: 7
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

---

#### Collector Types

- **Goth Archivist** dominates in gothic rock, darkwave, and post-punk
- **Industrial Militant** heavy on industrial and EBM
- **Shoegaze Gazer** deep in shoegaze and dream pop
- **New Wave Devotee** loaded with synth-pop and minimal synth
- **80s Purist** 60%+ of collection from 1980–1989
- **Vinyl Archaeologist** average release year before 1985
- **Label Loyalist** 25%+ from a single label
- **Completionist** averages 3+ records per artist
- **Genre Fluid** no single genre exceeds 25%
- **Eclectic Crate Digger** the catch-all for varied tastes
