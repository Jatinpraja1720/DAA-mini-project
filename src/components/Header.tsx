import React from 'react';
import { Menu, PlusCircle, Search } from 'lucide-react';

interface HeaderProps {
  onOpenMobileNav: () => void;
  onNavigateReport: (type: 'lost' | 'found') => void;
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileNav, onNavigateReport, title }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={onOpenMobileNav}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={() => onNavigateReport('lost')}
          className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report Lost</span>
        </button>
        <button
          onClick={() => onNavigateReport('found')}
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition"
        >
          <Search className="w-4 h-4" />
          <span>Report Found</span>
        </button>
      </div>
    </header>
  );
};
