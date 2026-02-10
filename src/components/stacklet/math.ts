import type { Align, StackFrom } from "./types";

export function getVisualIndex(
  index: number,
  total: number,
  stackedFrom: StackFrom,
) {
  return stackedFrom === "start" ? index : total - 1 - index;
}

export function getAlignIndex(
  visualIndex: number,
  visibleCount: number,
  align: Align,
) {
  return align === "forward" ? visualIndex : visibleCount - 1 - visualIndex;
}
