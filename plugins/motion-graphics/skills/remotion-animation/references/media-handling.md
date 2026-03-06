# Media Handling Reference

## Images

### Static Images

```tsx
import { Img, staticFile } from "remotion";

// From public/ directory
<Img src={staticFile("images/photo.jpg")} style={{ width: "100%" }} />

// From URL
<Img src="https://example.com/image.png" />

// With error handling
<Img
  src={staticFile("logo.png")}
  onError={(e) => console.error("Image failed to load")}
  style={{ objectFit: "cover", width: "100%", height: "100%" }}
/>
```

### Animated Image (Ken Burns Effect)

```tsx
const KenBurns: React.FC<{ src: string }> = ({ src }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const scale = interpolate(frame, [0, durationInFrames], [1, 1.3]);
  const x = interpolate(frame, [0, durationInFrames], [0, -50]);

  return (
    <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translateX(${x}px)`,
        }}
      />
    </div>
  );
};
```

## Video

### OffthreadVideo (Recommended)

```tsx
import { OffthreadVideo, staticFile } from "remotion";

// Basic usage
<OffthreadVideo src={staticFile("clip.mp4")} />

// With volume
<OffthreadVideo src={staticFile("clip.mp4")} volume={0.5} />

// Muted
<OffthreadVideo src={staticFile("clip.mp4")} muted />

// Start from specific time
<OffthreadVideo src={staticFile("clip.mp4")} startFrom={60} />

// End at specific frame
<OffthreadVideo src={staticFile("clip.mp4")} endAt={150} />

// Playback rate
<OffthreadVideo src={staticFile("clip.mp4")} playbackRate={1.5} />
```

### Video vs OffthreadVideo

- `<OffthreadVideo>` - Renders frames on a separate thread. Better performance, no synchronization issues. Use this by default.
- `<Video>` - Uses HTML `<video>` element. Needed if you require `onError` events or need to apply CSS filters that depend on the video element.

### Transparent Video (WebM)

```tsx
<OffthreadVideo
  src={staticFile("overlay.webm")}
  transparent
  style={{ position: "absolute", top: 0, left: 0 }}
/>
```

## Audio

### Basic Audio

```tsx
import { Audio, staticFile } from "remotion";

<Audio src={staticFile("audio/bgm.mp3")} volume={0.8} />
```

### Fade Audio In/Out

```tsx
const AudioWithFade: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const volume = interpolate(
    frame,
    [0, 15, durationInFrames - 15, durationInFrames],
    [0, 0.8, 0.8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return <Audio src={staticFile("bgm.mp3")} volume={volume} />;
};
```

### Audio with Start Offset

```tsx
// Skip first 5 seconds of audio
<Audio src={staticFile("music.mp3")} startFrom={150} />  {/* 5s at 30fps */}

// Play only a portion
<Audio src={staticFile("music.mp3")} startFrom={90} endAt={240} />
```

### Multiple Audio Tracks

```tsx
<>
  <Audio src={staticFile("bgm.mp3")} volume={0.3} />
  <Audio src={staticFile("sfx-whoosh.mp3")} volume={0.8} />
  <Sequence from={60}>
    <Audio src={staticFile("narration.mp3")} volume={1.0} />
  </Sequence>
</>
```

## Fonts

### Google Fonts

```tsx
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

<div style={{ fontFamily }}>Hello World</div>
```

### Local Fonts

```tsx
import { staticFile, continueRender, delayRender } from "remotion";

const waitForFont = delayRender();
const font = new FontFace("MyFont", `url(${staticFile("fonts/custom.woff2")})`);

font.load().then(() => {
  document.fonts.add(font);
  continueRender(waitForFont);
});
```

## delayRender / continueRender

For async operations (loading data, images, fonts):

```tsx
import { delayRender, continueRender } from "remotion";
import { useEffect, useState } from "react";

const DataDriven: React.FC = () => {
  const [data, setData] = useState(null);
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        continueRender(handle);
      });
  }, [handle]);

  if (!data) return null;
  return <div>{JSON.stringify(data)}</div>;
};
```

## GIF Support

```tsx
import { Gif } from "@remotion/gif";
import { staticFile } from "remotion";

<Gif src={staticFile("animation.gif")} width={300} height={300} />
```

## Lottie Support

```tsx
import { Lottie } from "@remotion/lottie";
import animationData from "./animation.json";

<Lottie animationData={animationData} />
```
