# Composition Configuration Reference

## Basic Composition

```tsx
import { Composition } from "remotion";

<Composition
  id="MyVideo"
  component={MyVideoComponent}
  durationInFrames={300}    // 10 seconds at 30fps
  fps={30}
  width={1920}
  height={1080}
/>
```

## Duration Calculation

```
durationInFrames = seconds * fps
```

| Duration | 24fps | 30fps | 60fps |
|----------|-------|-------|-------|
| 5 sec | 120 | 150 | 300 |
| 10 sec | 240 | 300 | 600 |
| 15 sec | 360 | 450 | 900 |
| 30 sec | 720 | 900 | 1800 |
| 60 sec | 1440 | 1800 | 3600 |

## Resolution Presets

### Landscape (16:9)

```tsx
// Full HD
<Composition width={1920} height={1080} ... />

// 4K UHD
<Composition width={3840} height={2160} ... />

// 720p (smaller, faster renders)
<Composition width={1280} height={720} ... />
```

### Portrait (9:16)

```tsx
// Instagram Story / TikTok / YouTube Shorts
<Composition width={1080} height={1920} ... />

// Lower resolution portrait
<Composition width={720} height={1280} ... />
```

### Square (1:1)

```tsx
// Instagram Post
<Composition width={1080} height={1080} ... />
```

### Other Ratios

```tsx
// Instagram Landscape (1.91:1)
<Composition width={1080} height={566} ... />

// Cinema (2.39:1)
<Composition width={2560} height={1080} ... />
```

## Dynamic Duration with calculateMetadata

To compute duration based on input props:

```tsx
import { CalculateMetadataFunction, Composition } from "remotion";
import { z } from "zod";

const schema = z.object({
  scenes: z.array(z.object({
    text: z.string(),
    durationSeconds: z.number(),
  })),
});

type Props = z.infer<typeof schema>;

const calculateMetadata: CalculateMetadataFunction<Props> = ({ props }) => {
  const totalSeconds = props.scenes.reduce(
    (sum, scene) => sum + scene.durationSeconds,
    0
  );
  return {
    durationInFrames: Math.ceil(totalSeconds * 30),
    fps: 30,
    width: 1920,
    height: 1080,
  };
};

// In Root.tsx
<Composition
  id="DynamicVideo"
  component={DynamicVideoComponent}
  durationInFrames={300} // fallback
  fps={30}
  width={1920}
  height={1080}
  schema={schema}
  calculateMetadata={calculateMetadata}
  defaultProps={{
    scenes: [
      { text: "Hello", durationSeconds: 3 },
      { text: "World", durationSeconds: 2 },
    ],
  }}
/>
```

## Multiple Compositions in One Project

```tsx
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Social Media">
        <Composition
          id="InstagramStory"
          component={StoryComp}
          durationInFrames={450}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="InstagramPost"
          component={PostComp}
          durationInFrames={300}
          fps={30}
          width={1080}
          height={1080}
        />
      </Folder>

      <Folder name="YouTube">
        <Composition
          id="YouTubeIntro"
          component={IntroComp}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};
```

## Still Compositions

For generating thumbnails or static frames:

```tsx
import { Still } from "remotion";

<Still
  id="Thumbnail"
  component={ThumbnailComponent}
  width={1920}
  height={1080}
  defaultProps={{ title: "My Video" }}
/>
```

Render with:

```bash
npx remotion still src/index.ts Thumbnail out/thumb.png
```

## useVideoConfig Hook

Access composition config inside components:

```tsx
import { useVideoConfig } from "remotion";

const MyComponent: React.FC = () => {
  const { fps, durationInFrames, width, height } = useVideoConfig();

  const totalSeconds = durationInFrames / fps;

  return (
    <div style={{ width, height }}>
      <p>Video: {width}x{height} at {fps}fps</p>
      <p>Duration: {totalSeconds}s</p>
    </div>
  );
};
```
