import { createCanvas } from "https://deno.land/x/canvas/mod.ts";
import { repeat } from "./random.ts";

const resolution = 2;
const width = 900 * resolution;
const height = 400 * resolution;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

// The length of a line
const t = 5 * resolution;

const xs = [...repeat(0.5, Math.ceil(width / t))];
const ys = [...repeat(0.5, Math.ceil(height / t))];

ctx.fillStyle = "#000";
ctx.strokeStyle = "#FFF";
ctx.fillRect(0, 0, width, height);

// Draw lines
for (let i = 0; i < width / t; i++) {
  for (let j = 0; j < height / t; j++) {
    if ((j & 1) ^ 1) {
      ctx.beginPath();
      ctx.moveTo(i * t, (j + (xs[i] as unknown as number)) * t);
      ctx.lineTo(i * t, (j + 1 + (xs[i] as unknown as number)) * t);
      ctx.closePath();
      ctx.stroke();
    }
    if ((i & 1) ^ 1) {
      ctx.beginPath();
      ctx.moveTo((i + (ys[j] as unknown as number)) * t, j * t);
      ctx.lineTo((i + 1 + (ys[j] as unknown as number)) * t, j * t);
      ctx.closePath();
      ctx.stroke();
    }
  }
}

await Deno.writeFile("lines.png", canvas.toBuffer());

ctx.clearRect(0, 0, width, height);

let state: boolean;
// Fill areas
for (let i = 0; i < width / t; i++) {
  state = xs[i];
  for (let j = 0; j < height / t; j++) {
    const line = Boolean(i & 1) != ys[j];
    state = line ? !state : state;
    ctx.fillStyle = state ? "#FFF" : "#000";
    ctx.fillRect(i * t, j * t, t, t);
  }
}

await Deno.writeFile("fill.png", canvas.toBuffer());
