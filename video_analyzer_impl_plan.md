# Video Analyzer Implementation Plan

## Goal

Build a Gemini-based video analysis pipeline that inspects lesson videos, identifies what is visible on screen over time, and produces candidate overlay timestamps that can be reviewed and then applied to Remotion compositions.

The initial target is the existing `L1/L1_intro.mp4` presenter video and the current lesson-driven overlay flow in [src/content/l1.ts](/Users/admin/IdeaProjects/AI_testers/src/content/l1.ts).

## Scope

The first implementation should:

- analyze a local video file with Gemini,
- generate structured timestamp suggestions for overlays,
- keep the existing manual timestamp file as the final runtime source,
- produce intermediate artifacts for human review,
- avoid direct in-place edits to production timing data unless explicitly requested by a flag.

Out of scope for the first pass:

- frame-accurate editing,
- autonomous visual editing decisions without review,
- multi-model routing,
- UI for approving suggestions,
- analysis of multiple lessons in one run.

## Why This Fits The Current Repo

The repository already has the right foundations:

- FFmpeg is already assumed in the render flow via [scripts/prepare-and-render-enhanced.mjs](/Users/admin/IdeaProjects/AI_testers/scripts/prepare-and-render-enhanced.mjs).
- Runtime overlay timing already lives in [src/content/l1.ts](/Users/admin/IdeaProjects/AI_testers/src/content/l1.ts).
- The full lesson composition already overlays visuals onto a presenter video in [src/compositions/LessonComposition.tsx](/Users/admin/IdeaProjects/AI_testers/src/compositions/LessonComposition.tsx).

This means the analyzer can be added as a pre-production tool rather than changing the render architecture.

## Proposed Workflow

1. Read a source video such as `L1/L1_intro.mp4`.
2. Extract analysis clips or keyframes with FFmpeg.
3. Upload the clips to Gemini using `GEMINI_API_KEY`.
4. Ask Gemini for strict JSON describing visible content and suggested overlay windows.
5. Normalize and merge the model output into a repository-friendly analysis artifact.
6. Optionally derive candidate overlay timing entries from that artifact.
7. Keep human review in the loop before updating [src/content/l1.ts](/Users/admin/IdeaProjects/AI_testers/src/content/l1.ts).

## Architecture

### New Files

- `scripts/analyze-video-timestamps.mjs`
  Main CLI entry point.
- `src/lib/video-analysis/types.ts`
  Shared types for analysis results and suggested overlay windows.
- `src/lib/video-analysis/normalize.ts`
  Validation and normalization helpers.
- `src/lib/video-analysis/prompts.ts`
  Prompt templates for Gemini.
- `docs/VIDEO_ANALYZER.md`
  Usage, flags, expected artifacts, and review flow.
- `video_analyzer_impl_plan.md`
  This implementation plan.

### Generated Artifacts

- `tmp/video-analysis/<lesson>/clips/`
  Short extracted clips or thumbnails.
- `tmp/video-analysis/<lesson>/responses/`
  Raw Gemini responses for debugging.
- `tmp/video-analysis/<lesson>/analysis.json`
  Normalized full analysis.
- `tmp/video-analysis/<lesson>/overlay-candidates.json`
  Overlay-oriented candidate windows.

These should be treated as generated intermediates and ignored by git unless the team later decides to keep examples.

## Input Strategy

The first version should not send the entire video in one request.

Instead:

- split the video into fixed windows such as 10 to 15 seconds,
- optionally add overlap such as 1 to 2 seconds between windows,
- upload each segment independently,
- ask the model for per-window descriptions and overlay opportunities.

This keeps requests cheaper, more debuggable, and less likely to fail on long videos.

## Output Contract

Gemini should return strict JSON only. The implementation should reject prose-heavy responses and retry with stronger format instructions.

Proposed normalized shape:

```json
{
  "videoPath": "L1/L1_intro.mp4",
  "windowStart": 30,
  "windowEnd": 45,
  "events": [
    {
      "start": 31.2,
      "end": 39.8,
      "screenSummary": "Presenter occupies left side, empty space on right, discussing transformer pipeline",
      "topic": "transformer flow",
      "overlayCandidate": "flowDiagram",
      "placementHint": "right",
      "visualClutter": "low",
      "speechRelevance": "high",
      "confidence": 0.88
    }
  ]
}
```

## Suggested CLI

Primary command:

```bash
node scripts/analyze-video-timestamps.mjs --lesson L1 --input L1/L1_intro.mp4
```

Useful flags:

- `--segment-length 12`
- `--segment-overlap 2`
- `--output tmp/video-analysis/L1`
- `--model gemini-2.5-pro`
- `--candidate-overlay flowDiagram`
- `--write-candidates`
- `--update-timestamps`
- `--dry-run`

`--update-timestamps` should be opt-in only and should not be part of the first implementation milestone.

## Phase Plan

### Phase 1: Scaffolding

- Create `.env.example` with `GEMINI_API_KEY=`.
- Add a small config loader for environment access.
- Add analysis type definitions and directories.
- Add a script entry point with argument parsing.

Exit criteria:

- The script validates required arguments and environment variables.
- The script prints a clear execution plan before doing work.

### Phase 2: FFmpeg Segmentation

- Use FFmpeg to split the input video into short MP4 clips.
- Store clips under `tmp/video-analysis/<lesson>/clips/`.
- Record an index of generated segments with start and end times.

