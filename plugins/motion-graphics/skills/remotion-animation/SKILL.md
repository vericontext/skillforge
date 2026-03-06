---
name: remotion-animation
description: This skill should be used when the user asks to "animate text", "add spring animation", "create transitions", "sequence scenes", "animate elements", or discusses useCurrentFrame, interpolate, spring physics, Sequence, Series, TransitionSeries, easing, text animation, or motion design in Remotion.
version: 1.0.0
---

# Remotion Animation and Sequencing

This skill covers animation primitives, timing functions, and scene sequencing in Remotion. All animations are frame-based and deterministic.

## Core Concept: Frame-Based Animation

Every Remotion animation starts with the current frame number. Use `useCurrentFrame()` to get it and `useVideoConfig()` to get composition settings:

```tsx
import { useCurrentFrame, useVideoConfig } from "remotion";

const MyAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <div style={{ opacity: frame / 30 }}>
      Frame {frame} of {durationInFrames}
    </div>
  );
};
```

The frame number starts at 0 and increments by 1 each frame. All animation is derived from this single value.

## interpolate() - Map Frames to Values

`interpolate()` maps a frame number to an output range with optional easing:

```tsx
import { interpolate, useCurrentFrame, Easing } from "remotion";

const frame = useCurrentFrame();

// Fade in over first 30 frames
const opacity = interpolate(frame, [0, 30], [0, 1], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});

// Slide from left over frames 10-40
const translateX = interpolate(frame, [10, 40], [-100, 0], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: Easing.out(Easing.cubic),
});
```

Key options:
- `extrapolateLeft` / `extrapolateRight`: `"clamp"` (stop at boundary), `"extend"` (continue), `"identity"` (pass through)
- `easing`: Easing function from `Easing` module

Common easing functions:
- `Easing.linear` - constant speed
- `Easing.ease` - CSS ease equivalent
- `Easing.in(Easing.cubic)` - slow start
- `Easing.out(Easing.cubic)` - slow end
- `Easing.inOut(Easing.cubic)` - slow start and end
- `Easing.bezier(0.25, 0.1, 0.25, 1)` - custom cubic bezier

See `${CLAUDE_PLUGIN_ROOT}/skills/remotion-animation/references/animation-primitives.md` for the full interpolate API and multi-step interpolation patterns.

## spring() - Physics-Based Animation

`spring()` creates natural-feeling motion using physics simulation:

```tsx
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

// Basic spring (0 → 1)
const scale = spring({
  frame,
  fps,
  config: {
    damping: 12,
    stiffness: 200,
    mass: 0.5,
  },
});

// Delayed spring (starts at frame 20)
const delayedScale = spring({
  frame: frame - 20,
  fps,
  config: { damping: 10 },
});
```

Spring config parameters:
- `damping` (default 10) - How quickly motion settles. Higher = less bouncy
- `stiffness` (default 100) - Spring tension. Higher = faster
- `mass` (default 1) - Object weight. Higher = more inertia
- `overshootClamping` (default false) - Prevent overshoot past target

Common spring presets:
- Snappy: `{ damping: 20, stiffness: 300, mass: 0.5 }` - Quick, minimal bounce
- Bouncy: `{ damping: 8, stiffness: 200, mass: 0.8 }` - Visible bounce
- Gentle: `{ damping: 15, stiffness: 80, mass: 1 }` - Slow, smooth
- Heavy: `{ damping: 12, stiffness: 100, mass: 2 }` - Weighty feel

## Sequence - Timeline Positioning

`<Sequence>` positions elements on the timeline with a frame offset:

**IMPORTANT: `<Sequence>` renders as an `<AbsoluteFill>` wrapper (position: absolute, full size).** This breaks parent flex/grid layouts. To avoid layout issues:
- Use `layout="none"` to prevent the wrapper div
- Or use frame-based `if` checks instead of `<Sequence>` for elements within a flex container
- Or make each `<Sequence>` child a self-contained `<AbsoluteFill>` scene

```tsx
import { Sequence } from "remotion";

// RECOMMENDED: Each Sequence is a full-screen layer
const MyVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Starts at frame 0 */}
      <Sequence from={0} durationInFrames={60}>
        <Title text="Hello" />
      </Sequence>

      {/* Starts at frame 30 (can overlap) */}
      <Sequence from={30} durationInFrames={90}>
        <Subtitle text="World" />
      </Sequence>
    </AbsoluteFill>
  );
};

// ALTERNATIVE: Use frame checks for elements in a flex layout
const FlexScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h1 style={{ opacity: frame >= 0 ? 1 : 0 }}>Title</h1>
      {frame >= 20 && <p>Subtitle appears at frame 20</p>}
    </AbsoluteFill>
  );
};
```

Inside a `<Sequence>`, `useCurrentFrame()` returns 0 at the sequence start, making components reusable regardless of their position in the timeline.

## Series - Sequential Scenes

`<Series>` places scenes one after another without manual offset calculation:

```tsx
import { Series } from "remotion";

const MyVideo: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={90}>
        <Intro />
      </Series.Sequence>
      <Series.Sequence durationInFrames={150}>
        <MainContent />
      </Series.Sequence>
      <Series.Sequence durationInFrames={60}>
        <Outro />
      </Series.Sequence>
    </Series>
  );
};
```

Use `offset` to add gaps or overlaps:

```tsx
<Series.Sequence durationInFrames={90} offset={-10}>
  {/* Starts 10 frames before previous ends (overlap) */}
  <NextScene />
</Series.Sequence>
```

