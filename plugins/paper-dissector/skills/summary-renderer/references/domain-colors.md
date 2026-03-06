# Domain Color Map

Color associations for academic research domains. Used in the paper card for domain tags and accent customization.

```javascript
const domainColors = {
  // Computer Science
  'NLP':        { primary: '#3178c6', light: '#d4e4f7' },
  'CV':         { primary: '#e34c26', light: '#fce4dc' },
  'ML':         { primary: '#f1e05a', light: '#fdf8e0' },
  'RL':         { primary: '#00ADD8', light: '#d4f4fc' },
  'Systems':    { primary: '#555555', light: '#e8e8e8' },
  'Security':   { primary: '#701516', light: '#f0d4d4' },
  'HCI':        { primary: '#A97BFF', light: '#ede0ff' },
  'Databases':  { primary: '#e38c00', light: '#fdf0d4' },
  'Theory':     { primary: '#5e5086', light: '#e4dff0' },
  'Graphics':   { primary: '#F05138', light: '#fde0dc' },
  'Robotics':   { primary: '#00B4AB', light: '#d4f4f2' },
  'Networks':   { primary: '#4F5D95', light: '#dce0f0' },

  // Sciences
  'Bio':        { primary: '#178600', light: '#d8f0d4' },
  'Physics':    { primary: '#3572A5', light: '#d4e0f4' },
  'Chemistry':  { primary: '#c22d40', light: '#f4d4d8' },
  'Math':       { primary: '#6e4a7e', light: '#e8dcf0' },
  'Medicine':   { primary: '#bf3989', light: '#f4d4e8' },
  'Neuro':      { primary: '#dea584', light: '#f8ece4' },

  // Social Sciences
  'Economics':  { primary: '#0969da', light: '#d4e4fc' },
  'Psychology': { primary: '#41b883', light: '#dcf4e8' },
  'Education':  { primary: '#f34b7d', light: '#fce0e8' },

  // Interdisciplinary
  'AI':         { primary: '#ff3e00', light: '#ffdcd4' },
  'Data':       { primary: '#563d7c', light: '#e0d8f0' },

  // Fallback
  'Other':      { primary: '#8b8b8b', light: '#e8e8e8' },
};
```

## Usage

1. Look up the paper's `domain` field from `paper-analysis.json`
2. Use `primary` color for domain tag pills and accent elements
3. Use `light` color for tag backgrounds in light/academic themes
4. If domain is not found, fall back to `'Other'`

## Tag Rendering

Domain tags appear in the left column of the card. Render as pill-shaped badges:

```svg
<rect x="{{X}}" y="{{Y}}" rx="10" ry="10" width="{{W}}" height="22"
      fill="{{DOMAIN_LIGHT}}" stroke="{{DOMAIN_PRIMARY}}" stroke-width="1" />
<text x="{{TX}}" y="{{TY}}" font-size="10" font-weight="600"
      fill="{{DOMAIN_PRIMARY}}" text-anchor="middle">{{TAG}}</text>
```

Width estimation: `tagText.length * 7 + 16` pixels.
