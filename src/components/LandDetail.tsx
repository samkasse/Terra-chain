import React from 'react';
import { LandParcel, ViewState } from '../types';
import { ArrowLeft, MapPin, Ruler, Sprout, CloudRain, Lock, ChevronRight, CheckCircle2 } from 'lucide-react';

interface LandDetailProps {
  parcel: LandParcel | null;
  setCurrentView: (view: ViewState) => void;
  isPremium: boolean;
  setShowUpgradeModal: (val: boolean) => void;
}

export const LandDetail: React.FC<LandDetailProps> = ({
  parcel,
  setCurrentView,
  isPremium,
  setShowUpgradeModal,
}) => {
  if (!parcel) return null;

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto px-4 py-8">
      <button 
        onClick={() => setCurrentView('marketplace')}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 mb-6 transition-all shadow-sm hover:shadow"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Marketplace
      </button>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm">
        {/* Hero Image */}
        <div className="relative h-[400px] w-full">
          <img 
            src={parcel.image} 
            alt={parcel.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="inline-block bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-3 shadow-sm">
                  {parcel.tenureType}
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{parcel.name}</h1>
                <div className="flex items-center gap-2 text-zinc-200">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">{parcel.location}</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white">
                <p className="text-sm text-zinc-300 font-medium mb-1 uppercase tracking-wider">Asking Price</p>
                <p className="text-3xl font-bold">${parcel.price.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">About this Property</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {parcel.description}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Agricultural Profile</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex items-start gap-4">
                    <div className="bg-emerald-100 dark:bg-emerald-500/10 p-2.5 rounded-xl text-emerald-600 dark:text-emerald-400">
                      <Sprout className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-1">Soil Type</p>
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">{parcel.soilType}</p>
                    </div>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-500/10 p-2.5 rounded-xl text-blue-600 dark:text-blue-400">
                      <CloudRain className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-1">Annual Rainfall</p>
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">{parcel.rainfall}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Premium Locked Section */}
              <section className="relative">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Advanced Analytics</h2>
                
                <div className={`space-y-4 ${!isPremium ? 'filter blur-sm select-none opacity-50' : ''}`}>
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-4">Historical Yield Analysis</h3>
                    <div className="h-32 flex items-end gap-2">
                      {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                        <div key={i} className="flex-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-t-sm relative group">
                          <div 
                            className="absolute bottom-0 w-full bg-emerald-500 rounded-t-sm transition-all duration-1000"
                            style={{ height: `${h}%` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-zinc-500 font-medium">
                      <span>2018</span>
                      <span>2024</span>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-4">High-Res Satellite Mapping</h3>
                    <div className="h-48 bg-zinc-200 dark:bg-zinc-800 rounded-xl overflow-hidden relative">
                       <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" alt="Satellite" className="w-full h-full object-cover opacity-50 mix-blend-luminosity" />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> Boundary Overlay Active
                          </div>
                       </div>
                    </div>
                  </div>
                </div>

                {!isPremium && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                    <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl text-center max-w-sm shadow-2xl">
                      <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600 dark:text-amber-500">
                        <Lock className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">Premium Feature</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                        Upgrade to access historical yield data, satellite mapping, and title verification documents.
                      </p>
                      <button 
                        onClick={() => setShowUpgradeModal(true)}
                        className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition-colors shadow-lg shadow-amber-500/25"
                      >
                        Unlock Analytics
                      </button>
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">
                <h3 className="font-bold text-zinc-900 dark:text-zinc-50 mb-6">Quick Stats</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Ruler className="w-4 h-4" />
                        <span className="text-sm font-medium">Total Size</span>
                      </div>
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">{parcel.sizeAcres} Acres</span>
                    </div>
                    <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full w-full"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Sprout className="w-4 h-4" />
                        <span className="text-sm font-medium">Suitability Score</span>
                      </div>
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">{parcel.farmingSuitability}/100</span>
                    </div>
                    <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${parcel.farmingSuitability}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <a 
                    href={`mailto:SamAgabaK@gmail.com?subject=Inquiry about ${encodeURIComponent(parcel.name)} (${parcel.id})`}
                    className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    Contact Agent <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20 rounded-3xl p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-1">Blockchain Verified</h4>
                    <p className="text-sm text-emerald-700 dark:text-emerald-400/80 leading-relaxed">
                      This property's title and history are immutably recorded on TerraChain, ensuring zero risk of fraud.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
