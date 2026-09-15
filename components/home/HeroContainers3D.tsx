"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, ContactShadows, OrbitControls } from "@react-three/drei";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const MODEL_URL = "/models/shipping_containers_hq.glb?v=jcd3";

// ─── Force transparent canvas background ─────────────────────────────────────
function BgFix() {
  const { gl } = useThree();
  useEffect(() => {
    gl.setClearColor(new THREE.Color(0, 0, 0), 0);
  }, [gl]);
  return null;
}

// ─── Floating ambient particles ───────────────────────────────────────────────
function Particles() {
  const COUNT = 24;
  const ref   = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo<[number, number, number][]>(() =>
    Array.from({ length: COUNT }, (_, i) => {
      const a = i * 2.399963;
      const r = 3.5 + (i % 4) * 1.1;
      return [Math.cos(a) * r, ((i * 0.61) % 6) - 1.5, Math.sin(a) * (r * 0.7)];
    }), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    seeds.forEach(([bx, by, bz], i) => {
      dummy.position.set(
        bx + Math.sin(t * 0.2  + i) * 0.12,
        by + Math.sin(t * 0.36 + i * 1.2) * 0.2,
        bz + Math.cos(t * 0.26 + i) * 0.12,
      );
      dummy.scale.setScalar(0.015 + Math.abs(Math.sin(t * 0.55 + i)) * 0.013);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 5, 5]} />
      <meshBasicMaterial color="#38bdf8" transparent opacity={0.16} depthWrite={false} />
    </instancedMesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Container scene
// ─────────────────────────────────────────────────────────────────────────────
function ContainerScene({ isInteracting }: { isInteracting: boolean }) {
  const { scene }     = useGLTF(MODEL_URL);
  const groupRef      = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();

  useMemo(() => {
    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      obj.castShadow    = true;
      obj.receiveShadow = true;

      const mat = obj.material;
      if (!Array.isArray(mat) && mat instanceof THREE.MeshStandardMaterial) {
        mat.roughness       = Math.max(0.32, mat.roughness);
        mat.metalness       = Math.min(0.42, mat.metalness + 0.05);
        mat.envMapIntensity = 0.8;
        mat.needsUpdate     = true;
      }
    });
  }, [scene]);

  // Auto-rotate (pauses while user drags)
  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current || isInteracting) return;
    groupRef.current.rotation.y += delta * 0.038;
  });

  return (
    <group ref={groupRef} position={[0, -1.85, 0]} rotation={[0, -0.38, 0]}>
      <primitive object={scene} />
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root export
// ─────────────────────────────────────────────────────────────────────────────
export default function HeroContainers3D() {
  const reducedMotion                     = useReducedMotion();
  const [mobile, setMobile]               = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setMobile(mq.matches);
    const h = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const camPos: [number, number, number] = mobile ? [0, 3.5, 18] : [0, 3.0, 15];

  return (
    <Canvas
      shadows={{ type: THREE.PCFShadowMap }}
      camera={{ position: camPos, fov: mobile ? 42 : 36, near: 0.5, far: 100 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.08,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      dpr={[1, 2]}
      onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0, 0, 0), 0)}
    >
      <BgFix />

      {/* ── Cinematic 3-point lighting ── */}
      <directionalLight
        position={[8, 12, 6]}
        intensity={3.1}
        color="#fff8f0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-bias={-0.0003}
      />
      <directionalLight position={[-8, 5, 2]}  intensity={1.1}  color="#93c5fd" />
      <directionalLight position={[1, 0, -10]} intensity={0.95} color="#f97316" />
      <hemisphereLight args={["#1e3a5f", "#020617", 0.6]} />
      <pointLight position={[0, -2.5,  3]} intensity={0.4} color="#c2410c" />
      <pointLight position={[-3,  4,  -2]} intensity={0.3} color="#0369a1" />

      {/* ── Drag to rotate ── */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.55}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={(Math.PI * 2) / 3}
        onStart={() => setIsInteracting(true)}
        onEnd={()   => setIsInteracting(false)}
      />

      {!reducedMotion && <Particles />}

      <Suspense fallback={null}>
        <ContainerScene isInteracting={isInteracting} />
        <ContactShadows
          position={[0, -1.9, 0]}
          opacity={0.65}
          scale={20}
          blur={3.5}
          far={6}
          color="#000c1a"
        />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);
