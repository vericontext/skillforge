/**
 * Analyze a video file using Gemini API
 *
 * Usage:
 *   npx tsx analyze-video.ts <video-path> [analysis-type]
 *
 * Analysis types:
 *   scenes    - Scene-by-scene breakdown (default)
 *   style     - Visual style extraction
 *   storyboard - Storyboard generation
 *   motion    - Motion pattern analysis
 *
 * Requires GEMINI_API_KEY environment variable.
 */

import { GoogleGenAI } from "@google/genai";

const PROMPTS: Record<string, string> = {
  scenes: `Analyze this video scene by scene. For each distinct scene, provide:
{
  "scenes": [
    {
      "timestamp_start": "MM:SS",
      "timestamp_end": "MM:SS",
      "description": "What is happening visually",
      "motion_type": "static / pan / zoom / animation / transition",
      "dominant_colors": ["#hex1", "#hex2"],
      "text_on_screen": "any text visible or null",
      "transition_to_next": "cut / fade / slide / dissolve / none"
    }
  ],
  "total_duration": "MM:SS",
  "overall_style": "description",
  "pacing": "fast / medium / slow"
}
Return only valid JSON.`,

  style: `Analyze the visual style and motion design of this video. Return JSON:
{
  "color_palette": { "primary": "#hex", "secondary": "#hex", "accent": "#hex", "background": "#hex" },
  "typography": { "heading_style": "...", "body_style": "...", "animation": "..." },
  "animation": { "easing": "...", "typical_duration_ms": 300, "patterns": ["..."] },
  "transitions": ["..."],
  "pacing": { "scene_duration_avg_seconds": 3, "tempo": "..." },
  "effects": ["..."],
  "overall_mood": "..."
}`,

  storyboard: `Convert this video into a storyboard. For each key moment:
{
  "storyboard": [
    {
      "frame_number": 1,
      "timestamp": "MM:SS",
      "visual_description": "Detailed description",
      "camera_angle": "wide / medium / close-up",
      "motion_notes": "Animation or movement description",
      "audio_notes": "Music, SFX, voiceover",
      "text_overlay": "Text on screen or null",
      "duration_seconds": 2.5
    }
  ],
  "total_frames": 12,
  "narrative_arc": "story structure description"
}
Include 8-15 key frames.`,

  motion: `Analyze the motion and animation patterns in this video. Map to Remotion code concepts:
{
  "entrance_animations": [
    { "type": "description", "remotion_approach": "interpolate/spring usage", "easing": "...", "duration_frames": 20 }
  ],
  "exit_animations": [...],
  "transitions": [
    { "type": "fade/slide/wipe", "duration_frames": 15 }
  ],
  "looping_effects": [...],
  "stagger_patterns": { "delay_between_items_frames": 5, "pattern": "..." },
  "overall_tempo": "fast / medium / slow"
}`,
};

async function main() {
  const videoPath = process.argv[2];
  const analysisType = process.argv[3] || "scenes";

  if (!videoPath) {
    console.error("Usage: npx tsx analyze-video.ts <video-path> [scenes|style|storyboard|motion]");
    process.exit(1);
  }

  const prompt = PROMPTS[analysisType];
  if (!prompt) {
    console.error(`Unknown analysis type: ${analysisType}`);
    console.error(`Available types: ${Object.keys(PROMPTS).join(", ")}`);
    process.exit(1);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Error: GEMINI_API_KEY environment variable is not set");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });

  console.log(`Uploading video: ${videoPath}`);
  const uploadResult = await ai.files.upload({
    file: videoPath,
    config: { mimeType: "video/mp4" },
  });

  console.log("Waiting for processing...");
  let file = await ai.files.get({ name: uploadResult.name });
  while (file.state === "PROCESSING") {
    await new Promise((r) => setTimeout(r, 3000));
    file = await ai.files.get({ name: uploadResult.name });
    process.stdout.write(".");
  }
  console.log();

  if (file.state === "FAILED") {
    console.error("Error: Video processing failed");
    process.exit(1);
  }

  console.log(`Analyzing video (${analysisType})...`);
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

  const result = response.candidates[0].content.parts[0].text;
  console.log("\n--- Analysis Result ---\n");
  console.log(result);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
