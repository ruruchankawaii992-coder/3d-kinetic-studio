import React, { useRef, useMemo } from 'react';
import { useFrame, RootState } from '@react-three/fiber';
import { Center, Text3D, useFont } from '@react-three/drei';
import * as THREE from 'three';
import { useStudioStore, StudioState } from '../../store/useStudioStore';

export const Text3DMesh: React.FC = () => {
  const meshGroupRef = useRef<THREE.Group>(null);
  const charRefs = useRef<THREE.Mesh[]>([]);
  
  const text = useStudioStore((state: StudioState) => state.text);
  const fontPath = useStudioStore((state: StudioState) => state.font);
  const color = useStudioStore((state: StudioState) => state.color);
  const emissiveColor = useStudioStore((state: StudioState) => state.emissiveColor);
  const material = useStudioStore((state: StudioState) => state.material);
  const materialParams = useStudioStore((state: StudioState) => state.materialParams);
  const wireframeMode = useStudioStore((state: StudioState) => state.wireframeMode);
  const wireframeColor = useStudioStore((state: StudioState) => state.wireframeColor);
  const glowHalos = useStudioStore((state: StudioState) => state.glowHalos);
  const physics = useStudioStore((state: StudioState) => state.physics);
  const animationPreset = useStudioStore((state: StudioState) => state.animationPreset);
  const speed = useStudioStore((state: StudioState) => state.speed);
  const intensity = useStudioStore((state: StudioState) => state.intensity);
  const isPaused = useStudioStore((state: StudioState) => state.isPaused);
  const loop = useStudioStore((state: StudioState) => state.loop);
  const reducedMotion = useStudioStore((state: StudioState) => state.reducedMotion);
  const lowPowerMode = useStudioStore((state: StudioState) => state.lowPowerMode);
  
  const currentTime = useStudioStore((state: StudioState) => state.currentTime);
  const setCurrentTime = useStudioStore((state: StudioState) => state.setCurrentTime);
  const maxTime = useStudioStore((state: StudioState) => state.maxTime);
  const isScrubbing = useStudioStore((state: StudioState) => state.isScrubbing);

  // Custom 3D texture state
  const customTextureUrl = useStudioStore((state: StudioState) => state.customTextureUrl);
  const customTextureTiling = useStudioStore((state: StudioState) => state.customTextureTiling);
  const customTextureOffset = useStudioStore((state: StudioState) => state.customTextureOffset);
  const customTextureRotation = useStudioStore((state: StudioState) => state.customTextureRotation);

  const [loadedTexture, setLoadedTexture] = React.useState<THREE.Texture | null>(null);

  // Load custom texture when URL changes
  React.useEffect(() => {
    if (!customTextureUrl) {
      setLoadedTexture((prev) => {
        if (prev) prev.dispose();
        return null;
      });
      return;
    }

    const loader = new THREE.TextureLoader();
    let isMounted = true;

    loader.load(
      customTextureUrl,
      (texture) => {
        if (!isMounted) {
          texture.dispose();
          return;
        }
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(customTextureTiling.x, customTextureTiling.y);
        texture.offset.set(customTextureOffset.x, customTextureOffset.y);
        texture.center.set(0.5, 0.5);
        texture.rotation = (customTextureRotation * Math.PI) / 180;
        texture.needsUpdate = true;

        setLoadedTexture((prev) => {
          if (prev) prev.dispose();
          return texture;
        });
      },
      undefined,
      (err) => {
        console.error('Error loading custom 3D texture:', err);
      }
    );

    return () => {
      isMounted = false;
    };
  }, [customTextureUrl]);

  // Dynamically update transform properties on loaded texture
  React.useEffect(() => {
    if (loadedTexture) {
      loadedTexture.wrapS = THREE.RepeatWrapping;
      loadedTexture.wrapT = THREE.RepeatWrapping;
      loadedTexture.repeat.set(customTextureTiling.x, customTextureTiling.y);
      loadedTexture.offset.set(customTextureOffset.x, customTextureOffset.y);
      loadedTexture.center.set(0.5, 0.5);
      loadedTexture.rotation = (customTextureRotation * Math.PI) / 180;
      loadedTexture.needsUpdate = true;
    }
  }, [loadedTexture, customTextureTiling.x, customTextureTiling.y, customTextureOffset.x, customTextureOffset.y, customTextureRotation]);

  // Clean up GPU texture memory on unmount
  React.useEffect(() => {
    return () => {
      if (loadedTexture) {
        loadedTexture.dispose();
      }
      charRefs.current = [];
    };
  }, [loadedTexture]);

  const fontData = useFont(fontPath);

  // Calculate character positions based on letter spacing
  const charData = useMemo(() => {
    const chars = (text || '').split('');
    const positions: number[] = [];
    let currentX = 0;
    const size = 1.2;
    const resolution = fontData?.data?.resolution || 1000;
    const scale = size / resolution;

    chars.forEach((char) => {
      positions.push(currentX);
      const glyphs = fontData?.data?.glyphs || {};
      const glyph = glyphs[char] || glyphs['?'] || { ha: 0 };
      const ha = typeof glyph.ha === 'number' ? glyph.ha : (resolution * 0.5);
      // ha is horizontal advance
      currentX += (ha * scale) + (physics.letterSpacing || 0);
    });

    return { chars, positions };
  }, [text, fontData, physics.letterSpacing]);

  // Synchronize charRefs array length and clean up stale references when text length changes
  React.useEffect(() => {
    charRefs.current = charRefs.current.slice(0, charData.chars.length);
  }, [charData.chars.length]);

  useFrame((_state: RootState, delta: number) => {
    if (!meshGroupRef.current) return;

    // Reset parent group transforms
    meshGroupRef.current.position.set(0, 0, 0);
    meshGroupRef.current.rotation.set(0, 0, 0);
    meshGroupRef.current.scale.set(1, 1, 1);

    const validCount = Math.min(charRefs.current.length, charData.positions.length);
    if (validCount === 0) return;

    if (reducedMotion) {
      for (let i = 0; i < validCount; i++) {
        const charMesh = charRefs.current[i];
        const posX = charData.positions[i];
        if (!charMesh || posX === undefined) continue;
        charMesh.position.set(posX, 0, 0);
        charMesh.rotation.set(0, 0, 0);
        charMesh.scale.set(1, 1, 1);
      }
      return;
    }

    let t = currentTime;

    if (!isPaused && !isScrubbing) {
      t += delta * speed;
      
      // Looping logic
      if (loop) {
        t = t % maxTime;
      } else if (t > maxTime) {
        t = maxTime;
      }
      
      setCurrentTime(t);
    }

    const factor = intensity / 50;

    // Reset parent group transforms for per-character animations
    meshGroupRef.current.position.set(0, 0, 0);
    meshGroupRef.current.rotation.set(0, 0, 0);
    meshGroupRef.current.scale.set(1, 1, 1);

    for (let i = 0; i < validCount; i++) {
      const charMesh = charRefs.current[i];
      const initialX = charData.positions[i];
      if (!charMesh || initialX === undefined) continue;

      charMesh.position.set(initialX, 0, 0); // Reset to initial position
      charMesh.rotation.set(0, 0, 0);
      charMesh.scale.set(1, 1, 1);

      switch (animationPreset) {
        case 'The Float':
          charMesh.position.y = Math.sin(t * 1.5 + i * 0.3) * 0.25 * factor;
          charMesh.rotation.x = Math.sin(t * 1.0 + i * 0.2) * 0.08 * factor;
          charMesh.rotation.z = Math.cos(t * 1.0 + i * 0.1) * 0.05 * factor;
          break;

        case 'The Vortex':
          const vortexAngle = t * 2 + i * 0.4;
          const vortexRadius = 0.5 + Math.sin(t * 0.5 + i * 0.1) * 0.2;
          charMesh.position.x = initialX + Math.cos(vortexAngle) * vortexRadius * factor;
          charMesh.position.y = Math.sin(vortexAngle) * vortexRadius * factor;
          charMesh.rotation.y = vortexAngle;
          charMesh.rotation.z = Math.sin(t * 1.5 + i * 0.3) * 0.5 * factor;
          charMesh.scale.setScalar(1 + Math.sin(t * 3.0 + i * 0.2) * 0.08 * factor);
          break;

        case 'The Glitch': {
          const glitchTrigger = Math.sin(t * 12 + i * 0.5) > 0.9;
          if (glitchTrigger) {
            charMesh.position.x += (Math.random() - 0.5) * 0.6 * factor;
            charMesh.position.y += (Math.random() - 0.5) * 0.6 * factor;
            charMesh.rotation.z += (Math.random() - 0.5) * 0.8 * factor;
            charMesh.scale.setScalar(1 + (Math.random() - 0.5) * 0.3 * factor);
          } else {
            charMesh.position.x = THREE.MathUtils.lerp(charMesh.position.x, initialX, 0.2);
            charMesh.position.y = THREE.MathUtils.lerp(charMesh.position.y, 0, 0.2);
            charMesh.rotation.z = THREE.MathUtils.lerp(charMesh.rotation.z, 0, 0.2);
            charMesh.scale.setScalar(THREE.MathUtils.lerp(charMesh.scale.x, 1, 0.2));
          }
          break;
        }

        case 'The Wave':
          charMesh.position.y = Math.sin(t * 2.5 + i * 0.4) * 0.4 * factor;
          charMesh.position.z = Math.cos(t * 2.0 + i * 0.3) * 0.3 * factor;
          charMesh.rotation.x = Math.sin(t * 1.5 + i * 0.2) * 0.3 * factor;
          charMesh.rotation.y = Math.cos(t * 1.0 + i * 0.1) * 0.2 * factor;
          break;

        case 'The Assemble': {
          const assembleProgress = THREE.MathUtils.clamp(Math.sin(t * 0.5 - i * 0.15), -0.5, 1);
          const startOffset = 5 * (1 - assembleProgress);
          charMesh.position.x = initialX + (Math.random() - 0.5) * startOffset * factor;
          charMesh.position.y = (Math.random() - 0.5) * startOffset * factor;
          charMesh.position.z = (Math.random() - 0.5) * startOffset * factor;
          charMesh.rotation.x = (1 - assembleProgress) * Math.PI * 2 * factor;
          charMesh.rotation.y = (1 - assembleProgress) * Math.PI * 2 * factor;
          charMesh.scale.setScalar(assembleProgress * factor);
          break;
        }

        case 'The Pulsar': {
          const pulse = 1 + Math.sin(t * 4.0 + i * 0.3) * 0.2 * factor;
          charMesh.scale.set(pulse, pulse, pulse);
          charMesh.rotation.y = Math.sin(t * 0.5 + i * 0.1) * 0.15 * factor;
          break;
        }

        case 'None':
        default:
          // Already reset at the beginning of the loop
          break;
      }
    }
  });

  const renderMaterial = () => {
    if (wireframeMode) {
      return (
        <meshBasicMaterial
          color={wireframeColor}
          wireframe={true}
          transparent
          opacity={glowHalos ? 0.9 : 0.6}
        />
      );
    }
    switch (material) {
      case 'Chrome/Metallic':
        return (
          <meshPhysicalMaterial
            color={color}
            metalness={materialParams.metalness}
            roughness={materialParams.roughness}
            clearcoat={materialParams.clearcoat}
            clearcoatRoughness={materialParams.clearcoatRoughness}
            reflectivity={1.0}
            envMapIntensity={2.0}
            wireframe={false}
            map={loadedTexture}
          />
        );
      case 'Frosted Glass':
        return (
          <meshPhysicalMaterial
            color={color}
            transmission={materialParams.transmission}
            roughness={materialParams.roughness}
            thickness={materialParams.thickness}
            ior={materialParams.ior}
            wireframe={false}
            transparent
            opacity={0.95}
            envMapIntensity={1.5}
            map={loadedTexture}
          />
        );
      case 'Neon Glow':
        return (
          <meshStandardMaterial
            color={color}
            emissive={emissiveColor || color}
            emissiveIntensity={materialParams.emissiveIntensity * (intensity / 50 || 1)}
            roughness={materialParams.roughness}
            wireframe={false}
            toneMapped={false}
            map={loadedTexture}
          />
        );
      case 'Holographic/Iridescent':
        return (
          <meshPhysicalMaterial
            color={color}
            iridescence={materialParams.iridescence}
            iridescenceIOR={materialParams.iridescenceIOR}
            iridescenceThicknessRange={[
              materialParams.iridescenceThicknessMin,
              materialParams.iridescenceThicknessMax,
            ]}
            metalness={materialParams.metalness}
            roughness={materialParams.roughness}
            clearcoat={materialParams.clearcoat}
            clearcoatRoughness={materialParams.clearcoatRoughness}
            wireframe={false}
            envMapIntensity={1.8}
            map={loadedTexture}
          />
        );
      case 'Matte/Clay':
        return (
          <meshStandardMaterial
            color={color}
            metalness={materialParams.metalness}
            roughness={materialParams.roughness}
            wireframe={false}
            map={loadedTexture}
          />
        );
      case 'Gold/Brass':
        return (
          <meshPhysicalMaterial
            color={color || '#FFD700'}
            metalness={materialParams.metalness}
            roughness={materialParams.roughness}
            clearcoat={materialParams.clearcoat}
            clearcoatRoughness={materialParams.clearcoatRoughness}
            envMapIntensity={2.0}
            wireframe={false}
            map={loadedTexture}
          />
        );
      default:
        return <meshStandardMaterial color={color} wireframe={false} map={loadedTexture} />;
    }
  };

  return (
    <group ref={meshGroupRef}>
      <Center>
        <group>
          {charData.chars.map((char, i) => (
            <React.Fragment key={`${i}-${char}`}>
              <Text3D
                ref={(el) => {
                  if (el) {
                    charRefs.current[i] = el;
                  } else {
                    charRefs.current[i] = null as any;
                  }
                }}
                font={fontPath}
                size={1.2}
                height={physics.extrusionDepth}
                curveSegments={lowPowerMode ? Math.max(3, Math.floor(physics.curveSegments / 2)) : physics.curveSegments}
                bevelEnabled
                bevelThickness={physics.bevelThickness}
                bevelSize={physics.bevelSize}
                bevelOffset={physics.bevelOffset}
                bevelSegments={lowPowerMode ? Math.max(1, Math.floor(physics.bevelSegments / 2)) : physics.bevelSegments}
                castShadow={!wireframeMode}
                receiveShadow={!wireframeMode}
                position={[charData.positions[i], 0, 0]}
              >
                {char}
                {renderMaterial()}
              </Text3D>
            </React.Fragment>
          ))}
        </group>
      </Center>
    </group>
  );
};
