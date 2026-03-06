# Style Presets Reference

Five built-in style presets. Each preset defines 13 CSS properties that control the entire visual appearance.

## StyleConfig Interface

```typescript
interface StyleConfig {
  name: string;
  backgroundColor: string;
  cardColor: string;
  textColor: string;
  accentColor: string;
  mutedColor: string;
  fontPrimary: string;
  fontSecondary: string;
  headerWeight: number;
  bodyWeight: number;
  borderRadius: string;
  decorationStyle: "geometric" | "angular" | "none" | "blobs" | "thin-borders";
  gradientAngle: number;
  gradientColors: string[];
}
```

## Preset: modern

Dark background with indigo accent. Clean, tech-forward aesthetic.

```typescript
const modern: StyleConfig = {
  name: "modern",
  backgroundColor: "#0f0f23",
  cardColor: "#1a1a3e",
  textColor: "#ffffff",
  accentColor: "#6366f1",
  mutedColor: "#94a3b8",
  fontPrimary: "Inter",
  fontSecondary: "Inter",
  headerWeight: 800,
  bodyWeight: 400,
  borderRadius: "16px",
  decorationStyle: "geometric",
  gradientAngle: 135,
  gradientColors: ["#6366f1", "#8b5cf6", "#a78bfa"]
};
```

**Google Fonts URL:** `https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap`

**Decoration: geometric**
- Floating circles with low opacity (accent color at 10-20%)
- Small squares rotated 45 degrees
- Dotted grid pattern in background

## Preset: bold

Dark navy background with red accent. High contrast, attention-grabbing.

```typescript
const bold: StyleConfig = {
  name: "bold",
  backgroundColor: "#1a1a2e",
  cardColor: "#16213e",
  textColor: "#ffffff",
  accentColor: "#e94560",
  mutedColor: "#a0aec0",
  fontPrimary: "Montserrat",
  fontSecondary: "Montserrat",
  headerWeight: 900,
  bodyWeight: 400,
  borderRadius: "8px",
  decorationStyle: "angular",
  gradientAngle: 180,
  gradientColors: ["#e94560", "#c81d4e", "#a01a3b"]
};
```

**Google Fonts URL:** `https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap`

**Decoration: angular**
- Diagonal stripes using CSS gradients
- Chevron shapes via clip-path
- Angular corner cuts on cards

## Preset: minimal

Light background with blue accent. Clean, professional, easy to read.

```typescript
const minimal: StyleConfig = {
  name: "minimal",
  backgroundColor: "#fafafa",
  cardColor: "#ffffff",
  textColor: "#1a1a1a",
  accentColor: "#2563eb",
  mutedColor: "#6b7280",
  fontPrimary: "DM Sans",
  fontSecondary: "DM Sans",
  headerWeight: 700,
  bodyWeight: 400,
  borderRadius: "12px",
  decorationStyle: "none",
  gradientAngle: 90,
  gradientColors: ["#2563eb", "#3b82f6", "#60a5fa"]
};
```

**Google Fonts URL:** `https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap`

**Decoration: none**
- Typography-only layout
- Subtle horizontal rules as dividers
- Clean whitespace

## Preset: playful

Warm background with amber accent. Friendly, approachable, fun.

```typescript
const playful: StyleConfig = {
  name: "playful",
  backgroundColor: "#fef3c7",
  cardColor: "#fffbeb",
  textColor: "#1e293b",
  accentColor: "#f59e0b",
  mutedColor: "#78716c",
  fontPrimary: "Nunito",
  fontSecondary: "Nunito",
  headerWeight: 800,
  bodyWeight: 400,
  borderRadius: "24px",
  decorationStyle: "blobs",
  gradientAngle: 45,
  gradientColors: ["#f59e0b", "#fbbf24", "#fcd34d"]
};
```

**Google Fonts URL:** `https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&display=swap`

**Decoration: blobs**
- Organic blob shapes using complex border-radius
- Squiggly SVG lines
- Floating dots in accent colors

## Preset: luxury

Black background with gold accent. Premium, elegant, high-end.

```typescript
const luxury: StyleConfig = {
  name: "luxury",
  backgroundColor: "#0c0c0c",
  cardColor: "#1a1a1a",
  textColor: "#f5f5f0",
  accentColor: "#d4af37",
  mutedColor: "#8a8a7a",
  fontPrimary: "Playfair Display",
  fontSecondary: "Inter",
  headerWeight: 700,
  bodyWeight: 400,
  borderRadius: "4px",
  decorationStyle: "thin-borders",
  gradientAngle: 135,
  gradientColors: ["#d4af37", "#b8972e", "#9a7e25"]
};
```

**Google Fonts URL:** `https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;600&display=swap`

**Decoration: thin-borders**
- 1px gold borders framing content
- Corner ornaments using CSS pseudo-elements
- Subtle gold line dividers

## Brand Color Override

When the user provides `--brand-color`, replace only the `accentColor` and regenerate `gradientColors`:

```typescript
function applyBrandColor(preset: StyleConfig, brandColor: string): StyleConfig {
  return {
    ...preset,
    accentColor: brandColor,
    gradientColors: [brandColor, lighten(brandColor, 15), lighten(brandColor, 30)]
  };
}
```

The `lighten` function increases HSL lightness by the specified percentage.

## Custom Font Override

When the user provides `--font`, replace `fontPrimary` (and `fontSecondary` if they are the same in the preset):

```typescript
function applyCustomFont(preset: StyleConfig, fontName: string): StyleConfig {
  const updated = { ...preset, fontPrimary: fontName };
  if (preset.fontPrimary === preset.fontSecondary) {
    updated.fontSecondary = fontName;
  }
  return updated;
}
```

Remember to update the Google Fonts `<link>` URL to include the custom font with appropriate weights.
