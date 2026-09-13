import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-12 text-center text-white">
      {/* Hero Section */}
      <section className="py-16 max-w-5xl mx-auto">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-neonCyan/10 border border-neonCyan/30 text-neonCyan text-sm font-semibold tracking-wide uppercase">
          🚀 Next-Gen 3D Kinetic Typography Studio
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
          Stop Making Boring Text. Generate <span className="bg-gradient-to-r from-neonCyan via-teal-300 to-white bg-clip-text text-transparent">Viral 3D Shorts Hooks</span> in Seconds.
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          Unleash the power of real-time WebGL kinetic typography, custom 4K texture mapping, and high-retention motion presets built for TikTok, Reels, and YouTube Shorts.
        </p>

        {/* Video/GIF Preview / Hero Visual Mockup */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-neonCyan/30 w-full max-w-4xl h-80 md:h-[450px] mx-auto rounded-3xl shadow-2xl flex flex-col items-center justify-center mb-10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neonCyan/15 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex flex-col items-center p-6">
            <div className="w-20 h-20 rounded-2xl bg-neonCyan/20 border border-neonCyan/50 flex items-center justify-center mb-6 shadow-lg shadow-neonCyan/30 animate-pulse">
              <span className="text-neonCyan text-4xl font-bold">⚡</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Interactive 3D Preview Engine</h3>
            <p className="text-slate-400 text-sm md:text-base max-w-md mb-6">
              Real-time lighting, custom 4K textures, depth-of-field, and fluid motion physics.
            </p>
            <button
              onClick={() => navigate('/studio')}
              className="bg-neonCyan text-black font-extrabold py-3.5 px-8 rounded-full text-base hover:bg-neonCyan/90 transition shadow-lg shadow-neonCyan/25 cursor-pointer"
            >
              Launch Studio Workspace ↗
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate('/studio')}
            className="bg-neonCyan text-black font-bold py-4 px-10 rounded-full text-lg hover:bg-neonCyan/80 transition duration-300 shadow-xl shadow-neonCyan/30 cursor-pointer"
          >
            Get Started Free
          </button>
          <button
            onClick={() => navigate('/showcase')}
            className="bg-slate-800 border border-white/10 text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-slate-700 transition duration-300 cursor-pointer"
          >
            Explore Showcase
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 w-full max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-neonCyan uppercase tracking-widest text-xs font-mono">Powerful Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-2 mb-4">Features That Elevate Your Content</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to produce broadcast-quality kinetic typography without complex desktop software.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-slate-900/60 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-neonCyan/30 transition-all shadow-xl group">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl font-bold mb-6 group-hover:scale-110 transition-transform">
              4K
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">4K PNG/WebM Exports</h3>
            <p className="text-slate-300 leading-relaxed">
              Export your creations in pristine 4K resolution with alpha transparency, ready for direct drops into Premiere, CapCut, or DaVinci.
            </p>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-neonCyan/30 transition-all shadow-xl group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xl font-bold mb-6 group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">Curated Kinematic Presets</h3>
            <p className="text-slate-300 leading-relaxed">
              Access a massive built-in and store-expandable library of professionally engineered kinetic typography presets for instant engagement hooks.
            </p>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-neonCyan/30 transition-all shadow-xl group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl font-bold mb-6 group-hover:scale-110 transition-transform">
              🎨
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">1-Click Styling & Textures</h3>
            <p className="text-slate-300 leading-relaxed">
              Apply custom 3D albedo maps, surface tiling, rotation, and dynamic lighting presets with a single click. Zero learning curve.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Placeholder Segment */}
      <section className="py-20 w-full max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-neonCyan uppercase tracking-widest text-xs font-mono">Proven Success</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-2 mb-4">Trusted by Top Creators</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">See how creators are driving millions of views using 3D Kinetic Studio hooks.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { handle: "@creator_pro", views: "4.2M Views", title: "Tunnel Zoom Hook" },
            { handle: "@viral_shorts", views: "8.9M Views", title: "Glitch Matrix Opener" },
            { handle: "@motion_master", views: "12.5M Views", title: "Organic Flow Cinematic" }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-900/80 border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[260px] relative overflow-hidden group hover:border-neonCyan/30 transition-all">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="text-neonCyan font-mono text-xs px-3 py-1 rounded-full bg-neonCyan/10 border border-neonCyan/30 mb-3">{item.views}</span>
                <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                <p className="text-slate-400 text-sm mb-4">{item.handle}</p>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-lg group-hover:scale-110 transition-transform">
                  ▶
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
