import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, ShoppingBag, Image as ImageIcon } from 'lucide-react';

export const NavigationHeader: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Studio', path: '/studio', icon: Box },
    { name: 'Showcase', path: '/showcase', icon: ImageIcon },
    { name: 'Store', path: '/store', icon: ShoppingBag },
  ];

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-tr from-neonCyan to-electricPurple rounded-lg flex items-center justify-center font-bold text-slate-900 group-hover:scale-110 transition-transform">
            T2
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">
            TYPOGRAPHY <span className="text-neonCyan">2</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                location.pathname === item.path
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} className={location.pathname === item.path ? 'text-neonCyan' : ''} />
              <span className="text-sm hidden md:block">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden sm:flex px-4 py-2 bg-neonCyan text-slate-900 text-sm font-bold rounded-xl hover:bg-neonCyan-light transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};
