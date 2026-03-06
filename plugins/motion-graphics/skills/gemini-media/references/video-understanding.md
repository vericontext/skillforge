# Video Understanding Reference

## Video Upload and Analysis

```tsx
import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function analyzeVideo(videoPath: string, prompt: string): Promise<string> {
  // Upload the video
  const uploadResult = await ai.files.upload({
    file: videoPath,
    config: { mimeType: "video/mp4" },
  });

  // Wait for processing
  let file = await ai.files.get({ name: uploadResult.name });
  while (file.state === "PROCESSING") {
    console.log("Processing video...");
    await new Promise((r) => setTimeout(r, 3000));
    file = await ai.files.get({ name: uploadResult.name });
  }

  if (file.state === "FAILED") {
    throw new Error("Video processing failed");
  }

  // Analyze
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        role: "user",
        parts: [
          { fileData: { fileUri: file.uri, mimeType: "video/mp4" } },
          { text: prompt },
        ],
      },
    ],
  });

  return response.candidates[0].content.parts[0].text;
}
```

## Scene-by-Scene Analysis

```tsx
const sceneAnalysisPrompt = `Analyze this video scene by scene.
For each distinct scene, provide:
{
  "scenes": [
    {
      "timestamp_start": "MM:SS",
      "timestamp_end": "MM:SS",
      "description": "What is happening visually",
      "motion_type": "static / pan / zoom / animation / transition",
      "dominant_colors": ["#hex1", "#hex2"],
      "text_on_screen": "any text visible",
      "transition_to_next": "cut / fade / slide / dissolve / none"
    }
  ],
  "total_duration": "MM:SS",
  "overall_style": "description of visual style",
  "pacing": "fast / medium / slow"
}
Return only valid JSON.`;

const analysis = await analyzeVideo("reference-video.mp4", sceneAnalysisPrompt);
const scenes = JSON.parse(analysis);
```

## Style Extraction

```tsx
const stylePrompt = `Analyze the visual style and motion design of this video:

1. Color grading (warm/cool/neutral, saturation, contrast)
2. Typography (fonts observed, sizing, animation style)
3. Animation techniques (easing types, speed, motion patterns)
4. Transition types between scenes
5. Overall rhythm and pacing
6. Visual effects (particles, blur, glow, shadows)

Provide a style guide that could be used to recreate similar motion graphics in code:
{
  "color_palette": { "primary": "#hex", "secondary": "#hex", "accent": "#hex", "background": "#hex" },
  "typography": { "heading_style": "...", "body_style": "...", "animation": "..." },
  "animation": { "easing": "...", "typical_duration_ms": 300, "patterns": ["..."] },
  "transitions": ["fade", "slide", etc.],
  "pacing": { "scene_duration_avg_seconds": 3, "tempo": "..." },
  "effects": ["..."]
}`;

const styleGuide = await analyzeVideo("inspiration.mp4", stylePrompt);
```

## Storyboard Generation

```tsx
const storyboardPrompt = `Convert this video into a storyboard format.
For each key moment, describe:
{
  "storyboard": [
    {
      "frame_number": 1,
      "timestamp": "MM:SS",
      "visual_description": "Detailed description of what's on screen",
      "camera_angle": "wide / medium / close-up / overhead",
      "motion_notes": "Description of any animation or movement",
      "audio_notes": "Music, SFX, or voiceover description",
      "text_overlay": "Any text shown on screen",
      "duration_seconds": 2.5
    }
  ],
  "total_frames": 12,
  "narrative_arc": "description of the story structure"
}
Include 8-15 key frames that capture the essential moments.`;

const storyboard = await analyzeVideo("reference.mp4", storyboardPrompt);
```

## Motion Pattern Analysis

```tsx
const motionPrompt = `Analyze the motion and animation patterns in this video:

1. What types of motion are used? (linear, easing, spring, bounce)
2. What is the typical animation duration?
3. Are there staggered animations? What's the delay pattern?
4. How do elements enter the screen? (fade, slide from direction, scale, etc.)
5. How do elements exit the screen?
6. Are there any looping animations?

Map these to Remotion code concepts:
{
  "entrance_animations": [
    {
      "type": "slide-up with fade",
      "remotion_code": "interpolate(frame, [0, 20], [50, 0]) for Y, interpolate(frame, [0, 15], [0, 1]) for opacity",
      "easing": "Easing.out(Easing.cubic)",
      "duration_frames": 20
    }
  ],
  "exit_animations": [...],
  "transitions": [...],
  "looping_effects": [...]
}`;

const motionPatterns = await analyzeVideo("animation-ref.mp4", motionPrompt);
```

## Comparing Videos

```tsx
async function compareVideos(video1: string, video2: string): Promise<string> {
  const upload1 = await ai.files.upload({
    file: video1,
    config: { mimeType: "video/mp4" },
  });
  const upload2 = await ai.files.upload({
    file: video2,
    config: { mimeType: "video/mp4" },
  });

  // Wait for both to process
  let file1, file2;
  do {
    file1 = await ai.files.get({ name: upload1.name });
    file2 = await ai.files.get({ name: upload2.name });
    if (file1.state === "PROCESSING" || file2.state === "PROCESSING") {
      await new Promise((r) => setTimeout(r, 3000));
    }
  } while (file1.state === "PROCESSING" || file2.state === "PROCESSING");

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        role: "user",
        parts: [
          { fileData: { fileUri: file1.uri, mimeType: "video/mp4" } },
          { fileData: { fileUri: file2.uri, mimeType: "video/mp4" } },
          { text: "Compare these two videos. Analyze differences in style, pacing, color, typography, and motion design. Which techniques from Video 1 could improve Video 2, and vice versa?" },
        ],
      },
    ],
  });

  return response.candidates[0].content.parts[0].text;
}
```

## Converting Analysis to Remotion Code

Use the analysis results to generate composition structures:

```tsx
// From scene analysis, generate a Series structure
function scenesToRemotion(scenes: SceneAnalysis[]): string {
  return `
<Series>
  ${scenes.map((scene, i) => {
    const durationFrames = Math.round(
      (parseTimestamp(scene.timestamp_end) - parseTimestamp(scene.timestamp_start)) * 30
    );
    return `
  <Series.Sequence durationInFrames={${durationFrames}}>
    <Scene${i + 1} />
  </Series.Sequence>`;
  }).join("\n")}
</Series>`;
}
```
