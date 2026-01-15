import React from 'react';
import { Heart, Github, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-8 mt-auto z-20 relative">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-slate-500 text-sm flex items-center gap-1.5 font-medium">
          <span>Built with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-current animate-pulse" />
          <span>using React & Gemini 3.0</span>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
            <Github size={18} />
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
            <Twitter size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};