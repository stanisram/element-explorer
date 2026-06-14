import React, { useState } from 'react';
import { REAL_LIFE_EXAMPLES } from '../utils/realLifeData';
import { getCategoryConfig } from '../utils/chemistry';
import { Search, Info } from 'lucide-react';
import * as Icons from 'lucide-react';

export default function RealLifeExamples({ elements }) {
  const [search, setSearch] = useState('');

  // Map elements that have real life example data
  const data = Object.entries(REAL_LIFE_EXAMPLES).map(([numStr, value]) => {
    const num = Number(numStr);
    const element = elements.find(el => el.number === num);
    return {
      num,
      element,
      ...value
    };
  }).filter(item => item.element !== undefined);

  // Filter based on search query
  const filteredData = data.filter(item => {
    const query = search.toLowerCase();
    return item.element.name.toLowerCase().includes(query) ||
           item.element.symbol.toLowerCase().includes(query) ||
           item.use.toLowerCase().includes(query) ||
           item.why.toLowerCase().includes(query);
  });

  // Helper to resolve icon components dynamically
  const renderIcon = (iconName, color) => {
    // Convert hyphenated-name to PascalCase
    const pascalName = iconName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
      
    const LucideIcon = Icons[pascalName] || Icons.HelpCircle;
    return <LucideIcon className="w-6 h-6" style={{ color }} />;
  };

  return (
    <div className="space-y-6">
      
      {/* Search Bar Panel */}
      <div className="glass-panel p-5 rounded-3xl bg-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="text-left space-y-0.5">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Real-Life Applications</h3>
          <p className="text-xs text-slate-500 font-semibold">Learn how elements shape modern technology, science, and life</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search uses or elements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-slate-400 focus:bg-white text-sm font-semibold text-slate-800 transition shadow-inner"
          />
        </div>
      </div>

      {/* Grid of Examples */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item) => {
          const catConfig = getCategoryConfig(item.element.category);
          return (
            <div 
              key={item.num}
              className="glass-panel p-6 rounded-3xl bg-white flex flex-col justify-between border-t-4 shadow-sm hover:scale-[1.02] hover:shadow-md transition-all duration-300"
              style={{ borderTopColor: catConfig.color }}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  {/* Element Emblem */}
                  <div 
                    className="w-12 h-12 rounded-xl flex flex-col items-center justify-center font-bold"
                    style={{ backgroundColor: catConfig.bg }}
                  >
                    <span className="text-base" style={{ color: catConfig.color }}>{item.element.symbol}</span>
                    <span className="text-[8px] text-slate-400 font-mono -mt-1 font-bold">{item.num}</span>
                  </div>
                  <div className="text-left">
                    <h4 className="text-base font-extrabold text-slate-800 leading-tight">{item.element.name}</h4>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{catConfig.name}</span>
                  </div>
                </div>

                {/* Application Icon */}
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 shadow-inner">
                  {renderIcon(item.icon, catConfig.color)}
                </div>
              </div>

              {/* Use and properties */}
              <div className="text-left space-y-3 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-extrabold text-blue-600 uppercase tracking-widest block mb-0.5">Primary Application</span>
                  <h5 className="text-sm font-extrabold text-slate-800 leading-snug">{item.use}</h5>
                </div>
                
                <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex items-start gap-2.5 text-xs text-slate-500 font-medium">
                  <Info className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Why:</strong> {item.why}
                  </p>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {filteredData.length === 0 && (
        <div className="glass-panel p-8 rounded-3xl bg-white text-center text-slate-500">
          No matching examples found for "{search}".
        </div>
      )}

    </div>
  );
}
