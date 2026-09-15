import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Shipping & Freight Unit Converter",
  description:
    "Instantly convert weight, length, volume, and box sizes between metric (kg, cm, CBM) and imperial (lbs, inches, cu ft) units used in international trade.",
  path: "/tools/shipping-unit-converter",
});

export default function ShippingUnitConverterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
