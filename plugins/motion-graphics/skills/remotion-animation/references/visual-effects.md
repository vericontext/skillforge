# Visual Effects Library

Premium visual effect components for creating cinematic motion graphics. These components should be included in every video project to elevate visual quality beyond basic animations.

## Color Palette System

Use these 5-color palette presets. Every video should use a full palette, not a single accent color.

```tsx
const PALETTES = {
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
};

type PaletteName = keyof typeof PALETTES;
```

## AnimatedGradient - Flowing Mesh Background

A background that shifts colors over time, creating a living, breathing canvas. **Use this instead of solid backgrounds in every composition.**

```tsx
const AnimatedGradient: React.FC<{
  palette: { primary: string; secondary: string; accent: string; highlight: string; muted: string };
  speed?: number;
}> = ({ palette, speed = 1 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = (frame / durationInFrames) * speed;
  const angle1 = progress * 360;
  const angle2 = progress * 360 + 120;
  const angle3 = progress * 360 + 240;

  // Orbital motion for gradient centers
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
          linear-gradient(${angle1}deg, ${palette.muted} 0%, #000000 100%)
        `,
      }}
    />
  );
};
```

## ParticleField - Floating Particles with Trails

500+ animated particles with varied sizes, speeds, and subtle glow. Creates depth and movement.

```tsx
import { random } from "remotion";

const PARTICLE_COUNT = 500;

