"use client";

import { useEffect, useState } from "react";
import { animate } from "framer-motion";

interface UseCountUpOptions {
  duration?: number;
  disabled?: boolean;
  decimals?: number;
}

/** Animates a number from 0 to `target` once, on mount. Set `disabled` (e.g. from useReducedMotion) to skip straight to the final value. */
export function useCountUp(target: number, options: UseCountUpOptions = {}) {
  const { duration = 1.4, disabled = false, decimals = 0 } = options;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (disabled) return;

    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Number(v.toFixed(decimals))),
    });
    return () => controls.stop();
  }, [target, duration, disabled, decimals]);

  return disabled ? target : value;
}
