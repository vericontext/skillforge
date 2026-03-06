# Preview Template Reference

HTML template for the carousel preview page. Shows all slides in a horizontal strip with Instagram-style swipe simulation.

## Preview HTML

The render script generates this HTML automatically. This reference documents the structure for customization.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Carousel Preview</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background: #1a1a1a;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      padding: 40px;
      color: #fff;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 32px;
    }

    .header h1 {
      font-size: 24px;
      font-weight: 600;
    }

    .header .info {
      font-size: 14px;
      color: #888;
    }

    /* Horizontal scroll strip */
    .carousel-strip {
      display: flex;
      gap: 16px;
      overflow-x: auto;
      padding: 20px 0;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
    }

    .carousel-strip::-webkit-scrollbar {
      height: 8px;
    }

    .carousel-strip::-webkit-scrollbar-track {
      background: #2a2a2a;
      border-radius: 4px;
    }

    .carousel-strip::-webkit-scrollbar-thumb {
      background: #555;
      border-radius: 4px;
    }

    .slide-frame {
      flex-shrink: 0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
      scroll-snap-align: start;
      position: relative;
    }

    .slide-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .slide-label {
      position: absolute;
      bottom: 8px;
      right: 8px;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      font-size: 11px;
      padding: 4px 8px;
      border-radius: 4px;
    }

    /* Phone mockup view */
    .phone-view {
      margin-top: 48px;
    }

    .phone-frame {
      width: 375px;
      height: 500px;
      margin: 0 auto;
      border: 3px solid #333;
      border-radius: 32px;
      overflow: hidden;
      position: relative;
    }

    .phone-frame .carousel-phone {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      height: 100%;
    }

    .phone-frame .carousel-phone img {
      flex-shrink: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      scroll-snap-align: start;
    }

    .instructions {
      text-align: center;
      color: #666;
      font-size: 13px;
      margin-top: 16px;
    }

    /* Controls */
    .controls {
      margin-top: 32px;
      display: flex;
      gap: 12px;
      justify-content: center;
    }

    .controls button {
      background: #333;
      color: #fff;
      border: none;
      padding: 8px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
    }

    .controls button:hover {
      background: #444;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Carousel Preview</h1>
    <div class="info">
      <!-- Injected: slide count, dimensions, style name -->
      10 slides &middot; 1080x1350 &middot; modern
    </div>
  </div>

  <!-- Filmstrip view (all slides visible) -->
  <div class="carousel-strip">
    <!-- Injected: one .slide-frame per slide -->
    <!--
    <div class="slide-frame" style="width:324px;height:405px;">
      <img src="./slide-01.png" alt="Slide 1" />
      <div class="slide-label">1 / 10</div>
    </div>
    -->
  </div>

  <!-- Phone mockup (swipe simulation) -->
  <div class="phone-view">
    <h2 style="text-align:center;font-size:18px;margin-bottom:16px;color:#aaa;">Instagram Preview</h2>
    <div class="phone-frame">
      <div class="carousel-phone">
        <!-- Injected: one img per slide -->
        <!--
        <img src="./slide-01.png" alt="Slide 1" />
        -->
      </div>
    </div>
    <p class="instructions">Swipe left/right in the phone frame to preview</p>
  </div>

  <div class="controls">
    <button onclick="document.querySelector('.carousel-strip').scrollTo({left:0,behavior:'smooth'})">First</button>
    <button onclick="document.querySelector('.carousel-strip').scrollBy({left:-340,behavior:'smooth'})">Prev</button>
    <button onclick="document.querySelector('.carousel-strip').scrollBy({left:340,behavior:'smooth'})">Next</button>
    <button onclick="document.querySelector('.carousel-strip').scrollTo({left:99999,behavior:'smooth'})">Last</button>
  </div>
</body>
</html>
```

## Scale Calculation

The filmstrip view scales slides to fit comfortably in the browser:

| Format | Original | Scale | Preview Size |
|--------|----------|-------|-------------|
| Portrait | 1080x1350 | 0.3 | 324x405 |
| Square | 1080x1080 | 0.3 | 324x324 |

## Phone Frame

The phone mockup uses a fixed 375x500px frame that matches Instagram's mobile viewport proportions. Slides are displayed at full width within the frame, and users can swipe horizontally.
