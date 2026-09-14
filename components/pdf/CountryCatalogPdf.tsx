import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Svg,
  Path,
  Rect,
  Circle,
  Line,
  Image,
} from '@react-pdf/renderer';
import type { CountryRoute } from '@/data/routes';

export interface CatalogAssets {
  realContainerShip?: string;
  heroPlaneGlobe?: string;
  terminalBanner?: string;
  trilemma3d?: string;
  cargoFreighter?: string;
  portYard?: string;
  containers3dSpecs?: string;
  lclOpenBox?: string;
  ddpConduitFlow?: string;
  phoneTrackingMockup?: string;
  quadrantUrgentAir?: string;
  quadrantVolumeSea?: string;
  quadrantSamplerExpress?: string;
  quadrantDdpCenter?: string;
  chinaOriginHubs?: string;
  worldRoutesMap?: string;
  circuitQrFrame?: string;
  whatsappQr?: string;
}

export interface CountryCatalogPdfProps {
  route: CountryRoute;
  assets?: CatalogAssets;
}

const styles = StyleSheet.create({
  pageLight: {
    width: 842.4,
    height: 470.2,
    backgroundColor: '#F8FAFC',
    paddingTop: 16,
    paddingBottom: 22,
    paddingHorizontal: 28,
    fontFamily: 'Helvetica',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  pageDark: {
    width: 842.4,
    height: 470.2,
    backgroundColor: '#081A36',
    paddingTop: 14,
    paddingBottom: 16,
    paddingHorizontal: 28,
    fontFamily: 'Helvetica',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: '#FFFFFF',
  },
  // Slide Header
  slideHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 3,
    marginBottom: 4,
  },
  headerBrand: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#0F2C59',
    letterSpacing: 0.5,
  },
  headerTag: {
    fontSize: 6.8,
    color: '#64748B',
  },
  // Slide Footer
  slideFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 18,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
    fontSize: 6.5,
    color: '#64748B',
  },
  footerDark: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 18,
    borderTopWidth: 1,
    borderTopColor: '#1E3E62',
    backgroundColor: '#051329',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
    fontSize: 6.5,
    color: '#94A3B8',
  },
  // Title Elements
  slideTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F2C59',
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  slideSubtitle: {
    fontSize: 8.2,
    color: '#475569',
    marginBottom: 8,
  },
  coreUseTab: {
    position: 'absolute',
    right: 0,
    top: 70,
    width: 20,
    height: 120,
    backgroundColor: '#0F2C59',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coreUseTabText: {
    fontSize: 6,
    color: '#38BDF8',
    fontWeight: 'bold',
    letterSpacing: 1,
    transform: 'rotate(-90deg)',
  },
  // Common Grid / Rows
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 8,
  },
  cardDark: {
    backgroundColor: 'rgba(15, 44, 89, 0.75)',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#1E3E62',
    padding: 8,
  },
  badgeOrange: {
    backgroundColor: '#EA580C',
    color: '#FFFFFF',
    fontSize: 6.5,
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 3,
  },
  badgeBlue: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    fontSize: 6.5,
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 3,
  },
  calloutOrange: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FDBA74',
    borderWidth: 1,
    borderRadius: 5,
    padding: 7,
  },
});

