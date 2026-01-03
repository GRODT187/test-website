import React from 'react';
import { Target, Heart, Lock } from 'lucide-react';

const WhyUs: React.FC = () => {
  return (
    <section className="py-20 bg-[#0c0a12] relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[#9333ea]/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 uppercase leading-tight italic">
                        Warum nur noch <span className="text-[#9333ea] drop-shadow-[0_0_10px_rgba(147,51,234,0.5)]">Idiotenbonus?</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Schluss mit leeren Versprechungen und kleingedruckten Fallen. Wir nennen uns Idiotenbonus, weil wir es so einfach machen, dass man kein Genie sein muss, um die besten Deals zu finden. Aber lass dich vom Namen nicht täuschen – unser Service ist absolut smart.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#1a1a24] rounded-lg text-[#9333ea] border border-[#9333ea]/20 shadow-[0_0_15px_rgba(147,51,234,0.15)]">
                            <Target className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">100% Transparenz</h3>
                            <p className="text-gray-500 text-sm">
                                Wir zeigen dir sofort, was Sache ist. Umsatzbedingungen, Max-Bet und Auszahlungslimits stehen direkt auf der Karte. Kein Suchen, kein Ärger.
                            </p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#1a1a24] rounded-lg text-[#9333ea] border border-[#9333ea]/20 shadow-[0_0_15px_rgba(147,51,234,0.15)]">
                            <Heart className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Von Spielern für Spieler</h3>
                            <p className="text-gray-500 text-sm">
                                Wir zocken selbst. Wir wissen, was nervt. Deshalb listen wir nur Casinos, bei denen wir auch selbst einzahlen würden.
                            </p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#1a1a24] rounded-lg text-[#9333ea] border border-[#9333ea]/20 shadow-[0_0_15px_rgba(147,51,234,0.15)]">
                            <Lock className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Sicherheit zuerst</h3>
                            <p className="text-gray-500 text-sm">
                                Wir listen keine Anbieter mit unfairen Bedingungen, fragwürdigen Praktiken oder schlechter Auszahlungshistorie.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative hidden lg:block">
                {/* Abstract Visual Representation */}
                <div className="w-full h-[500px] bg-[#15151e] rounded-2xl border border-[#9333ea]/20 relative overflow-hidden group shadow-[0_0_30px_rgba(147,51,234,0.1)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#15151e] via-[#1a1a24] to-[#2e1065]/40" />
                    
                    {/* Floating elements animation */}
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#9333ea] rounded-full blur-[80px] opacity-30 animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[#7c3aed] rounded-full blur-[80px] opacity-30 animate-pulse delay-700" />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-8 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 max-w-xs transform rotate-3 hover:rotate-0 transition-all duration-500 shadow-2xl">
                             <div className="text-6xl mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">👑</div>
                             <h4 className="text-2xl font-bold text-white mb-2">Der König</h4>
                             <p className="text-sm text-gray-400">unter den Vergleichsseiten.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default WhyUs;