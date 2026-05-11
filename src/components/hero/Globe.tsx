'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';

// ============================================================
// Globe — globo terráqueo 3D REAL con textura de Tierra
// ============================================================
// Usa /public/img/earth-texture.jpg (equirectangular 2:1).
// Si esa imagen no existe, cae a un wireframe celeste de fallback.
//
// Para descargar la textura oficial (NASA Blue Marble / Three.js):
//   curl -L -o public/img/earth-texture.jpg \
//     https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg
// ============================================================

const ARGENTINA_CITIES = [
  { lat: -34.61, lng: -58.38 }, // Buenos Aires
  { lat: -31.42, lng: -64.18 }, // Córdoba
  { lat: -32.89, lng: -68.84 }, // Mendoza
  { lat: -24.78, lng: -65.41 }, // Salta
  { lat: -54.81, lng: -68.31 }, // Ushuaia
  { lat: -27.36, lng: -55.90 }, // Posadas
  { lat: -38.95, lng: -68.06 }, // Neuquén
  { lat: -45.86, lng: -67.49 }, // Comodoro Rivadavia
  { lat: -26.83, lng: -65.22 }, // Tucumán
];

const WORLD_NODES = [
  { lat: 40.71,  lng: -74.00 },  // NY
  { lat: 51.51,  lng: -0.13 },   // Londres
  { lat: 35.68,  lng: 139.65 },  // Tokio
  { lat: 1.35,   lng: 103.82 },  // Singapur
  { lat: -33.87, lng: 151.21 },  // Sydney
  { lat: 19.43,  lng: -99.13 },  // CDMX
  { lat: -23.55, lng: -46.63 },  // São Paulo
  { lat: 37.77,  lng: -122.42 }, // San Francisco
  { lat: 48.85,  lng: 2.35 },    // París
  { lat: 25.20,  lng: 55.27 },   // Dubái
  { lat: -33.45, lng: -70.66 },  // Santiago de Chile
  { lat: 22.32,  lng: 114.17 },  // Hong Kong
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

// ─── Ciudades como puntos visibles sobre el globo ───────────
function CityDots({ radius }: { radius: number }) {
  const argPositions = useMemo(
    () => ARGENTINA_CITIES.map((c) => latLngToVector3(c.lat, c.lng, radius * 1.01)),
    [radius],
  );
  const worldPositions = useMemo(
    () => WORLD_NODES.map((c) => latLngToVector3(c.lat, c.lng, radius * 1.01)),
    [radius],
  );

  return (
    <>
      {/* Argentina — dorados, más grandes */}
      {argPositions.map((pos, i) => (
        <mesh key={`ar-${i}`} position={pos}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#D4A843" />
        </mesh>
      ))}
      {/* Resto del mundo — celestes */}
      {worldPositions.map((pos, i) => (
        <mesh key={`w-${i}`} position={pos}>
          <sphereGeometry args={[0.028, 12, 12]} />
          <meshBasicMaterial color="#5DC1E0" />
        </mesh>
      ))}
    </>
  );
}

// ─── Globo con textura realista de Tierra ───────────────────
function EarthGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useLoader(THREE.TextureLoader, '/img/earth-texture.jpg');

  // Mejor calidad de muestreo
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08;
  });

  const radius = 2;

  return (
    <group ref={groupRef} rotation={[0.25, 0, 0]}>
      {/* La Tierra */}
      <Sphere args={[radius, 64, 64]}>
        <meshStandardMaterial
          map={texture}
          roughness={0.85}
          metalness={0.05}
        />
      </Sphere>

      {/* Atmósfera celeste (glow exterior) */}
      <Sphere args={[radius * 1.04, 32, 32]}>
        <meshBasicMaterial
          color="#5DC1E0"
          transparent
          opacity={0.10}
          side={THREE.BackSide}
        />
      </Sphere>

      <CityDots radius={radius} />
    </group>
  );
}

// ─── Fallback wireframe si la textura no carga / no existe ─
function WireframeGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08;
  });

  const radius = 2;
  return (
    <group ref={groupRef} rotation={[0.25, 0, 0]}>
      <Sphere args={[radius * 0.985, 64, 64]}>
        <meshBasicMaterial color="#0a1018" transparent opacity={0.92} />
      </Sphere>
      <Sphere args={[radius, 36, 24]}>
        <meshBasicMaterial color="#5DC1E0" wireframe transparent opacity={0.32} />
      </Sphere>
      <Sphere args={[radius * 1.05, 32, 32]}>
        <meshBasicMaterial
          color="#5DC1E0"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </Sphere>
      <CityDots radius={radius} />
    </group>
  );
}

// ─── Error boundary simple para fallback si la textura falla ─
class GlobeErrorBoundary extends Error {}

export default function Globe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.2], fov: 42 }}
      dpr={[1, 2]}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Luz ambiente suave + directional fuerte que simula el sol */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#5DC1E0" />

      <Suspense fallback={<WireframeGlobe />}>
        <EarthGlobe />
      </Suspense>
    </Canvas>
  );
}
