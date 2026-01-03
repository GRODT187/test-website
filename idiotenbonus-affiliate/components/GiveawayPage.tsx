import React, { useState } from 'react';
import { Mail, Bell, Gift, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const GiveawayPage: React.FC = () => {
  const { addEmail } = useData();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      addEmail(email, 'giveaway_page');
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="pt-32 pb-20 min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7c3aed] opacity-20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9333ea] opacity-20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        
        <div className="max-w-2xl mx-auto glass-panel p-8 md:p-12 rounded-3xl border border-[#9333ea]/30 shadow-[0_0_50px_rgba(147,51,234,0.15)]">
          
          <div className="w-20 h-20 mx-auto bg-[#1a1a24] rounded-full flex items-center justify-center mb-6 border border-[#9333ea]/50 shadow-[0_0_20px_rgba(147,51,234,0.4)]">
            <Gift className="w-10 h-10 text-[#d8b4fe]" />
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 uppercase italic">
            Momentan <span className="text-gray-500">kein</span> <span className="gradient-text">Gewinnspiel</span>
          </h1>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Aktuell läuft kein aktives Gewinnspiel. Aber keine Sorge! Wir bereiten bereits die nächsten <strong>fetten Aktionen</strong> vor. 
            <br /><br />
            Möchtest du der Erste sein, der davon erfährt? Trage dich ein und verpasse keine Chance auf Cash-Preise und Technik-Gewinne.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Deine E-Mail Adresse"
                  className="block w-full pl-10 pr-3 py-4 bg-[#0a0a0f] border border-[#9333ea]/30 rounded-xl focus:ring-2 focus:ring-[#9333ea] focus:border-[#9333ea] text-white placeholder-gray-500 transition-all outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <button 
                type="submit"
                className="gradient-btn text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all transform hover:scale-[1.02] text-lg uppercase tracking-wider"
              >
                <Bell className="w-5 h-5" />
                Benachrichtigen lassen
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Kein Spam. Nur Infos zu neuen Aktionen. Jederzeit abbestellbar.
              </p>
            </form>
          ) : (
            <div className="bg-[#9333ea]/10 border border-[#9333ea]/40 rounded-xl p-6 animate-fade-in">
              <div className="flex items-center justify-center gap-2 text-[#d8b4fe] font-bold text-xl mb-2">
                <CheckCircle className="w-6 h-6" />
                Alles klar!
              </div>
              <p className="text-gray-300">
                Du stehst auf der Liste. Sobald das nächste Gewinnspiel startet, bekommst du Bescheid.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-4 text-sm text-gray-500 hover:text-white underline"
              >
                Andere E-Mail eintragen
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default GiveawayPage;