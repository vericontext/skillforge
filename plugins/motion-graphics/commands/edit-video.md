---
name: edit-video
description: Edit an existing video project by modifying video.config.ts based on user instructions
---

# /edit-video - Edit Video Configuration

Modify an existing video project's `video.config.ts` based on natural language instructions. All changes happen in this single file.

## Steps

1. Read the current `video.config.ts` from the project directory
2. Understand the user's requested change
3. Modify the appropriate field(s) in the config
4. Show a summary of what changed

## Supported Changes

### Palette
- "change palette to sunset" → update `palette` field
- "make it more vibrant" → switch to "neon"
- "use calmer colors" → switch to "ocean"

### Timing
- "make it 45 seconds" → redistribute `durationSeconds` across scenes proportionally
- "make the first scene longer" → increase that scene's `durationSeconds`
- "speed up the transitions" → shorten scene durations

### Scenes
- "add a scene about pricing" → append to `scenes` array
- "remove the last scene" → remove from `scenes` array
- "change the title of scene 2" → update `scenes[1].title`
- "add stats to scene 3" → add `stats` array to `scenes[2]`

### Effects
- "more particles" → increase `effects.particles.density`
- "reduce the light leak" → decrease `effects.lightLeak.intensity`
- "use a line grid instead of dots" → change `effects.grid.type` to "lines"
- "faster gradient" → increase `effects.gradient.speed`

### Text Style
- "use stagger text for all titles" → set `textStyle: "stagger"` on all scenes
- "make titles glow" → set `textStyle: "glow"` on all scenes

### Format
- "make it vertical" → change `format` to "portrait"
- "make it square" → change `format` to "square"
- "change to 60fps" → update `fps`

### CTA
- "change the button text" → update `cta.buttonText`
- "remove the CTA" → remove `cta` field
- "add a call to action" → add `cta` object

### Images
- "add AI images" → set `imageGeneration.enabled: true` and create prompts
- "remove images" → remove `imageGeneration` or set `enabled: false`

## Example

User: "Add a pricing scene with stats and change the palette to ocean"

Before:
```ts
palette: "modern",
scenes: [
  { title: "Welcome", durationSeconds: 5 },
  { title: "Features", durationSeconds: 5 },
],
```

After:
```ts
palette: "ocean",
scenes: [
  { title: "Welcome", durationSeconds: 5 },
  { title: "Features", durationSeconds: 5 },
  {
    title: "Simple Pricing",
    description: "Plans that scale with your team",
    durationSeconds: 6,
    textStyle: "glow",
    stats: [
      { label: "Free tier", value: 0, suffix: "$" },
      { label: "Pro", value: 29, suffix: "$/mo" },
    ],
  },
],
```

After editing, remind the user to run `npx remotion studio` to preview changes.
