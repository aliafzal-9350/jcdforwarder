import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const catalogDir = path.resolve(__dirname, '..', 'public', 'images', 'catalog');
fs.mkdirSync(catalogDir, { recursive: true });

const assets = {
  'hero_control_center.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <rect width="800" height="500" fill="#081A36"/>
  <circle cx="400" cy="250" r="180" fill="none" stroke="#1E3A8A" stroke-width="2" stroke-dasharray="6,6"/>
  <circle cx="400" cy="250" r="120" fill="none" stroke="#2563EB" stroke-width="1.5"/>
  <circle cx="400" cy="250" r="60" fill="none" stroke="#38BDF8" stroke-width="2"/>
  <line x1="100" y1="250" x2="700" y2="250" stroke="#1E3E62" stroke-width="1"/>
  <line x1="400" y1="50" x2="400" y2="450" stroke="#1E3E62" stroke-width="1"/>
  <rect x="80" y="80" width="180" height="100" rx="6" fill="#0F2C59" stroke="#2563EB" stroke-width="1"/>
  <text x="100" y="115" fill="#38BDF8" font-family="sans-serif" font-size="14" font-weight="bold">PORT TELEMETRY</text>
  <text x="100" y="145" fill="#CBD5E1" font-family="sans-serif" font-size="11">Active Vessels: 48</text>
  <rect x="540" y="80" width="180" height="100" rx="6" fill="#0F2C59" stroke="#059669" stroke-width="1"/>
  <text x="560" y="115" fill="#34D399" font-family="sans-serif" font-size="14" font-weight="bold">AIR CARGO LIFT</text>
  <text x="560" y="145" fill="#CBD5E1" font-family="sans-serif" font-size="11">Flights On Schedule: 100%</text>
  <text x="400" y="460" text-anchor="middle" fill="#94A3B8" font-family="sans-serif" font-size="12" font-weight="bold">JCD GLOBAL LOGISTICS COMMAND CENTER</text>
</svg>`,

  'hero_container_ship.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <rect width="800" height="500" fill="#081A36"/>
  <path d="M0 380 Q 200 360 400 380 T 800 380 L 800 500 L 0 500 Z" fill="#0F2C59"/>
  <path d="M0 410 Q 200 395 400 410 T 800 410 L 800 500 L 0 500 Z" fill="#1E3A8A" opacity="0.7"/>
  <polygon points="120,380 680,380 620,440 180,440" fill="#1E293B" stroke="#334155" stroke-width="2"/>
  <rect x="180" y="260" width="80" height="35" fill="#2563EB" rx="2"/>
  <rect x="265" y="260" width="80" height="35" fill="#059669" rx="2"/>
  <rect x="350" y="260" width="80" height="35" fill="#D97706" rx="2"/>
  <rect x="435" y="260" width="80" height="35" fill="#DC2626" rx="2"/>
  <rect x="220" y="220" width="80" height="35" fill="#0284C7" rx="2"/>
  <rect x="305" y="220" width="80" height="35" fill="#7C3AED" rx="2"/>
  <rect x="390" y="220" width="80" height="35" fill="#10B981" rx="2"/>
  <rect x="260" y="180" width="80" height="35" fill="#E11D48" rx="2"/>
  <rect x="345" y="180" width="80" height="35" fill="#2563EB" rx="2"/>
  <rect x="540" y="200" width="60" height="180" fill="#F8FAFC"/>
  <rect x="555" y="160" width="30" height="40" fill="#CBD5E1"/>
  <text x="400" y="100" text-anchor="middle" fill="#38BDF8" font-family="sans-serif" font-size="20" font-weight="bold">TRANS-PACIFIC OCEAN CARRIER OPERATIONS</text>
</svg>`,

  'hero_cargo_aircraft.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <rect width="800" height="500" fill="#081A36"/>
  <line x1="50" y1="440" x2="750" y2="440" stroke="#38BDF8" stroke-width="4" stroke-dasharray="20,15"/>
  <ellipse cx="400" cy="220" rx="260" ry="50" fill="#F8FAFC"/>
  <polygon points="360,220 280,70 330,70 450,220" fill="#CBD5E1"/>
  <polygon points="360,220 280,370 330,370 450,220" fill="#CBD5E1"/>
  <polygon points="140,220 90,130 130,130 200,220" fill="#2563EB"/>
  <ellipse cx="320" cy="250" rx="28" ry="14" fill="#334155"/>
  <ellipse cx="320" cy="190" rx="28" ry="14" fill="#334155"/>
  <text x="400" y="130" text-anchor="middle" fill="#38BDF8" font-family="sans-serif" font-size="20" font-weight="bold">TIME-DEFINITE COMMERCIAL AIR FREIGHT</text>
  <text x="400" y="470" text-anchor="middle" fill="#94A3B8" font-family="sans-serif" font-size="12">IATA 1:6000 Divisor • Direct Transpacific Linehauls</text>
</svg>`,

  'hero_delivery_handoff.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <rect width="800" height="500" fill="#0F2C59"/>
  <rect x="250" y="160" width="300" height="200" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="3"/>
  <rect x="280" y="190" width="100" height="60" fill="#EFF6FF" stroke="#2563EB" stroke-width="2" rx="4"/>
  <line x1="290" y1="210" x2="360" y2="210" stroke="#2563EB" stroke-width="4"/>
  <line x1="290" y1="225" x2="340" y2="225" stroke="#2563EB" stroke-width="4"/>
  <circle cx="480" cy="260" r="35" fill="#059669"/>
  <polyline points="465,260 475,270 495,250" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <text x="400" y="120" text-anchor="middle" fill="#38BDF8" font-family="sans-serif" font-size="20" font-weight="bold">DELIVERED DUTY PAID (DDP) FINAL HANDOFF</text>
  <text x="400" y="410" text-anchor="middle" fill="#CBD5E1" font-family="sans-serif" font-size="13">Direct Proof of Delivery (POD) & Amazon FBA Receiving</text>
</svg>`,

  'hero_commercial_box.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <rect width="800" height="500" fill="#081A36"/>
  <polygon points="400,100 620,200 400,300 180,200" fill="#D97706" stroke="#B45309" stroke-width="3"/>
  <polygon points="180,200 400,300 400,450 180,350" fill="#B45309" stroke="#92400E" stroke-width="3"/>
  <polygon points="620,200 400,300 400,450 620,350" fill="#92400E" stroke="#78350F" stroke-width="3"/>
  <rect x="220" y="240" width="70" height="45" rx="3" fill="#FFFFFF"/>
  <line x1="230" y1="255" x2="280" y2="255" stroke="#0F172A" stroke-width="3"/>
  <line x1="230" y1="265" x2="270" y2="265" stroke="#0F172A" stroke-width="2"/>
  <text x="400" y="60" text-anchor="middle" fill="#FDE68A" font-family="sans-serif" font-size="18" font-weight="bold">AMAZON FBA COMPLIANT PALLET & CARTON SPEC</text>
</svg>`,

  'hero_warehouse_inspection.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <rect width="800" height="500" fill="#081A36"/>
  <rect x="80" y="100" width="280" height="340" fill="#0F2C59" stroke="#2563EB" stroke-width="2" rx="6"/>
  <rect x="440" y="100" width="280" height="340" fill="#0F2C59" stroke="#2563EB" stroke-width="2" rx="6"/>
  <line x1="80" y1="180" x2="360" y2="180" stroke="#1E3A8A" stroke-width="2"/>
  <line x1="80" y1="260" x2="360" y2="260" stroke="#1E3A8A" stroke-width="2"/>
  <line x1="80" y1="340" x2="360" y2="340" stroke="#1E3A8A" stroke-width="2"/>
  <rect x="110" y="120" width="60" height="50" fill="#F59E0B" rx="3"/>
  <rect x="190" y="120" width="60" height="50" fill="#3B82F6" rx="3"/>
  <rect x="270" y="120" width="60" height="50" fill="#10B981" rx="3"/>
  <text x="400" y="60" text-anchor="middle" fill="#38BDF8" font-family="sans-serif" font-size="20" font-weight="bold">SHENZHEN HQ 500M² STAGING & INSPECTION FACILITY</text>
</svg>`,

  'hero_freight_truck.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <rect width="800" height="500" fill="#081A36"/>
  <line x1="40" y1="400" x2="760" y2="400" stroke="#38BDF8" stroke-width="4"/>
  <rect x="100" y="180" width="420" height="180" fill="#2563EB" stroke="#1D4ED8" stroke-width="2" rx="4"/>
  <text x="310" y="280" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="28" font-weight="bold">JCD EXPRESS DDP</text>
  <rect x="520" y="220" width="150" height="140" fill="#F8FAFC" rx="6"/>
  <circle cx="220" cy="390" r="35" fill="#1E293B" stroke="#64748B" stroke-width="6"/>
  <circle cx="440" cy="390" r="35" fill="#1E293B" stroke="#64748B" stroke-width="6"/>
  <circle cx="600" cy="390" r="35" fill="#1E293B" stroke="#64748B" stroke-width="6"/>
  <text x="400" y="100" text-anchor="middle" fill="#38BDF8" font-family="sans-serif" font-size="20" font-weight="bold">INTERMODAL DRAYAGE & FINAL-MILE TRUCKING</text>
</svg>`,

  'hero_business_handshake.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <rect width="800" height="500" fill="#0F2C59"/>
  <circle cx="400" cy="240" r="140" fill="#081A36" stroke="#2563EB" stroke-width="3"/>
  <path d="M310 240 L370 200 L420 240 L490 200" stroke="#38BDF8" stroke-width="12" stroke-linecap="round" fill="none"/>
  <path d="M310 270 L370 240 L430 270 L490 230" stroke="#60A5FA" stroke-width="10" stroke-linecap="round" fill="none"/>
  <text x="400" y="60" text-anchor="middle" fill="#38BDF8" font-family="sans-serif" font-size="20" font-weight="bold">STRATEGIC LONG-TERM TRADE PARTNERSHIPS</text>
</svg>`,

  'hero_jet_engine.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <rect width="800" height="500" fill="#081A36"/>
  <circle cx="400" cy="250" r="170" fill="#0F2C59" stroke="#2563EB" stroke-width="8"/>
  <circle cx="400" cy="250" r="120" fill="none" stroke="#38BDF8" stroke-width="3" stroke-dasharray="12,8"/>
  <circle cx="400" cy="250" r="50" fill="#1E293B" stroke="#38BDF8" stroke-width="4"/>
  <text x="400" y="50" text-anchor="middle" fill="#38BDF8" font-family="sans-serif" font-size="18" font-weight="bold">HIGH-VELOCITY AIR FREIGHT SPEED & PRECISION</text>
</svg>`,

  'hero_gantry_cranes.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <rect width="800" height="500" fill="#081A36"/>
  <line x1="150" y1="100" x2="150" y2="450" stroke="#D97706" stroke-width="10"/>
  <line x1="300" y1="100" x2="300" y2="450" stroke="#D97706" stroke-width="10"/>
  <line x1="100" y1="120" x2="650" y2="120" stroke="#D97706" stroke-width="12"/>
  <rect x="400" y="300" width="120" height="45" fill="#2563EB" rx="3"/>
  <rect x="400" y="350" width="120" height="45" fill="#059669" rx="3"/>
  <rect x="530" y="350" width="120" height="45" fill="#DC2626" rx="3"/>
  <text x="400" y="60" text-anchor="middle" fill="#FBBF24" font-family="sans-serif" font-size="20" font-weight="bold">SEAPORT GANTRY CRANE STEVEDORING</text>
</svg>`,

  'diagram_logistics_trilemma.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500">
  <polygon points="300,50 540,420 60,420" fill="#F8FAFC" stroke="#0F2C59" stroke-width="4"/>
  <circle cx="300" cy="50" r="26" fill="#2563EB"/>
  <text x="300" y="20" text-anchor="middle" fill="#2563EB" font-family="sans-serif" font-size="14" font-weight="bold">SPEED (AIR DDP)</text>
  <circle cx="540" cy="420" r="26" fill="#059669"/>
  <text x="540" y="465" text-anchor="middle" fill="#059669" font-family="sans-serif" font-size="14" font-weight="bold">MARGIN (OCEAN FCL)</text>
  <circle cx="60" cy="420" r="26" fill="#D97706"/>
  <text x="60" y="465" text-anchor="middle" fill="#D97706" font-family="sans-serif" font-size="14" font-weight="bold">CONVENIENCE (DDP A-Z)</text>
  <circle cx="300" cy="290" r="40" fill="#0F2C59"/>
  <text x="300" y="296" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="bold">JCD</text>
</svg>`,

  'diagram_flight_routes.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#081A36" rx="8"/>
  <circle cx="140" cy="280" r="8" fill="#38BDF8"/>
  <text x="140" y="310" text-anchor="middle" fill="#CBD5E1" font-family="sans-serif" font-size="11">SZX / CAN (South)</text>
  <circle cx="180" cy="180" r="8" fill="#38BDF8"/>
  <text x="180" y="160" text-anchor="middle" fill="#CBD5E1" font-family="sans-serif" font-size="11">PVG (East China)</text>
  <circle cx="660" cy="200" r="10" fill="#34D399"/>
  <text x="660" y="230" text-anchor="middle" fill="#34D399" font-family="sans-serif" font-size="12" font-weight="bold">Destination Hubs</text>
  <path d="M 140 280 Q 400 30 660 200" fill="none" stroke="#38BDF8" stroke-width="3" stroke-dasharray="8,6"/>
  <path d="M 180 180 Q 420 50 660 200" fill="none" stroke="#60A5FA" stroke-width="2.5"/>
</svg>`,

  'diagram_container_cutaway.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 400" width="700" height="400">
  <rect x="20" y="20" width="660" height="340" fill="#F1F5F9" stroke="#0F2C59" stroke-width="4" rx="6"/>
  <rect x="40" y="160" width="160" height="180" fill="#2563EB" rx="4"/>
  <text x="120" y="255" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="bold">Supplier A</text>
  <rect x="220" y="100" width="180" height="240" fill="#059669" rx="4"/>
  <text x="310" y="225" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="bold">Supplier B</text>
  <rect x="420" y="180" width="120" height="160" fill="#D97706" rx="4"/>
  <text x="480" y="265" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="15" font-weight="bold">Supplier C</text>
  <rect x="550" y="80" width="110" height="260" fill="#7C3AED" rx="4"/>
  <text x="605" y="215" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="15" font-weight="bold">Supplier D</text>
  <line x1="40" y1="60" x2="520" y2="60" stroke="#94A3B8" stroke-width="2" stroke-dasharray="6,6"/>
  <text x="280" y="50" text-anchor="middle" fill="#64748B" font-family="sans-serif" font-size="13">Consolidated at Shenzhen HQ (Zero Wasted Space)</text>
</svg>`,

  'diagram_container_dimensions.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" width="800" height="400">
  <rect width="800" height="400" fill="#F8FAFC"/>
  <rect x="50" y="50" width="180" height="90" fill="#EFF6FF" stroke="#2563EB" stroke-width="2" rx="4"/>
  <text x="140" y="95" text-anchor="middle" fill="#1E3A8A" font-family="sans-serif" font-size="13" font-weight="bold">20GP: 28-30 CBM</text>
  <rect x="260" y="50" width="240" height="90" fill="#F0FDF4" stroke="#059669" stroke-width="2" rx="4"/>
  <text x="380" y="95" text-anchor="middle" fill="#065F46" font-family="sans-serif" font-size="13" font-weight="bold">40GP: 56-58 CBM</text>
  <rect x="530" y="40" width="240" height="100" fill="#FFFBEB" stroke="#D97706" stroke-width="2" rx="4"/>
  <text x="650" y="95" text-anchor="middle" fill="#92400E" font-family="sans-serif" font-size="13" font-weight="bold">40HQ: 66-68 CBM</text>
  <rect x="260" y="180" width="270" height="105" fill="#FAF5FF" stroke="#7C3AED" stroke-width="2" rx="4"/>
  <text x="395" y="235" text-anchor="middle" fill="#5B21B6" font-family="sans-serif" font-size="13" font-weight="bold">45HQ: 76-78 CBM</text>
</svg>`,

  'diagram_ddp_5step_flow.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" width="800" height="200">
  <rect width="800" height="200" fill="#FFFFFF" rx="6"/>
  <circle cx="90" cy="90" r="34" fill="#EFF6FF" stroke="#2563EB" stroke-width="2.5"/>
  <text x="90" y="96" text-anchor="middle" fill="#2563EB" font-family="sans-serif" font-size="14" font-weight="bold">01</text>
  <circle cx="245" cy="90" r="34" fill="#EFF6FF" stroke="#2563EB" stroke-width="2.5"/>
  <text x="245" y="96" text-anchor="middle" fill="#2563EB" font-family="sans-serif" font-size="14" font-weight="bold">02</text>
  <circle cx="400" cy="90" r="34" fill="#EFF6FF" stroke="#2563EB" stroke-width="2.5"/>
  <text x="400" y="96" text-anchor="middle" fill="#2563EB" font-family="sans-serif" font-size="14" font-weight="bold">03</text>
  <circle cx="555" cy="90" r="34" fill="#ECFDF5" stroke="#059669" stroke-width="2.5"/>
  <text x="555" y="96" text-anchor="middle" fill="#059669" font-family="sans-serif" font-size="14" font-weight="bold">04</text>
  <circle cx="710" cy="90" r="34" fill="#ECFDF5" stroke="#059669" stroke-width="2.5"/>
  <text x="710" y="96" text-anchor="middle" fill="#059669" font-family="sans-serif" font-size="14" font-weight="bold">05</text>
  <line x1="124" y1="90" x2="211" y2="90" stroke="#2563EB" stroke-width="2"/>
  <line x1="279" y1="90" x2="366" y2="90" stroke="#2563EB" stroke-width="2"/>
  <line x1="434" y1="90" x2="521" y2="90" stroke="#2563EB" stroke-width="2"/>
  <line x1="589" y1="90" x2="676" y2="90" stroke="#059669" stroke-width="2"/>
</svg>`,

  'diagram_destination_port_map.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <rect width="600" height="400" fill="#081A36" rx="8"/>
  <circle cx="180" cy="200" r="12" fill="#38BDF8"/>
  <text x="180" y="230" text-anchor="middle" fill="#CBD5E1" font-family="sans-serif" font-size="12" font-weight="bold">Major Seaports</text>
  <circle cx="420" cy="150" r="12" fill="#34D399"/>
  <text x="420" y="180" text-anchor="middle" fill="#CBD5E1" font-family="sans-serif" font-size="12" font-weight="bold">Air Cargo Hubs</text>
  <line x1="192" y1="200" x2="408" y2="150" stroke="#60A5FA" stroke-width="3" stroke-dasharray="6,6"/>
  <text x="300" y="165" text-anchor="middle" fill="#FBBF24" font-family="sans-serif" font-size="11">Intermodal Rail Drayage</text>
</svg>`,

  'diagram_amazon_fba_pallet.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500">
  <rect width="600" height="500" fill="#F8FAFC"/>
  <rect x="150" y="380" width="300" height="30" fill="#D97706" rx="2"/>
  <rect x="170" y="200" width="260" height="180" fill="#EFF6FF" stroke="#2563EB" stroke-width="2"/>
  <text x="300" y="290" text-anchor="middle" fill="#1E3A8A" font-family="sans-serif" font-size="16" font-weight="bold">GMA 1.2m x 1.0m x 1.8m</text>
  <rect x="220" y="230" width="70" height="40" fill="#FEF3C7" stroke="#D97706" stroke-width="1"/>
  <text x="255" y="255" text-anchor="middle" fill="#92400E" font-family="sans-serif" font-size="10" font-weight="bold">TEAM LIFT</text>
</svg>`,

  'badge_nvocc_gold.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <circle cx="200" cy="200" r="170" fill="#0F2C59" stroke="#D97706" stroke-width="8"/>
  <circle cx="200" cy="200" r="145" fill="none" stroke="#FBBF24" stroke-width="3" stroke-dasharray="6,6"/>
  <text x="200" y="160" text-anchor="middle" fill="#FBBF24" font-family="sans-serif" font-size="20" font-weight="bold">GOVERNMENT NVOCC</text>
  <text x="200" y="200" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="bold">GD20240307220907</text>
  <text x="200" y="240" text-anchor="middle" fill="#93C5FD" font-family="sans-serif" font-size="13">DEPT. OF TRANSPORTATION</text>
</svg>`,

  'logos_courier_integrators.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200" width="600" height="200">
  <rect width="600" height="200" fill="#F8FAFC"/>
  <rect x="40" y="60" width="150" height="80" fill="#FEF3C7" stroke="#DC2626" stroke-width="2" rx="6"/>
  <text x="115" y="108" text-anchor="middle" fill="#DC2626" font-family="sans-serif" font-size="18" font-weight="bold">DHL</text>
  <rect x="225" y="60" width="150" height="80" fill="#EEF2FF" stroke="#4F46E5" stroke-width="2" rx="6"/>
  <text x="300" y="108" text-anchor="middle" fill="#4F46E5" font-family="sans-serif" font-size="18" font-weight="bold">FedEx</text>
  <rect x="410" y="60" width="150" height="80" fill="#FEF2F2" stroke="#92400E" stroke-width="2" rx="6"/>
  <text x="485" y="108" text-anchor="middle" fill="#92400E" font-family="sans-serif" font-size="18" font-weight="bold">UPS</text>
</svg>`,

  'qr_code_whatsapp_quote.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
  <rect width="300" height="300" fill="#FFFFFF" rx="12"/>
  <rect x="25" y="25" width="70" height="70" fill="none" stroke="#0F2C59" stroke-width="10" rx="6"/>
  <rect x="45" y="45" width="30" height="30" fill="#2563EB"/>
  <rect x="205" y="25" width="70" height="70" fill="none" stroke="#0F2C59" stroke-width="10" rx="6"/>
  <rect x="225" y="45" width="30" height="30" fill="#2563EB"/>
  <rect x="25" y="205" width="70" height="70" fill="none" stroke="#0F2C59" stroke-width="10" rx="6"/>
  <rect x="45" y="225" width="30" height="30" fill="#2563EB"/>
  <rect x="130" y="35" width="40" height="20" fill="#0F2C59"/>
  <rect x="120" y="80" width="20" height="50" fill="#0F2C59"/>
  <rect x="160" y="70" width="30" height="30" fill="#059669"/>
  <rect x="120" y="150" width="60" height="60" fill="#0F2C59"/>
  <rect x="200" y="140" width="50" height="30" fill="#0F2C59"/>
  <rect x="210" y="200" width="40" height="50" fill="#059669"/>
  <text x="150" y="285" text-anchor="middle" fill="#0F2C59" font-family="sans-serif" font-size="11" font-weight="bold">WHATSAPP: +86 137 2424 6674</text>
</svg>`
};

for (const [filename, content] of Object.entries(assets)) {
  fs.writeFileSync(path.join(catalogDir, filename), content.trim(), 'utf8');
}
console.log('Successfully generated all 20 catalog vector assets in:', catalogDir);
