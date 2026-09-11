/**
 * Ocean Container Specifications & Capacity Models
 * Source: JCD Forwarder Master Blueprint Section 4.1 & Verified Maritime Standards
 */

export interface ContainerDimensions {
  lengthM: number;
  widthM: number;
  heightM: number;
  lengthFt: string;
  widthFt: string;
  heightFt: string;
}

export interface ContainerDoorOpening {
  widthM: number;
  heightM: number;
  widthFt: string;
  heightFt: string;
}

export interface PalletCapacity {
  standardUS: number; // 48" x 40" (1200 x 1000 mm) single tier
  euroEPAL: number;   // 1200 x 800 mm single tier
}

export interface ThreeDVisualConfig {
  lengthRatio: number;
  widthRatio: number;
  heightRatio: number;
  exteriorColor: string;
  accentColor: string;
}

export interface ContainerSpec {
  id: '20gp' | '40gp' | '40hq' | '45hq';
  code: '20GP' | '40GP' | '40HQ' | '45HQ';
  name: string;
  category: 'Standard Dry' | 'High Cube';
  aliases: string[];
  externalDimensions: ContainerDimensions;
  internalDimensions: ContainerDimensions;
  doorOpening: ContainerDoorOpening;
  grossVolumeCbm: number;
  usableVolumeMinCbm: number;
  usableVolumeMaxCbm: number;
  usableVolumeDisplay: string;
  maxPayloadKg: number;
  maxPayloadTons: number;
  maxGrossWeightKg: number;
  tareWeightKg: number;
  palletCapacity: PalletCapacity;
  bestSuitedFor: string;
  recommendedCargoTypes: string[];
  packingTips: string[];
  threeDConfig: ThreeDVisualConfig;
}

