---
name: carousel-content
description: This skill should be used when the user asks to "create carousel content", "write carousel slides", "generate Instagram carousel text", or needs help structuring content for a multi-slide carousel post. Triggers on keywords like carousel, slides, Instagram content, swipe post, hook slide, CTA slide.
version: 1.0.0
---

# Carousel Content Generation

Generate structured, high-converting Instagram carousel content from a single topic. Output a `carousel-content.json` file that feeds directly into the carousel-render skill.

## Three-Act Structure

Every carousel follows a proven three-act narrative arc:

1. **Hook** (Slide 1) — Stop the scroll. Bold, provocative, curiosity-driven.
2. **Value** (Slides 2 through N-1) — Deliver on the hook's promise. Each slide is a self-contained unit of value.
3. **CTA** (Final Slide) — Tell the reader exactly what to do next.

## Step 1: Analyze the Topic

When given a topic, determine:

- **Content type**: tips, stats, comparison, quotes, story, or mixed
- **Target audience**: who cares about this topic?
- **Core promise**: what will the reader gain by swiping through all slides?
- **Emotional angle**: curiosity, urgency, aspiration, fear of missing out, contrarian

## Step 2: Craft the Hook Slide

The hook slide is the most important slide. It must stop the scroll in under 1.5 seconds.

**Rules:**
- Maximum 8-10 words
- No filler words (the, a, an, just, really)
- Use power words: secret, proven, mistake, hack, truth, myth, never, always
- Create an information gap — promise value without revealing it

**Hook Formulas** (see `references/hook-patterns.md` for 20+ formulas):

| Formula | Template | Example |
|---------|----------|---------|
| Bold Claim | "X Things That Will Change Y Forever" | "7 AI Tools That Will Replace Your Designer" |
| Question | "Are You Still Doing X Wrong?" | "Are You Still Posting at the Wrong Time?" |
| Contrarian | "Stop Doing X. Here's Why." | "Stop Using Hashtags. Here's Why." |
| Number + Curiosity | "X [Things] I Wish I Knew Sooner" | "10 AI Tools I Wish I Knew Sooner" |

## Step 3: Create Value Slides

Each value slide must be scannable in 3-5 seconds.

**Rules:**
- Maximum 40 words per slide
- One idea per slide — never combine concepts
- Use visual hierarchy: large title, smaller body text
- Include a slide number or progress indicator

**Slide Types** (see `references/slide-structures.md` for JSON schemas):

### Tip Slide
- Number badge (e.g., "01", "02")
- Title: 3-6 words, actionable
- Body: 1-2 sentences explaining the tip
- Optional: illustration prompt

### Stat Slide
- Large number (120px+ when rendered)
- Context label below
- Source attribution (small text)

### Comparison Slide
- Two columns: Before/After or Do/Don't
- Color-coded: green for good, red for bad
- Minimal text per column

### Quote Slide
- Large quotation marks
- Quote text in italic
- Attribution below

### Story Slide
- Sequential narrative
- Chronological markers (Then/Now, Step 1/Step 2)
- Emotional progression

## Step 4: Write the CTA Slide

The final slide converts passive viewers into engaged followers.

**CTA Patterns** (see `references/cta-formulas.md` for 10+ templates):

- **Follow**: "Follow @handle for daily [topic] tips"
- **Save**: "Save this for later" + bookmark icon reference
- **Share**: "Share with someone who needs this"
- **Comment**: "Which one is your favorite? Comment below"
- **Link**: "Link in bio for the full guide"

## Step 5: Generate Illustration Prompts

For each value slide, generate an illustration prompt that:

1. Describes a simple, flat-style illustration
2. Uses a consistent style anchor across all slides
3. Avoids text in the illustration (text is rendered separately in HTML)
4. Specifies a transparent or solid-color background

**Style Anchor System:**

Choose one style anchor for the entire carousel and prepend it to every prompt:

- `"flat vector illustration, minimal, clean lines, pastel colors, no text, "` — for modern/minimal
- `"bold graphic illustration, geometric shapes, vibrant colors, no text, "` — for bold
- `"hand-drawn sketch style, warm tones, loose lines, no text, "` — for playful
- `"elegant line art, gold accents, luxury minimal, no text, "` — for luxury

## Step 6: Output carousel-content.json

Generate a JSON file with this structure:

```json
{
  "topic": "Original topic string",
  "style": "modern",
  "slideCount": 10,
  "format": "portrait",
  "styleAnchor": "flat vector illustration, minimal, clean lines, pastel colors, no text, ",
  "slides": [
    {
      "slideNumber": 1,
      "type": "hook",
      "title": "10 AI Tools I Wish I Knew Sooner",
      "body": "",
      "illustrationPrompt": "flat vector illustration, minimal, clean lines, pastel colors, no text, a glowing lightbulb surrounded by floating app icons"
    },
    {
      "slideNumber": 2,
      "type": "tip",
      "title": "ChatGPT for Research",
      "body": "Skip hours of Googling. Use ChatGPT to summarize papers and extract key insights in seconds.",
      "illustrationPrompt": "flat vector illustration, minimal, clean lines, pastel colors, no text, a robot reading a stack of books with floating highlights"
    }
  ]
}
```

**JSON Rules:**
- `slideNumber`: 1-indexed integer
- `type`: one of `hook`, `tip`, `stat`, `comparison`, `quote`, `story`, `cta`
- `title`: always present, 3-10 words
- `body`: empty string for hook/cta if title is sufficient, max 40 words for value slides
- `illustrationPrompt`: present for all slides except CTA. Starts with the style anchor.

## Content Quality Checklist

Before finalizing the content, verify:

- [ ] Hook creates genuine curiosity gap
- [ ] Each value slide delivers standalone value
- [ ] No slide exceeds 40 words
- [ ] Slide progression feels logical
- [ ] CTA matches the content type
- [ ] Illustration prompts maintain visual consistency
- [ ] No jargon unless audience-appropriate
- [ ] Total slide count matches requested amount

## Tone Adaptation

Match the tone to the content type:

| Content Type | Tone | Language |
|-------------|------|----------|
| Educational | Clear, authoritative | "Here's how...", "The key is..." |
| Motivational | Energetic, empowering | "You can...", "Start today..." |
| Data-driven | Precise, credible | "Research shows...", "X% of..." |
| Storytelling | Conversational, personal | "I used to...", "Then I discovered..." |
| Product | Benefit-focused, concise | "Save X hours...", "No more..." |

## Working with the Render Pipeline

After generating `carousel-content.json`:

1. Save the file to the output directory
2. Hand off to the `carousel-render` skill for HTML/CSS rendering
3. The content file is the single source of truth — edits here regenerate all slides
4. Users can manually edit the JSON to tweak individual slides before rendering
