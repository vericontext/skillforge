# Promo Video Template Patterns

## Standard Promo Config (Logo + Backgrounds)

The canonical config pattern for a logo-based promo video with Gemini-generated palette and backgrounds:

```ts
import type { VideoConfig } from "./src/lib/config-types";

export const videoConfig: VideoConfig = {
  id: "promo-acme-brand",
  format: "landscape",
  fps: 30,
  palette: "modern",  // fallback if customPalette is invalid
  customPalette: {
    primary: "#2563eb",
    secondary: "#7c3aed",
    accent: "#f59e0b",
    highlight: "#60a5fa",
    muted: "#0a1628",
  },
  fontFamily: "Inter",
  energy: "high",
  effects: {
    gradient: { speed: 1.5 },
    grid: { type: "dots", opacity: 0.5 },
    particles: { density: 400, burst: true },
    lightLeak: { intensity: 0.4 },
    flash: true,
    shockwave: true,
  },
  scenes: [
    {
      title: "",
      image: "images/logo.png",
      imageStyle: "contain-center",
      durationSeconds: 5,
      entrance: "zoom",
    },
    {
      title: "Build the Future",
      image: "images/bg-feature.png",
      durationSeconds: 5,
      textStyle: "kinetic",
      entrance: "flash",
    },
    {
      title: "Our Strengths",
      description: "AI Powered, Real-time, Enterprise",
      image: "images/bg-feature.png",
      durationSeconds: 7,
      textStyle: "stagger",
      entrance: "slide-up",
    },
  ],
  cta: {
    text: "Get Started Today",
    buttonText: "Learn More",
    durationSeconds: 5,
  },
  imageGeneration: {
    enabled: true,
    styleAnchor: "minimal tech aesthetic, clean modern, #2563eb and #f59e0b, soft gradients",
    prompts: {
      "bg-feature": "Abstract background with subtle geometric shapes and soft light rays, professional and modern feel",
      "bg-cta": "Energetic abstract background with flowing light particles and dynamic motion",
    },
  },
  metadata: {
    source: "logo",
    generatedAt: "2026-03-06T12:00:00.000Z",
    inputPath: "logo.png",
  },
};
```

## Variation: Minimal Promo (Logo + CTA only)

For short brand intros or video openers (10 seconds):

```ts
export const videoConfig: VideoConfig = {
  id: "promo-minimal",
  format: "landscape",
  fps: 30,
  palette: "modern",
  customPalette: { /* from logo analysis */ },
  fontFamily: "Inter",
  energy: "moderate",
  effects: {
    gradient: { speed: 1.0 },
    particles: { density: 300, burst: true },
    lightLeak: { intensity: 0.3 },
    shockwave: true,
  },
  scenes: [
    {
      title: "",
      image: "images/logo.png",
      imageStyle: "contain-center",
      durationSeconds: 5,
      entrance: "zoom",
    },
  ],
  cta: {
    text: "Innovation Made Simple",
    durationSeconds: 5,
  },
};
```

## Variation: Portrait (Social Media)

For Instagram Reels, TikTok, YouTube Shorts:

```ts
export const videoConfig: VideoConfig = {
  id: "promo-social",
  format: "portrait",
  fps: 30,
  palette: "modern",
  customPalette: { /* from logo analysis */ },
  fontFamily: "Inter",
  energy: "high",
  effects: {
    gradient: { speed: 1.8 },
    grid: { type: "dots", opacity: 0.4 },
    particles: { density: 500, burst: true },
    lightLeak: { intensity: 0.45 },
    flash: true,
    shockwave: true,
  },
  scenes: [
    {
      title: "",
      image: "images/logo.png",
      imageStyle: "contain-center",
      durationSeconds: 4,
      entrance: "zoom",
    },
    {
      title: "Next Level",
      image: "images/bg-feature.png",
      durationSeconds: 4,
      textStyle: "kinetic",
      entrance: "flash",
    },
  ],
  cta: {
    text: "Follow Us",
    buttonText: "Link in Bio",
    durationSeconds: 4,
  },
};
```

## Purpose-Based Effects

Different purposes call for different visual energy:

| Purpose | Energy | Gradient Speed | Particles | Light Leak | Flash | Entrance |
|---------|--------|---------------|-----------|------------|-------|----------|
| brand-intro | moderate | 1.0-1.2 | 350, burst | 0.3 | yes | zoom |
| product-launch | high | 1.5-1.8 | 450, burst | 0.4 | yes | flash |
| event | high | 1.8-2.0 | 500, burst | 0.5 | yes | flash |
| hiring | moderate | 1.2-1.5 | 350, burst | 0.35 | yes | slide-up |
| general | moderate | 1.0-1.2 | 300, burst | 0.3 | no | zoom |

## Purpose-Based CTA Mapping

| Purpose | CTA Text Pattern | Button Text |
|---------|-----------------|-------------|
| brand-intro | "Discover {brandName}" | "Learn More" |
| product-launch | "Available Now" | "Get Started" |
| event | "Join Us" | "Register" |
| hiring | "We're Hiring" | "Apply Now" |
| general | "Learn More" | "Visit" |

## Scene Building Rules

### Logo Reveal Scene (always first)
- `title: ""` (empty - the logo IS the content)
- `image: "images/logo.png"`
- `imageStyle: "contain-center"`
- `entrance: "zoom"` — logo scales in with overshoot spring + slight rotation
- `durationSeconds: 5`
- Automatic shockwave rings, particle burst, flash overlay, and pulsing glow on logo

### Tagline Scene
- `title: slogan || analysis.suggestedTagline`
- `image: "images/bg-feature.png"` (Gemini-generated)
- `textStyle: "kinetic"` — words fly in from random directions for maximum impact
- `entrance: "flash"` — bright flash + scale-in
- `durationSeconds: 5`

### Features Scene (optional)
- Only include if user provides `--features`
- `title: "Our Strengths"` or similar
- `description: features.join(", ")`
- `textStyle: "stagger"` — words animate in sequence
- `entrance: "slide-up"` — content slides up with spring
- `image: "images/bg-feature.png"` (reuse background)
- `durationSeconds: 7` (longer to read features)

### CTA Scene
- Text uses KineticText (words fly in from all directions)
- Button has rotating gradient, stronger pulse, dual glow
- Shockwave + flash on entry
- `durationSeconds: 5`

## Image Generation Prompt Patterns

### Style Anchor Format
```
"{styleClassification} aesthetic, {moodKeywords.join(', ')}, color palette: {primary} and {accent}, {backgroundSuggestion}"
```

### Background Prompts

For feature backgrounds:
```
"Abstract background with subtle geometric shapes and soft light rays, professional and modern feel, no text, no logos"
```

For CTA backgrounds:
```
"Energetic abstract background with flowing light particles and dynamic motion, vibrant and engaging, no text, no logos"
```

Always append "no text, no logos" to prevent Gemini from adding text to generated images.
