import { AnimatePresence, motion, type Transition } from "motion/react";
import React from "react";
import type { Align, Direction, StackFrom } from "./types";
import { useMeasure } from "./useMeasure";
import { anchorClassMap, directionMap } from "./utils";
import { getAlignIndex, getVisualIndex } from "./math";

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

  // Items that belong to the collapsed "hero" stack.
  // Extra items are handled separately to avoid visual popping.
  const collapsedStackCount =
    collapsedCount != null ? Math.min(collapsedCount, total) : total;

  const shouldMeasure = itemSize == null;
  const [firstItemRef, measuredItemSize] = useMeasure(shouldMeasure);
  const isMeasureTarget = shouldMeasure && measuredItemSize == null;

  const visibleCount =
    !open && collapsedCount != null ? Math.min(collapsedCount, total) : total;

  const resolvedItemSize = itemSize ?? measuredItemSize;

  // Stack step is different when expanded vs collapsed.
  // Expanded: full item size + spacing
  // Collapsed: small offset only (overlap effect)
  const stackStep = open
    ? resolvedItemSize! + expandedSpacing
    : collapsedSpacing;

  const height = resolvedItemSize! + (visibleCount - 1) * stackStep;

  const { axis, sign } = directionMap[direction];
  const isVertical = axis === "y";

  return (
    <motion.div
      className="relative w-full"
      initial={false}
      animate={isVertical ? { height } : { width: height }}
      transition={{ type: "spring", ...transition }}
    >
      {items.map((child, index) => {
        const visualIndex = getVisualIndex(index, total, stackedFrom);

        const isStackItem = visualIndex < collapsedStackCount;
        const isExtraItem = visualIndex >= collapsedStackCount;

        if (isStackItem) {
          const alignIndex = getAlignIndex(visualIndex, visibleCount, align);

          const offset = alignIndex * stackStep * sign;
          const position =
            axis === "y" ? { y: offset, x: 0 } : { x: offset, y: 0 };

          const scale = open ? 1 : 1 - visualIndex * scaleStep;
          const opacity = open ? 1 : 1 - visualIndex * opacityStep;

          return (
            <motion.div
              ref={isMeasureTarget ? firstItemRef : null}
              key={index}
              className={`absolute ${anchorClassMap[direction]}`}
              initial={false}
              animate={{ ...position, scale, opacity }}
              transition={{ type: "spring", ...transition }}
              style={{ zIndex: visibleCount - visualIndex }}
            >
              {child}
            </motion.div>
          );
        }

        // Extra items fade in/out separately so they don't
        // visually pop from behind the collapsed stack.
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
                      delay: extraItemsDelay,
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
