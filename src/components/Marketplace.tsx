import React, { useState, useMemo } from 'react';
import { ViewState, TenureType, LandParcel } from '../types';
import { mockLandParcels } from '../data/mockLand';
import { Search, Filter, ArrowUpDown, Lock, CheckCircle2, ChevronRight } from 'lucide-react';

interface MarketplaceProps {
  setCurrentView: (view: ViewState) => void;
  isPremium: boolean;
  setShowUpgradeModal: (val: boolean) => void;
  tenureFilter: TenureType | 'All';
  setTenureFilter: (val: TenureType | 'All') => void;
  setSelectedParcel: (parcel: LandParcel) => void;
  compareParcels: LandParcel[];
  setCompareParcels: (parcels: LandParcel[]) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({
  setCurrentView,
  isPremium,
  setShowUpgradeModal,
  tenureFilter,
  setTenureFilter,
  setSelectedParcel,
  compareParcels,
  setCompareParcels,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'Price' | 'Size' | 'Suitability'>('Price');
  const [isCompareMode, setIsCompareMode] = useState(false);

  const filteredAndSortedParcels = useMemo(() => {
    let result = mockLandParcels;

    if (tenureFilter !== 'All') {
      result = result.filter(p => p.tenureType === tenureFilter);
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.location.toLowerCase().includes(lowerQuery)
      );
    }

    result = [...result].sort((a, b) => {
      if (sortBy === 'Price') return a.price - b.price;
      if (sortBy === 'Size') return b.sizeAcres - a.sizeAcres;
      if (sortBy === 'Suitability') return b.farmingSuitability - a.farmingSuitability;
      return 0;
    });

    return result;
  }, [searchQuery, tenureFilter, sortBy]);

  const displayedParcels = isPremium ? filteredAndSortedParcels : filteredAndSortedParcels.slice(0, 12);

  const handleCardClick = (parcel: LandParcel) => {
    if (isCompareMode) {
      if (compareParcels.find(p => p.id === parcel.id)) {
        setCompareParcels(compareParcels.filter(p => p.id !== parcel.id));
      } else if (compareParcels.length < 3) {
        setCompareParcels([...compareParcels, parcel]);
      }
    } else {
      setSelectedParcel(parcel);
      setCurrentView('detail');
    }
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-4 py-8">
      {/* Compare Banner */}
      {isCompareMode && (
        <div className="sticky top-20 z-30 bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-xl shadow-emerald-500/20 flex flex-col sm:flex-row items-center justify-between mb-8">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <div className="bg-white/20 p-2 rounded-lg">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold">Compare Mode Active</h3>
              <p className="text-emerald-100 text-sm">{compareParcels.length}/3 selected</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={() => {
                setIsCompareMode(false);
                setCompareParcels([]);
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm font-medium transition-colors flex-1 sm:flex-none"
            >
              Cancel
            </button>
            <button 
              disabled={compareParcels.length < 2}
              onClick={() => setCurrentView('compare')}
              className="px-6 py-2 bg-white text-emerald-600 hover:bg-zinc-50 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
            >
              Compare Selected
            </button>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search by name or location..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-zinc-100"
          />
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-2 lg:pb-0">
          <div className="relative min-w-[160px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <select 
              value={tenureFilter}
              onChange={(e) => setTenureFilter(e.target.value as TenureType | 'All')}
              className="w-full pl-9 pr-8 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-zinc-100 text-sm font-medium"
            >
              <option value="All">All Tenures</option>
              <option value="Mailo">Mailo</option>
              <option value="Freehold">Freehold</option>
              <option value="Leasehold">Leasehold</option>
              <option value="Customary">Customary</option>
            </select>
          </div>

          <div className="relative min-w-[160px]">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full pl-9 pr-8 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-zinc-100 text-sm font-medium"
            >
              <option value="Price">Sort by Price</option>
              <option value="Size">Sort by Size</option>
              <option value="Suitability">Sort by Suitability</option>
            </select>
          </div>

          <button 
            onClick={() => setIsCompareMode(!isCompareMode)}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-colors border whitespace-nowrap ${
              isCompareMode 
                ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400' 
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500'
            }`}
          >
            {isCompareMode ? 'Exit Compare' : 'Compare Mode'}
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedParcels.map((parcel) => {
          const isSelected = compareParcels.find(p => p.id === parcel.id);
          return (
            <div 
              key={parcel.id}
              onClick={() => handleCardClick(parcel)}
              className={`group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border transition-all cursor-pointer ${
                isSelected 
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-500/10' 
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:shadow-xl'
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={parcel.image} 
                  alt={parcel.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-zinc-900 dark:text-zinc-100 shadow-sm">
                  {parcel.tenureType}
                </div>
                {isCompareMode && (
                  <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-emerald-500 border-emerald-500' : 'bg-black/20 border-white/80 backdrop-blur-sm'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 line-clamp-1">{parcel.name}</h3>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap ml-2">
                    ${parcel.price.toLocaleString()}
                  </span>
                </div>
                
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-1">{parcel.location}</p>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold mb-1">Size</p>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{parcel.sizeAcres} Acres</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold mb-1">Suitability</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full" 
                          style={{ width: `${parcel.farmingSuitability}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{parcel.farmingSuitability}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Premium Paywall */}
      {!isPremium && filteredAndSortedParcels.length > 12 && (
        <div className="mt-12 relative rounded-3xl overflow-hidden border border-amber-200 dark:border-amber-900/50 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-8 sm:p-12 text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-600 dark:text-amber-500 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Unlock {filteredAndSortedParcels.length - 12} More Parcels
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto mb-8">
            Get full access to our entire database of verified land listings, historical yield data, and advanced comparison tools.
          </p>
          <button 
            onClick={() => setShowUpgradeModal(true)}
            className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 mx-auto"
          >
            Upgrade to Premium <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {filteredAndSortedParcels.length === 0 && (
        <div className="text-center py-20">
          <p className="text-zinc-500 dark:text-zinc-400 text-lg">No parcels found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
