import React, { useState } from 'react';
import { Menu, X, Gift, HelpCircle, Home, Target } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: 'home' | 'giveaway' | 'hunt') => void;
  currentPage: 'home' | 'giveaway' | 'hunt' | 'admin';
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (page: 'home' | 'giveaway' | 'hunt') => {
    onNavigate(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNav('home')}>
          {/* Using text logo to match style */}
          <div className="text-2xl font-extrabold tracking-tighter text-white uppercase italic">
            Idioten<span className="text-[#9333ea]">bonus</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => handleNav('home')}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-[#d8b4fe]' : 'text-gray-300 hover:text-[#d8b4fe]'}`}
          >
            <Home className="w-4 h-4" />
            Startseite
          </button>
          <button 
            onClick={() => handleNav('giveaway')}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentPage === 'giveaway' ? 'text-[#d8b4fe]' : 'text-gray-300 hover:text-[#d8b4fe]'}`}
          >
            <Gift className="w-4 h-4" />
            Gewinnspiel
          </button>
          <button 
            onClick={() => handleNav('hunt')}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentPage === 'hunt' ? 'text-[#d8b4fe] bg-[#9333ea]/10 px-3 py-1 rounded-full border border-[#9333ea]/20' : 'text-gray-300 hover:text-[#d8b4fe]'}`}
          >
            <Target className="w-4 h-4" />
            Hunt
          </button>
          {/* Specific Requirement: Support links to Instagram */}
          <a 
            href="https://www.instagram.com/idiotenbonus/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-bold bg-[#9333ea]/10 hover:bg-[#9333ea] text-white px-4 py-2 rounded-full transition-all border border-[#9333ea]/30 hover:shadow-[0_0_15px_rgba(147,51,234,0.5)]"
          >
            <HelpCircle className="w-4 h-4" />
            Support
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#15151e] border-b border-white/10 p-4 flex flex-col gap-4 shadow-2xl">
           <button 
            onClick={() => handleNav('home')}
            className={`flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg ${currentPage === 'home' ? 'text-[#d8b4fe]' : 'text-white'}`}
           >
            <Home className="w-5 h-5 text-[#9333ea]" />
            Startseite
          </button>
          <button 
            onClick={() => handleNav('giveaway')}
            className={`flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg ${currentPage === 'giveaway' ? 'text-[#d8b4fe]' : 'text-white'}`}
          >
            <Gift className="w-5 h-5 text-[#d8b4fe]" />
            Gewinnspiel
          </button>
          <button 
            onClick={() => handleNav('hunt')}
            className={`flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg ${currentPage === 'hunt' ? 'text-[#d8b4fe]' : 'text-white'}`}
          >
            <Target className="w-5 h-5 text-[#d8b4fe]" />
            Bonus Hunt
          </button>
          <a 
            href="https://www.instagram.com/idiotenbonus/"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-white p-2 hover:bg-[#9333ea]/20 rounded-lg text-[#9333ea] font-bold" 
            onClick={() => setIsOpen(false)}
          >
            <HelpCircle className="w-5 h-5" />
            Support
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;