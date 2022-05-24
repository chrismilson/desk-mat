import { Turtle } from "./turtle.ts";

export function hilbert(n: number, turtle: Turtle) {
  turtle.penDown();

  for (const step of lindenmayer_hilbert(n)) {
    switch (step) {
      case LindenmayerStep.FORWARD:
        turtle.move(10);
        break;
      case LindenmayerStep.LEFT:
        turtle.turn(-Math.PI / 2);
        break;
      case LindenmayerStep.RIGHT:
        turtle.turn(Math.PI / 2);
        break;
      default:
        break;
    }
  }
}

enum LindenmayerStep {
  A,
  B,
  FORWARD,
  LEFT,
  RIGHT,
}

function* expand(
  step: LindenmayerStep,
): Generator<LindenmayerStep, void, undefined> {
  switch (step) {
    case LindenmayerStep.A:
      yield* [
        LindenmayerStep.LEFT,
        LindenmayerStep.B,
        LindenmayerStep.FORWARD,
        LindenmayerStep.RIGHT,
        LindenmayerStep.A,
        LindenmayerStep.FORWARD,
        LindenmayerStep.A,
        LindenmayerStep.RIGHT,
        LindenmayerStep.FORWARD,
        LindenmayerStep.B,
        LindenmayerStep.LEFT,
      ];
      break;
    case LindenmayerStep.B:
      yield* [
        LindenmayerStep.RIGHT,
        LindenmayerStep.A,
        LindenmayerStep.FORWARD,
        LindenmayerStep.LEFT,
        LindenmayerStep.B,
        LindenmayerStep.FORWARD,
        LindenmayerStep.B,
        LindenmayerStep.LEFT,
        LindenmayerStep.FORWARD,
        LindenmayerStep.A,
        LindenmayerStep.RIGHT,
      ];
      break;
    default:
      yield step;
  }
}

function* lindenmayer_hilbert(
  n: number,
): Generator<LindenmayerStep, void, undefined> {
  if (n == 0) {
    yield LindenmayerStep.A;
    return;
  }

  for (const step of lindenmayer_hilbert(n - 1)) {
    yield* expand(step);
  }
}
