---
name: render
description: Render the current Remotion composition to video
---

# /render - Render Video

Render the current Remotion project's composition to a video file.

## Steps

1. Check that we're in a Remotion project (look for `remotion.config.ts` or `remotion` in `package.json`)

2. Ask the user for (with sensible defaults):
   - **Composition ID** - list available compositions from `Root.tsx` if unclear
   - **Output format** - mp4 (default), webm, gif, mov
   - **Quality** - draft (scale 0.5), standard (scale 1), high (scale 1, high quality)

3. Map format to codec:
   - mp4 → `h264`
   - webm → `vp8`
   - gif → `gif`
   - mov → `prores`

4. Construct and run the render command:
   ```bash
   npx remotion render src/index.ts <CompositionId> out/<name>.<ext> \
     --codec=<codec> \
     [--scale=0.5]  # for draft quality
   ```

5. Report the output file location and size when complete

## Quick Usage

For fast rendering without prompts, the user can specify everything:
- `/render MyComp` - render MyComp as MP4
- `/render MyComp webm` - render as WebM
- `/render MyComp gif` - render as GIF

Use the remotion-project skill for detailed rendering options and codec information.
