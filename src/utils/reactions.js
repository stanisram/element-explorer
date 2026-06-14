// Chemical reaction equations and descriptions for simulator

export function getReactionData(element, reactant) {
  const symbol = element.symbol;
  const name = element.name;
  const num = element.number;
  const cat = element.category.toLowerCase();

  // 1. REACTANT: WATER
  if (reactant === 'water') {
    // Alkali metals
    if (cat.includes('alkali metal')) {
      let vigor = 'Vigorous';
      let desc = '';
      if (num === 3) { // Lithium
        vigor = 'Vigorous';
        desc = 'Lithium reacts steadily with water, fizzing and releasing hydrogen gas. It does not melt due to its high melting point.';
      } else if (num === 11) { // Sodium
        vigor = 'Violent';
        desc = 'Sodium reacts violently, melting into a silver sphere that skitters across the surface. It may burn with a yellow flame.';
      } else if (num === 19) { // Potassium
        vigor = 'Explosive';
        desc = 'Potassium reacts explosively, instantly igniting with a beautiful lilac flame and crackling.';
      } else { // Rb, Cs, Fr
        vigor = 'Explosive';
        desc = `${name} reacts instantaneously and extremely explosively, shattering glass containers and releasing immense heat.`;
      }
      return {
        reactivity: vigor,
        equation: `2${symbol}(s) + 2H₂O(l) → 2${symbol}OH(aq) + H₂(g)`,
        observations: desc,
        color: 'text-red-600 bg-red-50 border-red-200'
      };
    }

    // Alkaline earth metals
    if (cat.includes('alkaline earth')) {
      if (num === 4) { // Beryllium
        return {
          reactivity: 'None',
          equation: `${symbol}(s) + H₂O(l) → No Reaction`,
          observations: 'Beryllium has a strong oxide layer and does not react with water or steam even at red heat.',
          color: 'text-slate-500 bg-slate-50 border-slate-200'
        };
      }
      if (num === 12) { // Magnesium
        return {
          reactivity: 'Very Slow',
          equation: `${symbol}(s) + 2H₂O(l) → ${symbol}(OH)₂(s) + H₂(g)`,
          observations: 'Magnesium reacts very slowly with cold water, producing a few bubbles of hydrogen. However, it reacts vigorously with steam.',
          color: 'text-amber-600 bg-amber-50 border-amber-200'
        };
      }
      // Ca, Sr, Ba, Ra
      return {
        reactivity: 'Moderate',
        equation: `${symbol}(s) + 2H₂O(l) → ${symbol}(OH)₂(aq) + H₂(g)`,
        observations: `${name} reacts steadily with cold water, sinking and bubbling vigorously as hydrogen gas is evolved and a white precipitate of hydroxide forms.`,
        color: 'text-blue-600 bg-blue-50 border-blue-200'
      };
    }

    // Noble gases
    if (cat.includes('noble gas')) {
      return {
        reactivity: 'None',
        equation: `${symbol} + H₂O → No Reaction`,
        observations: 'Noble gases are chemically inert due to their full valence electron shells. They do not react with water.',
        color: 'text-slate-500 bg-slate-50 border-slate-200'
      };
    }

    // Halogens / Diatomic nonmetals (except oxygen/hydrogen)
    if (cat.includes('nonmetal') || cat.includes('halogen')) {
      if (num === 9) { // Fluorine
        return {
          reactivity: 'Explosive',
          equation: `2F₂(g) + 2H₂O(l) → 4HF(aq) + O₂(g)`,
          observations: 'Fluorine reacts explosively with water, decomposing it to form hydrofluoric acid and releasing oxygen gas.',
          color: 'text-red-600 bg-red-50 border-red-200'
        };
      }
      if (num === 17) { // Chlorine
        return {
          reactivity: 'Slow',
          equation: `Cl₂(g) + H₂O(l) ⇌ HCl(aq) + HClO(aq)`,
          observations: 'Chlorine dissolves in water to form a pale green solution of hydrochloric acid and hypochlorous acid (bleach).',
          color: 'text-amber-600 bg-amber-50 border-amber-200'
        };
      }
    }

    // General Metals / Transition Metals
    return {
      reactivity: 'None to Very Slow',
      equation: `${symbol}(s) + H₂O(l) → No Reaction (at standard temp)`,
      observations: 'Most transition metals (like Gold, Copper, Platinum, and Iron) do not react with liquid water under standard conditions, though iron will slowly rust over time in the presence of oxygen.',
      color: 'text-slate-500 bg-slate-50 border-slate-200'
    };
  }

  // 2. REACTANT: OXYGEN
  if (reactant === 'oxygen') {
    if (cat.includes('noble gas')) {
      return {
        reactivity: 'None',
        equation: `${symbol} + O₂ → No Reaction`,
        observations: 'Noble gases do not react with oxygen under any standard conditions.',
        color: 'text-slate-500 bg-slate-50 border-slate-200'
      };
    }
    if (cat.includes('alkali metal')) {
      return {
        reactivity: 'Vigorous',
        equation: `4${symbol}(s) + O₂(g) → 2${symbol}₂O(s)`,
        observations: `${name} tarnishes rapidly when exposed to air, forming a dull grey oxide coating. It burns with a bright colored flame when ignited (Lithium: crimson, Sodium: yellow, Potassium: lilac).`,
        color: 'text-red-600 bg-red-50 border-red-200'
      };
    }
    if (num === 12) { // Magnesium
      return {
        reactivity: 'Vigorous',
        equation: `2Mg(s) + O₂(g) → 2MgO(s)`,
        observations: 'Magnesium burns with an incredibly bright, blinding white flame, leaving a fine white powder of magnesium oxide.',
        color: 'text-red-600 bg-red-50 border-red-200'
      };
    }
    if (num === 26) { // Iron
      return {
        reactivity: 'Slow',
        equation: `4Fe(s) + 3O₂(g) + xH₂O(l) → 2Fe₂O₃·xH₂O(s)`,
        observations: 'Iron reacts slowly with oxygen in the presence of moisture to form rust (hydrated iron(III) oxide). If iron wool is ignited, it burns with yellow sparks.',
        color: 'text-amber-600 bg-amber-50 border-amber-200'
      };
    }
    if (num === 79 || num === 78) { // Gold, Platinum
      return {
        reactivity: 'None',
        equation: `${symbol} + O₂ → No Reaction`,
        observations: 'Noble metals like Gold and Platinum do not react with oxygen at any temperature, which is why they retain their shiny luster indefinitely.',
        color: 'text-slate-500 bg-slate-50 border-slate-200'
      };
    }
    // Generic metal
    return {
      reactivity: 'Slow to Moderate',
      equation: `Metal + O₂ → Metal Oxide`,
      observations: 'Most metals react slowly with oxygen in air to form a passivation oxide coating on the surface, preventing further corrosion.',
      color: 'text-blue-600 bg-blue-50 border-blue-200'
    };
  }

  // 3. REACTANT: ACID (HCl)
  if (reactant === 'acid') {
    if (cat.includes('noble gas')) {
      return {
        reactivity: 'None',
        equation: `${symbol} + HCl → No Reaction`,
        observations: 'Noble gases are entirely unreactive towards acids.',
        color: 'text-slate-500 bg-slate-50 border-slate-200'
      };
    }
    if (cat.includes('alkali metal')) {
      return {
        reactivity: 'Explosive',
        equation: `2${symbol}(s) + 2HCl(aq) → 2${symbol}Cl(aq) + H₂(g)`,
        observations: 'Extremely dangerous reaction! Alkali metals react explosively with acids, producing huge amounts of heat, hydrogen gas, and splattering corrosive materials.',
        color: 'text-red-600 bg-red-50 border-red-200'
      };
    }
    if (cat.includes('alkaline earth') || num === 30 || num === 26 || num === 13) {
      // Mg, Ca, Zn, Fe, Al
      let vigor = 'Vigorous';
      if (num === 26) vigor = 'Moderate';
      return {
        reactivity: vigor,
        equation: `${symbol}(s) + 2HCl(aq) → ${symbol}Cl₂(aq) + H₂(g)`,
        observations: `${name} dissolves rapidly in hydrochloric acid, producing rapid bubbling of hydrogen gas and heating up the solution.`,
        color: 'text-red-600 bg-red-50 border-red-200'
      };
    }
    if (num === 79 || num === 47 || num === 29) { // Au, Ag, Cu
      return {
        reactivity: 'None',
        equation: `${symbol}(s) + HCl(aq) → No Reaction`,
        observations: 'Copper, Silver, and Gold are below Hydrogen in the reactivity series. They do not react with hydrochloric acid because they cannot displace hydrogen.',
        color: 'text-slate-500 bg-slate-50 border-slate-200'
      };
    }
    // Generic nonmetals
    return {
      reactivity: 'None',
      equation: `Nonmetal + HCl → No Reaction`,
      observations: 'Non-metals generally do not react with dilute acids because they cannot donate electrons to reduce hydrogen ions.',
      color: 'text-slate-500 bg-slate-50 border-slate-200'
    };
  }

  return null;
}