export const CONTAINER_SPECS: ContainerSpec[] = [
  {
    id: '20gp',
    code: '20GP',
    name: '20ft Standard Dry Container (20GP)',
    category: 'Standard Dry',
    aliases: ['20GP', '20ft Dry', '20 Standard', '20DV'],
    externalDimensions: {
      lengthM: 5.89,
      widthM: 2.35,
      heightM: 2.38,
      lengthFt: "19' 4\"",
      widthFt: "7' 8\"",
      heightFt: "7' 10\"",
    },
    internalDimensions: {
      lengthM: 5.898,
      widthM: 2.352,
      heightM: 2.393,
      lengthFt: "19' 4.2\"",
      widthFt: "7' 8.6\"",
      heightFt: "7' 10.2\"",
    },
    doorOpening: {
      widthM: 2.34,
      heightM: 2.20,
      widthFt: "7' 8.1\"",
      heightFt: "7' 2.6\"",
    },
    grossVolumeCbm: 33.2,
    usableVolumeMinCbm: 28.0,
    usableVolumeMaxCbm: 30.0,
    usableVolumeDisplay: '28.0 – 30.0 CBM',
    maxPayloadKg: 17500,
    maxPayloadTons: 17.5,
    maxGrossWeightKg: 24000,
    tareWeightKg: 2230,
    palletCapacity: {
      standardUS: 10,
      euroEPAL: 11,
    },
    bestSuitedFor: 'Dense, heavy industrial goods that reach weight limits before volume capacity is filled.',
    recommendedCargoTypes: [
      'Ceramic tiles & marble slabs',
      'Industrial machinery & iron hardware',
      'Solar panels & energy batteries',
      'Bulk auto parts & metal castings',
      'Liquid drums & heavy chemicals',
    ],
    packingTips: [
      'Evenly distribute heavy cargo across the floor to prevent container chassis tilting.',
      'Always verify destination road weight limits (e.g. US 80,000 lbs gross vehicle limit).',
      'Utilize ratchet tie-downs and dunnage bags between wooden crates.',
    ],
    threeDConfig: {
      lengthRatio: 5.89 / 12.03,
      widthRatio: 1.0,
      heightRatio: 2.38 / 2.69,
      exteriorColor: '#0284c7', // Sky blue
      accentColor: '#0369a1',
    },
  },
  {
    id: '40gp',
    code: '40GP',
    name: '40ft Standard Dry Container (40GP)',
    category: 'Standard Dry',
    aliases: ['40GP', '40ft Dry', '40 Standard', '40DV'],
    externalDimensions: {
      lengthM: 12.03,
      widthM: 2.35,
      heightM: 2.39,
      lengthFt: "39' 5\"",
      widthFt: "7' 8\"",
      heightFt: "7' 10\"",
    },
    internalDimensions: {
      lengthM: 12.032,
      widthM: 2.352,
      heightM: 2.393,
      lengthFt: "39' 5.7\"",
      widthFt: "7' 8.6\"",
      heightFt: "7' 10.2\"",
    },
    doorOpening: {
      widthM: 2.34,
      heightM: 2.20,
      widthFt: "7' 8.1\"",
      heightFt: "7' 2.6\"",
    },
    grossVolumeCbm: 67.7,
    usableVolumeMinCbm: 56.0,
    usableVolumeMaxCbm: 58.0,
    usableVolumeDisplay: '56.0 – 58.0 CBM',
    maxPayloadKg: 22000,
    maxPayloadTons: 22.0,
    maxGrossWeightKg: 30480,
    tareWeightKg: 3700,
    palletCapacity: {
      standardUS: 20,
      euroEPAL: 24,
    },
    bestSuitedFor: 'Balanced-density general commercial cargo and consumer electronics with moderate height requirements.',
    recommendedCargoTypes: [
      'Consumer electronics & power supplies',
      'Computer accessories & cables',
      'Tools & home improvement hardware',
      'Textiles & rolled fabric fabrics',
      'Medium-density retail merchandise',
    ],
    packingTips: [
      'Place heavier cartons at bottom layers and lighter goods on top.',
      'Check if goods can fit inside 2.20m door opening height before palletizing.',
      'Use slip sheets or anti-slip cardboard mats between carton tiers.',
    ],
    threeDConfig: {
      lengthRatio: 1.0,
      widthRatio: 1.0,
      heightRatio: 2.39 / 2.69,
      exteriorColor: '#2563eb', // Royal blue
      accentColor: '#1d4ed8',
    },
  },
  {
    id: '40hq',
    code: '40HQ',
    name: '40ft High Cube Container (40HQ / 40HC)',
    category: 'High Cube',
    aliases: ['40HQ', '40HC', '40ft High Cube', '40 High Cube'],
    externalDimensions: {
      lengthM: 12.03,
      widthM: 2.35,
      heightM: 2.69,
      lengthFt: "39' 5\"",
      widthFt: "7' 8\"",
      heightFt: "8' 10\"",
    },
    internalDimensions: {
      lengthM: 12.032,
      widthM: 2.352,
      heightM: 2.698,
      lengthFt: "39' 5.7\"",
      widthFt: "7' 8.6\"",
      heightFt: "8' 10.2\"",
    },
    doorOpening: {
      widthM: 2.34,
      heightM: 2.58,
      widthFt: "7' 8.1\"",
      heightFt: "8' 5.6\"",
    },
    grossVolumeCbm: 76.4,
    usableVolumeMinCbm: 66.0,
    usableVolumeMaxCbm: 68.0,
    usableVolumeDisplay: '66.0 – 68.0 CBM',
    maxPayloadKg: 26000,
    maxPayloadTons: 26.0,
    maxGrossWeightKg: 30480,
    tareWeightKg: 3970,
    palletCapacity: {
      standardUS: 21,
      euroEPAL: 25,
    },
    bestSuitedFor: 'Voluminous, lightweight consumer goods, e-commerce cartons, and tall Amazon FBA pallets requiring extra vertical clearance.',
    recommendedCargoTypes: [
      'Amazon FBA boxed inventory & cartons',
      'Apparel, shoes, backpacks & fashion goods',
      'Toys, plush items & plastic products',
      'Flat-pack furniture & home decor',
      'Kitchenware, small appliances & glassware',
    ],
    packingTips: [
      'The extra 30 cm vertical space allows taller pallet stacks (up to 2.4m tall).',
      'Most cost-effective freight mode per CBM for trans-Pacific and Asia-Europe trade lanes.',
      'Install cargo nets or load security bars at door end to avoid goods falling during devanning.',
    ],
    threeDConfig: {
      lengthRatio: 1.0,
      widthRatio: 1.0,
      heightRatio: 1.0,
      exteriorColor: '#059669', // Emerald green
      accentColor: '#047857',
    },
  },
  {
    id: '45hq',
    code: '45HQ',
    name: '45ft High Cube Container (45HQ / 45HC)',
    category: 'High Cube',
    aliases: ['45HQ', '45HC', '45ft High Cube', '45 High Cube'],
    externalDimensions: {
      lengthM: 13.56,
      widthM: 2.35,
      heightM: 2.70,
      lengthFt: "44' 6\"",
      widthFt: "7' 8\"",
      heightFt: "8' 10\"",
    },
    internalDimensions: {
      lengthM: 13.556,
      widthM: 2.352,
      heightM: 2.698,
      lengthFt: "44' 5.7\"",
      widthFt: "7' 8.6\"",
      heightFt: "8' 10.2\"",
    },
    doorOpening: {
      widthM: 2.34,
      heightM: 2.59,
      widthFt: "7' 8.1\"",
      heightFt: "8' 6.0\"",
    },
    grossVolumeCbm: 86.0,
    usableVolumeMinCbm: 76.0,
    usableVolumeMaxCbm: 78.0,
    usableVolumeDisplay: '76.0 – 78.0 CBM',
    maxPayloadKg: 29000,
    maxPayloadTons: 29.0,
    maxGrossWeightKg: 32500,
    tareWeightKg: 4800,
    palletCapacity: {
      standardUS: 24,
      euroEPAL: 27,
    },
    bestSuitedFor: 'Mega-volume commercial shipments, low-density cargo, and large enterprises seeking maximum scale economy.',
    recommendedCargoTypes: [
      'Large furniture sets & mattress rolls',
      'Sports equipment, bicycles & e-scooters',
      'Lighting fixtures & chandelier cartons',
      'Oversized consumer packaging',
      'High-volume seasonal promotional goods',
    ],
    packingTips: [
      'Verify destination terminal and rail drayage permits 45ft chassis equipment.',
      'Ensure factory loading dock apron has minimum 30 meters turning radius.',
      'Delivers unmatched freight savings per CBM when cargo volume exceeds 70 CBM.',
    ],
    threeDConfig: {
      lengthRatio: 13.56 / 12.03,
      widthRatio: 1.0,
      heightRatio: 2.70 / 2.69,
      exteriorColor: '#d97706', // Amber orange
      accentColor: '#b45309',
    },
  },
];

