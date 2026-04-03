/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ViewState, TenureType, LandParcel } from './types';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { Marketplace } from './components/Marketplace';
import { LandDetail } from './components/LandDetail';
import { CompareView } from './components/CompareView';
import { UpgradeModal } from './components/UpgradeModal';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(null);
  const [compareParcels, setCompareParcels] = useState<LandParcel[]>([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [tenureFilter, setTenureFilter] = useState<TenureType | 'All'>('All');

  const handleUpgrade = () => {
    setIsPremium(true);
    setShowUpgradeModal(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-emerald-500/30">
      <Header 
        currentView={currentView}
        setCurrentView={setCurrentView}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        isPremium={isPremium}
        setShowUpgradeModal={setShowUpgradeModal}
        setTenureFilter={setTenureFilter}
      />

      <main className="pb-20">
        {currentView === 'landing' && (
          <LandingPage 
            setCurrentView={setCurrentView} 
            setTenureFilter={setTenureFilter} 
          />
        )}
        
        {currentView === 'marketplace' && (
          <Marketplace 
            setCurrentView={setCurrentView}
            isPremium={isPremium}
            setShowUpgradeModal={setShowUpgradeModal}
            tenureFilter={tenureFilter}
            setTenureFilter={setTenureFilter}
            setSelectedParcel={setSelectedParcel}
            compareParcels={compareParcels}
            setCompareParcels={setCompareParcels}
          />
        )}

        {currentView === 'detail' && (
          <LandDetail 
            parcel={selectedParcel}
            setCurrentView={setCurrentView}
            isPremium={isPremium}
            setShowUpgradeModal={setShowUpgradeModal}
          />
        )}

        {currentView === 'compare' && (
          <CompareView 
            compareParcels={compareParcels}
            setCurrentView={setCurrentView}
            setCompareParcels={setCompareParcels}
          />
        )}
      </main>

      <UpgradeModal 
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={handleUpgrade}
      />
    </div>
  );
}

