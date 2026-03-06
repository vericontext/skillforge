# Template Project - Complete Remotion Boilerplate

This is the canonical template project. When creating a new video, **copy these files verbatim** and only customize `video.config.ts`. NEVER write effect components from scratch.

## Directory Structure

```
<project-name>/
├── src/
│   ├── index.ts
│   ├── Root.tsx
│   ├── components/
│   │   └── effects/
│   │       ├── index.ts
│   │       ├── palettes.ts
│   │       ├── AnimatedGradient.tsx
│   │       ├── ParticleField.tsx
│   │       ├── GlowText.tsx
│   │       ├── StaggerText.tsx
│   │       ├── GlassmorphismCard.tsx
│   │       ├── LightLeak.tsx
│   │       ├── AnimatedGrid.tsx
│   │       ├── NumberCounter.tsx
│   │       ├── ProgressRing.tsx
│   │       ├── ShockwaveRing.tsx
│   │       └── FlashOverlay.tsx
│   ├── compositions/
│   │   ├── SceneRenderer.tsx
│   │   └── CTARenderer.tsx
│   └── lib/
│       └── config-types.ts
├── public/
│   ├── images/
│   └── audio/
├── video.config.ts
├── remotion.config.ts
├── package.json
└── tsconfig.json
```

## package.json

```json
{
  "name": "my-video",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "studio": "remotion studio",
    "render": "remotion render src/index.ts Main out/video.mp4",
    "render:draft": "remotion render src/index.ts Main out/draft.mp4 --scale=0.5"
  },
  "dependencies": {
    "remotion": "^4.0.0",
    "@remotion/cli": "^4.0.0",
    "@remotion/bundler": "^4.0.0",
    "@remotion/renderer": "^4.0.0",
    "@remotion/transitions": "^4.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/react": "^18.0.0"
  }
}
```

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*", "video.config.ts"]
}
```

## remotion.config.ts

```ts
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
```

## src/index.ts

```ts
import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

registerRoot(RemotionRoot);
```

## src/lib/config-types.ts

```ts
export type PaletteName = "modern" | "sunset" | "ocean" | "neon" | "forest";

export type Palette = {
  primary: string;
  secondary: string;
  accent: string;
  highlight: string;
  muted: string;
};

export type SceneConfig = {
  title: string;
  description?: string;
  image?: string;
  imageStyle?: "cover" | "contain-center";  // default: "cover"
  durationSeconds: number;
  textStyle?: "glow" | "stagger" | "kinetic";  // kinetic: words fly in from random directions
  entrance?: "zoom" | "slide-up" | "slide-left" | "flash";  // default: "zoom"
  stats?: Array<{
    label: string;
    value: number;
    suffix?: string;
  }>;
};

export type CTAConfig = {
  text: string;
  buttonText?: string;
  durationSeconds: number;
};

export type VideoConfig = {
  id: string;
  format: "landscape" | "portrait" | "square" | "og" | "youtube_thumb";
  fps: number;
  palette: PaletteName;
  customPalette?: Palette;  // Override preset palette with custom colors (e.g. extracted from logo)
  fontFamily: string;
  energy?: "calm" | "moderate" | "high";  // default: "moderate" — controls global animation intensity
  effects: {
    gradient?: { speed?: number };
    grid?: { type?: "dots" | "lines"; opacity?: number };
    particles?: { density?: number; burst?: boolean };  // burst: explode outward on scene entry
    lightLeak?: { intensity?: number };
    flash?: boolean;  // bright flash on scene entry (default: true for high energy)
    shockwave?: boolean;  // expanding ring on logo reveal (default: true for contain-center)
  };
  scenes: SceneConfig[];
  cta?: CTAConfig;
  audio?: {
    bgMusic?: string;
    volume?: number;
  };
  imageGeneration?: {
    enabled: boolean;
    styleAnchor: string;
    prompts: Record<string, string>;
  };
  metadata?: {
    source: "git" | "json" | "csv" | "manual" | "logo";
    generatedAt: string;
    inputPath?: string;
  };
};

export const FORMAT_DIMENSIONS = {
  landscape: { width: 1920, height: 1080 },
  portrait: { width: 1080, height: 1920 },
  square: { width: 1080, height: 1080 },
  og: { width: 1200, height: 630 },
  youtube_thumb: { width: 1280, height: 720 },
} as const;
```

## src/Root.tsx

```tsx
import React from "react";
import { Composition } from "remotion";
import { SceneRenderer } from "./compositions/SceneRenderer";
import { videoConfig } from "../video.config";
import { FORMAT_DIMENSIONS } from "./lib/config-types";

