# Sequencing Reference

## Sequence Component

```tsx
import { Sequence } from "remotion";

// Basic usage
<Sequence from={30} durationInFrames={60}>
  <MyComponent />  {/* useCurrentFrame() starts at 0 inside here */}
</Sequence>

// Without duration (plays until composition end)
<Sequence from={30}>
  <MyComponent />
</Sequence>

// Named sequence (visible in Studio timeline)
<Sequence from={30} durationInFrames={60} name="Title Card">
  <TitleCard />
</Sequence>

// With layout="none" (no wrapping div)
<Sequence from={30} layout="none">
  <MyComponent />
</Sequence>
```

## Series Component

```tsx
import { Series } from "remotion";

<Series>
  <Series.Sequence durationInFrames={60}>
    <Scene1 />
  </Series.Sequence>

  {/* 15-frame gap between Scene1 and Scene2 */}
  <Series.Sequence durationInFrames={90} offset={15}>
    <Scene2 />
  </Series.Sequence>

  {/* Overlap: starts 10 frames before Scene2 ends */}
  <Series.Sequence durationInFrames={60} offset={-10}>
    <Scene3 />
  </Series.Sequence>
</Series>
```

## Staggered Entrance Pattern

Animate a list of items with delays:

```tsx
const items = ["Design", "Animate", "Render", "Share"];

const StaggeredList: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {items.map((item, i) => {
        const s = spring({
          frame: frame - i * 8,
          fps,
          config: { damping: 12, stiffness: 200 },
        });

        return (
          <div
            key={i}
            style={{
              opacity: s,
              transform: `translateX(${(1 - s) * 50}px)`,
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};
```

## Scene Management Pattern

Organize scenes with a data-driven approach:

```tsx
interface Scene {
  id: string;
  component: React.FC;
  durationInFrames: number;
}

const scenes: Scene[] = [
  { id: "intro", component: Intro, durationInFrames: 90 },
  { id: "main", component: MainContent, durationInFrames: 300 },
  { id: "outro", component: Outro, durationInFrames: 60 },
];

const Video: React.FC = () => {
  return (
    <Series>
      {scenes.map((scene) => (
        <Series.Sequence key={scene.id} durationInFrames={scene.durationInFrames}>
          <scene.component />
        </Series.Sequence>
      ))}
    </Series>
  );
};
```

## Nested Sequences

Sequences can nest to create relative timing:

```tsx
<Sequence from={30} durationInFrames={120}>
  {/* Everything inside is relative to frame 30 */}
  <Background />

  <Sequence from={10} durationInFrames={40}>
    {/* This starts at absolute frame 40 (30 + 10) */}
    <Title />
  </Sequence>

  <Sequence from={50} durationInFrames={60}>
    {/* This starts at absolute frame 80 (30 + 50) */}
    <Content />
  </Sequence>
</Sequence>
```

## Loop Component

```tsx
import { Loop } from "remotion";

// Loop a 30-frame animation
<Loop durationInFrames={30}>
  <PulsingDot />
</Loop>

// Loop with specific count
<Loop durationInFrames={30} times={3}>
  <PulsingDot />
</Loop>
```
