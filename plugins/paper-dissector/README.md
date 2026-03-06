# Paper Dissector

Deeply analyze academic papers from PDF. Extracts structured analysis, generates markdown summaries, renders visual summary cards, and enables interactive Q&A.

## Install

```bash
# Register marketplace (once)
claude plugin marketplace add https://github.com/vericontext/skillforge

# Install
claude plugin install paper-dissector
```

## Usage

```bash
/dissect <paper.pdf> [--theme=academic|dark|light] [--lang=en|ko] [--output=./paper-output/] [--no-card] [--no-qa]
```

Or use the alias:
```bash
/paper <paper.pdf> [options]
```

### Examples

```bash
# Basic analysis with default settings
/dissect ~/Downloads/attention-is-all-you-need.pdf

# Dark theme, Korean output
/dissect paper.pdf --theme=dark --lang=ko

# Skip card and Q&A, just get analysis + summary
/dissect paper.pdf --no-card --no-qa

# Custom output directory
/dissect paper.pdf --output=./my-analysis/
```

## What It Does

1. **PDF Reading** - Reads the full paper text (up to 40 pages)
2. **Deep Analysis** - Extracts metadata, contributions, methodology, equations, experiments, limitations, related work, and future directions
3. **Ratings** - Scores the paper on novelty, rigor, clarity, reproducibility, and impact (1-10)
4. **Equation Explanations** - Converts math to plain language with variable definitions and intuitive analogies
5. **Markdown Summary** - Generates a comprehensive summary document with all sections
6. **Visual Card** - Renders a shareable 1200x675 SVG card with ratings, stats, and key info
7. **Interactive Q&A** - Ask follow-up questions about the paper

## Output Files

```
paper-output/
├── paper-analysis.json    # Structured analysis data
├── paper-summary.md       # Detailed markdown summary
├── paper-card.svg         # Visual summary card
└── paper-card.png         # PNG conversion (if converter available)
```

## Themes

| Theme | Description |
|-------|-------------|
| `academic` | Warm ivory with navy/sienna accents, serif fonts (default) |
| `dark` | GitHub dark mode style |
| `light` | Clean white background |

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `--theme` | `academic` | Card visual theme |
| `--lang` | `en` | Output language (`en` or `ko`) |
| `--output` | `./paper-output/` | Output directory |
| `--no-card` | - | Skip visual card generation |
| `--no-qa` | - | Skip interactive Q&A mode |

## Requirements

- Claude Code with plugin support
- PDF must be text-based (not scanned). For scanned PDFs, use `ocrmypdf` first.
- For PNG conversion (optional): `librsvg`, `inkscape`, `imagemagick`, or macOS `qlmanage`

## Local Development

```bash
# Validate plugin structure
bash scripts/validate-plugin.sh paper-dissector

# Test locally
claude --plugin-dir plugins/paper-dissector
```

## License

MIT
