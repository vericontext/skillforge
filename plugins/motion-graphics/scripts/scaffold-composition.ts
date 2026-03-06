/**
 * Scaffold a new Remotion composition with boilerplate
 *
 * Usage:
 *   npx tsx scaffold-composition.ts <name> [--format=landscape|portrait|square] [--duration=10] [--template=blank|social|explainer]
 *
 * Examples:
 *   npx tsx scaffold-composition.ts ProductDemo
 *   npx tsx scaffold-composition.ts InstagramReel --format=portrait --duration=30 --template=social
 */

import fs from "fs";
import path from "path";

interface Config {
  name: string;
  format: "landscape" | "portrait" | "square";
  duration: number;
  template: "blank" | "social" | "explainer";
  fps: number;
}

const FORMATS = {
  landscape: { width: 1920, height: 1080 },
  portrait: { width: 1080, height: 1920 },
  square: { width: 1080, height: 1080 },
};

function parseArgs(): Config {
  const args = process.argv.slice(2);
  const name = args[0];

  if (!name) {
    console.error("Usage: npx tsx scaffold-composition.ts <name> [options]");
    console.error("Options:");
    console.error("  --format=landscape|portrait|square  (default: landscape)");
    console.error("  --duration=<seconds>                (default: 10)");
    console.error("  --template=blank|social|explainer   (default: blank)");
    process.exit(1);
  }

  const getArg = (prefix: string, defaultVal: string): string => {
    const arg = args.find((a) => a.startsWith(`--${prefix}=`));
    return arg ? arg.split("=")[1] : defaultVal;
  };

  return {
    name,
    format: getArg("format", "landscape") as Config["format"],
    duration: parseInt(getArg("duration", "10"), 10),
    template: getArg("template", "blank") as Config["template"],
    fps: 30,
  };
}

function generateComponent(config: Config): string {
  const { name } = config;

  return `import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

export const ${name}: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f23",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          color: "white",
          fontSize: 72,
          fontWeight: 800,
          opacity: titleSpring,
          transform: \`scale(\${titleSpring})\`,
        }}
      >
        ${name}
      </h1>
    </AbsoluteFill>
  );
};
`;
}

function generateSchema(config: Config): string {
  return `import { z } from "zod";

export const ${config.name.charAt(0).toLowerCase() + config.name.slice(1)}Schema = z.object({
  title: z.string().default("${config.name}"),
});
`;
}

function generateRootEntry(config: Config): string {
  const { width, height } = FORMATS[config.format];
  const durationInFrames = config.duration * config.fps;

  return `
// Add this to your Root.tsx:
//
// import { ${config.name} } from "./compositions/${config.name}";
// import { ${config.name.charAt(0).toLowerCase() + config.name.slice(1)}Schema } from "./compositions/${config.name}.schema";
//
// <Composition
//   id="${config.name}"
//   component={${config.name}}
//   durationInFrames={${durationInFrames}}
//   fps={${config.fps}}
//   width={${width}}
//   height={${height}}
//   schema={${config.name.charAt(0).toLowerCase() + config.name.slice(1)}Schema}
//   defaultProps={{
//     title: "${config.name}",
//   }}
// />
`;
}

function main() {
  const config = parseArgs();
  const compositionsDir = path.resolve("src/compositions");

  if (!fs.existsSync(compositionsDir)) {
    fs.mkdirSync(compositionsDir, { recursive: true });
  }

  const componentPath = path.join(compositionsDir, `${config.name}.tsx`);
  const schemaPath = path.join(compositionsDir, `${config.name}.schema.ts`);

  if (fs.existsSync(componentPath)) {
    console.error(`Error: ${componentPath} already exists`);
    process.exit(1);
  }

  fs.writeFileSync(componentPath, generateComponent(config));
  console.log(`Created: ${componentPath}`);

  fs.writeFileSync(schemaPath, generateSchema(config));
  console.log(`Created: ${schemaPath}`);

  const { width, height } = FORMATS[config.format];
  console.log(`\nComposition: ${config.name}`);
  console.log(`  Format: ${config.format} (${width}x${height})`);
  console.log(`  Duration: ${config.duration}s (${config.duration * config.fps} frames)`);
  console.log(`  FPS: ${config.fps}`);
  console.log(generateRootEntry(config));
}

main();
