import React from 'react';
import type { Metadata } from 'next';
import SeaFreightClient from '../sea-freight-fcl-lcl/page';

export const metadata: Metadata = {
  title: 'Sea Freight (FCL & LCL) from China | JCD Forwarder Licensed NVOCC',
  description:
    'Reliable ocean container shipping from Shenzhen, Ningbo, Shanghai, and Guangzhou to 44 global destinations. FCL 20GP/40HQ bookings, LCL consolidation, and 14–21 free demurrage days.',
  keywords: [
    'sea freight china',
    'fcl shipping china',
    'lcl consolidation',
    'ocean freight forwarder',
    'china container shipping',
    'shenzhen ocean freight',
  ],
  alternates: {
    canonical: 'https://jcdforwarder.com/services/sea-freight',
  },
  openGraph: {
    title: 'China Sea Freight Services (FCL/LCL) | JCD Forwarder NVOCC',
    description:
      'Contracted liner allocations with COSCO, Evergreen, Maersk, and MSC. 14–21 free demurrage days and bonded export consolidation.',
    url: 'https://jcdforwarder.com/services/sea-freight',
    siteName: 'JCD Forwarder',
    type: 'website',
  },
};

export default function Page() {
  return <SeaFreightClient />;
}
