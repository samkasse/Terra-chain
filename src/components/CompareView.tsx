import React from 'react';
import { LandParcel, ViewState } from '../types';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';

interface CompareViewProps {
  compareParcels: LandParcel[];
  setCurrentView: (view: ViewState) => void;
  setCompareParcels: (parcels: LandParcel[]) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  compareParcels,
  setCurrentView,
  setCompareParcels,
}) => {
  if (compareParcels.length === 0) {
    setCurrentView('marketplace');
    return null;
  }

  const removeParcel = (id: string) => {
    const updated = compareParcels.filter(p => p.id !== id);
    setCompareParcels(updated);
    if (updated.length === 0) {
      setCurrentView('marketplace');
    }
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentView('marketplace')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all shadow-sm hover:shadow"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Marketplace
          </button>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Compare Parcels</h1>
        </div>
      </div>

      <div className="overflow-x-auto pb-8">
        <div className="min-w-[800px] bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          
          {/* Header Row (Images & Names) */}
          <div className="grid grid-cols-4 border-b border-zinc-200 dark:border-zinc-800">
            <div className="p-6 bg-zinc-50 dark:bg-zinc-950 flex items-end">
              <h3 className="font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-sm">Features</h3>
            </div>
            {compareParcels.map((parcel) => (
              <div key={parcel.id} className="p-6 relative border-l border-zinc-200 dark:border-zinc-800">
                <button 
                  onClick={() => removeParcel(parcel.id)}
                  className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 transition-colors bg-white/80 dark:bg-zinc-900/80 rounded-full backdrop-blur-sm z-10"
                >
                  <XCircle className="w-6 h-6" />
                </button>
                <div className="relative h-32 rounded-xl overflow-hidden mb-4">
                  <img src={parcel.image} alt={parcel.name} className="w-full h-full object-cover" />
                </div>
                <h2 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 line-clamp-1">{parcel.name}</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1">{parcel.location}</p>
              </div>
            ))}
            {/* Empty slots if less than 3 */}
            {Array.from({ length: 3 - compareParcels.length }).map((_, i) => (
              <div key={`empty-${i}`} className="p-6 border-l border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/50">
                <p className="text-sm text-zinc-400 dark:text-zinc-600 font-medium text-center">
                  Add another parcel<br/>to compare
                </p>
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {[
            { label: 'Price (USD)', key: 'price', format: (val: any) => `$${val.toLocaleString()}` },
            { label: 'Size (Acres)', key: 'sizeAcres', format: (val: any) => `${val} Acres` },
            { label: 'Tenure Type', key: 'tenureType', format: (val: any) => (
              <span className="inline-block bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-md text-xs font-bold">
                {val}
              </span>
            )},
            { label: 'Suitability Score', key: 'farmingSuitability', format: (val: any) => (
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden max-w-[100px]">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${val}%` }}></div>
                </div>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{val}/100</span>
              </div>
            )},
            { label: 'Soil Type', key: 'soilType', format: (val: any) => val },
            { label: 'Annual Rainfall', key: 'rainfall', format: (val: any) => val },
          ].map((row, rowIndex) => (
            <div key={row.key} className={`grid grid-cols-4 border-b border-zinc-200 dark:border-zinc-800 last:border-0 ${rowIndex % 2 === 0 ? 'bg-white dark:bg-zinc-900' : 'bg-zinc-50/50 dark:bg-zinc-950/50'}`}>
              <div className="p-6 flex items-center">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">{row.label}</span>
              </div>
              {compareParcels.map((parcel) => (
                <div key={`${parcel.id}-${row.key}`} className="p-6 border-l border-zinc-200 dark:border-zinc-800 flex items-center">
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium">
                    {row.format((parcel as any)[row.key])}
                  </span>
                </div>
              ))}
              {Array.from({ length: 3 - compareParcels.length }).map((_, i) => (
                <div key={`empty-cell-${i}`} className="p-6 border-l border-zinc-200 dark:border-zinc-800"></div>
              ))}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};
