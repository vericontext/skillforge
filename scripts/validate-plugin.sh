#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
PLUGINS_DIR="$ROOT_DIR/plugins"

usage() {
    echo "Usage: $0 <plugin-name>"
    echo ""
    echo "Validates the structure of a plugin."
    echo ""
    echo "Arguments:"
    echo "  plugin-name   Name of the plugin to validate"
    exit 1
}

if [[ $# -lt 1 ]]; then
    usage
fi

PLUGIN_NAME="$1"
PLUGIN_DIR="$PLUGINS_DIR/$PLUGIN_NAME"
ERRORS=0

error() {
    echo "  ERROR: $1"
    ERRORS=$((ERRORS + 1))
}

warn() {
    echo "  WARN:  $1"
}

ok() {
    echo "  OK:    $1"
}

echo "Validating plugin '$PLUGIN_NAME'..."
echo ""

# Check plugin directory exists
if [[ ! -d "$PLUGIN_DIR" ]]; then
    echo "Error: Plugin '$PLUGIN_NAME' does not exist at $PLUGIN_DIR"
    exit 1
fi

# Check .claude-plugin/plugin.json
echo "[Manifest]"
PLUGIN_JSON="$PLUGIN_DIR/.claude-plugin/plugin.json"
if [[ -f "$PLUGIN_JSON" ]]; then
    ok "plugin.json exists"

    # Check name field
    if command -v python3 &>/dev/null; then
        NAME=$(python3 -c "import json; print(json.load(open('$PLUGIN_JSON')).get('name', ''))" 2>/dev/null)
        if [[ -n "$NAME" && "$NAME" != "None" ]]; then
            ok "name field: '$NAME'"
        else
            error "plugin.json missing required 'name' field"
        fi
    else
        ok "plugin.json exists (skipped field validation - python3 not found)"
    fi
else
    error "Missing .claude-plugin/plugin.json"
fi

# Check skills
echo ""
echo "[Skills]"
SKILLS_DIR="$PLUGIN_DIR/skills"
if [[ -d "$SKILLS_DIR" ]]; then
    SKILL_COUNT=0
    for skill_dir in "$SKILLS_DIR"/*/; do
        if [[ ! -d "$skill_dir" ]]; then
            continue
        fi
        SKILL_COUNT=$((SKILL_COUNT + 1))
        skill_name=$(basename "$skill_dir")
        skill_md="$skill_dir/SKILL.md"

        if [[ -f "$skill_md" ]]; then
            ok "Skill '$skill_name' has SKILL.md"

            # Check frontmatter
            if head -1 "$skill_md" | grep -q "^---"; then
                ok "Skill '$skill_name' has frontmatter"

                # Check required frontmatter fields
                if grep -q "^name:" "$skill_md"; then
                    ok "Skill '$skill_name' has 'name' in frontmatter"
                else
                    error "Skill '$skill_name' missing 'name' in frontmatter"
                fi

                if grep -q "^description:" "$skill_md"; then
                    ok "Skill '$skill_name' has 'description' in frontmatter"
                else
                    error "Skill '$skill_name' missing 'description' in frontmatter"
                fi
            else
                error "Skill '$skill_name' SKILL.md missing frontmatter (should start with ---)"
            fi

            # Check word count (body only, after frontmatter)
            BODY=$(sed -n '/^---$/,/^---$/!p' "$skill_md" | tail -n +1)
            WORD_COUNT=$(echo "$BODY" | wc -w | tr -d ' ')
            if [[ "$WORD_COUNT" -lt 50 ]]; then
                warn "Skill '$skill_name' body is short ($WORD_COUNT words, recommended 1500-2000)"
            else
                ok "Skill '$skill_name' body word count: $WORD_COUNT"
            fi
        else
            error "Skill '$skill_name' missing SKILL.md"
        fi
    done

    if [[ "$SKILL_COUNT" -eq 0 ]]; then
        warn "No skills found in $SKILLS_DIR"
    else
        ok "Found $SKILL_COUNT skill(s)"
    fi
else
    error "Missing skills/ directory"
fi

# Check optional files
echo ""
echo "[Optional]"
if [[ -f "$PLUGIN_DIR/README.md" ]]; then
    ok "README.md exists"
else
    warn "No README.md found"
fi

if [[ -f "$PLUGIN_DIR/LICENSE" ]]; then
    ok "LICENSE exists"
else
    warn "No LICENSE found"
fi

# Summary
echo ""
echo "---"
if [[ "$ERRORS" -eq 0 ]]; then
    echo "Validation PASSED (0 errors)"
    exit 0
else
    echo "Validation FAILED ($ERRORS error(s))"
    exit 1
fi