export function CountryCatalogPdf({ route, assets = {} }: CountryCatalogPdfProps) {
  const destination = route.name;
  const destCode = route.code;
  const primaryAirport = route.mainAirports?.[0] || 'International Airport';
  const secondaryAirport = route.mainAirports?.[1] || primaryAirport;
  const primarySeaport = route.mainSeaports?.[0] || 'Main Container Port';
  const secondarySeaport = route.mainSeaports?.[1] || primarySeaport;
  const tertiarySeaport = route.mainSeaports?.[2] || primarySeaport;

  const oceanTransit = route.portPairs?.[0]?.transitDays || '18–35 Days';
  const airTransit = '3–7 Days';
  const expressTransit = '2–4 Days';
  const ddpAirTransit = '6–10 Days';
  const ddpSeaTransit = oceanTransit.includes('Days') ? `${oceanTransit} Door` : '20–35 Days Door';

  const deMinimis = route.deMinimisThreshold || '$800 USD';
  const customsAuth = route.customsAuthority || 'Customs Authority';
  const vatGst = route.vatGstRate || 'Standard Rate';
  const palletDim = route.palletSpecs?.dimensions || '1.20m x 1.00m x 1.80m (GMA Grade B+)';
  const palletType = route.palletSpecs?.palletType || 'Standard Pallet';
  const maxCartonKg = route.palletSpecs?.cartonMaxWeightKg || 23.0;
  const fbaWarehouses = route.topAmazonWarehouses || [];

  return (
    <Document
      title={`The 2026 Strategic Guide to Shipping: China to ${destination}`}
      author="Shenzhen Jiechengda International Freight Forwarding Co., Ltd. (JCD Forwarder)"
      subject={`Comprehensive Logistics Guide: Air Freight, Ocean FCL/LCL, DDP Door-to-Door & Amazon FBA from China to ${destination}`}
      keywords={`Freight Forwarding, China to ${destination}, DDP, Ocean Freight, Air Freight, Amazon FBA, NVOCC`}
    >
      {/* ========================================================================= */}
      {/* SLIDE 1: COVER PAGE (Dark Navy #081A36) */}
      {/* ========================================================================= */}
      <Page size={[842.4, 470.2]} style={styles.pageDark}>
        {/* Top 55% Header and Plane Globe */}
        <View style={{ height: 205, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* Left Title Box */}
          <View style={{ width: '56%', paddingTop: 8 }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <View style={{ backgroundColor: '#2563EB', paddingVertical: 2.5, paddingHorizontal: 7, borderRadius: 3, marginRight: 8 }}>
                <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#FFFFFF' }}>JCD</Text>
              </View>
              <Text style={{ fontSize: 7.5, fontWeight: 'bold', color: '#94A3B8', letterSpacing: 1.5 }}>
                SHENZHEN JIECHENGDA NVOCC
              </Text>
            </View>

            <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1.15, marginBottom: 8 }}>
              The 2026 Strategic Guide to Shipping: China to {destination}
            </Text>

            <Text style={{ fontSize: 11, color: '#93C5FD', fontWeight: 'bold', marginBottom: 12 }}>
              Optimizing Costs, Transit Times & Logistics Methods for Importers
            </Text>

            <View style={[styles.row, { gap: 8, alignItems: 'center', marginBottom: 8 }]}>
              <View style={{ backgroundColor: '#1E3E62', paddingVertical: 3, paddingHorizontal: 7, borderRadius: 3 }}>
                <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#38BDF8' }}>
                  ROUTE: CN-{destCode} to {destination.toUpperCase()}
                </Text>
              </View>
              <View style={{ backgroundColor: '#1E3E62', paddingVertical: 3, paddingHorizontal: 7, borderRadius: 3 }}>
                <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#FDBA74' }}>
                  TRANSIT REGION: {route.region.toUpperCase()}
                </Text>
              </View>
            </View>

            <Text style={{ fontSize: 6.8, color: '#94A3B8' }}>
              Licensed NVOCC: GD20240307220907 | 10+ Years Cross-Border Specialist
            </Text>
          </View>

          {/* Right Hero Plane Globe Image */}
          <View style={{ width: '42%', height: 195, borderRadius: 6, overflow: 'hidden', backgroundColor: '#0B1E3B', borderWidth: 1, borderColor: '#1E3E62' }}>
            {assets.heroPlaneGlobe ? (
              <Image src={assets.heroPlaneGlobe} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 10, color: '#38BDF8' }}>TRANSIT ROUTE MAP</Text>
              </View>
            )}
          </View>
        </View>

        {/* Orange Accent Dividing Line */}
        <View style={{ height: 2, backgroundColor: '#EA580C', marginVertical: 2 }} />

        {/* Bottom 40% Container Ship Graphic */}
        <View style={{ height: 155, borderRadius: 4, overflow: 'hidden', backgroundColor: '#0B1E3B' }}>
          {assets.realContainerShip ? (
            <Image src={assets.realContainerShip} style={{ width: 842.4 - 60, height: 155, objectFit: 'cover' }} />
          ) : (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 10, color: '#38BDF8' }}>OCEAN CONTAINER VESSEL</Text>
            </View>
          )}
        </View>

        {/* Slide Footer */}
        <View style={styles.footerDark}>
          <Text>JCD FORWARDER 2026 LOGISTICS REPORT / VOL. 1</Text>
          <Text>CHINA TO {destination.toUpperCase()} | LICENSED NVOCC GD20240307220907</Text>
        </View>
      </Page>

      {/* ========================================================================= */}
      {/* SLIDE 2: THE FOUR PILLARS OF LOGISTICS */}
      {/* ========================================================================= */}
      <Page size={[842.4, 470.2]} style={styles.pageLight}>
        <View style={styles.slideHeader}>
          <Text style={styles.headerBrand}>JCD FORWARDER</Text>
          <Text style={styles.headerTag}>Strategic Logistics Report 2026 | China to {destination}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.slideTitle}>
            At a Glance: The Four Pillars of China to {destination} Logistics
          </Text>
          <Text style={styles.slideSubtitle}>
            Comparing core freight modes by speed, pricing predictability, and ideal cargo profile
          </Text>

          {/* Terminal Banner Image */}
          {assets.terminalBanner && (
            <View style={{ width: '100%', height: 70, borderRadius: 4, overflow: 'hidden', marginBottom: 12 }}>
              <Image src={assets.terminalBanner} style={{ width: '100%', height: 70, objectFit: 'cover' }} />
            </View>
          )}

          {/* 4 Pillars Table */}
          <View style={[styles.row, { gap: 8, flex: 1 }]}>
            {/* Col 1: Air Freight */}
            <View style={[styles.card, { flex: 1, borderTopWidth: 3, borderTopColor: '#0284C7' }]}>
              <View style={[styles.row, { alignItems: 'center', marginBottom: 6 }]}>
                <View style={{ backgroundColor: '#E0F2FE', padding: 4, borderRadius: 4, marginRight: 6 }}>
                  <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#0284C7' }}>AIR</Text>
                </View>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#0F2C59' }}>Air Freight</Text>
              </View>
              <View style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 6.8, color: '#64748B' }}>Transit Time</Text>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#0F2C59' }}>{airTransit}</Text>
              </View>
              <View style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 6.8, color: '#64748B' }}>Cost Benchmark</Text>
                <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: '#0284C7' }}>~$3.50 – $7.50 / kg</Text>
              </View>
              <View style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 6.8, color: '#64748B' }}>Best For</Text>
                <Text style={{ fontSize: 7.5, color: '#334155', fontWeight: 'bold' }}>
                  High Value / Fast Turnover (100–1000 kg)
                </Text>
              </View>
              <View style={{ borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 6 }}>
                <Text style={{ fontSize: 6.8, color: '#475569', lineHeight: 1.35 }}>
                  • Direct &amp; consolidated flights{String.fromCharCode(10)}
                  • Customs pre-cleared airborne{String.fromCharCode(10)}
                  • Dedicated airport ramp transfer
                </Text>
              </View>
            </View>

            {/* Col 2: Sea Freight */}
            <View style={[styles.card, { flex: 1, borderTopWidth: 3, borderTopColor: '#059669' }]}>
              <View style={[styles.row, { alignItems: 'center', marginBottom: 6 }]}>
                <View style={{ backgroundColor: '#D1FAE5', padding: 4, borderRadius: 4, marginRight: 6 }}>
                  <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#059669' }}>SEA</Text>
                </View>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#0F2C59' }}>Sea Freight</Text>
              </View>
              <View style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 6.8, color: '#64748B' }}>Transit Time</Text>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#0F2C59' }}>{oceanTransit}</Text>
              </View>
              <View style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 6.8, color: '#64748B' }}>Cost Benchmark</Text>
                <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: '#059669' }}>~$1,150 – $2,850 (20ft)</Text>
              </View>
              <View style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 6.8, color: '#64748B' }}>Best For</Text>
                <Text style={{ fontSize: 7.5, color: '#334155', fontWeight: 'bold' }}>
                  Heavy Bulk / Max Volume / Low Unit Cost
                </Text>
              </View>
              <View style={{ borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 6 }}>
                <Text style={{ fontSize: 6.8, color: '#475569', lineHeight: 1.35 }}>
                  • Direct liner &amp; feeder runs{String.fromCharCode(10)}
                  • FCL containers &amp; LCL grouping{String.fromCharCode(10)}
                  • 14–21 free demurrage days
                </Text>
              </View>
            </View>

            {/* Col 3: Express */}
            <View style={[styles.card, { flex: 1, borderTopWidth: 3, borderTopColor: '#D97706' }]}>
              <View style={[styles.row, { alignItems: 'center', marginBottom: 6 }]}>
                <View style={{ backgroundColor: '#FEF3C7', padding: 4, borderRadius: 4, marginRight: 6 }}>
                  <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#D97706' }}>EXP</Text>
                </View>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#0F2C59' }}>Express Courier</Text>
              </View>
              <View style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 6.8, color: '#64748B' }}>Transit Time</Text>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#0F2C59' }}>{expressTransit}</Text>
              </View>
              <View style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 6.8, color: '#64748B' }}>Cost Benchmark</Text>
                <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: '#D97706' }}>~$22 – $365 (Tiered)</Text>
              </View>
              <View style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 6.8, color: '#64748B' }}>Best For</Text>
                <Text style={{ fontSize: 7.5, color: '#334155', fontWeight: 'bold' }}>
                  Samples &lt;10kg / Prototypes / Critical Docs
                </Text>
              </View>
              <View style={{ borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 6 }}>
                <Text style={{ fontSize: 6.8, color: '#475569', lineHeight: 1.35 }}>
                  • Time-definite courier flights{String.fromCharCode(10)}
                  • Full milestone tracking 24/7{String.fromCharCode(10)}
                  • Priority commercial customs gate
                </Text>
              </View>
            </View>

            {/* Col 4: DDP */}
            <View style={[styles.card, { flex: 1, borderTopWidth: 3, borderTopColor: '#2563EB', backgroundColor: '#F0F7FF' }]}>
              <View style={[styles.row, { alignItems: 'center', marginBottom: 6 }]}>
                <View style={{ backgroundColor: '#DBEAFE', padding: 4, borderRadius: 4, marginRight: 6 }}>
                  <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#2563EB' }}>DDP</Text>
                </View>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#0F2C59' }}>DDP All-Inclusive</Text>
              </View>
              <View style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 6.8, color: '#64748B' }}>Transit Time</Text>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#0F2C59' }}>8–30 Days Door</Text>
              </View>
              <View style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 6.8, color: '#64748B' }}>Cost Benchmark</Text>
                <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: '#2563EB' }}>Fixed Price (All-In)</Text>
              </View>
              <View>
                <Text style={{ fontSize: 6.8, color: '#64748B' }}>Best For</Text>
                <Text style={{ fontSize: 7.5, color: '#0F2C59', fontWeight: 'bold' }}>
                  Hands-off / Zero Customs & Tax Hassle
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Slide Footer */}
        <View style={styles.slideFooter}>
          <Text>JCD FORWARDER 2026 LOGISTICS REPORT | FOUR PILLARS MATRIX</Text>
          <Text>CHINA TO {destination.toUpperCase()} | PAGE 2 OF 15</Text>
        </View>
      </Page>

      {/* ========================================================================= */}
      {/* SLIDE 3: THE LOGISTICS TRILEMMA */}
      {/* ========================================================================= */}
      <Page size={[842.4, 470.2]} style={styles.pageLight}>
        <View style={styles.slideHeader}>
          <Text style={styles.headerBrand}>JCD FORWARDER</Text>
          <Text style={styles.headerTag}>Strategic Trade Decision Framework | China to {destination}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.slideTitle}>The Logistics Trilemma: Defining Your Priority</Text>
          <Text style={styles.slideSubtitle}>
            Balance speed, landed cost, and operational convenience according to your cargo requirements
          </Text>

          <View style={[styles.row, { gap: 14, flex: 1, alignItems: 'center' }]}>
            {/* Left 45% 3D Trilemma Graphic */}
            <View style={{ width: '45%', height: 280, alignItems: 'center', justifyContent: 'center' }}>
              {assets.trilemma3d ? (
                <Image src={assets.trilemma3d} style={{ width: '100%', height: 275, objectFit: 'contain' }} />
              ) : (
                <View style={[styles.card, { width: '100%', height: 250, alignItems: 'center', justifyContent: 'center' }]}>
                  <Text style={{ fontSize: 10, color: '#64748B' }}>3D Logistics Trilemma</Text>
                </View>
              )}
            </View>

            {/* Right 55% Priority Breakdown */}
            <View style={{ width: '53%', display: 'flex', flexDirection: 'column', gap: 7 }}>
              {/* Vertex 1: Transit Time */}
              <View style={[styles.card, { borderLeftWidth: 3, borderLeftColor: '#0284C7' }]}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#0284C7', marginBottom: 2 }}>
                  1. TRANSIT TIME (Speed Priority)
                </Text>
                <Text style={{ fontSize: 7.5, color: '#334155', lineHeight: 1.35 }}>
                  • Criticality of delivery to {destination}: 3–5 days (Air) vs. 25–35 days (Ocean)?{'\n'}
                  • Does stockout risk justify higher freight cost per unit to protect sales velocity?
                </Text>
              </View>

              {/* Vertex 2: Budget Strategy */}
              <View style={[styles.card, { borderLeftWidth: 3, borderLeftColor: '#059669' }]}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#059669', marginBottom: 2 }}>
                  2. BUDGET STRATEGY (Cost Optimization)
                </Text>
                <Text style={{ fontSize: 7.5, color: '#334155', lineHeight: 1.35 }}>
                  • Optimizing for Margin (Ocean FCL/LCL) vs. Turnover (Air Freight)?{'\n'}
                  • Heavy and bulky products demand ocean transport to maintain retail margins.
                </Text>
              </View>

              {/* Vertex 3: Convenience */}
              <View style={[styles.card, { borderLeftWidth: 3, borderLeftColor: '#2563EB' }]}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#2563EB', marginBottom: 2 }}>
                  3. CONVENIENCE (A-Z Service)
                </Text>
                <Text style={{ fontSize: 7.5, color: '#334155', lineHeight: 1.35 }}>
                  • Self-managed clearance with {customsAuth} vs. 100% hands-off DDP?{'\n'}
                  • DDP eliminates bond requirements, customs brokerage, and local delivery friction.
                </Text>
              </View>

              {/* Bottom Insight Callout */}
              <View style={styles.calloutOrange}>
                <Text style={{ fontSize: 7.8, fontWeight: 'bold', color: '#C2410C', marginBottom: 2 }}>
                  STRATEGIC INSIGHT FOR IMPORTERS
                </Text>
                <Text style={{ fontSize: 7.2, color: '#9A3412', lineHeight: 1.35 }}>
                  Choosing the right method is always a trade-off. There is no single universal "best" method, only the optimal balance for your specific volume, timeline, and cash flow when shipping to {destination}.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Slide Footer */}
        <View style={styles.slideFooter}>
          <Text>JCD FORWARDER 2026 LOGISTICS REPORT | THE LOGISTICS TRILEMMA</Text>
          <Text>CHINA TO {destination.toUpperCase()} | PAGE 3 OF 15</Text>
        </View>
      </Page>

      {/* ========================================================================= */}
      {/* SLIDE 4: AIR FREIGHT STRATEGY */}
      {/* ========================================================================= */}
      <Page size={[842.4, 470.2]} style={styles.pageLight}>
        <View style={styles.slideHeader}>
          <Text style={styles.headerBrand}>JCD FORWARDER</Text>
          <Text style={styles.headerTag}>Air Cargo Operations | China to {destination}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }]}>
            <View>
              <Text style={styles.slideTitle}>Air Freight Strategy: Speed meets Agility</Text>
              <Text style={styles.slideSubtitle}>
                Rapid trans-regional flight connections from China hubs to {destination} gateways
              </Text>
            </View>
            <View style={{ backgroundColor: '#E0F2FE', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4 }}>
              <Text style={{ fontSize: 7.5, fontWeight: 'bold', color: '#0369A1' }}>
                CORE USE: 100kg–1000kg | Speed: {airTransit}
              </Text>
            </View>
          </View>

          <View style={[styles.row, { gap: 12, flex: 1 }]}>
            {/* Left 50% Corridors & Technical Specs */}
            <View style={[styles.card, { flex: 1 }]}>
              <Text style={{ fontSize: 10.5, fontWeight: 'bold', color: '#0F2C59', marginBottom: 6 }}>
                Primary Flight Corridors to {destination}
              </Text>

              <View style={{ marginBottom: 8, backgroundColor: '#F8FAFC', padding: 6, borderRadius: 4 }}>
                <Text style={{ fontSize: 7.2, color: '#64748B' }}>Origin Departure Hubs (China):</Text>
                <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#0F2C59' }}>
                  Shenzhen (SZX) • Guangzhou (CAN) • Shanghai (PVG) • Hong Kong (HKG)
                </Text>
              </View>

              <View style={{ marginBottom: 8, backgroundColor: '#F8FAFC', padding: 6, borderRadius: 4 }}>
                <Text style={{ fontSize: 7.2, color: '#64748B' }}>Destination Gateways in {destination}:</Text>
                <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#0284C7' }}>
                  {route.mainAirports.slice(0, 4).join(' • ')}
                </Text>
              </View>

              <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#0F2C59', marginBottom: 4 }}>
                Standard Operational Rules:
              </Text>
              <Text style={{ fontSize: 7.5, color: '#334155', lineHeight: 1.45 }}>
                • <Text style={{ fontWeight: 'bold' }}>Chargeable Weight Divisor:</Text> Volumetric Weight (kg) = L x W x H (cm) / 6000.{'\n'}
                • <Text style={{ fontWeight: 'bold' }}>Pre-Clearance Protocol:</Text> Electronic customs declaration submitted while flight is en route.{'\n'}
                • <Text style={{ fontWeight: 'bold' }}>DG & Battery Cargo:</Text> Pure lithium batteries and power banks routed via dedicated HKG freighters with UN38.3 & MSDS approval.{'\n'}
                • <Text style={{ fontWeight: 'bold' }}>Pallet Security:</Text> Built-Up Pallet (BUP) units sealed at origin hub for zero airport pilferage.
              </Text>
            </View>

            {/* Right 50% Strategic Advice & Proximity Map */}
            <View style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <View style={styles.calloutOrange}>
                <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: '#C2410C', marginBottom: 4 }}>
                  STRATEGIC ADVICE: AIRPORT PROXIMITY
                </Text>
                <Text style={{ fontSize: 8, color: '#9A3412', lineHeight: 1.4 }}>
                  Always select the {destination} international airport closest to your final warehouse ({primaryAirport}).{'\n\n'}
                  Domestic long-haul linehaul trucking across {destination} from a distant airport can cost more than the original flight and destroy international speed advantages!
                </Text>
              </View>

              <View style={[styles.card, { backgroundColor: '#F1F5F9', flex: 1, marginTop: 8, padding: 8 }]}>
                <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#0F2C59', marginBottom: 4 }}>
                  Airline Carrier Network to {destination}
                </Text>
                <Text style={{ fontSize: 7.5, color: '#475569', lineHeight: 1.4 }}>
                  • <Text style={{ fontWeight: 'bold' }}>Flag Carriers:</Text> Air China Cargo (CA), China Southern (CZ), China Eastern (MU).{'\n'}
                  • <Text style={{ fontWeight: 'bold' }}>International Freighters:</Text> Cathay Cargo, Lufthansa, Singapore Airlines Cargo, Emirates SkyCargo.{'\n'}
                  • <Text style={{ fontWeight: 'bold' }}>Express Airfreight:</Text> FedEx, UPS, and DHL scheduled chartered capacities for guaranteed time-definite arrivals.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Slide Footer */}
        <View style={styles.slideFooter}>
          <Text>JCD FORWARDER 2026 LOGISTICS REPORT | AIR FREIGHT STRATEGY</Text>
          <Text>CHINA TO {destination.toUpperCase()} | PAGE 4 OF 15</Text>
        </View>
      </Page>

      {/* ========================================================================= */}
      {/* SLIDE 5: AIR FREIGHT COST BENCHMARKS */}
      {/* ========================================================================= */}
      <Page size={[842.4, 470.2]} style={styles.pageLight}>
        <View style={styles.slideHeader}>
          <Text style={styles.headerBrand}>JCD FORWARDER</Text>
          <Text style={styles.headerTag}>Market Benchmark Indices | China to {destination}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.slideTitle}>2026 Air Freight Cost Benchmarks</Text>
          <Text style={styles.slideSubtitle}>
            *Rates are 2026 baseline market estimates. Specific quotes depend on cargo density, fuel indices, and carrier capacity.
          </Text>

          <View style={[styles.row, { gap: 12, flex: 1 }]}>
            {/* Ticket Card 1: Express Corridor */}
            <View style={[styles.card, { flex: 1, padding: 8 }]}>
              <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }]}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#0F2C59' }}>
                  Express Air Corridor (SZX / HKG to {primaryAirport})
                </Text>
                <View style={styles.badgeBlue}>
                  <Text style={{ color: '#FFFFFF', fontSize: 6.5 }}>DIRECT 3–5 DAYS</Text>
                </View>
              </View>

              {assets.cargoFreighter && (
                <View style={{ width: '100%', height: 110, borderRadius: 4, overflow: 'hidden', marginBottom: 6 }}>
                  <Image src={assets.cargoFreighter} style={{ width: '100%', height: 110, objectFit: 'cover' }} />
                </View>
              )}

              <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#0F2C59', marginBottom: 2 }}>
                Primary Airlines: China Southern (CZ), Air China (CA), Cathay (CX)
              </Text>

              <View style={{ backgroundColor: '#F8FAFC', padding: 6, borderRadius: 4, marginTop: 4 }}>
                <Text style={{ fontSize: 7.2, color: '#334155', lineHeight: 1.4 }}>
                  • <Text style={{ fontWeight: 'bold' }}>+100kg tier:</Text> ~$4.50 – $7.50 / kg{'\n'}
                  • <Text style={{ fontWeight: 'bold' }}>+500kg tier:</Text> ~$4.10 – $6.20 / kg{'\n'}
                  • <Text style={{ fontWeight: 'bold' }}>+1000kg tier:</Text> ~$3.60 – $5.40 / kg
                </Text>
              </View>
            </View>

            {/* Ticket Card 2: Consolidation Corridor */}
            <View style={[styles.card, { flex: 1, padding: 8 }]}>
              <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }]}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#0F2C59' }}>
                  Standard Consolidation (PVG / CAN to {secondaryAirport})
                </Text>
                <View style={styles.badgeOrange}>
                  <Text style={{ color: '#FFFFFF', fontSize: 6.5 }}>ECONOMY 5–7 DAYS</Text>
                </View>
              </View>

              {assets.portYard && (
                <View style={{ width: '100%', height: 110, borderRadius: 4, overflow: 'hidden', marginBottom: 6 }}>
                  <Image src={assets.portYard} style={{ width: '100%', height: 110, objectFit: 'cover' }} />
                </View>
              )}

              <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#0F2C59', marginBottom: 2 }}>
                Primary Airlines: China Eastern (MU), EVA Air (BR), Singapore Cargo
              </Text>

              <View style={{ backgroundColor: '#F8FAFC', padding: 6, borderRadius: 4, marginTop: 4 }}>
                <Text style={{ fontSize: 7.2, color: '#334155', lineHeight: 1.4 }}>
                  • <Text style={{ fontWeight: 'bold' }}>+100kg tier:</Text> ~$3.90 – $6.80 / kg{'\n'}
                  • <Text style={{ fontWeight: 'bold' }}>+500kg tier:</Text> ~$3.50 – $5.60 / kg{'\n'}
                  • <Text style={{ fontWeight: 'bold' }}>+1000kg scale efficiency:</Text> ~$3.20 – $4.90 / kg
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Slide Footer */}
        <View style={styles.slideFooter}>
          <Text>JCD FORWARDER 2026 LOGISTICS REPORT | AIR BENCHMARKS</Text>
          <Text>CHINA TO {destination.toUpperCase()} | PAGE 5 OF 15</Text>
        </View>
      </Page>

      {/* ========================================================================= */}
      {/* SLIDE 6: SEA FREIGHT & CONTAINER CAPACITIES */}
      {/* ========================================================================= */}
      <Page size={[842.4, 470.2]} style={styles.pageLight}>
        <View style={styles.slideHeader}>
          <Text style={styles.headerBrand}>JCD FORWARDER</Text>
          <Text style={styles.headerTag}>Ocean Freight Infrastructure | China to {destination}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.slideTitle}>Sea Freight: The Engine of Global Commerce</Text>
          <Text style={styles.slideSubtitle}>
            Understanding FCL (Full Container Load) capacities, payload thresholds & dimensions
          </Text>

          {/* 3D Container Specs Visual */}
          {assets.containers3dSpecs && (
            <View style={{ width: '100%', height: 215, alignItems: 'center', justifyContent: 'center' }}>
              <Image src={assets.containers3dSpecs} style={{ width: '100%', height: 215, objectFit: 'contain' }} />
            </View>
          )}

          {/* Container Breakdown Badges */}
          <View style={[styles.row, { gap: 8, marginTop: 6 }]}>
            <View style={[styles.card, { flex: 1, padding: 6 }]}>
              <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#0F2C59' }}>20ft Standard Container</Text>
              <Text style={{ fontSize: 7.2, color: '#0284C7', fontWeight: 'bold' }}>~28–33 CBM | Max ~28,000 kg</Text>
              <Text style={{ fontSize: 6.8, color: '#64748B', marginTop: 2 }}>
                Best for heavy, dense industrial goods, minerals, liquids, and machine components.
              </Text>
            </View>

            <View style={[styles.card, { flex: 1, padding: 6 }]}>
              <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#0F2C59' }}>40ft Standard Container</Text>
              <Text style={{ fontSize: 7.2, color: '#0284C7', fontWeight: 'bold' }}>~58–67 CBM | Max ~26,500 kg</Text>
              <Text style={{ fontSize: 6.8, color: '#64748B', marginTop: 2 }}>
                Standard commercial workhorse for consumer packaged retail goods and apparel.
              </Text>
            </View>

            <View style={[styles.card, { flex: 1, padding: 6 }]}>
              <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#0F2C59' }}>40ft High Cube (40HQ)</Text>
              <Text style={{ fontSize: 7.2, color: '#0284C7', fontWeight: 'bold' }}>~68–76 CBM | Max ~26,500 kg</Text>
              <Text style={{ fontSize: 6.8, color: '#64748B', marginTop: 2 }}>
                Extra height for bulky, lightweight goods (furniture, plastics, palletized cartons).
              </Text>
            </View>
          </View>

          {/* Timeline Bar */}
          <View style={{ backgroundColor: '#EFF6FF', borderRadius: 4, padding: 5, marginTop: 8 }}>
            <Text style={{ fontSize: 7.5, color: '#1E40AF', textAlign: 'center', fontWeight: 'bold' }}>
              Transit Benchmarks to {destination}: {oceanTransit} (Direct Carrier Run vs. Transshipment)
            </Text>
          </View>
        </View>

        {/* Slide Footer */}
        <View style={styles.slideFooter}>
          <Text>JCD FORWARDER 2026 LOGISTICS REPORT | SEA FREIGHT CAPACITIES</Text>
          <Text>CHINA TO {destination.toUpperCase()} | PAGE 6 OF 15</Text>
        </View>
      </Page>

      {/* ========================================================================= */}
      {/* SLIDE 7: 2026 FCL RATE LANDSCAPE: GATEWAY PORTS */}
      {/* ========================================================================= */}
      <Page size={[842.4, 470.2]} style={styles.pageLight}>
        <View style={styles.slideHeader}>
          <Text style={styles.headerBrand}>JCD FORWARDER</Text>
          <Text style={styles.headerTag}>Maritime Gateways | China to {destination}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.slideTitle}>2026 FCL Rate Landscape: Gateways to {destination}</Text>
          <Text style={styles.slideSubtitle}>
            Ocean container rate benchmarks from major China departure ports (Shenzhen, Shanghai, Ningbo)
          </Text>

          <View style={[styles.row, { gap: 10, flex: 1 }]}>
            {/* Gateway 1 */}
            <View style={[styles.card, { flex: 1, borderTopWidth: 3, borderTopColor: '#0284C7' }]}>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#0F2C59', marginBottom: 2 }}>
                {primarySeaport}
              </Text>
              <Text style={{ fontSize: 7, color: '#64748B', marginBottom: 6 }}>Primary Gateway</Text>
              <View style={{ backgroundColor: '#F8FAFC', padding: 6, borderRadius: 4, marginBottom: 6 }}>
                <Text style={{ fontSize: 6.8, color: '#64748B' }}>20ft FCL Benchmark:</Text>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#0F2C59' }}>~$1,150 – $2,450</Text>
              </View>
              <View style={{ backgroundColor: '#F8FAFC', padding: 6, borderRadius: 4, marginBottom: 6 }}>
                <Text style={{ fontSize: 6.8, color: '#64748B' }}>40ft / 40HQ Benchmark:</Text>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#0284C7' }}>~$2,150 – $3,850</Text>
              </View>
              <Text style={{ fontSize: 7.2, color: '#334155' }}>
                • Direct fast liner service{'\n'}
                • Transit: {oceanTransit}{'\n'}
                • Automated terminal clearance
              </Text>
            </View>

            {/* Gateway 2 */}
            <View style={[styles.card, { flex: 1, borderTopWidth: 3, borderTopColor: '#059669' }]}>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#0F2C59', marginBottom: 2 }}>
                {secondarySeaport}
              </Text>
              <Text style={{ fontSize: 7, color: '#64748B', marginBottom: 6 }}>Secondary Gateway</Text>
              <View style={{ backgroundColor: '#F8FAFC', padding: 6, borderRadius: 4, marginBottom: 6 }}>
                <Text style={{ fontSize: 6.8, color: '#64748B' }}>20ft FCL Benchmark:</Text>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#0F2C59' }}>~$1,350 – $2,750</Text>
              </View>
              <View style={{ backgroundColor: '#F8FAFC', padding: 6, borderRadius: 4, marginBottom: 6 }}>
                <Text style={{ fontSize: 6.8, color: '#64748B' }}>40ft / 40HQ Benchmark:</Text>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#059669' }}>~$2,450 – $4,150</Text>
              </View>
              <Text style={{ fontSize: 7.2, color: '#334155' }}>
                • Regional consolidation hub{'\n'}
                • Rail/drayage inland connections{'\n'}
                • Competitive storage rates
              </Text>
            </View>

            {/* Gateway 3 */}
            <View style={[styles.card, { flex: 1, borderTopWidth: 3, borderTopColor: '#D97706' }]}>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#0F2C59', marginBottom: 2 }}>
                {tertiarySeaport}
              </Text>
              <Text style={{ fontSize: 7, color: '#64748B', marginBottom: 6 }}>Alternative Corridor</Text>
              <View style={{ backgroundColor: '#F8FAFC', padding: 6, borderRadius: 4, marginBottom: 6 }}>
                <Text style={{ fontSize: 6.8, color: '#64748B' }}>20ft FCL Benchmark:</Text>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#0F2C59' }}>~$1,550 – $3,150</Text>
              </View>
              <View style={{ backgroundColor: '#F8FAFC', padding: 6, borderRadius: 4, marginBottom: 6 }}>
                <Text style={{ fontSize: 6.8, color: '#64748B' }}>40ft / 40HQ Benchmark:</Text>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#D97706' }}>~$2,750 – $4,550</Text>
              </View>
              <Text style={{ fontSize: 7.2, color: '#334155' }}>
                • Direct inland terminal links{'\n'}
                • Lower port congestion risk{'\n'}
                • Specialized heavy lift berths
              </Text>
            </View>
          </View>

          {/* Demurrage & Detention Protection Banner */}
          <View style={[styles.calloutOrange, { marginTop: 10 }]}>
            <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#C2410C', marginBottom: 2 }}>
              JCD DEMURRAGE & DETENTION ADVANTAGE
            </Text>
            <Text style={{ fontSize: 7.2, color: '#9A3412', lineHeight: 1.35 }}>
              Standard ocean carriers provide only 3 to 5 free demurrage days at destination ports. JCD Forwarder secures 14 to 21 free demurrage and detention days under our service contracts, protecting your business against unexpected port congestion fees.
            </Text>
          </View>
        </View>

        {/* Slide Footer */}
        <View style={styles.slideFooter}>
          <Text>JCD FORWARDER 2026 LOGISTICS REPORT | FCL GATEWAYS</Text>
          <Text>CHINA TO {destination.toUpperCase()} | PAGE 7 OF 15</Text>
        </View>
      </Page>

      {/* ========================================================================= */}
      {/* SLIDE 8: LCL SHIPPING & CONSOLIDATION */}
      {/* ========================================================================= */}
      <Page size={[842.4, 470.2]} style={styles.pageLight}>
        <View style={styles.slideHeader}>
          <Text style={styles.headerBrand}>JCD FORWARDER</Text>
          <Text style={styles.headerTag}>LCL Consolidation Solutions | China to {destination}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.slideTitle}>LCL Shipping: Volume Efficiency for Smaller Loads</Text>
          <Text style={styles.slideSubtitle}>
            Consolidated container freight for shipments between 1 CBM and 15 CBM
          </Text>

          <View style={[styles.row, { gap: 12, flex: 1, alignItems: 'center' }]}>
            {/* Left 52% LCL Open Box Graphic */}
            <View style={{ width: '50%', height: 250, alignItems: 'center', justifyContent: 'center' }}>
              {assets.lclOpenBox ? (
                <Image src={assets.lclOpenBox} style={{ width: '100%', height: 245, objectFit: 'contain' }} />
              ) : (
                <View style={[styles.card, { width: '100%', height: 220, alignItems: 'center', justifyContent: 'center' }]}>
                  <Text style={{ fontSize: 10, color: '#64748B' }}>LCL Container Consolidation</Text>
                </View>
              )}
            </View>

            {/* Right 48% LCL Principles & Rate Benchmarks */}
            <View style={{ width: '48%', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <View style={styles.card}>
                <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: '#0F2C59', marginBottom: 2 }}>
                  Sharing the Box: Pay Only for CBM Used
                </Text>
                <Text style={{ fontSize: 7.2, color: '#334155', lineHeight: 1.35 }}>
                  LCL groups multiple cargo consignments into a shared 40HQ container. You only pay for the exact volume (CBM) your cargo occupies, eliminating the cost of empty space.
                </Text>
              </View>

              <View style={styles.card}>
                <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: '#0F2C59', marginBottom: 2 }}>
                  Operational Trade-Off
                </Text>
                <Text style={{ fontSize: 7.2, color: '#334155', lineHeight: 1.35 }}>
                  While LCL offers significant cost savings over air freight, it requires an additional 5–7 working days for CFS origin pallet stuffing and destination deconsolidation.
                </Text>
              </View>

              {/* LCL Benchmark Rates Table */}
              <View style={[styles.card, { backgroundColor: '#F8FAFC' }]}>
                <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#0F2C59', marginBottom: 4 }}>
                  2026 Cost Per CBM Benchmarks (China to {destination})
                </Text>
                <View style={[styles.row, { justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', paddingBottom: 2, marginBottom: 2 }]}>
                  <Text style={{ fontSize: 7, color: '#64748B' }}>Guangzhou / Shenzhen to {primarySeaport}:</Text>
                  <Text style={{ fontSize: 7.5, fontWeight: 'bold', color: '#059669' }}>~$180 – $280 / CBM</Text>
                </View>
                <View style={[styles.row, { justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', paddingBottom: 2, marginBottom: 2 }]}>
                  <Text style={{ fontSize: 7, color: '#64748B' }}>Shanghai / Ningbo to {secondarySeaport}:</Text>
                  <Text style={{ fontSize: 7.5, fontWeight: 'bold', color: '#0284C7' }}>~$210 – $320 / CBM</Text>
                </View>
                <View style={[styles.row, { justifyContent: 'space-between' }]}>
                  <Text style={{ fontSize: 7, color: '#64748B' }}>Xiamen / Qingdao to {tertiarySeaport}:</Text>
                  <Text style={{ fontSize: 7.5, fontWeight: 'bold', color: '#D97706' }}>~$240 – $360 / CBM</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Slide Footer */}
        <View style={styles.slideFooter}>
          <Text>JCD FORWARDER 2026 LOGISTICS REPORT | LCL CONSOLIDATION</Text>
          <Text>CHINA TO {destination.toUpperCase()} | PAGE 8 OF 15</Text>
        </View>
      </Page>

      {/* ========================================================================= */}
      {/* SLIDE 9: EXPRESS COURIER SOLUTIONS */}
      {/* ========================================================================= */}
      <Page size={[842.4, 470.2]} style={styles.pageLight}>
        <View style={styles.slideHeader}>
          <Text style={styles.headerBrand}>JCD FORWARDER</Text>
          <Text style={styles.headerTag}>Express Delivery Network | China to {destination}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.slideTitle}>Express Courier: The 'Sample & Emergency' Solution</Text>
          <Text style={styles.slideSubtitle}>
            Fastest door-to-door delivery for parcels under 10kg, product prototypes, and critical documents
          </Text>

          <View style={[styles.row, { gap: 14, flex: 1 }]}>
            {/* Left 50% Rate Curve & Carrier Tier */}
            <View style={[styles.card, { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }]}>
              <View>
                <Text style={{ fontSize: 10.5, fontWeight: 'bold', color: '#0F2C59', marginBottom: 6 }}>
                  Weight vs. Cost Progression Curve
                </Text>
                <View style={{ backgroundColor: '#F8FAFC', padding: 8, borderRadius: 4, marginBottom: 8 }}>
                  <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 4 }]}>
                    <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#0F2C59' }}>1 kg Envelope / Small Box:</Text>
                    <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#0284C7' }}>~$22 – $55</Text>
                  </View>
                  <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 4 }]}>
                    <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#0F2C59' }}>5 kg Prototype Carton:</Text>
                    <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#0284C7' }}>~$65 – $120</Text>
                  </View>
                  <View style={[styles.row, { justifyContent: 'space-between' }]}>
                    <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#0F2C59' }}>10 kg Urgent Stock Box:</Text>
                    <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#0284C7' }}>~$135 – $240</Text>
                  </View>
                </View>

                <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#0F2C59', marginBottom: 4 }}>
                  Supported Global Carrier Networks:
                </Text>
                <Text style={{ fontSize: 7.5, color: '#334155', lineHeight: 1.4 }}>
                  • <Text style={{ fontWeight: 'bold' }}>DHL Express:</Text> Fastest European and Asian customs clearance.{'\n'}
                  • <Text style={{ fontWeight: 'bold' }}>FedEx Priority:</Text> Direct Trans-Pacific priority hub sorting.{'\n'}
                  • <Text style={{ fontWeight: 'bold' }}>UPS Worldwide Saver:</Text> Outstanding North American commercial delivery.{'\n'}
                  • <Text style={{ fontWeight: 'bold' }}>YunExpress / HSD:</Text> Economical postal injection for cross-border e-commerce.
                </Text>
              </View>

              <View style={{ backgroundColor: '#FEF3C7', padding: 6, borderRadius: 4 }}>
                <Text style={{ fontSize: 7.5, fontWeight: 'bold', color: '#92400E' }}>
                  JCD Corporate Discount: Up to 60% off public counter retail prices.
                </Text>
              </View>
            </View>

            {/* Right 50% Use Cases & Best Practices */}
            <View style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <View style={[styles.card, { borderLeftWidth: 3, borderLeftColor: '#D97706' }]}>
                <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: '#0F2C59', marginBottom: 3 }}>
                  When is Express Courier the Correct Choice?
                </Text>
                <Text style={{ fontSize: 7.5, color: '#334155', lineHeight: 1.4 }}>
                  • <Text style={{ fontWeight: 'bold' }}>Pre-Production Golden Samples:</Text> Approving factory tooling and materials before launching full production.{'\n'}
                  • <Text style={{ fontWeight: 'bold' }}>Critical Equipment Downtime:</Text> Replacement parts needed immediately to prevent assembly line stoppage.{'\n'}
                  • <Text style={{ fontWeight: 'bold' }}>Original Documents:</Text> Bills of Lading, Certificates of Origin, and legal paperwork.
                </Text>
              </View>

              <View style={[styles.card, { borderLeftWidth: 3, borderLeftColor: '#2563EB' }]}>
                <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: '#0F2C59', marginBottom: 3 }}>
                  Express Volumetric Calculation
                </Text>
                <Text style={{ fontSize: 7.5, color: '#334155', lineHeight: 1.4 }}>
                  Courier networks use a higher volumetric divisor than standard air freight:{'\n'}
                  <Text style={{ fontWeight: 'bold', color: '#2563EB' }}>
                    Volumetric Weight (kg) = Length x Width x Height (cm) / 5000
                  </Text>
                  {'\n'}Always compact packaging to avoid paying for dimensional air weight.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Slide Footer */}
        <View style={styles.slideFooter}>
          <Text>JCD FORWARDER 2026 LOGISTICS REPORT | EXPRESS COURIER</Text>
          <Text>CHINA TO {destination.toUpperCase()} | PAGE 9 OF 15</Text>
        </View>
      </Page>

      {/* ========================================================================= */}
      {/* SLIDE 10: DDP SHIPPING PROCESS & CONDUIT */}
      {/* ========================================================================= */}
      <Page size={[842.4, 470.2]} style={styles.pageLight}>
        <View style={styles.slideHeader}>
          <Text style={styles.headerBrand}>JCD FORWARDER</Text>
          <Text style={styles.headerTag}>DDP Turnkey Solutions | China to {destination}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.slideTitle}>DDP Shipping: The Frictionless 'Door-to-Door' Standard</Text>
          <Text style={styles.slideSubtitle}>
            Value Proposition: We handle everything from Chinese supplier pickup to your doorstep in {destination}
          </Text>

          {/* DDP Conduit Flow Graphic */}
          {assets.ddpConduitFlow && (
            <View style={{ width: '100%', height: 180, alignItems: 'center', justifyContent: 'center', marginVertical: 6 }}>
              <Image src={assets.ddpConduitFlow} style={{ width: '100%', height: 180, objectFit: 'contain' }} />
            </View>
          )}

          {/* 4 Process Step Descriptions */}
          <View style={[styles.row, { gap: 8, marginTop: 4 }]}>
            <View style={[styles.card, { flex: 1, padding: 6 }]}>
              <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#0F2C59' }}>1. Origin Pickup</Text>
              <Text style={{ fontSize: 6.8, color: '#334155', marginTop: 2 }}>
                Factory collection across Shenzhen, Ningbo, Yiwu, Guangzhou & consolidated at JCD warehouse.
              </Text>
            </View>

            <View style={[styles.card, { flex: 1, padding: 6 }]}>
              <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#0F2C59' }}>2. Transit</Text>
              <Text style={{ fontSize: 6.8, color: '#334155', marginTop: 2 }}>
                Direct air flight or priority ocean container shipping with real-time GPS tracking.
              </Text>
            </View>

            <View style={[styles.card, { flex: 1, padding: 6 }]}>
              <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#0F2C59' }}>3. Customs & Tax</Text>
              <Text style={{ fontSize: 6.8, color: '#334155', marginTop: 2 }}>
                Cleared with {customsAuth}. Tariffs & VAT/GST ({vatGst}) fully prepaid by JCD.
              </Text>
            </View>

            <View style={[styles.card, { flex: 1, padding: 6 }]}>
              <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#0F2C59' }}>4. Final Mile Door</Text>
              <Text style={{ fontSize: 6.8, color: '#334155', marginTop: 2 }}>
                Direct truck linehaul or courier to your private warehouse or Amazon FBA center in {destination}.
              </Text>
            </View>
          </View>

          {/* Value Banner */}
          <View style={[styles.calloutOrange, { marginTop: 8 }]}>
            <Text style={{ fontSize: 7.5, fontWeight: 'bold', color: '#C2410C', textAlign: 'center' }}>
              Eliminates surprise demurrage fees, complex tariff classification disputes, and customs broker coordination.
            </Text>
          </View>
        </View>

        {/* Slide Footer */}
        <View style={styles.slideFooter}>
          <Text>JCD FORWARDER 2026 LOGISTICS REPORT | DDP CONDUIT FLOW</Text>
          <Text>CHINA TO {destination.toUpperCase()} | PAGE 10 OF 15</Text>
        </View>
      </Page>

      {/* ========================================================================= */}
      {/* SLIDE 11: DDP ECONOMICS: AIR VS SEA */}
      {/* ========================================================================= */}
      <Page size={[842.4, 470.2]} style={styles.pageLight}>
        <View style={styles.slideHeader}>
          <Text style={styles.headerBrand}>JCD FORWARDER</Text>
          <Text style={styles.headerTag}>DDP Pricing Economics | China to {destination}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.slideTitle}>DDP Economics: Balancing Speed vs. Cost to {destination}</Text>
          <Text style={styles.slideSubtitle}>
            Comparing all-inclusive DDP Air and DDP Sea Door-to-Door pricing models
          </Text>

          <View style={[styles.row, { gap: 14, flex: 1 }]}>
            {/* Card 1: DDP Air */}
            <View style={[styles.card, { flex: 1, borderTopWidth: 4, borderTopColor: '#0284C7', padding: 12 }]}>
              <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }]}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#0F2C59' }}>DDP AIR (Fast)</Text>
                <View style={styles.badgeBlue}>
                  <Text style={{ color: '#FFFFFF', fontSize: 7 }}>SPEED PRIORITY</Text>
                </View>
              </View>

              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#0284C7', marginBottom: 4 }}>
                ~$7.20 – $8.50 / kg
              </Text>
              <Text style={{ fontSize: 8, color: '#64748B', marginBottom: 12 }}>
                All-Inclusive: Airfreight + Customs + Tariffs + Final Doorstep Delivery
              </Text>

              <View style={{ backgroundColor: '#F8FAFC', padding: 8, borderRadius: 4, marginBottom: 10 }}>
                <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#0F2C59', marginBottom: 2 }}>
                  Transit: {ddpAirTransit}
                </Text>
                <Text style={{ fontSize: 7.2, color: '#64748B' }}>
                  Best for: Stockouts, new product launches, high-margin consumer SKUs.
                </Text>
              </View>

              <Text style={{ fontSize: 7.5, color: '#334155', lineHeight: 1.45 }}>
                • Daily departures from Shenzhen (SZX) and Hong Kong (HKG){'\n'}
                • No customs bond or importer registration required{'\n'}
                • Direct injection into national courier networks (UPS / FedEx / DHL)
              </Text>
            </View>

            {/* Card 2: DDP Sea */}
            <View style={[styles.card, { flex: 1, borderTopWidth: 4, borderTopColor: '#059669', padding: 12 }]}>
              <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }]}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#0F2C59' }}>DDP SEA (Economical)</Text>
                <View style={[styles.badgeOrange, { backgroundColor: '#059669' }]}>
                  <Text style={{ color: '#FFFFFF', fontSize: 7 }}>MAX MARGIN</Text>
                </View>
              </View>

              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#059669', marginBottom: 4 }}>
                ~$1.30 – $2.10 / kg
              </Text>
              <Text style={{ fontSize: 8, color: '#64748B', marginBottom: 12 }}>
                All-Inclusive: Ocean Freight + Drayage + Customs Duties + Tailgate Delivery
              </Text>

              <View style={{ backgroundColor: '#F8FAFC', padding: 8, borderRadius: 4, marginBottom: 10 }}>
                <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#0F2C59', marginBottom: 2 }}>
                  Transit: {ddpSeaTransit}
                </Text>
                <Text style={{ fontSize: 7.2, color: '#64748B' }}>
                  Best for: Regular inventory replenishment, heavy items, Amazon FBA bulk stock.
                </Text>
              </View>

              <Text style={{ fontSize: 7.5, color: '#334155', lineHeight: 1.45 }}>
                • Fixed CBM or per-kg pricing without surprise dock fees{'\n'}
                • Palletized and shrink-wrapped at port CFS warehouse{'\n'}
                • Direct scheduled appointments at {fbaWarehouses[0] || 'Amazon FBA centers'}
              </Text>
            </View>
          </View>

          {/* Battery goods footnote */}
          <View style={{ backgroundColor: '#F1F5F9', borderRadius: 4, padding: 5, marginTop: 8 }}>
            <Text style={{ fontSize: 7, color: '#64748B', textAlign: 'center' }}>
              Dangerous Goods (DG): Lithium battery products accepted via certified specialized DG vessels (Sea DDP surcharge ~150–200 USD/CBM).
            </Text>
          </View>
        </View>

        {/* Slide Footer */}
        <View style={styles.slideFooter}>
          <Text>JCD FORWARDER 2026 LOGISTICS REPORT | DDP ECONOMICS</Text>
          <Text>CHINA TO {destination.toUpperCase()} | PAGE 11 OF 15</Text>
        </View>
      </Page>

      {/* ========================================================================= */}
      {/* SLIDE 12: EXECUTION & MILESTONE TRACKING */}
      {/* ========================================================================= */}
      <Page size={[842.4, 470.2]} style={styles.pageLight}>
        <View style={styles.slideHeader}>
          <Text style={styles.headerBrand}>JCD FORWARDER</Text>
          <Text style={styles.headerTag}>Execution & Telemetry | China to {destination}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.slideTitle}>Execution: Streamlined Requirements & Tracking</Text>
          <Text style={styles.slideSubtitle}>
            What documents you need to supply & how your shipment is tracked from factory to delivery
          </Text>

          <View style={[styles.row, { gap: 12, flex: 1, alignItems: 'center' }]}>
            {/* Left 40% Document Checklist */}
            <View style={{ width: '40%', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#0F2C59' }}>Required Documents</Text>

              <View style={[styles.card, { borderLeftWidth: 3, borderLeftColor: '#0284C7' }]}>
                <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#0F2C59' }}>1. Commercial Invoice</Text>
                <Text style={{ fontSize: 7, color: '#64748B', marginTop: 1 }}>
                  Detailed item descriptions, HS codes, unit quantities, and declared currency values.
                </Text>
              </View>

              <View style={[styles.card, { borderLeftWidth: 3, borderLeftColor: '#059669' }]}>
                <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#0F2C59' }}>2. Packing List</Text>
                <Text style={{ fontSize: 7, color: '#64748B', marginTop: 1 }}>
                  Gross weight, net weight, carton dimensions, and total piece breakdown.
                </Text>
              </View>

              <View style={[styles.card, { borderLeftWidth: 3, borderLeftColor: '#D97706' }]}>
                <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#0F2C59' }}>3. Seller Contact & Address</Text>
                <Text style={{ fontSize: 7, color: '#64748B', marginTop: 1 }}>
                  Factory pickup address in China and final delivery address in {destination}.
                </Text>
              </View>

              <View style={styles.calloutOrange}>
                <Text style={{ fontSize: 7.2, fontWeight: 'bold', color: '#C2410C' }}>
                  No Import License or Customs Bond required for DDP orders.
                </Text>
              </View>
            </View>

            {/* Center 28% Smartphone Mockup */}
            <View style={{ width: '28%', height: 280, alignItems: 'center', justifyContent: 'center' }}>
              <View
                style={{
                  width: 170,
                  height: 275,
                  backgroundColor: '#0B1528',
                  borderRadius: 18,
                  borderWidth: 2,
                  borderColor: '#334155',
                  padding: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {/* Speaker Notch */}
                <View
                  style={{
                    width: 44,
                    height: 3.5,
                    backgroundColor: '#334155',
                    borderRadius: 2,
                    alignSelf: 'center',
                    marginBottom: 4,
                  }}
                />

                {/* Tracking App Header */}
                <View style={{ backgroundColor: '#1E293B', padding: 5, borderRadius: 5, marginBottom: 6 }}>
                  <Text style={{ fontSize: 5.8, color: '#94A3B8', fontWeight: 'bold' }}>JCD GLOBAL TELEMETRY</Text>
                  <Text style={{ fontSize: 7.5, fontWeight: 'bold', color: '#38BDF8' }}>
                    TRACK: JCD-{destCode}-2026X
                  </Text>
                </View>

                {/* Timeline Steps */}
                <View style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', paddingVertical: 2 }}>
                  {/* Step 1 */}
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        width: 13,
                        height: 13,
                        borderRadius: 6.5,
                        backgroundColor: '#059669',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 6,
                      }}
                    >
                      <Text style={{ fontSize: 7, color: '#FFFFFF', fontWeight: 'bold' }}>✓</Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 6.8, fontWeight: 'bold', color: '#F8FAFC' }}>Pickup SZX Origin</Text>
                      <Text style={{ fontSize: 5.5, color: '#94A3B8' }}>Factory Consolidated &amp; Sealed</Text>
                    </View>
                  </View>

                  {/* Step 2 */}
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        width: 13,
                        height: 13,
                        borderRadius: 6.5,
                        backgroundColor: '#059669',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 6,
                      }}
                    >
                      <Text style={{ fontSize: 7, color: '#FFFFFF', fontWeight: 'bold' }}>✓</Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 6.8, fontWeight: 'bold', color: '#F8FAFC' }}>Departed Origin Hub</Text>
                      <Text style={{ fontSize: 5.5, color: '#94A3B8' }}>International Freight In Transit</Text>
                    </View>
                  </View>

                  {/* Step 3 (Active) */}
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        width: 13,
                        height: 13,
                        borderRadius: 6.5,
                        backgroundColor: '#EA580C',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 6,
                      }}
                    >
                      <Text style={{ fontSize: 6, color: '#FFFFFF', fontWeight: 'bold' }}>●</Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 6.8, fontWeight: 'bold', color: '#FDBA74' }}>
                        Customs Cleared ({destCode})
                      </Text>
                      <Text style={{ fontSize: 5.5, color: '#CBD5E1' }}>Duties &amp; Import VAT Prepaid</Text>
                    </View>
                  </View>

                  {/* Step 4 */}
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        width: 13,
                        height: 13,
                        borderRadius: 6.5,
                        backgroundColor: '#2563EB',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 6,
                      }}
                    >
                      <Text style={{ fontSize: 6, color: '#FFFFFF', fontWeight: 'bold' }}>→</Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 6.8, fontWeight: 'bold', color: '#F8FAFC' }}>Out for Delivery</Text>
                      <Text style={{ fontSize: 5.5, color: '#94A3B8' }}>Direct to {destination} Door</Text>
                    </View>
                  </View>
                </View>

                {/* Status Bar Indicator */}
                <View
                  style={{
                    backgroundColor: '#064E3B',
                    paddingVertical: 3,
                    paddingHorizontal: 6,
                    borderRadius: 4,
                    marginTop: 4,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 6, fontWeight: 'bold', color: '#6EE7B7' }}>
                    ● 24/7 SATELLITE GPS ACTIVE
                  </Text>
                </View>
              </View>
            </View>

            {/* Right 30% Real-time Visibility Info */}
            <View style={{ width: '30%', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#0F2C59' }}>24/7 Visibility Telemetry</Text>

              <View style={styles.card}>
                <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#0284C7', marginBottom: 2 }}>
                  Milestone Notifications
                </Text>
                <Text style={{ fontSize: 7, color: '#334155', lineHeight: 1.35 }}>
                  • Factory Pickup Confirmed{'\n'}
                  • Origin Vessel / Flight Departure{'\n'}
                  • Customs Cleared ({destCode}){'\n'}
                  • Out for Final Delivery
                </Text>
              </View>

              <View style={styles.card}>
                <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#059669', marginBottom: 2 }}>
                  Carrier Integration
                </Text>
                <Text style={{ fontSize: 7, color: '#334155', lineHeight: 1.35 }}>
                  Direct API tracking hooks into YunTrack, DHL, FedEx, UPS, and local container drayage fleets.
                </Text>
              </View>

              <View style={{ backgroundColor: '#EFF6FF', padding: 6, borderRadius: 4 }}>
                <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#1E40AF', textAlign: 'center' }}>
                  WhatsApp & Email Milestone Updates
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Slide Footer */}
        <View style={styles.slideFooter}>
          <Text>JCD FORWARDER 2026 LOGISTICS REPORT | EXECUTION & TELEMETRY</Text>
          <Text>CHINA TO {destination.toUpperCase()} | PAGE 12 OF 15</Text>
        </View>
      </Page>

      {/* ========================================================================= */}
      {/* SLIDE 13: SUMMARY DECISION MATRIX (4 Quadrants) */}
      {/* ========================================================================= */}
      <Page size={[842.4, 470.2]} style={styles.pageLight}>
        <View style={styles.slideHeader}>
          <Text style={styles.headerBrand}>JCD FORWARDER</Text>
          <Text style={styles.headerTag}>Strategic Decision Matrix | China to {destination}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.slideTitle}>Summary: Which Method Fits Your Business?</Text>
          <Text style={styles.slideSubtitle}>
            Map your shipment constraints against our 4 specialized logistics service models
          </Text>

          <View style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {/* Top Row: Urgent Wholesaler & Sampler */}
            <View style={[styles.row, { gap: 12, height: 130 }]}>
              {/* Quadrant 1: The Urgent Wholesaler */}
              <View style={[styles.card, { flex: 1, display: 'flex', flexDirection: 'row', gap: 10, padding: 8, borderLeftWidth: 3.5, borderLeftColor: '#0284C7' }]}>
                <View style={{ width: '26%', backgroundColor: '#F0F9FF', borderRadius: 4, padding: 6, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#0284C7' }}>AIR</Text>
                  <Text style={{ fontSize: 6.8, fontWeight: 'bold', color: '#0369A1', marginTop: 3 }}>3–7 DAYS</Text>
                  <Text style={{ fontSize: 5.5, color: '#64748B', marginTop: 2 }}>&gt;100 kg</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: '#0F2C59' }}>The Urgent Wholesaler</Text>
                  <Text style={{ fontSize: 7.2, fontWeight: 'bold', color: '#0284C7', marginBottom: 2 }}>
                    Choice: Air Freight (&gt;100kg, 3–7 Days)
                  </Text>
                  <Text style={{ fontSize: 6.8, color: '#475569', lineHeight: 1.3 }}>
                    Ideal for fast-moving consumer electronics, preventing stockouts during seasonal sales, and high cash-velocity turnover.
                  </Text>
                </View>
              </View>

              {/* Quadrant 2: The Sampler */}
              <View style={[styles.card, { flex: 1, display: 'flex', flexDirection: 'row', gap: 10, padding: 8, borderLeftWidth: 3.5, borderLeftColor: '#D97706' }]}>
                <View style={{ width: '26%', backgroundColor: '#FFFBEB', borderRadius: 4, padding: 6, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#D97706' }}>EXP</Text>
                  <Text style={{ fontSize: 6.8, fontWeight: 'bold', color: '#B45309', marginTop: 3 }}>2–4 DAYS</Text>
                  <Text style={{ fontSize: 5.5, color: '#64748B', marginTop: 2 }}>&lt;10 kg</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: '#0F2C59' }}>The Sampler &amp; Prototyper</Text>
                  <Text style={{ fontSize: 7.2, fontWeight: 'bold', color: '#D97706', marginBottom: 2 }}>
                    Choice: Express Courier (&lt;10kg, 2–4 Days)
                  </Text>
                  <Text style={{ fontSize: 6.8, color: '#475569', lineHeight: 1.3 }}>
                    Ideal for testing new supplier quality, sending pre-production golden samples, and emergency lab testing.
                  </Text>
                </View>
              </View>
            </View>

            {/* Bottom Row: Volume Importer & Hands-Off Entrepreneur */}
            <View style={[styles.row, { gap: 12, height: 130 }]}>
              {/* Quadrant 3: The Volume Importer */}
              <View style={[styles.card, { flex: 1, display: 'flex', flexDirection: 'row', gap: 10, padding: 8, borderLeftWidth: 3.5, borderLeftColor: '#059669' }]}>
                <View style={{ width: '26%', backgroundColor: '#F0FDF4', borderRadius: 4, padding: 6, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#059669' }}>SEA</Text>
                  <Text style={{ fontSize: 6.8, fontWeight: 'bold', color: '#047857', marginTop: 3 }}>18–35 DAYS</Text>
                  <Text style={{ fontSize: 5.5, color: '#64748B', marginTop: 2 }}>FCL / LCL</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: '#0F2C59' }}>The Volume Importer</Text>
                  <Text style={{ fontSize: 7.2, fontWeight: 'bold', color: '#059669', marginBottom: 2 }}>
                    Choice: Sea Freight FCL / LCL (18–35 Days)
                  </Text>
                  <Text style={{ fontSize: 6.8, color: '#475569', lineHeight: 1.3 }}>
                    Maximum gross margins, bulk manufacturing runs, heavy industrial machinery, and standard containerloads.
                  </Text>
                </View>
              </View>

              {/* Quadrant 4: The Hands-Off Entrepreneur */}
              <View style={[styles.card, { flex: 1, display: 'flex', flexDirection: 'row', gap: 10, padding: 8, borderLeftWidth: 3.5, borderLeftColor: '#2563EB', backgroundColor: '#EFF6FF' }]}>
                <View style={{ width: '26%', backgroundColor: '#DBEAFE', borderRadius: 4, padding: 6, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#2563EB' }}>DDP</Text>
                  <Text style={{ fontSize: 6.8, fontWeight: 'bold', color: '#1D4ED8', marginTop: 3 }}>DOOR-TO-DOOR</Text>
                  <Text style={{ fontSize: 5.5, color: '#1E40AF', marginTop: 2 }}>ALL-IN</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: '#1E40AF' }}>The Hands-Off Entrepreneur</Text>
                  <Text style={{ fontSize: 7.2, fontWeight: 'bold', color: '#2563EB', marginBottom: 2 }}>
                    Choice: DDP All-Inclusive (Air or Sea)
                  </Text>
                  <Text style={{ fontSize: 6.8, color: '#1E3A8A', lineHeight: 1.3 }}>
                    Fixed transparent pricing, zero customs compliance headaches, duties fully paid, direct Amazon FBA delivery.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Slide Footer */}
        <View style={styles.slideFooter}>
          <Text>JCD FORWARDER 2026 LOGISTICS REPORT | DECISION MATRIX</Text>
          <Text>CHINA TO {destination.toUpperCase()} | PAGE 13 OF 15</Text>
        </View>
      </Page>

      {/* ========================================================================= */}
      {/* SLIDE 14: GLOBAL INFRASTRUCTURE & ROUTE SPECIFICATIONS */}
      {/* ========================================================================= */}
      <Page size={[842.4, 470.2]} style={styles.pageLight}>
        <View style={styles.slideHeader}>
          <Text style={styles.headerBrand}>JCD FORWARDER</Text>
          <Text style={styles.headerTag}>Global Infrastructure & Route Standards | China to {destination}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.slideTitle}>Your Logistics Partner: JCD FORWARDER</Text>
          <Text style={styles.slideSubtitle}>
            China export consolidation hubs paired with direct destination fulfillment in {destination}
          </Text>

          {/* 2 Network Maps Side-by-Side */}
          <View style={[styles.row, { gap: 10, height: 165, marginBottom: 8 }]}>
            <View style={[styles.card, { flex: 1, padding: 4, alignItems: 'center', justifyContent: 'center' }]}>
              {assets.chinaOriginHubs ? (
                <Image src={assets.chinaOriginHubs} style={{ width: '100%', height: 155, objectFit: 'contain' }} />
              ) : (
                <Text style={{ fontSize: 8, color: '#64748B' }}>China Export Hubs</Text>
              )}
            </View>

            <View style={[styles.card, { flex: 1, padding: 4, alignItems: 'center', justifyContent: 'center' }]}>
              {assets.worldRoutesMap ? (
                <Image src={assets.worldRoutesMap} style={{ width: '100%', height: 155, objectFit: 'contain' }} />
              ) : (
                <Text style={{ fontSize: 8, color: '#64748B' }}>Global Trade Routes</Text>
              )}
            </View>
          </View>

          {/* Route Compliance Badges for {destination} */}
          <View style={[styles.row, { gap: 8 }]}>
            <View style={[styles.card, { flex: 1, padding: 6 }]}>
              <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#0F2C59' }}>Customs & Duty Profile</Text>
              <Text style={{ fontSize: 6.8, color: '#334155', marginTop: 2 }}>
                • <Text style={{ fontWeight: 'bold' }}>Authority:</Text> {customsAuth}{'\n'}
                • <Text style={{ fontWeight: 'bold' }}>De Minimis Exemption:</Text> {deMinimis}{'\n'}
                • <Text style={{ fontWeight: 'bold' }}>VAT / GST Rate:</Text> {vatGst}
              </Text>
            </View>

            <View style={[styles.card, { flex: 1, padding: 6 }]}>
              <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#0F2C59' }}>Amazon FBA & Pallet Rules</Text>
              <Text style={{ fontSize: 6.8, color: '#334155', marginTop: 2 }}>
                • <Text style={{ fontWeight: 'bold' }}>Pallet Standard:</Text> {palletDim} ({palletType}){'\n'}
                • <Text style={{ fontWeight: 'bold' }}>Max Single Carton:</Text> {maxCartonKg} kg{'\n'}
                • <Text style={{ fontWeight: 'bold' }}>Top FBA Hubs:</Text> {fbaWarehouses.slice(0, 4).join(', ') || 'Direct FBA Injection'}
              </Text>
            </View>

            <View style={[styles.card, { flex: 1, padding: 6, backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }]}>
              <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#166534' }}>JCD Verified Credentials</Text>
              <Text style={{ fontSize: 6.8, color: '#14532D', marginTop: 2 }}>
                • <Text style={{ fontWeight: 'bold' }}>NVOCC License:</Text> GD20240307220907{'\n'}
                • <Text style={{ fontWeight: 'bold' }}>Alibaba TrustPass:</Text> 10+ Years Certified{'\n'}
                • <Text style={{ fontWeight: 'bold' }}>Track Record:</Text> 300,000+ Completed Shipments
              </Text>
            </View>
          </View>
        </View>

        {/* Slide Footer */}
        <View style={styles.slideFooter}>
          <Text>JCD FORWARDER 2026 LOGISTICS REPORT | INFRASTRUCTURE & COMPLIANCE</Text>
          <Text>CHINA TO {destination.toUpperCase()} | PAGE 14 OF 15</Text>
        </View>
      </Page>

      {/* ========================================================================= */}
      {/* SLIDE 15: CONTACT & INSTANT QUOTE (Dark Navy Back Cover) */}
      {/* ========================================================================= */}
      <Page size={[842.4, 470.2]} style={styles.pageDark}>
        <View style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Header */}
          <View style={{ textAlign: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 }}>
              Get Your Custom 2026 Quote for China to {destination}
            </Text>
            <Text style={{ fontSize: 9.5, color: '#93C5FD' }}>
              Rates fluctuate with weekly bunker and airline capacity. Contact our logistics team for a guaranteed binding rate.
            </Text>
          </View>

          {/* Center Executive Scannable QR Card */}
          <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 3 }}>
            <View
              style={{
                backgroundColor: '#0A1E3C',
                borderWidth: 1,
                borderColor: '#1E3E62',
                borderRadius: 10,
                paddingVertical: 8,
                paddingHorizontal: 22,
                alignItems: 'center',
              }}
            >
              {/* Badge above QR */}
              <View
                style={{
                  backgroundColor: '#1E3E62',
                  paddingVertical: 2.5,
                  paddingHorizontal: 9,
                  borderRadius: 3,
                  marginBottom: 6,
                }}
              >
                <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#38BDF8', letterSpacing: 0.8 }}>
                  OFFICIAL 24/7 WHATSAPP QUOTATION DESK
                </Text>
              </View>

              {/* White High-Contrast Scannable QR Matrix */}
              <View
                style={{
                  width: 140,
                  height: 140,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 6,
                  padding: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {assets.whatsappQr || assets.circuitQrFrame ? (
                  <Image
                    src={assets.whatsappQr || assets.circuitQrFrame}
                    style={{ width: 128, height: 128, objectFit: 'contain' }}
                  />
                ) : (
                  <View style={{ width: 128, height: 128, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 8, color: '#0F2C59', fontWeight: 'bold' }}>SCAN FOR WHATSAPP</Text>
                  </View>
                )}
              </View>

              {/* Call-to-Action Pill Button */}
              <View
                style={{
                  backgroundColor: '#EA580C',
                  paddingVertical: 4.5,
                  paddingHorizontal: 14,
                  borderRadius: 4,
                  marginTop: 6,
                }}
              >
                <Text style={{ fontSize: 8.2, fontWeight: 'bold', color: '#FFFFFF', letterSpacing: 0.5 }}>
                  SCAN FOR INSTANT WHATSAPP QUOTATION
                </Text>
              </View>

              {/* Sub-label under CTA */}
              <Text style={{ fontSize: 6.8, color: '#94A3B8', marginTop: 3 }}>
                Direct Mobile: +86 137 2424 6674 • Instant Route Availability &amp; Guaranteed Binding Rate
              </Text>
            </View>
          </View>

          {/* 3 Contact Info Columns */}
          <View style={[styles.row, { gap: 10 }]}>
            {/* Col 1 */}
            <View style={[styles.cardDark, { flex: 1 }]}>
              <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#38BDF8', marginBottom: 3 }}>
                Direct Contact Channels
              </Text>
              <Text style={{ fontSize: 7, color: '#E2E8F0', lineHeight: 1.45 }}>
                • <Text style={{ fontWeight: 'bold' }}>WhatsApp / 24/7 Hotline:</Text> +86 137 2424 6674{'\n'}
                • <Text style={{ fontWeight: 'bold' }}>Quotation Email:</Text> David@JCDforwarder.com{'\n'}
                • <Text style={{ fontWeight: 'bold' }}>Alibaba Store:</Text> https://jiechengda.en.alibaba.com/{'\n'}
                • <Text style={{ fontWeight: 'bold' }}>Web Portal:</Text> https://jcdforwarder.com
              </Text>
            </View>

            {/* Col 2 */}
            <View style={[styles.cardDark, { flex: 1 }]}>
              <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#38BDF8', marginBottom: 3 }}>
                Shenzhen HQ & Inspection Facility
              </Text>
              <Text style={{ fontSize: 7, color: '#E2E8F0', lineHeight: 1.45 }}>
                Building C (Entire Building), No. 40 Yuesheng 2nd Rd, South Industrial Area, Xinhe Community, Fuhai Street, Bao'an District, Shenzhen, China (518103)
              </Text>
            </View>

            {/* Col 3 */}
            <View style={[styles.cardDark, { flex: 1 }]}>
              <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#34D399', marginBottom: 3 }}>
                Direct Quotations SLA
              </Text>
              <Text style={{ fontSize: 7, color: '#E2E8F0', lineHeight: 1.45 }}>
                • Guaranteed Response Time within 2 Hours{'\n'}
                • Transparent itemized pricing without hidden terminal fees{'\n'}
                • Government NVOCC License: GD20240307220907
              </Text>
            </View>
          </View>

          {/* Footnote */}
          <Text style={{ fontSize: 6.8, color: '#94A3B8', textAlign: 'center', marginTop: 4 }}>
            (c) 2026 Shenzhen Jiechengda International Freight Forwarding Co., Ltd. (JCD Forwarder). All Rights Reserved.
          </Text>
        </View>

        {/* Slide Footer Accent */}
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: '#2563EB' }} />
      </Page>
    </Document>
  );
}

export default CountryCatalogPdf;
