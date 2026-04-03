import React from 'react';
import { Hexagon, Lock } from 'lucide-react';
import { ViewState, TenureType } from '../types';

interface HeaderProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  isPremium: boolean;
  setShowUpgradeModal: (val: boolean) => void;
  setTenureFilter: (val: TenureType | 'All') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  isLoggedIn,
  setIsLoggedIn,
  isPremium,
  setShowUpgradeModal,
  setTenureFilter,
}) => {
  const handleHomeClick = () => {
    setCurrentView('landing');
    setTenureFilter('All');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button 
          className="flex items-center gap-2 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1 -ml-1"
          onClick={handleHomeClick}
        >
          <div className="bg-emerald-500 p-1.5 rounded-lg group-hover:bg-emerald-600 transition-colors shadow-sm">
            <Hexagon className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            TerraChain
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={handleHomeClick}
            className={`text-sm font-medium transition-colors hover:text-emerald-500 ${
              currentView === 'landing' 
                ? 'text-emerald-500' 
                : 'text-zinc-600 dark:text-zinc-400'
            }`}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentView('marketplace')}
            className={`text-sm font-medium transition-colors hover:text-emerald-500 ${
              currentView === 'marketplace' 
                ? 'text-emerald-500' 
                : 'text-zinc-600 dark:text-zinc-400'
            }`}
          >
            Marketplace
          </button>
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn && !isPremium && (
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-3 py-1.5 rounded-full hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              Upgrade to Premium
            </button>
          )}
          
          <button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="text-sm font-medium px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-zinc-900 dark:text-zinc-100"
          >
            {isLoggedIn ? 'Log Out' : 'Log In'}
          </button>
        </div>
      </div>
    </header>
  );
};
