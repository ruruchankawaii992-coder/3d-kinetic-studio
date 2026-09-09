import React, { useState } from 'react';
import { Type, Sliders, Play, Sun, ChevronRight, ChevronLeft, Palette } from 'lucide-react';
import { useStudioStore, MaterialType, AnimationPreset, StageLighting } from '../../store/useStudioStore';

type TabType = 'design' | 'physics' | 'motion' | 'lighting';

const FONTS = [
  { label: 'Helvetiker Bold', value: '/fonts/helvetiker_bold.typeface.json' },
  { label: 'Helvetiker Regular', value: '/fonts/helvetiker_regular.typeface.json' },
  { label: 'Optimer Bold', value: '/fonts/optimer_bold.typeface.json' },
  { label: 'Droid Sans Bold', value: '/fonts/droid_sans_bold.typeface.json' },
  { label: 'Gentilis Bold', value: '/fonts/gentilis_bold.typeface.json' },
];

const MATERIALS: MaterialType[] = ['Chrome/Metallic', 'Frosted Glass', 'Neon Glow', 'Holographic/Iridescent'];
const PRESETS: AnimationPreset[] = ['The Float', 'The Vortex', 'The Glitch', 'The Wave', 'The Assemble', 'The Pulsar', 'None'];
const LIGHTING_PRESETS: StageLighting[] = ['studio', 'city', 'sunset', 'dawn', 'night', 'warehouse'];