const dimensions = FORMAT_DIMENSIONS[videoConfig.format];
const totalFrames =
  videoConfig.scenes.reduce((sum, s) => sum + s.durationSeconds, 0) *
    videoConfig.fps +
  (videoConfig.cta ? videoConfig.cta.durationSeconds * videoConfig.fps : 0);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Main"
        component={SceneRenderer}
        durationInFrames={totalFrames}
        fps={videoConfig.fps}
        width={dimensions.width}
        height={dimensions.height}
        defaultProps={{ config: videoConfig }}
      />
    </>
  );
};
```

## src/components/effects/palettes.ts

```ts
export const PALETTES = {
  modern: {
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#ec4899",
    highlight: "#06b6d4",
    muted: "#1e1b4b",
  },
  sunset: {
    primary: "#f97316",
    secondary: "#ef4444",
    accent: "#fbbf24",
    highlight: "#fb923c",
    muted: "#431407",
  },
  ocean: {
    primary: "#0ea5e9",
    secondary: "#6366f1",
    accent: "#14b8a6",
    highlight: "#38bdf8",
    muted: "#0c1929",
  },
  neon: {
    primary: "#a855f7",
    secondary: "#ec4899",
    accent: "#22d3ee",
    highlight: "#facc15",
    muted: "#0a0a1a",
  },
  forest: {
    primary: "#22c55e",
    secondary: "#14b8a6",
    accent: "#84cc16",
    highlight: "#a3e635",
    muted: "#052e16",
  },
} as const;

export type PaletteName = keyof typeof PALETTES;
export type Palette = { primary: string; secondary: string; accent: string; highlight: string; muted: string };
```

## src/components/effects/AnimatedGradient.tsx

```tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { Palette } from "./palettes";

export const AnimatedGradient: React.FC<{
  palette: Palette;
  speed?: number;
}> = ({ palette, speed = 1 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = (frame / durationInFrames) * speed;

  const x1 = 30 + 20 * Math.sin(progress * Math.PI * 2);
  const y1 = 30 + 20 * Math.cos(progress * Math.PI * 2);
  const x2 = 70 + 20 * Math.sin(progress * Math.PI * 2 + 2);
  const y2 = 70 + 20 * Math.cos(progress * Math.PI * 2 + 2);
  const x3 = 50 + 25 * Math.sin(progress * Math.PI * 2 + 4);
  const y3 = 40 + 25 * Math.cos(progress * Math.PI * 2 + 4);

  return (
    <AbsoluteFill
      style={{
        background: `
          radial-gradient(ellipse at ${x1}% ${y1}%, ${palette.primary}cc 0%, transparent 50%),
          radial-gradient(ellipse at ${x2}% ${y2}%, ${palette.secondary}aa 0%, transparent 50%),
          radial-gradient(ellipse at ${x3}% ${y3}%, ${palette.accent}88 0%, transparent 50%),
          linear-gradient(180deg, ${palette.muted} 0%, #000000 100%)
        `,
      }}
    />
  );
};
```

## src/components/effects/ParticleField.tsx

```tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, random } from "remotion";

