'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// ============================================================
// Globe — globo terráqueo 3D wireframe que gira
// ============================================================
// Estilo: esfera wireframe celeste + puntos pulsantes en
// ciudades argentinas (color sol) y nodos globales (celeste).
// Sin textura externa: 100% procedural, ~0 KB extra de assets.
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
  { lat: 40.71, lng: -74.00 },   // NY
  { lat: 51.51, lng: -0.13 },    // Londres
  { lat: 35.68, lng: 139.65 },   // Tokio
  { lat: 1.35,  lng: 103.82 },   // Singapur
  { lat: -33.87, lng: 151.21 },  // Sydney
  { lat: 19.43, lng: -99.13 },   // CDMX
  { lat: -23.55, lng: -46.63 },  // São Paulo
  { lat: 37.77, lng: -122.42 },  // SF
  { lat: 48.85, lng: 2.35 },     // París
  { lat: 25.20, lng: 55.27 },    // Dubái
  { lat: -33.45, lng: -70.66 },  // Santiago de Chile
  { lat: 22.32, lng: 114.17 },   // Hong Kong
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

function GlobeCore() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Rotación suave hacia el este (como la Tierra real)
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  const radius = 2;

  // Pre-calcular posiciones de ciudades una sola vez
  const argPositions = useMemo(
    () => ARGENTINA_CITIES.map((c) => latLngToVector3(c.lat, c.lng, radius * 1.005)),
    [],
  );
  const worldPositions = useMemo(
    () => WORLD_NODES.map((c) => latLngToVector3(c.lat, c.lng, radius * 1.005)),
    [],
  );

  return (
    <group ref={groupRef} rotation={[0.25, 0, 0]}>
      {/* Esfera sólida de fondo (sutil, oscura) */}
      <Sphere args={[radius * 0.985, 64, 64]}>
        <meshBasicMaterial color="#0a1018" transparent opacity={0.92} />
      </Sphere>

      {/* Wireframe principal — la "rejilla" celeste */}
      <Sphere args={[radius, 36, 24]}>
        <meshBasicMaterial color="#5DC1E0" wireframe transparent opacity={0.32} />
      </Sphere>

      {/* Wireframe interno más denso (suma textura) */}
      <Sphere args={[radius * 0.999, 24, 16]}>
        <meshBasicMaterial color="#5DC1E0" wireframe transparent opacity={0.12} />
      </Sphere>

      {/* Halo / atmósfera */}
      <Sphere args={[radius * 1.05, 32, 32]}>
        <meshBasicMaterial
          color="#5DC1E0"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Puntos Argentina — color "sol" (dorado), más grandes */}
      {argPositions.map((pos, i) => (
        <mesh key={`ar-${i}`} position={pos}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#D4A843" />
        </mesh>
      ))}

      {/* Puntos mundo — celeste, más chiquitos */}
      {worldPositions.map((pos, i) => (
        <mesh key={`w-${i}`} position={pos}>
          <sphereGeometry args={[0.028, 12, 12]} />
          <meshBasicMaterial color="#5DC1E0" />
        </mesh>
      ))}
    </group>
  );
}

export default function Globe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.8], fov: 45 }}
      dpr={[1, 2]}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.7} />
      <GlobeCore />
    </Canvas>
  );
}
