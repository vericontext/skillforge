---
name: carousel-render
description: This skill should be used when the user asks to "render carousel", "generate carousel images", "convert carousel to PNG", "create carousel slides", or needs to turn carousel content JSON into actual images. Triggers on keywords like render, PNG, slides, node-html-to-image, carousel images, HTML to image.
version: 1.0.0
---

# Carousel Render Pipeline

Convert `carousel-content.json` into production-ready Instagram carousel PNG images using HTML/CSS templates and node-html-to-image.

## Architecture Overview

```
carousel-content.json
        ↓
  Style Preset (from references/style-presets.md)
        ↓
  HTML per slide (from references/html-templates.md)
  + Optional illustrations (base64 data URI)
        ↓
  node-html-to-image (Puppeteer)
        ↓
  slide-01.png, slide-02.png, ... slide-N.png
  + preview.html
```

## Image Specifications

| Format | Width | Height | Aspect Ratio |
|--------|-------|--------|-------------|
| Portrait (default) | 1080px | 1350px | 4:5 |
| Square | 1080px | 1080px | 1:1 |

- Output format: PNG (lossless, best for text-heavy graphics)
- Color space: sRGB
- DPI: 72 (screen)

## Safe Zone

Instagram overlays UI elements on carousels. Keep all critical content within the safe zone:

- **Side margins**: 108px each (10% of width)
- **Top margin**: 67.5px (5% of height for portrait)
- **Bottom margin**: 67.5px (5% of height)
- **Effective content area**: 864px x 1215px (portrait) or 864px x 945px (square)

All HTML templates enforce safe zone padding automatically.

## Style Preset System

Five built-in style presets control the visual appearance. See `references/style-presets.md` for full definitions.

| Preset | Theme | Best For |
|--------|-------|----------|
| **modern** | Dark indigo | Tech, AI, tools |
| **bold** | Dark red accent | Motivation, opinions |
| **minimal** | Light clean | Education, tips |
| **playful** | Warm amber | Lifestyle, fun |
| **luxury** | Black gold | Premium, business |

Each preset defines 13 properties: backgroundColor, cardColor, textColor, accentColor, mutedColor, fontPrimary, fontSecondary, headerWeight, bodyWeight, borderRadius, decorationStyle, gradientAngle, gradientColors.

When `--brand-color` is provided, override only the `accentColor` property.

## HTML Template System

Each slide type has a dedicated HTML generation function. See `references/html-templates.md` for complete implementations.

**Key principles:**
- Inline styles only (no external CSS files — Puppeteer renders everything self-contained)
- Google Fonts via CDN `<link>` tag in `<head>` (Puppeteer fetches them automatically)
- Safe zone enforced via container padding
- All text uses `text-rendering: optimizeLegibility` and `-webkit-font-smoothing: antialiased`

### Template Functions

```typescript
renderHookSlide(slide, style, illustration?)   → full HTML string
renderTipSlide(slide, style, illustration?)     → full HTML string
renderStatSlide(slide, style, illustration?)    → full HTML string
renderComparisonSlide(slide, style, illustration?) → full HTML string
renderQuoteSlide(slide, style, illustration?)   → full HTML string
renderCtaSlide(slide, style)                    → full HTML string
```

## Illustration Integration

### With Gemini Illustrations (--illustrations flag)

1. Generate illustrations using Gemini API with prompts from `carousel-content.json`
2. Save as PNG files
3. Convert to base64 data URI: `data:image/png;base64,${base64String}`
4. Embed in HTML via `<img>` tag with `src` set to the data URI
5. Position in the upper 60% of the slide, behind or alongside text

### Without Illustrations (Default Mode)

CSS-only decorative elements provide visual interest:

- **geometric**: Circles, squares, triangles using CSS shapes and transforms
- **angular**: Diagonal lines, chevrons using CSS borders and clip-path
- **none**: Clean typography-only layout
- **blobs**: Organic shapes using border-radius percentages
- **thin borders**: Elegant frames using CSS borders

The decoration style is determined by the preset's `decorationStyle` property.

## Render Script Pattern

Claude generates a TypeScript render script at runtime. See `references/render-script.md` for the complete template.

**Process:**

1. Create the output directory if it doesn't exist
2. Generate `render-carousel.ts` with:
   - Style preset values inlined
   - Template functions for each slide type
   - node-html-to-image render loop
   - Preview HTML generation
3. Execute with `npx tsx render-carousel.ts`

**Dependencies:**
- `node-html-to-image` — Puppeteer wrapper for HTML-to-PNG conversion
- `tsx` — TypeScript execution without compilation step

Install: `npm init -y && npm install node-html-to-image`

## Render Execution

```typescript
import nodeHtmlToImage from "node-html-to-image";

await nodeHtmlToImage({
  html: slideHtml,
  output: `./slide-${padded}.png`,
  puppeteerArgs: {
    defaultViewport: { width: 1080, height: 1350 },
    args: ["--no-sandbox"]
  }
});
```

**Important settings:**
- `defaultViewport` must match the target dimensions exactly
- `--no-sandbox` for environments without sandbox support
- Process slides sequentially to avoid memory issues
- Each slide takes 1-3 seconds to render

## Preview HTML

After rendering all PNGs, generate a `preview.html` file. See `references/preview-template.md`.

The preview shows all slides in a horizontal scrollable grid that simulates Instagram's swipe experience. Slides are displayed at 50% scale with gap between them.

## Output Structure

```
carousel-output/           (or custom --output path)
├── carousel-content.json  # Content data
├── render-carousel.ts     # Generated render script
├── slide-01.png           # Individual slides
├── slide-02.png
├── ...
├── slide-10.png
└── preview.html           # Browser preview
```

## Rendering Checklist

Before delivering the output:

- [ ] All slides rendered at correct dimensions (1080x1350 or 1080x1080)
- [ ] Text is within safe zone boundaries
- [ ] Fonts loaded correctly (check for fallback font rendering)
- [ ] Colors match the selected preset
- [ ] Slide numbers are sequential and correct
- [ ] Preview HTML displays all slides
- [ ] No broken illustration references (if using illustrations)
- [ ] File sizes are reasonable (typically 100-500KB per slide)

## Troubleshooting

### Font not loading
- Ensure Google Fonts `<link>` tag is in `<head>`, not `<body>`
- Add `waitUntilNetworkIdle` option if fonts appear as fallback

### Text overflow
- Reduce font size or truncate body text
- Check word count limits from slide-structures.md

### Puppeteer fails to launch
- Install system dependencies: `npx puppeteer browsers install chrome`
- Use `--no-sandbox` flag in puppeteerArgs

### Blurry output
- Verify viewport dimensions match output dimensions exactly
- Do not use deviceScaleFactor > 1 (it changes output dimensions)

## Re-rendering

The workflow supports iterative editing:

1. Edit `carousel-content.json` to modify text, types, or illustration prompts
2. Re-run `npx tsx render-carousel.ts` to regenerate all PNGs
3. Preview updates automatically when refreshing `preview.html`

This makes it easy to tweak individual slides without regenerating content from scratch.
