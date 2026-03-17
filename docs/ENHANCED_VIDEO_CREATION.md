# Enhanced Video Creation: L1Full

This document describes how to create the **L1Full** video: the presenter video with timed overlay animations layered on top.

## Overview

| Component | Description |
|-----------|-------------|
| **Intro clip** | `L1Intro` composition for fast iteration on the opening slide |
| **Diagram clip** | `L1Diagram` composition for the flow diagram |
| **Logits clip** | `L1Logits` composition for the probability/logits visual |
| **Presenter video** | `L1/L1_intro.mp4` — your recorded lesson/presentation |
| **Output** | `out/L1Full.mp4` — full lesson video with overlays baked in |

**Audio:** The presenter's audio plays through the full lesson video.

## File Locations

| Path | Purpose |
|------|---------|
| `L1/L1_intro.mp4` | **Source** — your presenter video (never moved or deleted) |
| `public/L1_intro.mp4` | **Copy** — used by Remotion during render |
| `public/generated/l1-flow.svg` | Generated D2 diagram asset |
| `out/L1Full.mp4` | Final output (full lesson with overlays) |

**Backup policy:** The script only **copies** files. It never moves or deletes. `L1/L1_intro.mp4` remains the canonical source.

## Quick Start

```bash
# 1. Add your presenter video
#    Place your recorded lesson at L1/L1_intro.mp4

# 2. Render the full video
npm run render:l1-enhanced
```

## How It Works

### 1. Prepare script (`scripts/prepare-and-render-enhanced.mjs`)

1. **Ensure source exists**  
   If `L1/L1_intro.mp4` is missing and `out/L1Intro.mp4` exists, copies the intro to `L1/L1_intro.mp4` for testing.

2. **Copy to public**  
   Copies `L1/L1_intro.mp4` → `public/L1_intro.mp4` (Remotion reads assets from `public/`).

3. **Get duration**  
   Uses `ffprobe` to read the video duration in seconds.

4. **Sync data**  
   Runs `npm run sync:data` to regenerate lesson data.

5. **Render**  
   Runs `remotion render` with `--props` containing `videoDurationInSeconds`.

### 2. Remotion compositions

- **`L1Intro`**: 10-second intro-only clip
- **`L1Diagram`**: flow-diagram clip
- **`L1Logits`**: probability/logits clip
- **`L1Full`**: the full lesson composition

`L1Full` plays the presenter video from frame 0 and overlays the configured lesson slides at their timestamp windows.

### 3. Reusable intro for L2, L3, etc.

The `LessonIntro` component (`src/components/LessonIntro.tsx`) is parameterized and can be used for any lesson:

```tsx
<LessonIntro
  seriesName="AI Testers"
  lessonNumber={2}
  title="Tokenizacja w praktyce"
  subtitle="Jak tekst zamienia się w liczby."
  presenterName="Sławek"
/>
```

Use `\n` in `title` for line breaks, e.g. `title="Jak działa\nLLM?"`.

Use it in `L2IntroComposition`, `L3IntroComposition`, etc. with lesson-specific props.

### 4. Quality and file size

- **CRF:** Set to 16 in `remotion.config.ts` (lower = better quality, larger file). Default is 18.
- **File size:** ~36 MB for a 5‑minute 1080p video is typical at CRF 16. For higher quality, use `Config.setCrf(14)` or `--video-bitrate=8M` (note: bitrate is required when using hardware acceleration instead of CRF).
- **Source quality:** The output cannot exceed the quality of `L1_intro.mp4`. If the source is heavily compressed, re-encode it at a higher bitrate before using.

### 5. Dependencies

- **FFmpeg** (with `ffprobe`) — must be installed for duration detection.
- **Remotion** — composition and render pipeline.

## Manual Steps

### Render full video

```bash
npm run render:l1
# Output: out/L1Full.mp4
```

### Preview in Remotion Studio

```bash
npm run studio
# Select composition "L1Intro", "L1Diagram", "L1Logits", or "L1Full"
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `L1_intro.mp4 not found` | Add your video to `L1/L1_intro.mp4` |
| Video not visible | Check `public/L1_intro.mp4` exists after the script runs |

## Animation overlays and timestamps

**Lesson content file:** `src/content/l1.ts` — edit this file to change overlay timing and content.

| Time | Overlay |
|------|---------|
| **0–11s** | Intro — "Jak działa LLM?" |
| **30–60s** | Flow diagram — Input → Transformer → Output (screenshot style) |
| **3:50–4:10** | Chaos — funny probabilistic/chaos visual |

Components: `LessonIntro`, `FlowDiagramSlide`, `ProbabilityChartSlide` (in `src/components/`).

## References

- [Remotion Sequence](https://www.remotion.dev/docs/sequence)
- [Remotion Video / Html5Video](https://www.remotion.dev/docs/video)
- [Remotion staticFile](https://www.remotion.dev/docs/staticfile)
- [docs/deep-research-report-3.md](./deep-research-report-3.md) — Remotion architecture and patterns
