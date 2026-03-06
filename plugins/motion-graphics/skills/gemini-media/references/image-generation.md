# Image Generation Reference

## Basic Generation

```tsx
import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateImage(prompt: string, outputPath: string): Promise<void> {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-exp",
    contents: prompt,
    config: {
      responseModalities: ["TEXT", "IMAGE"],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const buffer = Buffer.from(part.inlineData.data, "base64");
      fs.writeFileSync(outputPath, buffer);
      console.log(`Image saved to ${outputPath}`);
    }
  }
}
```

## Prompt Engineering for Motion Graphics

### Style Anchors

A style anchor is a prefix added to every prompt to maintain visual consistency:

```
Flat illustration style:
"flat vector illustration, clean lines, solid colors, minimal shadows, white background"

Cinematic style:
"cinematic photograph, dramatic lighting, shallow depth of field, film grain, warm tones"

3D rendered style:
"3D rendered, soft lighting, pastel colors, clay-like textures, isometric view"

Watercolor style:
"watercolor painting, soft edges, muted colors, paper texture, artistic brush strokes"

Pixel art:
"pixel art, 16-bit style, limited color palette, crisp edges, retro gaming aesthetic"
```

### Composition Hints

Include framing and composition in prompts:

```
"[style anchor], wide shot, rule of thirds composition, subject on left third"
"[style anchor], close-up, centered subject, blurred background"
"[style anchor], bird's eye view, symmetrical layout, geometric patterns"
"[style anchor], low angle shot, dramatic perspective, hero pose"
```

### Color Palette Control

Specify colors explicitly:

```
"[style anchor], color palette: navy blue (#1a1a4e), coral (#ff6b6b), white (#ffffff), gold accent (#feca57)"
```

### Aspect Ratio Hints

```
"[style anchor], 16:9 landscape format, cinematic widescreen"
"[style anchor], 9:16 portrait format, vertical mobile composition"
"[style anchor], 1:1 square format, centered composition"
```

## Batch Generation with Consistency

### Scene-Based Generation

```tsx
interface SceneConfig {
  id: string;
  prompt: string;
}

const styleAnchor = "modern flat illustration, vibrant gradients, geometric shapes, tech startup aesthetic";

const scenes: SceneConfig[] = [
  { id: "intro", prompt: "A team of developers collaborating around a large screen" },
  { id: "problem", prompt: "A person overwhelmed by multiple browser tabs and notifications" },
  { id: "solution", prompt: "A clean, organized dashboard with key metrics highlighted" },
  { id: "features", prompt: "Three floating cards showing app features with icons" },
  { id: "cta", prompt: "A hand reaching toward a glowing 'Get Started' button" },
];

async function generateSceneAssets(outputDir: string): Promise<void> {
  fs.mkdirSync(outputDir, { recursive: true });

  for (const scene of scenes) {
    const outputPath = `${outputDir}/${scene.id}.png`;

    if (fs.existsSync(outputPath)) {
      console.log(`Skipping ${scene.id} (already exists)`);
      continue;
    }

    const fullPrompt = `${styleAnchor}. ${scene.prompt}. 16:9 landscape format.`;
    await generateImage(fullPrompt, outputPath);

    // Rate limiting - avoid API quota issues
    await new Promise((r) => setTimeout(r, 1000));
  }
}
```

### Character Consistency

For consistent characters across scenes:

```
Base character description:
"A young woman with short blue hair, round glasses, wearing a yellow hoodie"

Scene 1: "[style anchor]. [character description] sitting at a desk, typing on laptop"
Scene 2: "[style anchor]. [character description] standing in front of whiteboard, presenting"
Scene 3: "[style anchor]. [character description] celebrating with confetti, arms raised"
```

## Image Editing / Variation

Generate variations by describing modifications:

```tsx
// Generate a variation of an existing image
const originalImage = fs.readFileSync("public/images/scene-1.png").toString("base64");

const response = await ai.models.generateContent({
  model: "gemini-2.0-flash-exp",
  contents: [
    {
      role: "user",
      parts: [
        {
          inlineData: {
            mimeType: "image/png",
            data: originalImage,
          },
        },
        { text: "Generate a variation of this image with a nighttime color palette - darker blues and purples, with glowing accents" },
      ],
    },
  ],
  config: {
    responseModalities: ["TEXT", "IMAGE"],
  },
});
```

## Background Generation

Generate backgrounds for video compositions:

```tsx
const backgrounds = [
  "Abstract gradient background, deep purple to dark blue, subtle geometric patterns",
  "Minimalist grid pattern, light gray lines on white, perspective depth",
  "Organic blob shapes, pastel pink and mint green, soft blur",
  "Dark tech background, circuit board pattern, glowing blue lines",
];

for (const [i, prompt] of backgrounds.entries()) {
  await generateImage(
    `${prompt}. Clean, simple, suitable as a video background. No text. 1920x1080.`,
    `public/images/bg-${i + 1}.png`
  );
}
```

## Icon and Element Generation

Generate UI elements and icons:

```tsx
const elements = [
  "A simple checkmark icon, green, flat design, transparent background",
  "A loading spinner icon, blue gradient, modern, transparent background",
  "A notification bell icon, yellow, flat design, transparent background",
];

for (const [i, prompt] of elements.entries()) {
  await generateImage(prompt, `public/images/icon-${i + 1}.png`);
}
```

## Integration with Remotion

After generating images, use them in compositions:

```tsx
// scenes.json
{
  "scenes": [
    {
      "id": "intro",
      "image": "images/intro.png",
      "title": "Welcome",
      "duration": 3
    },
    {
      "id": "main",
      "image": "images/main.png",
      "title": "Our Product",
      "duration": 5
    }
  ]
}
```

```tsx
// Composition that reads scene data
const AIVideoComp: React.FC<{ scenes: Scene[] }> = ({ scenes }) => {
  return (
    <Series>
      {scenes.map((scene) => (
        <Series.Sequence key={scene.id} durationInFrames={scene.duration * 30}>
          <AIScene imageFile={scene.image} caption={scene.title} />
        </Series.Sequence>
      ))}
    </Series>
  );
};
```
