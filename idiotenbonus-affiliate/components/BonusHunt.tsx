import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Monitor, Dices, PlusCircle, Search, Save, Settings, RotateCcw, Image as ImageIcon, Gift, BarChart2, Shuffle, ChevronDown, ChevronUp, ArrowLeft, Database, Trophy, Trash2, Wallet, Coins, TrendingUp, TrendingDown, Percent, Flame, X, RefreshCw, Play, Tag, Radio } from 'lucide-react';
import { HuntSlot } from '../types';
import { useData } from '../context/DataContext';

interface BonusHuntProps {
    onBack: () => void;
}

const rawSlotList = "2 wild 2 die, 3 buzzing wilds, 5 lions gold, 5 lions megaways, 5 lions megaways 2, Anaconda gold, Angel vs sinner, Army od ares, Aztec gems deluxe, Banana farm, Barrel bonanza, Beam boys, Bee kepper, Big bass amazonas extreme, Big bass bonanza, Big bass bonanza 3 reeler, Big bass bonanza 1000, Big bass bonanza megaways, Big bass bonanza reel action, Big bass boxing bonus round, Big bass christmas bash, Big bass christmas frozen lake, Big bass day at the races, Big bass dice, Big bass float my boat, Big bass halloween, Big bass halloween 2, Big bass halloween 3, Big bass hold & spinner megaways, Big bass hold and spinner, Big bass keeping it reel, Big bass mission fishin, Big bass reel repeat, Big bass return tot he races, Big bass rock and roll, Big bass secrets oft he golden lake, Big bass spash, Big bass splash 1000, Big bass vegas double down deluxe, Big bass xmas extreme, Big juan, Bigger barn house bonanza, Bigger bass blizzard christmas catch, Bigger bass bonanza, Bigger bass splash, Bizzare, Blood & shadow, Blood and shadow 2, Bloody dawn, Book of dead, Book of ra, Book of ra deluxe, Book of ra deluxe 6, Book of ra magic, Book of shadows, Book oft he fallen, Book of time, Book of tut megaways, Booze bash, Bounty oft he seas 2, Break out, Brute force, Brute force alien onslaught, Buffalo king megaways, Candy blitz, Candy blitz bombs, Cash crew, Chaos crew, Chaos crew 2, Chaos crew 3, Chicken drop, Chicken man, Chocolate rocket, Christmas big bass bonanza, Cleocatra, Club tropicana, Club tropicana happy hour, Crazy ex-girlfriend, Crystal robot, Cursed seas, D day, Danny dollar, Das xboot 2wei!, Das xboot, Dead dead or deader, Dead nen walking, Deadwood, Deadwood rip, Densho, Disorder, Donny & danny, Donny dough, Dork unit, Drop´em, Duck hunters, Duel at dawn, Evil eyes, Eye oft he panda, Fighter pit, Fire in the hole 2, Fire in the hole 3, Fire portals, Fist of distruction, Flight mode, Fortune of giza, Frkkn bananas, Fruit party, Fruit party 2, Gates of hades, Gates of olympus, Gates of olympus 1000, Gates of olympus super scatter, Gates of olympus xmas 1000, Gator hunters, Gems bonanza, Gold party, Gold party 2, Gold portals, Gronks gems, Hand of anubis, Highway to hell, Itero, Jaws of justoce, jingle balls, john hunter and the aztex treasures, john hunter and the book of tut, john hunter and the book of tut respin, john hunter and the mayan gods, john hunter and the quest for bermuda riches, john hunter and the tomb of the scarab queen, joker bombs, jokers jewels, juicy fruits, juicy fruits multihold, keepem, kenneth must die, king carrot, land of the free, le bandit, le cowboy, le king, le pharaoh, le santa, le viking, le zeus, legacy of dead, life and death, lord of the ocean, lucky ladys charm deluxe, madame destiny, madame destiny megaways, magic piggy, marlin masters, mental, mental 2, miami mayhem, monster superlanche, muertos multiplier megaways, nine to five, octo attack, old gun, ousourced payday, outsourced, pirate bonanza 2, pirates pub, pompeii megareels megaways, pray for three, pug life, punk rocker 2, pyrofox, rad maxx, rip city, road rage, roman legion, rotten, san quentin, san quentin 2 death row, seamen, sixsixsix, sizzling hot deluxe, skate or die, sky bounty, slayers inc, snow slingers, spear of athena, spinman, stackem, starlight princess, starlight princess 1000, starlight princess super scatter, steamrunners, stickem, stockholm syndrome, stormforged, sugar rush, sugar rush 1000, Sugar rush xmas, sugar supreme powernudge, sweet bonanza, sweet bonanza 1000, sweet bonanza super scatter, sweet bonanza xmas, sweet craze, sweet rush bonanza, tanked, the count, the crypt, the dog house, the dog house megaways, the dog house multihold, the wild gang, tombstone rip, tombstone slaughter el gordos revenge, toshi ways club, twisted lab, ultimate slot of america, vampy party, vennding machine, wanted dead or a wild, wild west duels, wild west gold, wisdom of athena, wisdom of athena 1000, wisdom of athena 1000 xmas, xmas drop, xway hoarder xsplit, xways hoarder 2, ze zeus, zeus vs hades";

const STATIC_SLOTS = rawSlotList.split(',').map(s => s.trim()).filter(s => s.length > 0);

