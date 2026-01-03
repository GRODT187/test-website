import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'EIUFMWihbsdvo3736&/28d') { 
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-[#9333ea]/30">
        <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#1a1a24] rounded-full flex items-center justify-center mb-4 border border-[#9333ea]/50">
                <Lock className="w-8 h-8 text-[#d8b4fe]" />
            </div>
            <h1 className="text-2xl font-bold text-white uppercase italic">Admin <span className="gradient-text">Panel</span></h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
                type="password" 
                placeholder="Passwort eingeben"
                className="block w-full px-4 py-3 bg-[#050508] border border-[#9333ea]/30 rounded-lg focus:ring-1 focus:ring-[#9333ea] focus:border-[#9333ea] text-white outline-none"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                }}
            />
            {error && <span className="text-red-500 text-sm">Falsches Passwort.</span>}
            
            <button 
                type="submit" 
                className="gradient-btn text-white font-bold py-3 px-6 rounded-lg hover:brightness-110 transition-all uppercase"
            >
                Einloggen
            </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;