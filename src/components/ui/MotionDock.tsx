import React, { useState } from 'react';
import { Camera, Play, Pause, Repeat, Zap, Layers, RefreshCw, Compass } from 'lucide-react';
import { useStudioStore, AnimationPreset } from '../../store/useStudioStore';

const PRESETS: { name: AnimationPreset; desc: string; icon: any }[] = [
  { name: 'The Float', desc: 'Gentle sine levitation', icon: Compass },
  { name: 'The Vortex', desc: 'Dynamic spinning helix', icon: Layers },
  { name: 'The Glitch', desc: 'Step-jitter displacement', icon: Zap },
  { name: 'The Wave', desc: 'Oscillating time waves', icon: Compass },
  { name: 'The Assemble', desc: 'Looping scale-in snap', icon: RefreshCw },
  { name: 'The Pulsar', desc: 'Beating glowing expansion', icon: Zap },
];

export const MotionDock: React.FC = () => {
  const {
    animationPreset,
    setAnimationPreset,
    speed,
    setSpeed,
    intensity,
    setIntensity,
    isPaused,
    setIsPaused,
    loop,
    setLoop,
  } = useStudioStore();

  const [flash, setFlash] = useState(false);

  // Trigger snapshot canvas capture or cool visual flash feedback
  const handleSnapshot = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 300);

    // Capture WebGL canvas if accessible
    const canvas = document.querySelector('canvas');
    if (canvas) {
      try {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `kinetic-typo-${Date.now()}.png`;
        link.href = image;
        link.click();
      } catch (err) {
        console.warn('Canvas capture blocked by CORS or not initialized', err);
      }
    }
  };

  return (
    <>
      {/* Screen flash overlay for Snapshot */}
      {flash && (
        <div className="fixed inset-0 bg-white z-[9999] pointer-events-none animate-ping opacity-75 duration-300" />
      )}

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-4xl">
        <div className="rounded-2xl glass-panel border border-white/10 px-6 py-4 flex flex-col md:flex-row items-center gap-6 justify-between shadow-2xl">
          
          {/* Quick preset selection cards */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full no-scrollbar py-1">
            {PRESETS.map((preset) => {
              const IconComp = preset.icon;
              const isActive = animationPreset === preset.name;
              return (
                <button
                  key={preset.name}
                  onClick={() => setAnimationPreset(preset.name)}
                  className={`flex-shrink-0 px-3.5 py-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    isActive
                      ? 'bg-purple-500/15 border-purple-400 text-purple-300 shadow-purple-500/10 shadow-md'
                      : 'bg-slate-900/40 border-white/5 text-slate-400 hover:bg-white/5 hover:border-white/10'
                  }`}
                  title={preset.desc}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-purple-400 animate-pulse' : 'text-slate-500'}`} />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold tracking-tight">{preset.name}</span>
                    <span className="text-[8px] opacity-70 truncate max-w-[80px] font-mono leading-none">
                      {preset.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Motion controls & capture */}
          <div className="flex flex-wrap items-center gap-5 justify-end w-full md:w-auto">
            
            {/* Speed & Intensity Quick Controls */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col w-20">
                <span className="text-[9px] font-mono text-slate-400 uppercase leading-none mb-1">
                  Speed ({speed.toFixed(1)}x)
                </span>
                <input
                  type="range"
                  min="0.1"
                  max="3.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-purple-400 h-1"
                />
              </div>

              <div className="flex flex-col w-20">
                <span className="text-[9px] font-mono text-slate-400 uppercase leading-none mb-1">
                  Intensity ({intensity}%)
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={intensity}
                  onChange={(e) => setIntensity(parseInt(e.target.value, 10))}
                  className="w-full accent-purple-400 h-1"
                />
              </div>
            </div>

            <div className="h-6 w-px bg-white/10 hidden md:block" />

            {/* Actions Playback & Capture Buttons */}
            <div className="flex items-center gap-2.5">
              {/* Play / Pause Toggle */}
              <button
                onClick={() => setIsPaused(!isPaused)}
                className={`p-2.5 rounded-xl border transition-all ${
                  !isPaused
                    ? 'bg-purple-500/10 border-purple-500/30 text-purple-300'
                    : 'bg-slate-900 border-white/10 text-slate-400'
                }`}
                title={isPaused ? 'Resume Motion' : 'Pause Motion'}
              >
                {!isPaused ? <Pause className="w-4 h-4 fill-purple-400/20" /> : <Play className="w-4 h-4 fill-slate-400/20" />}
              </button>

              {/* Loop Toggle */}
              <button
                onClick={() => setLoop(!loop)}
                className={`p-2.5 rounded-xl border transition-all ${
                  loop
                    ? 'bg-purple-500/10 border-purple-500/30 text-purple-300'
                    : 'bg-slate-900 border-white/10 text-slate-400'
                }`}
                title="Toggle Loop Playback"
              >
                <Repeat className={`w-4 h-4 ${loop ? 'animate-spin-slow' : ''}`} />
              </button>

              <div className="h-6 w-px bg-white/10" />

              {/* Snapshot Button */}
              <button
                onClick={handleSnapshot}
                className="p-3 bg-gradient-to-r from-neonCyan to-electricPurple hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-cyan-500/20 flex items-center gap-2 transition-all"
                title="Capture & Save Canvas PNG"
              >
                <Camera className="w-4 h-4" />
                <span className="text-xs tracking-wide">Capture</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
