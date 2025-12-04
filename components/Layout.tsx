import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, FileText, Home, Settings, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const SidebarItem = ({ to, icon: Icon, label, active }: any) => (
  <Link to={to}>
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active ? 'bg-neon-500/20 text-neon-400 border-r-2 border-neon-500' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </div>
  </Link>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  if (isLanding) {
    return <div className="min-h-screen bg-dark-bg text-white font-sans selection:bg-neon-500 selection:text-black">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-dark-bg text-white font-sans selection:bg-neon-500 selection:text-black">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 border-r border-dark-border bg-dark-bg/50 hidden md:flex flex-col fixed h-full z-10 backdrop-blur-xl"
      >
        <div className="p-6 border-b border-dark-border">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div className="w-10 h-10 bg-neon-500 rounded-lg flex items-center justify-center font-bold text-black text-xl shadow-[0_0_15px_rgba(34,197,94,0.5)]">C</div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white">Clever<span className="text-neon-500">Paper</span></span>
              <span className="text-xs text-slate-400">Smart Exam Generator</span>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem to="/dashboard" icon={Home} label="Dashboard" active={location.pathname === '/dashboard'} />
          <SidebarItem to="/generator" icon={Zap} label="Generator" active={location.pathname === '/generator'} />
          <SidebarItem to="/papers" icon={FileText} label="My Papers" active={location.pathname === '/papers'} />
          <SidebarItem to="/bank" icon={Box} label="Question Bank" active={location.pathname === '/bank'} />
        </nav>

        <div className="p-4 border-t border-dark-border">
          <SidebarItem to="/settings" icon={Settings} label="Settings" active={location.pathname === '/settings'} />
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};