See `${CLAUDE_PLUGIN_ROOT}/skills/remotion-animation/references/sequencing.md` for advanced sequencing patterns.

## TransitionSeries - Scenes with Transitions

`<TransitionSeries>` adds transition effects between scenes:

```tsx
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";

const MyVideo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={90}>
        <Scene1 />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={120}>
        <Scene2 />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-left" })}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      <TransitionSeries.Sequence durationInFrames={90}>
        <Scene3 />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
```

Built-in transitions: `fade`, `slide`, `wipe`, `flip`, `clockWipe`, `none`. See `${CLAUDE_PLUGIN_ROOT}/skills/remotion-animation/references/transitions.md` for all available transitions and custom transition creation.

## Text Animation Patterns

### Character-by-Character Reveal

```tsx
const TextReveal: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex" }}>
      {text.split("").map((char, i) => {
        const delay = i * 2;
        const opacity = interpolate(frame - delay, [0, 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = interpolate(frame - delay, [0, 8], [20, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        return (
          <span
            key={i}
            style={{
              opacity,
              transform: `translateY(${y}px)`,
              display: "inline-block",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </div>
  );
};
```

### Word-by-Word Animation with Spring

```tsx
const WordSpring: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", gap: 12 }}>
      {text.split(" ").map((word, i) => {
        const s = spring({
          frame: frame - i * 5,
          fps,
          config: { damping: 12, stiffness: 200 },
        });
        return (
          <span
            key={i}
            style={{
              opacity: s,
              transform: `scale(${s}) translateY(${(1 - s) * 30}px)`,
              display: "inline-block",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
```

See `${CLAUDE_PLUGIN_ROOT}/skills/remotion-animation/references/text-animation.md` for more text animation patterns including typewriter, counter, and gradient text.

## Media Elements

### Images

```tsx
import { Img, staticFile } from "remotion";

<Img src={staticFile("photo.jpg")} style={{ width: "100%" }} />
```

### Video

```tsx
import { OffthreadVideo, staticFile } from "remotion";

// OffthreadVideo is recommended (better performance)
<OffthreadVideo src={staticFile("clip.mp4")} />

// With volume control
<OffthreadVideo src={staticFile("clip.mp4")} volume={0.5} />
```

### Audio

```tsx
import { Audio, staticFile, interpolate, useCurrentFrame } from "remotion";

const frame = useCurrentFrame();
const volume = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

<Audio src={staticFile("bgm.mp3")} volume={volume} />
```

See `${CLAUDE_PLUGIN_ROOT}/skills/remotion-animation/references/media-handling.md` for advanced media patterns including playback rate, start/end offsets, and synchronized audio.

## Visual Effects Library

For premium, cinematic-quality videos, use the visual effects components instead of plain backgrounds and basic text. These include:

- **AnimatedGradient** - Flowing multi-color mesh gradient background (replaces solid colors)
- **ParticleField** - 500+ floating particles with glow and organic motion
- **GlowText** - Text with pulsing glow halo effect
- **GlassmorphismCard** - Frosted glass cards for text overlays
- **LightLeak** - Cinematic edge light bloom
- **AnimatedGrid** - Moving dot/line grid patterns
- **NumberCounter** - Animated counting numbers
- **ProgressRing** - Circular SVG progress indicator
- **StaggerText** - Per-character staggered text entrance with glow
- **ColorPalette system** - 5-color presets (Modern, Sunset, Ocean, Neon, Forest)

**Always use AnimatedGradient + ParticleField as the default background** instead of solid colors. Layer effects in order: gradient > grid > particles > light leak > content > overlay light leak.

See `${CLAUDE_PLUGIN_ROOT}/skills/remotion-animation/references/visual-effects.md` for all effect component code, the palette system, and the recommended layer composition pattern.

## Layout with AbsoluteFill

`<AbsoluteFill>` is the standard layout container - a full-size absolutely positioned div. **It already has `display: flex`** so you can directly use `justifyContent` and `alignItems`:

```tsx
import { AbsoluteFill } from "remotion";

<AbsoluteFill style={{ backgroundColor: "#000", justifyContent: "center", alignItems: "center" }}>
  <h1 style={{ color: "white", fontSize: 80 }}>Title</h1>
</AbsoluteFill>
```

Stack multiple `<AbsoluteFill>` layers for composition:

```tsx
<AbsoluteFill>
  <AbsoluteFill style={{ backgroundColor: "#1a1a2e" }} />    {/* Background */}
  <AbsoluteFill style={{ opacity: 0.3 }}>                     {/* Overlay */}
    <Img src={staticFile("texture.png")} />
  </AbsoluteFill>
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>  {/* Content */}
    <Title text="Hello" />
  </AbsoluteFill>
</AbsoluteFill>
```

**IMPORTANT: Always use inline `style={{}}` for all styling.** CSS classes (including TailwindCSS) can fail silently in Remotion's bundler, causing invisible elements.

## Combining Animations

A typical animated scene combines multiple techniques:

```tsx
const AnimatedScene: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame, fps, config: { damping: 12, stiffness: 200 } });
  const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: `rgba(0,0,0,${bgOpacity})` }}>
      <h1 style={{ transform: `scale(${titleScale})`, textAlign: "center" }}>
        {title}
      </h1>
      <p style={{ opacity: subtitleOpacity, textAlign: "center" }}>
        A motion graphics demo
      </p>
    </AbsoluteFill>
  );
};
```
