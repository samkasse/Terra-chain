import React from 'react';
import { X, CheckCircle2, Shield, Map, LineChart, Scale } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, onUpgrade }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="absolute inset-0 bg-zinc-900/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 text-center bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/20 dark:to-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-600 dark:text-amber-500 shadow-inner">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Upgrade to Premium</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Unlock the full power of TerraChain's agricultural intelligence and secure land management tools.
          </p>
        </div>

        <div className="p-8">
          <ul className="space-y-4 mb-8">
            {[
              { icon: Map, text: 'View All Land Listings' },
              { icon: LineChart, text: 'Historical Yield Analysis' },
              { icon: Scale, text: 'Advanced Comparison Tools' },
              { icon: Shield, text: 'Remote Land Management' },
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">{feature.text}</span>
              </li>
            ))}
          </ul>

          <button 
            onClick={onUpgrade}
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-colors shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
          >
            Pay $49/mo
          </button>
          <p className="text-center text-xs text-zinc-500 dark:text-zinc-500 mt-4">
            Cancel anytime. Secure payment via Stripe.
          </p>
        </div>
      </div>
    </div>
  );
};
