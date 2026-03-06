# Explainer Video Template

Effect components are in the template project (`${CLAUDE_PLUGIN_ROOT}/skills/remotion-project/references/template-project.md`). Do NOT duplicate them here.

## video.config.ts Pattern for Explainer Videos

```ts
import type { VideoConfig } from "./src/lib/config-types";

export const videoConfig: VideoConfig = {
  id: "explainer-video",
  format: "landscape",      // 1920x1080
  fps: 30,
  palette: "modern",
  fontFamily: "Inter",
  effects: {
    gradient: { speed: 1 },
    grid: { type: "dots", opacity: 1 },
    particles: { density: 150 },
    lightLeak: { intensity: 0.25 },
  },
  scenes: [
    {
      title: "The Problem",
      description: "Teams spend hours creating reports manually every week",
      durationSeconds: 8,
      textStyle: "glow",
      stats: [{ label: "Hours wasted/week", value: 5, suffix: "h" }],
    },
    {
      title: "Meet ReportBot",
      description: "Automated reporting that saves 10 hours per week",
      durationSeconds: 10,
      textStyle: "glow",
      stats: [
        { label: "Time saved", value: 10, suffix: "h" },
        { label: "Accuracy", value: 99, suffix: "%" },
      ],
    },
    {
      title: "How It Works",
      description: "Connect your data source, pick a template, and share with your team",
      durationSeconds: 10,
      textStyle: "glow",
    },
  ],
  cta: {
    text: "Start Free Today",
    buttonText: "Get Started",
    durationSeconds: 6,
  },
  audio: { bgMusic: "audio/bgm.mp3", volume: 0.15 },
};
```

## Explainer Video Workflow

1. **Define scene content** - break the story into Problem → Solution → How → CTA
2. **Configure scenes** in video.config.ts with titles, descriptions, stats
3. **Optional: Generate images** - add `imageGeneration` config and reference images in scenes
4. **Preview** - `npx remotion studio`
5. **Render** - `npx remotion render src/index.ts Main out/explainer.mp4`

## Scene Patterns

### Problem/Solution
- Short title (2-4 words)
- Description explaining the pain point
- Stats showing the impact

### Feature Highlight
- Feature name as title
- Brief description
- Optional stats for quantifiable benefits

### Intro/Outro
- Use `textStyle: "stagger"` for dramatic entrance
- Use CTA config for the outro with animated button

## With AI Images

```ts
imageGeneration: {
  enabled: true,
  styleAnchor: "modern flat illustration, soft gradients, tech startup aesthetic, 16:9",
  prompts: {
    "scene-problem": "A frustrated person surrounded by spreadsheets and papers",
    "scene-solution": "A clean dashboard with colorful charts, happy person relaxing",
    "scene-how": "Three steps shown as floating cards: connect, customize, share",
  },
},
scenes: [
  { title: "The Problem", image: "images/scene-problem.png", ... },
  { title: "Meet ReportBot", image: "images/scene-solution.png", ... },
  { title: "How It Works", image: "images/scene-how.png", ... },
],
```

## Duration Guidelines

| Video Length | Scenes | Per Scene |
|-------------|--------|-----------|
| 30 seconds | 3-4 | 6-8s |
| 60 seconds | 4-6 | 8-12s |
| 90 seconds | 5-7 | 10-15s |
| 120 seconds | 6-8 | 12-18s |
