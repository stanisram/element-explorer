import React from 'react';
import { X, ExternalLink, Calendar, User, Eye, Flame, Beaker } from 'lucide-react';
import { getCategoryConfig, getElementStateAtTemp, getStateConfig } from '../utils/chemistry';

export default function ElementProfile({ element, onClose, temperature, showTempState }) {
  if (!element) return null;

  const categoryConfig = getCategoryConfig(element.category);
  const currentState = showTempState 
    ? getElementStateAtTemp(element, temperature) 
    : element.phase?.toLowerCase() || 'unknown';
  const stateConfig = getStateConfig(currentState);

  // Helper to convert Kelvin to Celsius
  const kToC = (k) => {
    if (k === null || k === undefined) return 'N/A';
    return `${(k - 273.15).toFixed(2)} °C (${k} K)`;
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-white/95 backdrop-blur-lg border-l border-slate-200 shadow-2xl z-50 flex flex-col transition-all duration-300 transform translate-x-0 overflow-y-auto">
      {/* Header */}
      <div 
        className="p-5 flex justify-between items-center border-b border-slate-100"
        style={{ background: `linear-gradient(to right, ${categoryConfig.bg}, rgba(255, 255, 255, 0.9))` }}
      >
        <div>
          <span 
            className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border"
            style={{ 
              backgroundColor: categoryConfig.bg, 
              borderColor: categoryConfig.color,
              color: categoryConfig.color
            }}
          >
            {categoryConfig.name}
          </span>
          <h2 className="text-2xl font-extrabold text-slate-800 mt-1.5 flex items-center gap-2">
            {element.name}
            <span className="text-sm font-mono text-slate-400 font-normal">({element.symbol})</span>
          </h2>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Details Container */}
      <div className="p-6 flex-grow space-y-6">
        
        {/* Top Info Hero Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-card p-4 rounded-xl flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Atomic No.</span>
            <span className="text-3xl font-extrabold text-slate-800 mt-1">{element.number}</span>
          </div>
          <div 
            className="glass-card p-4 rounded-xl flex flex-col items-center justify-center text-center border-2 bg-slate-50/50"
            style={{ borderColor: categoryConfig.color }}
          >
            <span className="text-[10px] uppercase font-bold text-slate-400">Symbol</span>
            <span className="text-3xl font-black mt-1" style={{ color: categoryConfig.color }}>
              {element.symbol}
            </span>
          </div>
          <div className="glass-card p-4 rounded-xl flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Atomic Mass</span>
            <span className="text-sm font-bold text-slate-800 mt-2.5 truncate max-w-full">
              {element.atomic_mass ? Number(element.atomic_mass).toFixed(4) : 'N/A'}
            </span>
          </div>
        </div>

        {/* Bohr Model or Animated Shell Orbit */}
        <div className="glass-card p-5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden h-52 bg-slate-50/30">
          {element.bohr_model_image ? (
            <div className="relative z-10 flex flex-col items-center">
              <img 
                src={element.bohr_model_image} 
                alt={`${element.name} Bohr Model`} 
                className="w-36 h-36 object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                onError={(e) => {
                  e.target.style.display = 'none'; // hide broken images and fallback to orbitals
                }}
              />
              <span className="text-[9px] text-slate-400 font-mono mt-1">Bohr Model Representation</span>
            </div>
          ) : (
            // Fallback animated CSS orbits (styled for Light mode)
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Nucleus */}
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white font-mono shadow-md"
                  style={{ backgroundColor: categoryConfig.color }}
                >
                  +{element.number}
                </div>
                {/* Shell rings */}
                {(element.shells || [1, 2]).map((electrons, index) => {
                  const size = 50 + index * 30;
                  return (
                    <div 
                      key={index}
                      className="absolute border border-dashed border-slate-300 rounded-full animate-spin"
                      style={{ 
                        width: `${size}px`, 
                        height: `${size}px`,
                        animationDuration: `${10 + index * 5}s`
                      }}
                    >
                      {/* Place a mock electron dot */}
                      <div 
                        className="w-1.5 h-1.5 rounded-full absolute -top-0.75 left-1/2 -translate-x-1/2"
                        style={{ backgroundColor: categoryConfig.color, boxShadow: `0 0 6px ${categoryConfig.color}` }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Absolute Background Graphic elements */}
          <div className="absolute top-2 right-3 flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-slate-400">State:</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${stateConfig.badge}`}>
              {stateConfig.name}
            </span>
          </div>
        </div>

        {/* Detailed Properties Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Chemical Properties</h3>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="glass-card p-3 rounded-lg flex flex-col justify-between bg-white">
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-orange-500" /> Boiling Point
              </span>
              <span className="text-slate-800 font-semibold mt-1 font-mono">{kToC(element.boil)}</span>
            </div>
            
            <div className="glass-card p-3 rounded-lg flex flex-col justify-between bg-white">
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wider">
                <Beaker className="w-3.5 h-3.5 text-blue-600" /> Melting Point
              </span>
              <span className="text-slate-800 font-semibold mt-1 font-mono">{kToC(element.melt)}</span>
            </div>

            <div className="glass-card p-3 rounded-lg flex flex-col justify-between bg-white">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Electron Config</span>
              <span className="text-slate-800 font-semibold mt-1 font-mono break-all leading-snug">
                {element.electron_configuration_semantic || element.electron_configuration || 'N/A'}
              </span>
            </div>

            <div className="glass-card p-3 rounded-lg flex flex-col justify-between bg-white">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Shell Electrons</span>
              <span className="text-slate-800 font-semibold mt-1 font-mono">
                {element.shells ? element.shells.join(', ') : 'N/A'}
              </span>
            </div>

            <div className="glass-card p-3 rounded-lg flex flex-col justify-between bg-white">
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wider">
                <Eye className="w-3.5 h-3.5 text-teal-600" /> Density
              </span>
              <span className="text-slate-800 font-semibold mt-1 font-mono">
                {element.density ? `${element.density} g/cm³` : 'N/A'}
              </span>
            </div>

            <div className="glass-card p-3 rounded-lg flex flex-col justify-between bg-white">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Electronegativity</span>
              <span className="text-slate-800 font-semibold mt-1 font-mono">
                {element.electronegativity_pauling || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Description Summary */}
        <div className="glass-card p-4 rounded-xl space-y-2 bg-white">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Description</h3>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            {element.summary || 'No detailed chemical description available for this element.'}
          </p>
        </div>

        {/* Discovery & Naming info */}
        {(element.discovered_by || element.named_by) && (
          <div className="glass-card p-4 rounded-xl grid grid-cols-2 gap-4 text-xs bg-slate-50/50">
            {element.discovered_by && (
              <div className="flex items-start gap-2">
                <User className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-400 block font-bold uppercase tracking-wider text-[9px]">Discovered By</span>
                  <span className="text-slate-700 font-semibold mt-0.5 block">{element.discovered_by}</span>
                </div>
              </div>
            )}
            {element.named_by && (
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-400 block font-bold uppercase tracking-wider text-[9px]">Named By</span>
                  <span className="text-slate-700 font-semibold mt-0.5 block">{element.named_by}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Wikipedia Link */}
        {element.source && (
          <a
            href={element.source}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-sm font-bold text-white shadow-md shadow-slate-900/10 transition cursor-pointer mt-4"
          >
            Learn more on Wikipedia
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
