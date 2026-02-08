import { motion } from "motion/react";
import React from "react";

type StackFrom = "start" | "end";
type Direction = "up" | "down" | "left" | "right";

type StackletProps = {
  open: boolean;
  children: React.ReactNode;

  itemSize?: number;
  expandedGap?: number;
  collapsedGap?: number;

  scaleStep?: number;
  opacityStep?: number;

  stackedFrom?: StackFrom;
  collapsedCount?: number;
  direction?: Direction;

  transition?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
};

export function Stacklet({
  open,
  children,
  itemSize = 64,
  expandedGap = 72,
  collapsedGap = 10,
  scaleStep = 0.04,
  opacityStep = 0.08,
  stackedFrom = "start",
  collapsedCount,
  direction = "down",
  transition = { stiffness: 360, damping: 25, mass: 1.2 },
}: StackletProps) {
  const items = React.Children.toArray(children);
  const total = items.length;

  // how many items participate in collapsed stack
  const visibleCount =
    !open && collapsedCount != null ? Math.min(collapsedCount, total) : total;

  const height =
    itemSize + (visibleCount - 1) * (open ? expandedGap : collapsedGap);

  const directionMap: {
    [key in Direction]: { axis: "y" | "x"; sign: 1 | -1 };
  } = {
    down: { axis: "y", sign: 1 },
    up: { axis: "y", sign: -1 },
    right: { axis: "x", sign: -1 },
    left: { axis: "x", sign: 1 },
  } as const;

  const { axis, sign } = directionMap[direction];

  return (
    <motion.div
      className="relative"
      initial={false}
      animate={{ height }}
      style={{ minWidth: 240 }}
      transition={{ type: "spring", ...transition }}
    >
      {items.map((child, index) => {
        // normalized index based on stackFrom
        const visualIndex = stackedFrom === "start" ? index : total - 1 - index;

        // hide extra items when collapsed
        if (!open && visualIndex >= visibleCount) {
          return null;
        }

        const gap = open ? expandedGap : collapsedGap;
        const offset = index * gap * sign;

        const position =
          axis === "y" ? { y: offset, x: 0 } : { x: offset, y: 0 };

        const scale = open ? 1 : 1 - visualIndex * scaleStep;
        const opacity = open ? 1 : 1 - visualIndex * opacityStep;

        return (
          <motion.div
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
      })}
    </motion.div>
  );
}
