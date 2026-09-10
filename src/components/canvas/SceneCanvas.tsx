import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
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

export const SceneCanvas: React.FC = () => {
  const stageLighting = useStudioStore((state: StudioState) => state.stageLighting);
  const ambientIntensity = useStudioStore((state: StudioState) => state.ambientIntensity);
  const directionalIntensity = useStudioStore((state: StudioState) => state.directionalIntensity);

  return (
    <div className="w-full h-full relative select-none">
      <ErrorBoundary componentName="Canvas">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          shadows
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          <color attach="background" args={['#0B0E14']} />
          
          {/* Lights */}
          <ambientLight intensity={ambientIntensity} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={directionalIntensity}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={20}
            shadow-camera-left={-6}
            shadow-camera-right={6}
            shadow-camera-top={6}
            shadow-camera-bottom={-6}
          />
          <pointLight position={[-6, -4, -4]} intensity={0.6} color="#9D4EDD" />
          <pointLight position={[6, 4, 3]} intensity={0.8} color="#00F0FF" />

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
              <Environment preset={stageLighting} />
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
