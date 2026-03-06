# Claude Skills

A monorepo for Claude Code skill plugins. Create, manage, and distribute skill plugins for Claude Code.

## Quick Start

### Create a new plugin

```bash
./scripts/create-plugin.sh my-plugin-name
```

### Add a skill to an existing plugin

```bash
./scripts/create-skill.sh my-plugin-name my-skill-name
```

### Validate a plugin

```bash
./scripts/validate-plugin.sh my-plugin-name
```

### Test locally

```bash
claude --plugin-dir plugins/my-plugin-name
```

## Installation

Users can install plugins from this repository:

```bash
# Add this repo as a marketplace
claude marketplace add <github-url>

# Install a specific plugin
claude plugin install <plugin-name>
```

Or install a plugin directly:

```bash
claude plugin add <github-url>/plugins/<plugin-name>
```

## Project Structure

```
claude-skills/
├── plugins/          # Each subdirectory is a deployable plugin
├── templates/        # Scaffolding templates
├── scripts/          # Automation scripts
├── CLAUDE.md         # Project conventions
└── README.md
```

## Creating Skills

Each skill is defined by a `SKILL.md` file with YAML frontmatter:

```markdown
---
name: my-skill
description: "This skill should be used when the user wants to..."
trigger: "/my-skill"
---

# My Skill

Instructions for Claude when this skill is activated...
```

See `CLAUDE.md` for detailed writing guidelines.

## Available Plugins

| Plugin | Description |
|--------|-------------|
| [example-skill-pack](plugins/example-skill-pack/) | Example plugin demonstrating the plugin structure |
| [dev-card](plugins/dev-card/) | Generate a developer identity card from git history |
| [motion-graphics](plugins/motion-graphics/) | Create motion graphics with Remotion and Gemini AI |

## License

MIT
