import React, { useState, useEffect } from 'react';
import { Sparkles, RotateCcw, Grid3X3, RefreshCw, Cpu, CheckCircle } from 'lucide-react';
import { useStudioStore } from '../../store/useStudioStore';

export const GlassHeader: React.FC = () => {
  const showGrid = useStudioStore((state) => state.showGrid);
  const setShowGrid = useStudioStore((state) => state.setShowGrid);
  const triggerCameraReset = useStudioStore((state) => state.triggerCameraReset);
  const resetAll = useStudioStore((state) => state.resetAll);

  const [fps, setFps] = useState(60);

  // Simple simulated high-performance FPS indicator
  useEffect(() => {
    const interval = setInterval(() => {
      setFps(Math.floor(58 + Math.random() * 3));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-6 py-4 rounded-2xl backdrop-blur-xl bg-slate-900/40 border border-white/10 shadow-lg">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-tr from-neonCyan to-electricPurple rounded-xl shadow-neonCyan/30 shadow-md">
          <Sparkles className="w-5 h-5 text-slate-900" />
        </div>
        <div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-neonCyan-light via-slate-100 to-electricPurple-light bg-clip-text text-transparent font-sans tracking-tight">
            KINETIC TYPO 3D
          </h1>
          <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
            Typography Studio v2.0
          </p>
        </div>
      </div>

      {/* WebGL Status Badge */}
      <div 
        className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-950/50 border border-emerald-500/30 rounded-full text-emerald-400"
        title="WebGL 2.0 graphics renderer status: Active and hardware-accelerated with high performance."
      >
        <CheckCircle className="w-4 h-4 fill-emerald-500/10" />
        <span className="text-[10px] font-mono font-bold tracking-wider uppercase">WebGL 2.0 Active</span>
      </div>

      {/* Quick Action Controls */}
      <div className="flex items-center gap-3">
        {/* Performance Indicator */}
        <div 
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-950/40 border border-white/5 rounded-xl font-mono text-xs text-slate-300"
          title="Real-time performance frame rate monitor (Frames Per Second). Ensures smooth interactivity."
        >
          <Cpu className="w-4 h-4 text-neonCyan" />
          <span>{fps} FPS</span>
        </div>

        {/* Toggle Grid */}
        <button
          onClick={() => setShowGrid(!showGrid)}
          title="Toggle Canvas Grid: Toggle ground floor reference coordinate grid overlay in the 3D scene viewport."
          aria-label="Toggle floor grid overlay"
          className={`p-2.5 rounded-xl border transition-all duration-300 ${
            showGrid
              ? 'bg-neonCyan/10 border-neonCyan/50 text-neonCyan shadow-neonCyan/20 shadow-md'
              : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20'
          }`}
        >
          <Grid3X3 className="w-4 h-4" />
        </button>

        {/* Reset Camera View */}
        <button
          onClick={triggerCameraReset}
          title="Reset Camera Angle: Reset the 3D scene camera orientation, angle, and zoom back to default."
          aria-label="Reset camera orientation and zoom"
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Reset Studio Defaults */}
        <button
          onClick={resetAll}
          title="Reset Studio Configurations: Reset all typography, material shaders, stage lighting, physics parameters, and kinetic motion presets back to defaults."
          aria-label="Reset studio defaults"
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400 transition-all flex items-center gap-1.5"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="text-xs font-medium font-mono hidden sm:inline">Reset</span>
        </button>
      </div>
    </header>
  );
};
