import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StorePage: React.FC = () => {
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const navigate = useNavigate();

  const packs = [
    {
      name: "Viral Shorts Hook Pack",
      price: "$29",
      badge: "Best Seller",
      color: "from-cyan-500 to-neonCyan",
      description: "Over 50 high-converting kinetic 3D typography hooks designed specifically for TikTok, Instagram Reels, and YouTube Shorts. Guaranteed to stop the scroll.",
      features: ["50+ Viral 3D Hook Presets", "4K Export Ready", "Custom Lighting & Material Profiles", "Lifetime Updates"],
    },
    {
      name: "Neon Flux",
      price: "$19",
      badge: "Popular",
      color: "from-cyan-500 to-blue-600",
      description: "Futuristic neon lighting profiles and glowing kinetic animations for cyberpunk aesthetics.",
      features: ["25 Cyberpunk Presets", "Custom Glow Shaders", "HDRI Environments Included"],
    },
    {
      name: "Glitch Matrix",
      price: "$24",
      badge: "Trending",
      color: "from-purple-500 to-pink-600",
      description: "Distorted, high-energy digital glitch text animations for aggressive tech and gaming content.",
      features: ["30 Glitch Text Animations", "Sound FX Sync Markers", "Chromatic Aberration controls"],
    },
    {
      name: "Organic Flow",
      price: "$15",
      badge: "New",
      color: "from-emerald-500 to-teal-600",
      description: "Fluid, smooth wave morphs and natural typography motion for lifestyle and aesthetic content.",
      features: ["20 Smooth Motion Presets", "Soft Pastel Palettes", "Ease-In Custom Curves"],
    }
  ];

  const handleCheckout = (packName: string) => {
    setSelectedPack(packName);
    setCheckoutComplete(false);
  };

  const handleCompletePayment = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      setCheckoutComplete(false);
      setSelectedPack(null);
      navigate('/studio');
    }, 2000);
  };

  return (
    <div className="p-8 pt-20 max-w-7xl mx-auto text-white">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-white via-neonCyan to-slate-400 bg-clip-text text-transparent">
          Preset Store & Creator Packs
        </h1>
        <p className="text-slate-400 text-lg">
          Supercharge your short-form content with professional grade 3D kinetic typography presets, lighting rigs, and shader packs.
        </p>
      </div>

      {/* Featured Viral Shorts Hook Pack Highlight */}
      <div className="mb-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-neonCyan/40 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-neonCyan text-black font-bold px-6 py-2 rounded-bl-2xl text-sm tracking-wider uppercase">
          Featured & Recommended
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-neonCyan font-mono text-sm tracking-widest uppercase mb-2 inline-block">Flagship Collection</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">Viral Shorts Hook Pack</h2>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Stop the scroll instantly. Engineered specifically for TikTok, Reels, and Shorts creators who need maximum retention from second zero.
            </p>
            <ul className="space-y-3 mb-8 text-slate-300">
              <li className="flex items-center gap-2">✓ 50+ High-Retention 3D Kinetic Hooks</li>
              <li className="flex items-center gap-2">✓ 1-Click Load into 3D Studio</li>
              <li className="flex items-center gap-2">✓ 4K Transparent & Video Export Ready</li>
              <li className="flex items-center gap-2">✓ Free Lifetime Updates & New Presets</li>
            </ul>
            <div className="flex flex-wrap items-center gap-6">
              <span className="text-4xl font-mono font-bold text-neonCyan">$29</span>
              <button
                onClick={() => handleCheckout("Viral Shorts Hook Pack")}
                className="bg-neonCyan text-black font-bold px-8 py-4 rounded-full text-lg hover:bg-neonCyan/80 transition shadow-lg shadow-neonCyan/20 cursor-pointer"
              >
                Get Hook Pack Now
              </button>
            </div>
          </div>
          <div className="bg-slate-950/80 rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center min-h-[280px] text-center">
            <div className="w-20 h-20 bg-neonCyan/20 rounded-full flex items-center justify-center mb-4 border border-neonCyan/50 animate-pulse">
              <span className="text-neonCyan text-3xl font-bold">⚡</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Instant Studio Integration</h3>
            <p className="text-slate-400 text-sm">
              Purchased packs instantly sync with your Typography Studio workspace for immediate rendering.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-8">All Creator Packs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {packs.map((pack, i) => (
          <div key={i} className="flex flex-col p-6 bg-slate-900/50 rounded-3xl border border-white/5 hover:border-neonCyan/30 transition-all group">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full text-slate-300">{pack.badge}</span>
            </div>
            <div className={`aspect-video sm:aspect-square rounded-2xl mb-6 bg-gradient-to-br ${pack.color} opacity-40 group-hover:opacity-70 transition-opacity flex items-center justify-center`}>
               <div className="w-14 h-14 border-4 border-white/30 rounded-full animate-pulse" />
            </div>
            <h3 className="text-xl font-bold mb-2">{pack.name}</h3>
            <p className="text-slate-400 text-sm mb-6 flex-grow">{pack.description}</p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
              <span className="text-2xl font-mono text-neonCyan">{pack.price}</span>
              <button
                onClick={() => handleCheckout(pack.name)}
                className="px-5 py-2.5 bg-neonCyan/10 border border-neonCyan/30 text-neonCyan rounded-xl hover:bg-neonCyan hover:text-black text-sm font-bold transition-all cursor-pointer"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Modal */}
      {selectedPack && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-neonCyan/40 rounded-3xl max-w-md w-full p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedPack(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>
            
            {checkoutComplete ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Purchase Successful!</h3>
                <p className="text-slate-300 text-sm mb-4">
                  {selectedPack} has been unlocked and added to your Studio presets.
                </p>
                <p className="text-xs text-neonCyan">Redirecting to Studio...</p>
              </div>
            ) : (
              <div>
                <span className="text-xs font-mono text-neonCyan uppercase tracking-widest">Secure Checkout</span>
                <h3 className="text-2xl font-bold mb-2 mt-1">{selectedPack}</h3>
                <p className="text-slate-400 text-sm mb-6">Complete your purchase to unlock instant 1-click loading in the 3D Studio.</p>
                
                <div className="bg-slate-950 p-4 rounded-xl mb-6 border border-white/10 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Item</span>
                    <span className="font-semibold">{selectedPack}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-white/10">
                    <span className="text-slate-400">Total</span>
                    <span className="text-neonCyan font-mono font-bold text-lg">
                      {selectedPack === "Viral Shorts Hook Pack" ? "$29" : selectedPack === "Neon Flux" ? "$19" : selectedPack === "Glitch Matrix" ? "$24" : "$15"}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="creator@example.com"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neonCyan"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCompletePayment}
                  className="w-full bg-neonCyan text-black font-bold py-4 rounded-xl text-base hover:bg-neonCyan/80 transition shadow-lg shadow-neonCyan/20 cursor-pointer"
                >
                  Complete Secure Payment
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StorePage;
