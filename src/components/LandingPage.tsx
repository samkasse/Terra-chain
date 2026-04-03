import React from 'react';
import { ViewState, TenureType } from '../types';
import { Shield, Map, FileText, Scale, Lock, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  setCurrentView: (view: ViewState) => void;
  setTenureFilter: (tenure: TenureType | 'All') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setCurrentView, setTenureFilter }) => {
  const handleTenureClick = (tenure: TenureType) => {
    setTenureFilter(tenure);
    setCurrentView('marketplace');
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000" 
            alt="Ugandan Landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 via-zinc-900/60 to-zinc-950"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Secure Land Management & <span className="text-emerald-400">Sales in Uganda</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
            Immutable blockchain records, verified titles, and comprehensive agricultural data for every parcel of land.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setCurrentView('marketplace')}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
            >
              Browse Marketplace <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-xl font-semibold transition-all border border-white/10">
              Subscribe to Management
            </button>
          </div>
        </div>
      </section>

      {/* Tenure Types Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Ugandan Land Tenure Systems</h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Understand the four distinct land tenure systems recognized by the Constitution of Uganda before making your investment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { type: 'Mailo', desc: 'Unique to central Uganda. Involves holding registered land in perpetuity with roots in the 1900 Buganda Agreement.' },
            { type: 'Freehold', desc: 'Registered ownership in perpetuity. Allows the owner full powers of disposition and use.' },
            { type: 'Leasehold', desc: 'Land held for a specific period (often 49 or 99 years) under specific conditions and rent.' },
            { type: 'Customary', desc: 'Land owned by indigenous communities and administered in accordance with local customs.' }
          ].map((tenure) => (
            <div 
              key={tenure.type}
              onClick={() => handleTenureClick(tenure.type as TenureType)}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 cursor-pointer hover:border-emerald-500 dark:hover:border-emerald-500 transition-all hover:shadow-lg group"
            >
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 group-hover:text-emerald-500 transition-colors">
                {tenure.type}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {tenure.desc}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                View Listings <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-zinc-100 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Our Services</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              End-to-end solutions for secure land transactions and management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Map, title: 'Buy Land', desc: 'Browse verified listings with immutable history.' },
              { icon: FileText, title: 'Sell Land', desc: 'List your property securely on the blockchain.' },
              { icon: Shield, title: 'Land Management', desc: 'Remote monitoring and yield tracking.', premium: true },
              { icon: Scale, title: 'Surveying', desc: 'Professional boundary marking and verification.' },
              { icon: Map, title: 'Mapping', desc: 'High-resolution satellite and drone mapping.', premium: true },
              { icon: FileText, title: 'Legal & Title', desc: 'Assistance with title transfers and due diligence.' },
            ].map((service, i) => (
              <div key={i} className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
                {service.premium && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-md">
                    <Lock className="w-3 h-3" /> Premium
                  </div>
                )}
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">{service.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
