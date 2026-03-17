# AI Testers Video Project

This repository is being turned into a Node.js project built with [Remotion](https://www.remotion.dev/docs/) for code-driven educational video generation.

## Current target

The first lesson implementation is `L1`, based on:

- `L1/L1_subs.md` for transcript text and timestamps
- `L1/L1_ideas.md` for storyboard and animation direction
- `L1/L1_intro.mp4` as a reference asset

## Planned workflow

1. Store lesson source materials in `L1/`, `L2/`, `L3/`, and similar folders.
2. Parse timestamped markdown into TypeScript data structures for Remotion.
3. Render videos using Remotion compositions and reusable scene components.
4. Preview in Remotion Studio.
5. Export final videos with npm scripts.

## Project status

Active refactor in progress.

## Structure

- Reusable rendering logic lives in `src/components/` and `src/compositions/LessonComposition.tsx`.
- Lesson-specific content lives in `src/content/`. Right now only `src/content/l1.ts` is implemented.
- Source materials remain in `L1/`, `L2/`, `L3/` and similar folders.
- D2 diagram sources live next to lesson assets, for example `L1/flow.d2`.

## Live Preview In Studio

Remotion Studio lets you see the source video and overlays live while editing.

1. Put the source video at `L1/L1_intro.mp4`.
2. Start the studio:

```bash
npm run studio
```

3. In Studio, use one of these compositions:

- `L1Intro`: short intro-only clip for quick iteration.
- `L1Diagram`: flow diagram clip.
- `L1Logits`: logits / probability clip.
- `L1Full`: the full lesson video.

When you edit files in `src/components/`, `src/compositions/`, or `src/content/l1.ts`, Studio reloads and you can inspect the result frame by frame.

## Final Render

To export the final video with all overlays and animations baked into the MP4:

```bash
npm run render:l1
```

That command:

- copies `L1/L1_intro.mp4` into `public/`
- regenerates lesson data
- regenerates the D2 diagram SVG assets
- renders the `L1Full` composition
- writes the final file to `out/L1Full.mp4`

If you want to run the steps manually:

```bash
npm run sync:assets
npm run sync:data
npx remotion render src/index.ts L1Full out/L1Full.mp4
```

## Adding a lesson

1. Add source materials under a lesson folder such as `L2/`.
2. Create a typed lesson definition in `src/content/`.
3. Register that definition in `src/Root.tsx`.
4. Add unit tests for sequence timing and content wiring.

## Diagram Workflow

- Flow diagrams are defined as D2 files such as `L1/flow.d2`.
- `npm run sync:data` also renders those diagrams into SVG assets under `public/generated/`.
- Compositions use the generated SVGs directly, so Studio does not pause to compile D2 at runtime.

## Video Analyzer

There is also a separate TypeScript tool for video analysis under `tools/video-analyzer/`.

Dry-run example:

```bash
npm run analyze:video -- --lesson L1 --input L1/L1_intro.mp4 --dry-run
```

See [docs/VIDEO_ANALYZER.md](/Users/admin/IdeaProjects/AI_testers/docs/VIDEO_ANALYZER.md) for details.