/**
 * Lookup container specification by code or identifier
 */
export function getContainerByType(type: string): ContainerSpec | undefined {
  const normalized = type.toLowerCase().replace(/[^a-z0-9]/g, '');
  return CONTAINER_SPECS.find(
    (c) =>
      c.id === normalized ||
      c.code.toLowerCase() === normalized ||
      c.aliases.some((a) => a.toLowerCase().replace(/[^a-z0-9]/g, '') === normalized)
  );
}

/**
 * Recommend optimal container based on volume (CBM) and total weight (kg)
 */
export function recommendContainer(
  cbm: number,
  weightKg: number
): {
  recommended: ContainerSpec;
  reason: string;
  fillRateVolume: number;
  fillRateWeight: number;
  alternative?: ContainerSpec;
} {
  if (weightKg > 26000 || cbm > 68) {
    const spec = CONTAINER_SPECS.find((c) => c.id === '45hq')!;
    return {
      recommended: spec,
      reason: `Total volume (${cbm.toFixed(1)} CBM) or weight (${(weightKg / 1000).toFixed(1)} T) exceeds standard 40HQ capacity. 45HQ provides up to 78 CBM usable capacity.`,
      fillRateVolume: Math.min(100, (cbm / spec.usableVolumeMaxCbm) * 100),
      fillRateWeight: Math.min(100, (weightKg / spec.maxPayloadKg) * 100),
    };
  }

  if (weightKg > 17500 || cbm > 30) {
    const spec = CONTAINER_SPECS.find((c) => c.id === '40hq')!;
    const alt = CONTAINER_SPECS.find((c) => c.id === '40gp');
    return {
      recommended: spec,
      reason: `Cargo volume (${cbm.toFixed(1)} CBM) comfortably fits in a 40HQ with 66-68 CBM usable space and 2.58m door clearance for Amazon pallets.`,
      fillRateVolume: Math.min(100, (cbm / spec.usableVolumeMaxCbm) * 100),
      fillRateWeight: Math.min(100, (weightKg / spec.maxPayloadKg) * 100),
      alternative: alt,
    };
  }

  const spec = CONTAINER_SPECS.find((c) => c.id === '20gp')!;
  const alt = CONTAINER_SPECS.find((c) => c.id === '40hq');
  return {
    recommended: spec,
    reason: `Cargo volume (${cbm.toFixed(1)} CBM) and weight (${(weightKg / 1000).toFixed(1)} T) are within standard 20GP limits (28-30 CBM, 17.5 T max payload).`,
    fillRateVolume: Math.min(100, (cbm / spec.usableVolumeMaxCbm) * 100),
    fillRateWeight: Math.min(100, (weightKg / spec.maxPayloadKg) * 100),
    alternative: cbm > 24 ? alt : undefined,
  };
}
