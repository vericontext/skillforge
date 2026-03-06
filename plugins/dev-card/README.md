# dev-card

Generate a developer identity card from your git history. Analyzes commit patterns, assigns an AI persona, and renders a shareable SVG card.

## Install

```bash
# One-time setup (add marketplace + install plugin)
claude plugin marketplace add https://github.com/vericontext/claude-skills && claude plugin install dev-card
```

That's it. Now go to any git repo and run:

```
/dev-card
```

## What You Get

A **1200x675 card** (SVG + auto-converted PNG) ready for Twitter/X:

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
/dev-card
/dev-card --theme=neon --badge
/dev-card --lang=ko
/dev-card --author="Jane Doe" --theme=light
```

## How It Works

1. **Git Analysis** - Runs git log commands locally to collect commit patterns, timing, languages, streaks, and code churn
2. **Persona Assignment** - Claude analyzes the data and assigns a developer persona with title, description, badges, and a fun stat
3. **Card Rendering** - Claude generates SVG, then auto-converts to PNG for Twitter upload

All analysis is **local** - no data leaves your machine.

## Themes

- **dark** - GitHub dark mode aesthetic (default)
- **light** - Clean white background, GitHub light style
- **neon** - Cyberpunk green-on-black with RGB gradient

## Requirements

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI
- Git repository with 10+ commits
- That's it. No Node.js, no npm, no build step.

## Output Files

```
dev-card-output/
├── git-analysis.json    # Raw analysis data
├── persona.json         # AI-assigned persona
├── dev-card.svg         # Card source (editable)
├── dev-card.png         # Twitter-ready (auto-converted)
└── dev-card-badge.png   # GitHub badge (if --badge)
```

PNG conversion is automatic using platform-native tools (macOS `qlmanage`, Linux `rsvg-convert`, or ImageMagick).

## For Developers

If you want to test locally without installing:

```bash
git clone https://github.com/vericontext/claude-skills.git
cd my-project
claude --plugin-dir /path/to/claude-skills/plugins/dev-card
/dev-card
```

## License

MIT
