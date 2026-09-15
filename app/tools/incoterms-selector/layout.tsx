import type { Metadata } from "next";
import { SITE_CONFIG } from "@/data/siteConfig";

// This route is a duplicate of /tools/incoterms (same component, re-exported).
// Canonical points at the primary URL so search engines consolidate on one page.
export const metadata: Metadata = {
  title: "Incoterms 2020 Decision & Comparison Guide",
  alternates: { canonical: `${SITE_CONFIG.url}/tools/incoterms` },
};

export default function IncotermsSelectorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
