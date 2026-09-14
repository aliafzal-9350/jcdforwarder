'use client';

import React, { useState } from 'react';
import { FileDown, Loader2 } from 'lucide-react';

interface DownloadCatalogButtonProps {
  slug: string;
  countryName?: string;
  className?: string;
}

export const DownloadCatalogButton: React.FC<DownloadCatalogButtonProps> = ({
  slug,
  countryName = 'Destination',
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const response = await fetch(`/api/pdf/${slug}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch catalog: ${response.statusText}`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // Create download anchor and trigger click
      const safeCountry = countryName.replace(/[^a-zA-Z0-9_-]/g, '_');
      const filename = `JCD_Shipping_from_China_to_${safeCountry}_2026_Catalog.pdf`;

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup blob url after brief delay
      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 2000);
    } catch (error) {
      console.error('PDF Catalog Download Error:', error);
      // Fallback: direct window location / open
      window.open(`/api/pdf/${slug}`, '_blank');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isLoading}
      aria-label={`Download 2026 shipping catalog for China to ${countryName}`}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3.5 shadow-lg shadow-blue-900/30 transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin text-blue-200" />
          <span>Generating 15-Slide PDF...</span>
        </>
      ) : (
        <>
          <FileDown className="w-5 h-5 text-blue-200" />
          <span>Download 2026 Catalog (PDF)</span>
        </>
      )}
    </button>
  );
};

export default DownloadCatalogButton;
