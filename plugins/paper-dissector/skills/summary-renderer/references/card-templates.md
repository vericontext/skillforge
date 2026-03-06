# Paper Summary Card Template (SVG)

## Main Card Template (1200x675)

Two-column layout for paper summary cards. Claude should generate this SVG by substituting all `{{PLACEHOLDER}}` values with actual data.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="accent-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:{{GRADIENT_START}}" />
      <stop offset="50%" style="stop-color:{{GRADIENT_MID}}" />
      <stop offset="100%" style="stop-color:{{GRADIENT_END}}" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="675" fill="{{BG}}" />

  <!-- Accent gradient top bar -->
  <rect width="1200" height="3" fill="url(#accent-grad)" />

  <!-- ═══════════════════════════════════════════════ -->
  <!-- LEFT COLUMN: Paper Identity (x: 48-560)        -->
  <!-- ═══════════════════════════════════════════════ -->

  <!-- Paper Title (max 2 lines, 40 chars/line) -->
  <text x="48" y="60" font-family="{{FONT_SANS}}"
        font-size="22" font-weight="700" fill="{{TEXT}}">
    <tspan x="48" dy="0">{{TITLE_LINE1}}</tspan>
    <tspan x="48" dy="28">{{TITLE_LINE2}}</tspan>
  </text>

  <!-- Authors & Venue -->
  <text x="48" y="125" font-family="{{FONT_SANS}}"
        font-size="12" fill="{{TEXT_MUTED}}">{{AUTHORS_VENUE}}</text>

  <!-- TL;DR Box -->
  <rect x="48" y="145" width="500" height="52" rx="8"
        fill="{{STAT_BG}}" stroke="{{STAT_BORDER}}" stroke-width="1" />
  <text x="60" y="160" font-family="{{FONT_SANS}}"
        font-size="10" fill="{{TEXT_MUTED}}" font-weight="600" letter-spacing="0.5">TL;DR</text>
  <text x="60" y="178" font-family="{{FONT_SANS}}"
        font-size="11" fill="{{TEXT}}" font-style="italic">
    <tspan x="60" dy="0">{{TLDR_LINE1}}</tspan>
    <tspan x="60" dy="16">{{TLDR_LINE2}}</tspan>
  </text>

  <!-- Key Contributions -->
  <text x="48" y="220" font-family="{{FONT_SANS}}"
        font-size="11" fill="{{TEXT_MUTED}}" font-weight="600" letter-spacing="0.5">KEY CONTRIBUTIONS</text>

  <!-- Contribution 1 -->
  <circle cx="56" cy="240" r="3" fill="{{ACCENT}}" />
  <text x="68" y="244" font-family="{{FONT_SANS}}"
        font-size="11" fill="{{TEXT}}">
    <tspan x="68" dy="0">{{CONTRIB1_LINE1}}</tspan>
    <tspan x="68" dy="16">{{CONTRIB1_LINE2}}</tspan>
  </text>

  <!-- Contribution 2 -->
  <circle cx="56" cy="278" r="3" fill="{{ACCENT}}" />
  <text x="68" y="282" font-family="{{FONT_SANS}}"
        font-size="11" fill="{{TEXT}}">
    <tspan x="68" dy="0">{{CONTRIB2_LINE1}}</tspan>
    <tspan x="68" dy="16">{{CONTRIB2_LINE2}}</tspan>
  </text>

  <!-- Contribution 3 -->
  <circle cx="56" cy="316" r="3" fill="{{ACCENT}}" />
  <text x="68" y="320" font-family="{{FONT_SANS}}"
        font-size="11" fill="{{TEXT}}">
    <tspan x="68" dy="0">{{CONTRIB3_LINE1}}</tspan>
    <tspan x="68" dy="16">{{CONTRIB3_LINE2}}</tspan>
  </text>

  <!-- Domain Tags -->
  <!-- Tag 1 -->
  <rect x="48" y="350" rx="10" ry="10" width="{{TAG1_W}}" height="22"
        fill="{{TAG1_BG}}" stroke="{{TAG1_COLOR}}" stroke-width="1" />
  <text x="{{TAG1_TX}}" y="365" font-family="{{FONT_SANS}}"
        font-size="10" font-weight="600" fill="{{TAG1_COLOR}}" text-anchor="middle">{{TAG1}}</text>

  <!-- Tag 2 -->
  <rect x="{{TAG2_X}}" y="350" rx="10" ry="10" width="{{TAG2_W}}" height="22"
        fill="{{TAG2_BG}}" stroke="{{TAG2_COLOR}}" stroke-width="1" />
  <text x="{{TAG2_TX}}" y="365" font-family="{{FONT_SANS}}"
        font-size="10" font-weight="600" fill="{{TAG2_COLOR}}" text-anchor="middle">{{TAG2}}</text>

  <!-- Tag 3 -->
  <rect x="{{TAG3_X}}" y="350" rx="10" ry="10" width="{{TAG3_W}}" height="22"
        fill="{{TAG3_BG}}" stroke="{{TAG3_COLOR}}" stroke-width="1" />
  <text x="{{TAG3_TX}}" y="365" font-family="{{FONT_SANS}}"
        font-size="10" font-weight="600" fill="{{TAG3_COLOR}}" text-anchor="middle">{{TAG3}}</text>

  <!-- Tag 4 (optional) -->
  {{TAG4_BLOCK}}

  <!-- ═══════════════════════════════════════════════ -->
  <!-- RIGHT COLUMN: Ratings & Stats (x: 588-1140)    -->
  <!-- ═══════════════════════════════════════════════ -->

  <!-- Rating Bars -->
  <text x="588" y="50" font-family="{{FONT_SANS}}"
        font-size="11" fill="{{TEXT_MUTED}}" font-weight="600" letter-spacing="0.5">RATINGS</text>

  <!-- Novelty -->
  <text x="588" y="80" font-family="{{FONT_SANS}}"
        font-size="11" fill="{{TEXT_MUTED}}">Novelty</text>
  <rect x="680" y="68" width="200" height="14" rx="4" fill="{{BAR_BG}}" />
  <rect x="680" y="68" width="{{NOVELTY_W}}" height="14" rx="4" fill="{{NOVELTY_COLOR}}" />
  <text x="890" y="80" font-family="{{FONT_MONO}}"
        font-size="12" font-weight="700" fill="{{TEXT}}">{{NOVELTY}}</text>

  <!-- Rigor -->
  <text x="588" y="118" font-family="{{FONT_SANS}}"
        font-size="11" fill="{{TEXT_MUTED}}">Rigor</text>
  <rect x="680" y="106" width="200" height="14" rx="4" fill="{{BAR_BG}}" />
  <rect x="680" y="106" width="{{RIGOR_W}}" height="14" rx="4" fill="{{RIGOR_COLOR}}" />
  <text x="890" y="118" font-family="{{FONT_MONO}}"
        font-size="12" font-weight="700" fill="{{TEXT}}">{{RIGOR}}</text>

  <!-- Clarity -->
  <text x="588" y="156" font-family="{{FONT_SANS}}"
        font-size="11" fill="{{TEXT_MUTED}}">Clarity</text>
  <rect x="680" y="144" width="200" height="14" rx="4" fill="{{BAR_BG}}" />
  <rect x="680" y="144" width="{{CLARITY_W}}" height="14" rx="4" fill="{{CLARITY_COLOR}}" />
  <text x="890" y="156" font-family="{{FONT_MONO}}"
        font-size="12" font-weight="700" fill="{{TEXT}}">{{CLARITY}}</text>

  <!-- Reproducibility -->
  <text x="588" y="194" font-family="{{FONT_SANS}}"
        font-size="11" fill="{{TEXT_MUTED}}">Reproducibility</text>
  <rect x="680" y="182" width="200" height="14" rx="4" fill="{{BAR_BG}}" />
  <rect x="680" y="182" width="{{REPRO_W}}" height="14" rx="4" fill="{{REPRO_COLOR}}" />
  <text x="890" y="194" font-family="{{FONT_MONO}}"
        font-size="12" font-weight="700" fill="{{TEXT}}">{{REPRO}}</text>

  <!-- Impact -->
  <text x="588" y="232" font-family="{{FONT_SANS}}"
        font-size="11" fill="{{TEXT_MUTED}}">Impact</text>
  <rect x="680" y="220" width="200" height="14" rx="4" fill="{{BAR_BG}}" />
  <rect x="680" y="220" width="{{IMPACT_W}}" height="14" rx="4" fill="{{IMPACT_COLOR}}" />
  <text x="890" y="232" font-family="{{FONT_MONO}}"
        font-size="12" font-weight="700" fill="{{TEXT}}">{{IMPACT}}</text>

  <!-- Stats Grid: 2x2 boxes. Each box 176x64. -->
  <!-- Row 1, Col 1: Equations -->
  <rect x="588" y="260" width="176" height="64" rx="8"
        fill="{{STAT_BG}}" stroke="{{STAT_BORDER}}" stroke-width="1" />
  <text x="676" y="290" text-anchor="middle"
        font-family="{{FONT_MONO}}"
        font-size="20" font-weight="700" fill="{{TEXT}}">{{EQ_COUNT}}</text>
  <text x="676" y="310" text-anchor="middle"
        font-family="{{FONT_SANS}}"
        font-size="10" fill="{{TEXT_MUTED}}" letter-spacing="0.5">EQUATIONS</text>

  <!-- Row 1, Col 2: Datasets -->
  <rect x="776" y="260" width="176" height="64" rx="8"
        fill="{{STAT_BG}}" stroke="{{STAT_BORDER}}" stroke-width="1" />
  <text x="864" y="290" text-anchor="middle"
        font-family="{{FONT_MONO}}"
        font-size="20" font-weight="700" fill="{{TEXT}}">{{DS_COUNT}}</text>
  <text x="864" y="310" text-anchor="middle"
        font-family="{{FONT_SANS}}"
        font-size="10" fill="{{TEXT_MUTED}}" letter-spacing="0.5">DATASETS</text>

  <!-- Row 2, Col 1: Baselines -->
  <rect x="588" y="336" width="176" height="64" rx="8"
        fill="{{STAT_BG}}" stroke="{{STAT_BORDER}}" stroke-width="1" />
  <text x="676" y="366" text-anchor="middle"
        font-family="{{FONT_MONO}}"
        font-size="20" font-weight="700" fill="{{TEXT}}">{{BL_COUNT}}</text>
  <text x="676" y="386" text-anchor="middle"
        font-family="{{FONT_SANS}}"
        font-size="10" fill="{{TEXT_MUTED}}" letter-spacing="0.5">BASELINES</text>

  <!-- Row 2, Col 2: Difficulty -->
  <rect x="776" y="336" width="176" height="64" rx="8"
        fill="{{STAT_BG}}" stroke="{{STAT_BORDER}}" stroke-width="1" />
  <text x="864" y="366" text-anchor="middle"
        font-family="{{FONT_MONO}}"
        font-size="16" font-weight="700" fill="{{ACCENT}}">{{DIFFICULTY}}</text>
  <text x="864" y="386" text-anchor="middle"
        font-family="{{FONT_SANS}}"
        font-size="10" fill="{{TEXT_MUTED}}" letter-spacing="0.5">DIFFICULTY</text>

  <!-- Methodology Summary Box -->
  <rect x="588" y="416" width="552" height="120" rx="8"
        fill="{{STAT_BG}}" stroke="{{STAT_BORDER}}" stroke-width="1" />
  <text x="604" y="438" font-family="{{FONT_SANS}}"
        font-size="10" fill="{{TEXT_MUTED}}" font-weight="600" letter-spacing="0.5">METHODOLOGY</text>
  <text x="604" y="456" font-family="{{FONT_SANS}}"
        font-size="12" font-weight="600" fill="{{ACCENT}}">{{METHOD_NAME}}</text>
  <text x="604" y="474" font-family="{{FONT_SANS}}"
        font-size="11" fill="{{TEXT}}">
    <tspan x="604" dy="0">{{METHOD_LINE1}}</tspan>
    <tspan x="604" dy="16">{{METHOD_LINE2}}</tspan>
    <tspan x="604" dy="16">{{METHOD_LINE3}}</tspan>
    <tspan x="604" dy="16">{{METHOD_LINE4}}</tspan>
  </text>

  <!-- ═══════════════════════════════════════════════ -->
  <!-- FOOTER                                          -->
  <!-- ═══════════════════════════════════════════════ -->

  <!-- Watermark -->
  <text x="600" y="655" font-family="{{FONT_MONO}}"
        font-size="11" fill="{{TEXT_DIM}}" text-anchor="middle">── Generated with paper-dissector ──</text>
