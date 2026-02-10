import { useEffect, useRef, useState } from "react";

export function useHoverDelay(delay = 0) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const onMouseEnter = () => {
    clear();

    if (delay === 0) {
      setIsHovered(true);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setIsHovered(true);
      timeoutRef.current = null;
    }, delay);
  };

  const onMouseLeave = () => {
    clear();
    setIsHovered(false);
  };

  useEffect(() => {
    return clear;
  }, []);

  return {
    isHovered,
    bind: {
      onMouseEnter,
      onMouseLeave,
    },
  };
}
