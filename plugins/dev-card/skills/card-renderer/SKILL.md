---
name: card-renderer
description: This skill should be used when the user asks to "render a dev card", "generate a card image", "create a developer card", "make a dev card SVG", or wants to convert git analysis data into a visual card. It takes git-analysis.json and persona.json as input and produces a shareable SVG card.
version: 1.1.0
---

# Card Renderer

Render a developer identity card as an SVG file from structured analysis data. The card is optimized for Twitter/X sharing (1200x675) with an optional GitHub badge variant (800x200). SVG output requires zero external dependencies — no npm, no Node.js, no Puppeteer.

## Prerequisites

- `git-analysis.json` in the output directory (produced by git-analyzer skill)
- `persona.json` in the output directory (produced by Claude during the pipeline)

No other dependencies are required. Claude directly generates the SVG file.

## Step 1: Read Input Data

Read `git-analysis.json` and `persona.json` from the output directory. Extract the values needed for the card layout.

## Step 2: Select the Card Format

**Twitter Card (default)**: 1200x675 viewBox — optimized for Twitter/X card preview
- Full layout with persona, stats grid, language bar, and watermark
- Use the "twitter" SVG template from `${CLAUDE_PLUGIN_ROOT}/skills/card-renderer/references/card-templates.md`

**Badge (--badge flag)**: 800x200 viewBox — horizontal compact format for GitHub README
- Compact single-row layout: persona title + key stats + language bar
- Use the "badge" SVG template from `${CLAUDE_PLUGIN_ROOT}/skills/card-renderer/references/card-templates.md`

## Step 3: Apply Theme

Select the theme based on the `--theme` parameter (default: `dark`). Theme definitions are in `${CLAUDE_PLUGIN_ROOT}/skills/card-renderer/references/style-themes.md`.

Available themes: `dark`, `light`, `neon`

Each theme defines: background color, text colors, accent color, accent gradient stops, border styles, and font families.

## Step 4: Build and Write SVG

Using the template from card-templates.md:
1. Replace all theme color values
2. Insert persona data (title, description, badges, fun stat)
3. The 6 stat boxes and rank badge are already defined in the template — just replace the `{{PLACEHOLDER}}` values (COMMITS, STREAK, ADD_DEL_RATIO, PEAK_HOUR, PEAK_DAY, CONVENTIONAL_PCT, RANK)
4. Build the language bar as SVG `<rect>` elements with colors from `${CLAUDE_PLUGIN_ROOT}/skills/card-renderer/references/language-colors.md`
5. Generate 84 `<rect>` elements for `{{HEATMAP_CELLS}}` from `git-analysis.json` heatmap data (see template comments for positioning and color rules)
6. Write the complete SVG to `$OUTPUT_DIR/dev-card.svg`
7. If `--badge`, also write `$OUTPUT_DIR/dev-card-badge.svg`

## Step 5: Verify Output

Check that the output files exist and have reasonable sizes (> 2KB).

Report the file paths to the user. SVG files can be:
- Opened directly in any browser
- Uploaded to Twitter/X (convert to PNG via browser screenshot or online tool)
- Embedded in GitHub README with `<img src="dev-card.svg">`

## Persona JSON Format

The `persona.json` file (created by Claude, not this skill) contains only the selected language's fields.

When `--lang=en`:
```json
{
  "title": "The Dawn Architect",
  "description": "A builder who thrives in the quiet hours before the world wakes up.",
  "badges": ["Early Bird", "Clean Coder", "Builder"],
  "funStat": "You've committed code at 4 AM more than most people have committed at all.",
  "rank": "A"
}
```

When `--lang=ko`:
```json
{
  "title": "새벽형 설계자",
  "description": "세상이 깨어나기 전 조용한 시간에 빛나는 개발자.",
  "badges": ["얼리버드", "클린코더", "빌더"],
  "funStat": "대부분의 사람들이 커밋한 횟수보다 새벽 4시에 커밋한 횟수가 더 많습니다.",
  "rank": "A"
}
```

The field names are always `title`, `description`, `badges`, `funStat`, `rank` regardless of language.

The `rank` field is a single letter: `S`, `A`, `B`, or `C`. It is computed by the card-director agent based on commit activity metrics. The rank badge is rendered as a circle in the top-right corner of the Twitter card.

## Error Handling

- If persona.json is missing, generate a minimal default persona based on available data
- Handle missing or null fields in git-analysis.json gracefully with fallback values
- If SVG text contains special XML characters (`<`, `>`, `&`, `"`), escape them properly

## Notes

- Zero external dependencies — Claude writes SVG directly
- SVG uses system font fallbacks (Inter -> -apple-system -> Helvetica -> Arial -> sans-serif)
- Monospace values use JetBrains Mono -> Menlo -> Monaco -> monospace fallback chain
- SVG files are resolution-independent and look crisp at any size
- For PNG conversion, user can open SVG in browser and screenshot, or use any online SVG-to-PNG tool