// Mapping for uploaded images - Ensure these keys are lowercase for matching
const SLOT_IMAGE_MAP: Record<string, string> = {
    "gold party 2 after hours": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/9eb3ce04439c323089ef062723c347f3.png",
    "gold portals": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/40d4f24ef7e67f0fec2672439169fa62.png",
    "gronks gems": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/63243f779774643f076cc42f89647226.png",
    "hand of anubis": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/007324cf962d39999036923063f274cb.png",
    "highway to hell": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/46d6f22fae090f7799d0e2e260907f32.png",
    "itero": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/479fdf8464673004390f7690f3c02af2.png",
    "jaws of justice": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/b09e44d32e9460064f279c09c3792c30.png",
    "jingle balls": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/93933e36e676af43f324c472202613ed.png",
    "john hunter and the aztec treasures": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/399042dd226d97e29633e2dd6d441113.png",
    "john hunter and the book of tut": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/fc2462db94e22709e992769d67e7c992.png",
    "john hunter and the book of tut respin": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/d97607730e2f93740e6c732973f7c469.png",
    "john hunter and the mayan gods": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/6949392e2eb972ce2942704332219760.png",
    "john hunter and the quest for bermuda riches": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/9eb83e60dd667f70634621c97f474026.png",
    "john hunter and the tomb of the scarab queen": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/3494e0192ec33246ebec22dc9ac29f04.png",
    "joker bombs": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/d0124317d747cae4db2e666992769947.png",
    "jokers jewels": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/796677f3747beeb993be9f24ce714c46.png",
    "juicy fruits": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/f4f469903aa4e67f0f49622c4f4219fe.png",
    "juicy fruits multihold": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/d622f967f44612392437e2217c093466.png",
    "keepem": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/236d9342796e6223297746430332309e.png",
    "kenneth must die": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/69e32f727c9392e27e997f37f377c0fe.png",
    "king carrot": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/9333334d707f4640d626242337772630.png",
    "land of the free": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/64479e0f666f494f6f407769622f3069.png",
    "le bandit": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/3067746690467776f3f00994f7267f37.png",
    "le cowboy": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/332f7402636900407769229e64434240.png",
    "le king": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/3043224976722f462377397737222f2f.png",
    "le pharaoh": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/2496f7227f7f32997f90379022634327.png",
    "le santa": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/0079633630632362f62f3f9f30327f30.png",
    "le viking": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/23247070776f00706f32630623630326.png",
    "le zeus": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/6f022426306443794f77626920942007.png",
    "legacy of dead": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/32049e779f3237309999337039023023.png",
    "life and death": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/339f40079737966966606f7096647963.png",
    "lord of the ocean": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/29964673323067794300624020964722.png",
    "lucky ladys charm deluxe": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/02700329007f30992330694073307767.png",
    "madame destiny": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/06969399222629699632367766324209.png",
    "madame destiny megaways": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/7f393306206093202973760460339097.png",
    "magic piggy": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/307f9030230739943720760432362330.png",
    "marlin masters": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/40306306634369796030922960662240.png",
    "mental": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/69662369677329424933923362243292.png",
    "mental 2": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/30206263300302967666299307736367.png",
    "miami mayhem": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/06774640066793649930064230239634.png",
    "monster superlanche": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/06764026369066606000299993322022.png",
    "muertos multiplier megaways": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/32007797772390972620762920267232.png",
    "nine to five": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/60206927236940026966030063996229.png",
    "octo attack": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/36972034937222306969222472629672.png",
    "old gun": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/64467026743329972300062022097729.png",
    "outsourced payday": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/00720446960249229062366627030999.png",
    "outsourced": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/47306003260907293730030043232332.png",
    "pirate bonanza 2": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/73996366032230976377622947234690.png",
    "pirates pub": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/09776963242037796933390022204900.png",
    "pompeii megareels megaways": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/07096677943026364024227092309492.png",
    "pray for three": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/23030364964646707379669632367772.png",
    "pug life": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/07973792070349420000000300977693.png",
    "punk rocker 2": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/90793737299066606003223096232777.png",
    "pyrofox": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/29969632362093202970760432362090.png",
    "rad maxx": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/30424072399222394339967732977797.png",
    "rip city": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/72224732679237207044026392094246.png",
    "road rage": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/47346764267664672322329243764420.png",
    "roman legion": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/69499732332997230006202209772922.png",
    "rotten": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/90793393930462002932377302223393.png",
    "san quentin": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/32049e779f3237309999337039023023.png",
    "san quentin 2 death row": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/73996366032230976377622947234690.png",
    "seamen": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/96324203779693339002220490000720.png",
    "sixsixsix": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/46960249229062366627030999073060.png",
    "sizzling hot deluxe": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/03260907293730030043232332739963.png",
    "skate or die": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/66032230976377622947234690097769.png",
    "sky bounty": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/63242037796933390022204900070966.png",
    "slayers inc": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/77943026364024227092309492230303.png",
    "snow slingers": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/64964646707379669632367772079737.png",
    "spear of athena": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/92070349420000000300977693907937.png",
    "spinman": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/37299066606003223096232777299696.png",
    "stackem": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/32362093202970760432362090304240.png",
    "stockholm syndrome": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/72399222394339967732977797722247.png",
    "stormforged": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/32679237207044026392094246473467.png",
    "sugar rush": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/64267664672322329243764420694997.png",
    "sugar rush 1000": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/32332997230006202209772922907933.png",
    "sugar rush xmas": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/9393046200293237730222339332049e.png",
    "sugar supreme powernudge": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/779f3237309999337039023023739963.png",
    "sweet bonanza": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/66032230976377622947234690963242.png",
    "sweet bonanza 1000": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/03779693339002220490000720469602.png",
    "sweet bonanza super scatter": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/49229062366627030999073060032609.png",
    "sweet bonanza xmas": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/07293730030043232332739963660322.png",
    "sweet craze": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/30976377622947234690097769632420.png",
    "sweet rush bonanza": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/37796933390022204900070966779430.png",
    "tanked": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/26364024227092309492230303649646.png",
    "the count": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/46707379669632367772079737920703.png",
    "the crypt": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/49420000000300977693907937372990.png",
    "the dog house": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/66606003223096232777299696323620.png",
    "the dog house megaways": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/93202970760432362090304240723992.png",
    "the dog house multihold": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/22394339967732977797722247326792.png",
    "the wild gang": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/37207044026392094246473467642676.png",
    "tombstone rip": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/64672322329243764420694997323329.png",
    "tombstone slaughter el gordos revenge": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/97230006202209772922907933939304.png",
    "toshi ways club": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/6200293237730222339332049e779f32.png",
    "twisted lab": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/37309999337039023023739963660322.png",
    "ultimate slot of america": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/30976377622947234690963242037796.png",
    "vampy party": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/93339002220490000720469602492290.png",
    "vending machine": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/62366627030999073060032609072937.png",
    "wanted dead or a wild": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/30030043232332739963660322309763.png",
    "wild west duels": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/77622947234690097769632420377969.png",
    "wild west gold": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/33390022204900070966779430263640.png",
    "wisdom of athena": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/24227092309492230303649646467073.png",
    "wisdom of athena 1000": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/79669632367772079737920703494200.png",
    "wisdom of athena 1000 xmas": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/00000300977693907937372990666060.png",
    "xmas drop": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/03223096232777299696323620932029.png",
    "xways hoarder xsplit": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/70760432362090304240723992223943.png",
    "xways hoarder 2": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/39967732977797722247326792372070.png",
    "ze zeus": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/44026392094246473467642676646723.png",
    "zeus vs hades - gods of war": "https://file-service-full-2117203399.us-central1.run.app/static/1739832204/22329243764420694997323329972300.png"
};

