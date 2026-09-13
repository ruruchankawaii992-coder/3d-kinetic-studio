import React from 'react';
import { SceneCanvas } from '../components/canvas/SceneCanvas';
import { GlassHeader } from '../components/ui/GlassHeader';
import { ControlDrawer } from '../components/ui/ControlDrawer';
import { PerspectiveListContainer } from '../components/ui/PerspectiveListContainer';
import { MotionDock } from '../components/ui/MotionDock';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';

const StudioPage: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden flex flex-col bg-[#0B0E14]">
      {/* Background Neon Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neonCyan/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-electricPurple/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Glassmorphism Header (Internal Studio Controls) */}
      <div className="relative z-20">
        <ErrorBoundary componentName="GlassHeader">
          <GlassHeader />
        </ErrorBoundary>
      </div>

      {/* 3D WebGL Canvas Layer */}
      <section className="flex-1 w-full h-full relative z-0">
        <ErrorBoundary componentName="SceneCanvasContainer">
          <SceneCanvas />
        </ErrorBoundary>
      </section>

      {/* Interactive 3D Perspective List Overlay */}
      <ErrorBoundary componentName="PerspectiveListContainer">
        <PerspectiveListContainer />
      </ErrorBoundary>

      {/* Right Collapsible Control Drawer */}
      <ErrorBoundary componentName="ControlDrawer">
        <ControlDrawer />
      </ErrorBoundary>

      {/* Bottom Kinetic Motion Dock */}
      <ErrorBoundary componentName="MotionDock">
        <MotionDock />
      </ErrorBoundary>
    </div>
  );
};

export default StudioPage;
