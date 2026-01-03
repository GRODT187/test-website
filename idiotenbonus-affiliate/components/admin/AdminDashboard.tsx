import React, { useState, useMemo, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { CasinoOffer } from '../../types';
import { Trash2, Plus, Users, LayoutList, LogOut, Copy, Download, Search, Edit, X, Upload, Save, ArrowUpDown, PieChart, Mail, Filter, Info, CheckSquare, Square, AlertTriangle } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { casinos, emails, addCasino, deleteCasino, updateCasino, deleteEmail, clearAllEmails } = useData();
  const [activeTab, setActiveTab] = useState<'casinos' | 'emails'>('emails');
  
  // Search & Filter State
  const [casinoSearch, setCasinoSearch] = useState('');
  const [filterBonusType, setFilterBonusType] = useState('ALL');
  const [filterExclusive, setFilterExclusive] = useState(false);

  // Email State
  const [emailSort, setEmailSort] = useState<'newest' | 'oldest'>('newest');
  const [includeCsvHeaders, setIncludeCsvHeaders] = useState(true);

  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const initialFormState: Partial<CasinoOffer> = {
    name: '',
    stats: { bonusType: 'STICKY', bonusPercentage: '100%', maxBonus: '500€', maxBet: '5€', wager: '35x' },
    features: ['Schnelle Auszahlung'],
    promoCode: 'IDIOTENBONUS',
    isExclusive: true,
    rating: 5,
    logoUrl: 'https://picsum.photos/100/100',
    ctaLink: '#',
    terms: 'T&Cs apply',
    providerIcon: 'Novoline'
  };

  const [formData, setFormData] = useState<Partial<CasinoOffer>>(initialFormState);

  // --- Handlers ---

  const handleDeleteCasino = (id: string) => {
    if (window.confirm('Bist du sicher, dass du dieses Casino löschen möchtest?')) {
      deleteCasino(id);
      if (isEditing && formData.id === id) {
        handleCancelEdit();
      }
    }
  };

  const handleDeleteEmail = (id: string) => {
    if (window.confirm('Bist du sicher, dass du diesen Eintrag löschen möchtest?')) {
      deleteEmail(id);
    }
  };

  const handleClearAllEmails = () => {
    const confirmCount = emails.length;
    if (window.confirm(`ACHTUNG: Möchtest du wirklich ALLE ${confirmCount} E-Mails löschen? Dies kann nicht rückgängig gemacht werden.`)) {
        if(window.confirm("Bist du wirklich sicher?")) {
            clearAllEmails();
        }
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID,Email,Datum,Quelle'];
    const rows = emails.map(e => `${e.id},${e.email},${e.date},${e.source}`);
    
    let csvContent = "data:text/csv;charset=utf-8,";
    if (includeCsvHeaders) {
        csvContent += headers.join(",") + "\n";
    }
    csvContent += rows.join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `email_liste_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Bitte nur Bilddateien hochladen (JPG, PNG, WEBP).');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
          // Compress image to save LocalStorage space
          const img = new Image();
          img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              
              // Max dimension 150px (enough for logos)
              const maxSize = 150;
              let width = img.width;
              let height = img.height;

              if (width > height) {
                  if (width > maxSize) {
                      height *= maxSize / width;
                      width = maxSize;
                  }
              } else {
                  if (height > maxSize) {
                      width *= maxSize / height;
                      height = maxSize;
                  }
              }

              canvas.width = width;
              canvas.height = height;
              ctx?.drawImage(img, 0, 0, width, height);

              // Compress to JPEG 70% quality
              const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
              setFormData(prev => ({ ...prev, logoUrl: dataUrl }));
          };
          if (event.target?.result) {
            img.src = event.target.result as string;
          }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (casino: CasinoOffer) => {
    setFormData(casino);
    setIsEditing(true);
    // Scroll to top of form on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && formData.id) {
      updateCasino(formData as CasinoOffer);
      alert('Casino aktualisiert!');
      handleCancelEdit();
    } else {
      const id = Date.now().toString();
      addCasino({ ...formData, id } as CasinoOffer);
      alert('Casino hinzugefügt!');
      setFormData(initialFormState);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
  };

  const toggleEmailSort = () => {
    setEmailSort(prev => prev === 'newest' ? 'oldest' : 'newest');
  };

  // Filter Casinos
  const filteredCasinos = useMemo(() => {
    return casinos.filter(c => {
        const matchesName = c.name.toLowerCase().includes(casinoSearch.toLowerCase());
        const matchesType = filterBonusType === 'ALL' || c.stats.bonusType === filterBonusType;
        const matchesExclusive = filterExclusive ? c.isExclusive : true;
        return matchesName && matchesType && matchesExclusive;
    });
  }, [casinos, casinoSearch, filterBonusType, filterExclusive]);

  // Sort Emails
  const sortedEmails = useMemo(() => {
    return [...emails].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return emailSort === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [emails, emailSort]);

  // Helpers
  const getSourceLabel = (source: string) => {
      if (source === 'giveaway_page') return 'Eingetragen über Gewinnspiel-Seite';
      if (source === 'home_inline') return 'Eingetragen über Startseite (Newsletter)';
      return source;
  };

  // Stat Calculations for Bars
  const casinoMilestone = Math.ceil((casinos.length + 1) / 10) * 10;
  const casinoProgress = (casinos.length / casinoMilestone) * 100;

  const emailMilestone = Math.ceil((emails.length + 1) / 50) * 50;
  const emailProgress = (emails.length / emailMilestone) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Admin Header */}
      <header className="bg-[#15151e] border-b border-white/5 p-4 sticky top-0 z-40 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
             <div className="text-xl font-extrabold tracking-tighter text-white uppercase italic">
                Back<span className="text-[#9333ea]">office</span>
            </div>
            <button onClick={onLogout} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm">
                <LogOut className="w-4 h-4" /> Logout
            </button>
        </div>
      </header>

      <div className="container mx-auto p-4 md:p-8">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-[#15151e] p-6 rounded-xl border border-[#9333ea]/20 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-gray-400 text-sm font-bold uppercase mb-1">Total Casinos</p>
                        <p className="text-3xl font-extrabold text-white">{casinos.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-[#9333ea]/10 rounded-full flex items-center justify-center border border-[#9333ea]/30">
                        <PieChart className="w-6 h-6 text-[#9333ea]" />
                    </div>
                </div>
                {/* Simple Bar Chart */}
                <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Fortschritt</span>
                        <span>Ziel: {casinoMilestone}</span>
                    </div>
                    <div className="w-full h-2 bg-[#0a0a0f] rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-[#7c3aed] to-[#9333ea] rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${casinoProgress}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-[#15151e] p-6 rounded-xl border border-[#9333ea]/20 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-gray-400 text-sm font-bold uppercase mb-1">Gesammelte E-Mails</p>
                        <p className="text-3xl font-extrabold text-white">{emails.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-[#9333ea]/10 rounded-full flex items-center justify-center border border-[#9333ea]/30">
                        <Mail className="w-6 h-6 text-[#9333ea]" />
                    </div>
                </div>
                {/* Simple Bar Chart */}
                <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Wachstum</span>
                        <span>Ziel: {emailMilestone}</span>
                    </div>
                    <div className="w-full h-2 bg-[#0a0a0f] rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${emailProgress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10 pb-1">
            <button 
                onClick={() => setActiveTab('emails')}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold transition-all relative ${activeTab === 'emails' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
                <Users className="w-5 h-5" /> E-Mail Liste
                {activeTab === 'emails' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#9333ea] rounded-t-full" />}
            </button>
            <button 
                onClick={() => setActiveTab('casinos')}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold transition-all relative ${activeTab === 'casinos' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
                <LayoutList className="w-5 h-5" /> Casinos
                {activeTab === 'casinos' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#9333ea] rounded-t-full" />}
            </button>
        </div>

        {/* EMAILS TAB */}
        {activeTab === 'emails' && (
            <div className="bg-[#15151e] rounded-xl border border-white/5 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                <div className="p-4 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                            onClick={toggleEmailSort}
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowUpDown className="w-4 h-4" /> 
                            Sortierung: <span className="text-[#9333ea] font-bold">{emailSort === 'newest' ? 'Neueste zuerst' : 'Älteste zuerst'}</span>
                        </button>
                        
                         {/* Delete All Button */}
                        {emails.length > 0 && (
                            <button 
                                onClick={handleClearAllEmails}
                                className="flex items-center gap-2 text-xs text-red-500 hover:text-red-400 transition-colors border border-red-900/30 bg-red-900/10 px-3 py-1 rounded"
                            >
                                <AlertTriangle className="w-3 h-3" />
                                Alle Emails löschen
                            </button>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                         <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer select-none">
                            <div className="relative">
                                <input 
                                    type="checkbox" 
                                    className="hidden" 
                                    checked={includeCsvHeaders}
                                    onChange={(e) => setIncludeCsvHeaders(e.target.checked)}
                                />
                                {includeCsvHeaders ? <CheckSquare className="w-4 h-4 text-[#9333ea]" /> : <Square className="w-4 h-4" />}
                            </div>
                            Mit Überschriften
                        </label>
                        <button 
                            onClick={handleExportCSV}
                            className="flex items-center gap-2 bg-[#1a1a24] hover:bg-[#2a2a35] text-white px-4 py-2 rounded-lg border border-white/10 transition-colors text-sm"
                        >
                            <Download className="w-4 h-4" /> CSV Exportieren
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#1a1a24] text-gray-400 text-xs uppercase">
                            <tr>
                                <th className="p-4">Datum</th>
                                <th className="p-4">E-Mail</th>
                                <th className="p-4">Quelle</th>
                                <th className="p-4 text-right">Aktion</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {sortedEmails.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-500">Noch keine E-Mails eingetragen.</td>
                                </tr>
                            )}
                            {sortedEmails.map((entry) => (
                                <tr key={entry.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="p-4 text-sm text-gray-400">{new Date(entry.date).toLocaleDateString()} {new Date(entry.date).toLocaleTimeString()}</td>
                                    <td className="p-4 font-medium flex items-center gap-2">
                                        {entry.email}
                                        <button onClick={() => handleCopyEmail(entry.email)} className="text-gray-500 hover:text-white" title="Kopieren">
                                            <Copy className="w-3 h-3" />
                                        </button>
                                    </td>
                                    <td className="p-4 text-sm">
                                        <div className="flex items-center gap-2 group/tooltip relative w-fit">
                                            <span className={`px-2 py-1 rounded text-xs cursor-help ${entry.source === 'giveaway_page' ? 'bg-blue-900/30 text-blue-400' : 'bg-green-900/30 text-green-400'}`}>
                                                {entry.source}
                                            </span>
                                            <Info className="w-3 h-3 text-gray-600 group-hover:text-gray-400 transition-colors" />
                                            {/* Tooltip */}
                                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-black border border-white/10 p-2 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
                                                {getSourceLabel(entry.source)}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => handleDeleteEmail(entry.id)} className="text-red-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* CASINOS TAB */}
        {activeTab === 'casinos' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-2">
                {/* List Column */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Filters */}
                    <div className="bg-[#15151e] p-4 rounded-xl border border-white/10 mb-4 flex flex-col md:flex-row gap-4">
                         <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="Name suchen..."
                                className="block w-full pl-9 pr-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg focus:ring-1 focus:ring-[#9333ea] outline-none text-white text-sm"
                                value={casinoSearch}
                                onChange={(e) => setCasinoSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-4">
                             <select
                                className="bg-[#0a0a0f] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-[#9333ea] outline-none"
                                value={filterBonusType}
                                onChange={(e) => setFilterBonusType(e.target.value)}
                            >
                                <option value="ALL">Alle Typen</option>
                                <option value="STICKY">Sticky</option>
                                <option value="NON-STICKY">Non-Sticky</option>
                            </select>

                            <button 
                                onClick={() => setFilterExclusive(!filterExclusive)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-all ${filterExclusive ? 'bg-[#9333ea]/20 border-[#9333ea] text-white' : 'bg-[#0a0a0f] border-white/10 text-gray-400'}`}
                            >
                                {filterExclusive ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                                Nur Exklusive
                            </button>
                        </div>
                    </div>

                    {filteredCasinos.length === 0 && (
                        <div className="text-center p-8 text-gray-500">Keine Casinos gefunden.</div>
                    )}

                    {filteredCasinos.map(casino => (
                        <div key={casino.id} className={`bg-[#15151e] p-4 rounded-xl border flex items-center justify-between transition-colors ${isEditing && formData.id === casino.id ? 'border-[#9333ea] bg-[#9333ea]/5' : 'border-white/5 hover:border-white/20'}`}>
                            <div className="flex items-center gap-4">
                                <img src={casino.logoUrl} className="w-12 h-12 rounded-lg object-cover bg-gray-800" alt={casino.name} />
                                <div>
                                    <h3 className="font-bold text-lg flex items-center gap-2">
                                        {casino.name}
                                        {casino.isExclusive && <span className="text-[10px] bg-[#9333ea] text-white px-1.5 py-0.5 rounded">EXCL</span>}
                                    </h3>
                                    <div className="text-xs text-gray-400 flex gap-2">
                                        <span>{casino.stats.bonusType}</span>
                                        <span className="text-gray-600">•</span>
                                        <span>{casino.stats.bonusPercentage}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleEditClick(casino)}
                                    className={`p-2 rounded-lg transition-all ${isEditing && formData.id === casino.id ? 'bg-[#9333ea] text-white' : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white'}`}
                                    title="Bearbeiten"
                                >
                                    <Edit className="w-5 h-5" />
                                </button>
                                <button 
                                    onClick={() => handleDeleteCasino(casino.id)}
                                    className="bg-red-500/10 text-red-500 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                                    title="Löschen"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Form Column */}
                <div className="bg-[#15151e] p-6 rounded-xl border border-[#9333ea]/30 h-fit sticky top-24 shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            {isEditing ? <Edit className="w-5 h-5 text-[#9333ea]" /> : <Plus className="w-5 h-5 text-[#9333ea]" />}
                            {isEditing ? 'Casino bearbeiten' : 'Neues Casino'}
                        </h3>
                        {isEditing && (
                            <button onClick={handleCancelEdit} className="text-gray-500 hover:text-white text-xs flex items-center gap-1">
                                <X className="w-3 h-3" /> Abbrechen
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Image Upload */}
                        <div>
                             <label className="block text-xs text-gray-400 mb-1">Logo</label>
                             <div className="flex items-center gap-2 mb-2">
                                <img src={formData.logoUrl} alt="Preview" className="w-10 h-10 rounded object-cover border border-white/10" />
                                <div className="relative flex-1">
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="logo-upload"
                                    />
                                    <label 
                                        htmlFor="logo-upload"
                                        className="w-full flex items-center justify-center gap-2 bg-[#0a0a0f] border border-white/10 rounded p-2 text-xs cursor-pointer hover:bg-[#2a2a35]"
                                    >
                                        <Upload className="w-3 h-3" /> Bild hochladen
                                    </label>
                                </div>
                             </div>
                             <input 
                                className="w-full bg-[#0a0a0f] border border-white/10 rounded p-2 text-xs text-gray-500" 
                                value={formData.logoUrl} 
                                onChange={e => setFormData({...formData, logoUrl: e.target.value})}
                                placeholder="Oder Bild-URL eingeben"
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Name</label>
                            <input 
                                className="w-full bg-[#0a0a0f] border border-white/10 rounded p-2 text-sm text-white focus:border-[#9333ea] outline-none" 
                                value={formData.name} 
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                placeholder="Casino Name" required 
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                             <div>
                                <label className="block text-xs text-gray-400 mb-1">Bonus %</label>
                                <input 
                                    className="w-full bg-[#0a0a0f] border border-white/10 rounded p-2 text-sm text-white focus:border-[#9333ea] outline-none" 
                                    value={formData.stats?.bonusPercentage} 
                                    onChange={e => setFormData({...formData, stats: {...formData.stats!, bonusPercentage: e.target.value}})}
                                />
                            </div>
                             <div>
                                <label className="block text-xs text-gray-400 mb-1">Max Bonus</label>
                                <input 
                                    className="w-full bg-[#0a0a0f] border border-white/10 rounded p-2 text-sm text-white focus:border-[#9333ea] outline-none" 
                                    value={formData.stats?.maxBonus || ''} 
                                    onChange={e => setFormData({...formData, stats: {...formData.stats!, maxBonus: e.target.value || null}})}
                                    placeholder="500€ oder leer"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                             <div>
                                <label className="block text-xs text-gray-400 mb-1">Wager</label>
                                <input 
                                    className="w-full bg-[#0a0a0f] border border-white/10 rounded p-2 text-sm text-white focus:border-[#9333ea] outline-none" 
                                    value={formData.stats?.wager || ''} 
                                    onChange={e => setFormData({...formData, stats: {...formData.stats!, wager: e.target.value || null}})}
                                    placeholder="35x oder leer"
                                />
                            </div>
                             <div>
                                <label className="block text-xs text-gray-400 mb-1">Max Bet</label>
                                <input 
                                    className="w-full bg-[#0a0a0f] border border-white/10 rounded p-2 text-sm text-white focus:border-[#9333ea] outline-none" 
                                    value={formData.stats?.maxBet || ''} 
                                    onChange={e => setFormData({...formData, stats: {...formData.stats!, maxBet: e.target.value || null}})}
                                    placeholder="5€ oder leer"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Promo Code</label>
                            <input 
                                className="w-full bg-[#0a0a0f] border border-white/10 rounded p-2 text-sm text-white focus:border-[#9333ea] outline-none" 
                                value={formData.promoCode || ''} 
                                onChange={e => setFormData({...formData, promoCode: e.target.value || null})}
                                placeholder="Code oder leer lassen"
                            />
                        </div>
                         <div>
                            <label className="block text-xs text-gray-400 mb-1">Affiliate Link</label>
                            <input 
                                className="w-full bg-[#0a0a0f] border border-white/10 rounded p-2 text-sm text-white focus:border-[#9333ea] outline-none" 
                                value={formData.ctaLink} 
                                onChange={e => setFormData({...formData, ctaLink: e.target.value})}
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className={`w-full font-bold py-3 rounded-lg mt-4 flex items-center justify-center gap-2 ${isEditing ? 'bg-[#9333ea] hover:bg-[#7e22ce]' : 'gradient-btn'}`}
                        >
                            {isEditing ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            {isEditing ? 'Änderungen speichern' : 'Hinzufügen'}
                        </button>
                    </form>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;