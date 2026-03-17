# Enhanced Video Creation: Intro + Presenter Video

This document describes how to create the **L1 Enhanced** video: an 11-second full-screen intro ("Jak działa LLM?") followed by the presenter video (`L1_intro.mp4`).

## Overview

| Component | Description |
|-----------|-------------|
| **Intro** | 11-second full-screen graphic overlay: "Jak działa LLM?", subtitle, lower third (Sławek) |
| **Presenter video** | `L1/L1_intro.mp4` — your recorded lesson/presentation |
| **Output** | `out/L1Enhanced.mp4` — same duration as presenter video; only the **screen** is replaced for the first 11 seconds |

**Audio:** The presenter's audio plays from the very beginning (over the intro). Only the visual is replaced for 11 seconds.

## File Locations

| Path | Purpose |
|------|---------|
| `L1/L1_intro.mp4` | **Source** — your presenter video (never moved or deleted) |
| `public/L1_intro.mp4` | **Copy** — used by Remotion during render |
| `out/L1Intro.mp4` | Intro-only render (11s) |
| `out/L1Enhanced.mp4` | Final output (intro + presenter video) |

**Backup policy:** The script only **copies** files. It never moves or deletes. `L1/L1_intro.mp4` remains the canonical source.

## Quick Start

```bash
# 1. Add your presenter video
#    Place your recorded lesson at L1/L1_intro.mp4

# 2. Run the enhanced render
npm run render:l1-enhanced
```

If `L1/L1_intro.mp4` does not exist, the script creates it from `out/L1Intro.mp4` (the intro-only render) for testing. Run `npm run render:l1` first if needed.

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

### 2. Remotion composition (`L1EnhancedComposition`)

- **Video layer:** `<Html5Video>` plays `L1_intro.mp4` from frame 0 for the full duration. Audio starts immediately.
- **Overlay layer (0–11s):** `L1IntroComposition` ("Jak działa LLM?") covers the screen. After 11 seconds it disappears and the presenter video is visible.

Total duration = presenter video duration (unchanged). Only the first 11 seconds of the screen are replaced.

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

### Render intro only

```bash
npm run render:l1
# Output: out/L1Intro.mp4 (11 seconds)
```

### Render enhanced (intro + video)

```bash
npm run render:l1-enhanced
# Output: out/L1Enhanced.mp4
```

### Preview in Remotion Studio

```bash
npm run studio
# Select composition "L1Enhanced"
# Override props: videoDurationInSeconds (must match your video)
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `L1_intro.mp4 not found` | Add your video to `L1/L1_intro.mp4` or run `npm run render:l1` first |
| `ffprobe` not found | Install FFmpeg (`brew install ffmpeg` on macOS) |
| Wrong duration | Ensure `L1_intro.mp4` is a valid MP4; re-encode with FFmpeg if needed |
| Video not visible | Check `public/L1_intro.mp4` exists after the script runs |

## Animation overlays and timestamps

**Timestamps file:** `L1/L1_timestamps.ts` — edit this file to change when overlays appear.

| Time | Overlay |
|------|---------|
| **0–11s** | Intro — "Jak działa LLM?" |
| **30–60s** | Flow diagram — Input → Transformer → Output (screenshot style) |
| **3:50–4:10** | Chaos — funny probabilistic/chaos visual |

Components: `FlowDiagramImage`, `ChaosImage` (in `src/components/`).

## References

- [Remotion Sequence](https://www.remotion.dev/docs/sequence)
- [Remotion Video / Html5Video](https://www.remotion.dev/docs/video)
- [Remotion staticFile](https://www.remotion.dev/docs/staticfile)
- [docs/deep-research-report-3.md](./deep-research-report-3.md) — Remotion architecture and patterns
