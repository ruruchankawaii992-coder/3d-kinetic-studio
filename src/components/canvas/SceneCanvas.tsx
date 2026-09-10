import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { Text3DMesh } from './Text3DMesh';
import { useStudioStore, StudioState } from '../../store/useStudioStore';
import { ErrorBoundary } from '../ui/ErrorBoundary';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

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
  const cameraMode = useStudioStore((state: StudioState) => state.cameraMode);
  const tunnelZoomSpeed = useStudioStore((state: StudioState) => state.tunnelZoomSpeed);
  const text = useStudioStore((state: StudioState) => state.text);

  // Maintain smooth interpolation target and lookAt vector across frames
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 8));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentCamPos = useRef(new THREE.Vector3(0, 0, 8));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (cameraMode === 'TunnelZoom') {
      const time = state.clock.getElapsedTime() * tunnelZoomSpeed * 0.4;
      
      // Calculate dynamic waypoints through glyph holes or spatial characters ('O', 'A', 'P', 'R', 'B', 'D', 'Q', '0-9')
      // Let's create a smooth 3D spline or multi-stage path that passes through letter positions and holes.
      const charCount = Math.max(1, text.length);
      const spanWidth = charCount * 0.8;
      
      // We cycle through characters and swoop in/out of specific glyph centers or loops
      const progress = (time * 0.5) % charCount;
      const charIndex = Math.floor(progress);
      const subProgress = progress - charIndex; // 0 to 1 between chars
      
      // Approximate center X for each character in the text string
      const startX = -spanWidth / 2;
      const charSpacing = spanWidth / charCount;
      const currCharX = startX + charIndex * charSpacing + charSpacing / 2;
      const nextCharX = startX + ((charIndex + 1) % charCount) * charSpacing + charSpacing / 2;
      
      // Interpolate X position between current and next character
      const posX = THREE.MathUtils.lerp(currCharX, nextCharX, subProgress);
      
      // Create a zooming spiral/loop through the character hole (Z axis dives forward into negative depth and loops back)
      // When subProgress is around 0.5, camera dives deep into the glyph (Z goes from 6 -> 1.5 -> 6) and orbits slightly
      const diveFactor = Math.sin(subProgress * Math.PI * 2); // Goes negative/positive smoothly
      const posZ = 5 + Math.sin(time * 2) * 2.5 - diveFactor * 1.5; // Smooth breathing depth through glyph loops
      const posY = Math.cos(time * 1.5) * 1.2; // Gentle floating vertical arc
      
      targetCamPos.current.set(posX + Math.sin(time) * 1.5, posY, posZ);
      targetLookAt.current.set(posX, 0, 0);

      // Smooth lerp (dampening) for butter-smooth camera movement without jarring snaps
      const lerpFactor = Math.min(1, delta * 4);
      currentCamPos.current.lerp(targetCamPos.current, lerpFactor);
      currentLookAt.current.lerp(targetLookAt.current, lerpFactor);

      state.camera.position.copy(currentCamPos.current);
      state.camera.lookAt(currentLookAt.current);
    } else {
      // When switching back to Orbit mode, sync current vectors so orbit controls don't jump
      currentCamPos.current.copy(state.camera.position);
    }
  });

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
      enabled={cameraMode === 'Orbit'}
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

import { forwardRef, useImperativeHandle } from 'react';
import { useThree } from '@react-three/fiber';

