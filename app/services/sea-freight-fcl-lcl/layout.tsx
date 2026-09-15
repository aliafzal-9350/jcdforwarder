import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Ocean Freight FCL & LCL Consolidation",
  description:
    "JCD Forwarder's ocean freight services: 20GP/40GP/40HQ/45HQ FCL container booking and weekly LCL consolidation from China's major ports.",
  path: "/services/sea-freight-fcl-lcl",
});

export default function SeaFreightFclLclLayout({ children }: { children: React.ReactNode }) {
  return children;
}
