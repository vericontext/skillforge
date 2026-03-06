# Gemini API Setup Reference

## Installation

```bash
npm install @google/genai
```

## Client Initialization

```tsx
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
```

## Available Models

| Model | Best For | Modalities |
|-------|----------|-----------|
| `gemini-2.0-flash-exp` | Image generation | Text + Image output |
| `gemini-2.0-flash` | Fast understanding | Text, Image, Video, Audio input |
| `gemini-2.5-pro-preview-06-05` | Complex reasoning | Text, Image, Video, Audio input |
| `gemini-2.5-flash-preview-05-20` | Fast + thinking | Text, Image, Video, Audio input |

## Basic Text Generation

```tsx
const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: "Explain how motion graphics work",
});

console.log(response.candidates[0].content.parts[0].text);
```

## Multimodal Input (Image)

```tsx
import fs from "fs";

const imageData = fs.readFileSync("photo.jpg").toString("base64");

const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: [
    {
      role: "user",
      parts: [
        { text: "Describe this image in detail" },
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: imageData,
          },
        },
      ],
    },
  ],
});
```

## Image Generation

```tsx
const response = await ai.models.generateContent({
  model: "gemini-2.0-flash-exp",
  contents: "Generate an image of a sunset over mountains",
  config: {
    responseModalities: ["TEXT", "IMAGE"],
  },
});

for (const part of response.candidates[0].content.parts) {
  if (part.inlineData) {
    const buffer = Buffer.from(part.inlineData.data, "base64");
    fs.writeFileSync("output.png", buffer);
  } else if (part.text) {
    console.log("Description:", part.text);
  }
}
```

## File Upload (for Video)

```tsx
// Upload
const uploadResult = await ai.files.upload({
  file: "video.mp4",
  config: { mimeType: "video/mp4" },
});

// Poll for processing completion
let file = await ai.files.get({ name: uploadResult.name });
while (file.state === "PROCESSING") {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  file = await ai.files.get({ name: uploadResult.name });
}

if (file.state === "FAILED") {
  throw new Error("File processing failed");
}

// Use in generation
const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: [
    {
      role: "user",
      parts: [
        { fileData: { fileUri: file.uri, mimeType: "video/mp4" } },
        { text: "Summarize this video" },
      ],
    },
  ],
});
```

## Supported MIME Types

### Images (inline or file upload)
- `image/png`
- `image/jpeg`
- `image/webp`
- `image/gif`

### Video (file upload required)
- `video/mp4`
- `video/mpeg`
- `video/mov`
- `video/avi`
- `video/webm`
- `video/mkv`

### Audio (file upload required)
- `audio/mp3`
- `audio/wav`
- `audio/aac`
- `audio/ogg`
- `audio/flac`

## System Instructions

```tsx
const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: "Generate a scene description for a tech startup video",
  config: {
    systemInstruction: "You are a motion graphics director. Always provide descriptions in a format suitable for visual composition: subject, action, background, color palette, mood.",
  },
});
```

## Safety Settings

```tsx
const response = await ai.models.generateContent({
  model: "gemini-2.0-flash-exp",
  contents: "Generate an image of a peaceful forest",
  config: {
    responseModalities: ["TEXT", "IMAGE"],
    safetySettings: [
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_ONLY_HIGH",
      },
    ],
  },
});
```

## Error Handling

```tsx
try {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-exp",
    contents: prompt,
    config: { responseModalities: ["TEXT", "IMAGE"] },
  });

  if (!response.candidates || response.candidates.length === 0) {
    console.error("No candidates returned - prompt may have been blocked");
    return;
  }

  const parts = response.candidates[0].content.parts;
  const imagePart = parts.find((p) => p.inlineData);

  if (!imagePart) {
    console.error("No image generated - try rephrasing the prompt");
    return;
  }
} catch (error) {
  if (error.message?.includes("RESOURCE_EXHAUSTED")) {
    console.error("API quota exceeded - wait and retry");
  } else if (error.message?.includes("INVALID_ARGUMENT")) {
    console.error("Invalid request - check model name and parameters");
  } else {
    throw error;
  }
}
```
