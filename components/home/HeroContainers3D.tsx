"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, ContactShadows, OrbitControls } from "@react-three/drei";
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
// BUILD THE JCD CONTAINER TEXTURE
//
// We replace the white container's base-color map entirely.
// No Decal positioning needed — the new texture IS the container surface,
// so it appears correctly on every face that gets rendered.
//
// Visual target: match the exact style of "YANG MING" —
//   enormous Impact font, dark charcoal on a light blue-grey metal surface.
// ─────────────────────────────────────────────────────────────────────────────
function buildJCDContainerTexture(): THREE.CanvasTexture {
  const W = 2048;
  const H = 2048;
  const cv = document.createElement("canvas");
  cv.width  = W;
  cv.height = H;
  const c = cv.getContext("2d")!;

  // ── 1. Container-wall base coat ───────────────────────────────────────────
  // Same pale blue-grey as the original YANG MING white container
  c.fillStyle = "#c2ccd8";
  c.fillRect(0, 0, W, H);

  // Subtle top-to-bottom gradient — metal reflects more light at the top
  const shine = c.createLinearGradient(0, 0, 0, H);
  shine.addColorStop(0,   "rgba(255,255,255,0.18)");
  shine.addColorStop(0.35,"rgba(255,255,255,0.0)");
  shine.addColorStop(1,   "rgba(0,0,0,0.08)");
  c.fillStyle = shine;
  c.fillRect(0, 0, W, H);

  // ── 2. Corrugated-steel ribs (very faint vertical shadows) ───────────────
  c.globalAlpha = 0.055;
  c.fillStyle   = "#000";
  for (let x = 64; x < W; x += 82) {
    c.fillRect(x, 0, 5, H);
  }
  c.globalAlpha = 1;

  // ── 3. JCD brand orange top stripe ───────────────────────────────────────
  // YANG MING uses a solid-colour identification stripe too
  c.fillStyle = "#b83a00";
  c.fillRect(0, 0, W, 58);

  // White pin-line below stripe
  c.fillStyle = "rgba(255,255,255,0.55)";
  c.fillRect(0, 58, W, 4);

  // Company full name inside stripe
  c.save();
  c.font         = "600 34px Arial, sans-serif";
  c.fillStyle    = "#ffffff";
  c.textAlign    = "left";
  c.textBaseline = "middle";
  c.fillText(
    "JCD FORWARDER  ·  SHENZHEN JIECHENGDA INT'L FREIGHT FORWARDING CO., LTD.",
    28, 29
  );
  c.restore();

  // ── 4. Diamond logo mark (like the Y-M shield on Yang Ming) ──────────────
  const lx = 148, ly = 480;
  c.save();
  c.translate(lx, ly);
  c.rotate(Math.PI / 4);
  c.fillStyle = "#1a2332";
  c.fillRect(-82, -82, 164, 164);
  c.restore();
  // "J" initial inside diamond
  c.save();
  c.font         = "900 80px Impact, sans-serif";
  c.fillStyle    = "#c2ccd8"; // matches container colour → carved look
  c.textAlign    = "center";
  c.textBaseline = "middle";
  c.fillText("J", lx, ly);
  c.restore();

  // ── 5. "JCD" — the primary operator name ─────────────────────────────────
  // Font: Impact (exact same face YANG MING uses)
  // Size: fills ~85 % of the container face width
  // Colour: dark charcoal — identical to YANG MING's letters
  c.save();
  c.shadowColor = "rgba(18,24,38,0.38)";
  c.shadowBlur  = 10;
  c.font        = "900 730px Impact, 'Arial Black', sans-serif";
  c.fillStyle   = "#18222e"; // charcoal — same as YANG MING
  c.textAlign   = "center";
  c.textBaseline= "middle";
  c.fillText("JCD", W / 2, H * 0.42);
  c.shadowBlur  = 0;
  c.restore();

  // ── 6. "FORWARDER" descriptor beneath ────────────────────────────────────
  // Shipping lines print their type below the operator code:
  // "SHIPPING", "LINE", "CONTAINER LINE", etc.
  c.save();
  c.font        = "700 130px Impact, 'Arial Black', sans-serif";
  c.fillStyle   = "#b83a00"; // brand orange
  c.textAlign   = "center";
  c.textBaseline= "middle";
  c.fillText("FORWARDER", W / 2, H * 0.73);
  c.restore();

  // ── 7. Operator code (ISO 6346) — upper right ────────────────────────────
  c.save();
  c.font        = "700 58px 'Courier New', monospace";
  c.fillStyle   = "#2c3e50";
  c.textAlign   = "right";
  c.textBaseline= "top";
  c.fillText("JCDF  U  347329  2", W - 50, 76);
  c.font        = "600 44px 'Courier New', monospace";
  c.fillStyle   = "#3e5468";
  c.fillText("45G1  ·  CHINA", W - 50, 148);
  c.restore();

  // ── 8. Thin horizontal rule ───────────────────────────────────────────────
  c.save();
  c.globalAlpha  = 0.22;
  c.strokeStyle  = "#6b8aa0";
  c.lineWidth    = 3;
  c.beginPath();
  c.moveTo(0, Math.round(H * 0.82));
  c.lineTo(W, Math.round(H * 0.82));
  c.stroke();
  c.restore();

  // ── 9. Weight data row ────────────────────────────────────────────────────
  c.save();
  c.font        = "500 38px Arial, sans-serif";
  c.fillStyle   = "#4a5a68";
  c.textAlign   = "left";
  c.textBaseline= "top";
  c.fillText(
    "MAX GROSS  30,480 KG      TARE  3,900 KG      MAX PAYLOAD  26,580 KG",
    28, Math.round(H * 0.84)
  );
  c.font      = "400 32px Arial, sans-serif";
  c.fillStyle = "#647a8a";
  c.fillText(
    "NVOCC LICENSED  ·  GD20240307220907  ·  SHENZHEN, CHINA",
    28, Math.round(H * 0.88)
  );
  c.restore();

  // ── 10. Faint rust streaks at base (weathering) ───────────────────────────
  const rust = c.createLinearGradient(0, H * 0.92, 0, H);
  rust.addColorStop(0, "rgba(101,60,28,0.0)");
  rust.addColorStop(1, "rgba(101,60,28,0.12)");
  c.fillStyle = rust;
  c.fillRect(0, Math.round(H * 0.92), W, Math.round(H * 0.08));

  // Fixed streak positions (no Math.random — deterministic texture)
  const streaks = [120,280,460,650,820,1010,1190,1370,1540,1720,1900];
  c.globalAlpha = 0.06;
  c.fillStyle   = "#7a4010";
  streaks.forEach(sx => {
    c.fillRect(sx, H * 0.88, 3, H * 0.12);
    c.fillRect(sx + 6, H * 0.91, 2, H * 0.09);
  });
  c.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
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

  const meshMap = useMemo(() => {
    const map: Record<string, THREE.Mesh> = {};
    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      obj.castShadow    = true;
      obj.receiveShadow = true;
      map[obj.name]     = obj;

      const mat = obj.material;
      if (!Array.isArray(mat) && mat instanceof THREE.MeshStandardMaterial) {
        mat.roughness       = Math.max(0.32, mat.roughness);
        mat.metalness       = Math.min(0.42, mat.metalness + 0.05);
        mat.envMapIntensity = 0.8;
        mat.needsUpdate     = true;
      }
    });
    return map;
  }, [scene]);

  // ── DIRECTLY REPLACE the white container's base-color texture ──────────────
  // This is guaranteed to work regardless of UV mapping or face orientation.
  // We build a canvas that matches the YANG MING visual style and swap
  // the material's map — no Decal projection guessing needed.
  useEffect(() => {
    const mesh = meshMap["Crate.001_Crate2_0"];
    if (!mesh) return;

    const mat = mesh.material;
    if (Array.isArray(mat) || !(mat instanceof THREE.MeshStandardMaterial)) return;

    const origMap = mat.map; // keep reference for cleanup
    const jcdTex  = buildJCDContainerTexture();

    mat.map        = jcdTex;
    mat.needsUpdate = true;

    return () => {
      jcdTex.dispose();
      mat.map        = origMap;
      mat.needsUpdate = true;
    };
  }, [meshMap]);

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
