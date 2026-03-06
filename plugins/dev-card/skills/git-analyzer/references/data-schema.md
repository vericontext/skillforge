# Git Analysis JSON Schema

The `git-analysis.json` output must follow this structure:

```json
{
  "author": "string - git author name",
  "repository": "string - repository name (basename of git root)",
  "analyzedAt": "string - ISO 8601 timestamp",

  "period": {
    "firstCommit": "string - ISO 8601 date",
    "lastCommit": "string - ISO 8601 date",
    "totalDays": "number - days between first and last commit"
  },

  "commits": {
    "total": "number",
    "perDay": "number - total / totalDays, rounded to 2 decimal",
    "perWeek": "number - total / (totalDays / 7), rounded to 1 decimal"
  },

  "timeDistribution": {
    "hourly": {
      "0": "number", "1": "number", "...": "number", "23": "number"
    },
    "categories": {
      "dawn": { "count": "number", "percentage": "number" },
      "morning": { "count": "number", "percentage": "number" },
      "afternoon": { "count": "number", "percentage": "number" },
      "evening": { "count": "number", "percentage": "number" },
      "night": { "count": "number", "percentage": "number" }
    },
    "peakHour": "number - 0-23",
    "peakHourFormatted": "string - e.g. '14:00'",
    "peakDay": "string - e.g. 'Wednesday'"
  },

  "dayDistribution": {
    "Mon": "number", "Tue": "number", "Wed": "number",
    "Thu": "number", "Fri": "number", "Sat": "number", "Sun": "number"
  },

  "languages": [
    {
      "name": "string - e.g. 'TypeScript'",
      "percentage": "number - e.g. 45.2",
      "color": "string - hex color from language-colors reference"
    }
  ],

  "commitStyle": {
    "conventionalRatio": "number - 0 to 1",
    "conventionalLabel": "string - 'Disciplined' | 'Mixed' | 'Freestyle'",
    "avgMessageLength": "number",
    "messageLengthLabel": "string - 'Descriptive' | 'Moderate' | 'Terse'"
  },

  "codeChurn": {
    "totalAdditions": "number",
    "totalDeletions": "number",
    "addDelRatio": "number",
    "addDelLabel": "string - 'Builder' | 'Grower' | 'Balanced' | 'Refactorer' | 'Surgeon'",
    "refactoringRatio": "number",
    "refactoringLevel": "string - 'high' | 'moderate' | 'low'"
  },

  "streaks": {
    "longest": "number - days",
    "current": "number - days"
  },

  "pattern": {
    "type": "string - 'Burst' | 'Variable' | 'Steady'",
    "weeklyStddev": "number",
    "weeklyCv": "number"
  },

  "topDirectories": [
    { "name": "string", "changes": "number" }
  ],

  "topFiles": [
    { "name": "string", "changes": "number" }
  ],

  "heatmap": [
    { "date": "string - YYYY-MM-DD", "count": "number" }
  ]
}
```

## Field Notes

- All percentages are 0-100 (not 0-1) unless labeled as "ratio"
- All ratios are 0-1
- `languages` array is sorted by percentage descending, max 6 entries (top 5 + "Other")
- `topDirectories` max 5 entries
- `topFiles` max 5 entries
- `heatmap` contains exactly 84 entries (12 weeks), sorted ascending by date
- `hourly` must have all 24 keys (0-23), defaulting to 0 if no commits at that hour
- `dayDistribution` must have all 7 keys
