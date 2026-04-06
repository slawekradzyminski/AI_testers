# AI Testers Video Project

This repository is a small Remotion project focused on one lesson only: `L5`.

## Current scope

- source asset: `L5/attention.mp4`
- transcript source: `L5/attention.srt`
- active compositions:
  - `L5Intro`
  - `L5MechanizmyTransformera`
  - `L5Full`

The current implementation intentionally stays minimal:

- a lesson intro card
- one simple Transformer scene showing:
  - `Mechanizm atencji`
  - `Sieć neuronowa`

## Run Studio

```bash
npm run studio:l5
```

This copies `L5/attention.mp4` into `public/` and opens Remotion Studio.

## Active files

- [`src/content/l5.ts`](/Users/admin/IdeaProjects/AI_testers/src/content/l5.ts) - L5 lesson definition
- [`src/components/LessonIntro.tsx`](/Users/admin/IdeaProjects/AI_testers/src/components/LessonIntro.tsx) - intro slide
- [`src/components/MechanismComparisonSlide.tsx`](/Users/admin/IdeaProjects/AI_testers/src/components/MechanismComparisonSlide.tsx) - Transformer mechanisms slide
- [`src/compositions/LessonComposition.tsx`](/Users/admin/IdeaProjects/AI_testers/src/compositions/LessonComposition.tsx) - full lesson composition
- [`src/Root.tsx`](/Users/admin/IdeaProjects/AI_testers/src/Root.tsx) - registered compositions

## Quality checks

```bash
npm run typecheck
npm run test
```
