---
name: gemini-media
description: This skill should be used when the user asks to "generate images for video", "create AI images", "analyze a video", "understand video content", "extract colors from image", "generate assets with Gemini", or discusses Gemini API, AI image generation, image understanding, video analysis, multimodal AI, or integrating AI-generated visuals into Remotion projects.
version: 1.0.0
---

# Gemini Media - AI Image Generation and Video Understanding

This skill covers using Google's Gemini API for image generation, image understanding, and video analysis, integrated with Remotion video projects.

## Setup

### Install the SDK

```bash
npm install @google/genai
```

### API Key Configuration

Set the `GEMINI_API_KEY` environment variable:

```bash
export GEMINI_API_KEY="your-api-key-here"
```

In code, initialize the client:

```tsx
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
```

### Model Selection

- `gemini-2.0-flash-exp` - Fast, supports image generation with `responseModalities: ["TEXT", "IMAGE"]`
- `gemini-2.0-flash` - Fast multimodal understanding (image/video input)
- `gemini-2.5-pro-preview-06-05` - Most capable, complex reasoning tasks

For image generation, use `gemini-2.0-flash-exp` with image response modality. For image/video understanding, use `gemini-2.0-flash` or `gemini-2.5-pro`.

See `${CLAUDE_PLUGIN_ROOT}/skills/gemini-media/references/api-setup.md` for detailed SDK configuration.

## Image Generation

### Basic Image Generation

```tsx
import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const response = await ai.models.generateContent({
  model: "gemini-2.0-flash-exp",
  contents: "Generate an image of a futuristic city skyline at sunset, digital art style",
  config: {
    responseModalities: ["TEXT", "IMAGE"],
  },
});

// Extract and save the image
for (const part of response.candidates[0].content.parts) {
  if (part.inlineData) {
    const buffer = Buffer.from(part.inlineData.data, "base64");
    fs.writeFileSync("public/images/city.png", buffer);
  }
}
```

### Prompt Engineering for Consistent Style

To maintain visual consistency across video scenes, include style anchors in every prompt:

```
Style anchor: "flat illustration, soft pastel colors, thick outlines,
minimalist background, consistent lighting from top-left"

Scene 1: [style anchor] + "A person sitting at a desk with a laptop"
Scene 2: [style anchor] + "The same person standing in front of a whiteboard"
Scene 3: [style anchor] + "Close-up of hands typing on a keyboard"
```

### Batch Generation for Video Scenes

Generate multiple scene images with consistent style:

```tsx
const styleAnchor = "digital illustration, vibrant colors, clean lines, 16:9 aspect ratio";

const scenes = [
  "A rocket launching from a launchpad",
  "The rocket flying through clouds",
  "The rocket in outer space with Earth below",
  "The rocket landing on the moon",
];

for (const [i, scene] of scenes.entries()) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-exp",
    contents: `${styleAnchor}. ${scene}`,
    config: {
      responseModalities: ["TEXT", "IMAGE"],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const buffer = Buffer.from(part.inlineData.data, "base64");
      fs.writeFileSync(`public/images/scene-${i + 1}.png`, buffer);
    }
  }
}
```

See `${CLAUDE_PLUGIN_ROOT}/skills/gemini-media/references/image-generation.md` for advanced prompt patterns and style consistency techniques.

Use the helper script at `${CLAUDE_PLUGIN_ROOT}/scripts/generate-image.ts` for quick image generation:

```bash
npx tsx ${CLAUDE_PLUGIN_ROOT}/scripts/generate-image.ts "a mountain landscape" public/images/mountain.png
```

## Image Understanding

Gemini can analyze images for color extraction, composition analysis, and content description:

```tsx
const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: [
    {
      role: "user",
      parts: [
        { text: "Analyze this image. Extract the dominant colors as hex codes, describe the composition, and suggest a matching color palette for text overlays." },
        {
          inlineData: {
            mimeType: "image/png",
            data: fs.readFileSync("reference-image.png").toString("base64"),
          },
        },
      ],
    },
  ],
});

console.log(response.candidates[0].content.parts[0].text);
```

