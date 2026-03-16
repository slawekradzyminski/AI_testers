# Implementation Plan

## Goal

Build this repository as a Node.js + Remotion project that can turn lesson transcripts and structured lesson metadata into rendered educational videos.

The first implementation target is `L1`, using:

- `L1/L1_subs.md` as the transcript and timing source
- `L1/L1_ideas.md` as the scene and motion direction
- `L1/L1_intro.mp4` as the source reference video

## Immediate scope

1. Bootstrap a Remotion project in this repository.
2. Keep the project TypeScript-first.
3. Create a clean data model for lesson inputs.
4. Implement the first lesson composition for `L1`.
5. Make local preview and render commands work from Node/npm scripts.

## Proposed architecture

### App structure

- `src/index.ts`
  Registers the Remotion root.
- `src/Root.tsx`
  Registers compositions.
- `src/compositions/`
  Lesson-level and reusable video compositions.
- `src/components/`
  Shared visual building blocks such as title cards, token streams, diagrams, callouts, and lower thirds.
- `src/data/`
  Normalized lesson data derived from repository inputs.
- `src/lib/`
  Utility functions for timing, transcript mapping, scene creation, and styling constants.
- `public/`
  Static assets used by Remotion.

### Lesson pipeline

1. Source files live under `L1/`, `L2/`, etc.
2. We normalize lesson data into app-friendly TypeScript modules.
3. A composition receives lesson props and derives scene timing.
4. Reusable scene components render motion graphics based on transcript segments and storyboard ideas.
5. Remotion Studio is used for iteration, and CLI render commands produce final outputs.

## L1 implementation plan

### Phase 1

- Set up the project with Remotion `4.0.436`.
- Add baseline npm scripts for studio, render, lint, and typecheck.
- Create a first `L1Intro` composition.
- Encode the transcript and storyboard as structured data.

### Phase 2

- Implement the opening title scene.
- Implement LLM acronym and definition scene.
- Implement token prediction / token streaming scene.
- Implement input -> tokenization -> transformer -> output scene.
- Implement prompt + model scene.
- Implement probability / chaos closing scene.

### Phase 3

- Add polish: transitions, typography, color system, spacing, and timing adjustments.
- Add audio/video reference integration where useful.
- Add render presets for quick previews and full exports.

## Working assumptions

- The timestamped markdown is the primary timing and narrative source for L1.
- `L1_ideas.md` is a storyboard direction document, not a strict frame-accurate edit list.
- Initial work will favor a clean, editable motion-graphics composition over perfect replication of the existing MP4.
- Additional transcripts will arrive later and should fit the same data model.

## Deliverables for this bootstrap

- `README.md`
- Remotion/Node project scaffold
- Initial lesson composition for `L1`
- Structured lesson data loader/modules
- Verified local commands for preview and render
