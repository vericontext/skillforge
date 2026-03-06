/**
 * Generate an image using Gemini API
 *
 * Usage:
 *   npx tsx generate-image.ts "prompt" output-path.png
 *   npx tsx generate-image.ts "a futuristic city" public/images/city.png
 *
 * Requires GEMINI_API_KEY environment variable.
 */

import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

async function main() {
  const prompt = process.argv[2];
  const outputPath = process.argv[3];

  if (!prompt || !outputPath) {
    console.error("Usage: npx tsx generate-image.ts <prompt> <output-path>");
    console.error('Example: npx tsx generate-image.ts "a sunset" public/images/sunset.png');
    process.exit(1);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Error: GEMINI_API_KEY environment variable is not set");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });

  console.log(`Generating image: "${prompt}"`);

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-exp",
    contents: prompt,
    config: {
      responseModalities: ["TEXT", "IMAGE"],
    },
  });

  if (!response.candidates || response.candidates.length === 0) {
    console.error("Error: No response generated. The prompt may have been blocked.");
    process.exit(1);
  }

  const parts = response.candidates[0].content.parts;
  let imageFound = false;

  for (const part of parts) {
    if (part.inlineData) {
      const dir = path.dirname(outputPath);
      fs.mkdirSync(dir, { recursive: true });

      const buffer = Buffer.from(part.inlineData.data, "base64");
      fs.writeFileSync(outputPath, buffer);
      console.log(`Image saved to: ${outputPath}`);
      imageFound = true;
    } else if (part.text) {
      console.log(`Description: ${part.text}`);
    }
  }

  if (!imageFound) {
    console.error("Error: No image was generated. Try rephrasing the prompt.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
