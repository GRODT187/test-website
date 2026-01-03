import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, ArrowRight, Star } from 'lucide-react';
import { CasinoOffer } from '../types';

interface CasinoCardProps {
  offer: CasinoOffer;
}

const CasinoCard: React.FC<CasinoCardProps> = ({ offer }) => {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once loaded
        }
      },
      {
        rootMargin: '100px', // Start loading 100px before it comes into view
        threshold: 0.01
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleCopy = () => {
    if (offer.promoCode) {
      navigator.clipboard.writeText(offer.promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Skeleton Loader State
  if (!isVisible) {
    return (
      <div 
        ref={cardRef} 
        className="glass-panel rounded-2xl p-6 mb-6 min-h-[250px] animate-pulse border border-white/5"
      >
        <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-white/10 rounded-xl"></div>
            <div className="space-y-3">
                <div className="w-40 h-6 bg-white/10 rounded"></div>
                <div className="w-24 h-4 bg-white/5 rounded"></div>
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-20 bg-white/5 rounded-xl"></div>
                ))}
            </div>
            <div className="lg:col-span-5 h-20 bg-white/5 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div ref={cardRef} className="glass-panel rounded-2xl p-6 mb-6 transition-transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] group relative overflow-hidden animate-in fade-in duration-500">
      {/* Top Glow */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d8b4fe] to-transparent opacity-30" />

      {/* Header Row: Logo & Name */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#9333ea]/30 shrink-0 shadow-[0_0_15px_rgba(147,51,234,0.2)] bg-[#0a0a0f]">
            <img 
                src={offer.logoUrl} 
                alt={offer.name} 
                className="w-full h-full object-contain p-1" 
                loading="lazy"
                decoding="async"
                onError={(e) => {
                    // Fallback if image fails
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${offer.name}&background=15151e&color=fff`;
                }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-white">{offer.name}</h3>
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" />
            </div>
          </div>
        </div>
        
        {offer.isExclusive && (
          <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#7e22ce] to-[#9333ea] text-white font-bold text-sm shadow-[0_0_15px_rgba(147,51,234,0.4)] border border-[#a855f7]/30">
            Exklusiv
          </span>
        )}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Stats Columns (Left side) */}
        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Stat 1: Bonus % & Type */}
          {offer.stats.bonusPercentage && (
              <div className="bg-[#1f1f2b]/50 border border-[#9333ea]/20 rounded-xl p-3 flex flex-col justify-center min-h-[90px] relative overflow-hidden group-hover:border-[#9333ea]/40 transition-colors">
                <span className="text-[#d8b4fe] font-bold text-xs uppercase mb-1">{offer.stats.bonusType}</span>
                <span className="text-white text-2xl font-black drop-shadow-[0_0_8px_rgba(147,51,234,0.5)]">{offer.stats.bonusPercentage}</span>
              </div>
          )}

           {/* Stat 2: Max Bonus - Hide if null */}
           {offer.stats.maxBonus && (
               <div className="bg-[#1f1f2b]/50 border border-[#9333ea]/20 rounded-xl p-3 flex flex-col justify-center min-h-[90px] relative overflow-hidden group-hover:border-[#9333ea]/40 transition-colors">
                <span className="text-[#d8b4fe] font-bold text-xs uppercase mb-1">Max. Bonus</span>
                <span className="text-white text-2xl font-black">{offer.stats.maxBonus}</span>
              </div>
           )}

           {/* Stat 3: Max Bet - Hide if null */}
           {offer.stats.maxBet && (
               <div className="bg-[#1f1f2b]/50 border border-[#9333ea]/20 rounded-xl p-3 flex flex-col justify-center min-h-[90px] relative overflow-hidden group-hover:border-[#9333ea]/40 transition-colors">
                <span className="text-[#d8b4fe] font-bold text-xs uppercase mb-1">Max. Einsatz</span>
                <span className="text-white text-2xl font-black">{offer.stats.maxBet}</span>
              </div>
           )}

           {/* Stat 4: Wager - Hide if null */}
           {offer.stats.wager && (
               <div className="bg-[#1f1f2b]/50 border border-[#9333ea]/20 rounded-xl p-3 flex flex-col justify-center min-h-[90px] relative overflow-hidden group-hover:border-[#9333ea]/40 transition-colors">
                <span className="text-[#d8b4fe] font-bold text-xs uppercase mb-1">Wager</span>
                <span className="text-white text-2xl font-black">{offer.stats.wager}</span>
              </div>
           )}
        </div>

        {/* Action Column (Right side) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Features (Mini Tags) */}
            <div className="flex flex-wrap gap-2 mb-2">
                {offer.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="bg-[#2e1065]/40 border border-[#a855f7]/20 px-2 py-1 rounded-md text-[10px] text-gray-300">
                        {feature}
                    </div>
                ))}
            </div>

            {/* Promo Code Box */}
            <div className="bg-[#1e1b2e] border border-[#5b21b6] rounded-lg p-3 flex items-center justify-between group/code relative shadow-inner">
               <div className="flex flex-col">
                  <span className="text-[#a855f7] text-xs font-bold uppercase tracking-wider mb-1">PROMOCODE</span>
                  <span className="text-white font-bold text-lg tracking-wide">
                    {offer.promoCode ? offer.promoCode : "Kein Code notwendig"}
                  </span>
               </div>
               {offer.promoCode && (
                   <button 
                    onClick={handleCopy}
                    className="p-2 hover:bg-white/10 rounded-md transition-colors text-white"
                    title="Code kopieren"
                   >
                       {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                   </button>
               )}
            </div>

            {/* CTA Button */}
            <div className="flex items-center justify-between gap-4 mt-1">
                 {offer.providerIcon && (
                    <div className="hidden md:flex items-center gap-1 text-[#d8b4fe] font-bold text-xs">
                        <div className="w-6 h-6 bg-[#9333ea] rounded-full flex items-center justify-center text-white text-[10px] shadow-[0_0_10px_rgba(147,51,234,0.4)]">
                            {offer.providerIcon === 'Crypto' ? '₿' : '☀'}
                        </div>
                        <span>{offer.providerIcon.toUpperCase()}</span>
                    </div>
                 )}
                 <a 
                    href={offer.ctaLink} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 gradient-btn text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all transform hover:scale-[1.02]"
                 >
                    Jetzt Spielen
                    <ArrowRight className="w-5 h-5" />
                 </a>
            </div>
        </div>
      </div>

      {/* Footer Text */}
      <div className="mt-4 pt-4 border-t border-[#9333ea]/20 flex justify-between items-center text-xs text-gray-400">
        <p>{offer.terms}</p>
      </div>
    </div>
  );
};

export default CasinoCard;