# Logo Reveal Templates

Effect components are in the template project (`${CLAUDE_PLUGIN_ROOT}/skills/remotion-project/references/template-project.md`). Do NOT duplicate them here.

## video.config.ts Pattern for Logo Reveals

Logo reveals use a minimal config - typically 1-2 short scenes:

```ts
import type { VideoConfig } from "./src/lib/config-types";

export const videoConfig: VideoConfig = {
  id: "logo-reveal",
  format: "landscape",      // or "square" for social
  fps: 30,
  palette: "neon",          // neon looks great for logo reveals
  fontFamily: "Inter",
  effects: {
    gradient: { speed: 1.5 },    // faster gradient for dramatic feel
    grid: { type: "dots", opacity: 0.5 },
    particles: { density: 500 },  // higher density for logo reveals
    lightLeak: { intensity: 0.4 }, // stronger light leaks
  },
  scenes: [
    {
      title: "",                   // empty title - logo image is the focus
      image: "images/logo.png",
      durationSeconds: 4,
    },
    {
      title: "Innovation Redefined",
      durationSeconds: 3,
      textStyle: "stagger",
    },
  ],
};
```

## Logo Reveal Styles

The SceneRenderer handles basic logo reveals with the image layer + effects. For specialized reveal animations (particle convergence, glitch, draw), the full implementations are in `${CLAUDE_PLUGIN_ROOT}/skills/remotion-animation/references/visual-effects.md`.

### Simple (Config-Only)
- Place logo in `public/images/logo.png`
- Reference as `image: "images/logo.png"` in scene
- The parallax zoom + gradient overlay creates a cinematic reveal

### Advanced Reveal Styles
For particle convergence, glitch, or draw effects, create a custom composition that imports from the effects library. These go beyond what the config-driven SceneRenderer provides.

## Duration Guidelines

| Style | Recommended Duration |
|-------|---------------------|
| Simple scale | 3-5 seconds |
| Particle convergence | 4-6 seconds |
| Glitch reveal | 3-5 seconds |
| With tagline | 5-8 seconds |

## Tips

- Use `palette: "neon"` for tech brands, `"sunset"` for warm brands, `"ocean"` for corporate
- Higher particle density (500+) creates a more dramatic backdrop
- Stronger light leak (0.4+) adds cinematic flair
- Keep taglines short - 2-4 words maximum
- Use PNG with transparent background for logos
