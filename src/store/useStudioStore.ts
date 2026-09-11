import { create, StateCreator } from 'zustand';

export type MaterialType = 'Chrome/Metallic' | 'Frosted Glass' | 'Neon Glow' | 'Holographic/Iridescent' | 'Matte/Clay' | 'Gold/Brass';
export type AnimationPreset = 'The Float' | 'The Vortex' | 'The Glitch' | 'The Wave' | 'The Assemble' | 'The Pulsar' | 'None';
export type StageLighting = 'studio' | 'city' | 'sunset' | 'dawn' | 'night' | 'warehouse';
export type CameraMode = 'Orbit' | 'TunnelZoom';
export type PerspectiveMode = 'Normal' | 'Push-in' | 'Tunnel Zoom In' | 'Tunnel Zoom Out';

export interface ListItem {
  id: string;
  label: string;
  tag: string;
  color: string;
}

export interface MaterialParams {
  metalness: number;
  roughness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  transmission: number;
  ior: number;
  thickness: number;
  emissiveIntensity: number;
  iridescence: number;
  iridescenceIOR: number;
  iridescenceThicknessMin: number;
  iridescenceThicknessMax: number;
}

export interface PhysicsParams {
  extrusionDepth: number;
  bevelThickness: number;
  bevelSize: number;
  bevelSegments: number;
  curveSegments: number;
  smoothness: number;
  bevelOffset: number;
  letterSpacing: number;
}

export interface StudioState {
  // Design properties
  text: string;
  font: string;
  color: string;
  emissiveColor: string;
  material: MaterialType;
  materialParams: MaterialParams;
  // Wireframe & Bloom properties
  wireframeMode: boolean;
  wireframeColor: string;
  glowHalos: boolean;
  bloomIntensity: number;
  bloomThreshold: number;
  bloomRadius: number;

  // Physics properties
  physics: PhysicsParams;

  // Motion properties
  animationPreset: AnimationPreset;
  speed: number;
  intensity: number;
  isPaused: boolean;
  loop: boolean;

  // Lighting & Env properties
  stageLighting: StageLighting;
  ambientIntensity: number;
  directionalIntensity: number;
  showGrid: boolean;
  cameraResetTrigger: number;

  // NEW Environment & Advanced lighting controls
  environmentIntensity: number;
  environmentRotation: number;
  backgroundColor: string;

  // Orbiting dynamic lights
  orbitingLightEnabled: boolean;
  orbitingLightSpeed: number;
  orbitingLightColor: string;
  orbitingLightIntensity: number;
  orbitingLightRadius: number;

  // Light colors and positions
  ambientColor: string;
  directionalColor: string;
  directionalPosition: [number, number, number];

  cameraMode: CameraMode;
  perspectiveMode: PerspectiveMode;
  tunnelZoomSpeed: number;
  listItems: ListItem[];
  shadowMapSize: number;
  shadowBias: number;
  shadowRadius: number;
  castShadows: boolean;

  // Accessibility & Performance Optimizer properties
  reducedMotion: boolean;
  pixelRatioCap: number;
  shadowQuality: 'off' | 'low' | 'medium' | 'high';
  targetFps: number;
  lowPowerMode: boolean;

  // Timeline properties
  currentTime: number;
  maxTime: number;
  isScrubbing: boolean;

  // Export properties
  isExporting: boolean;
  exportProgress: number;
  exportStatus: string;
  capturePngFn: ((transparent: boolean) => Promise<Blob>) | null;
  recordWebmFn: ((duration: number, fps: number, onProgress: (p: number) => void) => Promise<Blob>) | null;

  // Background Media Asset properties
  backgroundMediaType: 'color' | 'video' | 'texture';
  backgroundAssetUrl: string | null;
  backgroundAssetName: string | null;
  uploadProgress: number;
  uploadError: string | null;

  // Setters
  setText: (text: string) => void;
  setFont: (font: string) => void;
  setColor: (color: string) => void;
  setEmissiveColor: (color: string) => void;
  setMaterial: (material: MaterialType) => void;
  updateMaterialParams: (params: Partial<MaterialParams>) => void;
  setWireframe: (wireframe: boolean) => void;
  setWireframeMode: (wireframeMode: boolean) => void;
  setWireframeColor: (wireframeColor: string) => void;
  setGlowHalos: (glowHalos: boolean) => void;
  setPerspectiveMode: (mode: PerspectiveMode) => void;
  setBloomIntensity: (bloomIntensity: number) => void;
  setBloomThreshold: (bloomThreshold: number) => void;
  setBloomRadius: (bloomRadius: number) => void;
  updatePhysics: (physics: Partial<PhysicsParams>) => void;
  setAnimationPreset: (preset: AnimationPreset) => void;
  setSpeed: (speed: number) => void;
  setIntensity: (intensity: number) => void;
  setIsPaused: (isPaused: boolean) => void;
  setLoop: (loop: boolean) => void;
  setStageLighting: (lighting: StageLighting) => void;
  setAmbientIntensity: (intensity: number) => void;
  setDirectionalIntensity: (intensity: number) => void;
  setShowGrid: (show: boolean) => void;
  triggerCameraReset: () => void;

