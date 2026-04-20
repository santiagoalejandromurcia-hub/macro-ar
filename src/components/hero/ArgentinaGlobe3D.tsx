'use client';

import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  ARGENTINA_OUTLINE,
  KEY_CITIES,
  ARG_BOUNDS,
  type LngLat,
  type City,
} from '@/lib/argentinaOutline';

// ============================================================
// Proyección: lng/lat → x,y normalizados alrededor del origen.
// Para un hero 3D no hace falta Mercator real; la pequeña
// distorsión vertical queda bien en una vista perspectiva.
// ============================================================
const SCALE = 0.22;

function project([lng, lat]: LngLat): [number, number] {
  const x = (lng - ARG_BOUNDS.lngMid) * SCALE;
  // Y invertido: lat más alta (norte) → Y mayor en la escena.
  // Compensamos la razón lng/lat ≈ 0.58 para evitar que quede aplastado.
  const y = (lat - ARG_BOUNDS.latMid) * SCALE * 1.7;
  return [x, y];
}

// ============================================================
// ArgentinaShape — país extruido en 3D
// ============================================================
function ArgentinaShape() {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    ARGENTINA_OUTLINE.forEach((pt, i) => {
      const [x, y] = project(pt);
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.05,
      bevelSegments: 4,
      curveSegments: 6,
    });
    geom.center();
    return geom;
  }, []);

  const outlineGeometry = useMemo(() => {
    const points = ARGENTINA_OUTLINE.map(project).map(([x, y]) => new THREE.Vector3(x, y, 0.42));
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  return (
    <group>
      {/* Relleno con material tipo "obsidiana celeste" */}
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#1E3A5F"
          metalness={0.6}
          roughness={0.35}
          emissive="#0A1A30"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Contorno glowing en el borde superior */}
      <line>
        <primitive object={outlineGeometry} attach="geometry" />
        <lineBasicMaterial color="#74ACDF" transparent opacity={0.9} />
      </line>
    </group>
  );
}

// ============================================================
// CityPoint — punto glowing que representa un indicador vivo
// ============================================================
type LiveValue = { label: string; value: string; change?: number };
type LiveMap = Partial<Record<City['indicator'], LiveValue>>;

function CityPoint({
  city,
  live,
  hovered,
  setHovered,
}: {
  city: City;
  live: LiveValue | undefined;
  hovered: string | null;
  setHovered: (id: string | null) => void;
}) {
  const [x, y] = project(city.coord);
  const z = 0.55;
  const ref = useRef<THREE.Mesh>(null);
  const isHot = hovered === city.id;

  // Respiración de la esfera
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const base = isHot ? 1.4 : 1.0;
    ref.current.scale.setScalar(base + Math.sin(t * 2 + city.id.length) * 0.08);
  });

  const color = city.indicator === 'dolar' ? '#D4A843' : '#74ACDF';

  return (
    <group position={[x, y, z]}>
      {/* Pin base */}
      <mesh
        ref={ref}
        onPointerOver={() => setHovered(city.id)}
        onPointerOut={() => setHovered(null)}
      >
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Halo glow */}
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>

      {/* Columna de luz vertical */}
      <mesh position={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.008, 0.008, 0.3, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>

      {/* Tooltip */}
      {isHot && (
        <Html
          position={[0, 0, 0.35]}
          center
          distanceFactor={6}
          style={{ pointerEvents: 'none' }}
        >
          <div
            className="glass-card gradient-border numeric text-[11px] rounded-md px-3 py-2 whitespace-nowrap"
            style={{
              color: 'var(--text-primary)',
              minWidth: 120,
              boxShadow:
                '0 0 24px -4px rgba(116, 172, 223, 0.45), 0 0 48px -8px rgba(116, 172, 223, 0.25)',
            }}
          >
            <div className="text-[9px] uppercase tracking-wider opacity-60 mb-0.5">
              {city.name} · {live?.label ?? city.indicator}
            </div>
            <div className="text-sm font-semibold">
              {live?.value ?? '—'}
            </div>
            {typeof live?.change === 'number' && (
              <div
                className="text-[10px] mt-0.5"
                style={{ color: live.change >= 0 ? '#22C55E' : '#EF4444' }}
              >
                {live.change >= 0 ? '▲' : '▼'} {Math.abs(live.change).toFixed(2)}%
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

// ============================================================
// Scene — orquestador
// ============================================================
function Scene({ live }: { live: LiveMap }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const { camera } = useThree();

  // Auto-rotación sutil (se pausa cuando el usuario interactúa via OrbitControls)
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (hovered) return;
    groupRef.current.rotation.y += delta * 0.08;
  });

  // Cámara inicial
  useMemo(() => {
    camera.position.set(0, -2.2, 5.5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      {/* Luces */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} color="#FFFFFF" />
      <pointLight position={[-3, 2, 2]} intensity={0.6} color="#74ACDF" />
      <pointLight position={[3, -2, 2]} intensity={0.3} color="#D4A843" />

      {/* Fondo de estrellas */}
      <Stars radius={40} depth={30} count={2500} factor={3} fade speed={0.3} />

      {/* Plano "grid" con opacidad, a modo de horizonte holográfico */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, 0]}>
        <planeGeometry args={[40, 40, 40, 40]} />
        <meshBasicMaterial
          color="#74ACDF"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      <group ref={groupRef} rotation={[-0.25, 0, 0]}>
        <ArgentinaShape />

        {/* Puntos de ciudades */}
        {KEY_CITIES.map((city) => (
          <CityPoint
            key={city.id}
            city={city}
            live={live[city.indicator]}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
      </group>
    </>
  );
}

// ============================================================
// ArgentinaGlobe3D — componente exportado
// ============================================================
export default function ArgentinaGlobe3D({ live }: { live?: LiveMap }) {
  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px]">
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45, position: [0, -2.2, 5.5] }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene live={live ?? {}} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.9}
            rotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>

      {/* Indicador "3D · interactivo" abajo a la derecha */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-theme-muted pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-ar-celeste animate-pulse" />
        arrastrá para rotar
      </div>
    </div>
  );
}
