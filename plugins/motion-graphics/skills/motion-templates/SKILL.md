---
name: motion-templates
description: This skill should be used when the user asks to "create a social media video", "make an Instagram reel", "create a TikTok video", "make a YouTube Short", "create an explainer video", "make a logo animation", "create a logo reveal", "animate a chart", "create data visualization video", or discusses video templates, social media content, short-form video, or ready-to-use video compositions.
version: 1.0.0
---

# Motion Templates - Premium Video Compositions

This skill provides complete, production-ready templates for common motion graphics use cases. Each template includes full component code, animation patterns, and configuration options.

**IMPORTANT: All templates use premium visual effects by default.** Every video should include AnimatedGradient backgrounds, ParticleField layers, GlowText for titles, and cinematic LightLeak overlays. Never use solid color backgrounds or plain text. Refer to `${CLAUDE_PLUGIN_ROOT}/skills/remotion-animation/references/visual-effects.md` for the effect components and the recommended layer composition pattern.

## Template Categories

| Template | Aspect Ratio | Duration | Use Case |
|----------|-------------|----------|----------|
| Social Media | 9:16 | 15-60s | Instagram Reels, TikTok, YouTube Shorts |
| Explainer Video | 16:9 | 30-120s | Product demos, tutorials, presentations |
| Logo Reveal | 16:9 or 1:1 | 3-8s | Brand intros, video openers |
| Data Visualization | 16:9 | 10-30s | Animated charts, statistics, infographics |

## Social Media Templates

### Instagram Reel / TikTok / YouTube Shorts

Configuration: 1080x1920, 30fps, 15-60 seconds

```tsx
import { Composition } from "remotion";

<Composition
  id="SocialReel"
  component={SocialReelComp}
  width={1080}
  height={1920}
  fps={30}
  durationInFrames={900}  // 30 seconds
  schema={socialReelSchema}
  defaultProps={{
    slides: [
      { text: "Did you know?", image: "images/slide-1.png" },
      { text: "Here's the answer", image: "images/slide-2.png" },
      { text: "Follow for more!", image: "images/slide-3.png" },
    ],
    accentColor: "#ff6b6b",
    fontFamily: "Inter",
  }}
/>
```

The social media template features:
- Vertical 9:16 layout optimized for mobile
- Swipe-like slide transitions
- Large, readable text with safe zone margins
- Call-to-action slide with animated button
- Background music support with auto-fade

See `${CLAUDE_PLUGIN_ROOT}/skills/motion-templates/references/social-media.md` for the complete component code and variants (carousel, text-only, image-first).

### Key Design Rules for Social Media

1. Keep text within the center 80% (safe zone for UI overlays)
2. First 3 seconds must hook the viewer - use bold text or motion
3. Use at least 48px font size for readability on mobile
4. Limit to 3-5 slides for 15-second content
5. End with a clear call-to-action

## Explainer Video Template

Configuration: 1920x1080, 30fps, 30-120 seconds

The explainer template structures content as scene-based storytelling with AI-generated images:

```tsx
<Composition
  id="ExplainerVideo"
  component={ExplainerComp}
  width={1920}
  height={1080}
  fps={30}
  durationInFrames={1800}  // 60 seconds
  schema={explainerSchema}
  defaultProps={{
    scenes: [
      {
        title: "The Problem",
        description: "Teams waste 5 hours/week on manual reporting",
        image: "images/scene-problem.png",
        durationSeconds: 8,
      },
      {
        title: "The Solution",
        description: "Automated dashboards that update in real-time",
        image: "images/scene-solution.png",
        durationSeconds: 10,
      },
      {
        title: "How It Works",
        description: "Connect your data, choose a template, share",
        image: "images/scene-how.png",
        durationSeconds: 12,
      },
      {
        title: "Get Started",
        description: "Free trial - no credit card required",
        image: "images/scene-cta.png",
        durationSeconds: 6,
      },
    ],
    brandColor: "#4A90D9",
    narrationAudio: "audio/narration.mp3",
  }}
/>
```

Each scene includes:
- AI-generated background image (via Gemini)
- Animated title with spring entrance
- Description text with staggered reveal
- Ken Burns effect on background image
- Smooth transitions between scenes

See `${CLAUDE_PLUGIN_ROOT}/skills/motion-templates/references/explainer-video.md` for the full implementation.

