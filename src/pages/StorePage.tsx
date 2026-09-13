import React from 'react';

const StorePage: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">Preset Store</h1>
      <p className="text-slate-400 mb-12 text-lg">Premium preset packs to supercharge your workflow.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { name: "Neon Flux", price: "$19", color: "from-cyan-500 to-blue-600" },
          { name: "Glitch Matrix", price: "$24", color: "from-purple-500 to-pink-600" },
          { name: "Organic Flow", price: "$15", color: "from-emerald-500 to-teal-600" },
          { name: "Cyber Brutal", price: "$29", color: "from-orange-500 to-red-600" }
        ].map((pack, i) => (
          <div key={i} className="flex flex-col p-6 bg-slate-900/50 rounded-3xl border border-white/5 hover:border-electricPurple/30 transition-all group">
            <div className={`aspect-square rounded-2xl mb-6 bg-gradient-to-br ${pack.color} opacity-40 group-hover:opacity-60 transition-opacity flex items-center justify-center`}>
               <div className="w-16 h-16 border-4 border-white/20 rounded-full animate-pulse" />
            </div>
            <h3 className="text-xl font-bold mb-2">{pack.name}</h3>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-2xl font-mono text-neonCyan">{pack.price}</span>
              <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-sm font-bold transition-colors">
                View Pack
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorePage;
