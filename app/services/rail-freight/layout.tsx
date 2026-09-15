import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "China-Europe Railway Express (CR Express Landbridge)",
  description:
    "JCD Forwarder's China-Europe Rail Express service: block-train landbridge freight via Alashankou, Erenhot, and Manzhouli corridors to the EU and UK.",
  path: "/services/rail-freight",
});

export default function RailFreightLayout({ children }: { children: React.ReactNode }) {
  return children;
}
