import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Free Proforma & Commercial Invoice Generator",
  description:
    "Generate a compliant international proforma or commercial invoice with automated subtotal calculation, freight apportionment, Incoterms, and printable PDF export.",
  path: "/tools/proforma-invoice-generator",
});

export default function ProformaInvoiceGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
