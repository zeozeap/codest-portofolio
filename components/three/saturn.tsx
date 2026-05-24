"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Saturn() {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const planetTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;

    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, "#f0e6d2");
    gradient.addColorStop(0.2, "#e8ddb8");
    gradient.addColorStop(0.4, "#dfd0a8");
    gradient.addColorStop(0.5, "#d4c496");
    gradient.addColorStop(0.6, "#e0d5b0");
    gradient.addColorStop(0.8, "#e8ddb8");
    gradient.addColorStop(1, "#f0e6d2");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 256);

    for (let i = 0; i < 30; i++) {
      const y = Math.random() * 256;
      const alpha = Math.random() * 0.15 + 0.08;
      ctx.fillStyle = `rgba(160, 140, 120, ${alpha})`;
      ctx.fillRect(0, y, 512, 3 + Math.random() * 6);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  const ringTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;

    const gradient = ctx.createLinearGradient(0, 0, 512, 0);
    gradient.addColorStop(0, "rgba(220, 200, 170, 0)");
    gradient.addColorStop(0.1, "rgba(220, 200, 170, 0.4)");
    gradient.addColorStop(0.2, "rgba(200, 180, 150, 0.6)");
    gradient.addColorStop(0.3, "rgba(220, 200, 170, 0.3)");
    gradient.addColorStop(0.35, "rgba(220, 200, 170, 0)");
    gradient.addColorStop(0.4, "rgba(200, 180, 150, 0.7)");
    gradient.addColorStop(0.5, "rgba(220, 200, 170, 0.9)");
    gradient.addColorStop(0.6, "rgba(200, 180, 150, 0.7)");
    gradient.addColorStop(0.7, "rgba(220, 200, 170, 0.5)");
    gradient.addColorStop(0.8, "rgba(200, 180, 150, 0.4)");
    gradient.addColorStop(0.9, "rgba(220, 200, 170, 0.2)");
    gradient.addColorStop(1, "rgba(220, 200, 170, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 64);

    for (let i = 0; i < 150; i++) {
      const x = Math.random() * 512;
      const alpha = Math.random() * 0.4;
      ctx.fillStyle = `rgba(180, 160, 130, ${alpha})`;
      ctx.fillRect(x, 0, 1 + Math.random() * 3, 64);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.12;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.015;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.3, 0, 0]}>
      <mesh ref={planetRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={planetTexture}
          roughness={0.7}
          metalness={0.15}
          emissive="#ffecd1"
          emissiveIntensity={0.1}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.6, 4.2, 128]} />
        <meshStandardMaterial
          map={ringTexture}
          side={THREE.DoubleSide}
          transparent
          opacity={0.85}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      <pointLight position={[15, 10, 15]} intensity={2.5} color="#ffffff" decay={2} />
      <pointLight position={[-8, -5, -8]} intensity={0.8} color="#ffd700" decay={2} />
      <pointLight position={[0, 0, 0]} intensity={0.3} color="#fff5e6" decay={1} />
    </group>
  );
}