const ExportHandler: React.FC = () => {
  const { gl, scene, camera } = useThree();
  const setExportFns = useStudioStore((state) => state.setExportFns);

  useEffect(() => {
    const capture4KPng = async (transparent: boolean): Promise<Blob> => {
      const width = 3840;
      const height = 2160;
      const originalSize = new THREE.Vector2();
      gl.getSize(originalSize);
      const originalPixelRatio = gl.getPixelRatio();
      const originalClearAlpha = gl.getClearAlpha();

      if (transparent) {
        gl.setClearColor(0x000000, 0);
      }

      gl.setPixelRatio(1);
      gl.setSize(width, height, false);

      const oldAspect = (camera as THREE.PerspectiveCamera).aspect;
      if (camera instanceof THREE.PerspectiveCamera) {
        (camera as THREE.PerspectiveCamera).aspect = width / height;
        camera.updateProjectionMatrix();
      }

      gl.render(scene, camera);

      const canvas = gl.domElement;
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b) resolve(b);
            else reject(new Error('Canvas toBlob failed to produce image blob.'));
          },
          'image/png',
          1.0
        );
      });

      // Restore
      gl.setPixelRatio(originalPixelRatio);
      gl.setSize(originalSize.x, originalSize.y, false);
      if (transparent) {
        gl.setClearColor(0x000000, originalClearAlpha);
      }
      if (camera instanceof THREE.PerspectiveCamera) {
        (camera as THREE.PerspectiveCamera).aspect = oldAspect;
        camera.updateProjectionMatrix();
      }
      gl.render(scene, camera);

      return blob;
    };

    const recordWebm = async (
      duration: number,
      fps: number,
      onProgress: (progress: number) => void
    ): Promise<Blob> => {
      const canvas = gl.domElement;
      if (!canvas.captureStream) {
        throw new Error('canvas.captureStream() is not supported in this browser.');
      }
      const stream = canvas.captureStream(fps);

      let mimeType = 'video/webm; codecs=vp9';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm; codecs=vp8';
      }
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm';
      }
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        throw new Error('MediaRecorder video/webm recording is not supported in this browser.');
      }

      const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 16000000 });
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      return new Promise<Blob>((resolve, reject) => {
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'video/webm' });
          resolve(blob);
        };
        recorder.onerror = (err) => {
          reject(err);
        };

        recorder.start();

        const startTime = Date.now();
        const totalMs = duration * 1000;

        const interval = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / totalMs, 1);
          onProgress(progress);

          if (elapsed >= totalMs) {
            clearInterval(interval);
            recorder.stop();
          }
        }, 100);
      });
    };

    setExportFns(capture4KPng, recordWebm);

    return () => {
      setExportFns(null, null);
    };
  }, [gl, scene, camera, setExportFns]);

  return null;
};

export interface SceneCanvasRef {
  getCanvas: () => HTMLCanvasElement | null;
}

export const SceneCanvas = forwardRef<SceneCanvasRef, {}>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
  }));
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
  const pixelRatioCap = useStudioStore((state: StudioState) => state.pixelRatioCap);
  const shadowQuality = useStudioStore((state: StudioState) => state.shadowQuality);
  const targetFps = useStudioStore((state: StudioState) => state.targetFps);
  const lowPowerMode = useStudioStore((state: StudioState) => state.lowPowerMode);

  const bloomIntensity = useStudioStore((state: StudioState) => state.bloomIntensity);
  const bloomThreshold = useStudioStore((state: StudioState) => state.bloomThreshold);
  const bloomRadius = useStudioStore((state: StudioState) => state.bloomRadius);
  const glowHalos = useStudioStore((state: StudioState) => state.glowHalos);

  const effectiveCastShadows = shadowQuality === 'off' ? false : castShadows;
  const effectiveShadowMapSize = 
    shadowQuality === 'low' ? 512 :
    shadowQuality === 'medium' ? 1024 :
    shadowQuality === 'high' ? 2048 : shadowMapSize;

  return (
    <div className="w-full h-full relative select-none">
      <ErrorBoundary componentName="Canvas">
        <Canvas
          ref={canvasRef}
          camera={{ position: [0, 0, 6], fov: 45 }}
          shadows={effectiveCastShadows}
          dpr={[1, pixelRatioCap]}
          frameloop={targetFps === 30 ? 'demand' : 'always'}
          gl={{
            antialias: !lowPowerMode,
            alpha: true,
            powerPreference: lowPowerMode ? 'low-power' : 'high-performance',
            preserveDrawingBuffer: true,
          }}
          className="w-full h-full"
        >
          <color attach="background" args={[backgroundColor]} />
          <ExportHandler />
          
          {/* Lights */}
          <ambientLight intensity={ambientIntensity} color={ambientColor} />
          <directionalLight
            position={directionalPosition}
            intensity={directionalIntensity}
            color={directionalColor}
            castShadow={effectiveCastShadows}
            shadow-mapSize-width={effectiveShadowMapSize}
            shadow-mapSize-height={effectiveShadowMapSize}
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

          {/* Postprocessing Effect Composer & Bloom */}
          {glowHalos && bloomIntensity > 0 && (
            <EffectComposer multisampling={lowPowerMode ? 0 : 4}>
              <Bloom
                intensity={bloomIntensity}
                luminanceThreshold={bloomThreshold}
                luminanceSmoothing={0.9}
                radius={bloomRadius}
              />
            </EffectComposer>
          )}
        </Canvas>
      </ErrorBoundary>
    </div>
  );
});
