import React from 'react';
import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';
import { getRouteBySlug, getRouteByCode } from '@/data/routes';
import CountryCatalogPdf, { CatalogAssets } from '@/components/pdf/CountryCatalogPdf';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// In-memory cache for high-resolution informatic assets
let cachedAssets: CatalogAssets | null = null;

function getCatalogAssets(): CatalogAssets {
  if (cachedAssets) {
    return cachedAssets;
  }

  const assetsDir = path.join(process.cwd(), 'public/images/catalog/assets');

  const readAsset = (filename: string): string | undefined => {
    try {
      const filePath = path.join(assetsDir, filename);
      if (fs.existsSync(filePath)) {
        const buf = fs.readFileSync(filePath);
        const mime = filename.endsWith('.png') ? 'image/png' : 'image/jpeg';
        return `data:${mime};base64,${buf.toString('base64')}`;
      }
    } catch (e) {
      console.warn(`Could not load catalog asset: ${filename}`, e);
    }
    return undefined;
  };

  cachedAssets = {
    realContainerShip: readAsset('real_container_ship.jpg'),
    heroPlaneGlobe: readAsset('hero_plane_globe.jpg'),
    terminalBanner: readAsset('terminal_banner.jpg'),
    trilemma3d: readAsset('trilemma_3d.jpg'),
    cargoFreighter: readAsset('cargo_freighter.jpg'),
    portYard: readAsset('port_yard.jpg'),
    containers3dSpecs: readAsset('containers_3d_specs.jpg'),
    lclOpenBox: readAsset('lcl_open_box.jpg'),
    ddpConduitFlow: readAsset('ddp_conduit_flow.jpg'),
    phoneTrackingMockup: readAsset('phone_tracking_mockup.jpg'),
    quadrantUrgentAir: readAsset('quadrant_urgent_air.jpg'),
    quadrantVolumeSea: readAsset('quadrant_volume_sea.jpg'),
    quadrantSamplerExpress: readAsset('quadrant_sampler_express.jpg'),
    quadrantDdpCenter: readAsset('quadrant_ddp_center.jpg'),
    chinaOriginHubs: readAsset('china_origin_hubs.jpg'),
    worldRoutesMap: readAsset('world_routes_map.jpg'),
    circuitQrFrame: readAsset('circuit_qr_frame.jpg'),
    whatsappQr: readAsset('whatsapp_qr_clean.png'),
  };

  return cachedAssets;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: 'Missing route slug' }, { status: 400 });
    }

    const normalizedSlug = slug.toLowerCase().trim();
    const route =
      getRouteBySlug(normalizedSlug) ||
      getRouteBySlug(`shipping-from-china-to-${normalizedSlug}`) ||
      getRouteByCode(normalizedSlug);

    if (!route) {
      return NextResponse.json(
        { error: `Route not found for slug: ${slug}` },
        { status: 404 }
      );
    }

    // Generate dynamic scannable WhatsApp quotation QR code for this specific country destination
    let dynamicQrDataUri: string | undefined;
    try {
      const whatsappMsg = `Hi David, I would like to request a shipping quotation for China to ${route.name}.`;
      const whatsappUrl = `https://wa.me/8613724246674?text=${encodeURIComponent(whatsappMsg)}`;
      dynamicQrDataUri = await QRCode.toDataURL(whatsappUrl, {
        errorCorrectionLevel: 'H',
        margin: 1,
        width: 600,
        color: {
          dark: '#081A36',
          light: '#FFFFFF',
        },
      });
    } catch (qrErr) {
      console.warn('Could not generate dynamic QR code:', qrErr);
    }

    // Preload the base informatic graphic assets
    const baseAssets = getCatalogAssets();
    const assets: CatalogAssets = {
      ...baseAssets,
      whatsappQr: dynamicQrDataUri || baseAssets.whatsappQr || baseAssets.circuitQrFrame,
    };

    // Render the dynamic 15-slide presentation PDF to a Node Buffer
    const pdfElement = React.createElement(CountryCatalogPdf, { route, assets });
    const pdfBuffer = await renderToBuffer(
      pdfElement as unknown as Parameters<typeof renderToBuffer>[0]
    );

    // Format safe attachment filename for the specific country
    const safeCountryName = route.name.replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `JCD_Shipping_from_China_to_${safeCountryName}_2026_Catalog.pdf`;

    const isInline =
      request.nextUrl.searchParams.get('inline') === 'true' ||
      request.nextUrl.searchParams.get('view') === 'true';

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `${isInline ? 'inline' : 'attachment'}; filename="${filename}"`,
        'Content-Length': pdfBuffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  } catch (error) {
    console.error('Error generating country PDF catalog:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate PDF presentation catalog',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
