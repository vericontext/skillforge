# Motion Graphics Plugin

Turn a **logo image** into a **branded promo video** with Gemini AI. Also includes manual video composition, animation, and templates with Remotion.

## Flagship: `/promo-video`

**One logo in, full promo video out.**

Gemini Vision analyzes your logo to understand brand colors, style, and mood. Then generates matching background images and renders a 15-22 second branded video — all automatically.

```bash
/promo-video logo.png
/promo-video logo.png --slogan="Build the Future" --purpose=product-launch
/promo-video logo.png --features="AI Powered, Real-time, Enterprise" --format=portrait
```

### How it works

1. Validate logo file (PNG, JPG, SVG)
2. Analyze logo with Gemini Vision (colors, style, mood)
3. Generate custom 5-color palette from brand identity
4. Generate 2-3 scene backgrounds with Gemini Image Generation
5. Create video config with custom palette + images
6. Render MP4 with Remotion

### Requirements

- `GEMINI_API_KEY` environment variable
- Node.js 18+

## Manual Video Creation

For custom videos beyond the promo pipeline:

| Command | Description |
|---------|-------------|
| `/new-video` | Scaffold a new Remotion project |
| `/edit-video` | Modify an existing video conversationally |
| `/change-palette` | Switch color palette |
| `/render` | Render the current composition |
| `/generate-assets` | Generate images with Gemini AI |
| `/analyze-video` | Analyze a video file with Gemini |

## Skills

| Skill | Description |
|-------|-------------|
| `promo-video` | Logo-to-video pipeline with Gemini AI |
| `remotion-project` | Project setup, template, rendering |
| `remotion-animation` | Animation primitives, timing, sequencing |
| `motion-templates` | Template patterns for pipelines and manual use |
| `gemini-media` | AI image generation, image/video understanding |

## Agent

- **video-director** - Orchestrates the full pipeline: logo analysis, palette generation, image generation, scaffolding, rendering. Supports both Pipeline Mode (automated via `/promo-video`) and Creative Mode (interactive via `/new-video`).

## Installation

```bash
# From marketplace
claude plugin install motion-graphics

# Local testing
claude --plugin-dir plugins/motion-graphics
```

## License

MIT
