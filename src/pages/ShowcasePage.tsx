import React from 'react';

const ShowcasePage: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">Showcase Gallery</h1>
      <p className="text-slate-400 mb-12 text-lg">Get inspired by what others have created with Typography 2.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="group relative aspect-video bg-slate-900/50 rounded-3xl border border-white/5 overflow-hidden hover:border-neonCyan/30 transition-all">
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity">
               <button className="px-6 py-2 bg-neonCyan text-slate-900 font-bold rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                 Load in Studio
               </button>
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="text-sm font-mono text-slate-500">PRESET_00{i}</div>
            </div>
            <div className="flex items-center justify-center h-full text-slate-700 font-mono italic">
              Coming Soon
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowcasePage;
