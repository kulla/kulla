import WavingHandSVG from "./assets/waving_hand.svg" assert { type: "text" };
import { Resvg } from "@resvg/resvg-js";
import * as fs from "fs";
import * as path from "path";

const outputPath = process.argv[2];

const wavingAnimationCSS = `
  #hand {
    transform: rotate(30deg);
    transform-origin: center;
    transform-box: fill-box;
  }
`;
const newSVG = injectCSSAnimation(WavingHandSVG, wavingAnimationCSS);

renderSVGToPNG(newSVG, path.join(outputPath, "test.png"));

console.log(
  new Date(Date.now()).toISOString(),
  "Waving hand animation created!",
);

function renderSVGToPNG(svgContent: string, outputFilePath: string) {
  const resvg = new Resvg(svgContent, { fitTo: { mode: "width", value: 512 } });

  fs.writeFileSync(outputFilePath, resvg.render().asPng());
}

function injectCSSAnimation(svgContent: string, css: string): string {
  const svgWithStyle = svgContent.replace(
    "</svg>",
    `<style>${css}</style></svg>`,
  );
  return svgWithStyle;
}
