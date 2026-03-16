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

Bootstrap in progress.

The next step is to add the Remotion project structure, dependencies, and the first `L1` composition.
