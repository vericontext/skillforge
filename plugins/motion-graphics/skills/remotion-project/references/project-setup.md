# Remotion Project Setup Reference

## Manual Project Setup (Recommended)

**`npx create-video@latest` is interactive and cannot be automated.** Always set up projects manually:

```bash
mkdir my-video && cd my-video
npm init -y
npm install remotion @remotion/cli @remotion/bundler @remotion/renderer react react-dom zod
npm install -D typescript @types/react
```

Then create each required file manually (see below).

## Full Project Structure

```
my-video/
├── src/
│   ├── Root.tsx              # Registers all compositions
│   ├── index.ts              # Entry point for Remotion
│   ├── compositions/
│   │   ├── Scene1.tsx        # Individual scene component
│   │   ├── Scene2.tsx
│   │   └── schema.ts         # Zod schemas for all compositions
│   ├── components/           # Reusable UI components
│   │   ├── AnimatedText.tsx
│   │   └── Background.tsx
│   ├── lib/                  # Utility functions
│   │   └── utils.ts
│   └── data/                 # Input data (JSON, etc.)
│       └── content.json
├── public/                   # Static assets
│   ├── images/
│   ├── fonts/
│   └── audio/
├── remotion.config.ts        # Remotion config
├── tsconfig.json
├── package.json
└── postcss.config.js         # If using TailwindCSS
```

## remotion.config.ts

```ts
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
```

Available configuration:
- `setVideoImageFormat("jpeg" | "png")` - Frame format during rendering
- `setOverwriteOutput(true)` - Overwrite existing output files
- `setConcurrency(4)` - Parallel rendering threads
- `setChromiumOpenGlRenderer("angle")` - GPU rendering mode

## tsconfig.json Essentials

```json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "commonjs",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

## package.json Scripts

```json
{
  "scripts": {
    "studio": "remotion studio",
    "render": "remotion render src/index.ts",
    "build": "remotion render src/index.ts MyComp out/video.mp4",
    "upgrade": "remotion upgrade"
  }
}
```

## Key Dependencies

```json
{
  "dependencies": {
    "remotion": "^4.0.0",
    "@remotion/cli": "^4.0.0",
    "@remotion/bundler": "^4.0.0",
    "@remotion/renderer": "^4.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/react": "^18.0.0"
  }
}
```

## Optional Packages

| Package | Purpose |
|---------|---------|
| `@remotion/player` | Embed video player in React apps |
| `@remotion/lambda` | Serverless rendering on AWS Lambda |
| `@remotion/gif` | GIF support as video source |
| `@remotion/lottie` | Lottie animation support |
| `@remotion/three` | Three.js 3D integration |
| `@remotion/noise` | Perlin noise for organic effects |
| `@remotion/motion-blur` | Motion blur effect |
| `@remotion/transitions` | Built-in transition effects |

## Folder Component for Organization

```tsx
import { Composition, Folder } from "remotion";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Scenes">
        <Composition id="Scene1" ... />
        <Composition id="Scene2" ... />
      </Folder>
      <Folder name="Templates">
        <Composition id="SocialPost" ... />
      </Folder>
    </>
  );
};
```

## Environment Variables

Access environment variables in Remotion using `getRemotionEnvironment()` or standard `process.env` during rendering:

```tsx
// In component (client-side) - use staticFile or props
// In render script (server-side) - use process.env

const apiKey = process.env.GEMINI_API_KEY;
```

For build-time variables, use `remotion.config.ts`:

```ts
Config.overrideWebpackConfig((config) => {
  return {
    ...config,
    plugins: [
      ...config.plugins,
      new webpack.DefinePlugin({
        "process.env.API_URL": JSON.stringify(process.env.API_URL),
      }),
    ],
  };
});
```
