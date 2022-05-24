import { CanvasRenderingContext2D } from "https://deno.land/x/canvas/mod.ts";

export class Turtle {
  private ctx: CanvasRenderingContext2D;
  private x: number;
  private y: number;
  private t: number;
  private pen: boolean;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.ctx.moveTo(0, 0);
    this.x = 0;
    this.y = 0;
    this.t = 0;
    this.pen = false;
  }

  penDown(): void {
    this.pen = true;
  }

  penUp(): void {
    this.pen = false;
  }

  move(distance: number): void {
    const dx = Math.cos(this.t) * distance;
    const dy = Math.sin(this.t) * distance;
    this.x += dx;
    this.y += dy;

    if (this.pen) {
      this.ctx.lineTo(this.x, this.y);
    } else {
      this.ctx.moveTo(this.x, this.y);
    }
  }

  turn(radians: number): void {
    this.t += radians;
  }
}
