import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Free Packing List Generator",
  description:
    "Generate a compliant export packing list with automatic carton tally, weight distribution, and instant PDF export for international shipments.",
  path: "/tools/packing-list-generator",
});

export default function PackingListGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
