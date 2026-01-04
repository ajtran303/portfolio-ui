---
title: "Case Study: Goth Dance Analyzer"
order: 7
---

## Case Study: Goth Dance Analyzer

[View the code on GitHub](https://github.com/ajtran303/goth-dance-analyzer)

### Overview

A computer vision application that analyzes and compares dance styles using pose estimation and frequency domain analysis. Users record themselves dancing to a setlist of goth/post-punk songs, and receive quantifiable metrics, rhythm analysis, and a dancer "fingerprint" that captures their unique style. Built with Python, MediaPipe, OpenCV, NumPy, SciPy, pandas, and seaborn.

### Technical Challenges & Solutions

#### Detecting Rhythm Without Audio

Measuring how rhythmic a dancer moves typically requires audio alignment. Syncing audio to video adds complexity and potential failure points.

Fast Fourier Transform applied directly to arm velocity time-series extracts periodic movement patterns. The algorithm searches for dominant frequencies in the 0.5-4 Hz range (30-240 BPM), matching typical dance music tempos. Tested dancers showed movement BPM values correlating with actual song tempos, validating the approach without any audio processing.

#### Meaningful Metric Aggregation

Nine raw metrics (arm velocity, movement range, symmetry, etc.) overwhelm users. Values like "arm_velocity: 0.019" lack intuitive meaning.

Composite summary scores solve this: Energy (movement intensity), Control (precision), Groove (rhythmic quality), and Flow (continuous motion). Each dancer receives an archetype label based on their highest score: Energetic, Precise, Groovy, or Fluid. Raw metrics remain available in JSON for power users.

#### Real-Time Metrics in Video Export

Static per-video metrics provide no sense of how movement changes throughout a performance. Users wanted to see metrics evolve as they dance.

A 60-frame sliding window (~2 seconds at 30fps) recalculates metrics every frame, including windowed FFT for live BPM detection. Two seconds balances responsiveness against stability for reliable rhythm detection while still capturing dynamic changes.

#### Visualizations That Communicate

Initial charts displayed 8 metrics across multiple dancers in radar charts, parallel coordinates, and clustermaps. User feedback: "hard to understand at a glance."

The solution groups metrics into three categories (Movement, Style, Rhythm), generates per-song PDF pages instead of cramming everything into one view, and uses seaborn heatmaps with simplified labels. A fingerprint summary page shows each dancer's average profile and archetype. Less proved more effective than comprehensive.

### Architecture Decisions

A file-based pipeline (record → extract skeleton → analyze) was chosen over real-time analysis. MediaPipe's heavy pose model runs at 15-20fps on CPU, making live analysis impractical. Batch processing allows re-analysis without re-recording, and JSON intermediate files enable inspection and debugging.

PDF output was selected over interactive dashboards for shareability, offline access, and natural multi-page layouts for per-song breakdowns. No web server required.

Summary scores became the primary output rather than raw metrics. Users care about "is this dancer energetic?" not numerical values. Four scores with archetype labels communicate more effectively than nine unlabeled floats.

### Lessons Learned

The live BPM display in video export (powered by FFT) needs about a 2 second window of movement data to detect rhythm reliably. Less than that and the numbers jump around too much. More than that and it reacts too slowly to changes in how the dancer moves.

Pose detection fails in low light, common in goth club aesthetics. A pre-recording test script lets users verify detection quality before committing to a take, preventing wasted effort.

Simpler visualizations win. Each iteration removed chart types until only grouped heatmaps remained. Domain users wanted quick answers, not exploratory data tools.
