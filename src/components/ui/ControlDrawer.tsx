import React, { useState } from 'react';
import { Type, Sliders, Play, Sun, ChevronRight, ChevronLeft, Palette, Zap, Download, Camera, Film } from 'lucide-react';
import { useStudioStore, MaterialType, AnimationPreset, StageLighting } from '../../store/useStudioStore';

type TabType = 'design' | 'physics' | 'motion' | 'lighting' | 'export' | 'performance';

const FONTS = [
  { label: 'Helvetiker Bold', value: '/fonts/helvetiker_bold.typeface.json' },
  { label: 'Helvetiker Regular', value: '/fonts/helvetiker_regular.typeface.json' },
  { label: 'Optimer Bold', value: '/fonts/optimer_bold.typeface.json' },
  { label: 'Droid Sans Bold', value: '/fonts/droid_sans_bold.typeface.json' },
  { label: 'Gentilis Bold', value: '/fonts/gentilis_bold.typeface.json' },
];

const MATERIALS: { name: MaterialType; desc: string }[] = [
  { name: 'Chrome/Metallic', desc: 'Shiny reflective metal with envmap clearcoat' },
  { name: 'Frosted Glass', desc: 'Semi-transparent refractive physical glass shader' },
  { name: 'Neon Glow', desc: 'Self-illuminating emissive neon light beam' },
  { name: 'Holographic/Iridescent', desc: 'Rainbow thin-film interference sheen' },
  { name: 'Matte/Clay', desc: 'Soft non-reflective physical diffuse clay' },
  { name: 'Gold/Brass', desc: 'Lustrous polished metallic gold sheen' },
];