</svg>
```

## Template Usage Notes

### Placeholder Substitution

- Claude reads `paper-analysis.json`, then generates the complete SVG by substituting all `{{PLACEHOLDER}}` values
- Text containing XML special characters must be escaped: `&` -> `&amp;`, `<` -> `&lt;`, `>` -> `&gt;`
- Empty optional fields (like TAG4_BLOCK) should be replaced with an empty string

### Rating Bar Widths

Calculate from the 1-10 rating value:
```
barWidth = (rating / 10) * 200
```

Rating bar color selection:
- Score 8-10: use `ratingHigh` from theme
- Score 5-7: use `ratingMid` from theme
- Score 1-4: use `ratingLow` from theme

### Text Wrapping

- **Title**: Split at word boundary if > 40 chars. If title fits in one line, leave `{{TITLE_LINE2}}` empty
- **TL;DR**: Split at word boundary, max 55 chars per line, max 2 lines
- **Contributions**: Each item max 45 chars per line, wrap to second `<tspan>` if needed. If only 1 line, leave LINE2 empty
- **Methodology**: Max 50 chars per line, max 4 lines

### Domain Tag Positioning

Tags are placed horizontally with 8px gaps:
- Tag 1 starts at x=48
- Tag 2 starts at x = 48 + TAG1_W + 8
- Tag 3 starts at x = TAG2_X + TAG2_W + 8
- Tag 4 (optional) starts at x = TAG3_X + TAG3_W + 8
- Width estimation: `tagText.length * 7 + 16` pixels
- Text x (center): `tagX + tagW / 2`

### Optional Tag 4

If the paper has 4+ domain tags, include the 4th tag block:
```svg
<rect x="{{TAG4_X}}" y="350" rx="10" ry="10" width="{{TAG4_W}}" height="22"
      fill="{{TAG4_BG}}" stroke="{{TAG4_COLOR}}" stroke-width="1" />
<text x="{{TAG4_TX}}" y="365" font-family="{{FONT_SANS}}"
      font-size="10" font-weight="600" fill="{{TAG4_COLOR}}" text-anchor="middle">{{TAG4}}</text>
```

If fewer than 4 tags, replace `{{TAG4_BLOCK}}` with empty string.

### Font Selection

Use the theme's font families:
- `{{FONT_SANS}}`: Theme sans-serif (or serif for academic theme)
- `{{FONT_MONO}}`: Theme monospace font
