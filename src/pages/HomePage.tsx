import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-8">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neonCyan/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-electricPurple/10 rounded-full blur-[140px] pointer-events-none" />
      
      <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-neonCyan to-electricPurple bg-clip-text text-transparent tracking-tighter">
        TYPOGRAPHY 2
      </h1>
      <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mb-12 font-light">
        Create stunning 3D kinetic typography for your next project. 
        Professional tools, real-time rendering, and high-quality exports.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link 
          to="/studio" 
          className="px-10 py-4 bg-neonCyan text-slate-900 font-bold rounded-2xl hover:bg-neonCyan-light transition-all transform hover:scale-105 shadow-lg shadow-neonCyan/20"
        >
          Open Studio
        </Link>
        <Link 
          to="/showcase" 
          className="px-10 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all font-medium"
        >
          View Showcase
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
