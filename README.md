# 3D Kinetic Studio

A high-performance, web-based 3D kinetic typography studio built with **React**, **Three.js**, and **React Three Fiber (R3F)**. Create captivating 3D typography scenes featuring custom kinetic animations, bloom and neon illumination, physical materials, and cinematic camera paths — including dynamic Tunnel Zoom.

---

## ✨ Features

- **Kinetic 3D Typography**: Extruded text with configurable depth, bevel, spacing, alignment, and dynamic perspective positioning.
- **Cinematic Camera Paths**:
  - Interactive Orbit Controls with smooth damping.
  - Pre-choreographed cinematic camera paths (Spiral, Dolly, Pan).
  - Dynamic **Tunnel Zoom** (TunnelZoom & TunnelZoom 2) camera animations with adjustable speed, depth, and oscillation.
- **Photorealistic & Stylized Materials**:
  - *Chrome / Metallic*: High reflectivity with environment reflections.
  - *Frosted Glass*: Physically-based transmission and roughness.
  - *Neon Glow*: High emissive intensity coupled with post-processing bloom.
  - *Holographic / Iridescent*: Spectral color shifting and iridescent highlights.
  - *Matte / Clay*: Soft diffuse shading for architectural and minimalist aesthetics.
  - *Gold / Brass*: Luxurious metallic finishes.
- **Post-Processing & Visual FX**:
  - Real-time Bloom & Neon glow effects powered by `@react-three/postprocessing`.
  - Tone mapping, chromatic aberration, vignette, and ambient occlusion.
- **Glassmorphic UI & Real-Time Controls**:
  - Glass header and interactive parameter control drawers.
  - Floating motion dock for quick preset switching and playback controls.
  - Live parameter synchronization with Zustand state management.

---

## 🛠️ Tech Stack

- **Core Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **3D & Graphics**:
  - [Three.js](https://threejs.org/)
  - [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/)
  - [@react-three/drei](https://github.com/pmndrs/drei)
  - [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing)
- **Styling & UI**:
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Framer Motion](https://www.framer.com/motion/)
  - [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Build Tooling**: [Vite](https://vitejs.dev/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- `npm` or `bun` / `pnpm` / `yarn`

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/ruruchankawaii992-coder/3d-kinetic-studio.git
cd 3d-kinetic-studio
npm install
```

### Development

Start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### Production Build

Create an optimized production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 📁 Project Structure

```text
├── public/                 # Static assets, fonts, and 3D models
├── src/
│   ├── components/
│   │   ├── canvas/         # 3D Scene, Text3DMesh, and Lighting
│   │   └── ui/             # GlassHeader, ControlDrawer, MotionDock, ErrorBoundary
│   ├── store/              # Zustand global studio store (useStudioStore)
│   ├── utils/              # Math, geometry, and animation helpers
│   ├── App.tsx             # Studio layout and main view
│   ├── main.tsx            # Application entry point
│   └── index.css           # Tailwind CSS imports & global styles
├── index.html              # HTML shell
├── package.json            # Project dependencies and npm scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
