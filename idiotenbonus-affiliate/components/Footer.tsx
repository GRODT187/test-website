import React from 'react';
import { Instagram, Youtube, Twitch, Settings } from 'lucide-react';

interface FooterProps {
    onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-[#050508] border-t border-[#9333ea]/20 py-12 relative">
       {/* Background Glow */}
       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-40 bg-[#9333ea] opacity-5 blur-[80px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="text-2xl font-extrabold tracking-tighter text-white mb-4 md:mb-0 uppercase italic">
                Idioten<span className="text-[#9333ea]">bonus</span>
            </div>
            
            <div className="flex gap-6">
                <a href="https://www.instagram.com/idiotenbonus/" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1a1a24] rounded-full hover:bg-[#9333ea] transition-colors text-white hover:shadow-[0_0_15px_rgba(147,51,234,0.6)]">
                    <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.youtube.com/@IdiotenBonus" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1a1a24] rounded-full hover:bg-[#9333ea] transition-colors text-white hover:shadow-[0_0_15px_rgba(147,51,234,0.6)]">
                    <Youtube className="w-5 h-5" />
                </a>
                <a href="https://www.twitch.tv/idiotenbonus" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1a1a24] rounded-full hover:bg-[#9333ea] transition-colors text-white hover:shadow-[0_0_15px_rgba(147,51,234,0.6)]">
                    <Twitch className="w-5 h-5" />
                </a>
                <a href="https://discord.gg/vyngzhcFbb" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1a1a24] rounded-full hover:bg-[#9333ea] transition-colors text-white hover:shadow-[0_0_15px_rgba(147,51,234,0.6)]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18.8943 4.34399C17.5183 3.71467 16.057 3.256 14.5317 3C14.3396 3.33333 14.1263 3.77867 13.977 4.13067C12.3546 3.89067 10.7439 3.89067 9.14391 4.13067C8.99457 3.77867 8.77056 3.33333 8.58922 3C7.05325 3.256 5.59191 3.71467 4.22591 4.34399C1.46255 8.41866 0.705206 12.3893 1.06788 16.312C2.92404 17.6773 4.71724 18.5093 6.48795 19.0533C6.91462 18.4773 7.28796 17.8693 7.60796 17.2293C6.97862 16.9947 6.38128 16.7173 5.81594 16.3973C5.97595 16.28 6.12529 16.152 6.27463 16.024C9.44259 17.4853 12.728 17.4853 15.864 16.024C16.0133 16.152 16.1626 16.28 16.3226 16.3973C15.7573 16.7173 15.16 16.9947 14.5306 17.2293C14.8506 17.8693 15.224 18.4773 15.6506 19.0533C17.4213 18.5093 19.2146 17.6773 21.0707 16.312C21.508 11.7067 20.4413 7.74666 18.8943 4.34399ZM8.55722 13.8453C7.57587 13.8453 6.76519 12.9387 6.76519 11.8507C6.76519 10.7627 7.55454 9.85599 8.55722 9.85599C9.57057 9.85599 10.3812 10.7627 10.3599 11.8507C10.3599 12.9387 9.5599 13.8453 8.55722 13.8453ZM15.424 13.8453C14.4427 13.8453 13.632 12.9387 13.632 11.8507C13.632 10.7627 14.4213 9.85599 15.424 9.85599C16.4373 9.85599 17.248 10.7627 17.2267 11.8507C17.2267 12.9387 16.4267 13.8453 15.424 13.8453Z" />
                    </svg>
                </a>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#9333ea]/10 pt-8 text-sm text-gray-500 items-center">
            <div>
                 <a 
                    href="https://www.gluecksspiel-behoerde.de/de/fuer-spielende/gluecksspielsucht-beratungs-und-hilfsangebote" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#d8b4fe] transition-colors flex items-center gap-2"
                 >
                    Verantwortungsvolles Spielen & Hilfe bei Spielsucht
                 </a>
            </div>
            
            <div className="flex flex-col items-start md:items-end">
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-8 rounded-full border border-red-500 text-red-500 flex items-center justify-center font-bold text-xs">18+</span>
                    <span className="text-xs">Glücksspiel kann süchtig machen.</span>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-xs text-right">
                        © 2025 Idiotenbonus. All rights reserved.<br />
                        Licensed operators only.
                    </p>
                    {/* Discreet Admin Link */}
                    {onAdminClick && (
                        <button onClick={onAdminClick} className="text-gray-700 hover:text-gray-500" title="Admin">
                            <Settings className="w-3 h-3" />
                        </button>
                    )}
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;