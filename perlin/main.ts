import { perlinAt } from "./perlin.ts";
import { createCanvas } from "https://deno.land/x/canvas/mod.ts";

const ratio = 5;
const width = 900 * ratio;
const height = 400 * ratio;
const canvas = createCanvas(width, height);

const ctx = canvas.getContext("2d");

// The number of grid points across the screen
const g = [
  [1, 2],
  [2, 1],
  [4, 0.5],
  [8, 0.25],
  [16, 0.125],
  [32, 0.0625],
];

for (let i = 0; i < width; i++) {
  for (let j = 0; j < height; j++) {
    const x = i / width;
    const y = j / height;
    const h = g
      .map(([g, w]) => [perlinAt(x * g, y * g), w])
      .reduce((a, [p, w]) => a + p * w, 0);

    const t = 150;
    ctx.fillStyle = ((Math.floor(h * 1000) % t + t) % t) > 75 ? "#000" : "#FFF";
    //   ctx.fillStyle = `rgb(${h * 300},${h*300},${h*300})`
    //   ctx.fillStyle = `hsl(${h * 360},80%,50%)`
    //   ctx.fillStyle = `hsl(0,0%,${(h + 1) * 45}%)`
    ctx.fillRect(i, j, 1, 1);
  }
}

await Deno.writeFile("image.png", canvas.toBuffer());
