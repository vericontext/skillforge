# dev-card

Generate a developer identity card from your git history. Analyzes commit patterns, assigns an AI persona, and renders a shareable SVG card.

## Quick Start

```bash
claude --plugin-dir plugins/dev-card
```

Then in Claude Code:

```
/dev-card
```

## What You Get

A **1200x675 SVG** card optimized for Twitter/X sharing:

- AI-assigned persona title (e.g., "The Dawn Architect", "Midnight Bug Slayer")
- Stats grid: commits, streak, add/delete ratio, peak hour, peak day, conventional commit %
- Language distribution bar with GitHub-style colors
- 3 characteristic badges
- A fun stat about your coding habits

## Options

| Flag | Default | Description |
|------|---------|-------------|
| `--theme` | `dark` | `dark` / `light` / `neon` |
| `--badge` | off | Also generate an 800x200 GitHub README badge |
| `--lang` | `en` | `en` / `ko` |
| `--author` | git user | Filter commits by author |
| `--output` | `./dev-card-output/` | Output directory |

## Examples

```
/dev-card --theme=neon --badge
/dev-card --lang=ko
/dev-card --author="Jane Doe" --theme=light
```

## How It Works

1. **Git Analysis** - Runs git log commands locally to collect commit patterns, timing, languages, streaks, and code churn
2. **Persona Assignment** - Claude analyzes the data and assigns a developer persona with title, description, badges, and a fun stat
3. **Card Rendering** - Claude generates SVG directly — zero external dependencies

All analysis is **100% local** - works with private repos, no data leaves your machine.

## Themes

- **dark** - GitHub dark mode aesthetic (default)
- **light** - Clean white background, GitHub light style
- **neon** - Cyberpunk green-on-black with RGB gradient

## Requirements

- Git repository with 10+ commits
- That's it. No Node.js, no npm, no build step.

## Output Files

```
dev-card-output/
├── git-analysis.json    # Raw analysis data
├── persona.json         # AI-assigned persona
├── dev-card.svg         # Twitter card (1200x675)
└── dev-card-badge.svg   # GitHub badge (800x200, if --badge)
```

## PNG Conversion (Optional)

If you need PNG for Twitter upload:
- **macOS**: `sips -s format png dev-card.svg --out dev-card.png`
- **Browser**: Open SVG, screenshot at 1200x675
- **ImageMagick**: `convert dev-card.svg dev-card.png`

## License

MIT