### Explainer Video Workflow

1. Write scene scripts (title + description for each scene)
2. Generate images with Gemini using consistent style anchor
3. Record or generate narration audio
4. Configure the composition with scene data
5. Preview in Remotion Studio, adjust timing
6. Render final video

## Logo Reveal Template

Configuration: 1920x1080 (or 1080x1080 for square), 30fps, 3-8 seconds

```tsx
<Composition
  id="LogoReveal"
  component={LogoRevealComp}
  width={1920}
  height={1080}
  fps={30}
  durationInFrames={180}  // 6 seconds
  schema={logoRevealSchema}
  defaultProps={{
    logoSrc: "images/logo.png",
    tagline: "Innovation Redefined",
    style: "particle",  // "particle" | "scale" | "draw" | "glitch"
    backgroundColor: "#0a0a0a",
    accentColor: "#00d4ff",
  }}
/>
```

Available reveal styles:
- **Particle** - Logo assembles from scattered particles
- **Scale** - Logo scales up with elastic spring from center
- **Draw** - Logo traces its outline before filling
- **Glitch** - Digital glitch effect resolving into logo

See `${CLAUDE_PLUGIN_ROOT}/skills/motion-templates/references/logo-reveal.md` for all style implementations.

## Data Visualization Template

Configuration: 1920x1080, 30fps, 10-30 seconds

```tsx
<Composition
  id="AnimatedChart"
  component={AnimatedChartComp}
  width={1920}
  height={1080}
  fps={30}
  durationInFrames={450}  // 15 seconds
  schema={chartSchema}
  defaultProps={{
    chartType: "bar",  // "bar" | "line" | "pie" | "counter"
    title: "Revenue Growth 2024",
    data: [
      { label: "Q1", value: 120, color: "#4A90D9" },
      { label: "Q2", value: 180, color: "#7ED321" },
      { label: "Q3", value: 250, color: "#F5A623" },
      { label: "Q4", value: 340, color: "#D0021B" },
    ],
    showLabels: true,
    animationStyle: "spring",
  }}
/>
```

Chart types:
- **Bar chart** - Bars grow from bottom with staggered spring animation
- **Line chart** - Line draws progressively with dot reveals
- **Pie chart** - Segments animate in sequence with rotation
- **Counter** - Large number counts up with easing

See `${CLAUDE_PLUGIN_ROOT}/skills/motion-templates/references/data-visualization.md` for chart component implementations.

## Automation Pipeline Templates

For automated, repeatable use cases, prefer the pipeline command over manual template selection:

| Pipeline | Command | Input | Output |
|----------|---------|-------|--------|
| Promo Video | `/promo-video` | Logo image | MP4 branded promo |

The promo video pipeline analyzes a logo with Gemini Vision, generates a custom brand palette and background images, then renders a complete promotional video automatically. See:
- `${CLAUDE_PLUGIN_ROOT}/skills/motion-templates/references/promo-video.md` for promo video config patterns and variations

## Using Templates (Manual Mode)

### Quick Start

1. Choose a template that matches your use case
2. Copy the composition registration to your `Root.tsx`
3. Copy the component code from the references
4. Customize props (colors, text, images, timing)
5. Preview with `npx remotion studio`
6. Render with `npx remotion render`

### Customization Tips

- Use a full 5-color palette (Modern/Sunset/Ocean/Neon/Forest) instead of a single accent color
- Adjust `durationInFrames` for longer/shorter videos
- Replace default images with Gemini-generated ones using the gemini-media skill
- Add background audio by including an `<Audio>` component
- Modify animation configs (spring damping, easing) for different feel
- Always layer: AnimatedGradient > AnimatedGrid > ParticleField > LightLeak > Content
- Use GlowText for titles, GlassmorphismCard for text blocks, StaggerText for entrances

### Combining Templates

Mix template components for complex videos:

```tsx
<Series>
  <Series.Sequence durationInFrames={180}>
    <LogoRevealComp {...logoProps} />
  </Series.Sequence>
  <Series.Sequence durationInFrames={1800}>
    <ExplainerComp {...explainerProps} />
  </Series.Sequence>
  <Series.Sequence durationInFrames={150}>
    <SocialCTAComp {...ctaProps} />
  </Series.Sequence>
</Series>
```
