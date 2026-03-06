---
name: remotion-project
description: This skill should be used when the user asks to "create a video project", "set up Remotion", "configure video settings", "render a video", "export video", or discusses Remotion project structure, video codecs, rendering options, fps settings, resolution configuration, or video output formats.
version: 1.0.0
---

# Remotion Project Setup and Rendering

This skill covers creating, configuring, and rendering Remotion video projects. Remotion is a React framework for creating videos programmatically with code.

## Config-Driven Architecture

**The template project uses a config-driven approach.** All customization happens in a single file: `video.config.ts`. Effect components, compositions, and renderers are pre-built in the template - never write them from scratch.

**Key principle: `video.config.ts` is the ONLY file to customize.** It controls palette, scenes, text, timing, effects, and image generation. The `SceneRenderer` component reads this config and automatically composes all visual layers.

See `${CLAUDE_PLUGIN_ROOT}/skills/remotion-project/references/template-project.md` for the complete boilerplate with all files.

## Project Creation

**IMPORTANT: `npx create-video@latest` is an interactive CLI that requires user input and cannot be run non-interactively.** Instead, use the template project:

1. Create the directory and install dependencies:

```bash
mkdir my-video && cd my-video
npm init -y
npm install remotion @remotion/cli @remotion/bundler @remotion/renderer @remotion/transitions react react-dom zod
npm install -D typescript @types/react
```

2. Copy all files from the template project reference (`template-project.md`). This includes effects, compositions, config types, and a sample `video.config.ts`.

3. Customize only `video.config.ts` with your scenes, palette, and settings.

See `${CLAUDE_PLUGIN_ROOT}/skills/remotion-project/references/project-setup.md` for additional configuration details.

## Project Structure Overview

A config-driven Remotion project follows this layout:

```
my-video/
├── src/
│   ├── Root.tsx              # Auto-registers compositions from config
│   ├── index.ts              # Remotion entry file
│   ├── compositions/
│   │   └── SceneRenderer.tsx # Config-driven universal renderer
│   ├── components/effects/   # 10 pre-built effect components
│   └── lib/config-types.ts   # VideoConfig type definition
├── public/                   # Static assets (images, fonts, audio)
├── video.config.ts           # THE ONLY FILE TO CUSTOMIZE
├── remotion.config.ts
├── package.json
└── tsconfig.json
```

## Root.tsx - Composition Registration

The `Root.tsx` file registers all compositions using the `<Composition>` component:

```tsx
import { Composition } from "remotion";
import { MyComp } from "./compositions/MyComp";
import { myCompSchema } from "./compositions/schema";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComp}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema}
        defaultProps={{
          title: "Hello World",
        }}
      />
    </>
  );
};
```

Key properties of `<Composition>`:
- `id` - Unique identifier used for rendering
- `component` - React component to render
- `durationInFrames` - Total video length in frames
- `fps` - Frames per second (30 or 60 typical)
- `width` / `height` - Resolution in pixels
- `schema` - Zod schema for type-safe input props
- `defaultProps` - Default values for input props

## Configuration Essentials

### FPS and Duration

To calculate duration from seconds: `durationInFrames = seconds * fps`. For a 5-second video at 30fps: `durationInFrames = 150`.

Common fps values:
- 24fps - cinematic feel
- 30fps - standard web video
- 60fps - smooth motion, UI animations

### Resolution Presets

| Format | Width | Height | Aspect Ratio |
|--------|-------|--------|-------------|
| Full HD | 1920 | 1080 | 16:9 |
| 4K | 3840 | 2160 | 16:9 |
| Instagram Square | 1080 | 1080 | 1:1 |
| Instagram Story / TikTok | 1080 | 1920 | 9:16 |
| YouTube Shorts | 1080 | 1920 | 9:16 |

See `${CLAUDE_PLUGIN_ROOT}/skills/remotion-project/references/composition-config.md` for detailed configuration patterns including dynamic duration and calculated compositions.

## Remotion Studio (Preview)

To launch the interactive preview in the browser:

```bash
npx remotion studio
```

Studio provides real-time preview, timeline scrubbing, and input prop editing. It hot-reloads as you edit code. Use Studio during development to iterate on compositions quickly.

## Rendering

Remotion supports two rendering approaches: CLI and programmatic.

### CLI Rendering

