---
name: dev-card
description: Generate a developer identity card from git history
allowed-tools: Bash, Read, Write, Glob, Grep
---

# /dev-card

Generate a developer identity card by analyzing git commit history in the current repository.

## Usage

```
/dev-card [--theme=dark|light|neon] [--badge] [--lang=en|ko] [--author="Name"] [--output=./dev-card-output/]
```

## Parameters

- `--theme`: Card visual theme (default: `dark`)
  - `dark` - GitHub dark mode style
  - `light` - GitHub light mode style
  - `neon` - Cyberpunk/hacker aesthetic
- `--badge`: Also generate a compact GitHub README badge (800x200)
- `--lang`: Output language (default: `en`)
  - `en` - English
  - `ko` - Korean (한국어)
- `--author`: Git author name to analyze (default: `git config user.name`)
- `--output`: Output directory (default: `./dev-card-output/`)

## What it does

1. Analyzes your git history (commits, timing, languages, streaks, code churn)
2. Assigns an AI-generated developer persona based on your coding patterns
3. Renders a shareable card image optimized for Twitter/X (1200x675)

## Examples

```
/dev-card
/dev-card --theme=neon --badge
/dev-card --lang=ko --theme=light
/dev-card --author="John Doe" --theme=dark
```

## Execution

Delegate to the `card-director` agent to orchestrate the full pipeline. Parse the user's parameters and pass them to the agent.
