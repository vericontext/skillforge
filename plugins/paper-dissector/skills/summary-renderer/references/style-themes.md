# Style Themes

Three built-in themes for paper summary cards, each optimized for different contexts.

## Theme Configuration Object

```javascript
const themes = {
  academic: {
    name: 'academic',
    bg: '#faf8f5',
    text: '#2c2416',
    textMuted: '#6b5d4d',
    textDim: '#b8a898',
    accent: '#1a3a5c',
    accentSecondary: '#8b4513',
    gradientStart: '#1a3a5c',
    gradientMid: '#4a6741',
    gradientEnd: '#8b4513',
    badgeBg: 'rgba(26, 58, 92, 0.08)',
    badgeBorder: 'rgba(26, 58, 92, 0.25)',
    statBg: '#f0ece6',
    statBorder: '#d4ccc0',
    barBg: '#e8e0d4',
    barFill: '#1a3a5c',
    ratingHigh: '#2d6a30',
    ratingMid: '#b8860b',
    ratingLow: '#8b2500',
    fontSans: "'Georgia', 'Times New Roman', 'Palatino', serif",
    fontMono: "'JetBrains Mono', 'Menlo', 'Monaco', monospace",
  },

  dark: {
    name: 'dark',
    bg: '#0d1117',
    text: '#e6edf3',
    textMuted: '#8b949e',
    textDim: '#484f58',
    accent: '#58a6ff',
    accentSecondary: '#bc8cff',
    gradientStart: '#58a6ff',
    gradientMid: '#bc8cff',
    gradientEnd: '#f778ba',
    badgeBg: 'rgba(88, 166, 255, 0.1)',
    badgeBorder: 'rgba(88, 166, 255, 0.3)',
    statBg: '#161b22',
    statBorder: '#30363d',
    barBg: '#21262d',
    barFill: '#58a6ff',
    ratingHigh: '#3fb950',
    ratingMid: '#d29922',
    ratingLow: '#f85149',
    fontSans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
    fontMono: "'JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', monospace",
  },

  light: {
    name: 'light',
    bg: '#ffffff',
    text: '#1f2328',
    textMuted: '#656d76',
    textDim: '#b1bac4',
    accent: '#0969da',
    accentSecondary: '#8250df',
    gradientStart: '#0969da',
    gradientMid: '#8250df',
    gradientEnd: '#bf3989',
    badgeBg: 'rgba(9, 105, 218, 0.08)',
    badgeBorder: 'rgba(9, 105, 218, 0.25)',
    statBg: '#f6f8fa',
    statBorder: '#d0d7de',
    barBg: '#eaeef2',
    barFill: '#0969da',
    ratingHigh: '#1a7f37',
    ratingMid: '#9a6700',
    ratingLow: '#cf222e',
    fontSans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
    fontMono: "'JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', monospace",
  },
};
```

## Theme Visual Characteristics

### Academic (Default)
- Warm ivory background with navy and sienna accents
- Serif font (Georgia/Palatino) for a scholarly feel
- Muted earth tones for borders and backgrounds
- Rating colors: green (high), gold (mid), rust (low)
- Best for: academic sharing, conference presentations, research blogs

### Dark
- GitHub dark mode aesthetic
- Sans-serif Inter font for modern look
- Blue-purple-pink gradient accent
- Matches the dev-card dark theme for visual consistency
- Best for: social media, developer communities, Twitter/X

### Light
- Clean white background
- GitHub light mode style
- Blue accent with purple secondary
- High contrast for readability
- Best for: documents, presentations, light-mode contexts

## Usage

Select theme by name:
```javascript
const theme = themes[themeName] || themes.academic;
```

### Rating Bar Colors

Rating bars use graduated colors based on the score value:
- Score 8-10: `ratingHigh` (green tones)
- Score 5-7: `ratingMid` (gold/yellow tones)
- Score 1-4: `ratingLow` (red tones)

### Gradient Usage

The three-stop gradient is used for the top accent bar:
```svg
<linearGradient id="accent-grad" x1="0%" y1="0%" x2="100%" y2="0%">
  <stop offset="0%" style="stop-color:{{GRADIENT_START}}" />
  <stop offset="50%" style="stop-color:{{GRADIENT_MID}}" />
  <stop offset="100%" style="stop-color:{{GRADIENT_END}}" />
</linearGradient>
```
