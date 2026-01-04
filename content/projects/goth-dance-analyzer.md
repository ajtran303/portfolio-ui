---
title: "Goth Dance Analyzer"
order: 6
images:
  - "/images/goth-dance-analyzer/skeleton_tracking.png"
  - "/images/goth-dance-analyzer/summary.png"
  - "/images/goth-dance-analyzer/detailed_metrics.png"
---

## Goth Dance Analyzer

### Summary

A computer vision tool that analyzes and compares gothic dance styles using pose estimation and FFT rhythm detection. Dancers are recorded performing a curated setlist of darkwave and post-punk tracks, then MediaPipe extracts 33 body landmarks per frame. The system calculates movement metrics, detects rhythm patterns from arm velocity using frequency analysis, and generates dancer "fingerprints" with style archetypes. Built for a party experiment with friends to answer the question: "Who dances the most goth?"

[View the code on GitHub](https://github.com/ajtran303/goth-dance-analyzer)

---

### Highlights

- **Real-time skeleton tracking** with MediaPipe PoseLandmarker for 33-point body detection
- **FFT rhythm detection** extracts movement BPM directly from arm velocity without audio
- **Nine movement metrics** including velocity, range, symmetry, and three rhythm measures
- **Four summary scores** (Energy, Control, Groove, Flow) distill metrics into intuitive ratings
- **Dancer fingerprints** average performance across songs with archetype labels (Energetic, Precise, Groovy, Fluid)
- **Similarity detection** identifies which dancers move most alike using mean absolute difference
- **Per-song PDF reports** with grouped heatmaps for Movement, Style, and Rhythm categories
- **Video export** renders skeleton overlay with live summary scores and BPM
- **Curated darkwave setlist** spans 75-147 BPM covering Bauhaus, Sisters of Mercy, Siouxsie, Lebanon Hanover, and Joy Division

---

### How Similarity Works

Similarity compares each metric between two dancers, measures how far apart they are, averages those differences, and inverts so "higher" means "more similar."

Example: If two dancers differ by 0.1 on Energy, 0.2 on Control, 0.0 on Groove, and 0.1 on Flow, the average difference is 0.1, so similarity equals 90%.

---

### Tech Stack

- **Computer Vision**: MediaPipe PoseLandmarker, OpenCV
- **Signal Processing**: NumPy, SciPy (Fast Fourier Transform)
- **Data Processing**: pandas, JSON
- **Visualization**: seaborn, matplotlib
- **Language**: Python 3.14+
- **Platform**: macOS (Apple Silicon optimized)

---

### Metrics

#### Raw Metrics

- **Arm Velocity** measures speed of arm movements across frames
- **Movement Range** captures spatial extent of gestures
- **Vertical Motion** detects jumping or bouncing
- **Symmetry** correlates left and right side movements
- **Stillness Ratio** tracks proportion of time in low-motion poses
- **Upper Body Focus** compares arm movement to leg movement
- **Movement BPM** dominant rhythm frequency detected via FFT
- **Rhythm Strength** how pronounced the rhythmic pattern is
- **Rhythm Consistency** how stable the rhythm is over time

#### Summary Scores

- **Energy** = average of arm velocity, movement range, and vertical motion
- **Control** = average of symmetry and rhythm consistency
- **Groove** = average of rhythm strength and consistency
- **Flow** = inverse of stillness ratio
