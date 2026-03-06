# Image Understanding Reference

## Basic Image Analysis

```tsx
import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function analyzeImage(imagePath: string, prompt: string): Promise<string> {
  const imageData = fs.readFileSync(imagePath).toString("base64");
  const mimeType = imagePath.endsWith(".png") ? "image/png" : "image/jpeg";

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        role: "user",
        parts: [
          { inlineData: { mimeType, data: imageData } },
          { text: prompt },
        ],
      },
    ],
  });

  return response.candidates[0].content.parts[0].text;
}
```

## Color Palette Extraction

```tsx
const colorPrompt = `Analyze this image and extract the color palette.
Return a JSON object with:
{
  "dominant": ["#hex1", "#hex2", "#hex3"],
  "accent": ["#hex1", "#hex2"],
  "background": "#hex",
  "text_light": "#hex (suggested light text color)",
  "text_dark": "#hex (suggested dark text color)",
  "mood": "description of the color mood"
}
Only return the JSON, no other text.`;

const result = await analyzeImage("brand-image.jpg", colorPrompt);
const palette = JSON.parse(result);
```

Use extracted colors in Remotion:

```tsx
const SceneWithExtractedPalette: React.FC<{ palette: ColorPalette }> = ({ palette }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: palette.background }}>
      <h1 style={{ color: palette.dominant[0], fontSize: 72 }}>Title</h1>
      <p style={{ color: palette.text_light, fontSize: 36 }}>Subtitle</p>
    </AbsoluteFill>
  );
};
```

## Composition Analysis

```tsx
const compositionPrompt = `Analyze the visual composition of this image:
1. Layout structure (rule of thirds, centered, asymmetric)
2. Visual hierarchy (what draws attention first, second, third)
3. Negative space usage
4. Depth and layering
5. Suggested animation directions (where elements should enter/exit)

Format as JSON:
{
  "layout": "description",
  "focal_points": [{"x": 0-100, "y": 0-100, "description": "..."}],
  "negative_space": "description",
  "depth_layers": ["foreground", "midground", "background"],
  "animation_suggestions": [{"element": "...", "direction": "...", "timing": "..."}]
}`;

const analysis = await analyzeImage("reference.jpg", compositionPrompt);
```

## Style Analysis for Recreation

```tsx
const stylePrompt = `Analyze the visual style of this image for recreation in motion graphics:
1. Art style (flat, 3D, photographic, illustrated)
2. Color temperature (warm, cool, neutral)
3. Texture quality (smooth, textured, grainy)
4. Line quality (thick, thin, none)
5. Lighting direction and quality
6. Overall mood

Provide a prompt template I can use to generate similar images with AI:
"[style description], [subject placeholder], [composition notes]"`;

const styleGuide = await analyzeImage("style-reference.jpg", stylePrompt);
```

## Object Detection for Animation

```tsx
const objectPrompt = `Identify all distinct visual elements in this image.
For each element, provide:
{
  "elements": [
    {
      "name": "description",
      "position": {"x": 0-100, "y": 0-100},
      "size": {"width": 0-100, "height": 0-100},
      "z_index": 1,
      "suggested_animation": "fade-in / slide-left / scale-up / etc."
    }
  ]
}
Positions and sizes are percentages of total image dimensions.`;

const elements = await analyzeImage("scene.png", objectPrompt);
```

## Brand Asset Analysis

```tsx
const brandPrompt = `Analyze this brand asset (logo/brand image):
1. Primary brand colors (hex codes)
2. Typography style (serif, sans-serif, characteristics)
3. Visual tone (corporate, playful, minimal, bold)
4. Suggested complementary colors for video backgrounds
5. Recommended animation style that matches the brand identity

Format as JSON:
{
  "brand_colors": ["#hex"],
  "typography": "description",
  "tone": "description",
  "complementary_colors": ["#hex"],
  "animation_style": "description",
  "do": ["recommendation"],
  "dont": ["anti-pattern"]
}`;

const brandGuide = await analyzeImage("logo.png", brandPrompt);
```

## Multi-Image Comparison

```tsx
async function compareImages(imagePaths: string[], prompt: string): Promise<string> {
  const parts = [];

  for (const path of imagePaths) {
    const data = fs.readFileSync(path).toString("base64");
    const mimeType = path.endsWith(".png") ? "image/png" : "image/jpeg";
    parts.push({ inlineData: { mimeType, data } });
  }

  parts.push({ text: prompt });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: "user", parts }],
  });

  return response.candidates[0].content.parts[0].text;
}

// Compare generated scenes for consistency
const consistency = await compareImages(
  ["public/images/scene-1.png", "public/images/scene-2.png", "public/images/scene-3.png"],
  "Rate the visual consistency of these three images on a scale of 1-10. Identify any inconsistencies in style, color palette, or character design. Suggest improvements."
);
```

## Accessibility: Alt Text Generation

```tsx
const altTextPrompt = `Generate concise, descriptive alt text for this image.
The alt text should be:
- Under 125 characters
- Descriptive of the key visual content
- Useful for screen readers
- Not starting with "Image of" or "Picture of"

Return only the alt text string.`;

const altText = await analyzeImage("scene.png", altTextPrompt);
```