Implementation notes:

- Prefer deterministic filenames such as `segment-000-0000.0-0012.0.mp4`.
- Fail early if FFmpeg is unavailable.
- Keep audio unless Gemini performs better without it after testing.

Exit criteria:

- Running the script produces reproducible segment files and a segment manifest JSON.

### Phase 3: Gemini Upload And Analysis

- Upload each segment to Gemini.
- Submit a structured prompt requesting visible-scene descriptions and overlay opportunities.
- Save raw responses for each segment.

Implementation notes:

- Use the official Gemini SDK or direct HTTP calls.
- Keep prompts in one place rather than hardcoding them inline.
- Include timestamp context in the prompt so the model can reason in absolute seconds.

Exit criteria:

- Each segment produces a raw response file and a parsed JSON result.

### Phase 4: Normalization And Validation

- Validate model output shape.
- Clamp invalid timestamps into the segment bounds.
- Convert relative segment timestamps into absolute video timestamps.
- Merge overlapping or redundant suggestions.

Implementation notes:

- Confidence values should be normalized to `0..1`.
- Unknown overlay names should be preserved as suggestions but marked unsupported.
- Invalid responses should be logged and excluded rather than crashing the entire run.

Exit criteria:

- The tool emits a stable `analysis.json` and `overlay-candidates.json`.

### Phase 5: Mapping To Existing Overlay System

- Map model suggestions to known overlay keys already used by the Remotion composition.
- For the first pass, support:
  - `intro`
  - `flowDiagram`
  - `chaos`

Implementation notes:

- `intro` is probably static and should usually remain manual.
- `flowDiagram` and future overlays are better candidates for AI assistance.
- If multiple windows suggest the same overlay, merge them into a single best candidate window.

Exit criteria:

- The output clearly distinguishes supported candidates from exploratory suggestions.

### Phase 6: Safe Update Path

- Add a review-first mode that prints candidate changes against the current timestamp file.
- Defer automatic edits to a later phase unless the output quality is already good enough.

Safer first version:

- generate `overlay-candidates.json`,
- print a concise diff proposal,
- leave [src/content/l1.ts](/Users/admin/IdeaProjects/AI_testers/src/content/l1.ts) untouched.

Future version:

- add `--update-timestamps` to patch the TypeScript file automatically.

## Prompt Design

The model prompt should be narrow and operational, not open-ended.

Prompt goals:

- describe what is visibly on screen,
- identify intervals where overlays would be readable,
- estimate whether the screen has free space,
- align suggestions to a known overlay vocabulary when possible,
- return JSON only.

Prompt constraints:

- no marketing language,
- no speculative content outside the visible video,
- no timestamps outside the provided window,
- no explanation outside the JSON schema.

## Data Model

Core entities:

- `VideoSegment`
  Path, absolute start/end, duration.
- `VideoAnalysisEvent`
  Start/end, summary, candidate overlay, confidence, placement hints.
- `VideoAnalysisResult`
  Input video metadata, segment results, merged candidates, warnings.

The model should distinguish:

- what is definitely visible,
- what topic the presenter appears to be discussing,
- whether the screen composition leaves room for overlays.

## Dependencies

Likely additions:

- `dotenv`
  Load `.env` locally.
- `@google/genai` or direct `fetch`
  Gemini API access.
- Optional schema validation library such as `zod`
  Useful, but not mandatory for the first pass.

If minimizing dependencies is preferred, the first version can use:

- built-in `fetch`,
- manual runtime guards,
- a small local env loader via `dotenv`.

## Error Handling

The script should handle:

- missing `GEMINI_API_KEY`,
- missing input file,
- missing FFmpeg,
- upload failures,
- non-JSON model output,
- malformed timestamps,
- partial completion across many segments.

Operational rule:

- segment failures should not discard successful segments.
- the script should emit warnings and a final summary of failed windows.

## Review And Verification

Before wiring any automatic timestamp update:

- run the analyzer on `L1/L1_intro.mp4`,
- compare output with the existing `flowDiagram` and `chaos` ranges,
- inspect whether suggested windows are semantically correct,
- test whether suggested windows actually look readable in the Remotion preview.

Success criteria for first implementation:

- the analyzer produces stable candidate windows,
- the results are good enough to accelerate manual timestamping,
- the generated artifacts are understandable without opening raw model responses.

## Open Questions

- Should the analyzer consider transcript text as additional grounding in phase one, or only video?
- Should segment overlap be enabled by default to reduce boundary misses?
- Should audio remain in the segment uploads, or should analysis be visual-only at first?
- Should unsupported overlay suggestions be preserved for future composition work?

Recommended answers for v1:

- use video-only first,
- enable a small overlap,
- keep audio in uploads unless it clearly hurts reliability,
- preserve unsupported suggestions in the JSON output.

## Recommended Delivery Order

1. Add env example and docs scaffold.
2. Implement FFmpeg segmentation.
3. Implement Gemini upload and JSON extraction.
4. Implement normalization and merged candidate output.
5. Validate against `L1`.
6. Only then consider automatic timestamp patching.

## Immediate Deliverables

- `video_analyzer_impl_plan.md`
- `.env.example`

Next implementation step after this plan:

- scaffold `scripts/analyze-video-timestamps.mjs` in dry-run mode with FFmpeg segmentation and output manifest generation.
