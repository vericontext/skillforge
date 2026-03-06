# Carousel Maker

Generate Instagram carousel images from a single topic. One command produces 10 ready-to-post PNG slides with professional typography, color presets, and optional AI illustrations.

```
/carousel "10 AI Tools Every Designer Should Know"
```

**Output:** 10 PNG slides (1080x1350) + browser preview

## How It Works

```
Your topic
    ↓
AI generates carousel content (hook → value slides → CTA)
    ↓
HTML/CSS templates + style preset
    ↓
node-html-to-image (Puppeteer)
    ↓
Ready-to-post PNG files
```

## Quick Start

### Install

```bash
claude plugin install carousel-maker
```

### Local Testing

```bash
claude --plugin-dir plugins/carousel-maker
```

### Generate Your First Carousel

```
/carousel "10 AI Tools Every Designer Should Know"
```

## Style Presets

| Preset | Theme | Best For |
|--------|-------|----------|
| `modern` | Dark + indigo | Tech, AI, tools |
| `bold` | Dark navy + red | Motivation, opinions |
| `minimal` | Light + blue | Education, clean tips |
| `playful` | Warm + amber | Lifestyle, fun |
| `luxury` | Black + gold | Premium, business |

```
/carousel "Design Principles" --style=minimal
/carousel "Motivation Monday" --style=bold --slides=6
/carousel "2026 Trends" --style=luxury --brand-color=#d4af37
```

## Parameters

| Parameter | Default | Options |
|-----------|---------|---------|
| `topic` | required | Any topic string |
| `--style` | `modern` | modern, bold, minimal, playful, luxury |
| `--slides` | `10` | 5-20 |
| `--brand-color` | preset | Hex color (e.g., `#e94560`) |
| `--format` | `portrait` | portrait (1080x1350), square (1080x1080) |
| `--font` | preset | Any Google Font name |
| `--illustrations` | `false` | AI illustrations via Gemini |
| `--output` | `./carousel-output/` | Output directory |

## AI Illustrations (Optional)

Add `--illustrations` to generate unique illustrations for each slide using Google Gemini.

**Requires:** `GEMINI_API_KEY` environment variable.

```bash
export GEMINI_API_KEY=your-key-here
/carousel "Future of AI" --illustrations
```

Without `--illustrations` (default), slides use CSS decorative elements — circles, gradients, shapes — that look professional without any API key.

## Output

```
carousel-output/
├── carousel-content.json   ← Edit this to tweak content
├── render-carousel.ts      ← Render script
├── slide-01.png
├── slide-02.png
├── ...
├── slide-10.png
└── preview.html            ← Open in browser
```

## Edit & Re-render

1. Open `carousel-content.json`
2. Edit any slide's `title`, `body`, or `type`
3. Re-render:

```bash
cd carousel-output && npx tsx render-carousel.ts
```

## Skills

This plugin contains two skills:

- **carousel-content** — Generates structured carousel content using proven hook formulas, slide structures, and CTA patterns
- **carousel-render** — Converts content JSON to PNG images via HTML/CSS templates and node-html-to-image

## Requirements

- Node.js 18+
- npm
- Claude Code with plugin support

## License

MIT
