# Remotion Rendering Reference

## CLI Rendering

### Basic Commands

```bash
# Render composition to MP4
npx remotion render src/index.ts CompositionId out/video.mp4

# Render with specific codec
npx remotion render src/index.ts CompositionId out/video.webm --codec=vp8

# Render specific frames
npx remotion render src/index.ts CompositionId out/video.mp4 --frames=0-89

# Render with custom input props
npx remotion render src/index.ts CompositionId out/video.mp4 \
  --props='{"title":"My Video","color":"#ff0000"}'

# Render with props from file
npx remotion render src/index.ts CompositionId out/video.mp4 \
  --props=./src/data/props.json
```

### Performance Options

```bash
# Set concurrency (parallel frame renders)
npx remotion render src/index.ts CompositionId out/video.mp4 --concurrency=8

# Scale down for fast preview
npx remotion render src/index.ts CompositionId out/preview.mp4 --scale=0.5

# Render without audio
npx remotion render src/index.ts CompositionId out/video.mp4 --muted

# Set JPEG quality (lower = faster, smaller)
npx remotion render src/index.ts CompositionId out/video.mp4 --jpeg-quality=80
```

## Programmatic Rendering

### Full Render Script

```tsx
import { bundle } from "@remotion/bundler";
import {
  renderMedia,
  selectComposition,
  getCompositions,
} from "@remotion/renderer";
import path from "path";

async function render() {
  console.log("Bundling project...");
  const bundled = await bundle({
    entryPoint: path.resolve("./src/index.ts"),
    webpackOverride: (config) => config,
  });

  console.log("Selecting composition...");
  const composition = await selectComposition({
    serveUrl: bundled,
    id: "MyComp",
    inputProps: {
      title: "Programmatic Render",
    },
  });

  console.log(`Rendering ${composition.durationInFrames} frames...`);
  await renderMedia({
    composition,
    serveUrl: bundled,
    codec: "h264",
    outputLocation: path.resolve("./out/video.mp4"),
    onProgress: ({ progress }) => {
      console.log(`Progress: ${(progress * 100).toFixed(1)}%`);
    },
  });

  console.log("Render complete!");
}

render();
```

### List All Compositions

```tsx
const compositions = await getCompositions(bundled);
for (const comp of compositions) {
  console.log(`${comp.id}: ${comp.width}x${comp.height}, ${comp.durationInFrames} frames`);
}
```

## Codec Reference

### H.264 (MP4) - Default

```bash
npx remotion render src/index.ts MyComp out/video.mp4 --codec=h264
```
- Best compatibility, plays everywhere
- Good compression, reasonable file size
- CRF range: 1 (best) to 51 (worst), default 18

### H.265 / HEVC (MP4)

```bash
npx remotion render src/index.ts MyComp out/video.mp4 --codec=h265
```
- 50% smaller files than H.264 at same quality
- Requires modern devices/browsers
- Good for archival or mobile delivery

### VP8 / VP9 (WebM)

```bash
npx remotion render src/index.ts MyComp out/video.webm --codec=vp8
npx remotion render src/index.ts MyComp out/video.webm --codec=vp9
```
- Open format, good for web embedding
- VP9 offers better compression than VP8

### ProRes (MOV)

```bash
npx remotion render src/index.ts MyComp out/video.mov --codec=prores --prores-profile=4444
```
- Professional editing workflow
- Profiles: `proxy`, `light`, `standard`, `hq`, `4444`, `4444-xq`
- Large files, best quality preservation

### GIF

```bash
npx remotion render src/index.ts MyComp out/animation.gif --codec=gif
```
- Short loops only (large file size)
- Max ~10 seconds recommended
- `--every-nth-frame=2` to reduce size

## Still Image Export

```bash
# Render a single frame as image
npx remotion still src/index.ts MyComp out/thumbnail.png --frame=45

# JPEG with quality
npx remotion still src/index.ts MyComp out/thumb.jpg --image-format=jpeg --jpeg-quality=90
```

Programmatic:

```tsx
import { renderStill } from "@remotion/renderer";

await renderStill({
  composition,
  serveUrl: bundled,
  output: "out/frame.png",
  frame: 45,
});
```

## Audio-Only Rendering

```bash
npx remotion render src/index.ts MyComp out/audio.mp3 --codec=mp3
npx remotion render src/index.ts MyComp out/audio.wav --codec=wav
npx remotion render src/index.ts MyComp out/audio.aac --codec=aac
```

## AWS Lambda Rendering

For serverless rendering at scale:

```tsx
import { renderMediaOnLambda } from "@remotion/lambda/client";

const result = await renderMediaOnLambda({
  region: "us-east-1",
  functionName: "remotion-render",
  serveUrl: "https://your-site.com",
  composition: "MyComp",
  codec: "h264",
  inputProps: { title: "Lambda Render" },
});

console.log("Render URL:", result.url);
```

Requires `@remotion/lambda` package and AWS setup.

## Common Rendering Patterns

### Batch Rendering Multiple Compositions

```tsx
const compositions = ["Scene1", "Scene2", "Scene3"];

for (const id of compositions) {
  const comp = await selectComposition({ serveUrl: bundled, id });
  await renderMedia({
    composition: comp,
    serveUrl: bundled,
    codec: "h264",
    outputLocation: `out/${id}.mp4`,
  });
}
```

### Render with Dynamic Props

```tsx
const scenes = [
  { title: "Introduction", color: "#FF0000" },
  { title: "Chapter 1", color: "#00FF00" },
  { title: "Conclusion", color: "#0000FF" },
];

for (const [i, props] of scenes.entries()) {
  const comp = await selectComposition({
    serveUrl: bundled,
    id: "SceneTemplate",
    inputProps: props,
  });
  await renderMedia({
    composition: comp,
    serveUrl: bundled,
    codec: "h264",
    outputLocation: `out/scene-${i}.mp4`,
  });
}
```
