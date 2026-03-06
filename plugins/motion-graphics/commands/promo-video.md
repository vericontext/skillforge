---
name: promo-video
description: Create a branded promo video from a logo image using Gemini AI
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
agent: video-director
---

# /promo-video

Create a branded promotional video from a single logo image. Gemini AI analyzes the logo to extract brand identity, generates matching background images, and renders a complete promo video with Remotion.

## Usage

```
/promo-video <logo-path> [--slogan="..."] [--purpose=brand-intro] [--format=landscape]
```

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `logo-path` | (required) | Path to the logo image file (PNG, JPG, SVG) |
| `--slogan` | auto-generated | Tagline/slogan text for the video |
| `--purpose` | `brand-intro` | Video purpose: brand-intro, product-launch, event, hiring, general |
| `--features` | none | Comma-separated feature list (adds a features scene) |
| `--format` | `landscape` | Output format: landscape, portrait, square |
| `--output` | `out/promo.mp4` | Output file path |

## Examples

```bash
# Basic - logo only, everything auto-generated
/promo-video logo.png

# With custom slogan
/promo-video assets/logo.png --slogan="Build the Future"

# Product launch with features
/promo-video logo.png --slogan="Next Gen Platform" --purpose=product-launch --features="AI Powered, Real-time, Enterprise Ready"

# Portrait format for social media
/promo-video logo.png --format=portrait --purpose=general

# Custom output path
/promo-video brand/logo.svg --output=videos/brand-intro.mp4
```

## Requirements

- `GEMINI_API_KEY` environment variable must be set
- Node.js 18+

## Pipeline

1. Validate logo file exists and is a supported format
2. Analyze logo with Gemini Vision (brand colors, style, mood)
3. Generate custom color palette from analysis
4. Generate 2-3 scene background images with Gemini
5. Create video.config.ts with customPalette + generated images
6. Scaffold Remotion project (or reuse existing)
7. Render to MP4

## Output

- MP4 video file (15-22 seconds depending on scene count)
- Scene images in `public/images/`
- Reusable `video.config.ts` for further customization