  // NEW setters
  setEnvironmentIntensity: (intensity: number) => void;
  setEnvironmentRotation: (rotation: number) => void;
  setBackgroundColor: (color: string) => void;

  setOrbitingLightEnabled: (enabled: boolean) => void;
  setOrbitingLightSpeed: (speed: number) => void;
  setOrbitingLightColor: (color: string) => void;
  setOrbitingLightIntensity: (intensity: number) => void;
  setOrbitingLightRadius: (radius: number) => void;

  setAmbientColor: (color: string) => void;
  setDirectionalColor: (color: string) => void;
  setDirectionalPosition: (position: [number, number, number]) => void;

  setShadowMapSize: (size: number) => void;
  setShadowBias: (bias: number) => void;
  setShadowRadius: (radius: number) => void;
  setCastShadows: (cast: boolean) => void;
  setCameraMode: (mode: CameraMode) => void;
  setTunnelZoomSpeed: (speed: number) => void;
  addListItem: (item: Omit<ListItem, 'id'>) => void;
  removeListItem: (id: string) => void;

  // Accessibility & Performance setters
  setReducedMotion: (reducedMotion: boolean) => void;
  setPixelRatioCap: (pixelRatioCap: number) => void;
  setShadowQuality: (shadowQuality: 'off' | 'low' | 'medium' | 'high') => void;
  setTargetFps: (targetFps: number) => void;
  setLowPowerMode: (lowPowerMode: boolean) => void;

  // Timeline setters
  setCurrentTime: (time: number) => void;
  setMaxTime: (maxTime: number) => void;
  setIsScrubbing: (isScrubbing: boolean) => void;

  // Export setters
  setExportFns: (
    capturePngFn: ((transparent: boolean) => Promise<Blob>) | null,
    recordWebmFn: ((duration: number, fps: number, onProgress: (p: number) => void) => Promise<Blob>) | null
  ) => void;
  setExportState: (state: Partial<{ isExporting: boolean; exportProgress: number; exportStatus: string }>) => void;
  setBackgroundMediaType: (type: 'color' | 'video' | 'texture') => void;
  setBackgroundAsset: (url: string | null, name: string | null) => void;
  setUploadProgress: (progress: number) => void;
  setUploadError: (error: string | null) => void;

  resetAll: () => void;
}

const DEFAULT_MATERIAL_PARAMS: MaterialParams = {
  metalness: 0.95,
  roughness: 0.12,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
  transmission: 0,
  ior: 1.5,
  thickness: 0,
  emissiveIntensity: 1.0,
  iridescence: 0,
  iridescenceIOR: 1.3,
  iridescenceThicknessMin: 100,
  iridescenceThicknessMax: 400,
};

const MATERIAL_PRESETS: Record<MaterialType, Partial<MaterialParams>> = {
  'Chrome/Metallic': {
    metalness: 1.0,
    roughness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    transmission: 0,
    iridescence: 0,
  },
  'Frosted Glass': {
    metalness: 0,
    roughness: 0.15,
    transmission: 1.0,
    ior: 1.45,
    thickness: 2.0,
    clearcoat: 0,
    iridescence: 0,
  },
  'Neon Glow': {
    metalness: 0,
    roughness: 0.5,
    emissiveIntensity: 2.5,
    transmission: 0,
    clearcoat: 0,
    iridescence: 0,
  },
  'Holographic/Iridescent': {
    metalness: 0.5,
    roughness: 0.2,
    iridescence: 1.0,
    iridescenceIOR: 1.8,
    iridescenceThicknessMin: 120,
    iridescenceThicknessMax: 450,
    clearcoat: 0.5,
    transmission: 0,
  },
  'Matte/Clay': {
    metalness: 0,
    roughness: 0.8,
    clearcoat: 0,
    transmission: 0,
    iridescence: 0,
    emissiveIntensity: 0,
  },
  'Gold/Brass': {
    metalness: 1.0,
    roughness: 0.15,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
    transmission: 0,
    iridescence: 0,
  },
};

