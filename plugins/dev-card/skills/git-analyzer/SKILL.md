---
name: git-analyzer
description: This skill should be used when the user asks to "analyze git history", "show my coding stats", "analyze my commits", "generate dev stats", or wants to extract developer statistics from a git repository. It collects commit patterns, language distribution, coding habits, and streak data from local git history.
version: 1.0.0
---

# Git Analyzer

Analyze a local git repository's commit history and produce a structured JSON report (`git-analysis.json`) containing developer statistics, coding patterns, and behavioral signals.

## Prerequisites

To run this skill, ensure:
- The current working directory is inside a git repository
- The repository has at least 10 commits for meaningful analysis
- Git CLI is available

## Step 1: Identify the Author

To determine which author to analyze:

1. If `--author` is provided, use that value as the author filter
2. Otherwise, run `git config user.name` to get the current user's name
3. Store this as `AUTHOR_NAME` for all subsequent git commands

Verify the author exists in the repo:

```bash
git log --author="$AUTHOR_NAME" --oneline -1
```

If no commits found, warn the user and list available authors with:

```bash
git log --format='%aN' | sort -u
```

## Step 2: Collect Raw Git Data

Run the git commands documented in `${CLAUDE_PLUGIN_ROOT}/skills/git-analyzer/references/git-commands.md` to collect:

1. **Basic stats**: total commits, first/last commit dates
2. **Hourly distribution**: commit counts per hour (0-23)
3. **Day-of-week distribution**: commit counts per weekday
4. **File extensions**: from the most recent 200 commits (language proxy)
5. **Commit messages**: for style analysis (conventional commit detection, average length)
6. **Code churn**: total additions, deletions across all commits
7. **Streak data**: consecutive days with commits
8. **Top directories and files**: most frequently modified paths

Important: All git commands must filter by `--author="$AUTHOR_NAME"` to isolate a single developer's data.

## Step 3: Calculate Derived Metrics

Using the raw data, compute the derived metrics documented in `${CLAUDE_PLUGIN_ROOT}/skills/git-analyzer/references/stat-calculations.md`:

- Time-of-day category distribution (dawn/morning/afternoon/evening/night)
- Peak hour and peak day
- Language percentages from file extensions
- Conventional commit ratio
- Add/delete ratio and refactoring ratio
- Longest streak and current streak
- Burst vs steady pattern classification

## Step 4: Output the Analysis

Write the results to `git-analysis.json` in the output directory, following the schema in `${CLAUDE_PLUGIN_ROOT}/skills/git-analyzer/references/data-schema.md`.

The JSON file must include all fields defined in the schema. If a field cannot be computed (e.g., no deletions), use sensible defaults (0 or empty arrays).

Print a summary to the user:
- Total commits analyzed
- Date range
- Top 3 languages
- Peak coding time
- Current streak

## Error Handling

- If the directory is not a git repo, exit with a clear message
- If fewer than 10 commits exist, warn but continue with available data
- If git commands fail, report which specific data collection step failed
- Handle repositories with no merge commits, no tags, or unusual histories gracefully

## Notes

- This skill only reads data; it never modifies the repository
- All analysis is local; no data leaves the machine
- Large repositories (100k+ commits) should still work but may take longer; consider using `--since` to limit scope if needed
