# Stat Calculations Reference

## Time-of-Day Categories

Map each commit hour to a time category:

| Category | Hours | Label (en) | Label (ko) |
|----------|-------|------------|------------|
| dawn | 04, 05, 06 | Dawn | 새벽 |
| morning | 07, 08, 09, 10, 11 | Morning | 아침 |
| afternoon | 12, 13, 14, 15, 16, 17 | Afternoon | 오후 |
| evening | 18, 19, 20, 21 | Evening | 저녁 |
| night | 22, 23, 00, 01, 02, 03 | Night | 밤 |

Calculate the percentage for each category:
```
category_pct = (commits_in_category / total_commits) * 100
```

## Peak Hour and Peak Day

- **Peak hour**: The hour (0-23) with the most commits. Format as `HH:00` (e.g., `14:00`).
- **Peak day**: The weekday with the most commits (Mon-Sun).

## Language Distribution

From the file extension counts:
1. Sum all counted extensions (excluding ignored ones)
2. Calculate percentage for each language: `(lang_count / total_count) * 100`
3. Keep top 5 languages, group the rest as "Other"
4. Round to 1 decimal place

## Conventional Commit Ratio

```
conventional_ratio = conventional_commits / total_messages_analyzed
```

A commit is "conventional" if its subject line matches:
```
^(feat|fix|chore|docs|style|refactor|test|perf|ci|build|revert)(\(.+\))?!?:\s
```

Classify the developer's commit style:
- `>= 0.8` -> "Disciplined" / "체계적"
- `>= 0.5` -> "Mixed" / "혼합"
- `< 0.5` -> "Freestyle" / "자유로운"

## Average Commit Message Length

```
avg_length = sum(len(message) for message in messages) / len(messages)
```

Classify:
- `>= 72 chars` -> "Descriptive" / "설명적"
- `>= 30 chars` -> "Moderate" / "보통"
- `< 30 chars` -> "Terse" / "간결한"

## Add/Delete Ratio

```
add_del_ratio = total_additions / max(total_deletions, 1)
```

Classify:
- `>= 5.0` -> "Builder" (mostly adding code)
- `2.0 - 4.99` -> "Grower" (adding more than removing)
- `1.0 - 1.99` -> "Balanced"
- `0.5 - 0.99` -> "Refactorer" (removing more than adding)
- `< 0.5` -> "Surgeon" (heavy deletion/cleanup)

## Refactoring Ratio

```
refactoring_ratio = total_deletions / max(total_additions + total_deletions, 1)
```

This indicates how much of the developer's work involves removing code:
- `>= 0.4` -> high refactoring tendency
- `0.2 - 0.39` -> moderate
- `< 0.2` -> low (mostly additive work)

## Streak Calculation

Given a sorted list of unique commit dates:

**Longest streak**: Find the longest consecutive sequence of dates (no gaps).
```
For each date in sorted_dates:
  if date == previous_date + 1 day:
    current_streak += 1
  else:
    current_streak = 1
  longest = max(longest, current_streak)
```

**Current streak**: Count backwards from today. If today or yesterday has a commit, start counting consecutive days backwards. Otherwise, current streak = 0.

## Burst vs Steady Pattern

Calculate the standard deviation of commits per week over the last 12 weeks:

```
weekly_counts = [commits in each of the last 12 weeks]
mean = avg(weekly_counts)
stddev = sqrt(sum((x - mean)^2 for x in weekly_counts) / len(weekly_counts))
cv = stddev / max(mean, 1)  # coefficient of variation
```

Classify:
- `cv >= 1.0` -> "Burst" / "폭발형" (highly irregular)
- `cv >= 0.5` -> "Variable" / "변동형"
- `cv < 0.5` -> "Steady" / "꾸준한" (consistent cadence)
