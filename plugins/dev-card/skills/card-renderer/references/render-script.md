# Render Approach

## No Build Step Required

The card-renderer skill generates SVG files directly — Claude writes the SVG content using the Write tool. There is no render script, no npm install, and no Node.js dependency.

## Pipeline

1. Claude reads `git-analysis.json` and `persona.json`
2. Claude selects the theme colors from `style-themes.md`
3. Claude maps language colors from `language-colors.md`
4. Claude builds the SVG string using templates from `card-templates.md`, substituting all placeholder values
5. Claude writes the SVG to `dev-card.svg` (and optionally `dev-card-badge.svg`)

## SVG-to-PNG Conversion (Optional)

If the user needs a PNG file, they can:

1. **Browser method**: Open the SVG in a browser, take a screenshot (exact 1200x675)
2. **macOS built-in**: `sips -s format png dev-card.svg --out dev-card.png`
3. **ImageMagick** (if installed): `convert dev-card.svg dev-card.png`
4. **Online**: Upload SVG to any SVG-to-PNG converter

The SVG is designed at exact pixel dimensions (1200x675 for Twitter, 800x200 for badge) so screenshots will be pixel-perfect.

## Why SVG Instead of PNG

- **Zero dependencies**: No npm install, no Puppeteer, no Chromium download
- **Instant generation**: SVG is just text — Claude writes it directly in seconds
- **Resolution independent**: Looks crisp at any size
- **Editable**: Users can tweak colors/text in any text editor
- **GitHub compatible**: SVGs render natively in GitHub README files
- **Smaller file size**: Typically 5-15KB vs 200KB+ PNG
