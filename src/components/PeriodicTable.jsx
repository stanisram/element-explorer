import React from 'react';
import ElementCell from './ElementCell';
import { CATEGORIES, getCategoryConfig, getElementStateAtTemp } from '../utils/chemistry';

export default function PeriodicTable({
  elements,
  searchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedElement,
  setSelectedElement,
  temperature,
  showTempState,
  highlightedState
}) {
  
  // Helper to determine if an element matches filters
  const getFilterState = (element) => {
    // 1. Search Query filter (match by name, symbol, or atomic number)
    const matchesSearch = searchQuery.trim() === '' || 
      element.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      element.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      element.number.toString() === searchQuery.trim();
      
    // 2. Category filter
    const matchesCategory = !selectedCategory || 
      element.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'nonmetal' && element.category.toLowerCase().includes('nonmetal'));

    // 3. Highlighted physical state (solid/liquid/gas) filter
    let matchesState = true;
    if (highlightedState) {
      const currentState = showTempState 
        ? getElementStateAtTemp(element, temperature)
        : element.phase?.toLowerCase() || 'unknown';
      matchesState = currentState === highlightedState;
    }

    const matchesAll = matchesSearch && matchesCategory && matchesState;
    
    return {
      isDimmed: !matchesAll,
      isHighlighted: matchesAll && (searchQuery.trim() !== '' || selectedCategory || highlightedState)
    };
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Table grid wrapper - enables horizontal scrolling on small screens */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-thin">
        <div 
          className="grid gap-1.5 min-w-[950px] max-w-full mx-auto p-1"
          style={{
            gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
            gridTemplateRows: 'repeat(10, minmax(0, 1fr))'
          }}
        >
          {elements.map((element) => {
            const { isDimmed, isHighlighted } = getFilterState(element);
            return (
              <ElementCell
                key={element.number}
                element={element}
                onClick={setSelectedElement}
                isSelected={selectedElement?.number === element.number}
                isDimmed={isDimmed}
                isHighlighted={isHighlighted}
                temperature={temperature}
                showTempState={showTempState}
              />
            );
          })}

          {/* Central dashboard label */}
          <div className="col-start-3 col-end-13 row-start-2 row-end-4 flex flex-col justify-center items-center text-center p-4 select-none pointer-events-none">
            <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Interactive</span>
            <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent uppercase tracking-wider">
              Periodic Table
            </span>
            <span className="text-[11px] text-slate-500 font-medium mt-1">Click elements to reveal detailed profiles</span>
          </div>
        </div>
      </div>

      {/* Interactive Category Legend */}
      <div className="glass-panel p-5 rounded-2xl">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center md:text-left">
          Filter by Group / Category
        </h3>
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {Object.entries(CATEGORIES)
            .filter(([key]) => key !== 'unknown')
            .map(([key, value]) => {
              const isSelected = selectedCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(isSelected ? null : key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 transition-all duration-200 cursor-pointer
                    ${isSelected 
                      ? 'text-white shadow-md' 
                      : 'hover:border-slate-400 text-slate-700 bg-white border-slate-200'
                    }
                  `}
                  style={{
                    backgroundColor: isSelected ? value.color : '#ffffff',
                    borderColor: isSelected ? value.color : '#e2e8f0',
                    boxShadow: isSelected ? `0 4px 10px ${value.color}40` : 'none'
                  }}
                >
                  <span 
                    className="w-2.5 h-2.5 rounded-full shrink-0" 
                    style={{ backgroundColor: value.color }}
                  />
                  {value.name}
                </button>
              );
            })}
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-red-50 border border-red-200 text-red-600 hover:text-red-700 hover:bg-red-100 transition-all cursor-pointer"
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
