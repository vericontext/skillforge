# Claude Skills Monorepo

This is a monorepo for Claude Code skill plugins. Each plugin is an independent, distributable unit under `plugins/`.

## Project Structure

- `plugins/` - Each subdirectory is a standalone plugin (deployment unit)
- `templates/` - Scaffolding templates for new plugins and skills
- `scripts/` - Automation scripts for creating and validating plugins

## Plugin Structure

Each plugin must follow this structure:

```
plugin-name/
├── .claude-plugin/
│   └── plugin.json        # Manifest (required: name)
├── skills/
│   └── skill-name/
│       ├── SKILL.md        # Skill definition (required)
│       └── references/     # Supporting materials (optional)
├── commands/               # Slash commands (optional)
├── agents/                 # Agents (optional)
├── README.md
└── LICENSE
```

## SKILL.md Writing Rules

### Frontmatter
- `name`: kebab-case skill name
- `description`: 3rd person, starts with "This skill should be used when..."
- `trigger`: Specific trigger phrase for activation

### Body
- Use imperative/infinitive form ("To create X, do Y")
- Keep body between 1,500-2,000 words
- Move detailed content to `references/` directory
- Use `${CLAUDE_PLUGIN_ROOT}` for path references within the plugin

### Example Frontmatter
```yaml
---
name: my-skill
description: "This skill should be used when the user wants to..."
trigger: "/my-skill"
---
```

## Conventions

- Plugin names: kebab-case (e.g., `code-review-pack`)
- Skill names: kebab-case (e.g., `lint-fixer`)
- All manifests must include at least a `name` field
- Each plugin should have a README.md with usage instructions
- Use `scripts/validate-plugin.sh` to verify structure before publishing

## Deployment

### Marketplace (recommended)
```bash
claude marketplace add <repo-url>
claude plugin install <plugin-name>
```

### Direct GitHub install
```bash
claude plugin add <github-url>
```

### Local testing
```bash
claude --plugin-dir plugins/<plugin-name>
```