const PRESETS: { name: AnimationPreset; desc: string }[] = [
  { name: 'The Float', desc: 'Gentle vertical sine levitation' },
  { name: 'The Vortex', desc: 'Dynamic spinning helix rotation' },
  { name: 'The Glitch', desc: 'Digital step-jitter displacement' },
  { name: 'The Wave', desc: 'Dual-axis oscillating time waves' },
  { name: 'The Assemble', desc: 'Kinetic snap-in scale loop' },
  { name: 'The Pulsar', desc: 'Beating glowing expansion pulse' },
  { name: 'None', desc: 'Static non-animated mesh' },
];

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
    materialParams,
    updateMaterialParams,
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

    environmentIntensity,
    setEnvironmentIntensity,
    environmentRotation,
    setEnvironmentRotation,
    backgroundColor,
    setBackgroundColor,

    orbitingLightEnabled,
    setOrbitingLightEnabled,
    orbitingLightSpeed,
    setOrbitingLightSpeed,
    orbitingLightColor,
    setOrbitingLightColor,
    orbitingLightIntensity,
    setOrbitingLightIntensity,
    orbitingLightRadius,
    setOrbitingLightRadius,

    ambientColor,
    setAmbientColor,
    directionalColor,
    setDirectionalColor,
    directionalPosition,
    setDirectionalPosition,

    shadowMapSize,
    setShadowMapSize,
    shadowBias,
    setShadowBias,
    shadowRadius,
    setShadowRadius,
    castShadows,
    setCastShadows,
    reducedMotion,
    setReducedMotion,
    pixelRatioCap,
    setPixelRatioCap,
    shadowQuality,
    setShadowQuality,
    targetFps,
    setTargetFps,
    lowPowerMode,
    setLowPowerMode,

    capturePngFn,
    recordWebmFn,
    isExporting,
    exportProgress,
    exportStatus,
    setExportState,
  } = useStudioStore();

  const [transparentBg, setTransparentBg] = useState(false);
  const [videoDuration, setVideoDuration] = useState(8);
  const [videoFps, setVideoFps] = useState(60);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <aside
      className={`fixed top-24 bottom-6 right-6 z-40 transition-all duration-300 ease-in-out flex ${
        isOpen ? 'w-80 md:w-[30%] md:min-w-[320px] md:max-w-[420px]' : 'w-16'
      }`}
    >
      {/* Collapse / Expand Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -left-4 top-8 z-50 w-8 h-8 rounded-full backdrop-blur-xl bg-slate-900/90 border border-white/20 text-cyan-400 flex items-center justify-center hover:bg-slate-800 transition-colors shadow-lg"
        title={isOpen ? 'Collapse Drawer (Hide control panel)' : 'Expand Drawer (Show control panel)'}
        aria-label={isOpen ? 'Collapse 3D studio control drawer' : 'Expand 3D studio control drawer'}
      >
        {isOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <div className="w-full h-full rounded-2xl backdrop-blur-xl bg-slate-900/40 border border-white/10 flex flex-col overflow-hidden shadow-2xl">
        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-slate-950/40">
          <button
            onClick={() => { setActiveTab('design'); setIsOpen(true); }}
            className={`flex-1 py-3.5 flex items-center justify-center transition-all ${
              activeTab === 'design' && isOpen
                ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
            title="Design & Typography: Typeface, text string, and material shaders"
            aria-label="Open Design and Typography tab"
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
            title="Physics & Geometry: 3D extrusion depth, sloped bevel, and smoothness segments"
            aria-label="Open Physics and Geometry tab"
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
            title="Kinetic Motion: Animation presets, speed multiplier, and motion intensity"
            aria-label="Open Kinetic Motion tab"
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
            title="Stage & Lighting: HDRI environment preset, light intensities, and grid toggle"
            aria-label="Open Stage and Lighting tab"
          >
            <Sun className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setActiveTab('export'); setIsOpen(true); }}
            className={`flex-1 py-3.5 flex items-center justify-center transition-all ${
              activeTab === 'export' && isOpen
                ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
            title="Export Studio: High-res 4K PNG snapshots and seamless 60fps WebM video loops"
            aria-label="Open Export tab"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setActiveTab('performance'); setIsOpen(true); }}
            className={`flex-1 py-3.5 flex items-center justify-center transition-all ${
              activeTab === 'performance' && isOpen
                ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
            title="Performance & Accessibility: Reduced-motion support, low-end smoothness mode, pixel ratio cap, shadow quality, and target FPS throttling"
            aria-label="Open Performance and Accessibility tab"
          >
            <Zap className="w-4 h-4" />
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
                  <label 
                    className="text-xs font-mono text-slate-400 uppercase"
                    title="Type custom text string to generate as 3D geometry in the canvas viewport."
                  >
                    3D Text Content
                  </label>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    maxLength={24}
                    className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/10 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                    placeholder="Enter 3D text..."
                    title="Type custom text string to render in 3D (Max 24 characters)"
                    aria-label="3D Text Content input"
                  />
                </div>

                {/* Font Selector */}
                <div className="space-y-1.5">
                  <label 
                    className="text-xs font-mono text-slate-400 uppercase"
                    title="Choose the typeface font file used to construct 3D vector paths."
                  >
                    Typeface Font
                  </label>
                  <select
                    value={font}
                    onChange={(e) => setFont(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/10 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-400 transition-colors"
                    title="Select the 3D typeface font geometry file"
                    aria-label="Typeface Font selector"
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
                  <label 
                    className="text-xs font-mono text-slate-400 uppercase"
                    title="Select physical shader finish for the 3D typography mesh surface."
                  >
                    Material Finish
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {MATERIALS.map((m) => (
                      <button
                        key={m.name}
                        onClick={() => setMaterial(m.name)}
                        className={`p-2.5 text-xs rounded-xl border text-left transition-all ${
                          material === m.name
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-medium shadow-sm'
                            : 'bg-slate-900/50 border-white/10 text-slate-400 hover:bg-white/5 hover:text-slate-200'
                        }`}
                        title={m.desc}
                        aria-label={`Select material finish ${m.name}`}
                      >
                        <div className="font-bold">{m.name}</div>
                        <div className="text-[9px] opacity-75 truncate">{m.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Pickers */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1.5">
                    <label 
                      className="text-xs font-mono text-slate-400 uppercase"
                      title="Select the main diffuse surface color of the 3D text."
                    >
                      Base Color
                    </label>
                    <div 
                      className="flex items-center gap-2 p-2 bg-slate-900/80 border border-white/10 rounded-xl"
                      title="Click to choose primary surface diffuse color"
                    >
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                        title="Base color picker"
                        aria-label="Base Color color picker"
                      />
                      <span className="text-xs font-mono text-slate-300 uppercase">{color}</span>
                    </div>
                  </div>

                  {material === 'Neon Glow' && (
                    <div className="space-y-1.5">
                      <label 
                        className="text-xs font-mono text-slate-400 uppercase"
                        title="Select the glowing light discharge color for Neon shader."
                      >
                        Emissive Glow
                      </label>
                      <div 
                        className="flex items-center gap-2 p-2 bg-slate-900/80 border border-white/10 rounded-xl"
                        title="Click to choose glowing light emission color"
                      >
                        <input
                          type="color"
                          value={emissiveColor}
                          onChange={(e) => setEmissiveColor(e.target.value)}
                          className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                          title="Emissive glow color picker"
                          aria-label="Emissive Glow color picker"
                        />
                        <span className="text-xs font-mono text-slate-300 uppercase">{emissiveColor}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Real-time Material Parameter Tweaking */}
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-400 uppercase">
                    <span>Shader Parameters ({material})</span>
                  </div>

                  {/* Metalness */}
                  {(material === 'Chrome/Metallic' || material === 'Holographic/Iridescent' || material === 'Matte/Clay' || material === 'Gold/Brass') && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-400 font-mono">
                        <span>Metalness</span>
                        <span>{materialParams.metalness.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={materialParams.metalness}
                        onChange={(e) => updateMaterialParams({ metalness: parseFloat(e.target.value) })}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                        title="Adjust surface metalness reflection ratio"
                        aria-label="Metalness parameter"
                      />
                    </div>
                  )}

                  {/* Roughness */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-400 font-mono">
                      <span>Roughness</span>
                      <span>{materialParams.roughness.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={materialParams.roughness}
                      onChange={(e) => updateMaterialParams({ roughness: parseFloat(e.target.value) })}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      title="Adjust surface specular roughness dispersion"
                      aria-label="Roughness parameter"
                    />
                  </div>

                  {/* Clearcoat & Clearcoat Roughness */}
                  {(material === 'Chrome/Metallic' || material === 'Holographic/Iridescent' || material === 'Gold/Brass') && (
                    <>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-400 font-mono">
                          <span>Clearcoat</span>
                          <span>{materialParams.clearcoat.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={materialParams.clearcoat}
                          onChange={(e) => updateMaterialParams({ clearcoat: parseFloat(e.target.value) })}
                          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                          title="Adjust clearcoat gloss layer intensity"
                          aria-label="Clearcoat parameter"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-400 font-mono">
                          <span>Clearcoat Roughness</span>
                          <span>{materialParams.clearcoatRoughness.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={materialParams.clearcoatRoughness}
                          onChange={(e) => updateMaterialParams({ clearcoatRoughness: parseFloat(e.target.value) })}
                          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                          title="Adjust clearcoat layer blur/roughness"
                          aria-label="Clearcoat Roughness parameter"
                        />
                      </div>
                    </>
                  )}

                  {/* Transmission & Thickness & IOR */}
                  {material === 'Frosted Glass' && (
                    <>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-400 font-mono">
                          <span>Transmission</span>
                          <span>{materialParams.transmission.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={materialParams.transmission}
                          onChange={(e) => updateMaterialParams({ transmission: parseFloat(e.target.value) })}
                          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                          title="Adjust optical transparency transmission"
                          aria-label="Transmission parameter"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-400 font-mono">
                          <span>Glass Thickness</span>
                          <span>{materialParams.thickness.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="5"
                          step="0.1"
                          value={materialParams.thickness}
                          onChange={(e) => updateMaterialParams({ thickness: parseFloat(e.target.value) })}
                          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                          title="Adjust physical volumetric glass thickness"
                          aria-label="Thickness parameter"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-400 font-mono">
                          <span>Refractive Index (IOR)</span>
                          <span>{materialParams.ior.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="1.0"
                          max="2.33"
                          step="0.01"
                          value={materialParams.ior}
                          onChange={(e) => updateMaterialParams({ ior: parseFloat(e.target.value) })}
                          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                          title="Adjust index of refraction"
                          aria-label="Refractive Index IOR parameter"
                        />
                      </div>
                    </>
                  )}

                  {/* Emissive Intensity */}
                  {material === 'Neon Glow' && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-400 font-mono">
                        <span>Emissive Intensity</span>
                        <span>{materialParams.emissiveIntensity.toFixed(1)}</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="10"
                        step="0.1"
                        value={materialParams.emissiveIntensity}
                        onChange={(e) => updateMaterialParams({ emissiveIntensity: parseFloat(e.target.value) })}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                        title="Adjust glow intensity bloom brightness"
                        aria-label="Emissive Intensity parameter"
                      />
                    </div>
                  )}

                  {/* Iridescence & Thin-film interference */}
                  {material === 'Holographic/Iridescent' && (
                    <>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-400 font-mono">
                          <span>Iridescence Sheen</span>
                          <span>{materialParams.iridescence.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={materialParams.iridescence}
                          onChange={(e) => updateMaterialParams({ iridescence: parseFloat(e.target.value) })}
                          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                          title="Adjust iridescence thin-film shift intensity"
                          aria-label="Iridescence Sheen parameter"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-400 font-mono">
                          <span>Thin-Film IOR</span>
                          <span>{materialParams.iridescenceIOR.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="1.0"
                          max="2.33"
                          step="0.01"
                          value={materialParams.iridescenceIOR}
                          onChange={(e) => updateMaterialParams({ iridescenceIOR: parseFloat(e.target.value) })}
                          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                          title="Adjust thin-film layer refractive index"
                          aria-label="Thin-film IOR parameter"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-400 font-mono">
                          <span>Thin-Film Min Thickness (nm)</span>
                          <span>{Math.round(materialParams.iridescenceThicknessMin)}</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="600"
                          step="10"
                          value={materialParams.iridescenceThicknessMin}
                          onChange={(e) => updateMaterialParams({ iridescenceThicknessMin: parseFloat(e.target.value) })}
                          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                          title="Adjust minimum thin-film thickness in nanometers"
                          aria-label="Thin-film minimum thickness parameter"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-400 font-mono">
                          <span>Thin-Film Max Thickness (nm)</span>
                          <span>{Math.round(materialParams.iridescenceThicknessMax)}</span>
                        </div>
                        <input
                          type="range"
                          min="100"
                          max="1200"
                          step="10"
                          value={materialParams.iridescenceThicknessMax}
                          onChange={(e) => updateMaterialParams({ iridescenceThicknessMax: parseFloat(e.target.value) })}
                          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                          title="Adjust maximum thin-film thickness in nanometers"
                          aria-label="Thin-film maximum thickness parameter"
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Wireframe Toggle */}
                <div className="flex items-center justify-between pt-2">
                  <span 
                    className="text-xs font-mono text-slate-400 uppercase"
                    title="Toggle polygon wireframe mesh view to inspect geometry triangles."
                  >
                    Wireframe Mode
                  </span>
                  <button
                    onClick={() => setWireframe(!wireframe)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                      wireframe ? 'bg-cyan-500' : 'bg-slate-800'
                    }`}
                    title={wireframe ? 'Disable wireframe mode' : 'Enable wireframe mode'}
                    aria-label="Toggle wireframe mode"
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
                    <span 
                      className="text-slate-400 uppercase"
                      title="Adjust the 3D extrusion thickness depth of text characters."
                    >
                      Extrusion Depth
                    </span>
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
                    title="Slide to adjust 3D extrusion thickness depth"
                    aria-label="Extrusion Depth slider"
                  />
                </div>

                {/* Bevel Thickness */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span 
                      className="text-slate-400 uppercase"
                      title="Adjust how far back the sloped bevel edge extends into the geometry."
                    >
                      Bevel Thickness
                    </span>
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
                    title="Slide to adjust character bevel edge depth"
                    aria-label="Bevel Thickness slider"
                  />
                </div>

                {/* Bevel Size */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span 
                      className="text-slate-400 uppercase"
                      title="Adjust the outer width of the rounded/sloped edge bevel."
                    >
                      Bevel Size
                    </span>
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
                    title="Slide to adjust outer bevel width"
                    aria-label="Bevel Size slider"
                  />
                </div>

                {/* Bevel Offset */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span 
                      className="text-slate-400 uppercase"
                      title="Adjust the offset of the bevel edge from the text outline."
                    >
                      Bevel Offset
                    </span>
                    <span className="text-cyan-400">{physics.bevelOffset.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="-0.1"
                    max="0.1"
                    step="0.01"
                    value={physics.bevelOffset}
                    onChange={(e) => updatePhysics({ bevelOffset: parseFloat(e.target.value) })}
                    className="w-full accent-cyan-400 cursor-pointer"
                    title="Slide to adjust bevel offset"
                    aria-label="Bevel Offset slider"
                  />
                </div>

                {/* Letter Spacing */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span 
                      className="text-slate-400 uppercase"
                      title="Adjust horizontal spacing between characters (tracking)."
                    >
                      Letter Spacing
                    </span>
                    <span className="text-cyan-400">{physics.letterSpacing.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="-0.1"
                    max="0.5"
                    step="0.01"
                    value={physics.letterSpacing}
                    onChange={(e) => updatePhysics({ letterSpacing: parseFloat(e.target.value) })}
                    className="w-full accent-cyan-400 cursor-pointer"
                    title="Slide to adjust character tracking"
                    aria-label="Letter Spacing slider"
                  />
                </div>

                {/* Curve Segments */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span 
                      className="text-slate-400 uppercase"
                      title="Set vector curve resolution smoothness (higher = smoother curves, more polygons)."
                    >
                      Curve Segments
                    </span>
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
                    title="Slide to adjust curve resolution smoothness"
                    aria-label="Curve Segments slider"
                  />
                </div>

                {/* Bevel Segments */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span 
                      className="text-slate-400 uppercase"
                      title="Set edge bevel rounding steps (higher = smoother rounded corner edges)."
                    >
                      Bevel Segments
                    </span>
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
                    title="Slide to adjust edge bevel rounding steps"
                    aria-label="Bevel Segments slider"
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
                  <label 
                    className="text-xs font-mono text-slate-400 uppercase"
                    title="Choose kinetic animation preset to animate the 3D typography."
                  >
                    Motion Preset
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRESETS.map((p) => (
                      <button
                        key={p.name}
                        onClick={() => setAnimationPreset(p.name)}
                        className={`p-2.5 text-xs rounded-xl border text-left transition-all ${
                          animationPreset === p.name
                            ? 'bg-purple-500/20 border-purple-400 text-purple-300 font-medium shadow-sm'
                            : 'bg-slate-900/50 border-white/10 text-slate-400 hover:bg-white/5 hover:text-slate-200'
                        }`}
                        title={p.desc}
                        aria-label={`Select animation preset ${p.name}`}
                      >
                        <div className="font-bold">{p.name}</div>
                        <div className="text-[9px] opacity-75 truncate">{p.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Speed Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span 
                      className="text-slate-400 uppercase"
                      title="Control playback speed multiplier for active kinetic preset."
                    >
                      Animation Speed
                    </span>
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
                    title="Slide to adjust kinetic animation speed multiplier"
                    aria-label="Animation Speed slider"
                  />
                </div>

                {/* Intensity Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span 
                      className="text-slate-400 uppercase"
                      title="Control amplitude range and motion strength percentage."
                    >
                      Kinetic Intensity
                    </span>
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
                    title="Slide to adjust kinetic motion displacement strength"
                    aria-label="Kinetic Intensity slider"
                  />
                </div>

                {/* Play / Pause & Loop Toggles */}
                <div className="flex items-center justify-between pt-2">
                  <span 
                    className="text-xs font-mono text-slate-400 uppercase"
                    title="Control playback state and loop continuity."
                  >
                    Playback
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                        isPaused ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-800 border-white/10 text-slate-300'
                      }`}
                      title={isPaused ? 'Resume kinetic animation playback' : 'Pause kinetic animation playback'}
                      aria-label={isPaused ? 'Resume animation playback' : 'Pause animation playback'}
                    >
                      {isPaused ? 'RESUME' : 'PAUSE'}
                    </button>
                    <button
                      onClick={() => setLoop(!loop)}
                      className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                        loop ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-800 border-white/10 text-slate-400'
                      }`}
                      title="Toggle continuous looping animation playback"
                      aria-label="Toggle loop playback"
                    >
                      LOOP
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lighting' && (
              <div className="space-y-6 animate-fadeIn pb-8">
                {/* --- Section: Environment & Stage --- */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/10 font-semibold text-cyan-400">
                    <Sun className="w-4 h-4" />
                    <span>Environment & Stage</span>
                  </div>

                  {/* Stage Lighting Preset */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400 uppercase">HDRI Preset</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {LIGHTING_PRESETS.map((lp) => (
                        <button
                          key={lp}
                          onClick={() => setStageLighting(lp)}
                          className={`p-2 text-[10px] capitalize rounded-lg border transition-all ${
                            stageLighting === lp
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                              : 'bg-slate-900/50 border-white/10 text-slate-400 hover:bg-white/5'
                          }`}
                        >
                          {lp}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
                        <span>Env Intensity</span>
                        <span>{environmentIntensity.toFixed(1)}</span>
                      </div>
                      <input
                        type="range" min="0" max="5" step="0.1"
                        value={environmentIntensity}
                        onChange={(e) => setEnvironmentIntensity(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
                        <span>Env Rotation</span>
                        <span>{environmentRotation}°</span>
                      </div>
                      <input
                        type="range" min="0" max="360" step="1"
                        value={environmentRotation}
                        onChange={(e) => setEnvironmentRotation(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400 uppercase">Background Color</label>
                    <div className="flex items-center gap-2 p-2 bg-slate-900/80 border border-white/10 rounded-xl">
                      <input
                        type="color" value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                      />
                      <span className="text-xs font-mono text-slate-300 uppercase">{backgroundColor}</span>
                    </div>
                  </div>
                </div>

                {/* --- Section: Global & Key Lights --- */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/10 font-semibold text-cyan-400">
                    <Sun className="w-4 h-4 opacity-70" />
                    <span>Global & Key Lights</span>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
                          <span>Ambient</span>
                          <span>{ambientIntensity.toFixed(2)}</span>
                        </div>
                        <input
                          type="range" min="0" max="2" step="0.05"
                          value={ambientIntensity}
                          onChange={(e) => setAmbientIntensity(parseFloat(e.target.value))}
                          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                        />
                        <input
                          type="color" value={ambientColor}
                          onChange={(e) => setAmbientColor(e.target.value)}
                          className="w-full h-6 rounded-md border-0 cursor-pointer bg-slate-900"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
                          <span>Directional</span>
                          <span>{directionalIntensity.toFixed(2)}</span>
                        </div>
                        <input
                          type="range" min="0" max="5" step="0.1"
                          value={directionalIntensity}
                          onChange={(e) => setDirectionalIntensity(parseFloat(e.target.value))}
                          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                        />
                        <input
                          type="color" value={directionalColor}
                          onChange={(e) => setDirectionalColor(e.target.value)}
                          className="w-full h-6 rounded-md border-0 cursor-pointer bg-slate-900"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-slate-500 uppercase">Directional Position</label>
                      <div className="space-y-1.5">
                        {['X', 'Y', 'Z'].map((axis, i) => (
                          <div key={axis} className="flex items-center gap-3">
                            <span className="text-[10px] font-mono text-slate-400 w-3">{axis}</span>
                            <input
                              type="range" min="-15" max="15" step="0.5"
                              value={directionalPosition[i]}
                              onChange={(e) => {
                                const newPos = [...directionalPosition] as [number, number, number];
                                newPos[i] = parseFloat(e.target.value);
                                setDirectionalPosition(newPos);
                              }}
                              className="flex-1 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-500"
                            />
                            <span className="text-[10px] font-mono text-slate-400 w-8 text-right">{directionalPosition[i]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- Section: Orbiting Dynamic Light --- */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2 font-semibold text-cyan-400">
                      <Zap className="w-4 h-4" />
                      <span>Orbiting Light</span>
                    </div>
                    <button
                      onClick={() => setOrbitingLightEnabled(!orbitingLightEnabled)}
                      className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${
                        orbitingLightEnabled ? 'bg-cyan-500' : 'bg-slate-800'
                      }`}
                    >
                      <div className={`bg-white w-3 h-3 rounded-full transform transition-transform ${orbitingLightEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {orbitingLightEnabled && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-400 uppercase">Color</label>
                          <input
                            type="color" value={orbitingLightColor}
                            onChange={(e) => setOrbitingLightColor(e.target.value)}
                            className="w-full h-8 rounded-lg border-0 cursor-pointer bg-slate-900"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
                            <span>Intensity</span>
                            <span>{orbitingLightIntensity.toFixed(1)}</span>
                          </div>
                          <input
                            type="range" min="0" max="10" step="0.1"
                            value={orbitingLightIntensity}
                            onChange={(e) => setOrbitingLightIntensity(parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
                            <span>Speed</span>
                            <span>{orbitingLightSpeed.toFixed(1)}</span>
                          </div>
                          <input
                            type="range" min="0" max="5" step="0.1"
                            value={orbitingLightSpeed}
                            onChange={(e) => setOrbitingLightSpeed(parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
                            <span>Radius</span>
                            <span>{orbitingLightRadius.toFixed(1)}</span>
                          </div>
                          <input
                            type="range" min="1" max="15" step="0.1"
                            value={orbitingLightRadius}
                            onChange={(e) => setOrbitingLightRadius(parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* --- Section: Advanced Shadows --- */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2 font-semibold text-cyan-400">
                      <Sun className="w-4 h-4 opacity-50" />
                      <span>Shadow Map FX</span>
                    </div>
                    <button
                      onClick={() => setCastShadows(!castShadows)}
                      className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${
                        castShadows ? 'bg-cyan-500' : 'bg-slate-800'
                      }`}
                    >
                      <div className={`bg-white w-3 h-3 rounded-full transform transition-transform ${castShadows ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {castShadows && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-400 uppercase">Map Resolution</label>
                        <div className="grid grid-cols-4 gap-1">
                          {[512, 1024, 2048, 4096].map((size) => (
                            <button
                              key={size}
                              onClick={() => setShadowMapSize(size)}
                              className={`py-1 text-[9px] font-mono rounded-md border transition-all ${
                                shadowMapSize === size
                                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                                  : 'bg-slate-900 border-white/10 text-slate-500'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
                            <span>Bias</span>
                            <span>{shadowBias.toFixed(4)}</span>
                          </div>
                          <input
                            type="range" min="-0.01" max="0.01" step="0.0005"
                            value={shadowBias}
                            onChange={(e) => setShadowBias(parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-400"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
                            <span>Radius</span>
                            <span>{shadowRadius}</span>
                          </div>
                          <input
                            type="range" min="0" max="10" step="1"
                            value={shadowRadius}
                            onChange={(e) => setShadowRadius(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-400"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Grid Toggle */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs font-mono text-slate-400 uppercase">Floor Grid</span>
                  <button
                    onClick={() => setShowGrid(!showGrid)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                      showGrid ? 'bg-cyan-500' : 'bg-slate-800'
                    }`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${showGrid ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'export' && (
              <div className="space-y-6 animate-fadeIn pb-8">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10 font-semibold text-cyan-400">
                  <Download className="w-4 h-4" />
                  <span>4K PNG & WebM Export Engine</span>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-red-300 text-xs font-mono">
                    {errorMessage}
                  </div>
                )}

                {/* --- Section 1: High-Res 4K PNG Snapshot --- */}
                <div className="space-y-4 p-4 bg-slate-950/40 border border-white/10 rounded-2xl">
                  <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase font-mono">
                    <Camera className="w-4 h-4" />
                    <span>High-Resolution 4K PNG Snapshot</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Capture an ultra-sharp 3840x2160 pixel PNG image preserving current lighting, camera angle, and material shaders.
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-mono text-slate-400 uppercase">Transparent Alpha Background</span>
                    <button
                      onClick={() => setTransparentBg(!transparentBg)}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                        transparentBg ? 'bg-cyan-500' : 'bg-slate-800'
                      }`}
                      title={transparentBg ? 'Disable transparent alpha background' : 'Enable transparent alpha background'}
                      aria-label="Toggle transparent alpha background"
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                          transparentBg ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <button
                    onClick={async () => {
                      if (!capturePngFn) {
                        setErrorMessage('Export engine not initialized. Please ensure 3D canvas is fully loaded.');
                        return;
                      }
                      setErrorMessage(null);
                      setExportState({ isExporting: true, exportProgress: 20, exportStatus: 'Rendering 4K Canvas...' });
                      try {
                        setExportState({ exportProgress: 60, exportStatus: 'Encoding PNG 3840x2160...' });
                        const blob = await capturePngFn(transparentBg);
                        setExportState({ exportProgress: 90, exportStatus: 'Triggering Download...' });
                        
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `typography-4k-${Date.now()}.png`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);

                        setExportState({ isExporting: false, exportProgress: 100, exportStatus: 'PNG Snapshot Saved Successfully!' });
                      } catch (err: any) {
                        console.error('PNG export failed:', err);
                        setErrorMessage(err?.message || 'Failed to capture 4K PNG snapshot.');
                        setExportState({ isExporting: false, exportProgress: 0, exportStatus: 'Export Failed' });
                      }
                    }}
                    disabled={isExporting}
                    className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-mono tracking-wider uppercase"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Capture 4K PNG Snapshot</span>
                  </button>
                </div>

                {/* --- Section 2: Seamless 60fps WebM Video Loop --- */}
                <div className="space-y-4 p-4 bg-slate-950/40 border border-white/10 rounded-2xl">
                  <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 uppercase font-mono">
                    <Film className="w-4 h-4" />
                    <span>Seamless 60fps WebM Video Loop</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Record a high-performance 60fps WebM animation loop with canvas frame capture for seamless looping playback.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400 uppercase">Duration (Seconds)</label>
                      <select
                        value={videoDuration}
                        onChange={(e) => setVideoDuration(parseInt(e.target.value, 10))}
                        className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-slate-100 text-xs font-mono"
                      >
                        <option value={5}>5 Seconds</option>
                        <option value={8}>8 Seconds</option>
                        <option value={10}>10 Seconds</option>
                        <option value={15}>15 Seconds</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400 uppercase">Frame Rate (FPS)</label>
                      <select
                        value={videoFps}
                        onChange={(e) => setVideoFps(parseInt(e.target.value, 10))}
                        className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-slate-100 text-xs font-mono"
                      >
                        <option value={60}>60 FPS (Smooth)</option>
                        <option value={30}>30 FPS (Standard)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={async () => {
                      if (!recordWebmFn) {
                        setErrorMessage('Export engine not initialized. Please ensure 3D canvas is fully loaded.');
                        return;
                      }
                      setErrorMessage(null);
                      setExportState({ isExporting: true, exportProgress: 0, exportStatus: 'Starting WebM Recording...' });
                      try {
                        const blob = await recordWebmFn(videoDuration, videoFps, (progress) => {
                          const pct = Math.round(progress * 100);
                          setExportState({ exportProgress: pct, exportStatus: `Recording Video (${pct}%)...` });
                        });

                        setExportState({ exportProgress: 95, exportStatus: 'Encoding WebM Video...' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `typography-loop-${Date.now()}.webm`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);

                        setExportState({ isExporting: false, exportProgress: 100, exportStatus: 'WebM Video Loop Saved Successfully!' });
                      } catch (err: any) {
                        console.error('WebM export failed:', err);
                        setErrorMessage(err?.message || 'Failed to record WebM video loop.');
                        setExportState({ isExporting: false, exportProgress: 0, exportStatus: 'Export Failed' });
                      }
                    }}
                    disabled={isExporting}
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-mono tracking-wider uppercase"
                  >
                    <Film className="w-4 h-4" />
                    <span>Record 60fps WebM Loop</span>
                  </button>
                </div>

                {/* --- Section 3: Progress Bar & Status Indicator --- */}
                {isExporting && (
                  <div className="space-y-2 p-4 bg-slate-950/80 border border-cyan-500/30 rounded-2xl animate-pulse">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-cyan-400">{exportStatus}</span>
                      <span className="text-cyan-400 font-bold">{exportProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/10">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-150"
                        style={{ width: `${exportProgress}%` }}
                      />
                    </div>
                  </div>
                )}
                {!isExporting && exportStatus !== 'Ready' && (
                  <div className="p-3 bg-slate-950/60 border border-white/10 rounded-xl text-center text-xs font-mono text-emerald-400">
                    {exportStatus}
                  </div>
                )}
              </div>
            )}

            {/* --- Performance & Accessibility Panel --- */}
            {activeTab === 'performance' && (
              <div className="space-y-6 animate-fadeIn pb-8">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10 font-semibold text-cyan-400">
                  <Zap className="w-4 h-4" />
                  <span>Performance & Accessibility Optimizer</span>
                </div>

                <p className="text-xs text-slate-400">
                  Fine-tune rendering performance for lower-end devices, adjust pixel ratios, shadow quality, frame limits, and enable reduced-motion accessibility.
                </p>

                {/* --- Section 1: Accessibility & Reduced Motion (Criterion 0) --- */}
                <div className="space-y-4 p-4 bg-slate-950/40 border border-white/10 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-cyan-300 uppercase font-mono">Reduced Motion Support</div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
                          ? 'OS Preference: Reduce Motion (Detected)'
                          : 'OS Preference: Standard Motion'}
                      </div>
                    </div>
                    <button
                      onClick={() => setReducedMotion(!reducedMotion)}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                        reducedMotion ? 'bg-cyan-500' : 'bg-slate-800'
                      }`}
                      title={reducedMotion ? 'Disable reduced motion mode' : 'Enable reduced motion mode (pauses floating/animated presets)'}
                      aria-label="Toggle reduced motion mode"
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                          reducedMotion ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">
                    Automatically pauses floating or animated presets and locks 3D characters in static rest poses for users sensitive to motion.
                  </p>
                </div>

                {/* --- Section 2: Low-End Smoothness Mode (Criterion 1) --- */}
                <div className="space-y-4 p-4 bg-slate-950/40 border border-white/10 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-cyan-300 uppercase font-mono">Low-End Smoothness Mode</div>
                      <div className="text-xs text-slate-400 mt-0.5">Reduce geometry subdivisions</div>
                    </div>
                    <button
                      onClick={() => setLowPowerMode(!lowPowerMode)}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                        lowPowerMode ? 'bg-cyan-500' : 'bg-slate-800'
                      }`}
                      title={lowPowerMode ? 'Disable low-end smoothness mode' : 'Enable low-end smoothness mode (halves curve and bevel subdivisions)'}
                      aria-label="Toggle low-end smoothness mode"
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                          lowPowerMode ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">
                    Halves curve and bevel polygon subdivisions and disables heavy post-processing anti-aliasing to deliver butter-smooth frame rates on mobile and budget hardware.
                  </p>
                </div>

                {/* --- Section 3: Pixel Ratio & Shadow Quality (Criterion 1) --- */}
                <div className="space-y-4 p-4 bg-slate-950/40 border border-white/10 rounded-2xl">
                  <div className="text-xs font-semibold text-cyan-300 uppercase font-mono">Resolution & Shadows</div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-mono">Pixel Ratio Cap</span>
                      <span className="text-cyan-400 font-mono font-bold">{pixelRatioCap}x</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setPixelRatioCap(1)}
                        className={`py-2 px-3 rounded-xl border text-xs font-mono transition-all ${
                          pixelRatioCap === 1
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold'
                            : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                        }`}
                        title="Cap pixel ratio at 1x for maximum speed on mobile displays"
                        aria-label="Set pixel ratio cap to 1x"
                      >
                        1x (Fast)
                      </button>
                      <button
                        onClick={() => setPixelRatioCap(2)}
                        className={`py-2 px-3 rounded-xl border text-xs font-mono transition-all ${
                          pixelRatioCap === 2
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold'
                            : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                        }`}
                        title="Allow up to 2x pixel ratio for sharp Retina/HiDPI displays"
                        aria-label="Set pixel ratio cap to 2x"
                      >
                        2x (Retina)
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-mono">Shadow Quality</span>
                      <span className="text-cyan-400 font-mono font-bold uppercase">{shadowQuality}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {(['off', 'low', 'medium', 'high'] as const).map((q) => (
                        <button
                          key={q}
                          onClick={() => setShadowQuality(q)}
                          className={`py-2 px-2 rounded-xl border text-xs font-mono uppercase transition-all ${
                            shadowQuality === q
                              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold'
                              : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                          }`}
                          title={`Set shadow quality to ${q}`}
                          aria-label={`Set shadow quality to ${q}`}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* --- Section 4: Target FPS Throttling (Criterion 1) --- */}
                <div className="space-y-4 p-4 bg-slate-950/40 border border-white/10 rounded-2xl">
                  <div className="text-xs font-semibold text-cyan-300 uppercase font-mono">Target FPS Throttling</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setTargetFps(30)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-mono transition-all ${
                        targetFps === 30
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold'
                          : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                      }`}
                      title="Throttle render loop to 30 FPS to conserve battery power on laptops and mobile devices"
                      aria-label="Set target FPS to 30"
                    >
                      30 FPS (Power Saver)
                    </button>
                    <button
                      onClick={() => setTargetFps(60)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-mono transition-all ${
                        targetFps === 60
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold'
                          : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                      }`}
                      title="Run at full 60 FPS for maximum fluidity and responsiveness"
                      aria-label="Set target FPS to 60"
                    >
                      60 FPS (Full Fluidity)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
