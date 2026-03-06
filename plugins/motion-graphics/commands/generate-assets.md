---
name: generate-assets
description: Generate images with Gemini AI for video scenes
---

# /generate-assets - Generate AI Images for Video

Use Gemini API to generate images for video scenes.

## Steps

1. Check that `GEMINI_API_KEY` environment variable is set

2. Determine the generation approach:
   - **From scene data**: If `src/data/scenes.json` exists, use it to batch-generate images
   - **Single image**: Ask the user for a prompt and output path
   - **Interactive**: Ask the user to describe each scene

3. For batch generation from scenes.json:
   - Read the scene definitions
   - Use the style anchor from the data for consistency
   - Generate each scene image, saving to `public/images/`
   - Skip images that already exist (unless `--force` is specified)

4. For single image generation:
   ```bash
   npx tsx ${CLAUDE_PLUGIN_ROOT}/scripts/generate-image.ts "<prompt>" public/images/<name>.png
   ```

5. For interactive mode:
   - Ask the user for a **style anchor** (visual style description)
   - Ask for each scene description
   - Generate images one by one, showing progress
   - Save all to `public/images/`

6. After generation, list all generated files and suggest how to use them in compositions

## Quick Usage

- `/generate-assets "a sunset over mountains"` - generate a single image
- `/generate-assets --scenes` - batch generate from scenes.json
- `/generate-assets --interactive` - guided multi-image generation

## Scene Data Format

`src/data/scenes.json`:
```json
{
  "styleAnchor": "flat illustration, vibrant colors, 16:9",
  "scenes": [
    {
      "id": "intro",
      "title": "Welcome",
      "imagePrompt": "A waving hand with sparkles"
    }
  ]
}
```

Use the gemini-media skill for detailed Gemini API usage and prompt engineering tips.
