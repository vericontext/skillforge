# Card Templates (SVG)

## Twitter Card Template (1200x675)

The main card uses a two-column SVG layout. Claude should generate this SVG by substituting the placeholder values.

All `{{PLACEHOLDER}}` values must be replaced with actual data before writing to file.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="accent-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:{{GRADIENT_START}}" />
      <stop offset="50%" style="stop-color:{{GRADIENT_MID}}" />
      <stop offset="100%" style="stop-color:{{GRADIENT_END}}" />
    </linearGradient>
    <clipPath id="lang-bar-clip">
      <rect x="588" y="468" width="540" height="8" rx="4" />
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="1200" height="675" fill="{{BG}}" />

  <!-- Accent gradient top bar -->
  <rect width="1200" height="3" fill="url(#accent-grad)" />

  <!-- LEFT COLUMN: Persona -->

  <!-- Title -->
  <text x="48" y="180" font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
        font-size="36" font-weight="700" fill="{{ACCENT}}">{{PERSONA_TITLE}}</text>

  <!-- Description (may need line wrapping - use multiple tspan) -->
  <text x="48" y="220" font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
        font-size="14" fill="{{TEXT_MUTED}}">
    <tspan x="48" dy="0">{{DESCRIPTION_LINE1}}</tspan>
    <tspan x="48" dy="20">{{DESCRIPTION_LINE2}}</tspan>
  </text>

  <!-- Badges -->
  <!-- Badge 1 -->
  <rect x="48" y="270" rx="12" ry="12" width="{{BADGE1_W}}" height="26"
        fill="{{BADGE_BG}}" stroke="{{BADGE_BORDER}}" stroke-width="1" />
  <text x="{{BADGE1_TX}}" y="288" font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
        font-size="12" font-weight="500" fill="{{ACCENT}}" text-anchor="middle">{{BADGE1}}</text>

  <!-- Badge 2 -->
  <rect x="{{BADGE2_X}}" y="270" rx="12" ry="12" width="{{BADGE2_W}}" height="26"
        fill="{{BADGE_BG}}" stroke="{{BADGE_BORDER}}" stroke-width="1" />
  <text x="{{BADGE2_TX}}" y="288" font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
        font-size="12" font-weight="500" fill="{{ACCENT}}" text-anchor="middle">{{BADGE2}}</text>

  <!-- Badge 3 -->
  <rect x="{{BADGE3_X}}" y="270" rx="12" ry="12" width="{{BADGE3_W}}" height="26"
        fill="{{BADGE_BG}}" stroke="{{BADGE_BORDER}}" stroke-width="1" />
  <text x="{{BADGE3_TX}}" y="288" font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
        font-size="12" font-weight="500" fill="{{ACCENT}}" text-anchor="middle">{{BADGE3}}</text>

  <!-- Fun stat (left column, boxed) -->
  <rect x="48" y="320" width="500" height="72" rx="10"
        fill="{{STAT_BG}}" stroke="{{STAT_BORDER}}" stroke-width="1" />
  <text x="68" y="340" font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
        font-size="11" fill="{{TEXT_MUTED}}" font-weight="500" letter-spacing="0.5">FUN STAT</text>
  <text x="68" y="360" font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
        font-size="12" fill="{{TEXT}}" font-style="italic">
    <tspan x="68" dy="0">{{FUN_STAT_LINE1}}</tspan>
    <tspan x="68" dy="18">{{FUN_STAT_LINE2}}</tspan>
  </text>

  <!-- Author & repo -->
  <text x="48" y="400" font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
        font-size="13" fill="{{TEXT_DIM}}">@{{AUTHOR}} · {{REPO}}</text>

  <!-- RIGHT COLUMN: Stats -->

  <!-- Rank Badge (top-right corner) -->
  <circle cx="1140" cy="52" r="26" fill="{{ACCENT}}" />
  <text x="1140" y="60" text-anchor="middle"
        font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
        font-size="24" font-weight="800" fill="{{BG}}">{{RANK}}</text>

  <!-- Stats Grid: 6 boxes, 3 cols x 2 rows. Each box 176x78. -->
  <!-- Row 1, Col 1: Commits -->
  <rect x="588" y="140" width="176" height="78" rx="8"
        fill="{{STAT_BG}}" stroke="{{STAT_BORDER}}" stroke-width="1" />
  <text x="676" y="175" text-anchor="middle"
        font-family="'JetBrains Mono',Menlo,Monaco,monospace"
        font-size="22" font-weight="700" fill="{{TEXT}}">{{COMMITS}}</text>
  <text x="676" y="198" text-anchor="middle"
        font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
        font-size="11" fill="{{TEXT_MUTED}}" text-transform="uppercase" letter-spacing="0.5">COMMITS</text>

  <!-- Row 1, Col 2: Streak -->
  <rect x="776" y="140" width="176" height="78" rx="8"
        fill="{{STAT_BG}}" stroke="{{STAT_BORDER}}" stroke-width="1" />
  <text x="864" y="175" text-anchor="middle"
        font-family="'JetBrains Mono',Menlo,Monaco,monospace"
        font-size="22" font-weight="700" fill="{{TEXT}}">{{STREAK}}d</text>
  <text x="864" y="198" text-anchor="middle"
        font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
        font-size="11" fill="{{TEXT_MUTED}}" text-transform="uppercase" letter-spacing="0.5">BEST STREAK</text>

  <!-- Row 1, Col 3: Add/Del Ratio -->
  <rect x="964" y="140" width="176" height="78" rx="8"
        fill="{{STAT_BG}}" stroke="{{STAT_BORDER}}" stroke-width="1" />
  <text x="1052" y="175" text-anchor="middle"
        font-family="'JetBrains Mono',Menlo,Monaco,monospace"
        font-size="22" font-weight="700" fill="{{TEXT}}">{{ADD_DEL_RATIO}}</text>
  <text x="1052" y="198" text-anchor="middle"
        font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
        font-size="11" fill="{{TEXT_MUTED}}" text-transform="uppercase" letter-spacing="0.5">ADD/DEL</text>

  <!-- Row 2, Col 1: Peak Hour -->
  <rect x="588" y="230" width="176" height="78" rx="8"
        fill="{{STAT_BG}}" stroke="{{STAT_BORDER}}" stroke-width="1" />
  <text x="676" y="265" text-anchor="middle"
        font-family="'JetBrains Mono',Menlo,Monaco,monospace"
        font-size="22" font-weight="700" fill="{{TEXT}}">{{PEAK_HOUR}}</text>
  <text x="676" y="288" text-anchor="middle"
        font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
        font-size="11" fill="{{TEXT_MUTED}}" text-transform="uppercase" letter-spacing="0.5">PEAK HOUR</text>

  <!-- Row 2, Col 2: Peak Day -->
  <rect x="776" y="230" width="176" height="78" rx="8"
        fill="{{STAT_BG}}" stroke="{{STAT_BORDER}}" stroke-width="1" />
  <text x="864" y="265" text-anchor="middle"
        font-family="'JetBrains Mono',Menlo,Monaco,monospace"
        font-size="22" font-weight="700" fill="{{TEXT}}">{{PEAK_DAY}}</text>
  <text x="864" y="288" text-anchor="middle"
        font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
        font-size="11" fill="{{TEXT_MUTED}}" text-transform="uppercase" letter-spacing="0.5">PEAK DAY</text>

  <!-- Row 2, Col 3: Conventional % -->
  <rect x="964" y="230" width="176" height="78" rx="8"
        fill="{{STAT_BG}}" stroke="{{STAT_BORDER}}" stroke-width="1" />
  <text x="1052" y="265" text-anchor="middle"
        font-family="'JetBrains Mono',Menlo,Monaco,monospace"
        font-size="22" font-weight="700" fill="{{TEXT}}">{{CONVENTIONAL_PCT}}%</text>
  <text x="1052" y="288" text-anchor="middle"
        font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
        font-size="11" fill="{{TEXT_MUTED}}" text-transform="uppercase" letter-spacing="0.5">CONVENTIONAL</text>

  <!-- Language Bar -->
  <g clip-path="url(#lang-bar-clip)">
    <rect x="588" y="468" width="540" height="8" fill="{{BAR_BG}}" rx="4" />
    {{LANG_BAR_RECTS}}
  </g>

  <!-- Language Labels -->
  {{LANG_LABELS}}

  <!-- Period -->
  <text x="588" y="520" font-family="'JetBrains Mono',Menlo,Monaco,monospace"
        font-size="12" fill="{{TEXT_DIM}}">{{PERIOD_FROM}} — {{PERIOD_TO}}</text>

  <!-- Commit Heatmap: 7 rows (Mon-Sun) x 12 cols (weeks). Each cell 10x10, gap 2px (12px pitch). -->
  <!-- Origin: x=48, y=430 (left column, below Author/repo). -->
  <!-- Grid size: 12 cols × 12px = 144px wide, 7 rows × 12px = 84px tall. -->
  <!-- Example (first 3 cells of week 0): -->
  <!--
  <rect x="48" y="430" width="10" height="10" rx="2" fill="{{BAR_BG}}" />
  <rect x="48" y="442" width="10" height="10" rx="2" fill="{{ACCENT}}" opacity="0.25" />
  <rect x="48" y="454" width="10" height="10" rx="2" fill="{{ACCENT}}" opacity="0.75" />
  -->
  <!-- Cell position: x = 48 + col*12, y = 430 + row*12 -->
  <!-- col = Math.floor(dayIndex / 7), row = dayIndex % 7 -->
  <!-- Color: count==0 → fill="{{BAR_BG}}", count==1 → accent opacity 0.25, -->
  <!--         count 2-3 → opacity 0.50, count 4-6 → opacity 0.75, count>=7 → opacity 1.0 -->
  <!-- IMPORTANT: Generate ALL 84 rect elements. Do NOT skip any. -->
  {{HEATMAP_CELLS}}

  <!-- Watermark -->
  <text x="600" y="655" font-family="'JetBrains Mono',Menlo,Monaco,monospace"
        font-size="11" fill="{{TEXT_DIM}}" text-anchor="middle">── Generated with dev-card ──</text>
