# Text Animation Patterns Reference

## Typewriter Effect

```tsx
const Typewriter: React.FC<{ text: string; startFrame?: number }> = ({
  text,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = frame - startFrame;

  const charsPerFrame = 0.5; // 15 chars per second at 30fps
  const visibleChars = Math.floor(Math.max(0, adjustedFrame * charsPerFrame));
  const displayText = text.slice(0, visibleChars);

  const showCursor = adjustedFrame > 0 && Math.floor(adjustedFrame / 15) % 2 === 0;

  return (
    <span style={{ fontFamily: "monospace", fontSize: 48 }}>
      {displayText}
      {showCursor && <span style={{ opacity: 0.8 }}>|</span>}
    </span>
  );
};
```

## Counting Number Animation

```tsx
const CountUp: React.FC<{
  from: number;
  to: number;
  durationInFrames: number;
  format?: (n: number) => string;
}> = ({ from, to, durationInFrames, format = (n) => Math.round(n).toString() }) => {
  const frame = useCurrentFrame();

  const value = interpolate(frame, [0, durationInFrames], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return <span style={{ fontSize: 72, fontWeight: "bold" }}>{format(value)}</span>;
};

// Usage
<CountUp from={0} to={1000000} durationInFrames={60} format={(n) => `$${Math.round(n).toLocaleString()}`} />
```

## Line-by-Line Reveal

```tsx
const LineReveal: React.FC<{ lines: string[] }> = ({ lines }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {lines.map((line, i) => {
        const s = spring({
          frame: frame - i * 10,
          fps,
          config: { damping: 15, stiffness: 200 },
        });

        return (
          <div
            key={i}
            style={{
              opacity: s,
              transform: `translateY(${(1 - s) * 40}px)`,
              fontSize: 36,
            }}
          >
            {line}
          </div>
        );
      })}
    </div>
  );
};
```

## Gradient Text Animation

```tsx
const GradientText: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();

  const gradientPosition = interpolate(frame, [0, 60], [0, 200], {
    extrapolateRight: "extend",
  });

  return (
    <h1
      style={{
        fontSize: 80,
        fontWeight: "bold",
        backgroundImage: `linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #ff6b6b)`,
        backgroundSize: "200% 100%",
        backgroundPosition: `${gradientPosition}% 0%`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {text}
    </h1>
  );
};
```

## Split Text (Explode/Implode)

```tsx
const ExplodeText: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {text.split("").map((char, i) => {
        const progress = spring({
          frame,
          fps,
          config: { damping: 10, stiffness: 100 },
        });

        const randomX = (random(`x-${i}`) - 0.5) * 500;
        const randomY = (random(`y-${i}`) - 0.5) * 500;
        const randomRotation = (random(`r-${i}`) - 0.5) * 360;

        const x = interpolate(progress, [0, 1], [randomX, 0]);
        const y = interpolate(progress, [0, 1], [randomY, 0]);
        const rotation = interpolate(progress, [0, 1], [randomRotation, 0]);

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              fontSize: 72,
              fontWeight: "bold",
              transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
              opacity: progress,
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

## Highlight / Underline Animation

```tsx
const HighlightText: React.FC<{ text: string; highlightColor?: string }> = ({
  text,
  highlightColor = "#feca57",
}) => {
  const frame = useCurrentFrame();

  const width = interpolate(frame, [10, 30], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <span style={{ position: "relative", display: "inline-block", fontSize: 60 }}>
      <span
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: `${width}%`,
          height: "30%",
          backgroundColor: highlightColor,
          opacity: 0.4,
          zIndex: -1,
        }}
      />
      {text}
    </span>
  );
};
```

## Scramble Text Effect

```tsx
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";

const ScrambleText: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const revealSpeed = 1.5; // frames per character

  return (
    <span style={{ fontFamily: "monospace", fontSize: 48 }}>
      {text.split("").map((char, i) => {
        const charFrame = frame - i * revealSpeed;
        if (charFrame < 0) return <span key={i}>&nbsp;</span>;
        if (charFrame > 8) return <span key={i}>{char}</span>;

        // Show random character during scramble
        const randomIndex = Math.floor(random(`scramble-${i}-${Math.floor(charFrame)}`) * CHARS.length);
        return <span key={i}>{CHARS[randomIndex]}</span>;
      })}
    </span>
  );
};
```