const BonusHunt: React.FC<BonusHuntProps> = ({ onBack }) => {
    // Access global casino data to include in search
    const { casinos } = useData();

    // Local State (User Specific)
    const [activeView, setActiveView] = useState<'hunt' | 'random'>('hunt');
    
    // Slots are stored in LocalStorage, making them specific to the user's browser
    const [slots, setSlots] = useState<HuntSlot[]>(() => {
        const saved = localStorage.getItem('ib_hunt_slots');
        return saved ? JSON.parse(saved) : [];
    });
    
    const [slotAlignments, setSlotAlignments] = useState<Record<string, string>>(() => {
        const saved = localStorage.getItem('ib_slot_alignments');
        return saved ? JSON.parse(saved) : {};
    });

    const [giveawayEnabled, setGiveawayEnabled] = useState(true);
    const [jackpotPercent, setJackpotPercent] = useState(5);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
    const [selectedSlotName, setSelectedSlotName] = useState('');
    const [slotPrice, setSlotPrice] = useState<string>('');
    const [listSearch, setListSearch] = useState('');
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [backOfficeOpen, setBackOfficeOpen] = useState(false);
    
    // Randomizer State
    const [randomizerOpen, setRandomizerOpen] = useState(false);
    const [randomizerMode, setRandomizerMode] = useState<'hunt' | 'random'>('hunt');
    const [randomizerResult, setRandomizerResult] = useState<any>(null);
    const [tapeItems, setTapeItems] = useState<any[]>([]);
    const [isSpinning, setIsSpinning] = useState(false);
    const [quickPayout, setQuickPayout] = useState('');
    const [currentWinnerSlot, setCurrentWinnerSlot] = useState<any>(null);

    // Refs
    const audioCtxRef = useRef<AudioContext | null>(null);
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<any>(null);
    const tapeRef = useRef<HTMLDivElement>(null);
    const soundFrameRef = useRef<number>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Compute All Searchable Slots (Static + Admin Added)
    const searchableSlots = useMemo(() => {
        const adminNames = casinos.map(c => c.name);
        const combined = new Set([...STATIC_SLOTS, ...adminNames]);
        return Array.from(combined).sort();
    }, [casinos]);

    // Persistence
    useEffect(() => {
        localStorage.setItem('ib_hunt_slots', JSON.stringify(slots));
    }, [slots]);

    useEffect(() => {
        localStorage.setItem('ib_slot_alignments', JSON.stringify(slotAlignments));
    }, [slotAlignments]);

    // Stats Calculation
    const totalCost = slots.reduce((acc, s) => acc + s.buyIn, 0);
    const playedSlots = slots.filter(s => s.payout !== null);
    const totalPayout = playedSlots.reduce((acc, s) => acc + (s.payout || 0), 0);
    const totalPlayedCost = playedSlots.reduce((acc, s) => acc + s.buyIn, 0);
    const netResult = totalPayout - totalPlayedCost;
    const roi = totalPlayedCost > 0 ? (totalPayout / totalPlayedCost) * 100 : 0;

    // Overlay State Logic
    // If randomizer has a result, use that. Otherwise use the last slot in list.
    const activeOverlaySlot = randomizerResult && !randomizerResult.isGiveaway 
        ? randomizerResult 
        : (slots.length > 0 ? slots[slots.length - 1] : null);

    // Helper for image source
    const getSlotImageSrc = (name: string) => {
        if (!name) return '';
        const lowerName = name.toLowerCase().trim();
        // Check map first (priority for hosted images)
        if (SLOT_IMAGE_MAP[lowerName]) return SLOT_IMAGE_MAP[lowerName];
        // Fallback to local
        return `${name}.png`;
    };

    // Initialize Chart
    useEffect(() => {
        if (!chartRef.current || activeView !== 'hunt') return;
        
        // Destroy existing chart to prevent memory leaks or overlaps
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
            chartInstanceRef.current = null;
        }

        if (playedSlots.length === 0) return;

        const labels = playedSlots.map((s, i) => i + 1);
        const data = playedSlots.map(s => (s.payout || 0) - s.buyIn);
        const colors = data.map(v => v >= 0 ? '#4ade80' : '#f87171');

        const Chart = (window as any).Chart;
        if (!Chart) return;

        Chart.defaults.color = '#6b7280';
        Chart.defaults.font.family = 'Inter';

        chartInstanceRef.current = new Chart(chartRef.current, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Gewinn/Verlust',
                    data: data,
                    backgroundColor: colors,
                    borderRadius: 6,
                    borderSkipped: false,
                    barThickness: 'flex',
                    maxBarThickness: 40
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: true } },
                scales: { 
                    y: { grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false }, border: { display: false } }, 
                    x: { grid: { display: false }, border: { display: false } } 
                }
            }
        });

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, [slots, activeView, playedSlots]);

    // Audio Helpers
    const initAudio = () => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    };

    const playSound = (type: 'tick' | 'win' | 'giveaway') => {
        initAudio();
        const ctx = audioCtxRef.current;
        if (!ctx) return;
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        const t = ctx.currentTime;

        if (type === 'tick') {
            // Updated to "Bright Plastic Click" sound
            osc.type = 'triangle'; // Smoother wave for less harshness, but snappy
            osc.frequency.setValueAtTime(1500, t); // Start high pitch
            osc.frequency.exponentialRampToValueAtTime(500, t + 0.05); // Rapid pitch down for "click" effect
            
            gainNode.gain.setValueAtTime(0.5, t);
            gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.05); // Very short decay
            
            osc.start(t);
            osc.stop(t + 0.05);
        } else if (type === 'win') {
            const playTone = (f: number, d: number, w: any) => {
                const o = ctx.createOscillator();
                const g = ctx.createGain();
                o.connect(g);
                g.connect(ctx.destination);
                o.type = w as any;
                o.frequency.value = f;
                g.gain.setValueAtTime(0.2, ctx.currentTime);
                g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d);
                o.start();
                o.stop(ctx.currentTime + d);
            };
            // Winning Major Chord
            playTone(523.25, 0.6, 'triangle'); // C5
            setTimeout(() => playTone(659.25, 0.6, 'triangle'), 100); // E5
            setTimeout(() => playTone(783.99, 0.8, 'triangle'), 200); // G5
            setTimeout(() => playTone(1046.50, 1.2, 'square'), 300); // C6 (Punchy)
        } else if (type === 'giveaway') {
             const playTone = (f: number, d: number, w: any, delay: number) => {
                 setTimeout(() => {
                    const o = ctx.createOscillator();
                    const g = ctx.createGain();
                    o.connect(g);
                    g.connect(ctx.destination);
                    o.type = w;
                    o.frequency.value = f;
                    g.gain.setValueAtTime(0.1, ctx.currentTime);
                    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d);
                    o.start();
                    o.stop(ctx.currentTime + d);
                 }, delay);
            };
            playTone(523.25, 0.2, 'sawtooth', 0);
            playTone(659.25, 0.2, 'sawtooth', 100);
            playTone(783.99, 0.2, 'sawtooth', 200);
            playTone(1046.50, 1.0, 'square', 300);
        }
    };

    // Actions
    const handleAddSlot = () => {
        if (!selectedSlotName || !slotPrice) {
            alert("Bitte Slot auswählen und Preis eingeben!");
            return;
        }
        const newSlot: HuntSlot = {
            id: Math.random().toString(36).substr(2, 9),
            name: selectedSlotName,
            buyIn: parseFloat(slotPrice),
            payout: null
        };
        setSlots(prev => [...prev, newSlot]);
        setSelectedSlotName('');
        setSlotPrice('');
        setSearchQuery('');
    };

    const handleDeleteSlot = (id: string) => {
        if(window.confirm('Slot wirklich löschen?')) {
            setSlots(prev => prev.filter(s => s.id !== id));
        }
    };

    const handleUpdatePayout = (id: string, value: string) => {
        setSlots(prev => prev.map(s => {
            if (s.id === id) {
                return { ...s, payout: value === '' ? null : parseFloat(value) };
            }
            return s;
        }));
    };

    const handleReset = () => {
        if(window.confirm('Möchtest du wirklich eine neue Hunt starten? Alle aktuellen Slots und Ergebnisse werden unwiderruflich gelöscht.')) {
            setSlots([]);
            // Alignment settings are preserved as they are preferences
        }
    };

    const handleSelectSearchSlot = (name: string) => {
        setSelectedSlotName(name);
        setSearchQuery(name);
        setSearchDropdownOpen(false);
        document.getElementById('input-price')?.focus();
    };

    const getImageStyle = (name: string) => {
        const align = slotAlignments[name] || 'center';
        return { objectFit: 'cover' as const, objectPosition: align };
    };

    // Randomizer Logic
    const openRandomizer = (mode: 'hunt' | 'random') => {
        setRandomizerMode(mode);
        if (mode === 'hunt') {
            const playable = slots.filter(s => s.payout === null);
            if(playable.length === 0) {
                alert("Keine offenen Boni mehr verfügbar!");
                return;
            }
        }
        setRandomizerOpen(true);
        setRandomizerResult(null);
        setIsSpinning(false);
        setTapeItems([]); // Reset tape
    };

    const startCaseOpening = () => {
        // Init Audio Context immediately on user interaction
        initAudio(); 
        
        setIsSpinning(true);
        setRandomizerResult(null);
        
        // 1. Determine Winner and Build Tape
        let winner: any;
        let isGiveawayWin = false;
        let pool: any[] = [];

        if (randomizerMode === 'hunt') {
            const playable = slots.filter(s => s.payout === null);
            if(playable.length === 0) return;

             if (giveawayEnabled && Math.random() < (jackpotPercent / 100)) {
                isGiveawayWin = true;
                winner = { id: 'GIVEAWAY', name: '100€ GIVEAWAY', buyIn: 0, image: null, isGiveaway: true };
            } else {
                const winnerIndex = Math.floor(Math.random() * playable.length);
                winner = playable[winnerIndex];
            }
            pool = playable;
        } else {
             const winnerName = searchableSlots[Math.floor(Math.random() * searchableSlots.length)];
             winner = { id: 'RND', name: winnerName, buyIn: 0 };
             pool = searchableSlots.map(name => ({ id: 'RND', name: name, buyIn: 0 }));
        }
        
        setCurrentWinnerSlot(winner);

        const WINNER_INDEX = 40;
        const TOTAL_CARDS = 50;
        const items = [];
        
        for (let i = 0; i < TOTAL_CARDS; i++) {
            if (i === WINNER_INDEX) {
                items.push(winner);
            } else {
                if (randomizerMode === 'hunt' && giveawayEnabled && Math.random() < (jackpotPercent / 100 * 0.5) && i !== WINNER_INDEX) {
                     items.push({ id: 'GIVEAWAY_TEASE', name: '100€ GIVEAWAY', buyIn: 0, isGiveaway: true });
                } else {
                    const rnd = Math.floor(Math.random() * pool.length);
                    items.push(pool[rnd]);
                }
            }
        }
        setTapeItems(items);

        // 2. Start Animation Loop (Use double requestAnimationFrame for reliability)
        // Nested rAF ensures the DOM has updated with new tapeItems before we try to animate
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (!tapeRef.current) return;

                // A. Reset Position Instantly (Critical for "skipping" fix)
                // We must disable transition, move to start, force reflow, then enable transition.
                tapeRef.current.style.transition = 'none';
                tapeRef.current.style.transform = 'translateX(0px)';
                
                // B. Force Reflow (Flush CSS changes - crucial step)
                void tapeRef.current.offsetHeight; 

                // C. Calculate Target
                const CARD_WIDTH = 230;
                // Add randomness so it doesn't always stop dead center.
                // +/- 70px ensures it stays within the winning card boundaries (220px width)
                const randomOffset = Math.floor(Math.random() * 140) - 70; 
                const targetX = -((WINNER_INDEX * CARD_WIDTH) + (CARD_WIDTH / 2)) + randomOffset;

                // D. Start Sound Tracking
                let lastCardIndex = 0;
                if (soundFrameRef.current) cancelAnimationFrame(soundFrameRef.current);
                
                const track = () => {
                    if (!tapeRef.current || !isSpinning) return;
                    const style = window.getComputedStyle(tapeRef.current);
                    const matrix = new DOMMatrix(style.transform);
                    const currentX = Math.abs(matrix.m41);
                    const currentCardIndex = Math.floor((currentX + 115) / 230);
                    
                    if (currentCardIndex > lastCardIndex) {
                        playSound('tick');
                        lastCardIndex = currentCardIndex;
                    }
                    (soundFrameRef.current as any) = requestAnimationFrame(track);
                };
                track();

                // E. Apply Animation
                tapeRef.current.style.transition = 'transform 6s cubic-bezier(0.1, 1, 0.1, 1)';
                tapeRef.current.style.transform = `translateX(${targetX}px)`;

                // F. Handle Completion
                const handleTransitionEnd = () => {
                    if (soundFrameRef.current) cancelAnimationFrame(soundFrameRef.current);
                    
                    // Safety check to ensure we don't handle old events
                    if (!tapeRef.current) return;
                    
                    tapeRef.current.style.transition = 'none'; // Lock final position
                    
                    setIsSpinning(false);
                    setRandomizerResult(winner);
                    
                    if (winner.isGiveaway) {
                        playSound('giveaway');
                        (window as any).confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#fbbf24', '#ffffff', '#8b5cf6'] });
                    } else {
                        playSound('win');
                    }
                };

                // Use { once: true } to auto-remove listener
                tapeRef.current.addEventListener('transitionend', handleTransitionEnd, { once: true });
            });
        });
    };

    const handleSaveRandomizer = () => {
        if (!currentWinnerSlot || randomizerMode === 'random' || currentWinnerSlot.isGiveaway) {
             setRandomizerOpen(false);
             return;
        }
        if (quickPayout) {
            handleUpdatePayout(currentWinnerSlot.id, quickPayout);
            setTimeout(() => {
                const el = document.getElementById(`row-${currentWinnerSlot.id}`);
                el?.scrollIntoView({behavior: 'smooth', block: 'center'});
            }, 300);
        }
        setRandomizerOpen(false);
        setQuickPayout('');
    };

    const handleAddResultToHunt = () => {
        if(!currentWinnerSlot) return;
        setRandomizerOpen(false);
        setActiveView('hunt');
        handleSelectSearchSlot(currentWinnerSlot.name);
        
        // Find last price
        const lastPrice = slots.length > 0 ? slots[slots.length-1].buyIn : 200;
        setSlotPrice(lastPrice.toString());
    };

    // Filter Logic
    const filteredSlots = slots.filter(s => s.name.toLowerCase().includes(listSearch.toLowerCase()));

    // Search Dropdown
    const searchMatches = searchQuery ? searchableSlots.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())) : [];

    // Drag Logic for Overlay
    const handleOverlayDragStart = (e: React.MouseEvent) => {
        e.preventDefault();
        const startX = e.clientX;
        const startY = e.clientY;
        const elem = overlayRef.current;
        if(!elem) return;
        const rect = elem.getBoundingClientRect();
        const offsetX = startX - rect.left;
        const offsetY = startY - rect.top;

        const handleMouseMove = (ev: MouseEvent) => {
            elem.style.left = `${ev.clientX - offsetX}px`;
            elem.style.top = `${ev.clientY - offsetY}px`;
        };
        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white pb-32">
             {/* Header */}
            <header className="w-full py-4 px-4 flex flex-col md:flex-row justify-between items-center border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl sticky top-0 z-40 shadow-2xl gap-4">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white group">
                        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <h1 className="font-display italic font-black text-2xl md:text-3xl tracking-tighter text-white select-none">
                        IDIOTEN<span className="text-[#9333ea] neon-text">BONUS</span> HUNT
                    </h1>
                </div>
                
                <nav className="flex gap-4 items-center">
                    <div className="flex gap-8 mr-4">
                        <button onClick={() => setActiveView('hunt')} className={`py-2 px-1 font-bold uppercase tracking-widest text-sm transition-all ${activeView === 'hunt' ? 'text-[#9333ea] border-b-2 border-[#9333ea]' : 'text-gray-400 hover:text-white'}`}>
                            Bonus Hunt
                        </button>
                        <button onClick={() => setActiveView('random')} className={`py-2 px-1 font-bold uppercase tracking-widest text-sm transition-all ${activeView === 'random' ? 'text-[#9333ea] border-b-2 border-[#9333ea]' : 'text-gray-400 hover:text-white'}`}>
                            Random Slot
                        </button>
                    </div>
                    
                    <button onClick={() => setOverlayVisible(!overlayVisible)} className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-all border border-white/10" title="Streaming Overlay">
                        <Monitor className="w-5 h-5" />
                    </button>
                </nav>
            </header>

            <main className="container mx-auto px-4 md:px-8 py-8 max-w-7xl">
                {activeView === 'hunt' ? (
                    <div id="view-hunt" className="animate-fade-in">
                        {/* Hero */}
                        <div className="text-center mb-12 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#9333ea]/20 blur-[120px] rounded-full pointer-events-none z-[-1]"></div>
                            <h2 className="text-4xl md:text-7xl font-black font-display italic mb-6 leading-tight">
                                DIE #1 FÜR <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9333ea] via-violet-400 to-indigo-400">BONUS HUNTS</span>
                            </h2>
                            <div className="flex flex-col items-center justify-center gap-4">
                                <button onClick={() => openRandomizer('hunt')} className="group relative px-8 py-4 bg-white text-black font-black italic text-xl rounded-full hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center gap-3 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-violet-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <Dices className="w-6 h-6 relative z-10" /> 
                                    <span className="relative z-10">NEXT BONUS</span>
                                </button>
                                <div className="text-xs text-gray-400 flex items-center gap-2 mt-2 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                    <Database className="w-3 h-3" />
                                    Daten werden lokal in deinem Browser gespeichert
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
                             <div className="glass-panel border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:bg-white/5 transition-all">
                                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity text-white"><Wallet className="w-12 h-12" /></div>
                                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-1">Start Balance</p>
                                <h3 className="text-2xl font-black text-white">{totalCost.toLocaleString('de-DE', {style:'currency', currency:'EUR'})}</h3>
                            </div>
                            <div className="glass-panel border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:bg-white/5 transition-all">
                                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity text-white"><Coins className="w-12 h-12" /></div>
                                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-1">Gewinn</p>
                                <h3 className="text-2xl font-black text-white">{totalPayout.toLocaleString('de-DE', {style:'currency', currency:'EUR'})}</h3>
                                <div className="text-xs text-gray-400 mt-2 font-mono opacity-60">{playedSlots.length} / {slots.length} gespielt</div>
                            </div>
                             <div className={`glass-panel p-6 rounded-2xl relative overflow-hidden group hover:bg-white/5 transition-all ${netResult >= 0 ? 'border-green-500/20' : 'border-red-500/20'}`}>
                                <div className={`absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity ${netResult >= 0 ? 'text-green-500' : 'text-red-500'}`}>{netResult >= 0 ? <TrendingUp className="w-12 h-12" /> : <TrendingDown className="w-12 h-12" />}</div>
                                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-1">Ergebnis</p>
                                <h3 className={`text-2xl font-black ${netResult >= 0 ? 'text-green-400' : 'text-red-400'}`}>{(netResult >= 0 ? '+' : '') + netResult.toLocaleString('de-DE', {style:'currency', currency:'EUR'})}</h3>
                            </div>
                            <div className="glass-panel border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:bg-white/5 transition-all">
                                <div className={`absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity ${roi >= 100 ? 'text-green-400' : 'text-[#9333ea]'}`}><Percent className="w-12 h-12" /></div>
                                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-1">RTP</p>
                                <h3 className="text-2xl font-black text-white">{roi.toFixed(2)}%</h3>
                            </div>
                             <div className="glass-panel border-yellow-500/20 p-6 rounded-2xl relative overflow-hidden group hover:bg-white/5 transition-all">
                                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity text-yellow-500"><Flame className="w-12 h-12" /></div>
                                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-1">Streak</p>
                                <h3 className="text-2xl font-black text-yellow-400">{(()=>{
                                    let streak = 0;
                                    for(let i=playedSlots.length-1; i>=0; i--) {
                                        if((playedSlots[i].payout || 0) >= playedSlots[i].buyIn) streak++; else break;
                                    }
                                    return streak;
                                })()}</h3>
                                <div className="text-xs text-gray-400 mt-2 font-mono opacity-60">Siege in Folge</div>
                            </div>
                        </div>

                         {/* Add Slot Form */}
                         <div className="glass-panel p-8 rounded-3xl shadow-2xl mb-12 relative transition-all duration-300 z-20">
                             <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#9333ea]/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            </div>
                             <h3 className="text-xl font-bold font-display italic flex items-center gap-2 mb-6 relative z-10">
                                <PlusCircle className="text-[#9333ea]" /> SLOT HINZUFÜGEN
                            </h3>
                             <div className="flex flex-col lg:flex-row gap-6 items-end relative z-10">
                                 <div className="flex-1 w-full relative group z-50">
                                     <label className="block text-xs font-bold uppercase text-gray-400 mb-2 ml-1">Slot Suchen</label>
                                     <div className="relative">
                                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#9333ea] transition-colors" />
                                         <input 
                                            type="text" 
                                            value={searchQuery}
                                            onChange={(e) => { setSearchQuery(e.target.value); setSearchDropdownOpen(true); }}
                                            onFocus={() => setSearchDropdownOpen(true)}
                                            placeholder="Tippen zum Suchen (z.B. Bonanza)..."
                                            className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-[#9333ea] focus:border-transparent outline-none transition-all font-semibold"
                                         />
                                     </div>
                                     {searchDropdownOpen && searchMatches.length > 0 && (
                                         <div className="absolute left-0 right-0 mt-2 bg-[#1a1a24] border border-white/10 rounded-xl shadow-2xl z-[100] max-h-80 overflow-y-auto custom-scroll ring-1 ring-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
                                             {searchMatches.map(slot => (
                                                 <div key={slot} onClick={() => handleSelectSearchSlot(slot)} className="px-5 py-3 hover:bg-white/5 cursor-pointer flex items-center gap-4 transition-colors border-b border-white/5 last:border-0 bg-[#1a1a24]">
                                                      <div className="w-16 h-24 rounded-lg bg-black/40 overflow-hidden flex-shrink-0 relative shadow-lg">
                                                        <img src={getSlotImageSrc(slot)} onError={(e) => (e.currentTarget.style.display = 'none')} className="w-full h-full" style={getImageStyle(slot)} />
                                                      </div>
                                                      <span className="text-white font-bold text-lg">{slot}</span>
                                                 </div>
                                             ))}
                                         </div>
                                     )}
                                 </div>
                                 <div className="w-full lg:w-48 z-10">
                                    <label className="block text-xs font-bold uppercase text-gray-400 mb-2 ml-1">Preis (€)</label>
                                    <input 
                                        type="number" 
                                        id="input-price"
                                        value={slotPrice}
                                        onChange={(e) => setSlotPrice(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddSlot()}
                                        placeholder="200" 
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-[#9333ea] focus:border-transparent outline-none transition-all font-semibold font-mono"
                                    />
                                </div>
                                <button onClick={handleAddSlot} className="h-[58px] w-full lg:w-auto px-8 bg-[#9333ea] hover:bg-violet-600 text-white font-black italic rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all flex items-center justify-center gap-2 transform active:scale-95 z-10">
                                    <Save className="w-5 h-5" /> SPEICHERN
                                </button>
                             </div>
                         </div>

                         {/* Toolbar */}
                         <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 z-10 relative">
                            <h3 className="text-2xl font-bold font-display italic self-start md:self-auto flex items-center gap-2">
                                <span className="w-2 h-8 bg-[#9333ea] rounded-full"></span>
                                DEINE LISTE
                            </h3>
                            
                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
                                <div className="relative flex-1 sm:w-64 w-full">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input type="text" value={listSearch} onChange={(e) => setListSearch(e.target.value)} placeholder="Filter..." className="w-full bg-[#15151e] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:ring-1 focus:ring-[#9333ea] outline-none transition-all" />
                                </div>
                                
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <button onClick={() => setSettingsOpen(!settingsOpen)} className="px-3 py-2.5 rounded-lg bg-[#15151e] border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white transition-all" title="Einstellungen">
                                        <Settings className="w-4 h-4" />
                                    </button>
                                    <button onClick={handleReset} className="px-4 py-2.5 rounded-lg font-bold bg-[#15151e] border border-white/10 hover:bg-red-900/30 text-xs text-gray-400 hover:text-red-400 flex items-center justify-center gap-2 transition-all w-full sm:w-auto group" title="Daten löschen und neue Hunt beginnen">
                                        <RotateCcw className="w-3 h-3 group-hover:rotate-180 transition-transform" /> Reset Hunt Data
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Settings Panel */}
                        {settingsOpen && (
                             <div className="mb-6 glass-panel p-6 rounded-xl border-l-4 border-yellow-400 animate-fade-in-up shadow-2xl relative z-30">
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h4 className="font-bold text-white text-sm text-yellow-400 flex items-center gap-2">
                                                <Gift className="w-4 h-4" /> Giveaway Feature
                                            </h4>
                                            <p className="text-xs text-gray-400">Aktiviert die "100€ Giveaway an Zuschauer" Kachel</p>
                                        </div>
                                        <button onClick={() => setGiveawayEnabled(!giveawayEnabled)} className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${giveawayEnabled ? 'bg-yellow-400' : 'bg-gray-700'}`}>
                                            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-200 shadow-sm ${giveawayEnabled ? 'left-7' : 'left-1'}`}></div>
                                        </button>
                                    </div>
                                    <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                                        <div className="flex justify-between text-xs font-bold text-white mb-2">
                                            <span>Giveaway Chance</span>
                                            <span className="text-[#9333ea]">{jackpotPercent}%</span>
                                        </div>
                                        <input type="range" min="0" max="50" value={jackpotPercent} onChange={(e) => setJackpotPercent(parseInt(e.target.value))} className="w-full" />
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-white text-sm flex items-center gap-2">
                                            <ImageIcon className="w-4 h-4 text-gray-400" /> Bild-Manager
                                        </h4>
                                        <p className="text-xs text-gray-400">Justiere den Ausschnitt für jedes Slot-Bild</p>
                                    </div>
                                    <button onClick={() => setBackOfficeOpen(true)} className="px-4 py-2 bg-[#15151e] hover:bg-[#9333ea] border border-white/10 rounded-lg text-xs font-bold transition-all shadow-lg hover:shadow-[#9333ea]/20">
                                        ÖFFNEN
                                    </button>
                                </div>
                             </div>
                        )}

                        {/* Table */}
                        <div className="w-full glass-panel rounded-2xl overflow-hidden shadow-2xl mb-12 relative z-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[900px]">
                                    <thead>
                                        <tr className="bg-black/40 border-b border-white/10 text-[10px] uppercase tracking-widest text-gray-400">
                                            <th className="p-5 font-bold w-16 text-center">#</th>
                                            <th className="p-5 font-bold w-32">Cover</th>
                                            <th className="p-5 font-bold">Slot Name</th>
                                            <th className="p-5 font-bold text-right w-32">Kosten</th>
                                            <th className="p-5 font-bold text-right w-40">Gewinn</th>
                                            <th className="p-5 font-bold text-right w-32">Ergebnis</th>
                                            <th className="p-5 font-bold text-right w-24">Multi</th>
                                            <th className="p-5 font-bold text-center w-20"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {filteredSlots.length === 0 ? (
                                            <tr><td colSpan={8} className="p-12 text-center text-gray-400 italic bg-white/5 rounded-xl border border-white/5 border-dashed m-4">Keine Slots gefunden.</td></tr>
                                        ) : (
                                            filteredSlots.map((slot, index) => {
                                                const globalIndex = slots.findIndex(s => s.id === slot.id) + 1;
                                                const isPlayed = slot.payout !== null;
                                                const result = isPlayed ? (slot.payout || 0) - slot.buyIn : 0;
                                                const isWin = result >= 0;
                                                const multiplier = isPlayed ? ((slot.payout || 0) / slot.buyIn).toFixed(2) : '-';
                                                
                                                return (
                                                    <tr key={slot.id} id={`row-${slot.id}`} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group">
                                                        <td className="p-5 text-gray-400 font-mono w-16 text-center text-xs">{globalIndex}</td>
                                                        <td className="p-5 w-32">
                                                            <div className="w-24 h-32 bg-black/40 rounded-lg border border-white/10 overflow-hidden relative flex items-center justify-center p-0 shadow-lg">
                                                                <img src={getSlotImageSrc(slot.name)} onError={(e) => (e.currentTarget.style.display = 'none')} className="w-full h-full" style={getImageStyle(slot.name)} />
                                                            </div>
                                                        </td>
                                                        <td className="p-5 font-bold text-white text-base">
                                                            {(isPlayed && (slot.payout || 0) > slot.buyIn) && <Trophy className="w-4 h-4 text-yellow-400 mr-2 inline" />}
                                                            {slot.name}
                                                        </td>
                                                        <td className="p-5 text-right text-gray-400 w-32 font-mono">{slot.buyIn.toLocaleString('de-DE', {style:'currency', currency:'EUR'})}</td>
                                                        <td className="p-5 text-right w-40">
                                                            <input 
                                                                type="number" 
                                                                value={slot.payout === null ? '' : slot.payout} 
                                                                onChange={(e) => handleUpdatePayout(slot.id, e.target.value)}
                                                                placeholder="-" 
                                                                className="bg-transparent border-b border-white/10 focus:border-[#9333ea] hover:border-white/30 text-right w-24 focus:outline-none text-white font-bold transition-all placeholder-white/10 font-mono py-1"
                                                            />
                                                        </td>
                                                        <td className="p-5 text-right font-bold w-32 font-mono text-base">
                                                            {isPlayed ? <span className={isWin ? 'text-green-400' : 'text-red-400'}>{isWin ? '+' : ''}{result.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</span> : <span className="text-white/20">-</span>}
                                                        </td>
                                                        <td className="p-5 text-right font-mono text-gray-400 w-24">
                                                            <span className={isPlayed && result >= 0 ? 'text-yellow-400 font-bold' : ''}>{multiplier}x</span>
                                                        </td>
                                                        <td className="p-5 text-center w-20">
                                                            <button onClick={() => handleDeleteSlot(slot.id)} className="text-white/20 hover:text-red-500 transition-colors p-2 hover:bg-white/5 rounded-full"><Trash2 className="w-4 h-4" /></button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                         {/* Chart - Only Visible when there is data */}
                         {playedSlots.length > 0 && (
                            <div className="glass-panel rounded-2xl p-8 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#9333ea]/5 rounded-full blur-3xl"></div>
                                <h3 className="text-xl font-bold font-display italic mb-6 relative z-10 flex items-center gap-2">
                                    <BarChart2 className="w-5 h-5 text-[#9333ea]" /> STATISTIK
                                </h3>
                                <div className="h-[300px] w-full relative z-10">
                                    <canvas ref={chartRef}></canvas>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div id="view-random" className="animate-fade-in flex flex-col items-center justify-center min-h-[60vh]">
                        {/* Randomizer View Content - Placeholder or implementation */}
                         <div className="text-center max-w-2xl">
                            <h2 className="text-4xl font-black italic mb-6">RANDOM SLOT</h2>
                            <p className="text-gray-400 mb-8">Lass den Zufall entscheiden, welcher Slot als nächstes gespielt wird.</p>
                            <button onClick={() => openRandomizer('random')} className="px-8 py-4 bg-[#9333ea] hover:bg-violet-600 text-white font-black italic rounded-xl shadow-lg transition-all flex items-center gap-2 mx-auto">
                                <Shuffle className="w-5 h-5" /> GENERIEREN
                            </button>
                        </div>
                    </div>
                )}
            </main>

            {/* Randomizer Overlay */}
            {randomizerOpen && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
                     {/* Close X Button (Top Right) */}
                     <button 
                        onClick={() => setRandomizerOpen(false)} 
                        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50 group"
                    >
                        <X className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    </button>

                    <div className="w-full max-w-5xl">
                         <div className="text-center mb-8 relative">
                             <h2 className="text-5xl md:text-7xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2">
                                {randomizerMode === 'hunt' ? 'NEXT BONUS' : 'RANDOM SLOT'}
                            </h2>
                             {!isSpinning && !randomizerResult && (
                                <p className="text-gray-400 animate-pulse">Bereit zum Starten...</p>
                            )}
                         </div>

                         {/* Tape Container */}
                         <div className="relative w-full h-[350px] bg-[#0a0a0f] border-y-4 border-[#9333ea] overflow-hidden mb-8 shadow-[0_0_50px_rgba(139,92,246,0.2)] flex items-center">
                             {/* Center Marker */}
                             <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-400 z-20 shadow-[0_0_10px_rgba(250,204,21,0.8)]"></div>
                             <div className="absolute left-1/2 -translate-x-1/2 top-2 z-20"><ChevronDown className="text-yellow-400 w-8 h-8 drop-shadow-lg" /></div>
                             <div className="absolute left-1/2 -translate-x-1/2 bottom-2 z-20"><ChevronUp className="text-yellow-400 w-8 h-8 drop-shadow-lg" /></div>
                             
                             {/* Tape */}
                             <div ref={tapeRef} className="flex items-center absolute left-1/2 h-full pl-[115px]" style={{ transform: 'translateX(0px)' }}>
                                 {tapeItems.map((item, idx) => (
                                     <div key={idx} className="w-[230px] h-[280px] p-4 flex-shrink-0">
                                         <div className={`w-full h-full rounded-xl border-2 ${item.isGiveaway ? 'border-yellow-400 bg-yellow-400/10' : 'border-white/10 bg-[#15151e]'} relative overflow-hidden shadow-2xl group`}>
                                             {item.isGiveaway ? (
                                                  <div className="flex flex-col items-center justify-center h-full text-center animate-pulse p-4">
                                                      <Gift className="w-16 h-16 text-yellow-400 mx-auto mb-2" />
                                                      <h3 className="text-2xl font-black text-yellow-400 italic leading-none">100€<br/>GIVEAWAY</h3>
                                                  </div>
                                             ) : (
                                                 <>
                                                    {/* Full Tile Image */}
                                                    <div className="absolute inset-0 z-0">
                                                        {item.id !== 'RND' ? (
                                                            <img src={getSlotImageSrc(item.name)} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} style={getImageStyle(item.name)} />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-400 font-black text-4xl bg-black/50">?</div>
                                                        )}
                                                    </div>
                                                    
                                                    {/* Text Overlay (Bottom Gradient) */}
                                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 z-10 pt-12">
                                                        <h3 className="text-white font-bold text-center leading-tight line-clamp-2 drop-shadow-md text-lg">{item.name}</h3>
                                                        {!item.isGiveaway && randomizerMode === 'hunt' && (
                                                            <p className="text-[#d8b4fe] text-xs font-bold text-center mt-1">{item.buyIn} €</p>
                                                        )}
                                                    </div>
                                                 </>
                                             )}
                                         </div>
                                     </div>
                                 ))}
                             </div>
                         </div>

                         {/* Actions */}
                         <div className="flex justify-center gap-4">
                             {!isSpinning && !randomizerResult && (
                                 <button onClick={startCaseOpening} className="px-12 py-6 bg-green-500 hover:bg-green-400 text-black font-black italic text-2xl rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-transform hover:scale-105 active:scale-95 flex items-center gap-3">
                                     <Play className="w-6 h-6 fill-current" /> GO!
                                 </button>
                             )}
                             
                             {randomizerResult && (
                                 <div className="flex flex-col gap-6 animate-in fade-in zoom-in duration-300 items-center w-full">
                                     <div className="text-4xl font-black text-white text-center drop-shadow-xl">
                                         Gewinner: <span className="text-[#9333ea] block mt-2 text-5xl neon-text">{randomizerResult.name}</span>
                                     </div>
                                     <div className="flex gap-4 flex-wrap justify-center items-end">
                                          {!randomizerResult.isGiveaway && randomizerMode === 'hunt' ? (
                                               <div className="flex flex-col items-center gap-4 bg-[#1a1a24] p-6 rounded-2xl border border-white/10 shadow-xl">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Gewinn eintragen</span>
                                                        <div className="relative">
                                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-2xl">€</span>
                                                            <input 
                                                                type="number" 
                                                                autoFocus
                                                                value={quickPayout}
                                                                onChange={(e) => setQuickPayout(e.target.value)}
                                                                placeholder="0"
                                                                className="w-48 bg-black/50 border-2 border-[#9333ea]/50 rounded-xl px-4 py-3 pl-10 text-white font-bold text-4xl focus:border-[#9333ea] focus:ring-4 focus:ring-[#9333ea]/20 outline-none transition-all text-center"
                                                                onKeyPress={(e) => e.key === 'Enter' && handleSaveRandomizer()}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3 w-full">
                                                        <button onClick={handleSaveRandomizer} className="flex-1 px-8 py-4 bg-[#9333ea] hover:bg-violet-600 text-white font-bold rounded-xl transition-colors text-lg flex items-center justify-center gap-2 shadow-lg">
                                                            <Save className="w-5 h-5" /> Speichern
                                                        </button>
                                                        <button onClick={startCaseOpening} className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors border border-white/10" title="Nochmal drehen">
                                                            <RefreshCw className="w-6 h-6" />
                                                        </button>
                                                    </div>
                                               </div>
                                          ) : (
                                              // Controls for Non-Hunt Mode or Giveaway
                                              <div className="flex gap-4">
                                                  <button onClick={startCaseOpening} className="px-8 py-4 bg-white hover:bg-gray-200 text-black font-bold rounded-xl transition-colors text-lg flex items-center gap-2 shadow-lg">
                                                      <RefreshCw className="w-5 h-5" /> Nochmal drehen
                                                  </button>
                                                  {!randomizerResult.isGiveaway && randomizerMode === 'random' && (
                                                      <button onClick={handleAddResultToHunt} className="px-8 py-4 bg-[#9333ea] hover:bg-violet-600 text-white font-bold rounded-xl transition-colors text-lg shadow-lg">
                                                          Zur Hunt hinzufügen
                                                      </button>
                                                  )}
                                              </div>
                                          )}
                                     </div>
                                 </div>
                             )}
                         </div>
                    </div>
                </div>
            )}

            {/* BackOffice Overlay (Image Positioning) */}
            {backOfficeOpen && (
                 <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col p-4 animate-in fade-in">
                     <div className="flex justify-between items-center mb-4">
                         <h2 className="text-2xl font-bold text-white">Image Backoffice</h2>
                         <button onClick={() => setBackOfficeOpen(false)}><X className="text-white" /></button>
                     </div>
                     <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-y-auto custom-scroll pb-20">
                         {searchableSlots.map(slotName => (
                             <div key={slotName} className="bg-[#15151e] p-2 rounded border border-white/10">
                                 <div className="w-full h-32 relative overflow-hidden bg-black rounded mb-2 group">
                                     <img src={getSlotImageSrc(slotName)} className="w-full h-full object-cover transition-all" style={getImageStyle(slotName)} onError={(e) => (e.currentTarget.style.display = 'none')} />
                                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                                         {['top', 'center', 'bottom', 'left', 'right'].map(pos => (
                                             <button 
                                                key={pos} 
                                                onClick={() => setSlotAlignments(prev => ({...prev, [slotName]: pos}))}
                                                className={`w-4 h-4 rounded-full border border-white ${slotAlignments[slotName] === pos ? 'bg-[#9333ea]' : 'bg-transparent'}`}
                                                title={pos}
                                             />
                                         ))}
                                     </div>
                                 </div>
                                 <p className="text-xs text-center text-gray-400 truncate">{slotName}</p>
                             </div>
                         ))}
                     </div>
                 </div>
            )}
            
            {/* Streaming Overlay (Updated Design) */}
            {overlayVisible && (
                <div 
                    ref={overlayRef}
                    onMouseDown={handleOverlayDragStart}
                    className="fixed top-10 right-10 w-[220px] bg-[#050508] rounded-xl border border-[#2e1065] z-[9999] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden cursor-move font-sans select-none"
                    style={{ position: 'fixed' }}
                >
                    {/* 1. Header */}
                    <div className="bg-[#1a1a24] p-3 flex justify-between items-center border-b border-[#2e1065]">
                        <div className="flex items-center gap-2">
                            <Radio className="w-4 h-4 text-[#9333ea] animate-pulse" />
                            <span className="font-extrabold text-[#d8b4fe] text-xs tracking-[0.2em] uppercase">Stream Overlay</span>
                        </div>
                        <button onClick={() => setOverlayVisible(false)} className="text-gray-600 hover:text-white"><X className="w-4 h-4" /></button>
                    </div>

                    <div className="p-3 flex flex-col gap-3">
                        
                        {/* 2. Top Row: Start Balance & RTP */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-[#0f0f16] rounded-lg p-2 border border-[#2e1065]/50 flex flex-col justify-center">
                                <span className="text-[8px] font-bold text-gray-500 uppercase mb-1">Start Balance</span>
                                <span className="text-lg font-black text-white">{totalCost.toFixed(0)} €</span>
                            </div>
                            <div className="bg-[#0f0f16] rounded-lg p-2 border border-[#2e1065]/50 flex flex-col justify-center">
                                <span className="text-[8px] font-bold text-gray-500 uppercase mb-1">RTP</span>
                                <span className={`text-lg font-black ${roi >= 100 ? 'text-green-400' : 'text-white'}`}>{roi.toFixed(0)}%</span>
                            </div>
                        </div>

                        {/* 3. Middle Row: Ergebnis (Profit) - Large */}
                        <div className="bg-[#0f0f16] rounded-lg p-3 border border-[#2e1065]/50 relative">
                            <div className="absolute top-2 right-2 text-[9px] font-bold text-[#9333ea] bg-[#9333ea]/10 px-1.5 py-0.5 rounded">
                                {playedSlots.length}/{slots.length} GAMES
                            </div>
                            <span className="text-[9px] font-bold text-gray-500 uppercase mb-1 block">Ergebnis</span>
                            <div className={`text-3xl font-black text-center py-1 ${netResult >= 0 ? 'text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]' : 'text-white'}`}>
                                {netResult >= 0 ? '+' : ''}{netResult.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2})} €
                            </div>
                        </div>

                        {/* 4. Bonus Kosten Row */}
                        <div className="bg-[#15151e] rounded-lg px-3 py-2 border border-[#2e1065]/50 flex justify-between items-center">
                            <span className="text-[10px] font-bold text-gray-500 uppercase">Bonus Kosten</span>
                            <span className="text-lg font-black text-white">
                                {activeOverlaySlot ? activeOverlaySlot.buyIn.toLocaleString('de-DE', {minimumFractionDigits: 2}) : '0,00'} €
                            </span>
                        </div>

                        {/* 5. Bottom: Current Game (Image Background) */}
                        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-[#2e1065] group bg-black">
                             <div className="absolute top-2 left-2 z-20 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-[#9333ea] rounded-full animate-ping"></div>
                                <div className="w-1.5 h-1.5 bg-[#9333ea] rounded-full absolute"></div>
                                <span className="text-[9px] font-bold text-white uppercase tracking-widest drop-shadow-md">Aktuelles Spiel</span>
                            </div>

                            {activeOverlaySlot ? (
                                <>
                                    <img 
                                        src={getSlotImageSrc(activeOverlaySlot.name)} 
                                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 scale-105 group-hover:scale-100" 
                                        style={getImageStyle(activeOverlaySlot.name)}
                                        onError={(e) => (e.currentTarget.style.display = 'none')} 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
                                    
                                    <div className="absolute bottom-0 left-0 w-full p-4 text-center">
                                        <h3 className="text-white font-black italic text-xl leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] uppercase line-clamp-2">
                                            {activeOverlaySlot.name}
                                        </h3>
                                    </div>
                                </>
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                    <span className="text-2xl font-black text-[#1a1a24]">???</span>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default BonusHunt;