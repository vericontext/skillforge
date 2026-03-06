# Animation Primitives Reference

## interpolate() Full API

```tsx
interpolate(
  input: number,
  inputRange: number[],
  outputRange: number[],
  options?: {
    easing?: (t: number) => number;
    extrapolateLeft?: "clamp" | "extend" | "identity";
    extrapolateRight?: "clamp" | "extend" | "identity";
  }
): number
```

### Multi-Step Interpolation

Chain multiple ranges for complex animations:

```tsx
const frame = useCurrentFrame();

// Fade in, hold, fade out
const opacity = interpolate(
  frame,
  [0, 15, 75, 90],     // input keyframes
  [0, 1, 1, 0],         // output values
  { extrapolateRight: "clamp" }
);

// Move right, pause, move down
const x = interpolate(frame, [0, 30, 60, 90], [0, 200, 200, 200]);
const y = interpolate(frame, [0, 30, 60, 90], [0, 0, 0, 150]);
```

### interpolateColors()

Interpolate between CSS colors:

```tsx
import { interpolateColors, useCurrentFrame } from "remotion";

const frame = useCurrentFrame();

const color = interpolateColors(
  frame,
  [0, 30, 60],
  ["#ff0000", "#00ff00", "#0000ff"]
);

<div style={{ backgroundColor: color }} />
```

## Easing Reference

```tsx
import { Easing } from "remotion";

// Standard
Easing.linear        // constant speed
Easing.ease          // equivalent to CSS ease

// Polynomial
Easing.quad          // x^2
Easing.cubic         // x^3
Easing.poly(5)       // x^5

// Physical
Easing.sin           // sinusoidal
Easing.circle        // circular
Easing.exp           // exponential

// Back (overshoot)
Easing.back(1.5)     // overshoot by 1.5x

// Elastic / Bounce
Easing.elastic(1)    // elastic snap
Easing.bounce        // bouncing ball

// Wrappers
Easing.in(fn)        // apply to start
Easing.out(fn)       // apply to end
Easing.inOut(fn)     // apply to both
Easing.bezier(x1, y1, x2, y2)  // custom cubic bezier
```

### Common Easing Combinations

```tsx
// Smooth deceleration (most common for UI)
Easing.out(Easing.cubic)

// Smooth acceleration
Easing.in(Easing.cubic)

// Smooth both ends (good for loops)
Easing.inOut(Easing.cubic)

// Snappy overshoot
Easing.out(Easing.back(1.7))

// Bouncy landing
Easing.out(Easing.bounce)
```

## spring() Full API

```tsx
spring({
  frame: number,
  fps: number,
  config?: {
    damping?: number,     // default 10
    mass?: number,         // default 1
    stiffness?: number,    // default 100
    overshootClamping?: boolean,  // default false
  },
  from?: number,           // default 0
  to?: number,             // default 1
  durationInFrames?: number,  // auto-calculated if omitted
  durationRestThreshold?: number,  // default 0.005
  delay?: number,          // default 0
}): number
```

### Spring with Custom Range

```tsx
// Spring from 0 to 200
const x = spring({
  frame,
  fps,
  from: 0,
  to: 200,
  config: { damping: 12 },
});

// Spring from 1 to 0 (exit animation)
const scale = spring({
  frame: frame - exitFrame,
  fps,
  from: 1,
  to: 0,
  config: { damping: 15 },
});
```

### measureSpring()

Calculate how many frames a spring takes to settle:

```tsx
import { measureSpring } from "remotion";

const duration = measureSpring({
  fps: 30,
  config: { damping: 12, stiffness: 200, mass: 0.5 },
}); // Returns number of frames
```

## Combining interpolate and spring

```tsx
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

// Use spring for entrance, interpolate for exit
const enterProgress = spring({ frame, fps, config: { damping: 12 } });
const exitOpacity = interpolate(frame, [80, 90], [1, 0], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});

const style = {
  transform: `scale(${enterProgress})`,
  opacity: exitOpacity,
};
```

## Loop Animation

```tsx
import { useCurrentFrame } from "remotion";

const frame = useCurrentFrame();

// Continuous rotation
const rotation = (frame / 30) * 360; // One full rotation per second at 30fps

// Pulsing scale
const pulse = 1 + 0.1 * Math.sin((frame / 30) * Math.PI * 2);

// Bobbing up and down
const y = Math.sin((frame / 60) * Math.PI * 2) * 20;
```

## Random with Determinism

```tsx
import { random } from "remotion";

// Deterministic random (same seed = same result)
const x = random(`particle-${i}-x`) * width;
const y = random(`particle-${i}-y`) * height;

// Random delay for staggered animation
const delay = random(`delay-${i}`) * 15;
const s = spring({ frame: frame - delay, fps });
```
