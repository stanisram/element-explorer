import React, { useState } from 'react';
import { getReactionData } from '../utils/reactions';
import { Beaker, Flame, Droplets, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';
import { getCategoryConfig } from '../utils/chemistry';

export default function ReactionSimulator({ elements }) {
  // Let the user choose from common experimental elements first, or open up all elements
  const commonElements = [1, 3, 6, 11, 12, 17, 18, 19, 20, 26, 29, 30, 79];
  const [selectedElementId, setSelectedElementId] = useState(11); // Default: Sodium (Na)
  const [reactant, setReactant] = useState('water'); // water, oxygen, acid

  const element = elements.find(el => el.number === Number(selectedElementId)) || elements[10];
  const reaction = getReactionData(element, reactant);
  const catConfig = getCategoryConfig(element.category);

  // Vigor score out of 5 for a visual meter
  const getVigorScore = (vigor) => {
    switch (vigor?.toLowerCase()) {
      case 'explosive': return 5;
      case 'vigorous': return 4;
      case 'moderate': return 3;
      case 'slow':
      case 'very slow': return 2;
      case 'none to very slow': return 1;
      case 'none':
      default: return 0;
    }
  };

  const vigorScore = getVigorScore(reaction?.reactivity);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Configuration Panel */}
      <div className="glass-panel p-6 rounded-3xl bg-white flex flex-col md:flex-row gap-6 items-center justify-between shadow-sm">
        
        {/* Element selector */}
        <div className="flex flex-col space-y-1.5 w-full md:w-1/2 text-left">
          <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Select Element</label>
          <select
            value={selectedElementId}
            onChange={(e) => setSelectedElementId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold focus:outline-none focus:border-slate-400 cursor-pointer shadow-sm"
          >
            {/* Group common ones first */}
            <optgroup label="Common Test Elements">
              {elements
                .filter(el => commonElements.includes(el.number))
                .map(el => (
                  <option key={el.number} value={el.number}>
                    {el.number}. {el.name} ({el.symbol})
                  </option>
                ))}
            </optgroup>
            <optgroup label="All Elements">
              {elements.map(el => (
                <option key={el.number} value={el.number}>
                  {el.number}. {el.name} ({el.symbol})
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Reactant Selector */}
        <div className="flex flex-col space-y-1.5 w-full md:w-1/2 text-left">
          <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Select Reactant</label>
          <div className="flex gap-2 w-full text-xs font-bold">
            <button
              onClick={() => setReactant('water')}
              className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all
                ${reactant === 'water'
                  ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                }
              `}
            >
              <Droplets className="w-4 h-4" /> Water (H₂O)
            </button>
            <button
              onClick={() => setReactant('oxygen')}
              className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all
                ${reactant === 'oxygen'
                  ? 'bg-orange-600 border-orange-500 text-white shadow-md'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                }
              `}
            >
              <Flame className="w-4 h-4" /> Oxygen (O₂)
            </button>
            <button
              onClick={() => setReactant('acid')}
              className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all
                ${reactant === 'acid'
                  ? 'bg-red-600 border-red-500 text-white shadow-md'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                }
              `}
            >
              <Beaker className="w-4 h-4" /> Acid (HCl)
            </button>
          </div>
        </div>

      </div>

      {/* Simulator Display Grid */}
      {reaction && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Reaction Status & Meter */}
          <div className="glass-panel p-6 rounded-3xl bg-white flex flex-col justify-between items-center text-center shadow-sm space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Reactivity Level</span>
              <h4 className={`text-2xl font-black ${reaction.reactivity === 'Explosive' ? 'text-red-600 animate-pulse' : 'text-slate-800'}`}>
                {reaction.reactivity}
              </h4>
            </div>

            {/* Visual Reactivity Score dots */}
            <div className="flex gap-1.5 justify-center py-2">
              {[1, 2, 3, 4, 5].map((dot) => {
                let color = 'bg-slate-200';
                if (dot <= vigorScore) {
                  if (vigorScore >= 5) color = 'bg-red-600';
                  else if (vigorScore >= 4) color = 'bg-orange-500';
                  else if (vigorScore >= 3) color = 'bg-yellow-500';
                  else color = 'bg-blue-500';
                }
                return (
                  <span 
                    key={dot}
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 border border-transparent
                      ${color}
                      ${dot <= vigorScore && vigorScore >= 5 ? 'animate-ping' : ''}
                    `}
                    style={{ animationDuration: '1.5s' }}
                  />
                );
              })}
            </div>

            {/* Element Emblem */}
            <div 
              className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center border-t-4 shadow-sm"
              style={{ borderTopColor: catConfig.color, backgroundColor: catConfig.bg }}
            >
              <span className="text-3xl font-black" style={{ color: catConfig.color }}>{element.symbol}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{element.name}</span>
            </div>
          </div>

          {/* Equation & Details */}
          <div className="glass-panel p-6 rounded-3xl bg-white md:col-span-2 flex flex-col justify-between shadow-sm space-y-4 text-left">
            {/* Equation Box */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Chemical Equation</span>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl font-mono text-base md:text-lg font-bold text-slate-800 select-all overflow-x-auto whitespace-nowrap shadow-inner">
                {reaction.equation}
              </div>
            </div>

            {/* Observation notes */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Reaction Observations</span>
              <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                {reaction.observations}
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Group Trends / Educational Alert */}
      <div className="glass-panel p-5 rounded-3xl bg-white/70 flex items-start gap-4 text-left shadow-sm">
        <AlertCircle className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Group Activity Trends</h4>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            <strong>Group 1 (Alkali Metals)</strong> are extremely soft metals that react with water to form alkaline solutions and flammable hydrogen gas. Their reactivity increases dramatically as you go down the group (from Lithium to Caesium) because the single valence electron is further from the nucleus and easier to lose. In contrast, <strong>Group 18 (Noble Gases)</strong> remain entirely inert in all circumstances.
          </p>
        </div>
      </div>

    </div>
  );
}
