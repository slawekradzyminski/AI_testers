# L1 Video Implementation Plan

## Goal

Strip all existing animations from the L1 video (they are poor in quality) and focus first on creating a **full-screen, beautiful intro** that sets the tone for the lesson series.

---

## Phase 1: Remove All Animations

### 1.1 Background (`src/components/Background.tsx`)

- Remove grid drift (`translate3d` based on frame)
- Remove orbiting blur orbs (the animated radial gradients)
- Keep a static, clean gradient background

### 1.2 IntroScene (`L1IntroComposition.tsx`)

- Remove title spring-in (`animatedIn`, `translateY`, `scale`)
- Remove gradient line growth (0→520px)
- Remove lower third fade/slide up (`fadeSlide`)
- Remove glass panel card spring-in
- All elements appear static, no motion

### 1.3 All Other Scenes

- **AcronymScene**: Remove letter-spacing expansion, scale, translateY
- **PredictionScene**: Remove token-by-token reveal, spring-in, blinking cursor
- **FlowScene**: Remove gradient bar growth, token chips movement
- **PromptModelScene**: Remove formula spring-in, fade/slide
- **ModelCardsScene**: Remove staggered card spring-in
- **ChatUiScene**: Remove dropdown expand, chip fade, streaming token reveal
- **ImageCardScene**: Remove card spring-in, tilt animation
- **ProbabilityScene**: Remove bar chart growth, checklist stagger, final message fade/slide

### 1.4 Shared Helpers

- Remove or simplify `animatedIn()` usage (elements show at full opacity, no transform)
- Remove or simplify `fadeSlide()` usage

---

## Phase 2: Full-Screen Beautiful Intro

### 2.1 Design Direction

- **Full-screen**: No SceneFrame wrapper for the intro; content fills 1920×1080
- **Typography**: Large, bold, confident title; clear hierarchy
- **Color**: Keep the existing palette (blues, warm accents) but refine for impact
- **Layout**: Centered, generous whitespace, no clutter
- **Lower third**: Presenter name and role, minimal and elegant

### 2.2 Intro Content (0–11 seconds)

- **Title**: "Jak działa LLM?" (or series title)
- **Subtitle**: "Lekcja otwierająca serię"
- **Presenter**: Sławek (lower third)
- **Brand**: AI Testers (subtle)

### 2.3 Visual Approach

- Full bleed background (gradient, no grid or orbs for now)
- Title: large, centered, high contrast
- Subtitle: smaller, below title
- Lower third: bottom-left, glass-style card with avatar and name
- Optional: thin accent line or minimal geometric element for polish

### 2.4 Technical Implementation

- New `IntroScene` that does NOT use `SceneFrame` (full-screen)
- Static layout; no animations
- Reuse `Background` (static version) or create `IntroBackground` if needed
- Keep `LowerThird` component but render it static (no fade/slide)

---

## Phase 3: Future Work (Out of Scope for Now)

- Reintroduce high-quality animations later, scene by scene
- Add transitions between scenes
- Polish remaining scenes (Acronym, Prediction, Flow, etc.)

---

## Deliverables

1. `Background.tsx` – static background, no drift or orbit
2. `L1IntroComposition.tsx` – all scenes static; IntroScene full-screen and beautiful
3. No new dependencies; use existing Remotion/React stack

---

## File Changes Summary

| File | Changes |
|------|---------|
| `src/components/Background.tsx` | Remove `interpolate`, `useCurrentFrame`; static layout |
| `src/compositions/L1IntroComposition.tsx` | Remove all `animatedIn`, `fadeSlide`, `interpolate` usage; redesign IntroScene as full-screen; simplify all other scenes to static |
