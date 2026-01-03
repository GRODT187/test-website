
export interface CasinoStats {
  bonusType: string; // e.g., "NON-STICKY"
  bonusPercentage: string; // e.g., "200%"
  maxBonus: string | null; // Nullable
  maxBet: string | null; // Nullable
  wager: string | null; // Nullable
}

export interface CasinoOffer {
  id: string;
  name: string;
  logoUrl: string; // Placeholder URL
  rating: number; // 1-5
  isExclusive: boolean;
  stats: CasinoStats;
  features: string[];
  promoCode: string | null; // Null if "Kein Code notwendig"
  ctaLink: string;
  terms: string;
  providerIcon?: string; // Optional icon for provider like Novoline
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Trophy' | 'Zap' | 'Shield' | 'Handshake';
}

export interface EmailEntry {
  id: string;
  email: string;
  date: string;
  source: 'giveaway_page' | 'home_inline';
}

export interface HuntSlot {
  id: string;
  name: string;
  buyIn: number;
  payout: number | null;
}