const ParticleField: React.FC<{
  color: string;
  secondaryColor?: string;
  density?: number;
  speed?: number;
}> = ({ color, secondaryColor, density = 500, speed = 1 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const count = Math.min(density, 800);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {Array.from({ length: count }).map((_, i) => {
        const baseX = random(`px-${i}`) * width;
        const baseY = random(`py-${i}`) * height;
        const size = 1 + random(`size-${i}`) * 4;
        const speedMult = 0.3 + random(`speed-${i}`) * speed;
        const driftAngle = random(`angle-${i}`) * Math.PI * 2;
        const phase = random(`phase-${i}`) * Math.PI * 2;

        // Organic floating motion
        const x = baseX + Math.sin(frame * 0.01 * speedMult + phase) * 30;
        const y = baseY + Math.cos(frame * 0.008 * speedMult + phase) * 20 - frame * 0.2 * speedMult;

        // Wrap vertically
        const wrappedY = ((y % height) + height) % height;

        // Subtle twinkle
        const twinkle = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(frame * 0.05 + i));

        const useSecondary = secondaryColor && random(`col-${i}`) > 0.6;
        const particleColor = useSecondary ? secondaryColor : color;

        // Larger particles get glow
        const hasGlow = size > 3;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: wrappedY,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: particleColor,
              opacity: twinkle * (size > 2 ? 0.8 : 0.4),
              boxShadow: hasGlow ? `0 0 ${size * 3}px ${size}px ${particleColor}66` : "none",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
```

## GlowText - Text with Animated Glow and Pulse

Text with a soft, pulsing glow halo behind it. Use for titles and key phrases.

```tsx
const GlowText: React.FC<{
  text: string;
  fontSize?: number;
  color?: string;
  glowColor: string;
  fontFamily?: string;
  fontWeight?: number;
  pulseSpeed?: number;
}> = ({
  text,
  fontSize = 72,
  color = "white",
  glowColor,
  fontFamily = "Inter",
  fontWeight = 800,
  pulseSpeed = 1,
}) => {
  const frame = useCurrentFrame();

  // Pulsing glow intensity
  const glowIntensity = 0.6 + 0.4 * Math.sin(frame * 0.06 * pulseSpeed);
  const glowSize = 20 + 10 * Math.sin(frame * 0.04 * pulseSpeed);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Glow layer (blurred duplicate behind) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          color: glowColor,
          fontSize,
          fontFamily,
          fontWeight,
          filter: `blur(${glowSize}px)`,
          opacity: glowIntensity,
          WebkitTextStroke: "0",
        }}
      >
        {text}
      </div>
      {/* Main text */}
      <div
        style={{
          position: "relative",
          color,
          fontSize,
          fontFamily,
          fontWeight,
          textShadow: `0 0 ${glowSize / 2}px ${glowColor}88`,
        }}
      >
        {text}
      </div>
    </div>
  );
};
```

## GlassmorphismCard - Frosted Glass Card

A translucent card with blur backdrop. Adds visual depth and modern feel to text overlays.

```tsx
const GlassmorphismCard: React.FC<{
  children: React.ReactNode;
  borderColor?: string;
  padding?: number;
  borderRadius?: number;
}> = ({ children, borderColor = "rgba(255,255,255,0.15)", padding = 40, borderRadius = 24 }) => {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${borderColor}`,
        borderRadius,
        padding,
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      {children}
    </div>
  );
};
```

## LightLeak - Edge Light Bloom Effect

Soft light bleeding in from edges. Adds cinematic warmth.

```tsx
const LightLeak: React.FC<{
  color: string;
  secondaryColor?: string;
  intensity?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "sides";
}> = ({ color, secondaryColor, intensity = 0.4, position = "top-right" }) => {
  const frame = useCurrentFrame();

  const breathe = 0.7 + 0.3 * Math.sin(frame * 0.03);
  const drift = Math.sin(frame * 0.02) * 5;

  const positions: Record<string, string> = {
    "top-left": `radial-gradient(ellipse at ${-5 + drift}% ${-5 + drift}%, ${color}${Math.round(intensity * breathe * 255).toString(16).padStart(2, "0")} 0%, transparent 60%)`,
    "top-right": `radial-gradient(ellipse at ${105 + drift}% ${-5 + drift}%, ${color}${Math.round(intensity * breathe * 255).toString(16).padStart(2, "0")} 0%, transparent 60%)`,
    "bottom-left": `radial-gradient(ellipse at ${-5 + drift}% ${105 - drift}%, ${color}${Math.round(intensity * breathe * 255).toString(16).padStart(2, "0")} 0%, transparent 60%)`,
    "bottom-right": `radial-gradient(ellipse at ${105 + drift}% ${105 - drift}%, ${color}${Math.round(intensity * breathe * 255).toString(16).padStart(2, "0")} 0%, transparent 60%)`,
    sides: `
      radial-gradient(ellipse at ${-5 + drift}% 50%, ${color}${Math.round(intensity * breathe * 0.6 * 255).toString(16).padStart(2, "0")} 0%, transparent 50%),
      radial-gradient(ellipse at ${105 + drift}% 50%, ${secondaryColor || color}${Math.round(intensity * breathe * 0.6 * 255).toString(16).padStart(2, "0")} 0%, transparent 50%)
    `,
  };

  return (
    <AbsoluteFill
      style={{
        background: positions[position],
        mixBlendMode: "screen",
        pointerEvents: "none",
      }}
    />
  );
};
```

## AnimatedGrid - Moving Dot/Grid Pattern Background

Subtle animated grid or dot pattern that adds texture and depth.

```tsx
const AnimatedGrid: React.FC<{
  color?: string;
  type?: "dots" | "lines" | "crosses";
  spacing?: number;
  opacity?: number;
}> = ({ color = "rgba(255,255,255,0.08)", type = "dots", spacing = 40, opacity = 1 }) => {
  const frame = useCurrentFrame();

  // Slow drift
  const offsetX = (frame * 0.3) % spacing;
  const offsetY = (frame * 0.2) % spacing;

  const patternSize = spacing;

  let patternContent: string;
  if (type === "dots") {
    patternContent = `radial-gradient(circle, ${color} 1px, transparent 1px)`;
  } else if (type === "lines") {
    patternContent = `
      linear-gradient(${color} 1px, transparent 1px),
      linear-gradient(90deg, ${color} 1px, transparent 1px)
    `;
  } else {
    // crosses
    patternContent = `
      linear-gradient(${color} 1px, transparent 1px),
      linear-gradient(90deg, ${color} 1px, transparent 1px)
    `;
  }

  return (
    <AbsoluteFill
      style={{
        backgroundImage: patternContent,
        backgroundSize: type === "dots"
          ? `${patternSize}px ${patternSize}px`
          : `${patternSize}px ${patternSize}px, ${patternSize}px ${patternSize}px`,
        backgroundPosition: `${offsetX}px ${offsetY}px`,
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};
```

## NumberCounter - Animated Counting Number

Numbers that count up rapidly with easing. Use `fontVariantNumeric: "tabular-nums"` for stable width.

```tsx
const NumberCounter: React.FC<{
  value: number;
  startFrame?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  fontSize?: number;
  color?: string;
  glowColor?: string;
  fontFamily?: string;
}> = ({
  value,
  startFrame = 0,
  duration = 40,
  prefix = "",
  suffix = "",
  fontSize = 96,
  color = "white",
  glowColor,
  fontFamily = "Inter",
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame - startFrame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const displayValue = Math.round(value * progress);
  const text = `${prefix}${displayValue.toLocaleString()}${suffix}`;

  if (glowColor) {
    return (
      <GlowText
        text={text}
        fontSize={fontSize}
        color={color}
        glowColor={glowColor}
        fontFamily={fontFamily}
      />
    );
  }

  return (
    <div
      style={{
        color,
        fontSize,
        fontFamily,
        fontWeight: 800,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {text}
    </div>
  );
};
```

## ProgressRing - Circular SVG Progress

Animated circular progress indicator.

```tsx
const ProgressRing: React.FC<{
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color: string;
  trackColor?: string;
  glowColor?: string;
  label?: string;
  labelColor?: string;
}> = ({
  progress,
  size = 200,
  strokeWidth = 12,
  color,
  trackColor = "rgba(255,255,255,0.1)",
  glowColor,
  label,
  labelColor = "white",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const animatedProgress = interpolate(frame, [0, 45], [0, progress], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - animatedProgress / 100);

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{
            filter: glowColor ? `drop-shadow(0 0 8px ${glowColor})` : "none",
          }}
        />
      </svg>
      {/* Center label */}
      {label && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: labelColor,
            fontSize: size * 0.22,
            fontWeight: 700,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
```

## Character-Level Stagger Text

Enhanced text animation with per-character stagger, glow support, and configurable entrance direction.

```tsx
const StaggerText: React.FC<{
  text: string;
  fontSize?: number;
  color?: string;
  glowColor?: string;
  fontFamily?: string;
  fontWeight?: number;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right";
}> = ({
  text,
  fontSize = 72,
  color = "white",
  glowColor,
  fontFamily = "Inter",
  fontWeight = 800,
  staggerDelay = 2,
  direction = "up",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const getTransform = (progress: number) => {
    const distance = (1 - progress) * 30;
    switch (direction) {
      case "up": return `translateY(${distance}px)`;
      case "down": return `translateY(${-distance}px)`;
      case "left": return `translateX(${distance}px)`;
      case "right": return `translateX(${-distance}px)`;
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {text.split("").map((char, i) => {
        const s = spring({
          frame: frame - i * staggerDelay,
          fps,
          config: { damping: 12, stiffness: 200 },
        });

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              color,
              fontSize,
              fontFamily,
              fontWeight,
              opacity: s,
              transform: getTransform(s),
              textShadow: glowColor
                ? `0 0 20px ${glowColor}, 0 0 40px ${glowColor}66`
                : "none",
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

## Recommended Layer Composition

Every premium video should layer effects in this order (bottom to top):

```tsx
<AbsoluteFill>
  {/* Layer 1: Animated gradient background */}
  <AnimatedGradient palette={palette} />

  {/* Layer 2: Grid pattern for texture */}
  <AnimatedGrid color={`${palette.primary}15`} type="dots" />

  {/* Layer 3: Particle field for depth */}
  <ParticleField color={palette.highlight} secondaryColor={palette.accent} density={300} />

  {/* Layer 4: Light leak for cinematic feel */}
  <LightLeak color={palette.accent} position="top-right" intensity={0.3} />

  {/* Layer 5: Content (text, images, data) */}
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
    <GlassmorphismCard>
      <GlowText text="Your Content" glowColor={palette.primary} />
    </GlassmorphismCard>
  </AbsoluteFill>

  {/* Layer 6: Additional light leak overlay */}
  <LightLeak color={palette.secondary} position="bottom-left" intensity={0.2} />
</AbsoluteFill>
```

## Effect Mapping by Video Type

| Video Type | Background | Text | Extra Effects |
|-----------|-----------|------|--------------|
| Social Media | AnimatedGradient + ParticleField | StaggerText + GlowText | LightLeak, pulse CTA |
| Explainer | AnimatedGradient + AnimatedGrid | GlowText in GlassmorphismCard | NumberCounter, ProgressRing |
| Logo Reveal | AnimatedGradient + ParticleField(500+) | GlowText tagline | LightLeak(sides), AnimatedGrid |
| Data Viz | AnimatedGradient + AnimatedGrid(lines) | GlowText titles | NumberCounter, ProgressRing, bar glow |
