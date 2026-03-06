# Git Commands Reference

All commands filter by author. Replace `$AUTHOR` with the target author name.

## 1. Basic Stats

Total commit count:
```bash
git log --author="$AUTHOR" --oneline | wc -l
```

First commit date:
```bash
git log --author="$AUTHOR" --reverse --format='%aI' | head -1
```

Last commit date:
```bash
git log --author="$AUTHOR" -1 --format='%aI'
```

## 2. Hourly Distribution

Commit counts per hour (0-23):
```bash
git log --author="$AUTHOR" --format='%aH' | sort | uniq -c | sort -rn
```

This outputs lines like `  42 14` meaning 42 commits at 14:00.

## 3. Day-of-Week Distribution

Commit counts per weekday:
```bash
git log --author="$AUTHOR" --format='%aD' | cut -d',' -f1 | sort | uniq -c | sort -rn
```

Output maps: Mon, Tue, Wed, Thu, Fri, Sat, Sun.

## 4. File Extensions (Language Proxy)

From the most recent 200 commits, extract changed file extensions:
```bash
git log --author="$AUTHOR" -200 --pretty=format: --name-only | grep -v '^$' | sed 's/.*\.//' | sort | uniq -c | sort -rn | head -20
```

Map extensions to languages:
- `ts`, `tsx` -> TypeScript
- `js`, `jsx` -> JavaScript
- `py` -> Python
- `go` -> Go
- `rs` -> Rust
- `java` -> Java
- `rb` -> Ruby
- `swift` -> Swift
- `kt` -> Kotlin
- `cs` -> C#
- `cpp`, `cc`, `cxx`, `h`, `hpp` -> C++
- `c` -> C
- `php` -> PHP
- `vue` -> Vue
- `svelte` -> Svelte
- `dart` -> Dart
- `ex`, `exs` -> Elixir
- `hs` -> Haskell
- `scala` -> Scala
- `lua` -> Lua
- `sh`, `bash`, `zsh` -> Shell
- `css`, `scss`, `sass`, `less` -> CSS
- `html` -> HTML
- `sql` -> SQL
- `md`, `mdx` -> Markdown

Ignore: `json`, `yaml`, `yml`, `toml`, `xml`, `lock`, `sum`, `mod`, `txt`, `log`, `env`, `gitignore`, `dockerignore`, `editorconfig`, `prettierrc`, `eslintrc`, `map`, `svg`, `png`, `jpg`, `gif`, `ico`, `woff`, `woff2`, `ttf`, `eot`

## 5. Commit Messages

Last 200 commit messages for style analysis:
```bash
git log --author="$AUTHOR" -200 --format='%s'
```

Conventional commit pattern: starts with `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `test:`, `perf:`, `ci:`, `build:`, `revert:` (case-insensitive, with optional scope in parentheses).

## 6. Code Churn (Additions/Deletions)

Total insertions and deletions:
```bash
git log --author="$AUTHOR" --shortstat --format='' | grep -E 'insertion|deletion' | awk '{ins+=$4; del+=$6} END {print ins, del}'
```

Note: this may take time on large repos. For repos with 10k+ commits, limit to last 1000:
```bash
git log --author="$AUTHOR" -1000 --shortstat --format='' | grep -E 'insertion|deletion' | awk '{ins+=$4; del+=$6} END {print ins, del}'
```

## 7. Commit Dates for Streak Calculation

All commit dates (date only, deduplicated):
```bash
git log --author="$AUTHOR" --format='%aI' | cut -dT -f1 | sort -u
```

## 8. Daily Commit Counts (Heatmap)

Collect daily commit counts for the most recent 84 days (12 weeks). This powers the commit heatmap on the card.

```bash
for i in $(seq 0 83); do d=$(date -v-${i}d +%Y-%m-%d 2>/dev/null || date -d "$i days ago" +%Y-%m-%d); c=$(git log --author="$AUTHOR" --after="$d 00:00" --before="$d 23:59:59" --oneline | wc -l); echo "$d $c"; done
```

On Linux (if `date -v` is not available):
```bash
for i in $(seq 0 83); do d=$(date -d "$i days ago" +%Y-%m-%d); c=$(git log --author="$AUTHOR" --after="$d 00:00" --before="$d 23:59:59" --oneline | wc -l); echo "$d $c"; done
```

Output format: one line per day, `YYYY-MM-DD COUNT`, most recent first.

Parse into an array of `{ "date": "YYYY-MM-DD", "count": N }` objects sorted ascending by date.

## 9. Top Directories

Most modified directories (top-level):
```bash
git log --author="$AUTHOR" -500 --pretty=format: --name-only | grep -v '^$' | cut -d'/' -f1 | sort | uniq -c | sort -rn | head -10
```

## 10. Top Files

Most modified files:
```bash
git log --author="$AUTHOR" -500 --pretty=format: --name-only | grep -v '^$' | sort | uniq -c | sort -rn | head -10
```
