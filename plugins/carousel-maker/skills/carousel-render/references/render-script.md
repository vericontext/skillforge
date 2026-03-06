# Render Script Reference

Template for the TypeScript render script that Claude generates at runtime.

## Complete Render Script Pattern

Claude should generate a file called `render-carousel.ts` based on this pattern, injecting the actual style preset values and template functions.

```typescript
import nodeHtmlToImage from "node-html-to-image";
import fs from "fs";
import path from "path";

// ============================================================
// Types
// ============================================================

interface SlideData {
  slideNumber: number;
  type: "hook" | "tip" | "stat" | "comparison" | "quote" | "story" | "cta";
  title: string;
  body: string;
  illustrationPrompt: string;
}

interface CarouselContent {
  topic: string;
  style: string;
  slideCount: number;
  format: "portrait" | "square";
  styleAnchor: string;
  slides: SlideData[];
}

interface StyleConfig {
  name: string;
  backgroundColor: string;
  cardColor: string;
  textColor: string;
  accentColor: string;
  mutedColor: string;
  fontPrimary: string;
  fontSecondary: string;
  headerWeight: number;
  bodyWeight: number;
  borderRadius: string;
  decorationStyle: string;
  gradientAngle: number;
  gradientColors: string[];
}

// ============================================================
// Style Preset (injected by Claude based on user selection)
// ============================================================

const style: StyleConfig = {
  // Claude injects the full preset here, e.g.:
  name: "modern",
  backgroundColor: "#0f0f23",
  cardColor: "#1a1a3e",
  textColor: "#ffffff",
  accentColor: "#6366f1",
  mutedColor: "#94a3b8",
  fontPrimary: "Inter",
  fontSecondary: "Inter",
  headerWeight: 800,
  bodyWeight: 400,
  borderRadius: "16px",
  decorationStyle: "geometric",
  gradientAngle: 135,
  gradientColors: ["#6366f1", "#8b5cf6", "#a78bfa"]
};

// ============================================================
// Template Functions (injected from html-templates.md)
// ============================================================

// Claude copies the full template functions here:
// - getFontUrl()
// - getDecorationHtml()
// - wrapSlideHtml()
// - renderHookSlide()
// - renderTipSlide()
// - renderStatSlide()
// - renderComparisonSlide()
// - renderQuoteSlide()
// - renderCtaSlide()
// - renderSlideHtml()

// ============================================================
// Illustration Loading (optional)
// ============================================================

function loadIllustration(slideNumber: number): string | undefined {
  const imgPath = path.join(__dirname, `illustration-${String(slideNumber).padStart(2, "0")}.png`);
  if (fs.existsSync(imgPath)) {
    const base64 = fs.readFileSync(imgPath, "base64");
    return `data:image/png;base64,${base64}`;
  }
  return undefined;
}

// ============================================================
// Preview HTML Generator
// ============================================================

function generatePreviewHtml(slideCount: number, format: "portrait" | "square"): string {
  const width = 1080;
  const height = format === "portrait" ? 1350 : 1080;
  const scale = 0.3;

  const slideImgs = Array.from({ length: slideCount }, (_, i) => {
    const filename = `slide-${String(i + 1).padStart(2, "0")}.png`;
    return `<div style="flex-shrink:0;width:${width * scale}px;height:${height * scale}px;border-radius:8px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
      <img src="./${filename}" style="width:100%;height:100%;object-fit:cover;" />
    </div>`;
  }).join("\n    ");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Carousel Preview</title>
  <style>
    body { margin: 0; padding: 40px; background: #1a1a1a; font-family: -apple-system, sans-serif; }
    h1 { color: #fff; font-size: 24px; margin-bottom: 24px; }
    .carousel-strip {
      display: flex;
      gap: 16px;
      overflow-x: auto;
      padding: 20px 0;
      scrollbar-width: thin;
      scrollbar-color: #555 #1a1a1a;
    }
    .carousel-strip::-webkit-scrollbar { height: 8px; }
    .carousel-strip::-webkit-scrollbar-track { background: #1a1a1a; }
    .carousel-strip::-webkit-scrollbar-thumb { background: #555; border-radius: 4px; }
    .meta { color: #888; font-size: 14px; margin-top: 16px; }
  </style>
</head>
<body>
  <h1>Carousel Preview</h1>
  <div class="carousel-strip">
    ${slideImgs}
  </div>
  <p class="meta">${slideCount} slides &middot; ${width}x${height}px &middot; Swipe or scroll to preview</p>
</body>
</html>`;
}

// ============================================================
// Main
// ============================================================

async function main() {
  const contentPath = path.join(__dirname, "carousel-content.json");
  const content: CarouselContent = JSON.parse(fs.readFileSync(contentPath, "utf-8"));

  const { format = "portrait" } = content;
  const width = 1080;
  const height = format === "portrait" ? 1350 : 1080;

  console.log(`Rendering ${content.slides.length} slides (${width}x${height})...`);

  for (const slide of content.slides) {
    const illustration = loadIllustration(slide.slideNumber);
    const html = renderSlideHtml(slide, style, content.slides.length, illustration);
    const outputFile = path.join(__dirname, `slide-${String(slide.slideNumber).padStart(2, "0")}.png`);

    await nodeHtmlToImage({
      html,
      output: outputFile,
      puppeteerArgs: {
        defaultViewport: { width, height },
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
      }
    });

    console.log(`  ✓ ${path.basename(outputFile)}`);
  }

  // Generate preview
  const previewPath = path.join(__dirname, "preview.html");
  fs.writeFileSync(previewPath, generatePreviewHtml(content.slides.length, format));
  console.log(`  ✓ preview.html`);

  console.log(`\nDone! Open preview.html in your browser to see all slides.`);
}

main().catch(console.error);
```

## Execution

```bash
npx tsx render-carousel.ts
```

## Key Points for Claude

1. **Inject the actual preset** — Don't use placeholder values. Copy the full preset from style-presets.md.
2. **Copy all template functions** — The render script must be self-contained. Copy every function from html-templates.md.
3. **Adapt viewport to format** — Use 1350 for portrait, 1080 for square.
4. **Sequential rendering** — Process one slide at a time to avoid memory issues.
5. **Illustration loading is optional** — The `loadIllustration` function gracefully returns undefined if no file exists.
6. **The script is regenerated each time** — Don't try to make it configurable. Generate a fresh script with the correct values baked in.
