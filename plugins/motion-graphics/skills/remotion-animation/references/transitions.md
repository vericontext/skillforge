# Transitions Reference

## Setup

```bash
npm install @remotion/transitions
```

## TransitionSeries

```tsx
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { flip } from "@remotion/transitions/flip";
import { clockWipe } from "@remotion/transitions/clock-wipe";
```

## Built-in Presentations

### fade

```tsx
<TransitionSeries.Transition
  presentation={fade()}
  timing={linearTiming({ durationInFrames: 15 })}
/>
```

### slide

```tsx
// Direction options: "from-left", "from-right", "from-top", "from-bottom"
<TransitionSeries.Transition
  presentation={slide({ direction: "from-left" })}
  timing={linearTiming({ durationInFrames: 20 })}
/>
```

### wipe

```tsx
// Direction options: "from-left", "from-right", "from-top", "from-bottom"
<TransitionSeries.Transition
  presentation={wipe({ direction: "from-left" })}
  timing={linearTiming({ durationInFrames: 20 })}
/>
```

### flip

```tsx
// Direction options: "from-left", "from-right", "from-top", "from-bottom"
<TransitionSeries.Transition
  presentation={flip({ direction: "from-left" })}
  timing={linearTiming({ durationInFrames: 20 })}
/>
```

### clockWipe

```tsx
<TransitionSeries.Transition
  presentation={clockWipe({
    width: 1920,
    height: 1080,
  })}
  timing={linearTiming({ durationInFrames: 30 })}
/>
```

## Timing Functions

### linearTiming

```tsx
linearTiming({
  durationInFrames: 20,
  easing: Easing.inOut(Easing.cubic),  // optional
})
```

### springTiming

```tsx
springTiming({
  config: {
    damping: 12,
    stiffness: 200,
    mass: 0.5,
  },
})
```

## Full TransitionSeries Example

```tsx
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { Easing } from "remotion";

const VideoWithTransitions: React.FC = () => {
  return (
    <TransitionSeries>
      {/* Scene 1: Intro */}
      <TransitionSeries.Sequence durationInFrames={90}>
        <IntroScene />
      </TransitionSeries.Sequence>

      {/* Fade to Scene 2 */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({
          durationInFrames: 15,
          easing: Easing.inOut(Easing.cubic),
        })}
      />

      {/* Scene 2: Main Content */}
      <TransitionSeries.Sequence durationInFrames={180}>
        <MainScene />
      </TransitionSeries.Sequence>

      {/* Slide to Scene 3 */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={springTiming({
          config: { damping: 12, stiffness: 200 },
        })}
      />

      {/* Scene 3: Outro */}
      <TransitionSeries.Sequence durationInFrames={90}>
        <OutroScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
```

## Custom Transition

Create a custom presentation:

```tsx
import { TransitionPresentation, TransitionPresentationComponentProps } from "@remotion/transitions";

const customSlideUp: TransitionPresentation<{}> = {
  component: ({ presentationDirection, presentationProgress, passedProps }: TransitionPresentationComponentProps<{}>) => {
    const y = presentationDirection === "entering"
      ? interpolate(presentationProgress, [0, 1], [100, 0])
      : interpolate(presentationProgress, [0, 1], [0, -100]);

    return (
      <AbsoluteFill
        style={{
          transform: `translateY(${y}%)`,
          ...passedProps.style,
        }}
      >
        {passedProps.children}
      </AbsoluteFill>
    );
  },
};

// Usage
<TransitionSeries.Transition
  presentation={customSlideUp}
  timing={linearTiming({ durationInFrames: 20 })}
/>
```

## Combining Transitions with Audio

```tsx
<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={90}>
    <Scene1 />
  </TransitionSeries.Sequence>

  <TransitionSeries.Transition
    presentation={slide({ direction: "from-right" })}
    timing={linearTiming({ durationInFrames: 15 })}
  />

  <TransitionSeries.Sequence durationInFrames={120}>
    <>
      <Scene2 />
      <Audio src={staticFile("sfx/whoosh.mp3")} />
    </>
  </TransitionSeries.Sequence>
</TransitionSeries>
```
