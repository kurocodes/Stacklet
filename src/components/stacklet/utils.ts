import type { Direction } from "./types";

export const directionMap: {
    [key in Direction]: { axis: "y" | "x"; sign: 1 | -1 };
  } = {
    down: { axis: "y", sign: 1 },
    up: { axis: "y", sign: -1 },
    right: { axis: "x", sign: 1 },
    left: { axis: "x", sign: -1 },
  } as const;