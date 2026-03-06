---
description: Generate Instagram carousel images from a single topic
argument-hint: "topic" [--style=modern] [--slides=10] [--brand-color=#hex] [--format=portrait] [--illustrations]
allowed-tools: [Read, Write, Edit, Bash, Glob, Grep, Agent]
---

# /carousel

Generate Instagram carousel images from a single topic.

The user invoked this command with: $ARGUMENTS

## Usage

```
/carousel "topic" [--style=modern] [--slides=10] [--brand-color=#6366f1] [--format=portrait] [--font=Inter] [--illustrations] [--output=./carousel-output/]
```

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `topic` | (required) | The carousel subject — a phrase, question, or title |
| `--style` | `modern` | Style preset: `modern`, `bold`, `minimal`, `playful`, `luxury` |
| `--slides` | `10` | Number of slides (5-20) |
| `--brand-color` | preset default | Brand accent color as hex (e.g., `#e94560`) |
| `--format` | `portrait` | Image format: `portrait` (1080x1350) or `square` (1080x1080) |
| `--font` | preset default | Custom Google Font name (e.g., `Poppins`) |
| `--illustrations` | `false` | Generate AI illustrations via Gemini (requires `GEMINI_API_KEY`) |
| `--output` | `./carousel-output/` | Output directory path |

## Instructions

When the user invokes `/carousel`, follow this pipeline:

### Step 1: Parse Input

Extract the topic (required) and all optional parameters from the user's command. Apply defaults for any omitted parameters.

If the topic is too vague (e.g., just "AI"), ask the user for a more specific angle before proceeding.

### Step 2: Generate Content

Use the `carousel-content` skill to:

1. Determine the best content structure for the topic
2. Generate hook, value slides, and CTA
3. Create illustration prompts for each slide
4. Output `carousel-content.json` in the output directory

### Step 3: Set Up Project

In the output directory:

```bash
npm init -y
npm install node-html-to-image
```

If `--illustrations` is set and `GEMINI_API_KEY` is available:

```bash
npm install @google/genai
```

### Step 4: Generate Illustrations (Optional)

Only if `--illustrations` flag is present and `GEMINI_API_KEY` environment variable is set.

Use the Gemini API to generate one illustration per slide (except CTA). Save as `illustration-01.png`, `illustration-02.png`, etc.

If `GEMINI_API_KEY` is not set but `--illustrations` was requested, warn the user and proceed without illustrations.

### Step 5: Render Slides

Use the `carousel-render` skill to:

1. Generate `render-carousel.ts` with the selected style preset and template functions
2. Execute with `npx tsx render-carousel.ts`
3. Output `slide-01.png` through `slide-N.png`
4. Generate `preview.html`

### Step 6: Present Results

Show the user:
- List of generated files
- How to open `preview.html` for previewing
- How to edit `carousel-content.json` and re-render
- Total slide count and dimensions

## Examples

### Basic usage
```
/carousel "10 AI Tools Every Designer Should Know"
```

### With style and slide count
```
/carousel "Why Remote Work Wins" --style=bold --slides=8
```

### Full options
```
/carousel "2026 Design Trends" --style=luxury --slides=12 --brand-color=#d4af37 --illustrations --format=portrait
```

### Square format for feed grid
```
/carousel "Morning Routine Checklist" --style=playful --format=square --slides=6
```
