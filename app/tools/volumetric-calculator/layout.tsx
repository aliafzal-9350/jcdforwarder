import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Volumetric Weight & Chargeable Freight Calculator",
  description:
    "Check whether carriers will bill your shipment by actual weight or volumetric space. Compare Air (1:6000), Courier (1:5000), and Ocean CBM side-by-side.",
  path: "/tools/volumetric-calculator",
});

export default function VolumetricCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
