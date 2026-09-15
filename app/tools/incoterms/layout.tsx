import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Incoterms 2020 Decision & Comparison Guide",
  description:
    "Compare EXW, FOB, CIF, DDU, and DDP terms to see who pays for shipping, who handles customs, and where risk transfers between you and your Chinese supplier.",
  path: "/tools/incoterms",
});

export default function IncotermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
