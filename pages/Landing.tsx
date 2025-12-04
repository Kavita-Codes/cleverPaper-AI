import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/UIComponents';
import { Brain, ShieldCheck, Zap, Layers } from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=3870&auto=format&fit=crop')] bg-cover bg-center">
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-0"></div>
      
      {/* Header Logo */}
      <div className="absolute top-0 left-0 p-6 z-20">
        <Link to="/" className="flex items-center gap-3 no-underline">
            <div className="w-10 h-10 bg-neon-500 rounded-lg flex items-center justify-center font-bold text-black text-xl shadow-[0_0_15px_rgba(34,197,94,0.5)]">C</div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white">Clever<span className="text-neon-500">Paper</span></span>
              <span className="text-xs text-slate-400">Smart Exam Generator</span>
            </div>
        </Link>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge removed as requested */}
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-green-100 to-green-500">
            Stop Copy-Paste Exams.<br/>
            <span className="text-neon-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">Build Smarter Tests.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Generate high-quality, Bloom-compliant, anti-cheat question papers in seconds. 
            Tailored to your curriculum, adaptable to student needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/generator">
              <Button variant="primary" glow className="text-lg px-8 py-4">
                <Zap size={20} />
                Generate Paper
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" className="text-lg px-8 py-4">
                View Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left">
          {[
            { icon: Brain, title: "Cognitive Engine", desc: "Uses Bloom's taxonomy to ensure balanced cognitive load." },
            { icon: ShieldCheck, title: "Anti-Cheat Variants", desc: "Instantly create 5 unique versions of the same exam." },
            { icon: Layers, title: "Smart Bank", desc: "Auto-tags and organizes questions by difficulty & topic." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="bg-black/60 border border-green-900/50 p-6 rounded-xl hover:border-neon-500 transition-colors group backdrop-blur-md"
            >
              <feature.icon className="text-neon-500 mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(34,197,94,0.3)] rounded-full p-1" size={32} />
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>

      <footer className="absolute bottom-6 text-slate-600 text-xs font-mono">
        CLEVERPAPER © 2025
      </footer>
    </div>
  );
};