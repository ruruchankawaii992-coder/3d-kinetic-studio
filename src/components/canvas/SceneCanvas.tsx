import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { Text3DMesh } from './Text3DMesh';
import { useStudioStore, StudioState } from '../../store/useStudioStore';
import { ErrorBoundary } from '../ui/ErrorBoundary';

class CanvasErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn('Canvas subcomponent failed to load (likely HDR/Environment or asset):', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

const CameraController: React.FC = () => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const cameraResetTrigger = useStudioStore((state: StudioState) => state.cameraResetTrigger);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [cameraResetTrigger]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      minDistance={2}
      maxDistance={20}
      makeDefault
    />
  );
};

const LoadingFallback: React.FC = () => (
  <Html center>
    <div className="flex flex-col items-center justify-center p-4 rounded-xl glass-panel text-cyan-400">
      <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-2" />
      <span className="text-xs font-mono uppercase tracking-wider">Generating 3D Mesh...</span>
    </div>
  </Html>
);

const OrbitingLight: React.FC = () => {
  const lightRef = useRef<THREE.PointLight>(null);

  const orbitingLightEnabled = useStudioStore((state: StudioState) => state.orbitingLightEnabled);
  const orbitingLightSpeed = useStudioStore((state: StudioState) => state.orbitingLightSpeed);
  const orbitingLightColor = useStudioStore((state: StudioState) => state.orbitingLightColor);
  const orbitingLightIntensity = useStudioStore((state: StudioState) => state.orbitingLightIntensity);
  const orbitingLightRadius = useStudioStore((state: StudioState) => state.orbitingLightRadius);
  const shadowMapSize = useStudioStore((state: StudioState) => state.shadowMapSize);
  const shadowBias = useStudioStore((state: StudioState) => state.shadowBias);
  const shadowRadius = useStudioStore((state: StudioState) => state.shadowRadius);
  const castShadows = useStudioStore((state: StudioState) => state.castShadows);

  useFrame((state) => {
    if (!lightRef.current || !orbitingLightEnabled) return;
    const t = state.clock.getElapsedTime() * orbitingLightSpeed;
    const x = Math.sin(t) * orbitingLightRadius;
    const z = Math.cos(t) * orbitingLightRadius;
    const y = Math.sin(t * 0.5) * (orbitingLightRadius * 0.4); // elegant vertical movement
    lightRef.current.position.set(x, y, z);
  });

  if (!orbitingLightEnabled) return null;

  return (
    <pointLight
      ref={lightRef}
      color={orbitingLightColor}
      intensity={orbitingLightIntensity}
      castShadow={castShadows}
      shadow-mapSize-width={shadowMapSize}
      shadow-mapSize-height={shadowMapSize}
      shadow-bias={shadowBias}
      shadow-radius={shadowRadius}
    />
  );
};

export const SceneCanvas: React.FC = () => {
  const stageLighting = useStudioStore((state: StudioState) => state.stageLighting);
  const ambientIntensity = useStudioStore((state: StudioState) => state.ambientIntensity);
  const ambientColor = useStudioStore((state: StudioState) => state.ambientColor);
  const directionalIntensity = useStudioStore((state: StudioState) => state.directionalIntensity);
  const directionalColor = useStudioStore((state: StudioState) => state.directionalColor);
  const directionalPosition = useStudioStore((state: StudioState) => state.directionalPosition);
  const environmentIntensity = useStudioStore((state: StudioState) => state.environmentIntensity);
  const environmentRotation = useStudioStore((state: StudioState) => state.environmentRotation);
  const backgroundColor = useStudioStore((state: StudioState) => state.backgroundColor);
  const shadowMapSize = useStudioStore((state: StudioState) => state.shadowMapSize);
  const shadowBias = useStudioStore((state: StudioState) => state.shadowBias);
  const shadowRadius = useStudioStore((state: StudioState) => state.shadowRadius);
  const castShadows = useStudioStore((state: StudioState) => state.castShadows);

  return (
    <div className="w-full h-full relative select-none">
      <ErrorBoundary componentName="Canvas">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          shadows
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          <color attach="background" args={[backgroundColor]} />
          
          {/* Lights */}
          <ambientLight intensity={ambientIntensity} color={ambientColor} />
          <directionalLight
            position={directionalPosition}
            intensity={directionalIntensity}
            color={directionalColor}
            castShadow={castShadows}
            shadow-mapSize-width={shadowMapSize}
            shadow-mapSize-height={shadowMapSize}
            shadow-bias={shadowBias}
            shadow-radius={shadowRadius}
            shadow-camera-far={20}
            shadow-camera-left={-6}
            shadow-camera-right={6}
            shadow-camera-top={6}
            shadow-camera-bottom={-6}
          />
          <pointLight position={[-6, -4, -4]} intensity={0.6} color="#9D4EDD" />
          <pointLight position={[6, 4, 3]} intensity={0.8} color="#00F0FF" />

          {/* Orbiting dynamic light */}
          <OrbitingLight />

          {/* Environment HDR Preset */}
          <CanvasErrorBoundary
            fallback={
              <>
                <ambientLight intensity={0.5} />
                <directionalLight position={[-5, 5, -5]} intensity={0.5} />
              </>
            }
          >
            <Suspense fallback={null}>
              <Environment 
                {...({
                  preset: stageLighting,
                  environmentIntensity: environmentIntensity,
                  rotation: [0, environmentRotation * Math.PI / 180, 0]
                } as any)}
              />
            </Suspense>
          </CanvasErrorBoundary>

          {/* Controls */}
          <CameraController />

          {/* 3D Geometry */}
          <CanvasErrorBoundary
            fallback={
              <Html center>
                <div className="p-4 rounded-xl glass-panel text-red-400 text-xs font-mono">
                  Failed to load 3D mesh.
                </div>
              </Html>
            }
          >
            <Suspense fallback={<LoadingFallback />}>
              <Text3DMesh />
            </Suspense>
          </CanvasErrorBoundary>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};
