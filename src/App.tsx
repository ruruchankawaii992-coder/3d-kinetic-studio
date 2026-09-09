import React from 'react';
import { SceneCanvas } from './components/canvas/SceneCanvas';
import { GlassHeader } from './components/ui/GlassHeader';
import { ControlDrawer } from './components/ui/ControlDrawer';
import { PerspectiveListContainer } from './components/ui/PerspectiveListContainer';
import { MotionDock } from './components/ui/MotionDock';

export const App: React.FC = () => {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#0B0E14] text-slate-100 flex flex-col">
      {/* Background Neon Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neonCyan/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-electricPurple/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Glassmorphism Header */}
      <GlassHeader />

      {/* 3D WebGL Canvas Layer */}
      <section className="flex-1 w-full h-full relative z-0">
        <SceneCanvas />
      </section>

      {/* Interactive 3D Perspective List Overlay */}
      <PerspectiveListContainer />

      {/* Right Collapsible Control Drawer */}
      <ControlDrawer />

      {/* Bottom Kinetic Motion Dock */}
      <MotionDock />
    </main>
  );
};

export default App;
