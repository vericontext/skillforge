---
name: summary-renderer
description: This skill should be used when the user asks to "render a paper card", "generate a paper summary card", "create a visual paper summary", "make a paper card SVG", or wants to convert paper analysis data into a visual summary card. It takes paper-analysis.json as input and produces a shareable SVG card.
version: 1.0.0
---

# Summary Renderer

Render a visual paper summary card as an SVG file from structured analysis data. The card is optimized for social media sharing (1200x675) with a two-column academic layout. SVG output requires zero external dependencies.

## Prerequisites

- `paper-analysis.json` in the output directory (produced by paper-analyzer skill)
- A theme selection: `academic` (default), `dark`, or `light`

## Step 1: Read Input Data

Read `paper-analysis.json` from the output directory. Extract the values needed for the card layout:

- From `metadata`: title, authors, venue, year, domain, domainTags
- From `contributions`: first 2-3 contributions (for key contributions list)
- From `methodology`: approach and summary (for method box)
- From `ratings`: all 5 rating values
- From `equations`: count
- From `experiments`: datasets count, baselines count
- From `difficulty`: difficulty level

Compute a TL;DR from the abstract section summary + main contribution (1-2 sentences, max 120 characters).

## Step 2: Select Theme

Load theme definitions from `${CLAUDE_PLUGIN_ROOT}/skills/summary-renderer/references/style-themes.md`.

Apply the selected theme's color values to the SVG template.

## Step 3: Build the SVG Card

Use the template from `${CLAUDE_PLUGIN_ROOT}/skills/summary-renderer/references/card-templates.md`.

### Left Column Content (x: 48-560)

1. **Title** (y: 60-110): Paper title. If longer than 40 characters, split into 2 lines with `<tspan>`. Font size 22px bold.

2. **Authors & Venue** (y: 125): First author + "et al." + venue + year. Font size 12px muted.

3. **TL;DR** (y: 160-195): 1-2 sentence summary in a bordered box. Font size 12px italic. Max 2 lines, 50 chars per line.

4. **Key Contributions** (y: 215-320): Bulleted list of top 2-3 contributions. Each prefixed with a colored bullet. Font size 11px. Max 45 chars per line, wrap with `<tspan>`.

5. **Domain Tags** (y: 340-365): Pill-shaped badges for domainTags (max 4). Use colors from `${CLAUDE_PLUGIN_ROOT}/skills/summary-renderer/references/domain-colors.md`.

6. **Watermark** (y: 655): "Generated with paper-dissector" centered.

### Right Column Content (x: 588-1140)

1. **Rating Bars** (y: 60-260): 5 horizontal bars for Novelty, Rigor, Clarity, Reproducibility, Impact.
   - Each bar: label on the left, score on the right, filled bar in between
   - Bar width: `(rating / 10) * 200` pixels
   - Bar color: theme accent with opacity based on score (0.5 + score/20)
   - Bar height: 14px with 4px radius
   - Vertical spacing: 38px between bars

2. **Stats Grid** (y: 290-400): 2x2 grid of stat boxes (176x64 each)
   - Box 1: Equations count (number from `equations.length`)
   - Box 2: Datasets count (from `experiments.datasets.length`)
   - Box 3: Baselines count (from `experiments.baselines.length`)
   - Box 4: Difficulty level (from `difficulty`)

3. **Methodology Summary** (y: 420-600): Bordered box with methodology approach name as header and 2-3 sentence summary. Font size 11px. Max 50 chars per line.

## Step 4: Write SVG

1. Replace all `{{PLACEHOLDER}}` values with actual data
2. Escape XML special characters: `&` -> `&amp;`, `<` -> `&lt;`, `>` -> `&gt;`, `"` -> `&quot;`
3. Write the complete SVG to `$OUTPUT_DIR/paper-card.svg` using the Write tool

## Layout Constraints (CRITICAL)

The card viewBox is exactly 1200x675. ALL content MUST fit within this boundary.

**Hard rules:**
- No text or element may extend beyond x=1140 (60px right margin)
- No text or element may extend beyond y=660 (15px bottom margin)
- Title text: max 80 characters total across 2 lines, 40 chars per line
- Authors line: truncate to "FirstAuthor et al. (Venue Year)" if too long
- Contribution items: max 45 characters per line, wrap to next line
- Stats values: use abbreviated forms (e.g., "12" not "twelve")
- Methodology summary: max 4 lines of 50 characters each

**Before writing the SVG**, verify that:
- The rightmost element's x + width < 1140
- The bottommost element's y + height < 660
- All text fits within its container

## Step 5: Verify Output

Check that the output file exists and has a reasonable size (> 2KB).

Report the file path to the user. SVG files can be:
- Opened directly in any browser
- Converted to PNG for sharing
- Embedded in documents or presentations

## Error Handling

- If paper-analysis.json is missing required fields, use sensible defaults:
  - Missing ratings: show "N/A" instead of bars
  - Missing equations: show "0" in stats
  - Missing methodology: show "See paper" in the method box
- Handle null/undefined fields gracefully
- If title contains special characters, escape for XML
