# Style Themes

Three built-in themes optimized for card readability and visual impact.

## Theme Configuration Object

Each theme provides these properties:

```javascript
const themes = {
  dark: {
    name: 'dark',
    bg: '#0d1117',
    text: '#e6edf3',
    textMuted: '#8b949e',
    textDim: '#484f58',
    accent: '#58a6ff',
    accentGradient: 'linear-gradient(90deg, #58a6ff 0%, #bc8cff 50%, #f778ba 100%)',
    badgeBg: 'rgba(88, 166, 255, 0.1)',
    badgeBorder: 'rgba(88, 166, 255, 0.3)',
    statBg: '#161b22',
    statBorder: '#30363d',
    barBg: '#21262d',
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
    accentGradient: 'linear-gradient(90deg, #0969da 0%, #8250df 50%, #bf3989 100%)',
    badgeBg: 'rgba(9, 105, 218, 0.08)',
    badgeBorder: 'rgba(9, 105, 218, 0.25)',
    statBg: '#f6f8fa',
    statBorder: '#d0d7de',
    barBg: '#eaeef2',
    fontSans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
    fontMono: "'JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', monospace",
  },

  neon: {
    name: 'neon',
    bg: '#0a0a0a',
    text: '#e0ffe0',
    textMuted: '#6fbb6f',
    textDim: '#2d4a2d',
    accent: '#00ff88',
    accentGradient: 'linear-gradient(90deg, #00ff88 0%, #00d4ff 50%, #ff00ff 100%)',
    badgeBg: 'rgba(0, 255, 136, 0.08)',
    badgeBorder: 'rgba(0, 255, 136, 0.3)',
    statBg: '#111111',
    statBorder: '#1a3a1a',
    barBg: '#1a1a1a',
    fontSans: "'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontMono: "'JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', monospace",
  },
};
```

## Theme Visual Characteristics

### Dark (GitHub Dark)
- Clean, professional look matching GitHub's dark mode
- Blue accent with purple-pink gradient bar
- High contrast text on near-black background
- Best for: general use, professional sharing

### Light (GitHub Light)
- Crisp white background matching GitHub's light mode
- Blue accent consistent with GitHub's design language
- Subtle stat boxes with light gray backgrounds
- Best for: README badges, light-mode contexts

### Neon (Cyberpunk)
- Deep black background with electric green accent
- RGB gradient bar (green -> cyan -> magenta)
- Glowing, high-energy aesthetic
- Best for: social media impact, developer communities

## Usage

Select theme by name:
```javascript
const theme = themes[themeName] || themes.dark;
```

Pass the theme object to the card template functions.
