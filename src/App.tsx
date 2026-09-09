import React from 'react';
import { SceneCanvas } from './components/canvas/SceneCanvas';
import { GlassHeader } from './components/ui/GlassHeader';
import { ControlDrawer } from './components/ui/ControlDrawer';
import { PerspectiveListContainer } from './components/ui/PerspectiveListContainer';
import { MotionDock } from './components/ui/MotionDock';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

export const App: React.FC = () => {
  return (
    <ErrorBoundary componentName="AppRoot">
      <main className="relative w-screen h-screen overflow-hidden bg-[#0B0E14] text-slate-100 flex flex-col">
        {/* Background Neon Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neonCyan/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-electricPurple/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Glassmorphism Header */}
        <ErrorBoundary componentName="GlassHeader">
          <GlassHeader />
        </ErrorBoundary>

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
      </main>
    </ErrorBoundary>
  );
};

export default App;
