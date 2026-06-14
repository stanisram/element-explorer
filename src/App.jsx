import React, { useState } from 'react';
import periodicData from './data/periodic-table.json';
import PeriodicTable from './components/PeriodicTable';
import ElementProfile from './components/ElementProfile';
import ComparePanel from './components/ComparePanel';
import QuizGame from './components/QuizGame';
import ReactionSimulator from './components/ReactionSimulator';
import RealLifeExamples from './components/RealLifeExamples';
import { Search, Flame, Beaker, HelpCircle, LayoutGrid, Scale, Thermometer, Sparkles } from 'lucide-react';

export default function App() {
  const elements = periodicData.elements || [];
  
  // Navigation & Tab state
  const [activeTab, setActiveTab] = useState('table'); // table, compare, quiz, reactions, examples
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  
  // Temperature state (in Kelvin)
  const [temperature, setTemperature] = useState(298); // Default: Room Temp (298K)
  const [showTempState, setShowTempState] = useState(true);
  const [highlightedState, setHighlightedState] = useState(null); // solid, liquid, gas

  // Presets for the Temperature Simulator
  const TEMP_PRESETS = [
    { name: 'Absolute Zero', value: 0 },
    { name: 'Liquid Nitrogen', value: 77 },
    { name: 'Room Temp', value: 298 },
    { name: 'Water Boils', value: 373 },
    { name: 'Iron Melts', value: 1811 },
    { name: 'Sun Surface', value: 5778 },
  ];

  // Reset all periodic table filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setHighlightedState(null);
    setTemperature(298);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 selection:bg-blue-600/10">
      
      {/* BACKGROUND DECORATIVE EFFECTS */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      {/* HEADER */}
      <header className="border-b border-slate-200/80 bg-white/85 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          
          {/* Logo & Subtitle */}
          <div className="space-y-0.5 text-left">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ElementExplorer
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
              Interactive Periodic Table & Chemistry Learning Lab
            </p>
          </div>

          {/* Tab Navigation */}
          <nav className="flex flex-wrap bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50 max-w-max self-start xl:self-center shadow-inner gap-1">
            <button
              onClick={() => setActiveTab('table')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer
                ${activeTab === 'table' 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                }
              `}
            >
              <LayoutGrid className="w-4 h-4" />
              Periodic Table
            </button>
            
            <button
              onClick={() => setActiveTab('compare')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer
                ${activeTab === 'compare' 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                }
              `}
            >
              <Scale className="w-4 h-4" />
              Compare Mode
            </button>
            
            <button
              onClick={() => setActiveTab('reactions')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer
                ${activeTab === 'reactions' 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                }
              `}
            >
              <Beaker className="w-4 h-4" />
              Reactions Lab
            </button>

            <button
              onClick={() => setActiveTab('examples')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer
                ${activeTab === 'examples' 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                }
              `}
            >
              <Sparkles className="w-4 h-4" />
              Real-Life Uses
            </button>
            
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer
                ${activeTab === 'quiz' 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                }
              `}
            >
              <HelpCircle className="w-4 h-4" />
              Chemistry Quiz
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 pb-20">
        
        {activeTab === 'table' && (
          <div className="space-y-6">
            
            {/* SEARCH & TEMPERATURE CONTROL PANEL */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
              
              {/* Search & Highlights Card */}
              <div className="glass-panel p-5 rounded-3xl bg-white flex flex-col justify-between space-y-4 shadow-sm">
                <div className="space-y-1.5 text-left">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Search & Filters</h3>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by name, symbol, atomic no..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-slate-400 focus:bg-white text-sm font-semibold text-slate-800 transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* State Filters */}
                <div className="space-y-2 text-left">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                    Highlight State at {temperature}K
                  </span>
                  <div className="flex gap-2 text-xs">
                    {['solid', 'liquid', 'gas'].map((state) => {
                      const isHighlighted = highlightedState === state;
                      return (
                        <button
                          key={state}
                          onClick={() => setHighlightedState(isHighlighted ? null : state)}
                          className={`flex-1 py-2.5 rounded-xl font-bold border capitalize transition-all cursor-pointer
                            ${isHighlighted
                              ? 'bg-slate-900 text-white border-slate-950 shadow-md font-bold'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                            }
                          `}
                        >
                          {state}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Reset Buttons */}
                {(searchQuery || selectedCategory || highlightedState || temperature !== 298) && (
                  <button
                    onClick={resetFilters}
                    className="w-full py-2.5 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl text-xs font-bold text-red-600 transition cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>

              {/* Temperature Slider Card */}
              <div className="glass-panel p-5 rounded-3xl bg-white lg:col-span-2 flex flex-col justify-between space-y-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5 text-left">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Thermometer className="w-4.5 h-4.5 text-red-500" /> Temperature Simulator
                    </h3>
                    <p className="text-[10px] text-slate-400 font-semibold">Slide to inspect states at various thermal profiles</p>
                  </div>

                  <div className="flex items-center gap-4 bg-slate-100 border border-slate-200 px-4 py-1.5 rounded-xl">
                    <div className="text-right">
                      <span className="text-lg font-black text-slate-800 font-mono">{temperature}K</span>
                      <span className="text-[10px] text-slate-500 block font-mono font-bold">
                        {(temperature - 273.15).toFixed(1)} °C
                      </span>
                    </div>
                  </div>
                </div>

                {/* Slider */}
                <div className="space-y-2 py-1">
                  <input
                    type="range"
                    min="0"
                    max="6000"
                    value={temperature}
                    onChange={(e) => {
                      setTemperature(Number(e.target.value));
                      setShowTempState(true);
                    }}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider">
                    <span>0 K (Absolute Zero)</span>
                    <span>1000 K</span>
                    <span>2000 K</span>
                    <span>3000 K</span>
                    <span>4000 K</span>
                    <span>5000 K</span>
                    <span>6000 K</span>
                  </div>
                </div>

                {/* Presets */}
                <div className="flex flex-wrap gap-2">
                  {TEMP_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        setTemperature(preset.value);
                        setShowTempState(true);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition cursor-pointer border
                        ${temperature === preset.value
                          ? 'bg-slate-900 text-white border-slate-950 shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 border-slate-200/60 text-slate-600'
                        }
                      `}
                    >
                      {preset.name} ({preset.value}K)
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* PERIODIC TABLE CONTAINER */}
            <div className="relative">
              <PeriodicTable
                elements={elements}
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedElement={selectedElement}
                setSelectedElement={setSelectedElement}
                temperature={temperature}
                showTempState={showTempState}
                highlightedState={highlightedState}
              />
            </div>

            {/* ELEMENT PROFILE PANEL (SLIDE OUT OR PORTAL) */}
            {selectedElement && (
              <ElementProfile
                element={selectedElement}
                onClose={() => setSelectedElement(null)}
                temperature={temperature}
                showTempState={showTempState}
              />
            )}
          </div>
        )}

        {activeTab === 'compare' && (
          <ComparePanel elements={elements} />
        )}

        {activeTab === 'quiz' && (
          <QuizGame elements={elements} />
        )}

        {activeTab === 'reactions' && (
          <ReactionSimulator elements={elements} />
        )}

        {activeTab === 'examples' && (
          <RealLifeExamples elements={elements} />
        )}

      </main>
    </div>
  );
}
