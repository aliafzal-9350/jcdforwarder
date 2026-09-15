import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Chinese Origin Hubs & Port Consolidation Bases",
  description:
    "Explore JCD Forwarder's 7 Chinese sourcing hubs, including local factory pickup coverage, consolidation warehouses, and port gate-in terminals.",
  path: "/origins",
});

export default function OriginsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
