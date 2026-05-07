# Aidan Avatar PoC

A browser-based frontend proof of concept for **Aidan**, the Runwaize AI coach.

Aidan is a branded, non-human, operational presence for AI interview sessions, campaign result presentations, product UI moments, and future voice-led interactions. The visual direction is based on the Runwaize logo language: minimal geometry, calm motion, restrained expression, and clear state changes.

## Current Scope

This PoC focuses on a reusable 2D character system, not a production talking-head model.

It includes:

- A central animated Aidan avatar
- Manual state controls
- Interview flow demo
- Campaign presentation demo
- Face variation studies
- Lip-sync and mouth movement experiments
- Technology-inspired behavior comparisons
- Light and dark theme support

## Run Locally

```bash
npm install
npm run dev
```

Vite will print the local URL. If the default port is busy, it will choose another available port.

## Build

```bash
npm run build
```

## Stack

- React
- TypeScript
- Vite
- SVG, CSS, and a logo-derived raster reference asset
- No backend
- No heavy avatar or realistic-human dependency

## Main Components

- `AidanAvatar`: Core animated avatar renderer
- `AvatarStateControls`: State, size, theme, and speaking controls
- `ExpressionTechLab`: MuseTalk, LivePortrait, and SadTalker-inspired behavior studies
- `LipSyncLab`: Alternative mouth movement experiments and phrase examples
- `FaceVariationLab`: Logo-derived face direction studies
- `InterviewDemo`: Mock interview sequence with timed state transitions
- `PresentationDemo`: Mock campaign readout with presenter behavior
- `InsightCard`: Reusable presentation insight card

## Avatar States

The supported state type is:

```ts
export type AidanState =
  | "idle"
  | "listening"
  | "questioning"
  | "thinking"
  | "speaking"
  | "acknowledging"
  | "complete"
  | "caution";
```

State intent:

- `idle`: calm neutral expression with soft breathing
- `listening`: attentive focus with subtle listening signal
- `questioning`: inquisitive state with restrained question mark indicators
- `thinking`: slow processing motion and dots
- `speaking`: animated mouth behavior
- `acknowledging`: brief positive nod and soft smile
- `complete`: resolved positive state
- `caution`: calm serious state with restrained amber accent

## Lip-Sync Experiments

The mouth movement lab compares four frontend-only approaches:

- **Soft Smile**: smallest movement, safest for professional UI, but least explicit
- **Viseme Morph**: switches between visible phoneme-inspired shapes, clearest for speech timing
- **Aperture Pulse**: amplitude-driven open/close motion, useful for audio-reactive demos
- **Minimal Presenter**: very restrained mouth motion for campaign readouts

The phrase examples are intentionally simple and use approximate viseme timelines. They are meant for comparing rhythm and visual quality, not for production-grade speech synthesis.

## Technology-Inspired Behavior Directions

The PoC does not run MuseTalk, LivePortrait, or SadTalker locally. Instead, it simulates the interaction style each technology would imply.

### MuseTalk-Style

MuseTalk is represented as an audio-driven lip-sync layer. In this PoC, it emphasizes mouth timing, viseme changes, and amplitude. It is the closest conceptual fit for live voice-led interview sessions where Aidan speaks in real time.

### LivePortrait-Style

LivePortrait is represented as a controllable expression and pose layer. In this PoC, it emphasizes gaze, head tilt, questioning, acknowledgment, and state-driven expression control. It is the strongest fit for Aidan's core UI personality.

### SadTalker-Style

SadTalker is represented as a more composed offline presenter mode. In this PoC, it uses less interactive movement and a more staged rendering feel. It is better suited to prepared campaign readout clips than live product interaction.

Current recommendation: use a **LivePortrait-style expression layer** as the baseline behavior and add **MuseTalk-style lip-sync** for speaking. Keep SadTalker-style rendering as an optional future direction for generated presentation assets.

## Face Variations

The face lab currently includes:

- Rounded Wave
- Orbit
- Halo Frame
- Logo Study
- Small Scale
- Dark Mode

The default direction is the logo-derived rounded wave face. The halo is not shown by default; it is reserved for explicit halo/presentation variants and state-specific animation.

## Assets

Local public assets:

- `public/runwaize.svg`: Runwaize logo used in the page header
- `public/aidan-reference-model.png`: Current reference model for the Aidan face

To replace the avatar model, keep the same transparent-background framing where possible and update `AidanAvatar` if the visual center or mouth alignment changes.

## Design Notes

Aidan should feel calm, intelligent, approachable, professional, trustworthy, focused, and operational.

Aidan should not feel like a toy mascot, children's cartoon, sci-fi robot, fake human, generic chatbot icon, or hyperactive assistant.

The current implementation is intentionally conservative: subtle motion, restrained accents, and clear state readability over exaggerated character animation.
