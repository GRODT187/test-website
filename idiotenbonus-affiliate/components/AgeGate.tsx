import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, ExternalLink } from 'lucide-react';

const AgeGate: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  const handleOver18 = () => {
    setIsVisible(false);
  };

  const handleUnder18 = () => {
    setAccessDenied(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#050508] bg-opacity-95 backdrop-blur-2xl flex items-center justify-center p-4">
      <div className="max-w-md w-full relative">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#9333ea] opacity-20 blur-[100px] rounded-full pointer-events-none" />

        <div className="glass-panel rounded-3xl p-8 border border-[#9333ea]/30 shadow-[0_0_50px_rgba(147,51,234,0.2)] relative z-10 text-center">
          
          {!accessDenied ? (
            <>
              <div className="w-20 h-20 mx-auto bg-[#1a1a24] rounded-full flex items-center justify-center mb-6 border border-[#9333ea]/50 shadow-[0_0_20px_rgba(147,51,234,0.4)]">
                <span className="text-2xl font-black text-white border-2 border-red-500 rounded-full w-12 h-12 flex items-center justify-center">18+</span>
              </div>

              <h2 className="text-3xl font-extrabold text-white mb-4 uppercase italic">
                Alters<span className="gradient-text">prüfung</span>
              </h2>

              <p className="text-gray-300 mb-8 leading-relaxed">
                Diese Website enthält Inhalte über Glücksspiel, die nur für Personen ab 18 Jahren bestimmt sind. Bitte bestätige dein Alter, um fortzufahren.
              </p>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={handleOver18}
                  className="w-full gradient-btn text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all transform hover:scale-[1.02] uppercase tracking-wider shadow-lg"
                >
                  Ich bin über 18
                </button>
                <button 
                  onClick={handleUnder18}
                  className="w-full bg-[#1a1a24] hover:bg-[#2a2a35] text-gray-400 font-semibold py-4 px-6 rounded-xl border border-white/5 transition-colors"
                >
                  Ich bin unter 18
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-xs text-gray-500">
                  Glücksspiel kann süchtig machen. Spiele verantwortungsbewusst.
                </p>
              </div>
            </>
          ) : (
            <div className="animate-in fade-in zoom-in duration-300">
               <div className="w-20 h-20 mx-auto bg-red-900/20 rounded-full flex items-center justify-center mb-6 border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                <ShieldAlert className="w-10 h-10 text-red-500" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4">Zugriff verweigert</h2>
              <p className="text-gray-400 mb-8">
                Der Zutritt zu dieser Seite ist Minderjährigen gesetzlich untersagt.
              </p>

              <a 
                href="https://www.google.com"
                className="w-full bg-white text-black font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
              >
                Seite verlassen <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AgeGate;