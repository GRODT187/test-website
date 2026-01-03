import React, { createContext, useContext, useState, useEffect } from 'react';
import { CasinoOffer, EmailEntry } from '../types';
import { CASINO_OFFERS } from '../constants';

interface DataContextType {
  casinos: CasinoOffer[];
  emails: EmailEntry[];
  addCasino: (casino: CasinoOffer) => void;
  deleteCasino: (id: string) => void;
  updateCasino: (casino: CasinoOffer) => void;
  addEmail: (email: string, source: 'giveaway_page' | 'home_inline') => void;
  deleteEmail: (id: string) => void;
  clearAllEmails: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage or constants
  const [casinos, setCasinos] = useState<CasinoOffer[]>(() => {
    const saved = localStorage.getItem('ib_casinos');
    return saved ? JSON.parse(saved) : CASINO_OFFERS;
  });

  const [emails, setEmails] = useState<EmailEntry[]>(() => {
    const saved = localStorage.getItem('ib_emails');
    return saved ? JSON.parse(saved) : [];
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('ib_casinos', JSON.stringify(casinos));
  }, [casinos]);

  useEffect(() => {
    localStorage.setItem('ib_emails', JSON.stringify(emails));
  }, [emails]);

  // Actions
  const addCasino = (casino: CasinoOffer) => {
    setCasinos(prev => [...prev, casino]);
  };

  const deleteCasino = (id: string) => {
    setCasinos(prev => prev.filter(c => c.id !== id));
  };

  const updateCasino = (updatedCasino: CasinoOffer) => {
    setCasinos(prev => prev.map(c => c.id === updatedCasino.id ? updatedCasino : c));
  };

  const addEmail = (email: string, source: 'giveaway_page' | 'home_inline') => {
    const newEntry: EmailEntry = {
      id: Date.now().toString(),
      email,
      date: new Date().toISOString(),
      source
    };
    setEmails(prev => [...prev, newEntry]);
  };

  const deleteEmail = (id: string) => {
    setEmails(prev => prev.filter(e => e.id !== id));
  };

  const clearAllEmails = () => {
    setEmails([]);
  };

  return (
    <DataContext.Provider value={{ casinos, emails, addCasino, deleteCasino, updateCasino, addEmail, deleteEmail, clearAllEmails }}>
      {children}
    </DataContext.Provider>
  );
};