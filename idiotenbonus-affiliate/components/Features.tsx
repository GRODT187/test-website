import React from 'react';
import { FEATURES } from '../constants';
import { Trophy, Zap, Shield, Handshake } from 'lucide-react';

const iconMap = {
  Trophy: Trophy,
  Zap: Zap,
  Shield: Shield,
  Handshake: Handshake
};

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0a0f] to-[#130b1c] relative">
      <div className="container mx-auto px-4">
        <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 italic">
                Deine <span className="text-[#9333ea] drop-shadow-[0_0_10px_rgba(147,51,234,0.4)]">Vorteile</span>
            </h2>
            <p className="text-gray-400">
                Du hast entscheidende Vorteile, wenn du über meine Casino-Links spielst.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature) => {
            const Icon = iconMap[feature.iconName];
            return (
              <div key={feature.id} className="bg-[#1a1a24]/80 rounded-xl p-6 border border-[#9333ea]/10 hover:border-[#9333ea]/40 transition-all group hover:shadow-[0_0_20px_rgba(147,51,234,0.15)]">
                <div className="w-12 h-12 bg-gradient-to-br from-[#9333ea]/20 to-[#7c3aed]/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-[#9333ea]/20">
                  <Icon className="w-6 h-6 text-[#d8b4fe]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;