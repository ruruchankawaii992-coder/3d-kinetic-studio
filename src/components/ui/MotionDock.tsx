import React, { useState } from 'react';
import { Camera, Play, Pause, Repeat, Zap, Layers, RefreshCw, Compass, Download } from 'lucide-react';
import { useStudioStore, AnimationPreset } from '../../store/useStudioStore';

const PRESETS: { name: AnimationPreset; desc: string; detail: string; icon: any }[] = [
  { name: 'The Float', desc: 'Gentle sine levitation', detail: 'Gentle vertical levitation using sine wave translation.', icon: Compass },
  { name: 'The Vortex', desc: 'Dynamic spinning helix', detail: 'Dynamic 360-degree spiral rotation and rhythmic scale pulsing.', icon: Layers },
  { name: 'The Glitch', desc: 'Step-jitter displacement', detail: 'Rhythmic digital displacement with random spatial position offsets.', icon: Zap },
  { name: 'The Wave', desc: 'Oscillating time waves', detail: 'Sinusoidal wave oscillation along horizontal and vertical axes.', icon: Compass },
  { name: 'The Assemble', desc: 'Looping scale-in snap', detail: 'Staggered kinetic scale assembly sequence loop.', icon: RefreshCw },
  { name: 'The Pulsar', desc: 'Beating glowing expansion', detail: 'Beating scale expansion synchronized with emissive glow pulsing.', icon: Zap },
  { name: 'None', desc: 'Static typography mesh', detail: 'No active kinetic motion effect applied to the 3D text.', icon: RefreshCw },
];

export const MotionDock: React.FC = () => {
  const store = useStudioStore();
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
    currentTime,
    setCurrentTime,
    maxTime,
    setIsScrubbing,
  } = store;

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

  // Export full studio configuration as a reusable JSON preset
  const handleExportConfig = () => {
    const config = {
      text: store.text,
      font: store.font,
      color: store.color,
      emissiveColor: store.emissiveColor,
      material: store.material,
      wireframe: store.wireframeMode,
      physics: store.physics,
      animationPreset: store.animationPreset,
      speed: store.speed,
      intensity: store.intensity,
      isPaused: store.isPaused,
      loop: store.loop,
      stageLighting: store.stageLighting,
      ambientIntensity: store.ambientIntensity,
      directionalIntensity: store.directionalIntensity,
      showGrid: store.showGrid,
      cameraMode: store.cameraMode,
      listItems: store.listItems,
    };
    
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `kinetic-studio-preset-${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      console.error('Failed to export studio config', err);
    }
  };

  return (
    <>
      {/* Screen flash overlay for Snapshot */}
      {flash && (
        <div className="fixed inset-0 bg-white z-[9999] pointer-events-none animate-ping opacity-75 duration-300" />
      )}

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-5xl">
        <div className="rounded-2xl backdrop-blur-xl bg-slate-900/40 border border-white/10 px-6 py-4 flex flex-col gap-4 shadow-2xl">
          
          {/* Timeline Scrubber */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-1.5 px-1">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                  {currentTime.toFixed(2)}s
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  / {maxTime.toFixed(2)}s
                </span>
              </div>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">
                Motion Timeline
              </span>
            </div>
            <div className="relative group flex items-center">
              <input
                type="range"
                min="0"
                max={maxTime}
                step="0.01"
                value={currentTime}
                onMouseDown={() => setIsScrubbing(true)}
                onMouseUp={() => setIsScrubbing(false)}
                onTouchStart={() => setIsScrubbing(true)}
                onTouchEnd={() => setIsScrubbing(false)}
                onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800/50 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all z-10"
                aria-label="Animation timeline scrubber"
              />
              <div 
                className="absolute h-1.5 bg-purple-500/30 rounded-lg pointer-events-none transition-all"
                style={{ width: `${(currentTime / maxTime) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-6 justify-between w-full">
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
                        : 'bg-slate-900/40 border-white/5 text-slate-400 hover:bg-white/5 hover:border-white/10 hover:text-slate-200'
                    }`}
                    title={`Select Preset '${preset.name}': ${preset.detail}`}
                    aria-label={`Select animation preset ${preset.name}`}
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

            {/* Right side controls */}
            <div className="flex flex-wrap items-center gap-5 justify-end w-full lg:w-auto">
              
              {/* Speed & Intensity Quick Controls */}
              <div className="flex items-center gap-4">
                <div 
                  className="flex flex-col w-24"
                  title="Adjust playback speed multiplier for kinetic preset (0.1x to 3.0x)."
                >
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
                    className="w-full accent-purple-400 h-1 cursor-pointer"
                    title="Drag to adjust animation speed"
                    aria-label="Animation Speed slider"
                  />
                </div>

                <div 
                  className="flex flex-col w-24"
                  title="Adjust kinetic motion displacement strength percentage (0% to 100%)."
                >
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
                    className="w-full accent-purple-400 h-1 cursor-pointer"
                    title="Drag to adjust kinetic displacement intensity"
                    aria-label="Kinetic Motion Intensity slider"
                  />
                </div>
              </div>

              <div className="h-6 w-px bg-white/10 hidden lg:block" />

              {/* Actions Playback & Capture Buttons */}
              <div className="flex items-center gap-2.5">
                {/* Play / Pause Toggle */}
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    !isPaused
                      ? 'bg-purple-500/10 border-purple-500/30 text-purple-300'
                      : 'bg-slate-900 border-white/10 text-slate-400 hover:text-slate-200'
                  }`}
                  title={isPaused ? 'Resume kinetic motion' : 'Pause kinetic motion'}
                  aria-label={isPaused ? 'Resume animation playback' : 'Pause animation playback'}
                >
                  {!isPaused ? <Pause className="w-4 h-4 fill-purple-400/20" /> : <Play className="w-4 h-4 fill-slate-400/20" />}
                </button>

                {/* Loop Toggle */}
                <button
                  onClick={() => setLoop(!loop)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    loop
                      ? 'bg-purple-500/10 border-purple-500/30 text-purple-300 shadow-sm'
                      : 'bg-slate-900 border-white/10 text-slate-400 hover:text-slate-200'
                  }`}
                  title="Toggle Loop Playback: When active, the animation loops infinitely."
                  aria-label="Toggle loop playback"
                >
                  <Repeat className={`w-4 h-4 ${loop ? 'animate-spin-slow text-purple-400' : ''}`} />
                </button>

                <div className="h-6 w-px bg-white/10" />

                {/* Snapshot Button */}
                <button
                  onClick={handleSnapshot}
                  className="p-3 bg-gradient-to-r from-neonCyan to-electricPurple hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-cyan-500/20 flex items-center gap-2 transition-all"
                  title="Capture Frame: Take a high-resolution snapshot capture of the current WebGL 3D Canvas rendering viewport as a PNG file."
                  aria-label="Capture and download 3D Canvas PNG screenshot"
                >
                  <Camera className="w-4 h-4" />
                  <span className="text-xs tracking-wide">Capture</span>
                </button>

                {/* Export Config Preset JSON */}
                <button
                  onClick={handleExportConfig}
                  className="p-3 bg-slate-950/80 border border-white/10 hover:border-cyan-400/50 hover:bg-slate-900 text-slate-200 font-medium rounded-xl shadow-lg flex items-center gap-2 transition-all"
                  title="Export Preset: Serialise and download the entire studio configuration (Typography, Materials, Stage, Physics, Lighting) as a JSON preset file."
                  aria-label="Export studio configuration JSON file"
                >
                  <Download className="w-4 h-4 text-neonCyan" />
                  <span className="text-xs tracking-wide font-mono text-slate-300">Preset</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
