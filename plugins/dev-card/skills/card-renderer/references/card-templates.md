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

  <!-- Fun stat -->
  <text x="48" y="340" font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
        font-size="13" fill="{{TEXT_MUTED}}" font-style="italic">
    <tspan x="48" dy="0">"{{FUN_STAT_LINE1}}</tspan>
    <tspan x="48" dy="18">{{FUN_STAT_LINE2}}"</tspan>
  </text>

  <!-- Author & repo -->
  <text x="48" y="400" font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
        font-size="13" fill="{{TEXT_DIM}}">@{{AUTHOR}} · {{REPO}}</text>

  <!-- RIGHT COLUMN: Stats -->

  <!-- Stats Grid (2 rows x 3 cols) -->
  <!-- Row 1 -->
  {{STAT_BOXES_ROW1}}
  <!-- Row 2 -->
  {{STAT_BOXES_ROW2}}

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

  <!-- Watermark -->
  <text x="600" y="655" font-family="'JetBrains Mono',Menlo,Monaco,monospace"
        font-size="11" fill="{{TEXT_DIM}}" text-anchor="middle">── Generated with dev-card ──</text>
</svg>
```

### Stat Box Helper

Each stat box is a group of SVG elements. Generate 6 boxes in a 3x2 grid.

Grid positions (x, y for top-left of each box):
- Row 1: (588, 140), (776, 140), (964, 140)
- Row 2: (588, 230), (776, 230), (964, 230)

Each box is 176x78:

```svg
<!-- Stat box template -->
<rect x="{{BOX_X}}" y="{{BOX_Y}}" width="176" height="78" rx="8"
      fill="{{STAT_BG}}" stroke="{{STAT_BORDER}}" stroke-width="1" />
<text x="{{BOX_CX}}" y="{{BOX_Y+35}}" text-anchor="middle"
      font-family="'JetBrains Mono',Menlo,Monaco,monospace"
      font-size="22" font-weight="700" fill="{{TEXT}}">{{VALUE}}</text>
<text x="{{BOX_CX}}" y="{{BOX_Y+58}}" text-anchor="middle"
      font-family="Inter,-apple-system,Helvetica,Arial,sans-serif"
      font-size="11" fill="{{TEXT_MUTED}}" text-transform="uppercase"
      letter-spacing="0.5">{{LABEL}}</text>
```

Where `BOX_CX = BOX_X + 88` (center of 176px width).

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
- Text that might contain XML special characters must be escaped: `&` -> `&amp;`, `<` -> `&lt;`, `>` -> `&gt;`
- For long text (description, fun stat), split into multiple `<tspan>` elements at ~50 characters per line
- Badge widths for persona badges: estimate ~8px per character + 24px padding
- Write the final SVG directly to file using the Write tool — no build step needed