const DEFAULT_ITEMS: ListItem[] = [
  { id: '1', label: '3D Space Mesh', tag: 'Kinetic', color: '#00F0FF' },
  { id: '2', label: 'Frosted Material', tag: 'Physical', color: '#9D4EDD' },
  { id: '3', label: 'Neon Glow Text', tag: 'Emissive', color: '#10B981' },
  { id: '4', label: 'Hologram Shader', tag: 'Dynamic', color: '#F59E0B' },
  { id: '5', label: 'Precision Bevels', tag: 'Geometry', color: '#EF4444' },
];

const INITIAL_STATE = {
  text: '3D STUDIO',
  font: '/fonts/helvetiker_bold.typeface.json',
  color: '#00F0FF',
  emissiveColor: '#3F007F',
  material: 'Chrome/Metallic' as MaterialType,
  materialParams: { ...DEFAULT_MATERIAL_PARAMS, ...MATERIAL_PRESETS['Chrome/Metallic'] },
  wireframeMode: false,
  wireframeColor: '#00F0FF',
  glowHalos: true,
  bloomIntensity: 1.2,
  bloomThreshold: 0.1,
  bloomRadius: 0.5,
  physics: {
    extrusionDepth: 0.4,
    bevelThickness: 0.05,
    bevelSize: 0.02,
    bevelSegments: 5,
    curveSegments: 12,
    smoothness: 8,
    bevelOffset: 0,
    letterSpacing: 0,
  },
  animationPreset: 'The Float' as AnimationPreset,
  speed: 1.0,
  intensity: 50,
  isPaused: false,
  loop: true,
  stageLighting: 'studio' as StageLighting,
  ambientIntensity: 0.5,
  directionalIntensity: 1.2,
  showGrid: true,
  cameraResetTrigger: 0,
  cameraMode: 'Orbit' as CameraMode,
  perspectiveMode: 'Normal' as PerspectiveMode,
  tunnelZoomSpeed: 1.0,
  listItems: DEFAULT_ITEMS,

  // NEW defaults
  environmentIntensity: 1.0,
  environmentRotation: 0,
  backgroundColor: '#05070B',

  orbitingLightEnabled: true,
  orbitingLightSpeed: 1.0,
  orbitingLightColor: '#00F0FF',
  orbitingLightIntensity: 1.5,
  orbitingLightRadius: 5.0,

  ambientColor: '#ffffff',
  directionalColor: '#ffffff',
  directionalPosition: [5, 8, 5] as [number, number, number],

  shadowMapSize: 1024,
  shadowBias: -0.001,
  shadowRadius: 4,
  castShadows: true,

  // Accessibility & Performance defaults
  reducedMotion: typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false,
  pixelRatioCap: 2,
  shadowQuality: 'high' as const,
  targetFps: 60,
  lowPowerMode: false,

  // Timeline defaults
  currentTime: 0,
  maxTime: Math.PI * 4, // 12.566s harmonic period (allows 0.5Hz harmonics)
  isScrubbing: false,

  // Export defaults
  isExporting: false,
  exportProgress: 0,
  exportStatus: 'Ready',
  capturePngFn: null,
  recordWebmFn: null,

  // Background Media Asset defaults
  backgroundMediaType: 'color' as const,
  backgroundAssetUrl: null,
  backgroundAssetName: null,
  uploadProgress: 0,
  uploadError: null,
};

