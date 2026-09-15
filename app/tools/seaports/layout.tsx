import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "World Seaport Map & UN/LOCODE Directory",
  description:
    "Search world seaports by country, name, or UN/LOCODE. Explore verified coordinates, technical characteristics, facilities, and sailing transit references.",
  path: "/tools/seaports",
});

export default function SeaportsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
