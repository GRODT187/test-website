import React from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  bonusType: string;
  setBonusType: (val: string) => void;
  minBonus: string;
  setMinBonus: (val: string) => void;
  maxWager: string;
  setMaxWager: (val: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  bonusType,
  setBonusType,
  minBonus,
  setMinBonus,
  maxWager,
  setMaxWager
}) => {
  return (
    <div className="w-full bg-[#15151e]/80 backdrop-blur-md border border-[#9333ea]/20 rounded-2xl p-6 mb-8 shadow-[0_10px_40px_-10px_rgba(147,51,234,0.2)] relative z-30">
      <div className="flex items-center gap-2 mb-4 text-[#d8b4fe] font-bold uppercase text-xs tracking-wider">
        <Filter className="w-4 h-4" />
        <span>Filter & Suche</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Search Input */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-[#d8b4fe]" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 bg-[#0a0a0f] border border-[#9333ea]/20 rounded-lg focus:ring-1 focus:ring-[#9333ea] focus:border-[#9333ea] text-sm text-white placeholder-gray-500 transition-all hover:border-[#9333ea]/40"
            placeholder="Casino suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Bonus Type Select */}
        <div className="relative">
          <select
            className="block w-full pl-3 pr-10 py-2.5 bg-[#0a0a0f] border border-[#9333ea]/20 rounded-lg focus:ring-1 focus:ring-[#9333ea] focus:border-[#9333ea] text-sm text-white appearance-none cursor-pointer hover:border-[#9333ea]/40 transition-all"
            value={bonusType}
            onChange={(e) => setBonusType(e.target.value)}
          >
            <option value="ALL">Alle Bonusarten</option>
            <option value="NON-STICKY">Non-Sticky</option>
            <option value="STICKY">Sticky</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400">
             <SlidersHorizontal className="w-4 h-4" />
          </div>
        </div>

        {/* Min Bonus Amount (Simple Select for predefined ranges) */}
        <div className="relative">
          <select
            className="block w-full pl-3 pr-10 py-2.5 bg-[#0a0a0f] border border-[#9333ea]/20 rounded-lg focus:ring-1 focus:ring-[#9333ea] focus:border-[#9333ea] text-sm text-white appearance-none cursor-pointer hover:border-[#9333ea]/40 transition-all"
            value={minBonus}
            onChange={(e) => setMinBonus(e.target.value)}
          >
            <option value="0">Min. Bonusbetrag: Egal</option>
            <option value="100">Ab 100€</option>
            <option value="300">Ab 300€</option>
            <option value="500">Ab 500€</option>
            <option value="1000">Ab 1.000€</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400">
             <span className="text-xs">▼</span>
          </div>
        </div>

        {/* Max Wager Filter */}
        <div className="relative">
          <select
            className="block w-full pl-3 pr-10 py-2.5 bg-[#0a0a0f] border border-[#9333ea]/20 rounded-lg focus:ring-1 focus:ring-[#9333ea] focus:border-[#9333ea] text-sm text-white appearance-none cursor-pointer hover:border-[#9333ea]/40 transition-all"
            value={maxWager}
            onChange={(e) => setMaxWager(e.target.value)}
          >
            <option value="100">Max. Wager: Egal</option>
            <option value="30">Bis 30x</option>
            <option value="35">Bis 35x</option>
            <option value="40">Bis 40x</option>
          </select>
           <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400">
             <span className="text-xs">▼</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FilterBar;