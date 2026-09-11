'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Edges } from '@react-three/drei';
import type { ContainerSpec } from '@/data/containers';
import { getContainerByType } from '@/data/containers';

interface ContainerVisualizer3DProps {
  containerId: '20gp' | '40gp' | '40hq' | '45hq';
  utilizationPercent: number; // 0 to 100
  totalCbm: number;
  totalWeightKg: number;
  cartonCount?: number;
}

// 3D Scene internal component
function ContainerScene({
  containerSpec,
  utilizationPercent,
  totalCbm,
  cartonCount,
}: {
  containerSpec: ContainerSpec;
  utilizationPercent: number;
  totalCbm: number;
  cartonCount?: number;
}) {
  // Dimensions in 3D units (scaled roughly 1:1 in meters)
  const length = containerSpec.externalDimensions.lengthM;
  const height = containerSpec.externalDimensions.heightM;
  const width = containerSpec.externalDimensions.widthM;

  const boundedFillPercent = Math.min(100, Math.max(0, utilizationPercent));
  const fillFactor = boundedFillPercent / 100;

  // Visual cargo block dimensions
  // Fill primarily along length and height
  const cargoLength = Math.max(0.1, length * Math.min(1, fillFactor * 1.1));
  const cargoHeight = Math.max(0.1, height * Math.min(1, fillFactor > 0.8 ? 0.95 : 0.85));
  const cargoWidth = width * 0.92;

  // Center offset for the cargo block (starting from back of container toward door)
  const cargoX = -length / 2 + cargoLength / 2 + 0.05;
  const cargoY = -height / 2 + cargoHeight / 2 + 0.05;

  return (
    <group position={[0, 0, 0]}>
      {/* Container Outer Transparent Shell */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[length, height, width]} />
        <meshStandardMaterial
          color={containerSpec.threeDConfig.exteriorColor}
          transparent
          opacity={0.12}
          roughness={0.2}
          metalness={0.1}
          depthWrite={false}
        />
        <Edges
          scale={1}
          threshold={15}
          color={containerSpec.threeDConfig.accentColor}
        />
      </mesh>

      {/* Container Floor Base (Solid steel plate look) */}
      <mesh position={[0, -height / 2 - 0.04, 0]}>
        <boxGeometry args={[length, 0.08, width]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
        <Edges scale={1} threshold={15} color="#1e293b" />
      </mesh>

      {/* Container Door Opening Indicator (Right End) */}
      <mesh position={[length / 2 + 0.01, 0, 0]}>
        <planeGeometry args={[width * 0.95, height * 0.9]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Loaded Cargo Volume Block */}
      {boundedFillPercent > 0 && (
        <mesh position={[cargoX, cargoY, 0]}>
          <boxGeometry args={[cargoLength, cargoHeight, cargoWidth]} />
          <meshStandardMaterial
            color="#d97706" // Cardboard amber
            roughness={0.7}
            metalness={0.1}
          />
          <Edges scale={1} threshold={15} color="#78350f" />
        </mesh>
      )}

      {/* Ground Grid Helper */}
      <gridHelper
        args={[24, 24, '#475569', '#1e293b']}
        position={[0, -height / 2 - 0.08, 0]}
      />
    </group>
  );
}

export default function ContainerVisualizer3D({
  containerId,
  utilizationPercent,
  totalCbm,
  totalWeightKg,
  cartonCount,
}: ContainerVisualizer3DProps) {
  const containerSpec = useMemo(() => {
    return getContainerByType(containerId) || getContainerByType('40hq')!;
  }, [containerId]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-80 sm:h-96 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 text-xs">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
          <span>Loading 3D Container Engine...</span>
        </div>
      </div>
    );
  }

  // Determine initial camera position based on container length
  const cameraZ = containerSpec.externalDimensions.lengthM > 10 ? 14 : 10;

  return (
    <div className="relative w-full h-80 sm:h-[420px] rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
      {/* 3D Canvas */}
      <Canvas
        camera={{
          position: [cameraZ * 0.8, cameraZ * 0.5, cameraZ * 0.8],
          fov: 45,
        }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[12, 18, 10]} intensity={1.4} />
        <directionalLight position={[-10, -5, -8]} intensity={0.5} />
        <pointLight position={[0, 8, 0]} intensity={0.8} />

        <ContainerScene
          containerSpec={containerSpec}
          utilizationPercent={utilizationPercent}
          totalCbm={totalCbm}
          cartonCount={cartonCount}
        />

        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={30}
          maxPolarAngle={Math.PI / 2 + 0.05} // Don't flip below ground
        />
      </Canvas>

      {/* Top HUD Overlay */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none gap-2">
        <div className="bg-slate-900/80 backdrop-blur-md rounded-xl px-3 py-1.5 border border-slate-700/60 text-xs flex items-center gap-2 text-white">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: containerSpec.threeDConfig.exteriorColor }} />
          <span className="font-bold">{containerSpec.name}</span>
          <span className="text-slate-400 hidden sm:inline">({containerSpec.usableVolumeDisplay})</span>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-md rounded-xl px-3 py-1.5 border border-slate-700/60 text-xs font-semibold text-white">
          <span className="text-amber-400">{utilizationPercent.toFixed(1)}%</span> Filled
        </div>
      </div>

      {/* Bottom Hint Overlay */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none text-[11px] text-slate-400">
        <div className="bg-slate-900/70 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-800">
          Left Click + Drag to Rotate • Scroll to Zoom
        </div>
        <div className="bg-slate-900/70 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-800 hidden sm:block">
          Max Payload: {containerSpec.maxPayloadTons}T
        </div>
      </div>
    </div>
  );
}
