import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Elements - Purple Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7c3aed] opacity-20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#9333ea] opacity-20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="mb-6 inline-block">
            <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-[#15151e] to-[#2e1065] rounded-full border border-[#9333ea]/30 flex items-center justify-center shadow-[0_0_30px_rgba(147,51,234,0.3)] mb-4">
               {/* Placeholder for the avatar/mascot */}
               <img 
                 src="https://picsum.photos/200/200?grayscale" 
                 alt="Idiotenbonus Mascot" 
                 className="w-full h-full object-cover rounded-full opacity-80"
               />
            </div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider italic drop-shadow-[0_0_10px_rgba(147,51,234,0.5)]">Idiotenbonus</h2>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight uppercase italic">
          Die #1 für <span className="gradient-text">die besten</span><br />
          <span className="text-[#d8b4fe]">Casino Deals</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Exklusive Willkommensboni. Freispiele. Top-Casinos.<br />
          <span className="text-[#a855f7] text-sm mt-2 block font-semibold">Direkt von IDIOTENBONUS empfohlen.</span>
        </p>
      </div>
      
      {/* Decorative Casino Elements */}
      <div className="hidden lg:block absolute left-10 bottom-20 opacity-30 animate-bounce delay-700 text-[#d8b4fe]">
        <span className="text-6xl drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]">🎰</span>
      </div>
      <div className="hidden lg:block absolute right-10 top-40 opacity-30 animate-bounce text-[#9333ea]">
         <span className="text-6xl drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]">🎲</span>
      </div>
    </section>
  );
};

export default Hero;