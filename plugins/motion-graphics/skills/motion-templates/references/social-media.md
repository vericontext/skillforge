# Social Media Video Templates

Effect components are in the template project (`${CLAUDE_PLUGIN_ROOT}/skills/remotion-project/references/template-project.md`). Do NOT duplicate them here.

## video.config.ts Pattern for Social Media

```ts
import type { VideoConfig } from "./src/lib/config-types";

export const videoConfig: VideoConfig = {
  id: "social-reel",
  format: "portrait",       // 1080x1920 for Reels/TikTok/Shorts
  fps: 30,
  palette: "modern",        // or neon for tech, sunset for lifestyle
  fontFamily: "Inter",
  effects: {
    gradient: { speed: 1 },
    grid: { type: "dots", opacity: 1 },
    particles: { density: 200 },
    lightLeak: { intensity: 0.25 },
  },
  scenes: [
    { title: "Did you know?", durationSeconds: 4, textStyle: "stagger" },
    { title: "Here's the answer", description: "Short punchy description", durationSeconds: 5 },
    { title: "The proof", durationSeconds: 5, stats: [{ label: "Users", value: 10000, suffix: "+" }] },
  ],
  cta: {
    text: "Follow for more!",
    buttonText: "Follow",
    durationSeconds: 4,
  },
  audio: { bgMusic: "audio/bgm.mp3", volume: 0.3 },
};
```

## Key Design Rules

1. Keep text within the center 80% (safe zone for UI overlays) - SceneRenderer handles this with `padding: "10% 8%"`
2. First 3 seconds must hook the viewer - use `textStyle: "stagger"` for bold entrance
3. Font sizes are pre-set at 64px titles / 32px descriptions (optimized for mobile)
4. Limit to 3-5 scenes for 15-second content, 5-8 for 30-60 seconds
5. Always end with a CTA scene

## Safe Zone Guidelines

```
+------------------+
|   Status bar     |  <- Top 5% (avoid)
|                  |
|  +------------+  |
|  |            |  |
|  |  SAFE ZONE |  |  <- Center 80% width, 70% height
|  |  (content) |  |
|  |            |  |
|  +------------+  |
|                  |
|   UI controls    |  <- Bottom 15% (avoid for TikTok/Reels)
|   CTA buttons    |  <- Bottom 5% (platform UI)
+------------------+
```

## Variants

### Text-Only (no images needed)
Just omit `image` from all scenes. The AnimatedGradient + ParticleField + GlowText combination creates a premium look without any images.

### With AI Images
Add `imageGeneration` to config:
```ts
imageGeneration: {
  enabled: true,
  styleAnchor: "vibrant flat illustration, mobile-optimized, bold colors",
  prompts: {
    "slide-1": "Eye-catching hook visual",
    "slide-2": "Product feature illustration",
  },
},
```
Then reference in scenes: `image: "images/slide-1.png"`

### Carousel (horizontal scroll)
For carousel-style content, create multiple short scenes (2-3s each) with quick transitions. The TransitionSeries handles smooth wipe/fade transitions automatically.
