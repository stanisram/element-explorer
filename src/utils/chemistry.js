// Chemistry helper utilities and configurations adapted for Light Theme

export const CATEGORIES = {
  'alkali metal': {
    name: 'Alkali Metal',
    color: 'rgb(234, 88, 12)', // orange-600
    bg: 'rgba(234, 88, 12, 0.07)',
    border: 'rgba(234, 88, 12, 0.25)',
    hoverBg: 'rgba(234, 88, 12, 0.12)',
    text: 'text-orange-700',
  },
  'alkaline earth metal': {
    name: 'Alkaline Earth Metal',
    color: 'rgb(180, 83, 9)', // amber-700
    bg: 'rgba(217, 119, 6, 0.07)',
    border: 'rgba(217, 119, 6, 0.25)',
    hoverBg: 'rgba(217, 119, 6, 0.12)',
    text: 'text-amber-800',
  },
  'transition metal': {
    name: 'Transition Metal',
    color: 'rgb(29, 78, 216)', // blue-700
    bg: 'rgba(37, 99, 235, 0.07)',
    border: 'rgba(37, 99, 235, 0.25)',
    hoverBg: 'rgba(37, 99, 235, 0.12)',
    text: 'text-blue-800',
  },
  'post-transition metal': {
    name: 'Post-Transition Metal',
    color: 'rgb(4, 120, 87)', // emerald-700
    bg: 'rgba(5, 150, 105, 0.07)',
    border: 'rgba(5, 150, 105, 0.25)',
    hoverBg: 'rgba(5, 150, 105, 0.12)',
    text: 'text-emerald-800',
  },
  'metalloid': {
    name: 'Metalloid',
    color: 'rgb(15, 118, 110)', // teal-700
    bg: 'rgba(13, 148, 136, 0.07)',
    border: 'rgba(13, 148, 136, 0.25)',
    hoverBg: 'rgba(13, 148, 136, 0.12)',
    text: 'text-teal-800',
  },
  'diatomic nonmetal': {
    name: 'Diatomic Nonmetal',
    color: 'rgb(109, 40, 217)', // purple-700
    bg: 'rgba(124, 58, 237, 0.07)',
    border: 'rgba(124, 58, 237, 0.25)',
    hoverBg: 'rgba(124, 58, 237, 0.12)',
    text: 'text-purple-800',
  },
  'polyatomic nonmetal': {
    name: 'Polyatomic Nonmetal',
    color: 'rgb(90, 37, 214)', // violet-700
    bg: 'rgba(109, 40, 217, 0.07)',
    border: 'rgba(109, 40, 217, 0.25)',
    hoverBg: 'rgba(109, 40, 217, 0.12)',
    text: 'text-violet-800',
  },
  'noble gas': {
    name: 'Noble Gas',
    color: 'rgb(190, 24, 74)', // rose-700
    bg: 'rgba(225, 29, 72, 0.07)',
    border: 'rgba(225, 29, 72, 0.25)',
    hoverBg: 'rgba(225, 29, 72, 0.12)',
    text: 'text-rose-800',
  },
  'lanthanide': {
    name: 'Lanthanide',
    color: 'rgb(77, 124, 15)', // lime-700
    bg: 'rgba(101, 163, 13, 0.07)',
    border: 'rgba(101, 163, 13, 0.25)',
    hoverBg: 'rgba(101, 163, 13, 0.12)',
    text: 'text-lime-800',
  },
  'actinide': {
    name: 'Actinide',
    color: 'rgb(14, 116, 144)', // cyan-700
    bg: 'rgba(8, 145, 178, 0.07)',
    border: 'rgba(8, 145, 178, 0.25)',
    hoverBg: 'rgba(8, 145, 178, 0.12)',
    text: 'text-cyan-800',
  },
  'unknown': {
    name: 'Unknown',
    color: 'rgb(71, 85, 105)', // slate-600
    bg: 'rgba(100, 116, 139, 0.07)',
    border: 'rgba(100, 116, 139, 0.25)',
    hoverBg: 'rgba(100, 116, 139, 0.12)',
    text: 'text-slate-800',
  }
};

// Fallback pattern matching for elements whose exact category name isn't fully matched
export function getCategoryConfig(category) {
  if (!category) return CATEGORIES['unknown'];
  const normalized = category.toLowerCase();
  
  if (CATEGORIES[normalized]) return CATEGORIES[normalized];
  
  if (normalized.includes('alkali metal')) return CATEGORIES['alkali metal'];
  if (normalized.includes('alkaline earth')) return CATEGORIES['alkaline earth metal'];
  if (normalized.includes('transition metal')) return CATEGORIES['transition metal'];
  if (normalized.includes('post-transition')) return CATEGORIES['post-transition metal'];
  if (normalized.includes('metalloid')) return CATEGORIES['metalloid'];
  if (normalized.includes('noble gas')) return CATEGORIES['noble gas'];
  if (normalized.includes('lanthanide')) return CATEGORIES['lanthanide'];
  if (normalized.includes('actinide')) return CATEGORIES['actinide'];
  if (normalized.includes('nonmetal')) return CATEGORIES['diatomic nonmetal'];
  if (normalized.includes('halogen')) return CATEGORIES['diatomic nonmetal'];
  
  return CATEGORIES['unknown'];
}

// Calculate the state of an element at a given temperature in Kelvin
export function getElementStateAtTemp(element, tempK) {
  const melt = element.melt;
  const boil = element.boil;

  // If melt/boil points are missing, fall back to default phase
  if (melt === null || melt === undefined) {
    return (element.phase || 'Unknown').toLowerCase();
  }

  if (tempK < melt) {
    return 'solid';
  }

  if (boil === null || boil === undefined) {
    return 'liquid'; // It melted, but we don't know the boiling point
  }

  if (tempK >= boil) {
    return 'gas';
  }

  return 'liquid';
}

// State color configuration for Light Mode
export const STATE_COLORS = {
  solid: {
    name: 'Solid',
    border: 'border-slate-400',
    badge: 'bg-slate-100 text-slate-700 border border-slate-200',
    color: 'rgb(71, 85, 105)'
  },
  liquid: {
    name: 'Liquid',
    border: 'border-blue-500',
    badge: 'bg-blue-50 text-blue-700 border border-blue-200',
    color: 'rgb(29, 78, 216)'
  },
  gas: {
    name: 'Gas',
    border: 'border-red-500',
    badge: 'bg-red-50 text-red-700 border border-red-200',
    color: 'rgb(185, 28, 28)'
  },
  unknown: {
    name: 'Unknown',
    border: 'border-dashed border-slate-300',
    badge: 'bg-slate-50 text-slate-500 border border-slate-100',
    color: 'rgb(100, 116, 139)'
  }
};

export function getStateConfig(state) {
  const normalized = (state || 'unknown').toLowerCase();
  return STATE_COLORS[normalized] || STATE_COLORS.unknown;
}
