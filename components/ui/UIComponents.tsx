import React, { InputHTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

// --- Card ---
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-dark-card border border-dark-border rounded-xl p-6 shadow-lg backdrop-blur-sm bg-opacity-80 ${className}`}>
    {children}
  </div>
);

// --- Button ---
interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  glow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', glow = false, className = '', ...props }) => {
  const baseStyles = "px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-neon-500 text-black hover:bg-neon-400 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "bg-slate-800 text-white hover:bg-slate-700",
    outline: "border-2 border-neon-500 text-neon-500 hover:bg-neon-500/10",
    ghost: "text-slate-400 hover:text-white"
  };

  const glowStyle = glow ? "shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:shadow-[0_0_30px_rgba(34,197,94,0.7)]" : "";

  return (
    <motion.button 
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className={`${baseStyles} ${variants[variant]} ${glowStyle} ${className}`} 
      {...props}
    >
      {children}
    </motion.button>
  );
};

// --- Input ---
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => (
  <div className="flex flex-col gap-2 w-full">
    {label && <label className="text-sm font-mono text-neon-500/80">{label}</label>}
    <input 
      className={`bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-500 focus:ring-1 focus:ring-neon-500 transition-all placeholder:text-slate-600 ${className}`}
      {...props}
    />
  </div>
);

// --- Badge ---
export const Badge: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = 'bg-slate-800' }) => (
  <span className={`px-2 py-1 rounded text-xs font-mono border border-white/10 ${color}`}>
    {children}
  </span>
);