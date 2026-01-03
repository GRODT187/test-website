import { CasinoOffer, FeatureItem } from './types';

export const CASINO_OFFERS: CasinoOffer[] = [
  {
    id: 'pistolo',
    name: 'Pistolo',
    logoUrl: 'Pistolo.png',
    rating: 5,
    isExclusive: true,
    stats: {
      bonusType: 'STICKY',
      bonusPercentage: '100%',
      maxBonus: '500€',
      maxBet: '5€',
      wager: '35x'
    },
    features: ['+ 200 Freegames', 'Hohe RTP Slots', 'Schnelle Verifizierung'],
    promoCode: null,
    ctaLink: 'https://tinyurl.com/PistoloMerkur',
    terms: '18+ | AGB gelten',
    providerIcon: 'Merkur'
  },
  {
    id: 'rtbet',
    name: 'RTBET',
    logoUrl: 'RTBET.png',
    rating: 5,
    isExclusive: true,
    stats: {
      bonusType: 'STICKY',
      bonusPercentage: '100%',
      maxBonus: '500€',
      maxBet: '5€',
      wager: '35x'
    },
    features: ['+ 200 Freegames', 'Großes Sportwetten Angebot', 'Gamification Features'],
    promoCode: null,
    ctaLink: 'https://tinyurl.com/RTBetMerkur',
    terms: '18+ | AGB gelten',
    providerIcon: 'Merkur'
  },
  {
    id: 'neon54',
    name: 'Neon54',
    logoUrl: 'Neon54.png',
    rating: 4,
    isExclusive: true,
    stats: {
      bonusType: 'STICKY',
      bonusPercentage: '100%',
      maxBonus: '500€',
      maxBet: '5€',
      wager: '35x'
    },
    features: ['+ 200 Freegames', '5 verschiedene Willkommensboni', 'Coole Avatare'],
    promoCode: null,
    ctaLink: 'https://tinyurl.com/Neon54Merkur',
    terms: '18+ | AGB gelten',
    providerIcon: 'Merkur'
  },
  {
    id: 'myempire',
    name: 'MyEmpire',
    logoUrl: 'MyEmpire.png',
    rating: 4,
    isExclusive: true,
    stats: {
      bonusType: 'STICKY',
      bonusPercentage: '100%',
      maxBonus: '500€',
      maxBet: '5€',
      wager: '35x'
    },
    features: ['+ 200 Freegames', 'Baue dein eigenes Imperium', 'Tägliche Belohnungen'],
    promoCode: null,
    ctaLink: 'https://tinyurl.com/MyEmpireMerkur',
    terms: '18+ | AGB gelten',
    providerIcon: 'Merkur'
  },
  {
    id: 'legiano',
    name: 'Legiano',
    logoUrl: 'Legiano.png',
    rating: 5,
    isExclusive: true,
    stats: {
      bonusType: 'STICKY',
      bonusPercentage: '350%',
      maxBonus: '500€',
      maxBet: '5€',
      wager: '40x'
    },
    features: ['+ 200 Freegames', 'Extrem hoher Prozent-Bonus', 'Römische Thematik'],
    promoCode: null,
    ctaLink: 'https://tinyurl.com/LegianoMerkur',
    terms: '18+ | AGB gelten',
    providerIcon: 'Merkur'
  },
  {
    id: 'allyspin',
    name: 'AllySpin',
    logoUrl: 'AllySpin.png',
    rating: 5,
    isExclusive: true,
    stats: {
      bonusType: 'STICKY',
      bonusPercentage: '250%',
      maxBonus: '1.000€',
      maxBet: '5€',
      wager: '35x'
    },
    features: ['+ 200 Freegames', 'Highroller Willkommenspaket', 'VIP Programm'],
    promoCode: null,
    ctaLink: 'https://tinyurl.com/AllyspinMerkur',
    terms: '18+ | AGB gelten',
    providerIcon: 'Merkur'
  },
  {
    id: 'sgcasino',
    name: 'SGCasino',
    logoUrl: 'SGCasino.png',
    rating: 4,
    isExclusive: true,
    stats: {
      bonusType: 'STICKY',
      bonusPercentage: '100%',
      maxBonus: '500€',
      maxBet: '5€',
      wager: '35x'
    },
    features: ['+ 200 Freegames', 'Wöchentliche Challenges', 'Shop System'],
    promoCode: null,
    ctaLink: 'https://tinyurl.com/SGCasinoMerkur',
    terms: '18+ | AGB gelten',
    providerIcon: 'Merkur'
  },
  {
    id: 'slotspalace',
    name: 'SlotsPalace',
    logoUrl: 'SlotsPalace.png',
    rating: 4,
    isExclusive: true,
    stats: {
      bonusType: 'STICKY',
      bonusPercentage: '100%',
      maxBonus: '1.000€',
      maxBet: '5€',
      wager: '35x'
    },
    features: ['Riesiges Willkommenspaket', 'Kunst-Kollektion Feature', 'Turniere'],
    promoCode: null,
    ctaLink: 'https://tinyurl.com/SlotspalaceMerkur',
    terms: '18+ | AGB gelten',
    providerIcon: 'Merkur'
  },
  {
    id: 'spinbara',
    name: 'Spinbara',
    logoUrl: 'Spinbara.png',
    rating: 5,
    isExclusive: true,
    stats: {
      bonusType: 'NON-STICKY',
      bonusPercentage: '200%',
      maxBonus: '3.000$',
      maxBet: '5€',
      wager: '35x'
    },
    features: ['Krypto freundlich', 'Sehr hohe Limits', 'VPN erlaubt'],
    promoCode: null,
    ctaLink: 'https://tinyurl.com/SpinbaraMerkur',
    terms: '18+ | AGB gelten',
    providerIcon: 'Merkur'
  },
  {
    id: 'razed',
    name: 'Razed',
    logoUrl: 'Razed.png',
    rating: 5,
    isExclusive: true,
    stats: {
      bonusType: 'RAKEBACK',
      bonusPercentage: 'VIP',
      maxBonus: null,
      maxBet: null,
      wager: null
    },
    features: ['Instant-VIP Status', 'Weeklies & Monthlies', '250k Christmas Race'],
    promoCode: 'idioten',
    ctaLink: 'https://www.razed.com/signup/?raf=Idioten',
    terms: '18+ | AGB gelten',
    providerIcon: 'Crypto'
  }
];

export const FEATURES: FeatureItem[] = [
  {
    id: 'f1',
    title: 'Exklusive Bonusangebote',
    description: 'Erhalte Zugang zu speziellen Bonuscodes, höheren Limits und Promotions, die du sonst nirgends findest.',
    iconName: 'Trophy'
  },
  {
    id: 'f2',
    title: 'Schnellere Auszahlungen',
    description: 'Bei ausgewählten Partnern profitierst du von priorisierten Auszahlungen – weniger warten, schneller weiterspielen.',
    iconName: 'Zap'
  },
  {
    id: 'f3',
    title: 'Geprüfte & sichere Anbieter',
    description: 'Alle Casinos werden sorgfältig geprüft: zuverlässige Auszahlungen, faire Bedingungen, sichere Transaktionen.',
    iconName: 'Shield'
  },
  {
    id: 'f4',
    title: 'Direkte Partnerschaften',
    description: 'Durch enge Kooperationen mit Top-Casinos sichern wir dir Vorteile, die nur über Idiotenbonus verfügbar sind.',
    iconName: 'Handshake'
  }
];