const storeCreator: StateCreator<StudioState> = (set) => ({
  ...INITIAL_STATE,

  setText: (text: string) => set({ text }),
  setFont: (font: string) => set({ font }),
  setColor: (color: string) => set({ color }),
  setEmissiveColor: (emissiveColor: string) => set({ emissiveColor }),
  setMaterial: (material: MaterialType) => 
    set((state) => ({ 
      material, 
      materialParams: { ...state.materialParams, ...MATERIAL_PRESETS[material] } 
    })),
  updateMaterialParams: (params: Partial<MaterialParams>) =>
    set((state) => ({ materialParams: { ...state.materialParams, ...params } })),
  setWireframe: (wireframe: boolean) => set({ wireframeMode: wireframe }),
  setWireframeMode: (wireframeMode: boolean) => set({ wireframeMode }),
  setWireframeColor: (wireframeColor: string) => set({ wireframeColor }),
  setGlowHalos: (glowHalos: boolean) => set({ glowHalos }),
  setBloomIntensity: (bloomIntensity: number) => set({ bloomIntensity }),
  setBloomThreshold: (bloomThreshold: number) => set({ bloomThreshold }),
  setBloomRadius: (bloomRadius: number) => set({ bloomRadius }),
  updatePhysics: (physics: Partial<PhysicsParams>) =>
    set((state: StudioState) => ({ physics: { ...state.physics, ...physics } })),
  setAnimationPreset: (animationPreset: AnimationPreset) => set({ animationPreset }),
  setSpeed: (speed: number) => set({ speed }),
  setIntensity: (intensity: number) => set({ intensity }),
  setIsPaused: (isPaused: boolean) => set({ isPaused }),
  setLoop: (loop: boolean) => set({ loop }),
  setStageLighting: (stageLighting: StageLighting) => set({ stageLighting }),
  setAmbientIntensity: (ambientIntensity: number) => set({ ambientIntensity }),
  setDirectionalIntensity: (directionalIntensity: number) => set({ directionalIntensity }),
  setShowGrid: (showGrid: boolean) => set({ showGrid }),
  triggerCameraReset: () => set((state: StudioState) => ({ cameraResetTrigger: state.cameraResetTrigger + 1 })),

  // NEW setters
  setEnvironmentIntensity: (environmentIntensity: number) => set({ environmentIntensity }),
  setEnvironmentRotation: (environmentRotation: number) => set({ environmentRotation }),
  setBackgroundColor: (backgroundColor: string) => set({ backgroundColor }),

  setOrbitingLightEnabled: (orbitingLightEnabled: boolean) => set({ orbitingLightEnabled }),
  setOrbitingLightSpeed: (orbitingLightSpeed: number) => set({ orbitingLightSpeed }),
  setOrbitingLightColor: (orbitingLightColor: string) => set({ orbitingLightColor }),
  setOrbitingLightIntensity: (orbitingLightIntensity: number) => set({ orbitingLightIntensity }),
  setOrbitingLightRadius: (orbitingLightRadius: number) => set({ orbitingLightRadius }),

  setAmbientColor: (ambientColor: string) => set({ ambientColor }),
  setDirectionalColor: (directionalColor: string) => set({ directionalColor }),
  setDirectionalPosition: (directionalPosition: [number, number, number]) => set({ directionalPosition }),

  setShadowMapSize: (shadowMapSize: number) => set({ shadowMapSize }),
  setShadowBias: (shadowBias: number) => set({ shadowBias }),
  setShadowRadius: (shadowRadius: number) => set({ shadowRadius }),
  setCastShadows: (castShadows: boolean) => set({ castShadows }),

  setCameraMode: (cameraMode: CameraMode) => set({ cameraMode }),
  setPerspectiveMode: (perspectiveMode: PerspectiveMode) => set({ perspectiveMode }),
  setTunnelZoomSpeed: (tunnelZoomSpeed: number) => set({ tunnelZoomSpeed }),
  addListItem: (item: Omit<ListItem, 'id'>) =>
    set((state: StudioState) => ({
      listItems: [
        ...state.listItems,
        { ...item, id: Math.random().toString(36).substring(2, 11) },
      ],
    })),
  removeListItem: (id: string) =>
    set((state: StudioState) => ({
      listItems: state.listItems.filter((item: ListItem) => item.id !== id),
    })),

  // Accessibility & Performance setters
  setReducedMotion: (reducedMotion: boolean) => set({ reducedMotion }),
  setPixelRatioCap: (pixelRatioCap: number) => set({ pixelRatioCap }),
  setShadowQuality: (shadowQuality: 'off' | 'low' | 'medium' | 'high') => set({ shadowQuality }),
  setTargetFps: (targetFps: number) => set({ targetFps }),
  setLowPowerMode: (lowPowerMode: boolean) => set({ lowPowerMode }),

  setCurrentTime: (currentTime: number) => set({ currentTime }),
  setMaxTime: (maxTime: number) => set({ maxTime }),
  setIsScrubbing: (isScrubbing: boolean) => set({ isScrubbing }),

  setExportFns: (capturePngFn, recordWebmFn) => set({ capturePngFn, recordWebmFn }),
  setExportState: (updates) => set((state) => ({ ...state, ...updates })),

  setBackgroundMediaType: (backgroundMediaType) => set({ backgroundMediaType }),
  setBackgroundAsset: (url, name) => set({ backgroundAssetUrl: url, backgroundAssetName: name, uploadError: null }),
  setUploadProgress: (uploadProgress) => set({ uploadProgress }),
  setUploadError: (uploadError) => set({ uploadError }),

  resetAll: () => set({ ...INITIAL_STATE }),
});

export const useStudioStore = create<StudioState>(storeCreator);