Use cases for video production:
- Extract color palettes from brand assets for consistent theming
- Analyze reference images to replicate visual styles
- Describe image content for accessibility (alt text, captions)
- Detect objects and layouts for animation alignment

See `${CLAUDE_PLUGIN_ROOT}/skills/gemini-media/references/image-understanding.md` for detailed analysis patterns.

## Video Understanding

Gemini can analyze video files for content, timing, and style extraction:

```tsx
// Upload video file
const uploadResult = await ai.files.upload({
  file: "input-video.mp4",
  config: { mimeType: "video/mp4" },
});

// Wait for processing
let file = await ai.files.get({ name: uploadResult.name });
while (file.state === "PROCESSING") {
  await new Promise((r) => setTimeout(r, 2000));
  file = await ai.files.get({ name: uploadResult.name });
}

// Analyze the video
const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: [
    {
      role: "user",
      parts: [
        { fileData: { fileUri: file.uri, mimeType: "video/mp4" } },
        { text: "Analyze this video. For each scene, describe: (1) timestamp range, (2) visual content, (3) motion/animation style, (4) color palette, (5) text overlays if any." },
      ],
    },
  ],
});
```

Use cases:
- Analyze reference videos to extract style and timing
- Generate storyboards from existing footage
- Extract scene transitions and pacing
- Identify text, logos, and visual elements

See `${CLAUDE_PLUGIN_ROOT}/skills/gemini-media/references/video-understanding.md` for timestamp-based analysis and storyboard generation.

Use the helper scripts:

```bash
# Analyze a video
npx tsx ${CLAUDE_PLUGIN_ROOT}/scripts/analyze-video.ts path/to/video.mp4

# Analyze an image
npx tsx ${CLAUDE_PLUGIN_ROOT}/scripts/analyze-image.ts path/to/image.png
```

## Remotion Integration Pipeline

### Complete Workflow: Gemini + Remotion

1. **Generate scene images** with Gemini, save to `public/images/`
2. **Create compositions** that reference the generated images
3. **Animate** with Remotion's animation primitives
4. **Render** the final video

```tsx
// Scene component using AI-generated image
import { Img, staticFile, useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

const AIScene: React.FC<{ imageFile: string; caption: string }> = ({ imageFile, caption }) => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 30], [1.1, 1], { extrapolateRight: "clamp" });
  const captionOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Img
        src={staticFile(imageFile)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          opacity: captionOpacity,
          color: "white",
          fontSize: 48,
          textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
        }}
      >
        {caption}
      </div>
    </AbsoluteFill>
  );
};
```

### Pre-Render Asset Generation Script

Create a script that generates all assets before rendering:

```tsx
// scripts/prepare-assets.ts
import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const scenes = JSON.parse(fs.readFileSync("src/data/scenes.json", "utf-8"));

for (const scene of scenes) {
  const outputPath = `public/images/${scene.id}.png`;
  if (fs.existsSync(outputPath)) continue; // Skip existing

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-exp",
    contents: `${scene.styleAnchor}. ${scene.imagePrompt}`,
    config: { responseModalities: ["TEXT", "IMAGE"] },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      fs.writeFileSync(outputPath, Buffer.from(part.inlineData.data, "base64"));
      console.log(`Generated: ${outputPath}`);
    }
  }
}
```

Run before rendering:

```bash
npx tsx scripts/prepare-assets.ts && npx remotion render src/index.ts MyVideo out/video.mp4
```

## Best Practices

1. Always set `GEMINI_API_KEY` as environment variable, never hardcode
2. Use consistent style anchors across all scene prompts for visual coherence
3. Save generated images to `public/images/` and reference with `staticFile()`
4. Cache generated images - check if file exists before regenerating
5. Use `gemini-2.0-flash-exp` for image generation, `gemini-2.0-flash` for understanding
6. For video analysis, upload files using `ai.files.upload()` and wait for processing
7. Include aspect ratio hints in prompts (e.g., "16:9 landscape format")
