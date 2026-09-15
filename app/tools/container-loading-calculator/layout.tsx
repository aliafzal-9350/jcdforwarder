import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Container Loading Calculator & 3D Space Planner",
  description:
    "See exactly how your boxes fit inside an ocean shipping container. Calculate total volume (CBM), maximum box capacity, and weight limits for 20GP, 40GP, 40HQ, and 45HQ containers.",
  path: "/tools/container-loading-calculator",
});

export default function ContainerLoadingCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
