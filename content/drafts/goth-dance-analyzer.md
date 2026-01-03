---
title: "Goth Dance Analyzer"
order:
images:
  - "/images/goth-dance-analyzer/skeleton_tracking.png"
  - "/images/goth-dance-analyzer/comparison_radar.png"
  - "/images/goth-dance-analyzer/comparison_bars.png"
---

## Goth Dance Analyzer

### Summary

A computer vision tool that analyzes and compares gothic dance styles using pose estimation. Dancers are recorded performing a curated setlist of darkwave and post-punk tracks, then MediaPipe extracts 33 body landmarks per frame. The system calculates movement metrics including arm velocity, gesture range, vertical motion, and left-right symmetry, then generates visualizations comparing each dancer's unique style. Built for a party experiment with friends to answer the question: "Who dances the most goth?"

[View the code on GitHub](https://github.com/ajtran303/goth-dance-analyzer)

---

### Highlights

- **Real-time skeleton tracking** with MediaPipe PoseLandmarker for 33-point body detection
- **Mirrored preview display** for natural dancer feedback during recording sessions
- **Batch video processing** extracts pose data from entire recording directories
- **Six movement metrics** quantify arm velocity, movement range, vertical motion, symmetry, stillness ratio, and upper/lower body focus
- **Normalized comparison** scales metrics across all dancers for fair side-by-side analysis
- **Similarity detection** automatically identifies which dancers move most alike
- **Radar chart visualization** shows each dancer's movement "fingerprint" at a glance
- **Grouped bar charts** for precise metric-by-metric comparison
- **Curated darkwave setlist** spans 75-147 BPM covering Bauhaus, Sisters of Mercy, Siouxsie, Lebanon Hanover, and Joy Division
- **Flexible recording options** with 2-minute excerpts or full songs based on dancer count

---

### Tech Stack

- **Computer Vision**: MediaPipe PoseLandmarker, OpenCV
- **Data Processing**: NumPy, JSON
- **Visualization**: Matplotlib
- **Language**: Python 3.14+
- **Platform**: macOS (Apple Silicon optimized)

---

### Metrics

- **Arm Velocity** measures speed of arm movements across frames
- **Movement Range** captures spatial extent of gestures
- **Vertical Motion** detects jumping or bouncing
- **Symmetry** correlates left and right side movements
- **Stillness Ratio** tracks proportion of time in low-motion poses
- **Upper Body Focus** compares arm movement to leg movement
