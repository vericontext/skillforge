---
name: analyze-video
description: Analyze a video file with Gemini AI
---

# /analyze-video - Analyze Video with Gemini

Use Gemini API to analyze a video file for scene structure, style, motion patterns, or storyboard extraction.

## Steps

1. Check that `GEMINI_API_KEY` environment variable is set

2. Ask the user for:
   - **Video file path** - local path to the video file
   - **Analysis type**:
     - `scenes` (default) - Scene-by-scene breakdown with timestamps
     - `style` - Visual style extraction (colors, typography, animation)
     - `storyboard` - Generate a storyboard from the video
     - `motion` - Extract motion patterns mapped to Remotion code

3. Run the analysis script:
   ```bash
   npx tsx ${CLAUDE_PLUGIN_ROOT}/scripts/analyze-video.ts <video-path> <analysis-type>
   ```

4. Present the results in a structured format

5. Offer follow-up actions:
   - Save the analysis to a JSON file
   - Generate a Remotion composition structure based on the analysis
   - Create a style guide for generating matching AI images

## Quick Usage

- `/analyze-video reference.mp4` - scene analysis (default)
- `/analyze-video reference.mp4 style` - extract visual style
- `/analyze-video reference.mp4 storyboard` - generate storyboard
- `/analyze-video reference.mp4 motion` - extract motion patterns

## Image Analysis

For image analysis instead of video, use the image analysis script directly:

```bash
npx tsx ${CLAUDE_PLUGIN_ROOT}/scripts/analyze-image.ts <image-path> [colors|style|objects|brand]
```

Use the gemini-media skill for detailed API usage and analysis patterns.
