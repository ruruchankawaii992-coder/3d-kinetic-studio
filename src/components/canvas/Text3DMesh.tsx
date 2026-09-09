import React, { useRef } from 'react';
import { useFrame, RootState } from '@react-three/fiber';
import { Center, Text3D } from '@react-three/drei';
import * as THREE from 'three';
import { useStudioStore, StudioState } from '../../store/useStudioStore';

export const Text3DMesh: React.FC = () => {
  const meshGroupRef = useRef<THREE.Group>(null);
  
  const text = useStudioStore((state: StudioState) => state.text);
  const font = useStudioStore((state: StudioState) => state.font);
  const color = useStudioStore((state: StudioState) => state.color);
  const emissiveColor = useStudioStore((state: StudioState) => state.emissiveColor);
  const material = useStudioStore((state: StudioState) => state.material);
  const wireframe = useStudioStore((state: StudioState) => state.wireframe);
  const physics = useStudioStore((state: StudioState) => state.physics);
  const animationPreset = useStudioStore((state: StudioState) => state.animationPreset);
  const speed = useStudioStore((state: StudioState) => state.speed);
  const intensity = useStudioStore((state: StudioState) => state.intensity);
  const isPaused = useStudioStore((state: StudioState) => state.isPaused);

  useFrame((state: RootState, delta: number) => {
    if (!meshGroupRef.current || isPaused) return;

    const t = state.clock.getElapsedTime() * speed;
    const factor = intensity / 50;

    switch (animationPreset) {
      case 'The Float':
        meshGroupRef.current.position.y = Math.sin(t * 1.5) * 0.25 * factor;
        meshGroupRef.current.rotation.x = Math.sin(t * 0.8) * 0.08 * factor;
        meshGroupRef.current.rotation.z = Math.cos(t * 1.0) * 0.05 * factor;
        meshGroupRef.current.rotation.y = 0;
        meshGroupRef.current.scale.set(1, 1, 1);
        break;

      case 'The Vortex':
        meshGroupRef.current.rotation.y += delta * 1.8 * speed;
        meshGroupRef.current.rotation.x = Math.sin(t) * 0.2 * factor;
        meshGroupRef.current.position.y = Math.cos(t * 2) * 0.15 * factor;
        meshGroupRef.current.scale.setScalar(1 + Math.sin(t * 3) * 0.08 * factor);
        break;

      case 'The Glitch': {
        const glitchTrigger = Math.sin(t * 8) > 0.85;
        if (glitchTrigger) {
          meshGroupRef.current.position.x = (Math.random() - 0.5) * 0.3 * factor;
          meshGroupRef.current.position.y = (Math.random() - 0.5) * 0.3 * factor;
          meshGroupRef.current.rotation.z = (Math.random() - 0.5) * 0.2 * factor;
        } else {
          meshGroupRef.current.position.x = THREE.MathUtils.lerp(meshGroupRef.current.position.x, 0, 0.2);
          meshGroupRef.current.position.y = THREE.MathUtils.lerp(meshGroupRef.current.position.y, 0, 0.2);
          meshGroupRef.current.rotation.z = THREE.MathUtils.lerp(meshGroupRef.current.rotation.z, 0, 0.2);
        }
        break;
      }

      case 'The Wave':
        meshGroupRef.current.position.y = Math.sin(t * 2.5) * 0.35 * factor;
        meshGroupRef.current.position.x = Math.cos(t * 1.8) * 0.2 * factor;
        meshGroupRef.current.rotation.y = Math.sin(t * 1.2) * 0.25 * factor;
        meshGroupRef.current.rotation.x = Math.cos(t * 1.5) * 0.15 * factor;
        break;

      case 'The Assemble': {
        const cycle = (t * 0.6) % (Math.PI * 2);
        const assembleScale = THREE.MathUtils.clamp(Math.sin(cycle) * 1.5, 0.2, 1.0);
        meshGroupRef.current.scale.set(assembleScale, assembleScale, assembleScale);
        meshGroupRef.current.rotation.y = (1 - assembleScale) * Math.PI * 2 * factor;
        break;
      }

      case 'The Pulsar': {
        const pulse = 1 + Math.sin(t * 4) * 0.18 * factor;
        meshGroupRef.current.scale.set(pulse, pulse, pulse);
        meshGroupRef.current.rotation.y = Math.sin(t * 0.5) * 0.1;
        break;
      }

      case 'None':
      default:
        meshGroupRef.current.position.set(0, 0, 0);
        meshGroupRef.current.rotation.set(0, 0, 0);
        meshGroupRef.current.scale.set(1, 1, 1);
        break;
    }
  });

  return (
    <group ref={meshGroupRef}>
      <Center>
        <Text3D
          font={font}
          size={1.2}
          height={physics.extrusionDepth}
          curveSegments={physics.curveSegments}
          bevelEnabled
          bevelThickness={physics.bevelThickness}
          bevelSize={physics.bevelSize}
          bevelOffset={0}
          bevelSegments={physics.bevelSegments}
          castShadow
          receiveShadow
        >
          {text || ' '}
          {material === 'Chrome/Metallic' && (
            <meshStandardMaterial
              color={color}
              metalness={0.95}
              roughness={0.12}
              wireframe={wireframe}
              envMapIntensity={1.8}
            />
          )}

          {material === 'Frosted Glass' && (
            <meshPhysicalMaterial
              color={color}
              transmission={0.88}
              roughness={0.28}
              thickness={1.5}
              ior={1.52}
              wireframe={wireframe}
              transparent
              opacity={0.92}
            />
          )}

          {material === 'Neon Glow' && (
            <meshStandardMaterial
              color={color}
              emissive={emissiveColor || color}
              emissiveIntensity={2.5 * (intensity / 50 || 1)}
              roughness={0.3}
              wireframe={wireframe}
              toneMapped={false}
            />
          )}

          {material === 'Holographic/Iridescent' && (
            <meshPhysicalMaterial
              color={color}
              iridescence={1}
              iridescenceIOR={1.8}
              iridescenceThicknessRange={[120, 450]}
              metalness={0.65}
              roughness={0.22}
              wireframe={wireframe}
            />
          )}
        </Text3D>
      </Center>
    </group>
  );
};
