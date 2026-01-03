import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CasinoCard from './components/CasinoCard';
import Features from './components/Features';
import Footer from './components/Footer';
import FilterBar from './components/FilterBar';
import WhyUs from './components/WhyUs';
import GiveawayPage from './components/GiveawayPage';
import BonusHunt from './components/BonusHunt';
import AgeGate from './components/AgeGate';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { Mail, Bell, CheckCircle } from 'lucide-react';
import { DataProvider, useData } from './context/DataContext';

const MainApp: React.FC = () => {
  // Navigation State including Admin
  const [currentPage, setCurrentPage] = useState<'home' | 'giveaway' | 'hunt' | 'admin'>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Consume Data Context
  const { casinos, addEmail } = useData();

  // Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [bonusType, setBonusType] = useState('ALL');
  const [minBonus, setMinBonus] = useState('0');
  const [maxWager, setMaxWager] = useState('100'); 

  // Giveaway Inline State
  const [showGiveawayInput, setShowGiveawayInput] = useState(false);
  const [giveawayEmail, setGiveawayEmail] = useState('');
  const [giveawaySubmitted, setGiveawaySubmitted] = useState(false);

  // Filter Logic
  const filteredOffers = useMemo(() => {
    return casinos.filter((offer) => {
      const matchesSearch = offer.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = bonusType === 'ALL' || offer.stats.bonusType === bonusType;
      
      // Handle nullable maxBonus safely
      const rawBonus = offer.stats.maxBonus;
      // If maxBonus is null but it's a VIP/Rakeback offer, treat as high value to pass filters
      const offerBonusVal = rawBonus 
        ? (parseInt(rawBonus.replace(/[^0-9]/g, '')) || 0) 
        : (offer.stats.bonusType === 'RAKEBACK' ? 999999 : 0);
      
      const matchesMinBonus = offerBonusVal >= parseInt(minBonus);

      // Handle nullable wager safely
      const rawWager = offer.stats.wager;
      // If wager is null (e.g. no wager), treat as 0 which is better than any max wager limit
      const offerWagerVal = rawWager 
        ? (parseInt(rawWager.replace(/[^0-9]/g, '')) || 0) 
        : 0;
      
      const matchesMaxWager = offerWagerVal <= parseInt(maxWager);

      return matchesSearch && matchesType && matchesMinBonus && matchesMaxWager;
    });
  }, [casinos, searchTerm, bonusType, minBonus, maxWager]);

  const handleGiveawaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (giveawayEmail) {
      addEmail(giveawayEmail, 'home_inline');
      setGiveawaySubmitted(true);
      setGiveawayEmail('');
    }
  };

  // ADMIN ROUTING
  if (currentPage === 'admin') {
    if (!isAdminLoggedIn) {
      return <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />;
    }
    return <AdminDashboard onLogout={() => { setIsAdminLoggedIn(false); setCurrentPage('home'); }} />;
  }

  // BONUS HUNT ROUTING
  if (currentPage === 'hunt') {
      return <BonusHunt onBack={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-[#9333ea] selection:text-white flex flex-col">
      <AgeGate />
      <Header onNavigate={(page) => setCurrentPage(page)} currentPage={currentPage as 'home' | 'giveaway'} />
      
      <main className="flex-grow">
        {currentPage === 'home' ? (
          <>
            <Hero />
            
            <section id="deals" className="container mx-auto px-4 -mt-10 relative z-20 pb-20">
              <div className="max-w-5xl mx-auto">
                 
                 {/* Filter Bar Component */}
                 <FilterBar 
                   searchTerm={searchTerm} 
                   setSearchTerm={setSearchTerm}
                   bonusType={bonusType}
                   setBonusType={setBonusType}
                   minBonus={minBonus}
                   setMinBonus={setMinBonus}
                   maxWager={maxWager}
                   setMaxWager={setMaxWager}
                 />

                 {/* Results Count */}
                 <div className="mb-4 text-gray-400 text-sm">
                    {filteredOffers.length} {filteredOffers.length === 1 ? 'Angebot' : 'Angebote'} gefunden
                 </div>

                 {/* Casino Cards List */}
                 {filteredOffers.length > 0 ? (
                   filteredOffers.map((offer) => (
                     <CasinoCard key={offer.id} offer={offer} />
                   ))
                 ) : (
                   <div className="text-center py-12 bg-[#15151e]/80 rounded-2xl border border-[#9333ea]/20 backdrop-blur-sm">
                     <p className="text-gray-400">Keine Casinos gefunden, die diesen Kriterien entsprechen.</p>
                     <button 
                       onClick={() => {
                         setSearchTerm('');
                         setBonusType('ALL');
                         setMinBonus('0');
                         setMaxWager('100');
                       }}
                       className="mt-4 text-[#d8b4fe] hover:underline"
                     >
                       Filter zurücksetzen
                     </button>
                   </div>
                 )}

              </div>
            </section>

            <Features />
            <WhyUs />
            
            {/* Call to Action for Giveaway */}
            <section className="py-20 bg-[#0d0a14] relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#9333ea]/10 to-transparent pointer-events-none" />
                 <div className="container mx-auto px-4 text-center relative z-10">
                     <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 italic uppercase">
                        Ständig neue <span className="gradient-text">Aktionen & Giveaways</span>
                     </h2>
                     <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                        Bei uns gibt es immer wieder frische Gewinnspiele, Cash-Drops und exklusive Events. Verpasse keine Chance auf fette Preise mehr!
                     </p>
                     
                     {!showGiveawayInput && !giveawaySubmitted && (
                         <button 
                            onClick={() => setShowGiveawayInput(true)}
                            className="px-8 py-4 bg-[#9333ea] hover:bg-[#7e22ce] text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)]"
                         >
                            Auf dem Laufenden bleiben
                         </button>
                     )}

                     {showGiveawayInput && !giveawaySubmitted && (
                        <form onSubmit={handleGiveawaySubmit} className="max-w-md mx-auto animate-in fade-in zoom-in duration-300">
                            <div className="flex flex-col gap-4">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        placeholder="Deine E-Mail Adresse"
                                        className="block w-full pl-10 pr-3 py-4 bg-[#0a0a0f] border border-[#9333ea]/30 rounded-xl focus:ring-2 focus:ring-[#9333ea] focus:border-[#9333ea] text-white placeholder-gray-500 transition-all outline-none"
                                        value={giveawayEmail}
                                        onChange={(e) => setGiveawayEmail(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    className="gradient-btn text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all transform hover:scale-[1.02] text-lg uppercase tracking-wider"
                                >
                                    <Bell className="w-5 h-5" />
                                    Jetzt eintragen
                                </button>
                            </div>
                        </form>
                     )}

                     {giveawaySubmitted && (
                        <div className="bg-[#9333ea]/10 border border-[#9333ea]/40 rounded-xl p-6 max-w-md mx-auto animate-in fade-in zoom-in duration-300">
                            <div className="flex items-center justify-center gap-2 text-[#d8b4fe] font-bold text-xl mb-2">
                                <CheckCircle className="w-6 h-6" />
                                Eingetragen!
                            </div>
                            <p className="text-gray-300">
                                Du bist dabei. Wir melden uns, sobald es losgeht.
                            </p>
                        </div>
                     )}
                 </div>
            </section>
          </>
        ) : (
          <GiveawayPage />
        )}
      </main>

      <Footer onAdminClick={() => setCurrentPage('admin')} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
};

export default App;