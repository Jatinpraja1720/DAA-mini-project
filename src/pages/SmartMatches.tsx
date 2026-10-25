import React from 'react';
import { MatchResult, ItemReport } from '../types';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SmartMatchesProps {
  matches: MatchResult[];
  onSelectItem: (item: ItemReport) => void;
}

export const SmartMatches: React.FC<SmartMatchesProps> = ({ matches, onSelectItem }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#7C3AED] bg-purple-50 px-2.5 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Automated Algorithmic Cross-Matching</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Smart Match Engine Results</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
            Lost reports are compared against Found reports using KMP Substring matching and a multi-attribute weighted heuristic:
            Name (35%), Description (30%), Category (15%), Colour (10%), Location (5%), and Brand (5%).
          </p>
        </div>

        <div className="flex items-center space-x-4 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-200 text-center">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Matches Found</span>
            <span className="text-2xl font-black text-[#2563EB]">{matches.length}</span>
          </div>
        </div>
      </div>

      {matches.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200">
          <p className="text-slate-500 font-medium">
            No active cross-matches above the 45% threshold. Report new lost or found items to see suggestions.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {matches.map((m, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                      m.tier === 'High Match'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {m.tier} • {m.overallScore}%
                  </span>
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    Algorithm: {m.algorithmUsed}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  Weights: Name 35% | Desc 30% | Cat 15% | Color 10% | Loc 5% | Brand 5%
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Lost Item Summary */}
                <div className="p-4 rounded-2xl bg-red-50/50 border border-red-100">
                  <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block mb-1">
                    Lost Report ({m.lostItem.id})
                  </span>
                  <h4 className="font-bold text-base text-slate-900">{m.lostItem.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{m.lostItem.description}</p>
                  <div className="mt-3 text-xs text-slate-500 space-y-0.5">
                    <p>📍 {m.lostItem.location}</p>
                    <p>🎨 {m.lostItem.color} • Brand: {m.lostItem.brand || 'N/A'}</p>
                  </div>
                  <button
                    onClick={() => onSelectItem(m.lostItem)}
                    className="mt-3 text-xs font-semibold text-[#2563EB] hover:underline"
                  >
                    View Lost Report Details &rarr;
                  </button>
                </div>

                {/* Found Item Summary */}
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                    Found Report ({m.foundItem.id})
                  </span>
                  <h4 className="font-bold text-base text-slate-900">{m.foundItem.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{m.foundItem.description}</p>
                  <div className="mt-3 text-xs text-slate-500 space-y-0.5">
                    <p>📍 {m.foundItem.location}</p>
                    <p>🎨 {m.foundItem.color} • Brand: {m.foundItem.brand || 'N/A'}</p>
                  </div>
                  <button
                    onClick={() => onSelectItem(m.foundItem)}
                    className="mt-3 text-xs font-semibold text-emerald-700 hover:underline"
                  >
                    View Found Report Details &rarr;
                  </button>
                </div>
              </div>

              {/* Match Explanation & Keywords */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold">Matched Tokens: </span>
                  {m.breakdown.matchedKeywords.length > 0 ? (
                    m.breakdown.matchedKeywords.map((k) => (
                      <span
                        key={k}
                        className="inline-block bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-mono mr-1"
                      >
                        {k}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 italic">None</span>
                  )}
                </div>

                <div className="text-slate-600 font-medium">
                  💡 {m.explanation}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