export const ParticleField: React.FC<{
  color: string;
  secondaryColor?: string;
  density?: number;
  burst?: boolean;
}> = ({ color, secondaryColor, density = 300, burst = false }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const count = Math.min(density, 800);

  // Burst: particles explode outward from center for first 30 frames, then settle
  const burstProgress = burst ? Math.min(frame / 30, 1) : 1;
  const burstEase = 1 - Math.pow(1 - burstProgress, 3); // ease-out cubic

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {Array.from({ length: count }).map((_, i) => {
        const baseX = random(`px-${i}`) * width;
        const baseY = random(`py-${i}`) * height;
        const size = 1 + random(`size-${i}`) * 4;
        const speedMult = 0.3 + random(`speed-${i}`);
        const phase = random(`phase-${i}`) * Math.PI * 2;

        // Burst: start from center, expand to final position
        let x: number, y: number;
        if (burst && burstProgress < 1) {
          const centerX = width / 2;
          const centerY = height / 2;
          x = centerX + (baseX - centerX) * burstEase + Math.sin(frame * 0.02 * speedMult + phase) * 20 * burstEase;
          y = centerY + (baseY - centerY) * burstEase;
        } else {
          x = baseX + Math.sin(frame * 0.015 * speedMult + phase) * 40;
          y = ((baseY - frame * 0.3 * speedMult) % height + height) % height;
        }

        const twinkle = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(frame * 0.07 + i));
        const useSecondary = secondaryColor && random(`col-${i}`) > 0.6;
        const burstGlow = burst && frame < 20 ? size * 5 : size * 3;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: useSecondary ? secondaryColor : color,
              opacity: twinkle * (size > 2 ? 0.85 : 0.5),
              boxShadow: size > 2 ? `0 0 ${burstGlow}px ${size}px ${(useSecondary ? secondaryColor : color)}66` : "none",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
```

## src/components/effects/GlowText.tsx

```tsx
import React from "react";
import { useCurrentFrame } from "remotion";

export const GlowText: React.FC<{
  text: string;
  fontSize?: number;
  color?: string;
  glowColor: string;
  fontFamily?: string;
  fontWeight?: number;
}> = ({ text, fontSize = 72, color = "white", glowColor, fontFamily = "Inter", fontWeight = 800 }) => {
  const frame = useCurrentFrame();
  const glowSize = 20 + 10 * Math.sin(frame * 0.04);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div style={{
        position: "absolute", inset: 0, color: glowColor, fontSize, fontFamily, fontWeight,
        filter: `blur(${glowSize}px)`, opacity: 0.6,
      }}>{text}</div>
      <div style={{
        position: "relative", color, fontSize, fontFamily, fontWeight,
        textShadow: `0 0 ${glowSize / 2}px ${glowColor}88`,
      }}>{text}</div>
    </div>
  );
};
```

## src/components/effects/StaggerText.tsx

```tsx
import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const StaggerText: React.FC<{
  text: string;
  fontSize?: number;
  color?: string;
  glowColor?: string;
  fontFamily?: string;
  fontWeight?: number;
  staggerDelay?: number;
}> = ({ text, fontSize = 72, color = "white", glowColor, fontFamily = "Inter", fontWeight = 800, staggerDelay = 2 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {text.split("").map((char, i) => {
        const s = spring({ frame: frame - i * staggerDelay, fps, config: { damping: 12, stiffness: 200 } });
        return (
          <span key={i} style={{
            display: "inline-block", color, fontSize, fontFamily, fontWeight,
            opacity: s, transform: `translateY(${(1 - s) * 30}px)`,
            textShadow: glowColor ? `0 0 20px ${glowColor}, 0 0 40px ${glowColor}66` : "none",
          }}>
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </div>
  );
};
```

## src/components/effects/GlassmorphismCard.tsx

```tsx
import React from "react";

export const GlassmorphismCard: React.FC<{
  children: React.ReactNode;
  borderColor?: string;
  padding?: number;
  borderRadius?: number;
}> = ({ children, borderColor = "rgba(255,255,255,0.15)", padding = 40, borderRadius = 24 }) => (
  <div style={{
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
    border: `1px solid ${borderColor}`, borderRadius, padding,
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  }}>
    {children}
  </div>
);
```

## src/components/effects/LightLeak.tsx

```tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

export const LightLeak: React.FC<{
  color: string;
  secondaryColor?: string;
  intensity?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "sides";
}> = ({ color, secondaryColor, intensity = 0.3, position = "top-right" }) => {
  const frame = useCurrentFrame();
  const breathe = 0.7 + 0.3 * Math.sin(frame * 0.03);
  const drift = Math.sin(frame * 0.02) * 5;
  const alpha = Math.round(intensity * breathe * 255).toString(16).padStart(2, "0");

  const gradients: Record<string, string> = {
    "top-left": `radial-gradient(ellipse at ${-5 + drift}% ${-5 + drift}%, ${color}${alpha} 0%, transparent 60%)`,
    "top-right": `radial-gradient(ellipse at ${105 + drift}% ${-5 + drift}%, ${color}${alpha} 0%, transparent 60%)`,
    "bottom-left": `radial-gradient(ellipse at ${-5 + drift}% ${105 - drift}%, ${color}${alpha} 0%, transparent 60%)`,
    "bottom-right": `radial-gradient(ellipse at ${105 + drift}% ${105 - drift}%, ${color}${alpha} 0%, transparent 60%)`,
    sides: `
      radial-gradient(ellipse at ${-5 + drift}% 50%, ${color}${alpha} 0%, transparent 50%),
      radial-gradient(ellipse at ${105 + drift}% 50%, ${secondaryColor || color}${alpha} 0%, transparent 50%)
    `,
  };

  return <AbsoluteFill style={{ background: gradients[position], mixBlendMode: "screen" }} />;
};
```

## src/components/effects/AnimatedGrid.tsx

```tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

export const AnimatedGrid: React.FC<{
  color?: string;
  type?: "dots" | "lines";
  spacing?: number;
  opacity?: number;
}> = ({ color = "rgba(255,255,255,0.08)", type = "dots", spacing = 40, opacity = 1 }) => {
  const frame = useCurrentFrame();
  const offsetX = (frame * 0.3) % spacing;
  const offsetY = (frame * 0.2) % spacing;

  const bg = type === "dots"
    ? `radial-gradient(circle, ${color} 1px, transparent 1px)`
    : `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`;
  const bgSize = type === "dots"
    ? `${spacing}px ${spacing}px`
    : `${spacing}px ${spacing}px, ${spacing}px ${spacing}px`;

  return (
    <AbsoluteFill style={{
      backgroundImage: bg, backgroundSize: bgSize,
      backgroundPosition: `${offsetX}px ${offsetY}px`, opacity,
    }} />
  );
};
```

## src/components/effects/NumberCounter.tsx

```tsx
import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";
import { GlowText } from "./GlowText";

export const NumberCounter: React.FC<{
  value: number;
  startFrame?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  fontSize?: number;
  color?: string;
  glowColor?: string;
  fontFamily?: string;
}> = ({ value, startFrame = 0, duration = 40, prefix = "", suffix = "", fontSize = 96, color = "white", glowColor, fontFamily = "Inter" }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - startFrame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });
  const text = `${prefix}${Math.round(value * progress).toLocaleString()}${suffix}`;

  if (glowColor) {
    return <GlowText text={text} fontSize={fontSize} color={color} glowColor={glowColor} fontFamily={fontFamily} />;
  }
  return <div style={{ color, fontSize, fontFamily, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{text}</div>;
};
```

## src/components/effects/ProgressRing.tsx

```tsx
import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const ProgressRing: React.FC<{
  progress: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  glowColor?: string;
  label?: string;
  labelColor?: string;
}> = ({ progress, size = 200, strokeWidth = 12, color, glowColor, label, labelColor = "white" }) => {
  const frame = useCurrentFrame();
  const animatedProgress = interpolate(frame, [0, 45], [0, progress], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - animatedProgress / 100);

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={dashOffset} strokeLinecap="round"
          style={{ filter: glowColor ? `drop-shadow(0 0 8px ${glowColor})` : "none" }} />
      </svg>
      {label && (
        <div style={{
          position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center",
          color: labelColor, fontSize: size * 0.22, fontWeight: 700, fontVariantNumeric: "tabular-nums",
        }}>{label}</div>
      )}
    </div>
  );
};
```

## src/components/effects/ShockwaveRing.tsx

```tsx
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";

export const ShockwaveRing: React.FC<{
  color: string;
  delay?: number;
  count?: number;
}> = ({ color, delay = 0, count = 3 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const maxRadius = Math.hypot(width, height) / 2;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {Array.from({ length: count }).map((_, i) => {
        const ringDelay = delay + i * 8;
        const progress = interpolate(frame - ringDelay, [0, 40], [0, 1], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        const radius = progress * maxRadius;
        const opacity = interpolate(progress, [0, 0.3, 1], [0, 0.8, 0], { extrapolateRight: "clamp" });
        const strokeWidth = interpolate(progress, [0, 1], [6, 1], { extrapolateRight: "clamp" });

        return (
          <svg key={i} width={width} height={height} style={{ position: "absolute" }}>
            <circle
              cx={width / 2} cy={height / 2} r={Math.max(0, radius)}
              fill="none" stroke={color} strokeWidth={strokeWidth}
              opacity={opacity}
              style={{ filter: `drop-shadow(0 0 12px ${color})` }}
            />
          </svg>
        );
      })}
    </AbsoluteFill>
  );
};
```

## src/components/effects/FlashOverlay.tsx

```tsx
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

export const FlashOverlay: React.FC<{
  color?: string;
  delay?: number;
  duration?: number;
}> = ({ color = "white", delay = 0, duration = 12 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, 3, duration], [0, 0.9, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: color,
        opacity,
        mixBlendMode: "screen",
      }}
    />
  );
};
```

## src/components/effects/index.ts (barrel export)

```ts
export { AnimatedGradient } from "./AnimatedGradient";
export { ParticleField } from "./ParticleField";
export { GlowText } from "./GlowText";
export { StaggerText } from "./StaggerText";
export { GlassmorphismCard } from "./GlassmorphismCard";
export { LightLeak } from "./LightLeak";
export { AnimatedGrid } from "./AnimatedGrid";
export { NumberCounter } from "./NumberCounter";
export { ProgressRing } from "./ProgressRing";
export { ShockwaveRing } from "./ShockwaveRing";
export { FlashOverlay } from "./FlashOverlay";
export { PALETTES } from "./palettes";
export type { Palette, PaletteName } from "./palettes";
```

## src/compositions/SceneRenderer.tsx

The universal scene renderer. Reads `video.config.ts` and renders all scenes automatically with dynamic, high-energy effects.

```tsx
import React from "react";
import {
  AbsoluteFill,
  Img,
  Audio,
  Sequence,
  spring,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  random,
  Easing,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { slide } from "@remotion/transitions/slide";
import {
  AnimatedGradient,
  ParticleField,
  GlowText,
  StaggerText,
  GlassmorphismCard,
  LightLeak,
  AnimatedGrid,
  NumberCounter,
  ProgressRing,
  ShockwaveRing,
  FlashOverlay,
  PALETTES,
} from "../components/effects";
import type { VideoConfig, SceneConfig } from "../lib/config-types";

// --- Energy multipliers ---
const ENERGY = {
  calm: { speed: 0.7, particleMult: 0.8, springDamping: 16, entranceOffset: 30, flashEnabled: false },
  moderate: { speed: 1.0, particleMult: 1.0, springDamping: 12, entranceOffset: 60, flashEnabled: true },
  high: { speed: 1.5, particleMult: 1.4, springDamping: 8, entranceOffset: 100, flashEnabled: true },
} as const;

// --- Kinetic Text (words fly in from random directions) ---
const KineticText: React.FC<{
  text: string;
  fontSize?: number;
  color?: string;
  glowColor?: string;
  fontFamily?: string;
  fontWeight?: number;
}> = ({ text, fontSize = 64, color = "white", glowColor, fontFamily = "Inter", fontWeight = 800 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 20px" }}>
      {words.map((word, i) => {
        const s = spring({ frame: frame - i * 4, fps, config: { damping: 10, stiffness: 160, overshootClamping: false } });
        const angle = random(`kinetic-angle-${i}`) * Math.PI * 2;
        const distance = 200 + random(`kinetic-dist-${i}`) * 300;
        const startX = Math.cos(angle) * distance;
        const startY = Math.sin(angle) * distance;
        const rotation = (random(`kinetic-rot-${i}`) - 0.5) * 40;
        const x = interpolate(s, [0, 1], [startX, 0]);
        const y = interpolate(s, [0, 1], [startY, 0]);
        const rot = interpolate(s, [0, 1], [rotation, 0]);

        return (
          <span key={i} style={{
            display: "inline-block", fontSize, fontFamily, fontWeight, color,
            transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
            opacity: s,
            textShadow: glowColor ? `0 0 20px ${glowColor}, 0 0 60px ${glowColor}66` : "none",
          }}>{word}</span>
        );
      })}
    </div>
  );
};

// --- Scene entrance transform ---
function useEntrance(entrance: string | undefined, frame: number, fps: number, energy: typeof ENERGY[keyof typeof ENERGY]) {
  const s = spring({ frame, fps, config: { damping: energy.springDamping, stiffness: 140, overshootClamping: false } });
  switch (entrance) {
    case "slide-up":
      return { transform: `translateY(${(1 - s) * energy.entranceOffset}px)`, opacity: s };
    case "slide-left":
      return { transform: `translateX(${(1 - s) * energy.entranceOffset}px)`, opacity: s };
    case "flash":
      return { transform: `scale(${interpolate(s, [0, 1], [1.3, 1])})`, opacity: s };
    case "zoom":
    default:
      return { transform: `scale(${interpolate(s, [0, 1], [1.15, 1])})`, opacity: s };
  }
}

// --- Individual Scene ---
const Scene: React.FC<{
  scene: SceneConfig;
  config: VideoConfig;
  sceneIndex: number;
}> = ({ scene, config, sceneIndex }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const palette = config.customPalette ?? PALETTES[config.palette];
  const energy = ENERGY[config.energy ?? "moderate"];

  // --- Entrance animation ---
  const entranceStyle = useEntrance(scene.entrance, frame, fps, energy);

  // --- Title spring (snappier) ---
  const titleSpring = spring({ frame: frame - 5, fps, config: { damping: energy.springDamping, stiffness: 200, overshootClamping: false } });

  // --- Exit: zoom out + fade ---
  const exitProgress = interpolate(frame, [durationInFrames - 20, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.92]);
  const exitOpacity = 1 - exitProgress;

  // --- Rhythmic pulse (beat) ---
  const beatCycle = (frame % 30) / 30;
  const beat = beatCycle < 0.1 ? interpolate(beatCycle, [0, 0.05, 0.1], [1, 1.02, 1]) : 1;

  // --- Logo reveal specific animations ---
  const isLogoReveal = scene.imageStyle === "contain-center";
  const logoScale = spring({ frame: frame - 3, fps, config: { damping: 8, stiffness: 120, overshootClamping: false } });
  const logoGlowPulse = 20 + 40 * Math.max(0, 1 - frame / 30) + 15 * Math.sin(frame * 0.06);
  const logoRotation = interpolate(logoScale, [0, 0.5, 1], [-8, 2, 0]);

  const gridType = config.effects.grid?.type || "dots";
  const gridOpacity = config.effects.grid?.opacity ?? 1;
  const particleDensity = Math.round((config.effects.particles?.density ?? 300) * energy.particleMult);
  const leakIntensity = (config.effects.lightLeak?.intensity ?? 0.3) * energy.speed;
  const gradientSpeed = (config.effects.gradient?.speed ?? 1) * energy.speed;
  const showFlash = config.effects.flash ?? energy.flashEnabled;
  const showShockwave = config.effects.shockwave ?? isLogoReveal;

  return (
    <AbsoluteFill style={{ opacity: exitOpacity, transform: `scale(${exitScale * beat})` }}>
      {/* Layer 1: Animated gradient (faster) */}
      <AnimatedGradient palette={palette} speed={gradientSpeed} />

      {/* Layer 2: Grid */}
      <AnimatedGrid color={`${palette.primary}15`} type={gridType} opacity={gridOpacity} />

      {/* Layer 3: Image */}
      {isLogoReveal ? (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <Img
            src={staticFile(scene.image!)}
            style={{
              maxWidth: "45%", maxHeight: "45%",
              objectFit: "contain",
              transform: `scale(${logoScale}) rotate(${logoRotation}deg)`,
              filter: `drop-shadow(0 0 ${logoGlowPulse}px ${palette.primary}88) drop-shadow(0 0 ${logoGlowPulse * 0.5}px ${palette.accent}66)`,
            }}
          />
        </AbsoluteFill>
      ) : scene.image ? (
        <AbsoluteFill>
          <Img
            src={staticFile(scene.image)}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transform: `scale(${interpolate(frame, [0, durationInFrames], [1.15, 1.0])})`,
              opacity: interpolate(frame, [0, 20], [0, 0.35], { extrapolateRight: "clamp" }),
            }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(135deg, ${palette.muted}ee 0%, transparent 50%, ${palette.muted}cc 100%)`,
          }} />
        </AbsoluteFill>
      ) : null}

      {/* Layer 4: Particles */}
      <ParticleField color={palette.highlight} secondaryColor={palette.accent} density={particleDensity} />

      {/* Layer 5: Light leak (dual, alternating) */}
      <LightLeak
        color={palette.accent}
        position={sceneIndex % 2 === 0 ? "top-right" : "bottom-left"}
        intensity={leakIntensity}
      />
      <LightLeak
        color={palette.secondary}
        position={sceneIndex % 2 === 0 ? "bottom-left" : "top-right"}
        intensity={leakIntensity * 0.6}
      />

      {/* Layer 6: Shockwave rings (on logo reveal or when enabled) */}
      {showShockwave && (
        <ShockwaveRing color={palette.primary} delay={5} count={3} />
      )}

      {/* Layer 7: Flash overlay (on scene entry) */}
      {showFlash && <FlashOverlay color={palette.highlight} delay={0} duration={15} />}

      {/* Layer 8: Content with entrance animation */}
      <AbsoluteFill style={{
        justifyContent: "center", alignItems: "center", padding: "10% 8%",
        ...entranceStyle,
      }}>
        {/* Logo scenes: no card, just the logo + optional title below */}
        {isLogoReveal ? (
          scene.title ? (
            <div style={{ marginTop: "30%", textAlign: "center" }}>
              <StaggerText text={scene.title} fontSize={48} glowColor={palette.primary} fontFamily={config.fontFamily} />
            </div>
          ) : null
        ) : (
          <GlassmorphismCard>
            {/* Accent line (wider, animated gradient) */}
            <div style={{
              width: interpolate(titleSpring, [0, 1], [0, 120]), height: 4,
              background: `linear-gradient(90deg, ${palette.primary}, ${palette.accent}, ${palette.highlight})`,
              backgroundSize: "200% 100%",
              backgroundPosition: `${frame % 60 * 3.3}% 0`,
              marginBottom: 24, borderRadius: 2,
            }} />

            {/* Title */}
            <div style={{
              opacity: titleSpring,
              transform: `translateY(${(1 - titleSpring) * energy.entranceOffset * 0.5}px) scale(${interpolate(titleSpring, [0, 1], [0.85, 1])})`,
              marginBottom: 28,
            }}>
              {scene.textStyle === "kinetic" ? (
                <KineticText text={scene.title} fontSize={64} glowColor={palette.primary} fontFamily={config.fontFamily} />
              ) : scene.textStyle === "stagger" ? (
                <StaggerText text={scene.title} fontSize={64} glowColor={palette.primary} fontFamily={config.fontFamily} />
              ) : (
                <GlowText text={scene.title} fontSize={64} glowColor={palette.primary} fontFamily={config.fontFamily} />
              )}
            </div>

            {/* Description (more dramatic stagger) */}
            {scene.description && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0 12px" }}>
                {scene.description.split(" ").map((word, i) => {
                  const ws = spring({ frame: frame - 10 - i * 4, fps, config: { damping: 10, stiffness: 180 } });
                  const wordAngle = (random(`desc-${i}`) - 0.5) * 15;
                  return (
                    <span key={i} style={{
                      color: "rgba(255,255,255,0.9)", fontSize: 32, fontFamily: config.fontFamily,
                      lineHeight: 1.7, display: "inline-block",
                      opacity: ws,
                      transform: `translateY(${(1 - ws) * 25}px) rotate(${(1 - ws) * wordAngle}deg)`,
                    }}>{word}</span>
                  );
                })}
              </div>
            )}

            {/* Stats (snappier) */}
            {scene.stats && scene.stats.length > 0 && (
              <div style={{ display: "flex", gap: 48, marginTop: 36 }}>
                {scene.stats.map((stat, i) => {
                  const statSpring = spring({ frame: frame - 12 - i * 6, fps, config: { damping: 10, stiffness: 200 } });
                  return (
                    <div key={i} style={{
                      textAlign: "center",
                      transform: `scale(${statSpring}) translateY(${(1 - statSpring) * 20}px)`,
                      opacity: statSpring,
                    }}>
                      <NumberCounter
                        value={stat.value} suffix={stat.suffix} fontSize={44}
                        color={palette.highlight} glowColor={palette.primary} startFrame={15 + i * 6} duration={30}
                      />
                      <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 17, marginTop: 6, fontWeight: 500 }}>{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </GlassmorphismCard>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// --- CTA Scene ---
const CTAScene: React.FC<{ config: VideoConfig }> = ({ config }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const palette = config.customPalette ?? PALETTES[config.palette];
  const energy = ENERGY[config.energy ?? "moderate"];
  const cta = config.cta!;

  // Dramatic entrance: zoom from 1.4 to 1.0
  const entranceSpring = spring({ frame, fps, config: { damping: energy.springDamping, stiffness: 130 } });
  const entranceScale = interpolate(entranceSpring, [0, 1], [1.4, 1]);

  const buttonSpring = spring({ frame: frame - 20, fps, config: { damping: 8, stiffness: 200, overshootClamping: false } });

  // Stronger pulse
  const pulse = 1 + 0.06 * Math.sin((frame / 18) * Math.PI * 2);
  const glowPulse = 0.5 + 0.5 * Math.sin((frame / 15) * Math.PI * 2);

  // Rotating gradient on button
  const gradientAngle = 135 + frame * 2;

  // Exit
  const exitOpacity = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity, transform: `scale(${entranceScale})` }}>
      <AnimatedGradient palette={palette} speed={2.0 * energy.speed} />
      <ParticleField color={palette.highlight} secondaryColor={palette.accent} density={Math.round(400 * energy.particleMult)} />
      <LightLeak color={palette.primary} position="top-right" intensity={0.5 * energy.speed} />
      <LightLeak color={palette.secondary} position="bottom-left" intensity={0.4 * energy.speed} />
      <LightLeak color={palette.accent} position="sides" intensity={0.25 * energy.speed} />

      {/* Flash + shockwave on CTA entry */}
      {energy.flashEnabled && <FlashOverlay color={palette.accent} delay={0} duration={12} />}
      <ShockwaveRing color={palette.highlight} delay={2} count={2} />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <KineticText text={cta.text} fontSize={60} color="white" glowColor={palette.primary} fontFamily={config.fontFamily} />

        {cta.buttonText && (
          <div style={{
            marginTop: 60,
            background: `linear-gradient(${gradientAngle}deg, ${palette.primary}, ${palette.accent}, ${palette.secondary})`,
            backgroundSize: "300% 300%",
            padding: "24px 56px", borderRadius: 50,
            transform: `scale(${buttonSpring * pulse})`,
            boxShadow: `
              0 0 ${30 + glowPulse * 30}px ${palette.primary}${Math.round(glowPulse * 120).toString(16).padStart(2, "0")},
              0 0 ${60 + glowPulse * 40}px ${palette.accent}44
            `,
          }}>
            <span style={{ color: "white", fontSize: 34, fontFamily: config.fontFamily, fontWeight: 700, letterSpacing: 1 }}>
              {cta.buttonText}
            </span>
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// --- Transition picker ---
const TRANSITIONS = [
  () => fade(),
  () => wipe({ direction: "from-bottom" }),
  () => wipe({ direction: "from-left" }),
  () => slide({ direction: "from-bottom" }),
  () => slide({ direction: "from-right" }),
];

// --- Main Renderer ---
export const SceneRenderer: React.FC<{ config: VideoConfig }> = ({ config }) => {
  const sceneDurations = config.scenes.map((s) => s.durationSeconds * config.fps);
  const ctaDuration = config.cta ? config.cta.durationSeconds * config.fps : 0;
  const energy = ENERGY[config.energy ?? "moderate"];
  const transitionDuration = energy.speed > 1 ? 12 : 18;

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {config.scenes.map((scene, i) => (
          <React.Fragment key={i}>
            <TransitionSeries.Sequence durationInFrames={sceneDurations[i]}>
              <Scene scene={scene} config={config} sceneIndex={i} />
            </TransitionSeries.Sequence>
            {(i < config.scenes.length - 1 || config.cta) && (
              <TransitionSeries.Transition
                presentation={TRANSITIONS[i % TRANSITIONS.length]()}
                timing={linearTiming({ durationInFrames: transitionDuration })}
              />
            )}
          </React.Fragment>
        ))}

        {config.cta && (
          <TransitionSeries.Sequence durationInFrames={ctaDuration}>
            <CTAScene config={config} />
          </TransitionSeries.Sequence>
        )}
      </TransitionSeries>

      {config.audio?.bgMusic && (
        <Audio src={staticFile(config.audio.bgMusic)} volume={config.audio.volume ?? 0.3} />
      )}
    </AbsoluteFill>
  );
};
```

## video.config.ts (example - this is the ONLY file to customize)

```ts
import type { VideoConfig } from "./src/lib/config-types";

export const videoConfig: VideoConfig = {
  id: "my-video",
  format: "landscape",
  fps: 30,
  palette: "modern",
  energy: "moderate",
  fontFamily: "Inter",
  effects: {
    gradient: { speed: 1.2 },
    grid: { type: "dots", opacity: 0.6 },
    particles: { density: 350, burst: true },
    lightLeak: { intensity: 0.35 },
    flash: true,
  },
  scenes: [
    {
      title: "Welcome",
      description: "This is a sample video created with the template project.",
      durationSeconds: 5,
      textStyle: "kinetic",
      entrance: "zoom",
    },
    {
      title: "Features",
      description: "Premium visual effects are built in. No extra setup needed.",
      durationSeconds: 5,
      textStyle: "glow",
      entrance: "slide-up",
      stats: [
        { label: "Effects", value: 12, suffix: "+" },
        { label: "Palettes", value: 5 },
      ],
    },
  ],
  cta: {
    text: "Get Started Today",
    buttonText: "Learn More",
    durationSeconds: 4,
  },
};
```

## Setup Commands

```bash
mkdir <project-name> && cd <project-name>
npm init -y
npm install remotion @remotion/cli @remotion/bundler @remotion/renderer @remotion/transitions react react-dom zod
npm install -D typescript @types/react
```

Then copy all files from this template and customize only `video.config.ts`.

## Optional: Adding Gemini Image Generation

If `imageGeneration.enabled` is true in video.config.ts, create `scripts/generate-images.ts`:

```ts
import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "fs";
import * as path from "path";
import { videoConfig } from "../video.config";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

async function generateImages() {
  if (!videoConfig.imageGeneration?.enabled) {
    console.log("Image generation disabled in config.");
    return;
  }

  const imgDir = path.join(__dirname, "..", "public", "images");
  fs.mkdirSync(imgDir, { recursive: true });

  for (const [name, prompt] of Object.entries(videoConfig.imageGeneration.prompts)) {
    console.log(`Generating: ${name}...`);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: `${videoConfig.imageGeneration.styleAnchor}. ${prompt}`,
      config: { responseModalities: [Modality.IMAGE] },
    });

    const part = response.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData);
    if (part?.inlineData) {
      fs.writeFileSync(
        path.join(imgDir, `${name}.png`),
        Buffer.from(part.inlineData.data!, "base64")
      );
      console.log(`  Saved: images/${name}.png`);
    }
  }
}

generateImages().catch(console.error);
```

Add to package.json scripts: `"generate-images": "npx tsx scripts/generate-images.ts"`

Then in video.config.ts add:

```ts
imageGeneration: {
  enabled: true,
  styleAnchor: "modern flat illustration, soft gradients, tech aesthetic",
  prompts: {
    "scene-1": "A developer working on a futuristic holographic display",
    "scene-2": "Abstract network of glowing nodes and connections",
  },
},
```

And reference images in scenes: `image: "images/scene-1.png"`
