import { Turtle } from "./turtle.ts";
import { createCanvas } from "https://deno.land/x/canvas/mod.ts";
import { hilbert } from "./hilbert.ts";

const canvas = createCanvas(900, 400);
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#000";
ctx.fillRect(0, 0, 900, 400);

ctx.transform(1, 0, 0, 1, 0, 0);

ctx.beginPath();
const turtle = new Turtle(ctx);
turtle.turn(Math.PI / 2);
hilbert(2, turtle);

ctx.strokeStyle = "#FFF";
ctx.stroke();

await Deno.writeFile("image.png", canvas.toBuffer());
