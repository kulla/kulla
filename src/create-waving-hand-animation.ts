import WavingHandSVG from "./assets/waving_hand.svg" assert { type: "text" };
import { Resvg } from "@resvg/resvg-js";
import * as fs from "fs";
import * as path from "path";

const outputPath = process.argv[2];

const newSVG = animate(WavingHandSVG, {
  hand: { rotate: 10, transformOrigin: "97 110" },
});

renderSVGToPNG(newSVG, path.join(outputPath, "test.png"));

console.log(
  new Date(Date.now()).toISOString(),
  "Waving hand animation created!",
);

function renderSVGToPNG(svgContent: string, outputFilePath: string) {
  const resvg = new Resvg(svgContent, { fitTo: { mode: "width", value: 512 } });

  fs.writeFileSync(outputFilePath, resvg.render().asPng());
}

function animate(
  svgContent: string,
  changes: Record<string, TransformSpec>,
): string {
  return Object.entries(changes).reduce(
    (updatedSVG, [id, spec]) =>
      updatedSVG.replace(`id="${id}"`, `id="${id}" ${createTransform(spec)}`),
    svgContent,
  );
}

function createTransform(spec: TransformSpec): string {
  return `
    transform="
      translate(${spec.translateX ?? 0} ${spec.translateY ?? 0})
      rotate(${spec.rotate ?? 0} ${spec.transformOrigin ?? ""})
    "
  `
    .replace(/\s+/g, " ")
    .trim();
}

interface TransformSpec {
  translateX?: number;
  translateY?: number;
  rotate?: number;
  transformOrigin?: string;
}
