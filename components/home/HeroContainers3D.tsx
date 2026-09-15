"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Decal, ContactShadows, OrbitControls } from "@react-three/drei";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const MODEL_URL = "/models/shipping_containers_hq.glb";

// ─── Force transparent canvas background ─────────────────────────────────────
function BgFix() {
  const { gl } = useThree();
  useEffect(() => {
    gl.setClearColor(new THREE.Color(0, 0, 0), 0);
  }, [gl]);
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// BRAND TEXTURE
// Matches the exact visual weight of "YANG MING" / "CHINA SHIPPING" on the
// container wall — enormous stenciled letters painted directly onto the metal.
// A soft grey fill covers the underlying text; the paint color mimics fresh
// industrial enamel with a subtle bleed at the edges.
// ─────────────────────────────────────────────────────────────────────────────
function useBrandTexture() {
  return useMemo(() => {
    // Wide landscape canvas — same proportions as the container side face
    const W = 2048;
    const H = 512;
    const cvs = document.createElement("canvas");
    cvs.width = W;
    cvs.height = H;
    const ctx = cvs.getContext("2d")!;

    // ── 1. Container-wall base coat ───────────────────────────────────────────
    // Soft blue-grey panel that covers the baked-in "YANG MING" text underneath.
    // Matches the white container's actual surface colour.
    ctx.fillStyle = "#c0c8d4";
    ctx.fillRect(0, 0, W, H);

    // Subtle lighter gradient to fake the metal highlight from above
    const shine = ctx.createLinearGradient(0, 0, 0, H);
    shine.addColorStop(0,   "rgba(255,255,255,0.12)");
    shine.addColorStop(0.4, "rgba(255,255,255,0.0)");
    shine.addColorStop(1,   "rgba(0,0,0,0.06)");
    ctx.fillStyle = shine;
    ctx.fillRect(0, 0, W, H);

    // ── 2. JCD brand orange top stripe ───────────────────────────────────────
    // Real shipping lines (Maersk, Evergreen, etc.) use a solid colour bar
    // across the top edge for company identification.
    ctx.fillStyle = "#c2410c"; // JCD's deep burnt-orange — realistic paint hue
    ctx.fillRect(0, 0, W, 28);

    // Fine white pin-line below the stripe (common on real containers)
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.fillRect(0, 28, W, 3);

    // ── 3. "JCD" — the primary operator code ─────────────────────────────────
    // Font: Impact — the de-facto standard for container shipping company names
    // (YANG MING, EVERGREEN, COSCO, MSC all use condensed Impact-style glyphs).
    // Colour: dark charcoal — exactly like YANG MING's letters.
    ctx.textAlign    = "left";
    ctx.textBaseline = "top";

    // Paint bleed — real stencil paint bleeds 1–2px at high res
    ctx.shadowColor = "rgba(18,24,38,0.55)";
    ctx.shadowBlur  = 6;

    ctx.font      = "900 390px Impact, 'Arial Black', sans-serif";
    ctx.fillStyle = "#18222e"; // same dark charcoal as YANG MING
    ctx.fillText("JCD", 68, 52);

    ctx.shadowBlur = 0;

    // ── 4. "FORWARDER" — operator descriptor ─────────────────────────────────
    // Real shipping lines print the company type beneath the operator code
    // (e.g. "LINE", "SHIPPING", "CONTAINER LINE").
    ctx.font      = "700 118px Impact, 'Arial Black', sans-serif";
    ctx.fillStyle = "#c2410c"; // brand orange (same as the top stripe)
    ctx.shadowColor = "rgba(120,40,0,0.3)";
    ctx.shadowBlur  = 5;
    // vertically centred in the bottom quarter
    ctx.fillText("FORWARDER", 68, 378);
    ctx.shadowBlur = 0;

    // ── 5. Operator code (ISO 6346) — right side ─────────────────────────────
    // Standard: XXXX U  000000  C
    ctx.font      = "600 72px 'Courier New', monospace";
    ctx.fillStyle = "#2c3e50";
    ctx.textAlign = "right";
    ctx.fillText("JCDF U  347329  2", W - 56, 56);

    // Size-type code (45HQ = 45G1)
    ctx.font      = "500 54px 'Courier New', monospace";
    ctx.fillStyle = "#3d5166";
    ctx.fillText("45G1  ·  CHINA", W - 56, 140);

    // ── 6. Weight plate ───────────────────────────────────────────────────────
    // The small data plate in the lower-right is on every real container.
    const plateX = W - 420;
    const plateY = H - 168;
    ctx.fillStyle  = "rgba(18,28,42,0.82)";
    ctx.strokeStyle = "#6b8aa0";
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.rect(plateX, plateY, 380, 140);
    ctx.fill();
    ctx.stroke();

    const row = (label: string, val: string, dy: number) => {
      ctx.font      = "500 22px Arial, sans-serif";
      ctx.fillStyle = "#7ea5c0";
      ctx.textAlign = "left";
      ctx.fillText(label, plateX + 12, plateY + dy);
      ctx.font      = "700 22px 'Courier New', monospace";
      ctx.fillStyle = "#dce8f0";
      ctx.textAlign = "right";
      ctx.fillText(val, plateX + 370, plateY + dy);
    };
    row("MAX GROSS",   "30,480 KG",  16);
    row("TARE",         "3,900 KG",  52);
    row("MAX PAYLOAD", "26,580 KG",  88);
    row("NVOCC",  "GD20240307220907", 120);

    // ── 7. Corrugation weathering marks ──────────────────────────────────────
    // Very faint vertical lines mimicking the corrugated metal ribs
    ctx.globalAlpha = 0.04;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth   = 3;
    for (let x = 120; x < W; x += 122) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    const tex = new THREE.CanvasTexture(cvs);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

// ─── Floating ambient particles ───────────────────────────────────────────────
function Particles() {
  const COUNT = 28;
  const ref   = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo<[number, number, number][]>(() =>
    Array.from({ length: COUNT }, (_, i) => {
      const a = i * 2.399963;
      const r = 3.5 + (i % 4) * 1.2;
      return [Math.cos(a) * r, ((i * 0.61) % 6) - 1.5, Math.sin(a) * (r * 0.75)];
    }), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    seeds.forEach(([bx, by, bz], i) => {
      dummy.position.set(
        bx + Math.sin(t * 0.2  + i) * 0.14,
        by + Math.sin(t * 0.36 + i * 1.2) * 0.22,
        bz + Math.cos(t * 0.26 + i) * 0.14,
      );
      dummy.scale.setScalar(0.016 + Math.abs(Math.sin(t * 0.55 + i)) * 0.015);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 5, 5]} />
      <meshBasicMaterial color="#38bdf8" transparent opacity={0.18} depthWrite={false} />
    </instancedMesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Container scene
// ─────────────────────────────────────────────────────────────────────────────
function ContainerScene({ isInteracting }: { isInteracting: boolean }) {
  const { scene } = useGLTF(MODEL_URL);
  const groupRef  = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();
  const brandTex  = useBrandTexture();

  const meshMap = useMemo(() => {
    const map: Record<string, THREE.Mesh> = {};
    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      obj.castShadow    = true;
      obj.receiveShadow = true;
      map[obj.name]     = obj;

      const mat = obj.material;
      if (!Array.isArray(mat) && mat instanceof THREE.MeshStandardMaterial) {
        mat.roughness       = Math.max(0.3,  mat.roughness);
        mat.metalness       = Math.min(0.45, mat.metalness + 0.06);
        mat.envMapIntensity = 0.85;
        mat.needsUpdate     = true;
      }
    });
    return map;
  }, [scene]);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current || isInteracting) return;
    groupRef.current.rotation.y += delta * 0.038;
  });

  // ── The white container with "YANG MING" baked into its texture ──
  // Node: Crate.001_Crate2_0  (mesh index 1, stacked on top)
  const whiteMesh = meshMap["Crate.001_Crate2_0"] ?? null;

  return (
    // Group pivot: pulled down so the stack sits in the bottom half of canvas,
    // initial rotation shows the branded face to the camera.
    <group ref={groupRef} position={[0, -1.85, 0]} rotation={[0, -0.38, 0]}>
      <primitive object={scene} />

      {/*
        Decal on the white container's long side face.

        Projection axis: the Decal fires along +Z of its own rotation.
        The white container's visible long face (where YANG MING is painted)
        faces approximately along the mesh's local +X axis given the node's
        -90° X rotation baked in by Sketchfab's exporter.

        rotation={[0, Math.PI / 2, 0]} rotates the decal projector so it fires
        along world +X → hits the container's port-side long face.

        position.x ≈ 0.44 pushes the projector origin just outside that face.
        position.y is centred in mesh local space (y=0).
        scale=[2.2, 0.55, 0.5]: wide (x) × moderate height (y) × projection depth (z).
      */}
      {whiteMesh && (
        <Decal
          mesh={{ current: whiteMesh }}
          position={[0.44, 0.02, 0.0]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[2.2, 0.55, 0.5]}
          map={brandTex}
          depthTest={false}
          polygonOffset
          polygonOffsetFactor={-6}
        />
      )}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root export
// ─────────────────────────────────────────────────────────────────────────────
export default function HeroContainers3D() {
  const reducedMotion = useReducedMotion();
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

      {/* ── Lighting ── */}
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
      <directionalLight position={[-8, 5, 2]}  intensity={1.15} color="#93c5fd" />
      <directionalLight position={[1, 0, -10]} intensity={1.0}  color="#f97316" />
      <hemisphereLight args={["#1e3a5f", "#020617", 0.6]} />
      <pointLight position={[0, -2.5, 3]}   intensity={0.4} color="#c2410c" />
      <pointLight position={[-3, 4,  -2]}   intensity={0.3} color="#0369a1" />

      {/* ── Orbit controls — drag to rotate ── */}
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
