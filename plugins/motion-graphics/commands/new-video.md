---
name: new-video
description: Scaffold a new Remotion video project with premium visual effects using the template project
---

# /new-video - Create a New Video Project

Scaffold a new Remotion video project using the config-driven template. All effects are pre-built - you only customize `video.config.ts`.

## Steps

1. Ask the user for:
   - **Project name** (kebab-case, e.g., `product-demo`)
   - **Video format**: landscape 16:9 (1920x1080), portrait 9:16 (1080x1920), or square 1:1 (1080x1080)
   - **Duration** in seconds
   - **Color palette**: modern, sunset, ocean, neon, or forest (default: modern)
   - **Generate AI images?** (default: No - gradient+particle backgrounds look premium without images)

2. **IMPORTANT: Do NOT use `npx create-video@latest` - it is interactive and will hang.** Set up the project:
   ```bash
   mkdir <project-name> && cd <project-name>
   npm init -y
   npm install remotion @remotion/cli @remotion/bundler @remotion/renderer @remotion/transitions react react-dom zod
   npm install -D typescript @types/react
   ```

3. **Copy ALL files from the template project reference.** Read `${CLAUDE_PLUGIN_ROOT}/skills/remotion-project/references/template-project.md` and create every file listed:
   - `src/index.ts`, `src/Root.tsx`
   - `src/lib/config-types.ts`
   - `src/components/effects/` - ALL 10 effect files + barrel export + palettes
   - `src/compositions/SceneRenderer.tsx`
   - `remotion.config.ts`, `tsconfig.json`

   **CRITICAL: Copy these files VERBATIM. Never modify effect components or SceneRenderer.**

4. **Write `video.config.ts`** - this is the ONLY custom file. Based on user input, create scenes with titles, descriptions, timing, and optional stats.

5. If the user wants AI images, also install `@google/genai` and create the image generation script from the template reference.

6. **CRITICAL: All compositions use inline `style={{}}` for all styling.** This is already handled by the template components - do not override with CSS classes.

7. Create a `.env` file template (only if image generation is enabled):
   ```
   GEMINI_API_KEY=your-api-key-here
   ```

8. Print next steps:
   - `npx remotion studio` to preview
   - "Edit `video.config.ts` to customize scenes, palette, timing, and effects"
   - Available palettes: Modern (purple/cyan), Sunset (orange/red), Ocean (blue/teal), Neon (purple/pink), Forest (green)
   - "Use `/edit-video` to make changes conversationally"
   - "Use `/change-palette` to quickly switch color schemes"

## Example video.config.ts

```ts
import type { VideoConfig } from "./src/lib/config-types";

export const videoConfig: VideoConfig = {
  id: "ai-product-launch",
  format: "portrait",
  fps: 30,
  palette: "neon",
  fontFamily: "Inter",
  effects: {
    gradient: { speed: 1 },
    grid: { type: "dots", opacity: 1 },
    particles: { density: 300 },
    lightLeak: { intensity: 0.3 },
  },
  scenes: [
    {
      title: "The Future is Here",
      durationSeconds: 5,
      textStyle: "stagger",
    },
    {
      title: "Introducing AI Assistant",
      description: "Your intelligent workflow companion",
      durationSeconds: 7,
      textStyle: "glow",
    },
    {
      title: "Proven Results",
      description: "Trusted by teams worldwide",
      durationSeconds: 6,
      stats: [
        { label: "Faster", value: 10, suffix: "x" },
        { label: "Users", value: 50000, suffix: "+" },
      ],
    },
  ],
  cta: {
    text: "Try It Free Today",
    buttonText: "Get Started",
    durationSeconds: 5,
  },
};
```

Use the remotion-project skill's template-project reference for all boilerplate files.
