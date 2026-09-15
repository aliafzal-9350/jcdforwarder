import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "China Export HS Code & Duty Classification Finder",
  description:
    "Find the right Harmonized System (HS) code for goods shipped from China, check export VAT rebate rates, and understand import compliance rules.",
  path: "/tools/china-hs-code",
});

export default function ChinaHsCodeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
