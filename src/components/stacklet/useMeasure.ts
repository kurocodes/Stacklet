import type React from "react";
import { useLayoutEffect, useRef, useState } from "react";

export function useMeasure(enabled: boolean): [React.RefObject<HTMLDivElement | null>, number | null] {
    const ref = useRef<HTMLDivElement | null>(null);
    const [size, setSize] = useState<number | null>(null);

    useLayoutEffect(() => {
        if (!enabled || !ref.current) return;
    
        const measure = () => {
          const rect = ref.current!.getBoundingClientRect();
          setSize(rect.height);
        };
    
        measure();
    
        const ro = new ResizeObserver(measure);
        ro.observe(ref.current);
    
        return () => ro.disconnect();
      }, [enabled]);

      return [ref, size];
}