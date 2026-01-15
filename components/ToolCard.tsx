import React from 'react';
import { Tool } from '../types';
import { ExternalLink, Tag } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-100">
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-slate-50 border border-slate-100 text-indigo-600 font-bold text-lg group-hover:bg-indigo-50 group-hover:scale-110 transition-transform duration-300">
              {tool.name.charAt(0)}
            </span>
            <h3 className="font-['Inter_Tight'] font-semibold text-lg text-slate-900 tracking-tight">{tool.name}</h3>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border uppercase tracking-wider ${
            tool.pricing.toLowerCase().includes('free') 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
              : 'bg-slate-50 text-slate-600 border-slate-100'
          }`}>
            {tool.pricing}
          </span>
        </div>
        
        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          {tool.description}
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
        <div className="flex items-center text-xs text-slate-500 font-medium">
          <Tag className="w-3.5 h-3.5 mr-1.5 opacity-50" />
          {tool.category}
        </div>
        <a 
          href={tool.website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group-hover:underline decoration-indigo-200 underline-offset-4"
        >
          Visit <ExternalLink className="ml-1.5 w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};