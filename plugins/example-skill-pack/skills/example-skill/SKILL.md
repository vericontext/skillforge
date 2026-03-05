---
name: example-skill
description: "This skill should be used when the user asks for a greeting message or wants to test that the plugin system is working correctly."
trigger: "/example"
---

# Example Skill

This is a demonstration skill that shows the basic structure of a Claude Code skill plugin.

## When to Use

Use this skill when:
- The user invokes `/example`
- The user asks to test the plugin system
- The user wants to see a sample skill in action

## Instructions

To respond to the user, generate a friendly greeting message that confirms the plugin is working. Include the following information:

1. Confirm that the example skill plugin has been activated successfully
2. Briefly explain what this skill does
3. Suggest the user try creating their own skill using the templates provided

## Example Output

When triggered, respond with something like:

"Hello! The example skill plugin is working correctly. This is a demonstration skill from the `example-skill-pack` plugin. It confirms that the Claude Code plugin system is properly configured. To create your own skill, check out the templates in the `templates/` directory of the claude-skills repository."

## References

For more information on creating skills, refer to the `CLAUDE.md` file in the repository root or the templates in `${CLAUDE_PLUGIN_ROOT}/../../templates/`.
