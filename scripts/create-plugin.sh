#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
TEMPLATE_DIR="$ROOT_DIR/templates/plugin-template"
PLUGINS_DIR="$ROOT_DIR/plugins"

usage() {
    echo "Usage: $0 <plugin-name> [skill-name]"
    echo ""
    echo "Creates a new plugin from the template."
    echo ""
    echo "Arguments:"
    echo "  plugin-name   Name of the plugin (kebab-case)"
    echo "  skill-name    Name of the initial skill (kebab-case, defaults to plugin-name)"
    exit 1
}

if [[ $# -lt 1 ]]; then
    usage
fi

PLUGIN_NAME="$1"
SKILL_NAME="${2:-$PLUGIN_NAME}"
PLUGIN_DIR="$PLUGINS_DIR/$PLUGIN_NAME"

if [[ -d "$PLUGIN_DIR" ]]; then
    echo "Error: Plugin '$PLUGIN_NAME' already exists at $PLUGIN_DIR"
    exit 1
fi

echo "Creating plugin '$PLUGIN_NAME' with initial skill '$SKILL_NAME'..."

# Copy template
cp -r "$TEMPLATE_DIR" "$PLUGIN_DIR"

# Rename skill directory
if [[ "$SKILL_NAME" != "__SKILL_NAME__" ]]; then
    mv "$PLUGIN_DIR/skills/__SKILL_NAME__" "$PLUGIN_DIR/skills/$SKILL_NAME"
fi

# Replace placeholders
find "$PLUGIN_DIR" -type f | while read -r file; do
    sed -i '' "s/__PLUGIN_NAME__/$PLUGIN_NAME/g" "$file"
    sed -i '' "s/__PLUGIN_DESCRIPTION__/A Claude Code skill plugin./g" "$file"
    sed -i '' "s/__SKILL_NAME__/$SKILL_NAME/g" "$file"
done

# Create additional directories
mkdir -p "$PLUGIN_DIR/commands"
mkdir -p "$PLUGIN_DIR/agents"
mkdir -p "$PLUGIN_DIR/skills/$SKILL_NAME/references"

# Create README
cat > "$PLUGIN_DIR/README.md" << EOF
# $PLUGIN_NAME

A Claude Code skill plugin.

## Skills

- **$SKILL_NAME** - TODO: Add description

## Installation

\`\`\`bash
claude plugin add <repo-url>/plugins/$PLUGIN_NAME
\`\`\`

## Local Testing

\`\`\`bash
claude --plugin-dir /path/to/plugins/$PLUGIN_NAME
\`\`\`
EOF

# Create LICENSE
cp "$ROOT_DIR/plugins/example-skill-pack/LICENSE" "$PLUGIN_DIR/LICENSE" 2>/dev/null || true

echo "Plugin created at: $PLUGIN_DIR"
echo ""
echo "Next steps:"
echo "  1. Edit $PLUGIN_DIR/.claude-plugin/plugin.json"
echo "  2. Edit $PLUGIN_DIR/skills/$SKILL_NAME/SKILL.md"
echo "  3. Test with: claude --plugin-dir $PLUGIN_DIR"
