import { AnimatePresence, motion, type Transition } from "motion/react";
import React from "react";
import type { Align, Direction, StackFrom } from "./types";
import { useMeasure } from "./useMeasure";
import { directionMap } from "./utils";

interface StackletProps {
  open: boolean;
  children: React.ReactNode;

  itemSize?: number;
  expandedSpacing?: number;
  collapsedSpacing?: number;

  scaleStep?: number;
  opacityStep?: number;

  stackedFrom?: StackFrom;
  collapsedCount?: number;
  direction?: Direction;
  align?: Align;

  transition?: Transition;
  extraItemsDelay?: number;
  extraItemsDuration?: number;
}

export function Stacklet({
  open,
  children,
  itemSize,
  expandedSpacing = 8,
  collapsedSpacing = 10,
  scaleStep = 0.04,
  opacityStep = 0.08,
  stackedFrom = "start",
  collapsedCount,
  direction = "down",
  align = "forward",
  transition = { stiffness: 360, damping: 25, mass: 1.2 },
  extraItemsDelay = 0.01,
  extraItemsDuration = 0.15,
}: StackletProps) {
  const items = React.Children.toArray(children);
  const total = items.length;

  const stackCount =
    collapsedCount != null ? Math.min(collapsedCount, total) : total;

  const shouldMeasure = itemSize == null;
  const [firstItemRef, measuredItemSize] = useMeasure(shouldMeasure);
  const isMeasureTarget = shouldMeasure && measuredItemSize == null;

  const visibleCount =
    !open && collapsedCount != null ? Math.min(collapsedCount, total) : total;

  const resolvedItemSize = itemSize ?? measuredItemSize;
  const step = open ? resolvedItemSize! + expandedSpacing : collapsedSpacing;
  const height = resolvedItemSize! + (visibleCount - 1) * step;

  const { axis, sign } = directionMap[direction];

  return (
    <motion.div
      className="relative w-full"
      initial={false}
      animate={{ height }}
      transition={{ type: "spring", ...transition }}
    >
      {items.map((child, index) => {
        const visualIndex = stackedFrom === "start" ? index : total - 1 - index;

        const isStackItem = visualIndex < stackCount;
        const isExtraItem = visualIndex >= stackCount;

        if (isStackItem) {
          const alignIndex =
            align === "forward" ? visualIndex : visibleCount - 1 - visualIndex;

          const offset = alignIndex * step * sign;
          const position =
            axis === "y" ? { y: offset, x: 0 } : { x: offset, y: 0 };

          const scale = open ? 1 : 1 - visualIndex * scaleStep;
          const opacity = open ? 1 : 1 - visualIndex * opacityStep;

          return (
            <motion.div
              ref={isMeasureTarget ? firstItemRef : null}
              key={index}
              className="absolute inset-x-0 top-0"
              initial={false}
              animate={{ ...position, scale, opacity }}
              transition={{ type: "spring", ...transition }}
              style={{ zIndex: visibleCount - visualIndex }}
            >
              {child}
            </motion.div>
          );
        }

        if (isExtraItem) {
          if (isExtraItem) {
            return (
              <AnimatePresence key={index}>
                {open && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: extraItemsDuration,
                      delay: extraItemsDelay, // ← important
                    }}
                    className="relative mb-1"
                  >
                    {child}
                  </motion.div>
                )}
              </AnimatePresence>
            );
          }
        }
      })}
    </motion.div>
  );
}
