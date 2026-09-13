import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ShowcaseCardProps {
  title: string;
  description: string;
  presetId: string;
  category: string;
  views: string;
  badge?: string;
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ title, description, presetId, category, views, badge }) => {
  const navigate = useNavigate();

  const handleLoadInStudio = () => {
    console.log(`Loading preset ${presetId} in studio`);
    navigate('/studio');
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-white/5 hover:border-neonCyan/40 transition-all overflow-hidden flex flex-col group shadow-xl">
      <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-950 p-6 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neonCyan/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
        {badge && (
          <span className="absolute top-3 left-3 bg-neonCyan text-black font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            {badge}
          </span>
        )}
        <span className="absolute top-3 right-3 bg-slate-900/80 text-slate-300 font-mono text-xs px-3 py-1 rounded-full border border-white/10">
          {views}
        </span>
        <div className="w-16 h-16 rounded-2xl bg-neonCyan/15 border border-neonCyan/40 flex items-center justify-center text-neonCyan text-2xl font-bold mb-2 group-hover:scale-110 transition-transform shadow-lg shadow-neonCyan/20">
          ✨
        </div>
        <p className="text-slate-400 font-mono text-xs mt-2">{category}</p>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">{description}</p>
        <button
          onClick={handleLoadInStudio}
          className="w-full bg-neonCyan/10 border border-neonCyan/30 text-neonCyan font-bold py-3 px-6 rounded-2xl hover:bg-neonCyan hover:text-black transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-neonCyan/10"
        >
          <span>Load in Studio</span>
          <span>↗</span>
        </button>
      </div>
    </div>
  );
};

const ShowcasePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Viral Shorts', 'Cyberpunk', 'Cinematic', 'Glitch'];

  const presets = [
    {
      title: "Tunnel Zoom Hook",
      description: "Dynamic text animation with an immersive tunnel zoom effect engineered for high TikTok retention.",
      presetId: "tunnel-zoom-001",
      category: "Viral Shorts",
      views: "1.2M Uses",
      badge: "Trending"
    },
    {
      title: "Glitch Matrix Distort",
      description: "Add a modern, edgy glitch distortion and chromatic aberration to your typography.",
      presetId: "glitch-effect-001",
      category: "Glitch",
      views: "850K Uses",
    },
    {
      title: "Cinematic Gold Rotate",
      description: "Elegant rotating 3D text revealing a dramatic message with studio lighting.",
      presetId: "cinematic-rotate-001",
      category: "Cinematic",
      views: "2.4M Uses",
      badge: "Popular"
    },
    {
      title: "Wave Morph Fluid",
      description: "Smooth, undulating text movements that captivate viewers through seamless loops.",
      presetId: "wave-morph-001",
      category: "Viral Shorts",
      views: "920K Uses",
    },
    {
      title: "Explosive Energy Burst",
      description: "Text shatters and reforms in an energetic burst with glowing particle trails.",
      presetId: "explosive-reveal-001",
      category: "Glitch",
      views: "670K Uses",
    },
    {
      title: "Typewriter Cyber Intro",
      description: "Classic typewriter effect with futuristic neon wireframes and CRT scanline overlay.",
      presetId: "typing-write-on-001",
      category: "Cyberpunk",
      views: "1.5M Uses",
      badge: "New"
    },
  ];

  const filteredPresets = activeFilter === 'All' 
    ? presets 
    : presets.filter(p => p.category === activeFilter);

  return (
    <div className="container mx-auto px-6 py-16 pt-24 max-w-7xl text-white">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-neonCyan uppercase tracking-widest text-xs font-mono">Inspiration Gallery</span>
        <h1 className="text-5xl font-extrabold mt-2 mb-4 bg-gradient-to-r from-white via-neonCyan to-slate-400 bg-clip-text text-transparent">
          Showcase & Preset Gallery
        </h1>
        <p className="text-slate-400 text-lg">
          Explore production-ready 3D kinetic typography renders. Click any preset to load it instantly into your Studio workspace.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
              activeFilter === cat
                ? 'bg-neonCyan text-black shadow-lg shadow-neonCyan/20'
                : 'bg-slate-900 border border-white/10 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPresets.map((preset) => (
          <ShowcaseCard key={preset.presetId} {...preset} />
        ))}
      </div>
    </div>
  );
};

export default ShowcasePage;
