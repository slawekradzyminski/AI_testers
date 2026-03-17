# Video Analyzer

The video analyzer is intentionally separate from the Remotion application code.

It lives under `tools/video-analyzer/` and exists to:

- segment lesson videos into smaller analysis clips,
- optionally upload those clips to Gemini,
- collect structured timestamped scene descriptions,
- produce AI-agent-friendly descriptions of what is visible on screen over time.

The implementation lives in `tools/video-analyzer/`.

## Goal

Produce a machine-readable timeline of scene descriptions that another AI agent can consume as "eyes on the video".

For `L1`, the main kept output is:

- `L1/video-analysis/scene-descriptions.json`

## Run

Dry-run segmentation only:

```bash
npm run analyze:video -- --lesson L1 --input L1/L1_intro.mp4 --dry-run
```

Full analysis:

```bash
npm run analyze:video -- --lesson L1 --input L1/L1_intro.mp4 --output L1/video-analysis
```

Retry a specific failed segment while rebuilding the final aggregate outputs from all stored responses:

```bash
npm run analyze:video -- --lesson L1 --input L1/L1_intro.mp4 --output L1/video-analysis --segment-indexes 30
```

## Requirements

- `ffmpeg`
- `ffprobe`
- `GEMINI_API_KEY` in `.env` for non-dry analysis

Example:

```bash
GEMINI_API_KEY=your_key_here
```

## Final Output

Canonical kept output:

```text
L1/video-analysis/scene-descriptions.json
```

`scene-descriptions.json` is the main artifact for other AI agents.

Each scene entry contains:

- start and end timestamps
- short screen summary
- visible subjects
- actions
- on-screen text
- composition notes
- placement hint
- visual clutter
- confidence

## Intermediate Artifacts

Intermediate files are written under the chosen output directory, for example `L1/video-analysis/`:

- `clips/` analysis-ready MP4 segments
- `responses/` raw Gemini responses or error records
- `segments.json` segment manifest
- `dry-run-summary.json` dry-run result
- `analysis.json` normalized segment analysis
- `scene-descriptions.json` flattened, agent-friendly timeline descriptions

These are useful for debugging and retries. Intermediate artifacts are gitignored; `scene-descriptions.json` is the final kept output.

## Notes

- The tool does not edit runtime lesson definitions automatically.
- The CLI is thin; most logic is split into small TypeScript modules.
- Tests live alongside the tool under `tools/video-analyzer/src/__tests__/`.
- The structured Gemini output is intentionally visual-only: it describes what happens on screen rather than suggesting animations or edits.
- Existing clips are reused, so rerunning a single failed segment does not need to re-segment the whole video.

## Current Model

The analyzer currently defaults to:

```text
gemini-3.1-flash-lite-preview
```

Override if needed:

```bash
npm run analyze:video -- --lesson L1 --input L1/L1_intro.mp4 --model gemini-3.1-flash-lite-preview
```

## Status

- Completed: isolated TypeScript tool under `tools/video-analyzer/`
- Completed: FFmpeg-backed segmentation and dry-run execution against `L1/L1_intro.mp4`
- Completed: Gemini requests configured for structured JSON output with runtime validation
- Completed: analyzer output refocused on visual timeline description only
- Completed: default configured model switched to `gemini-3.1-flash-lite-preview` from the Gemini model docs
- Completed: live Gemini run verified on `L1/L1_intro.mp4`
- Completed: single-segment retry support with aggregate rebuild from stored responses
- Current output location: `L1/video-analysis/scene-descriptions.json`
- Current state: the failed final segment was retried successfully; current aggregate output has `0` failures
