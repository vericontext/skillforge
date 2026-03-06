/**
 * Analyze an image using Gemini API
 *
 * Usage:
 *   npx tsx analyze-image.ts <image-path> [analysis-type]
 *
 * Analysis types:
 *   describe  - General description (default)
 *   colors    - Color palette extraction
 *   style     - Visual style analysis
 *   objects   - Object detection with positions
 *   brand     - Brand asset analysis
 *
 * Requires GEMINI_API_KEY environment variable.
 */

import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const PROMPTS: Record<string, string> = {
  describe: `Describe this image in detail. Include:
1. Main subject and composition
2. Colors and lighting
3. Mood and atmosphere
4. Notable details
Provide a concise but thorough description.`,

  colors: `Extract the color palette from this image. Return JSON:
{
  "dominant": ["#hex1", "#hex2", "#hex3"],
  "accent": ["#hex1", "#hex2"],
  "background": "#hex",
  "text_light": "#hex",
  "text_dark": "#hex",
  "mood": "color mood description"
}
Return only valid JSON.`,

  style: `Analyze the visual style of this image for recreation in motion graphics. Return JSON:
{
  "art_style": "flat / 3D / photographic / illustrated / etc.",
  "color_temperature": "warm / cool / neutral",
  "texture": "smooth / textured / grainy",
  "line_quality": "thick / thin / none",
  "lighting": "direction and quality",
  "mood": "overall mood",
  "prompt_template": "A template prompt to generate similar images: [style description], [subject], [composition]"
}
Return only valid JSON.`,

  objects: `Identify all distinct visual elements in this image. Return JSON:
{
  "elements": [
    {
      "name": "description",
      "position": { "x": 0, "y": 0 },
      "size": { "width": 0, "height": 0 },
      "z_index": 1,
      "suggested_animation": "fade-in / slide-left / scale-up"
    }
  ]
}
Positions and sizes are percentages (0-100) of total dimensions. Return only valid JSON.`,

  brand: `Analyze this brand asset. Return JSON:
{
  "brand_colors": ["#hex"],
  "typography": "description of font style",
  "tone": "corporate / playful / minimal / bold",
  "complementary_colors": ["#hex"],
  "animation_style": "recommended animation approach",
  "recommendations": ["list of design recommendations"]
}
Return only valid JSON.`,
};

async function main() {
  const imagePath = process.argv[2];
  const analysisType = process.argv[3] || "describe";

  if (!imagePath) {
    console.error("Usage: npx tsx analyze-image.ts <image-path> [describe|colors|style|objects|brand]");
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

  if (!fs.existsSync(imagePath)) {
    console.error(`Error: File not found: ${imagePath}`);
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });
  const imageData = fs.readFileSync(imagePath).toString("base64");

  const ext = imagePath.toLowerCase().split(".").pop();
  const mimeMap: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    gif: "image/gif",
  };
  const mimeType = mimeMap[ext || ""] || "image/png";

  console.log(`Analyzing image (${analysisType}): ${imagePath}`);

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

  const result = response.candidates[0].content.parts[0].text;
  console.log("\n--- Analysis Result ---\n");
  console.log(result);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
