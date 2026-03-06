---
name: dissect
description: Deeply analyze an academic paper PDF and generate structured analysis, summary, and visual card
allowed-tools: Bash, Read, Write, Glob, Grep
argument-hint: <paper.pdf> [--theme=academic|dark|light] [--lang=en|ko] [--output=./paper-output/] [--no-card] [--no-qa]
---

# /dissect

Deeply analyze an academic paper PDF. Reads the entire paper, extracts structured analysis, generates a markdown summary, renders a visual summary card, and optionally enters interactive Q&A mode.

## Usage

```
/dissect <paper.pdf> [--theme=academic|dark|light] [--lang=en|ko] [--output=./paper-output/] [--no-card] [--no-qa]
```

## Parameters

- `<paper.pdf>`: Path to the PDF file (required)
- `--theme`: Visual card theme (default: `academic`)
  - `academic` - Warm ivory with navy/sienna accents, serif fonts
  - `dark` - GitHub dark mode style
  - `light` - Clean white background
- `--lang`: Output language for summary and card (default: `en`)
  - `en` - English
  - `ko` - Korean
- `--output`: Output directory (default: `./paper-output/`)
- `--no-card`: Skip visual card generation
- `--no-qa`: Skip interactive Q&A mode after analysis

## What it does

1. Reads the full PDF and extracts text
2. Performs deep structured analysis (metadata, contributions, methodology, equations, experiments, ratings)
3. Generates a detailed markdown summary with TL;DR, equation explanations, and glossary
4. Renders a shareable visual summary card (1200x675 SVG + PNG)
5. Enters interactive Q&A mode for follow-up questions about the paper

## Output Files

```
paper-output/
├── paper-analysis.json    # Structured analysis data
├── paper-summary.md       # Detailed markdown summary
├── paper-card.svg         # Visual summary card
└── paper-card.png         # PNG conversion (if converter available)
```

## Examples

```
/dissect ~/Downloads/attention-is-all-you-need.pdf
/dissect paper.pdf --theme=dark --lang=ko
/dissect ./papers/bert.pdf --no-card --no-qa
/dissect research.pdf --theme=light --output=./bert-analysis/
```

## Execution

Delegate to the `paper-director` agent to orchestrate the full pipeline. Parse the user's parameters and pass them to the agent.
