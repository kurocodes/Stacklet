import type { Direction } from "./types";

export const directionMap: {
  [key in Direction]: { axis: "y" | "x"; sign: 1 | -1 };
} = {
  down: { axis: "y", sign: 1 },
  up: { axis: "y", sign: -1 },
  right: { axis: "x", sign: 1 },
  left: { axis: "x", sign: -1 },
} as const;

export const anchorClassMap: Record<Direction, string> = {
  down: "inset-x-0 top-0",
  up: "inset-x-0 bottom-0",
  right: "inset-y-0 left-0",
  left: "inset-y-0 right-0",
} as const;
