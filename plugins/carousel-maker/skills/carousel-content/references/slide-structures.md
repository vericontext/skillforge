# Slide Structures Reference

JSON schema and typography guidelines for each slide type.

## Common Fields

All slides share these fields:

```typescript
interface SlideData {
  slideNumber: number;    // 1-indexed
  type: "hook" | "tip" | "stat" | "comparison" | "quote" | "story" | "cta";
  title: string;          // 3-10 words
  body: string;           // max 40 words (empty for hook/cta if title suffices)
  illustrationPrompt: string; // starts with style anchor (empty for cta)
}
```

## Hook Slide

```json
{
  "slideNumber": 1,
  "type": "hook",
  "title": "10 AI Tools I Wish I Knew Sooner",
  "body": "",
  "illustrationPrompt": "style anchor + visual metaphor for the topic"
}
```

**Typography:**
- Title: 72-96px, bold (800-900 weight)
- Body: not used (or 24px subtitle if needed)
- Alignment: center, vertically centered
- Background: gradient or pattern from style preset

**Word Count:** Title only, 8-10 words max

## Tip Slide

```json
{
  "slideNumber": 2,
  "type": "tip",
  "title": "Use Claude for Writing",
  "body": "Claude excels at long-form content. Feed it your outline and watch it generate polished drafts in seconds.",
  "illustrationPrompt": "style anchor + robot typing on a laptop with floating documents"
}
```

**Typography:**
- Number badge: 48-64px, accent color, bold
- Title: 36-48px, bold (700 weight)
- Body: 22-28px, regular (400 weight)
- Layout: number top-left → title → illustration area → body bottom

**Word Count:** Title 3-6 words, body 15-30 words

## Stat Slide

```json
{
  "slideNumber": 5,
  "type": "stat",
  "title": "73%",
  "body": "of marketers say AI tools improved their content ROI in 2025",
  "illustrationPrompt": "style anchor + upward trending chart with glowing data points"
}
```

**Typography:**
- Title (number): 120-160px, bold, accent color
- Body (context): 24-32px, regular
- Source: 14-16px, muted color, bottom
- Layout: number centered, context below

**Word Count:** Title is a number/stat, body 10-20 words

## Comparison Slide

```json
{
  "slideNumber": 4,
  "type": "comparison",
  "title": "Beginner vs Pro",
  "body": "Posts randomly without strategy | Plans content calendar weekly with analytics",
  "illustrationPrompt": "style anchor + split screen showing messy desk vs organized workspace"
}
```

**Typography:**
- Title: 36-48px, centered, bold
- Left column header: 28px, red/negative color
- Right column header: 28px, green/positive color
- Column text: 22-26px, regular
- Divider: vertical line or vs badge

**Body format:** Left text `|` Right text (pipe-separated)

**Word Count:** Title 2-4 words, each column 10-20 words

## Quote Slide

```json
{
  "slideNumber": 6,
  "type": "quote",
  "title": "Steve Jobs",
  "body": "Design is not just what it looks like and feels like. Design is how it works.",
  "illustrationPrompt": "style anchor + minimal portrait silhouette with speech bubble"
}
```

**Typography:**
- Opening quote mark: 120px, accent color, decorative
- Body (quote): 32-40px, italic
- Title (attribution): 22-28px, regular, preceded by em-dash
- Layout: large quote mark → quote text → attribution bottom

**Word Count:** Body is the quote, 10-30 words

## Story Slide

```json
{
  "slideNumber": 3,
  "type": "story",
  "title": "The Turning Point",
  "body": "After 6 months of posting daily with zero growth, I changed one thing: I started creating carousels instead of single images.",
  "illustrationPrompt": "style anchor + winding road with a person at a crossroads"
}
```

**Typography:**
- Title: 36-48px, bold
- Body: 24-30px, regular, left-aligned
- Timeline marker: optional, accent color
- Layout: title top → body center-left

**Word Count:** Title 2-5 words, body 20-40 words

## CTA Slide

```json
{
  "slideNumber": 10,
  "type": "cta",
  "title": "Found This Helpful?",
  "body": "Follow @handle for daily AI tips and tools",
  "illustrationPrompt": ""
}
```

**Typography:**
- Title: 48-64px, bold, centered
- Body: 28-36px, regular
- Button/badge: accent color background, white text, rounded
- Handle: accent color, bold
- Layout: centered vertically, button-style CTA

**Word Count:** Title 2-5 words, body 5-15 words

## Slide Count Guidelines

| Total Slides | Hook | Value Slides | CTA |
|-------------|------|-------------|-----|
| 5 | 1 | 3 | 1 |
| 8 | 1 | 6 | 1 |
| 10 | 1 | 8 | 1 |
| 15 | 1 | 13 | 1 |
| 20 | 1 | 18 | 1 |

## Typography Size Scale (px)

| Element | Min | Default | Max |
|---------|-----|---------|-----|
| Hook title | 72 | 84 | 96 |
| Stat number | 120 | 140 | 160 |
| Section title | 36 | 42 | 48 |
| Body text | 22 | 26 | 32 |
| Caption/source | 14 | 16 | 18 |
| Number badge | 48 | 56 | 64 |

All sizes assume 1080px width canvas. Scale proportionally for other sizes.