export const ControlDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('design');

  const {
    text,
    setText,
    font,
    setFont,
    color,
    setColor,
    emissiveColor,
    setEmissiveColor,
    material,
    setMaterial,
    wireframe,
    setWireframe,
    physics,
    updatePhysics,
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
    stageLighting,
    setStageLighting,
    ambientIntensity,
    setAmbientIntensity,
    directionalIntensity,
    setDirectionalIntensity,
    showGrid,
    setShowGrid,
  } = useStudioStore();

  return (
    <aside
      className={`fixed top-24 bottom-6 right-6 z-40 transition-all duration-300 ease-in-out flex ${
        isOpen ? 'w-80' : 'w-16'
      }`}
    >
      {/* Collapse / Expand Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -left-4 top-8 z-50 w-8 h-8 rounded-full glass-panel border border-white/20 text-cyan-400 flex items-center justify-center hover:bg-slate-800 transition-colors shadow-lg"
        title={isOpen ? 'Collapse Drawer' : 'Expand Drawer'}
      >
        {isOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <div className="w-full h-full rounded-2xl glass-panel border border-white/10 flex flex-col overflow-hidden shadow-2xl">
        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-slate-950/40">
          <button
            onClick={() => { setActiveTab('design'); setIsOpen(true); }}
            className={`flex-1 py-3.5 flex items-center justify-center transition-all ${
              activeTab === 'design' && isOpen
                ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
            title="Design & Typography"
          >
            <Type className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setActiveTab('physics'); setIsOpen(true); }}
            className={`flex-1 py-3.5 flex items-center justify-center transition-all ${
              activeTab === 'physics' && isOpen
                ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
            title="Physics & Geometry"
          >
            <Sliders className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setActiveTab('motion'); setIsOpen(true); }}
            className={`flex-1 py-3.5 flex items-center justify-center transition-all ${
              activeTab === 'motion' && isOpen
                ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
            title="Kinetic Motion"
          >
            <Play className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setActiveTab('lighting'); setIsOpen(true); }}
            className={`flex-1 py-3.5 flex items-center justify-center transition-all ${
              activeTab === 'lighting' && isOpen
                ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
            title="Stage & Lighting"
          >
            <Sun className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Content */}
        {isOpen && (
          <div className="flex-1 overflow-y-auto p-5 space-y-6 text-sm">
            {activeTab === 'design' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10 font-semibold text-cyan-400">
                  <Palette className="w-4 h-4" />
                  <span>Typography & Materials</span>
                </div>

                {/* Text Content Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 uppercase">3D Text Content</label>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    maxLength={24}
                    className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/10 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                    placeholder="Enter 3D text..."
                  />
                </div>

                {/* Font Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 uppercase">Typeface Font</label>
                  <select
                    value={font}
                    onChange={(e) => setFont(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/10 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    {FONTS.map((f) => (
                      <option key={f.value} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Material Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 uppercase">Material Finish</label>
                  <div className="grid grid-cols-2 gap-2">
                    {MATERIALS.map((m) => (
                      <button
                        key={m}
                        onClick={() => setMaterial(m)}
                        className={`p-2.5 text-xs rounded-xl border text-left transition-all ${
                          material === m
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-medium'
                            : 'bg-slate-900/50 border-white/10 text-slate-400 hover:bg-white/5'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Pickers */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400 uppercase">Base Color</label>
                    <div className="flex items-center gap-2 p-2 bg-slate-900/80 border border-white/10 rounded-xl">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                      />
                      <span className="text-xs font-mono text-slate-300 uppercase">{color}</span>
                    </div>
                  </div>

                  {material === 'Neon Glow' && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400 uppercase">Emissive Glow</label>
                      <div className="flex items-center gap-2 p-2 bg-slate-900/80 border border-white/10 rounded-xl">
                        <input
                          type="color"
                          value={emissiveColor}
                          onChange={(e) => setEmissiveColor(e.target.value)}
                          className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                        />
                        <span className="text-xs font-mono text-slate-300 uppercase">{emissiveColor}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Wireframe Toggle */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-mono text-slate-400 uppercase">Wireframe Mode</span>
                  <button
                    onClick={() => setWireframe(!wireframe)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                      wireframe ? 'bg-cyan-500' : 'bg-slate-800'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        wireframe ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'physics' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10 font-semibold text-cyan-400">
                  <Sliders className="w-4 h-4" />
                  <span>Geometry & Physics</span>
                </div>

                {/* Extrusion Depth */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400 uppercase">Extrusion Depth</span>
                    <span className="text-cyan-400">{physics.extrusionDepth.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.5"
                    step="0.05"
                    value={physics.extrusionDepth}
                    onChange={(e) => updatePhysics({ extrusionDepth: parseFloat(e.target.value) })}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Bevel Thickness */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400 uppercase">Bevel Thickness</span>
                    <span className="text-cyan-400">{physics.bevelThickness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.01"
                    max="0.2"
                    step="0.01"
                    value={physics.bevelThickness}
                    onChange={(e) => updatePhysics({ bevelThickness: parseFloat(e.target.value) })}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Bevel Size */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400 uppercase">Bevel Size</span>
                    <span className="text-cyan-400">{physics.bevelSize.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.01"
                    max="0.1"
                    step="0.01"
                    value={physics.bevelSize}
                    onChange={(e) => updatePhysics({ bevelSize: parseFloat(e.target.value) })}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Curve Segments */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400 uppercase">Curve Segments</span>
                    <span className="text-cyan-400">{physics.curveSegments}</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="24"
                    step="1"
                    value={physics.curveSegments}
                    onChange={(e) => updatePhysics({ curveSegments: parseInt(e.target.value, 10) })}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Bevel Segments */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400 uppercase">Bevel Segments</span>
                    <span className="text-cyan-400">{physics.bevelSegments}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={physics.bevelSegments}
                    onChange={(e) => updatePhysics({ bevelSegments: parseInt(e.target.value, 10) })}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {activeTab === 'motion' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10 font-semibold text-cyan-400">
                  <Play className="w-4 h-4" />
                  <span>Kinetic Presets</span>
                </div>

                {/* Animation Presets */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 uppercase">Motion Preset</label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRESETS.map((p) => (
                      <button
                        key={p}
                        onClick={() => setAnimationPreset(p)}
                        className={`p-2.5 text-xs rounded-xl border text-left transition-all ${
                          animationPreset === p
                            ? 'bg-purple-500/20 border-purple-400 text-purple-300 font-medium'
                            : 'bg-slate-900/50 border-white/10 text-slate-400 hover:bg-white/5'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Speed Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400 uppercase">Animation Speed</span>
                    <span className="text-purple-400">{speed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="3.0"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full accent-purple-400 cursor-pointer"
                  />
                </div>

                {/* Intensity Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400 uppercase">Kinetic Intensity</span>
                    <span className="text-purple-400">{intensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={intensity}
                    onChange={(e) => setIntensity(parseInt(e.target.value, 10))}
                    className="w-full accent-purple-400 cursor-pointer"
                  />
                </div>

                {/* Play / Pause & Loop Toggles */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-mono text-slate-400 uppercase">Playback</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                        isPaused ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-800 border-white/10 text-slate-300'
                      }`}
                    >
                      {isPaused ? 'RESUME' : 'PAUSE'}
                    </button>
                    <button
                      onClick={() => setLoop(!loop)}
                      className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                        loop ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-800 border-white/10 text-slate-400'
                      }`}
                    >
                      LOOP
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lighting' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10 font-semibold text-cyan-400">
                  <Sun className="w-4 h-4" />
                  <span>Stage & Environment</span>
                </div>

                {/* Stage Lighting Preset */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 uppercase">HDRI Environment</label>
                  <div className="grid grid-cols-2 gap-2">
                    {LIGHTING_PRESETS.map((lp) => (
                      <button
                        key={lp}
                        onClick={() => setStageLighting(lp)}
                        className={`p-2.5 text-xs capitalize rounded-xl border text-left transition-all ${
                          stageLighting === lp
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-medium'
                            : 'bg-slate-900/50 border-white/10 text-slate-400 hover:bg-white/5'
                        }`}
                      >
                        {lp}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ambient Light Intensity */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400 uppercase">Ambient Intensity</span>
                    <span className="text-cyan-400">{ambientIntensity.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="2.0"
                    step="0.05"
                    value={ambientIntensity}
                    onChange={(e) => setAmbientIntensity(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Directional Light Intensity */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400 uppercase">Directional Intensity</span>
                    <span className="text-cyan-400">{directionalIntensity.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="3.0"
                    step="0.1"
                    value={directionalIntensity}
                    onChange={(e) => setDirectionalIntensity(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Grid Toggle */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-mono text-slate-400 uppercase">Show Floor Grid</span>
                  <button
                    onClick={() => setShowGrid(!showGrid)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                      showGrid ? 'bg-cyan-500' : 'bg-slate-800'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        showGrid ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
