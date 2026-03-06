# Brand Palette - Color Mapping from Logo Analysis

## Color Mapping Algorithm

Map the Gemini Vision analysis output to the 5-slot palette structure used by the template project.

```ts
function buildCustomPalette(analysis: LogoAnalysis): Palette {
  const { dominantColors, contrastColor } = analysis;

  return {
    primary: dominantColors[0],                    // Main brand color
    secondary: dominantColors[1],                  // Supporting color
    accent: validateHex(contrastColor),            // High-contrast accent
    highlight: dominantColors[2],                  // Tertiary / highlight
    muted: darkenToBackground(dominantColors[0]),  // Dark background base
  };
}
```

## Background Color Generation (muted slot)

The `muted` color is derived from the primary brand color, shifted to a very dark tone suitable for video backgrounds:

```ts
function darkenToBackground(hex: string): string {
  const { h } = hexToHSL(hex);
  // Keep the brand hue, reduce saturation, drop to near-black
  return hslToHex(h, 30, 10);  // saturation 25-35%, lightness 8-12%
}
```

This ensures the background has a subtle tint of the brand color rather than being pure black, creating visual cohesion.

## Hex Validation

All colors from Gemini must be validated before use:

```ts
function validateHex(color: string): string {
  const match = color.match(/^#([0-9a-fA-F]{6})$/);
  if (match) return color;

  // Try to fix common issues
  if (color.match(/^[0-9a-fA-F]{6}$/)) return `#${color}`;
  if (color.match(/^#([0-9a-fA-F]{3})$/)) {
    const [, short] = color.match(/^#([0-9a-fA-F]{3})$/)!;
    return `#${short[0]}${short[0]}${short[1]}${short[1]}${short[2]}${short[2]}`;
  }

  // Fallback to a safe default
  return "#6366f1";
}
```

## Monochrome Logo Handling

When all 3 `dominantColors` are too similar (deltaE < 10 between all pairs), expand the palette:

```ts
function expandMonochromePalette(baseColor: string): Palette {
  const { h, s, l } = hexToHSL(baseColor);

  return {
    primary: baseColor,
    secondary: hslToHex((h + 30) % 360, s, l),           // Analogous +30deg
    accent: hslToHex((h + 180) % 360, Math.min(s + 20, 100), Math.min(l + 10, 80)), // Complementary
    highlight: hslToHex((h + 60) % 360, s, Math.min(l + 15, 85)),  // Analogous +60deg
    muted: hslToHex(h, 30, 10),                           // Dark background
  };
}
```

## Contrast Verification

Verify that text will be readable against the palette colors. Use WCAG AA minimum contrast ratio of 4.5:1 for normal text:

```ts
function hasAdequateContrast(foreground: string, background: string): boolean {
  const lum1 = relativeLuminance(foreground);
  const lum2 = relativeLuminance(background);
  const ratio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
  return ratio >= 4.5;
}
```

Key contrast checks:
- White text on `muted` background (should always pass since muted is very dark)
- White text on `primary` — if primary is too light, use it only for accents, not text backgrounds
- `accent` on `muted` — accent should be visible against the dark background

If contrast is insufficient, adjust the offending color:
- Too light primary → darken by 10-15% lightness
- Too dark accent → lighten by 15-20% lightness

## HSL Utility Functions

```ts
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
```

## Full Palette Example

Given a logo analysis:
```json
{
  "dominantColors": ["#2563eb", "#7c3aed", "#60a5fa"],
  "contrastColor": "#f59e0b"
}
```

Result:
```ts
customPalette: {
  primary: "#2563eb",    // Blue from logo
  secondary: "#7c3aed",  // Purple from logo
  accent: "#f59e0b",     // Amber contrast
  highlight: "#60a5fa",  // Light blue from logo
  muted: "#0a1628",      // Dark navy (hue 220, sat 30%, light 10%)
}
```
