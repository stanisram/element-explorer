import React from 'react';
import { getCategoryConfig, getElementStateAtTemp, getStateConfig } from '../utils/chemistry';

export default function ElementCell({
  element,
  onClick,
  isHighlighted,
  isDimmed,
  temperature,
  showTempState,
  isSelected
}) {
  const categoryConfig = getCategoryConfig(element.category);
  
  // Calculate state based on active temperature (if requested)
  const currentState = showTempState 
    ? getElementStateAtTemp(element, temperature) 
    : element.phase?.toLowerCase() || 'unknown';
    
  const stateConfig = getStateConfig(currentState);

  // Dynamic styling based on category and search state for Light Mode
  const cellStyle = {
    backgroundColor: isDimmed ? 'rgba(248, 250, 252, 0.4)' : categoryConfig.bg,
    borderColor: isSelected 
      ? '#0f172a' // slate-900 ring
      : isHighlighted 
        ? categoryConfig.color 
        : isDimmed 
          ? 'rgba(241, 245, 249, 0.5)' 
          : categoryConfig.border,
    color: isDimmed ? 'rgba(148, 163, 184, 0.4)' : '#1e293b',
    boxShadow: isSelected 
      ? `0 0 0 2px #ffffff, 0 0 8px ${categoryConfig.color}` 
      : isHighlighted && !isDimmed 
        ? `0 4px 12px ${categoryConfig.color}20` 
        : 'none',
  };

  // Determine grid position based on xpos and ypos from JSON
  const gridStyle = {
    gridColumnStart: element.xpos,
    gridRowStart: element.ypos,
  };

  return (
    <button
      onClick={() => onClick(element)}
      style={{ ...cellStyle, ...gridStyle }}
      className={`relative flex flex-col justify-between p-1.5 rounded-xl border text-left cursor-pointer transition-all duration-200 aspect-square select-none group
        ${isDimmed ? 'opacity-30 scale-95 pointer-events-none' : 'hover:scale-105 hover:shadow-md hover:bg-opacity-100'}
        ${isSelected ? 'z-10 scale-105 ring-2 ring-slate-900' : ''}
      `}
      title={`${element.name} (${element.symbol}) - Number: ${element.number}`}
    >
      {/* Top row: Atomic number & State indicator (if active) */}
      <div className="flex justify-between items-center w-full text-[10px] md:text-xs font-semibold">
        <span className={isDimmed ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-600 transition-colors'}>
          {element.number}
        </span>
        
        {/* Physical state dot indicator */}
        {showTempState && (
          <span 
            className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border border-white"
            style={{ 
              backgroundColor: stateConfig.color,
              boxShadow: `0 0 4px ${stateConfig.color}`
            }}
            title={`State at ${temperature}K: ${stateConfig.name}`}
          />
        )}
      </div>

      {/* Center symbol */}
      <div className="text-center flex-grow flex items-center justify-center -my-1">
        <span 
          style={{ color: isDimmed ? 'rgba(148, 163, 184, 0.4)' : categoryConfig.color }}
          className="text-lg md:text-xl font-bold tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] group-hover:scale-110 transition-transform"
        >
          {element.symbol}
        </span>
      </div>

      {/* Bottom row: Name & Mass */}
      <div className="flex flex-col text-[8px] md:text-[9px] leading-tight overflow-hidden w-full">
        <span className={`truncate font-medium ${isDimmed ? 'text-slate-300' : 'text-slate-700 group-hover:text-slate-900'}`}>
          {element.name}
        </span>
        <span className={`truncate font-mono ${isDimmed ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-500'}`}>
          {element.atomic_mass ? Number(element.atomic_mass).toFixed(3) : ''}
        </span>
      </div>
    </button>
  );
}
