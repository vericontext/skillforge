---
name: change-palette
description: Quickly change the color palette of a video project
---

# /change-palette - Quick Palette Change

Quickly switch the color palette of an existing video project. Changes a single field in `video.config.ts`.

## Steps

1. Read the current `video.config.ts` and identify the current palette
2. Show available palettes:
   - **modern** - Purple/Cyan (#6366f1, #8b5cf6, #ec4899, #06b6d4) - Tech, startup, professional
   - **sunset** - Orange/Red (#f97316, #ef4444, #fbbf24, #fb923c) - Food, lifestyle, energetic
   - **ocean** - Blue/Teal (#0ea5e9, #6366f1, #14b8a6, #38bdf8) - Healthcare, finance, calm
   - **neon** - Purple/Pink/Cyan (#a855f7, #ec4899, #22d3ee, #facc15) - Gaming, music, vibrant
   - **forest** - Green/Teal (#22c55e, #14b8a6, #84cc16, #a3e635) - Nature, eco, organic
3. Ask the user to pick one (or accept from their message)
4. Update the `palette` field in `video.config.ts`
5. Confirm the change

## Example

```
Current palette: modern (Purple/Cyan)

Available palettes:
  modern  - Purple/Cyan, professional
  sunset  - Orange/Red, energetic
  ocean   - Blue/Teal, calm
  neon    - Purple/Pink/Cyan, vibrant
  forest  - Green/Teal, organic

Which palette would you like?
```

User: "neon"

→ Change `palette: "modern"` to `palette: "neon"` in video.config.ts

This affects all scenes automatically - AnimatedGradient, ParticleField colors, GlowText colors, GlassmorphismCard borders, LightLeak colors, and CTA button gradients all update from the single palette change.
