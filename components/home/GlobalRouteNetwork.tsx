"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Route {
  d: string;
  duration: number;
  delay: number;
}

// Abstract origin (Shenzhen, lower-left) fanning out to a few global destinations.
// Coordinates are illustrative, not a literal map projection.
const ROUTES: Route[] = [
  { d: "M 90,320 C 220,220 340,120 560,70", duration: 5.5, delay: 0 },
  { d: "M 90,320 C 200,300 420,300 620,220", duration: 6.5, delay: 1.2 },
  { d: "M 90,320 C 180,360 380,400 640,360", duration: 7, delay: 2.4 },
];

const DESTINATIONS = [
  { x: 560, y: 70 },
  { x: 620, y: 220 },
  { x: 640, y: 360 },
];

export function GlobalRouteNetwork({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 700 420"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Origin node — Shenzhen HQ */}
      <circle cx="90" cy="320" r="4" className="fill-brand-orange" />
      <circle cx="90" cy="320" r="9" className="fill-brand-orange/20" />

      {ROUTES.map((route, i) => (
        <path
          key={i}
          d={route.d}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 5"
          className="text-brand-cyan/30"
        />
      ))}

      {DESTINATIONS.map((d, i) => (
        <g key={i}>
          <circle cx={d.x} cy={d.y} r="3" className="fill-brand-cyan" />
          <circle cx={d.x} cy={d.y} r="7" className="fill-brand-cyan/25" />
        </g>
      ))}

      {!reducedMotion &&
        ROUTES.map((route, i) => (
          <circle key={i} r="2.5" className="fill-white">
            <animateMotion
              path={route.d}
              dur={`${route.duration}s`}
              begin={`${route.delay}s`}
              repeatCount="indefinite"
              keyPoints="0;1"
              keyTimes="0;1"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.1;0.85;1"
              dur={`${route.duration}s`}
              begin={`${route.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
    </svg>
  );
}
