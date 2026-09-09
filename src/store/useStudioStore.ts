import { create, StateCreator } from 'zustand';

export type MaterialType = 'Chrome/Metallic' | 'Frosted Glass' | 'Neon Glow' | 'Holographic/Iridescent';
export type AnimationPreset = 'The Float' | 'The Vortex' | 'The Glitch' | 'The Wave' | 'The Assemble' | 'The Pulsar' | 'None';
export type StageLighting = 'studio' | 'city' | 'sunset' | 'dawn' | 'night' | 'warehouse';
export type PerspectiveMode = 'Normal' | 'Push-in' | 'Tunnel Zoom In' | 'Tunnel Zoom Out';

export interface ListItem {
  id: string;
  label: string;
  tag: string;
  color: string;
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
  wireframe: boolean;

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

  // Perspective List Container properties
  perspectiveMode: PerspectiveMode;
  listItems: ListItem[];

  // Setters
  setText: (text: string) => void;
  setFont: (font: string) => void;
  setColor: (color: string) => void;
  setEmissiveColor: (color: string) => void;
  setMaterial: (material: MaterialType) => void;
  setWireframe: (wireframe: boolean) => void;
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
  setPerspectiveMode: (mode: PerspectiveMode) => void;
  addListItem: (item: Omit<ListItem, 'id'>) => void;
  removeListItem: (id: string) => void;
  resetAll: () => void;
}

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
  wireframe: false,
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
  perspectiveMode: 'Push-in' as PerspectiveMode,
  listItems: DEFAULT_ITEMS,
};

const storeCreator: StateCreator<StudioState> = (set) => ({
  ...INITIAL_STATE,

  setText: (text: string) => set({ text }),
  setFont: (font: string) => set({ font }),
  setColor: (color: string) => set({ color }),
  setEmissiveColor: (emissiveColor: string) => set({ emissiveColor }),
  setMaterial: (material: MaterialType) => set({ material }),
  setWireframe: (wireframe: boolean) => set({ wireframe }),
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
  setPerspectiveMode: (perspectiveMode: PerspectiveMode) => set({ perspectiveMode }),
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
  resetAll: () => set({ ...INITIAL_STATE }),
});

export const useStudioStore = create<StudioState>(storeCreator);
