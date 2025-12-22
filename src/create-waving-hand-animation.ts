import { Resvg } from "@resvg/resvg-js";
import * as fs from "fs";
import * as path from "path";

const __dirname = new URL(".", import.meta.url).pathname;
const svgPath = path.join(__dirname, "assets", "waving_hand.svg");
const svg = fs.readFileSync(svgPath, "utf-8");
const outputPath = process.argv[2];

renderSVGToPNG(svg, path.join(outputPath, "test.png"));

function renderSVGToPNG(svgContent: string, outputFilePath: string) {
  const resvg = new Resvg(svgContent, {
    fitTo: {
      mode: "width",
      value: 512,
    },
  });
  const pngData = resvg.render();
  fs.writeFileSync(outputFilePath, pngData.asPng());
}
