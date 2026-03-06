# HTML Templates Reference

TypeScript functions that generate complete HTML strings for each slide type. All functions return a self-contained HTML document with inline styles.

## Common HTML Wrapper

Every slide HTML starts with this wrapper:

```typescript
function wrapSlideHtml(innerContent: string, style: StyleConfig, slideNumber: number, totalSlides: number): string {
  const fontUrl = getFontUrl(style);
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="${fontUrl}" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1080px;
      height: 1350px;
      background-color: ${style.backgroundColor};
      font-family: '${style.fontPrimary}', sans-serif;
      color: ${style.textColor};
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      overflow: hidden;
    }
    .safe-zone {
      position: absolute;
      top: 67.5px;
      left: 108px;
      width: 864px;
      height: 1215px;
      display: flex;
      flex-direction: column;
    }
    .slide-indicator {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: ${style.mutedColor};
      opacity: 0.5;
    }
    .dot.active {
      background: ${style.accentColor};
      opacity: 1;
    }
  </style>
</head>
<body>
  ${getDecorationHtml(style)}
  <div class="safe-zone">
    ${innerContent}
  </div>
  <div class="slide-indicator">
    ${Array.from({ length: totalSlides }, (_, i) =>
      `<div class="dot${i === slideNumber - 1 ? ' active' : ''}"></div>`
    ).join('')}
  </div>
</body>
</html>`;
}
```

## Decoration HTML Generator

```typescript
function getDecorationHtml(style: StyleConfig): string {
  switch (style.decorationStyle) {
    case "geometric":
      return `
        <div style="position:absolute;top:80px;right:60px;width:200px;height:200px;border-radius:50%;background:${style.accentColor};opacity:0.08;"></div>
        <div style="position:absolute;bottom:200px;left:40px;width:120px;height:120px;border-radius:50%;background:${style.accentColor};opacity:0.06;"></div>
        <div style="position:absolute;top:400px;right:100px;width:80px;height:80px;transform:rotate(45deg);background:${style.accentColor};opacity:0.05;"></div>
      `;
    case "angular":
      return `
        <div style="position:absolute;top:0;right:0;width:0;height:0;border-left:300px solid transparent;border-top:300px solid ${style.accentColor};opacity:0.08;"></div>
        <div style="position:absolute;bottom:0;left:0;width:0;height:0;border-right:200px solid transparent;border-bottom:200px solid ${style.accentColor};opacity:0.06;"></div>
      `;
    case "blobs":
      return `
        <div style="position:absolute;top:60px;left:-40px;width:250px;height:250px;border-radius:62% 38% 46% 54% / 60% 44% 56% 40%;background:${style.accentColor};opacity:0.1;"></div>
        <div style="position:absolute;bottom:100px;right:-30px;width:180px;height:180px;border-radius:44% 56% 38% 62% / 50% 62% 38% 50%;background:${style.accentColor};opacity:0.08;"></div>
      `;
    case "thin-borders":
      return `
        <div style="position:absolute;top:30px;left:30px;right:30px;bottom:30px;border:1px solid ${style.accentColor};opacity:0.3;pointer-events:none;"></div>
        <div style="position:absolute;top:40px;left:40px;right:40px;bottom:40px;border:1px solid ${style.accentColor};opacity:0.15;pointer-events:none;"></div>
      `;
    case "none":
    default:
      return "";
  }
}
```

## Hook Slide

```typescript
function renderHookSlide(slide: SlideData, style: StyleConfig, totalSlides: number, illustration?: string): string {
  const bgGradient = `linear-gradient(${style.gradientAngle}deg, ${style.gradientColors.map((c, i) => `${c} ${i * 50}%`).join(', ')})`;

  const illustrationHtml = illustration
    ? `<img src="${illustration}" style="position:absolute;top:10%;left:50%;transform:translateX(-50%);width:70%;max-height:50%;object-fit:contain;opacity:0.3;" />`
    : "";

  const inner = `
    ${illustrationHtml}
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;position:relative;z-index:1;">
      <h1 style="font-family:'${style.fontPrimary}',sans-serif;font-size:84px;font-weight:${style.headerWeight};line-height:1.1;color:${style.textColor};max-width:100%;word-wrap:break-word;">
        ${slide.title}
      </h1>
      ${slide.body ? `<p style="font-size:28px;font-weight:${style.bodyWeight};color:${style.mutedColor};margin-top:24px;max-width:90%;">${slide.body}</p>` : ""}
    </div>
  `;

  // Hook slide uses gradient background overlay
  const gradientOverlay = `<div style="position:absolute;top:0;left:0;width:100%;height:100%;background:${bgGradient};opacity:0.15;"></div>`;

  return wrapSlideHtml(gradientOverlay + inner, style, slide.slideNumber, totalSlides);
}
```

## Tip Slide

```typescript
function renderTipSlide(slide: SlideData, style: StyleConfig, totalSlides: number, illustration?: string): string {
  const num = String(slide.slideNumber - 1).padStart(2, "0"); // Tip number (exclude hook)

  const illustrationHtml = illustration
    ? `<div style="flex:1;display:flex;justify-content:center;align-items:center;margin:20px 0;">
        <img src="${illustration}" style="max-width:80%;max-height:100%;object-fit:contain;" />
       </div>`
    : `<div style="flex:1;"></div>`;

  const inner = `
    <div style="padding-top:40px;">
      <div style="display:inline-block;background:${style.accentColor};color:#fff;font-family:'${style.fontPrimary}',sans-serif;font-size:48px;font-weight:${style.headerWeight};padding:12px 28px;border-radius:${style.borderRadius};margin-bottom:24px;">
        ${num}
      </div>
      <h2 style="font-family:'${style.fontPrimary}',sans-serif;font-size:44px;font-weight:${style.headerWeight};line-height:1.2;margin-top:16px;">
        ${slide.title}
      </h2>
    </div>
    ${illustrationHtml}
    <div style="padding-bottom:40px;">
      <p style="font-family:'${style.fontSecondary}',sans-serif;font-size:26px;font-weight:${style.bodyWeight};line-height:1.6;color:${style.mutedColor};">
        ${slide.body}
      </p>
    </div>
  `;

  return wrapSlideHtml(inner, style, slide.slideNumber, totalSlides);
}
```

## Stat Slide

```typescript
function renderStatSlide(slide: SlideData, style: StyleConfig, totalSlides: number, illustration?: string): string {
  const illustrationHtml = illustration
    ? `<img src="${illustration}" style="position:absolute;top:15%;left:50%;transform:translateX(-50%);width:60%;max-height:40%;object-fit:contain;opacity:0.25;" />`
    : "";

  const inner = `
    ${illustrationHtml}
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;position:relative;z-index:1;">
      <div style="font-family:'${style.fontPrimary}',sans-serif;font-size:140px;font-weight:${style.headerWeight};color:${style.accentColor};line-height:1;">
        ${slide.title}
      </div>
      <p style="font-family:'${style.fontSecondary}',sans-serif;font-size:28px;font-weight:${style.bodyWeight};color:${style.mutedColor};margin-top:24px;max-width:80%;line-height:1.5;">
        ${slide.body}
      </p>
    </div>
  `;

  return wrapSlideHtml(inner, style, slide.slideNumber, totalSlides);
}
```

## Comparison Slide

```typescript
function renderComparisonSlide(slide: SlideData, style: StyleConfig, totalSlides: number, illustration?: string): string {
  const [leftText, rightText] = slide.body.split("|").map(s => s.trim());

  const inner = `
    <div style="text-align:center;padding-top:60px;">
      <h2 style="font-family:'${style.fontPrimary}',sans-serif;font-size:44px;font-weight:${style.headerWeight};">
        ${slide.title}
      </h2>
    </div>
    ${illustration ? `<div style="display:flex;justify-content:center;margin:30px 0;"><img src="${illustration}" style="max-width:70%;max-height:200px;object-fit:contain;" /></div>` : '<div style="height:40px;"></div>'}
    <div style="flex:1;display:flex;gap:24px;padding:20px 0;">
      <div style="flex:1;background:rgba(239,68,68,0.1);border-radius:${style.borderRadius};padding:32px;border-left:4px solid #ef4444;">
        <div style="font-family:'${style.fontPrimary}',sans-serif;font-size:22px;font-weight:700;color:#ef4444;margin-bottom:16px;text-transform:uppercase;letter-spacing:1px;">Don't</div>
        <p style="font-family:'${style.fontSecondary}',sans-serif;font-size:24px;font-weight:${style.bodyWeight};line-height:1.6;color:${style.textColor};">
          ${leftText}
        </p>
      </div>
      <div style="flex:1;background:rgba(34,197,94,0.1);border-radius:${style.borderRadius};padding:32px;border-left:4px solid #22c55e;">
        <div style="font-family:'${style.fontPrimary}',sans-serif;font-size:22px;font-weight:700;color:#22c55e;margin-bottom:16px;text-transform:uppercase;letter-spacing:1px;">Do</div>
        <p style="font-family:'${style.fontSecondary}',sans-serif;font-size:24px;font-weight:${style.bodyWeight};line-height:1.6;color:${style.textColor};">
          ${rightText}
        </p>
      </div>
    </div>
  `;

  return wrapSlideHtml(inner, style, slide.slideNumber, totalSlides);
}
```

## Quote Slide

```typescript
function renderQuoteSlide(slide: SlideData, style: StyleConfig, totalSlides: number, illustration?: string): string {
  const illustrationHtml = illustration
    ? `<img src="${illustration}" style="position:absolute;bottom:20%;right:5%;width:30%;max-height:30%;object-fit:contain;opacity:0.2;" />`
    : "";

  const inner = `
    ${illustrationHtml}
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;position:relative;z-index:1;">
      <div style="font-family:Georgia,serif;font-size:120px;color:${style.accentColor};line-height:0.8;opacity:0.6;margin-bottom:8px;">&ldquo;</div>
      <blockquote style="font-family:'${style.fontPrimary}',sans-serif;font-size:36px;font-weight:500;font-style:italic;line-height:1.5;color:${style.textColor};padding:0 20px;">
        ${slide.body}
      </blockquote>
      <div style="margin-top:32px;padding-left:20px;">
        <span style="font-family:'${style.fontSecondary}',sans-serif;font-size:24px;color:${style.mutedColor};">&mdash; ${slide.title}</span>
      </div>
    </div>
  `;

  return wrapSlideHtml(inner, style, slide.slideNumber, totalSlides);
}
```

## CTA Slide

```typescript
function renderCtaSlide(slide: SlideData, style: StyleConfig, totalSlides: number): string {
  const inner = `
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;">
      <h2 style="font-family:'${style.fontPrimary}',sans-serif;font-size:56px;font-weight:${style.headerWeight};line-height:1.2;margin-bottom:40px;">
        ${slide.title}
      </h2>
      <div style="background:${style.accentColor};color:#ffffff;font-family:'${style.fontPrimary}',sans-serif;font-size:28px;font-weight:700;padding:20px 48px;border-radius:60px;display:inline-block;">
        ${slide.body}
      </div>
    </div>
  `;

  return wrapSlideHtml(inner, style, slide.slideNumber, totalSlides);
}
```

## Slide Router

```typescript
function renderSlideHtml(slide: SlideData, style: StyleConfig, totalSlides: number, illustration?: string): string {
  switch (slide.type) {
    case "hook":
      return renderHookSlide(slide, style, totalSlides, illustration);
    case "tip":
      return renderTipSlide(slide, style, totalSlides, illustration);
    case "stat":
      return renderStatSlide(slide, style, totalSlides, illustration);
    case "comparison":
      return renderComparisonSlide(slide, style, totalSlides, illustration);
    case "quote":
      return renderQuoteSlide(slide, style, totalSlides, illustration);
    case "cta":
      return renderCtaSlide(slide, style, totalSlides);
    default:
      return renderTipSlide(slide, style, totalSlides, illustration);
  }
}
```

## Google Fonts URL Helper

```typescript
function getFontUrl(style: StyleConfig): string {
  const fonts = new Set([style.fontPrimary, style.fontSecondary]);
  const weights = [style.bodyWeight, 500, 600, style.headerWeight].filter(Boolean);
  const families = [...fonts].map(f => `family=${f.replace(/ /g, "+")}:wght@${weights.join(";")}`);
  return `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap`;
}
```
