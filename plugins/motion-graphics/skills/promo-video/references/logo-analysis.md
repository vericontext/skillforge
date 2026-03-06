# Logo Analysis - Gemini Vision Prompt & API Pattern

## Analysis Prompt

Send this prompt along with the logo image to `gemini-2.0-flash`:

```
Analyze this logo image for use in video production. Return a JSON object with exactly this structure (no markdown, no explanation, just raw JSON):

{
  "brandName": "detected or inferred brand name",
  "dominantColors": ["#hex1", "#hex2", "#hex3"],
  "styleClassification": "minimal | bold | playful | luxury | tech | organic",
  "moodKeywords": ["adjective1", "adjective2", "adjective3"],
  "suggestedIndustry": "inferred industry or domain",
  "fontStyle": "geometric-sans | humanist-sans | serif | slab | mono | display",
  "backgroundSuggestion": "one sentence describing an ideal abstract background for this brand",
  "contrastColor": "#hex that provides good contrast with the dominant colors",
  "suggestedTagline": "a short, punchy tagline that fits this brand"
}

Rules:
- dominantColors: Extract exactly 3 colors from the logo. If the logo has fewer than 3 distinct colors, generate complementary/analogous colors that match the brand feel.
- styleClassification: Choose the single best match from the options.
- moodKeywords: 3-5 adjectives that describe the emotional tone of the brand.
- fontStyle: Recommend a font category that matches the logo's typography.
- contrastColor: Must be visually distinct from all dominantColors (suitable for accent/highlight use).
- suggestedTagline: Keep it under 6 words, professional tone.
```

## API Call Pattern

```ts
import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

async function analyzeLogo(logoPath: string) {
  const imageData = fs.readFileSync(logoPath);
  const base64 = imageData.toString("base64");
  const mimeType = logoPath.endsWith(".png") ? "image/png" : "image/jpeg";

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        role: "user",
        parts: [
          { inlineData: { mimeType, data: base64 } },
          { text: ANALYSIS_PROMPT },
        ],
      },
    ],
  });

  const text = response.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  return parseAnalysisJSON(text);
}
```

## JSON Parsing Strategy

Gemini may wrap JSON in markdown code fences. Use this parsing approach:

```ts
function parseAnalysisJSON(text: string): LogoAnalysis {
  // Step 1: Try direct parse
  try {
    return JSON.parse(text);
  } catch {}

  // Step 2: Strip markdown code fences
  const stripped = text.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
  try {
    return JSON.parse(stripped);
  } catch {}

  // Step 3: Extract first JSON object with regex
  const match = stripped.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch {}
  }

  // Step 4: Throw - caller should retry or use fallback
  throw new Error("Failed to parse logo analysis JSON from Gemini response");
}
```

## Retry & Fallback

1. If parsing fails, retry the Gemini call once with an additional instruction: "Return ONLY valid JSON, no markdown formatting."
2. If the retry also fails, use the fallback:

```ts
const FALLBACK_ANALYSIS = {
  brandName: "Brand",
  dominantColors: ["#6366f1", "#8b5cf6", "#ec4899"],
  styleClassification: "minimal" as const,
  moodKeywords: ["modern", "clean", "professional"],
  suggestedIndustry: "Technology",
  fontStyle: "geometric-sans" as const,
  backgroundSuggestion: "soft gradient with subtle geometric shapes",
  contrastColor: "#06b6d4",
  suggestedTagline: "Innovation Made Simple",
};
```

## Edge Cases

### SVG Logos
Gemini Vision may not accept SVG files directly. Convert to PNG first:
- Use `sharp` library: `sharp(svgBuffer).png().toBuffer()`
- Or instruct the user to provide a PNG/JPG version

### Transparent Background Logos
Works well — Gemini can analyze the logo shape and colors regardless of transparency. The `contain-center` image style in SceneRenderer handles transparent backgrounds correctly with a drop-shadow effect.

### Monochrome Logos (single color)
Gemini will still return 3 `dominantColors`, but they may be very similar. The brand-palette.md reference has rules for generating a full palette from limited color input.

### Very Dark Logos (mostly black)
The `contrastColor` from Gemini should be a bright accent. Verify that `dominantColors[0]` has sufficient lightness (HSL L > 15%). If too dark, shift the primary color to a slightly lighter variant for the gradient background.

### Very Light Logos (mostly white)
Similar handling — the `muted` background color should still be dark (L: 8-12%), and the logo will stand out via the drop-shadow in contain-center mode.

## TypeScript Type

```ts
type LogoAnalysis = {
  brandName: string;
  dominantColors: [string, string, string];
  styleClassification: "minimal" | "bold" | "playful" | "luxury" | "tech" | "organic";
  moodKeywords: string[];
  suggestedIndustry: string;
  fontStyle: "geometric-sans" | "humanist-sans" | "serif" | "slab" | "mono" | "display";
  backgroundSuggestion: string;
  contrastColor: string;
  suggestedTagline: string;
};
```
