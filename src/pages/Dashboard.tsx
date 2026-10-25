import React from 'react';
import { ItemReport, MatchResult } from '../types';
import {
  Search,
  PackageSearch,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Cpu,
  Clock,
  MapPin,
} from 'lucide-react';

interface DashboardProps {
  items: ItemReport[];
  matches: MatchResult[];
  onNavigate: (tab: string) => void;
  onSelectItem: (item: ItemReport) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  items,
  matches,
  onNavigate,
  onSelectItem,
}) => {
  const lostCount = items.filter((i) => i.type === 'lost').length;
  const foundCount = items.filter((i) => i.type === 'found').length;
  const highMatches = matches.filter((m) => m.tier === 'High Match').length;
  const resolvedCount = items.filter((i) => i.status === 'Resolved').length;

  const recentItems = [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  const topMatches = matches.slice(0, 3);

  // Category counts
  const categories: Record<string, number> = {};
  items.forEach((item) => {
    categories[item.category] = (categories[item.category] || 0) + 1;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#2563EB] via-indigo-600 to-[#7C3AED] p-8 text-white shadow-xl shadow-blue-500/10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Powered by DAA String Matching Algorithms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            CampusFind Lost & Found
          </h1>
          <p className="mt-2 text-sm sm:text-base text-blue-100 leading-relaxed">
            Instantly connect lost belongings with recovered items on campus using automated
            KMP and Rabin-Karp heuristic substring matching.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('report-lost')}
              className="px-5 py-2.5 rounded-xl bg-white text-[#2563EB] font-bold text-sm shadow-md hover:bg-blue-50 transition"
            >
              Report Lost Item
            </button>
            <button
              onClick={() => onNavigate('report-found')}
              className="px-5 py-2.5 rounded-xl bg-purple-700/60 border border-white/20 text-white font-bold text-sm hover:bg-purple-700 transition"
            >
              Report Found Item
            </button>
            <button
              onClick={() => onNavigate('smart-matches')}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur transition flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>View Matches ({matches.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Lost</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{lostCount}</h3>
            <p className="text-xs text-red-600 font-medium mt-1">Reported on Campus</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <PackageSearch className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Found</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{foundCount}</h3>
            <p className="text-xs text-emerald-600 font-medium mt-1">Recovered Belongs</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Potential Matches</p>
            <h3 className="text-3xl font-extrabold text-purple-600 mt-1">{matches.length}</h3>
            <p className="text-xs text-purple-700 font-medium mt-1">{highMatches} High Confidence</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Resolved Reports</p>
            <h3 className="text-3xl font-extrabold text-emerald-600 mt-1">{resolvedCount}</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Successfully Returned</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Row: Top Matches & Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Top Algorithm Matches */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-[#2563EB]" />
                <span>Best Matching Results</span>
              </h2>
              <p className="text-xs text-slate-500">Heuristically ranked using KMP String Matcher</p>
            </div>
            <button
              onClick={() => onNavigate('smart-matches')}
              className="text-xs font-bold text-[#2563EB] hover:underline flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {topMatches.length === 0 ? (
            <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-xl">
              No cross-matches found yet. Create lost and found records to trigger the matcher!
            </div>
          ) : (
            <div className="space-y-4">
              {topMatches.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-100 bg-[#F8FAFC] hover:border-blue-200 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#2563EB]">
                      Score: {m.overallScore}% ({m.tier})
                    </span>
                    <span className="text-xs text-slate-400">Weights: Name (35%) Desc (30%) Cat (15%)</span>
                  </div>

                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-lg border border-red-100">
                      <span className="text-[10px] uppercase font-bold text-red-500">Lost Item</span>
                      <p className="font-bold text-sm text-slate-800">{m.lostItem.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{m.lostItem.location}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-emerald-100">
                      <span className="text-[10px] uppercase font-bold text-emerald-600">Found Match</span>
                      <p className="font-bold text-sm text-slate-800">{m.foundItem.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{m.foundItem.location}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 font-medium bg-white/70 p-2 rounded border border-slate-200">
                    💡 {m.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Recently Reported Items */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-slate-500" />
              <span>Recent Reports</span>
            </h2>
            <button
              onClick={() => onNavigate('all-items')}
              className="text-xs font-bold text-[#2563EB] hover:underline"
            >
              See All
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="py-3 cursor-pointer hover:bg-slate-50 -mx-2 px-2 rounded-lg transition"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      item.type === 'lost'
                        ? 'bg-red-50 text-red-600'
                        : 'bg-emerald-50 text-emerald-600'
                    }`}
                  >
                    {item.type}
                  </span>
                  <span className="text-xs text-slate-400">{item.date}</span>
                </div>
                <h4 className="font-semibold text-sm text-slate-800 mt-1 truncate">{item.title}</h4>
                <div className="flex items-center text-xs text-slate-500 space-x-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Overview */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 mb-4">Category Distribution</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {Object.entries(categories).map(([cat, count]) => (
            <div key={cat} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-xs text-slate-500 block truncate">{cat}</span>
              <span className="text-xl font-bold text-slate-800 mt-1 block">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
