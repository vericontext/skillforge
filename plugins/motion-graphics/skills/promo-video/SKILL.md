---
name: promo-video
description: This skill should be used when the user asks to "create a promo video from a logo",
  "make a brand video", "generate a promotional video", "create a video from my logo",
  "brand intro video", or discusses logo-based video generation, brand identity video,
  promotional content from logo, or turning a logo into a video.
version: 1.0.0
---

# Promo Video - Logo to Branded Video Pipeline

Turn a single logo image into a complete branded promotional video using Gemini AI for vision analysis and image generation, then Remotion for rendering.

**Pipeline: Logo image -> Gemini Vision analysis -> Custom palette + backgrounds -> Promo video render**

## Prerequisites

- `GEMINI_API_KEY` environment variable must be set
- Node.js 18+
- Logo image file (PNG, JPG, or SVG)

## Pipeline Steps

### Step 1: Input Validation

Verify the logo file exists and is a supported format (png, jpg, jpeg, svg, webp). Copy the logo to `public/images/logo.png` in the project directory. If the file is SVG, inform the user that Gemini Vision works best with rasterized images and suggest converting to PNG first (e.g. using Inkscape or an online tool).

### Step 2: Gemini Vision Analysis

Use `gemini-2.0-flash` to analyze the logo and extract brand identity. Send the logo image with the analysis prompt from `${CLAUDE_PLUGIN_ROOT}/skills/promo-video/references/logo-analysis.md`.

The response should be a JSON object with:
- `brandName` - detected or inferred brand name
- `dominantColors` - 3 hex color codes
- `styleClassification` - minimal/bold/playful/luxury/tech/organic
- `moodKeywords` - 3-5 adjectives describing the brand feel
- `suggestedIndustry` - inferred industry
- `fontStyle` - geometric-sans/humanist-sans/serif/slab/mono/display
- `backgroundSuggestion` - description for background generation
- `contrastColor` - hex color that contrasts well with dominant colors
- `suggestedTagline` - a short tagline for the brand

**Error handling:** If JSON parsing fails, retry once. If it fails again, fall back to the "modern" preset palette with generic defaults.

### Step 3: Custom Palette Generation

Map extracted colors to the 5-slot palette structure using the rules in `${CLAUDE_PLUGIN_ROOT}/skills/promo-video/references/brand-palette.md`.

```ts
customPalette: {
  primary: dominantColors[0],
  secondary: dominantColors[1],
  accent: contrastColor,
  highlight: dominantColors[2],
  muted: darkenToBackground(dominantColors[0]),  // HSL: keep hue, sat 25-35%, lightness 8-12%
}
```

### Step 4: Style Anchor Generation

Compose a style anchor string from the analysis results:

```
"{styleClassification} aesthetic, {moodKeywords joined}, color palette: {primary} and {accent}, {backgroundSuggestion}"
```

This anchor is used as a prefix for all Gemini image generation prompts to ensure visual consistency.

### Step 5: Background Image Generation

Use `gemini-2.0-flash-exp` with image generation modality to create 2-3 scene background images. Save to `public/images/`.

Generate images for:
- `bg-feature.png` - Abstract background matching the brand aesthetic for feature/tagline scenes
- `bg-cta.png` - Energetic abstract background for the CTA scene

Each prompt is prefixed with the style anchor. Images can be generated in parallel.

### Step 6: Generate video.config.ts

Create the config with:
- `customPalette` from Step 3
- Generated images from Step 5
- Logo image with `imageStyle: "contain-center"` for the logo reveal scene
- User-provided text (slogan, features) or Gemini-suggested defaults
- `metadata.source: "logo"` for traceability

**Scene Structure:**

```
Scene 1: Logo Reveal — logo.png (contain-center), zoom entrance, shockwave rings, particle burst, glow pulse (5s)
Scene 2: Tagline — kinetic text (words fly in from random directions), flash entrance (5s)
Scene 3: Key Features — stagger text, slide-up entrance, only if user provides features (5-7s)
Scene 4: CTA — kinetic text, rotating gradient button, shockwave + flash (5s)
```

Set `energy: "high"` for product-launch/event, `"moderate"` for brand-intro/general. Energy controls animation speed, particle density multiplier, spring snappiness, entrance distance, and flash/shockwave defaults.

See `${CLAUDE_PLUGIN_ROOT}/skills/motion-templates/references/promo-video.md` for complete config examples and variations.

### Step 7: Scaffold/Reuse + Render

If a Remotion project already exists in the target directory, only replace `video.config.ts` and re-render. Otherwise, scaffold a full project from `${CLAUDE_PLUGIN_ROOT}/skills/remotion-project/references/template-project.md`.

Install `@google/genai` if not already present. Run image generation script, then render:

```bash
npx tsx scripts/generate-images.ts
npx remotion render src/index.ts Main out/promo.mp4
```

## User Input

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `logo-path` | Yes | - | Path to logo image file |
| `--slogan` | No | Auto-generated by Gemini | Tagline text |
| `--purpose` | No | `brand-intro` | brand-intro / product-launch / event / hiring / general |
| `--features` | No | None | Comma-separated feature list |
| `--format` | No | `landscape` | landscape / portrait / square |
| `--output` | No | `out/promo.mp4` | Output file path |

## Purpose-Based CTA Defaults

| Purpose | CTA Text | Button Text |
|---------|----------|-------------|
| brand-intro | "Discover {brandName}" | "Learn More" |
| product-launch | "Available Now" | "Get Started" |
| event | "Join Us" | "Register" |
| hiring | "We're Hiring" | "Apply Now" |
| general | "Learn More" | "Visit" |

## Important Notes

- The two Gemini API calls (vision analysis, then image generation) must run sequentially — analysis results inform the image generation prompts
- Image generation calls (2-3 images) can run in parallel
- `customPalette` overrides `palette` in SceneRenderer — existing configs without `customPalette` still work via the preset fallback
- `imageStyle: "contain-center"` triggers the full logo reveal animation: spring scale-in with overshoot, slight rotation, pulsing multi-color glow, shockwave rings, particle burst, and flash overlay
- Use `textStyle: "kinetic"` for high-impact text (words fly in from random directions with rotation)
- Each scene supports `entrance` animation: `"zoom"` (scale-in), `"slide-up"`, `"slide-left"`, `"flash"` (bright flash + scale)
- Scene transitions cycle through fade, wipe, and slide variations automatically
- Always validate hex color codes from Gemini output (must match `/^#[0-9a-fA-F]{6}$/`)
- For monochrome logos, see the complementary color generation rules in brand-palette.md
