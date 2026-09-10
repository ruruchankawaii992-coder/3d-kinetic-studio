import React, { useRef, useMemo } from 'react';
import { useFrame, RootState } from '@react-three/fiber';
import { Center, Text3D, useFont } from '@react-three/drei';
import * as THREE from 'three';
import { useStudioStore, StudioState } from '../../store/useStudioStore';

export const Text3DMesh: React.FC = () => {
  const meshGroupRef = useRef<THREE.Group>(null);
  const charRefs = useRef<THREE.Mesh[]>([]);
  const accumulatedTimeRef = useRef<number>(0);
  
  const text = useStudioStore((state: StudioState) => state.text);
  const fontPath = useStudioStore((state: StudioState) => state.font);
  const color = useStudioStore((state: StudioState) => state.color);
  const emissiveColor = useStudioStore((state: StudioState) => state.emissiveColor);
  const material = useStudioStore((state: StudioState) => state.material);
  const wireframe = useStudioStore((state: StudioState) => state.wireframe);
  const physics = useStudioStore((state: StudioState) => state.physics);
  const animationPreset = useStudioStore((state: StudioState) => state.animationPreset);
  const speed = useStudioStore((state: StudioState) => state.speed);
  const intensity = useStudioStore((state: StudioState) => state.intensity);
  const isPaused = useStudioStore((state: StudioState) => state.isPaused);

  const fontData = useFont(fontPath);

  // Calculate character positions based on letter spacing
  const charData = useMemo(() => {
    const chars = text.split('');
    const positions: number[] = [];
    let currentX = 0;
    const size = 1.2;
    const scale = size / fontData.data.resolution;

    chars.forEach((char) => {
      positions.push(currentX);
      const glyph = fontData.data.glyphs[char] || fontData.data.glyphs['?'] || { ha: 0 };
      // ha is horizontal advance
      currentX += (glyph.ha * scale) + physics.letterSpacing;
    });

    return { chars, positions };
  }, [text, fontData, physics.letterSpacing]);

  useFrame((_state: RootState, delta: number) => {
    if (!meshGroupRef.current) return;

    if (!isPaused) {
      accumulatedTimeRef.current += delta * speed;
    }

    const t = accumulatedTimeRef.current;
    const factor = intensity / 50;

    // Reset parent group transforms for per-character animations
    meshGroupRef.current.position.set(0, 0, 0);
    meshGroupRef.current.rotation.set(0, 0, 0);
    meshGroupRef.current.scale.set(1, 1, 1);

    charRefs.current.forEach((charMesh, i) => {
      if (!charMesh) return;

      charMesh.position.set(charData.positions[i], 0, 0); // Reset to initial position
      charMesh.rotation.set(0, 0, 0);
      charMesh.scale.set(1, 1, 1);

      switch (animationPreset) {
        case 'The Float':
          charMesh.position.y = Math.sin(t * 1.5 + i * 0.3) * 0.25 * factor;
          charMesh.rotation.x = Math.sin(t * 0.8 + i * 0.2) * 0.08 * factor;
          charMesh.rotation.z = Math.cos(t * 1.0 + i * 0.1) * 0.05 * factor;
          break;

        case 'The Vortex':
          const vortexAngle = t * 2 + i * 0.4;
          const vortexRadius = 0.5 + Math.sin(t * 0.5 + i * 0.1) * 0.2;
          charMesh.position.x = charData.positions[i] + Math.cos(vortexAngle) * vortexRadius * factor;
          charMesh.position.y = Math.sin(vortexAngle) * vortexRadius * factor;
          charMesh.rotation.y = vortexAngle;
          charMesh.rotation.z = Math.sin(t * 1.5 + i * 0.3) * 0.5 * factor;
          charMesh.scale.setScalar(1 + Math.sin(t * 3 + i * 0.2) * 0.08 * factor);
          break;

        case 'The Glitch': {
          const glitchTrigger = Math.sin(t * 12 + i * 0.5) > 0.9;
          if (glitchTrigger) {
            charMesh.position.x += (Math.random() - 0.5) * 0.6 * factor;
            charMesh.position.y += (Math.random() - 0.5) * 0.6 * factor;
            charMesh.rotation.z += (Math.random() - 0.5) * 0.8 * factor;
            charMesh.scale.setScalar(1 + (Math.random() - 0.5) * 0.3 * factor);
          } else {
            charMesh.position.x = THREE.MathUtils.lerp(charMesh.position.x, charData.positions[i], 0.2);
            charMesh.position.y = THREE.MathUtils.lerp(charMesh.position.y, 0, 0.2);
            charMesh.rotation.z = THREE.MathUtils.lerp(charMesh.rotation.z, 0, 0.2);
            charMesh.scale.setScalar(THREE.MathUtils.lerp(charMesh.scale.x, 1, 0.2));
          }
          break;
        }

        case 'The Wave':
          charMesh.position.y = Math.sin(t * 2.5 + i * 0.4) * 0.4 * factor;
          charMesh.position.z = Math.cos(t * 1.8 + i * 0.3) * 0.3 * factor;
          charMesh.rotation.x = Math.sin(t * 1.5 + i * 0.2) * 0.3 * factor;
          charMesh.rotation.y = Math.cos(t * 1.2 + i * 0.1) * 0.2 * factor;
          break;

        case 'The Assemble': {
          const assembleProgress = THREE.MathUtils.clamp(Math.sin(t * 0.6 - i * 0.15), -0.5, 1);
          const startOffset = 5 * (1 - assembleProgress);
          charMesh.position.x = charData.positions[i] + (Math.random() - 0.5) * startOffset * factor;
          charMesh.position.y = (Math.random() - 0.5) * startOffset * factor;
          charMesh.position.z = (Math.random() - 0.5) * startOffset * factor;
          charMesh.rotation.x = (1 - assembleProgress) * Math.PI * 2 * factor;
          charMesh.rotation.y = (1 - assembleProgress) * Math.PI * 2 * factor;
          charMesh.scale.setScalar(assembleProgress * factor);
          break;
        }

        case 'The Pulsar': {
          const pulse = 1 + Math.sin(t * 4 + i * 0.3) * 0.2 * factor;
          charMesh.scale.set(pulse, pulse, pulse);
          charMesh.rotation.y = Math.sin(t * 0.5 + i * 0.1) * 0.15 * factor;
          break;
        }

        case 'None':
        default:
          // Already reset at the beginning of the loop
          break;
      }
    });
  });

  const renderMaterial = () => {
    switch (material) {
      case 'Chrome/Metallic':
        return (
          <meshStandardMaterial
            color={color}
            metalness={0.95}
            roughness={0.12}
            wireframe={wireframe}
            envMapIntensity={1.8}
          />
        );
      case 'Frosted Glass':
        return (
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
        );
      case 'Neon Glow':
        return (
          <meshStandardMaterial
            color={color}
            emissive={emissiveColor || color}
            emissiveIntensity={2.5 * (intensity / 50 || 1)}
            roughness={0.3}
            wireframe={wireframe}
            toneMapped={false}
          />
        );
      case 'Holographic/Iridescent':
        return (
          <meshPhysicalMaterial
            color={color}
            iridescence={1}
            iridescenceIOR={1.8}
            iridescenceThicknessRange={[120, 450]}
            metalness={0.65}
            roughness={0.22}
            wireframe={wireframe}
          />
        );
      default:
        return <meshStandardMaterial color={color} wireframe={wireframe} />;
    }
  };

  return (
    <group ref={meshGroupRef}>
      <Center>
        <group>
          {charData.chars.map((char, i) => (
            <Text3D
              key={`${i}-${char}`}
              ref={(el) => { if (el) charRefs.current[i] = el; }}
              font={fontPath}
              size={1.2}
              height={physics.extrusionDepth}
              curveSegments={physics.curveSegments}
              bevelEnabled
              bevelThickness={physics.bevelThickness}
              bevelSize={physics.bevelSize}
              bevelOffset={physics.bevelOffset}
              bevelSegments={physics.bevelSegments}
              castShadow
              receiveShadow
              position={[charData.positions[i], 0, 0]}
            >
              {char}
              {renderMaterial()}
            </Text3D>
          ))}
        </group>
      </Center>
    </group>
  );
};
