import type { Metadata } from "next";
import { SITE_CONFIG } from "@/data/siteConfig";

// This route is a duplicate of /tools/volumetric-calculator (same component, re-exported).
// Canonical points at the primary URL so search engines consolidate on one page.
export const metadata: Metadata = {
  title: "Volumetric Weight & Chargeable Freight Calculator",
  alternates: { canonical: `${SITE_CONFIG.url}/tools/volumetric-calculator` },
};

export default function VolumetricWeightCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
