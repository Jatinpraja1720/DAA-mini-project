import React, { useState } from 'react';
import { ItemReport, MatchResult } from '../types';
import { computeMatchScore } from '../services/matcher';
import {
  X,
  MapPin,
  Calendar,
  Tag,
  Palette,
  Sparkles,
  ShieldAlert,
  CheckCircle,
} from 'lucide-react';

interface ItemDetailsModalProps {
  item: ItemReport | null;
  allItems: ItemReport[];
  onClose: () => void;
  onSubmitClaim: (reportId: string, claimantName: string, claimantContact: string, reason: string) => void;
  onStatusChange: (itemId: string, status: ItemReport['status']) => void;
}

export const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({
  item,
  allItems,
  onClose,
  onSubmitClaim,
  onStatusChange,
}) => {
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [claimantName, setClaimantName] = useState('');
  const [claimantContact, setClaimantContact] = useState('');
  const [proofReason, setProofReason] = useState('');

  if (!item) return null;

  // Find relevant counter-matches
  const oppositeType = item.type === 'lost' ? 'found' : 'lost';
  const candidateMatches: MatchResult[] = allItems
    .filter((candidate) => candidate.type === oppositeType && candidate.status !== 'Resolved')
    .map((candidate) =>
      item.type === 'lost'
        ? computeMatchScore(item, candidate)
        : computeMatchScore(candidate, item)
    )
    .filter((m) => m.overallScore >= 40)
    .sort((a, b) => b.overallScore - a.overallScore);

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimantName || !claimantContact || !proofReason) return;
    onSubmitClaim(item.id, claimantName, claimantContact, proofReason);
    setShowClaimForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8">
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span
                className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                  item.type === 'lost'
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                }`}
              >
                {item.type.toUpperCase()}
              </span>
              <span className="text-xs font-mono text-slate-400">ID: {item.id}</span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                  item.status === 'Resolved'
                    ? 'bg-emerald-100 text-emerald-700'
                    : item.status === 'Potential Match'
                    ? 'bg-purple-100 text-[#7C3AED]'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {item.status}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">{item.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {item.imageUrl && (
          <div className="mt-4 rounded-xl overflow-hidden max-h-56 w-full bg-slate-100 border border-slate-200">
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block mb-1">Category</span>
            <span className="font-semibold text-slate-800">{item.category}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block mb-1">Colour</span>
            <span className="font-semibold text-slate-800">{item.color}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block mb-1">Brand</span>
            <span className="font-semibold text-slate-800">{item.brand || 'Not Specified'}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block mb-1">Date Logged</span>
            <span className="font-semibold text-slate-800">{item.date}</span>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</h4>
            <p className="text-sm text-slate-700 mt-1 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {item.description}
            </p>
          </div>

          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <MapPin className="w-4 h-4 text-[#2563EB]" />
            <span className="font-medium">Location: {item.location}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs">
            <span className="font-semibold text-[#2563EB] block mb-0.5">Authorised Contact Record</span>
            <p className="text-slate-600">
              Reported by: <strong className="text-slate-800">{item.contactName}</strong> ({item.contactInfo})
            </p>
          </div>
        </div>

        {/* Counter Matches Section */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <h4 className="text-sm font-bold text-slate-800 flex items-center space-x-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#7C3AED]" />
            <span>Algorithmic Matches for this Record ({candidateMatches.length})</span>
          </h4>

          {candidateMatches.length === 0 ? (
            <p className="text-xs text-slate-500 italic bg-slate-50 p-3 rounded-lg">
              No overlapping {oppositeType} reports found with similarity above 40%.
            </p>
          ) : (
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {candidateMatches.map((match) => {
                const target = item.type === 'lost' ? match.foundItem : match.lostItem;
                return (
                  <div
                    key={target.id}
                    className="p-3 rounded-xl border border-purple-100 bg-purple-50/40 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-800">{target.title}</p>
                      <p className="text-slate-500 text-[11px]">{target.location} • {target.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-purple-700 text-sm">{match.overallScore}%</span>
                      <span className="block text-[10px] text-purple-600 font-semibold">{match.tier}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Claim / Resolve Action Bar */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            {item.status !== 'Resolved' ? (
              <button
                onClick={() => onStatusChange(item.id, 'Resolved')}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 flex items-center space-x-1"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Mark as Resolved</span>
              </button>
            ) : (
              <button
                onClick={() => onStatusChange(item.id, 'Open')}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300"
              >
                Reopen Report
              </button>
            )}
          </div>

          {item.type === 'found' && item.status !== 'Resolved' && (
            <button
              onClick={() => setShowClaimForm(!showClaimForm)}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#2563EB] text-white hover:bg-blue-700 flex items-center space-x-1.5 shadow-md shadow-blue-500/20"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{showClaimForm ? 'Hide Claim Form' : 'Submit Claim Request'}</span>
            </button>
          )}
        </div>

        {showClaimForm && (
          <form onSubmit={handleClaimSubmit} className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h5 className="text-xs font-bold text-slate-800 uppercase">Verification Claim Filing</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Your Full Name"
                value={claimantName}
                onChange={(e) => setClaimantName(e.target.value)}
                className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                required
                placeholder="Your Contact / Email"
                value={claimantContact}
                onChange={(e) => setClaimantContact(e.target.value)}
                className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <textarea
              required
              rows={2}
              placeholder="Describe private identifiable marks, serial numbers, wallpapers, contents, etc."
              value={proofReason}
              onChange={(e) => setProofReason(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold bg-[#2563EB] text-white rounded-lg hover:bg-blue-700"
              >
                Submit Claim for Admin Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
