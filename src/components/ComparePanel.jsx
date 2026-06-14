import React, { useState } from 'react';
import { getCategoryConfig } from '../utils/chemistry';
import { ArrowLeftRight, Check, AlertCircle } from 'lucide-react';

export default function ComparePanel({ elements }) {
  const [element1Id, setElement1Id] = useState(1); // Hydrogen
  const [element2Id, setElement2Id] = useState(6); // Carbon

  const element1 = elements.find(el => el.number === Number(element1Id)) || elements[0];
  const element2 = elements.find(el => el.number === Number(element2Id)) || elements[5];

  const catConfig1 = getCategoryConfig(element1.category);
  const catConfig2 = getCategoryConfig(element2.category);

  // Comparison helpers
  const compareNumbers = (val1, val2) => {
    if (val1 === null || val1 === undefined || val2 === null || val2 === undefined) {
      return { ratio1: 50, ratio2: 50, winner: null };
    }
    const max = Math.max(val1, val2);
    if (max === 0) return { ratio1: 50, ratio2: 50, winner: null };
    
    return {
      ratio1: (val1 / max) * 100,
      ratio2: (val2 / max) * 100,
      winner: val1 > val2 ? 1 : val1 < val2 ? 2 : 0
    };
  };

  // Properties list to compare
  const massCompare = compareNumbers(element1.atomic_mass, element2.atomic_mass);
  const boilCompare = compareNumbers(element1.boil, element2.boil);
  const meltCompare = compareNumbers(element1.melt, element2.melt);
  const densityCompare = compareNumbers(element1.density, element2.density);
  const electronegCompare = compareNumbers(element1.electronegativity_pauling, element2.electronegativity_pauling);

  // Kelvin to Celsius helper
  const formatK = (k) => {
    if (k === null || k === undefined) return 'N/A';
    return `${k} K (${(k - 273.15).toFixed(1)} °C)`;
  };

  const renderComparisonRow = (label, val1, val2, comparisonObj, unit = '') => {
    const { ratio1, ratio2, winner } = comparisonObj;
    const isVal1Available = val1 !== null && val1 !== undefined;
    const isVal2Available = val2 !== null && val2 !== undefined;

    return (
      <div className="glass-card p-4 rounded-2xl bg-white space-y-2.5">
        <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
          <span className="text-slate-800">{isVal1Available ? `${val1} ${unit}` : 'N/A'}</span>
          <span>{label}</span>
          <span className="text-right text-slate-800">{isVal2Available ? `${val2} ${unit}` : 'N/A'}</span>
        </div>

        {/* Meter bar comparison */}
        <div className="flex items-center gap-4 h-2.5 bg-slate-100 rounded-full overflow-hidden">
          {/* Left Element Bar */}
          <div className="w-1/2 flex justify-end">
            <div 
              className="h-full rounded-l-full transition-all duration-500"
              style={{ 
                width: isVal1Available ? `${ratio1}%` : '0%', 
                backgroundColor: winner === 1 ? catConfig1.color : 'rgb(148, 163, 184)', // slate-400
                opacity: winner === 2 ? 0.35 : 1
              }}
            />
          </div>
          {/* Right Element Bar */}
          <div className="w-1/2 flex justify-start">
            <div 
              className="h-full rounded-r-full transition-all duration-500"
              style={{ 
                width: isVal2Available ? `${ratio2}%` : '0%', 
                backgroundColor: winner === 2 ? catConfig2.color : 'rgb(148, 163, 184)', // slate-400
                opacity: winner === 1 ? 0.35 : 1
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Selection Header */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 bg-white/70">
        
        {/* Element 1 Select */}
        <div className="flex flex-col space-y-1.5 w-full md:w-2/5 text-left">
          <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Select Element A</label>
          <select 
            value={element1Id}
            onChange={(e) => setElement1Id(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold focus:outline-none focus:border-slate-400 cursor-pointer shadow-sm"
          >
            {elements.map(el => (
              <option key={el.number} value={el.number}>
                {el.number}. {el.name} ({el.symbol})
              </option>
            ))}
          </select>
        </div>

        {/* Center Icon */}
        <div className="p-3 bg-slate-100 border border-slate-200 rounded-full text-blue-600 shadow-md shrink-0">
          <ArrowLeftRight className="w-6 h-6" />
        </div>

        {/* Element 2 Select */}
        <div className="flex flex-col space-y-1.5 w-full md:w-2/5 text-left md:text-right">
          <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Select Element B</label>
          <select 
            value={element2Id}
            onChange={(e) => setElement2Id(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold focus:outline-none focus:border-slate-400 cursor-pointer shadow-sm"
          >
            {elements.map(el => (
              <option key={el.number} value={el.number}>
                {el.number}. {el.name} ({el.symbol})
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Side-by-side Hero display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Element 1 Card */}
        <div 
          className="glass-panel p-6 rounded-3xl border-t-4 bg-white text-center space-y-4 shadow-sm"
          style={{ borderTopColor: catConfig1.color }}
        >
          <div className="inline-block p-1 rounded-lg" style={{ backgroundColor: catConfig1.bg }}>
            <span className="text-xs font-bold px-2.5 py-0.5" style={{ color: catConfig1.color }}>
              {catConfig1.name}
            </span>
          </div>
          <div>
            <span className="text-5xl font-black block" style={{ color: catConfig1.color }}>{element1.symbol}</span>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{element1.name}</h3>
            <span className="text-xs text-slate-400 font-mono block mt-0.5">Atomic Number: {element1.number}</span>
          </div>
          <div className="pt-2 border-t border-slate-100 text-sm text-slate-600 font-medium">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-0.5">Configuration</span>
            {element1.electron_configuration_semantic || element1.electron_configuration || 'N/A'}
          </div>
        </div>

        {/* Element 2 Card */}
        <div 
          className="glass-panel p-6 rounded-3xl border-t-4 bg-white text-center space-y-4 shadow-sm"
          style={{ borderTopColor: catConfig2.color }}
        >
          <div className="inline-block p-1 rounded-lg" style={{ backgroundColor: catConfig2.bg }}>
            <span className="text-xs font-bold px-2.5 py-0.5" style={{ color: catConfig2.color }}>
              {catConfig2.name}
            </span>
          </div>
          <div>
            <span className="text-5xl font-black block" style={{ color: catConfig2.color }}>{element2.symbol}</span>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{element2.name}</h3>
            <span className="text-xs text-slate-400 font-mono block mt-0.5">Atomic Number: {element2.number}</span>
          </div>
          <div className="pt-2 border-t border-slate-100 text-sm text-slate-600 font-medium">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-0.5">Configuration</span>
            {element2.electron_configuration_semantic || element2.electron_configuration || 'N/A'}
          </div>
        </div>

      </div>

      {/* Side-by-side Properties Comparison */}
      <div className="space-y-3.5 pt-2">
        <h2 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest text-center">Properties Meter Comparison</h2>
        
        {renderComparisonRow('Atomic Weight', element1.atomic_mass, element2.atomic_mass, massCompare, 'u')}
        {renderComparisonRow('Density', element1.density, element2.density, densityCompare, 'g/cm³')}
        {renderComparisonRow('Electronegativity', element1.electronegativity_pauling, element2.electronegativity_pauling, electronegCompare, 'Pauling')}
        {renderComparisonRow('Boiling Point', formatK(element1.boil), formatK(element2.boil), boilCompare)}
        {renderComparisonRow('Melting Point', formatK(element1.melt), formatK(element2.melt), meltCompare)}
      </div>
      
      {/* Compare Summary */}
      <div className="glass-panel p-4 rounded-2xl flex items-start gap-3 text-xs text-slate-500 bg-slate-100/30">
        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed font-medium">
          <strong>Comparison Tip:</strong> In Compare Mode, elements' physical metrics are visualized relative to each other. The bar represents the ratio against the higher value. Elements with missing values are represented with solid gray indicators.
        </p>
      </div>
    </div>
  );
}
