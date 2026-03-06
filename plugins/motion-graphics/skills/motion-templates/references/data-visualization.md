# Data Visualization Templates

Effect components are in the template project (`${CLAUDE_PLUGIN_ROOT}/skills/remotion-project/references/template-project.md`). Do NOT duplicate them here.

## video.config.ts Pattern for Data Visualization

The config-driven approach handles counter/stats scenes well. For chart visualizations (bar, line, pie), use dedicated chart components from this reference.

### Stats/Counter Pattern (Config-Only)

```ts
import type { VideoConfig } from "./src/lib/config-types";

export const videoConfig: VideoConfig = {
  id: "quarterly-report",
  format: "landscape",
  fps: 30,
  palette: "modern",
  fontFamily: "Inter",
  effects: {
    gradient: { speed: 0.8 },
    grid: { type: "lines", opacity: 0.8 },   // lines grid for data viz
    particles: { density: 100 },               // fewer particles for clarity
    lightLeak: { intensity: 0.2 },
  },
  scenes: [
    {
      title: "Q4 2024 Results",
      durationSeconds: 4,
      textStyle: "stagger",
    },
    {
      title: "Revenue Growth",
      description: "Year-over-year increase across all segments",
      durationSeconds: 8,
      textStyle: "glow",
      stats: [
        { label: "Revenue", value: 12400000, suffix: "$" },
        { label: "Growth", value: 34, suffix: "%" },
        { label: "New Customers", value: 2800, suffix: "+" },
      ],
    },
    {
      title: "Team Performance",
      durationSeconds: 7,
      stats: [
        { label: "Projects", value: 156 },
        { label: "On-time", value: 94, suffix: "%" },
        { label: "Satisfaction", value: 4.8, suffix: "/5" },
      ],
    },
  ],
  cta: {
    text: "Full Report Available",
    buttonText: "View Details",
    durationSeconds: 5,
  },
};
```

### Chart Components (Custom Compositions)

For bar/line/pie charts, create a custom composition alongside SceneRenderer. The chart components use the same palette system:

```tsx
// src/compositions/BarChart.tsx
import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedGradient, AnimatedGrid, GlowText, PALETTES } from "../components/effects";
import type { PaletteName } from "../components/effects/palettes";

type BarChartProps = {
  title: string;
  data: Array<{ label: string; value: number }>;
  paletteName: PaletteName;
};

export const BarChart: React.FC<BarChartProps> = ({ title, data, paletteName }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const palette = PALETTES[paletteName];
  const maxValue = Math.max(...data.map((d) => d.value));
  const chartColors = [palette.primary, palette.highlight, palette.accent, palette.secondary];

  return (
    <AbsoluteFill>
      <AnimatedGradient palette={palette} />
      <AnimatedGrid color={`${palette.primary}08`} type="lines" />

      <AbsoluteFill style={{ padding: "80px 120px", justifyContent: "center" }}>
        <div style={{ marginBottom: 60 }}>
          <GlowText text={title} glowColor={palette.primary} />
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 24, height: 400 }}>
          {data.map((item, i) => {
            const barSpring = spring({ frame: frame - 10 - i * 8, fps, config: { damping: 12, stiffness: 150 } });
            const barHeight = (item.value / maxValue) * 350 * barSpring;
            const color = chartColors[i % chartColors.length];

            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                <div style={{ marginBottom: 8, opacity: barSpring, color, fontSize: 22, fontWeight: 700, fontVariantNumeric: "tabular-nums", textShadow: `0 0 10px ${color}66` }}>
                  {Math.round(item.value * barSpring).toLocaleString()}
                </div>
                <div style={{ width: "100%", height: barHeight, background: `linear-gradient(180deg, ${color} 0%, ${color}88 100%)`, borderRadius: "8px 8px 0 0", minHeight: 4, boxShadow: `0 0 15px ${color}44` }} />
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, marginTop: 12, opacity: barSpring }}>{item.label}</span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
```

Register in Root.tsx alongside the main composition:

```tsx
<Composition
  id="BarChart"
  component={BarChart}
  width={1920} height={1080} fps={30}
  durationInFrames={300}
  defaultProps={{
    title: "Revenue by Quarter",
    data: [
      { label: "Q1", value: 120 },
      { label: "Q2", value: 180 },
      { label: "Q3", value: 250 },
      { label: "Q4", value: 340 },
    ],
    paletteName: "modern",
  }}
/>
```

## Data Viz Design Tips

- Use `grid.type: "lines"` for data-heavy scenes (cleaner look)
- Lower particle density (100-150) keeps focus on the data
- Use stats for 2-4 key numbers; use chart components for 5+ data points
- NumberCounter handles formatting (toLocaleString for thousands separators)
- The `suffix` field supports: %, $, x, +, /5, h, and any string