</svg>
```

### Language Bar Rects

Build consecutive `<rect>` elements. Track cumulative x offset:

```svg
<!-- For each language, calculate x position and width -->
<rect x="{{CUMULATIVE_X}}" y="468" width="{{LANG_WIDTH}}" height="8" fill="{{LANG_COLOR}}" />
```

Where:
- First rect starts at x=588
- `LANG_WIDTH = (percentage / 100) * 540`
- Next rect x = previous x + previous width

### Language Labels

Place below the bar, starting at y=498:

```svg
<text x="{{LABEL_X}}" y="498" font-family="monospace" font-size="11" fill="{{LANG_COLOR}}">● {{LANG_NAME}} {{LANG_PCT}}%</text>
```

Space labels evenly across the 540px width (max 4 labels).

---

## Badge Template (800x200)

Compact horizontal layout for GitHub README embedding.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" width="800" height="200">
  <defs>
    <linearGradient id="accent-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:{{GRADIENT_START}}" />
      <stop offset="50%" style="stop-color:{{GRADIENT_MID}}" />
      <stop offset="100%" style="stop-color:{{GRADIENT_END}}" />
    </linearGradient>
    <clipPath id="badge-lang-clip">
      <rect x="620" y="82" width="140" height="6" rx="3" />
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="800" height="200" fill="{{BG}}" />

  <!-- Left accent bar (vertical) -->
  <rect width="3" height="200" fill="url(#accent-grad)" />

  <!-- Persona title -->
  <text x="28" y="92" font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
        font-size="20" font-weight="700" fill="{{ACCENT}}">{{PERSONA_TITLE}}</text>

  <!-- Author -->
  <text x="28" y="114" font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
        font-size="12" fill="{{TEXT_MUTED}}">@{{AUTHOR}}</text>

  <!-- Stats -->
  <!-- Commits -->
  <text x="300" y="88" text-anchor="middle"
        font-family="'JetBrains Mono',Menlo,Monaco,monospace"
        font-size="18" font-weight="700" fill="{{TEXT}}">{{COMMITS}}</text>
  <text x="300" y="108" text-anchor="middle"
        font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
        font-size="10" fill="{{TEXT_MUTED}}">COMMITS</text>

  <!-- Streak -->
  <text x="420" y="88" text-anchor="middle"
        font-family="'JetBrains Mono',Menlo,Monaco,monospace"
        font-size="18" font-weight="700" fill="{{TEXT}}">{{STREAK}}</text>
  <text x="420" y="108" text-anchor="middle"
        font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
        font-size="10" fill="{{TEXT_MUTED}}">BEST</text>

  <!-- Top Language -->
  <text x="540" y="88" text-anchor="middle"
        font-family="'JetBrains Mono',Menlo,Monaco,monospace"
        font-size="18" font-weight="700" fill="{{TEXT}}">{{TOP_LANG}}</text>
  <text x="540" y="108" text-anchor="middle"
        font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
        font-size="10" fill="{{TEXT_MUTED}}">TOP LANG</text>

  <!-- Language bar -->
  <g clip-path="url(#badge-lang-clip)">
    <rect x="620" y="82" width="140" height="6" fill="{{BAR_BG}}" rx="3" />
    {{LANG_BAR_RECTS}}
  </g>

  <!-- Watermark -->
  <text x="780" y="185" text-anchor="end"
        font-family="'JetBrains Mono',Menlo,Monaco,monospace"
        font-size="9" fill="{{TEXT_DIM}}">dev-card</text>
</svg>
```

## Template Usage Notes

- Claude reads the analysis/persona JSON, then generates the complete SVG by substituting all `{{PLACEHOLDER}}` values
- `persona.json` always uses `title`, `description`, `badges`, `funStat` field names regardless of language — use them directly without language switching logic
- Text that might contain XML special characters must be escaped: `&` -> `&amp;`, `<` -> `&lt;`, `>` -> `&gt;`
- For long text (description, fun stat), split into multiple `<tspan>` elements at ~50 characters per line
- Badge widths for persona badges: estimate ~8px per character + 24px padding
- Write the final SVG directly to file using the Write tool — no build step needed