```bash
# Render to MP4 (H.264)
npx remotion render src/index.ts MyComp out/video.mp4

# Render specific frame range
npx remotion render src/index.ts MyComp out/video.mp4 --frames=0-89

# Render with custom props
npx remotion render src/index.ts MyComp out/video.mp4 --props='{"title":"Custom"}'
```

### Programmatic Rendering

```tsx
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";

const bundled = await bundle({
  entryPoint: "./src/index.ts",
});

const composition = await selectComposition({
  serveUrl: bundled,
  id: "MyComp",
});

await renderMedia({
  composition,
  serveUrl: bundled,
  codec: "h264",
  outputLocation: "out/video.mp4",
});
```

### Codecs and Formats

| Codec | Extension | Use Case |
|-------|-----------|----------|
| `h264` | .mp4 | Universal playback, web |
| `h265` | .mp4 | Smaller file, modern devices |
| `vp8` / `vp9` | .webm | Web-native, open format |
| `prores` | .mov | Professional editing |
| `gif` | .gif | Short loops, social |

Additional rendering options:
- `--concurrency` - Number of parallel renders (default: half CPU cores)
- `--quality` - JPEG quality for frames (0-100)
- `--scale` - Scale factor (0.5 = half resolution for testing)
- `--muted` - Skip audio encoding

See `${CLAUDE_PLUGIN_ROOT}/skills/remotion-project/references/rendering.md` for advanced rendering patterns including Lambda rendering, still image export, and audio-only rendering.

## Input Props with Zod Schemas

To define type-safe, validated input props, use Zod schemas:

```tsx
import { z } from "zod";

export const myCompSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  backgroundColor: z.string().default("#000000"),
  showLogo: z.boolean().default(true),
});

type MyCompProps = z.infer<typeof myCompSchema>;
```

This enables Remotion Studio's visual prop editor and ensures type safety when rendering with custom props via CLI or API.

## Static Assets

Place images, fonts, audio, and other static files in the `public/` directory. Reference them using `staticFile()`:

```tsx
import { staticFile, Img, Audio } from "remotion";

// Image
<Img src={staticFile("logo.png")} />

// Audio
<Audio src={staticFile("bgm.mp3")} />
```

For dynamically generated assets (e.g., from Gemini), save them to `public/` before rendering and reference them the same way.

## Styling: Use Inline Styles

**IMPORTANT: Always use inline `style={{}}` for all styling in Remotion compositions.** TailwindCSS and CSS classes can fail silently in Remotion's bundler, causing elements to render invisibly. Inline styles are the only reliable approach:

```tsx
// CORRECT - inline styles always work
<div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontSize: 72 }}>
  Hello
</div>

// WRONG - CSS classes may not load in Remotion's bundler
<div className="flex justify-center items-center text-white text-7xl">
  Hello
</div>
```

This applies to all layout, color, typography, and animation styles. Never rely on external CSS for visual output in compositions.

## Visual Effects (Template-Included)

All 10 premium visual effect components are pre-built in the template project. **NEVER write effect components from scratch.** Copy them from `${CLAUDE_PLUGIN_ROOT}/skills/remotion-project/references/template-project.md`.

The `SceneRenderer` automatically layers effects for every scene:
1. AnimatedGradient (background) - palette colors
2. AnimatedGrid (texture) - configurable dots/lines
3. Image layer (if scene has `image` field)
4. ParticleField (depth) - configurable density
5. LightLeak (cinematic) - alternating positions
6. Content in GlassmorphismCard (GlowText/StaggerText + stats)

All effect parameters are controlled via `video.config.ts`:
- `palette` - one of 5 presets (modern/sunset/ocean/neon/forest)
- `effects.gradient.speed` - gradient animation speed
- `effects.grid.type` - "dots" or "lines"
- `effects.particles.density` - particle count (100-800)
- `effects.lightLeak.intensity` - light leak strength (0-1)

See `${CLAUDE_PLUGIN_ROOT}/skills/remotion-animation/references/visual-effects.md` for individual effect component API details.

## Best Practices

1. **Always use inline styles** - never CSS classes for layout, color, or typography
2. **Always use the template project** - copy from `template-project.md`, never write effects from scratch
3. **Customize only `video.config.ts`** - scenes, palette, timing, effects all go here
4. **Image generation is optional** - set `imageGeneration.enabled: true` only when needed; default gradient+particle backgrounds look premium without images
5. Test with `--scale=0.5` for faster iteration, render at full scale for final output
6. Use environment variables for API keys (never hardcode them)
7. Set up projects manually (not `create-video` CLI) for non-interactive automation
