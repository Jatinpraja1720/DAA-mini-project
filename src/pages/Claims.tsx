import React from 'react';
import { Claim, ItemReport } from '../types';
import { ShieldAlert, CheckCircle, XCircle } from 'lucide-react';

interface ClaimsProps {
  claims: Claim[];
  items: ItemReport[];
  onUpdateClaimStatus: (claimId: string, status: 'Approved' | 'Rejected') => void;
}

export const Claims: React.FC<ClaimsProps> = ({ claims, items, onUpdateClaimStatus }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Claims & Verification Queue</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Review ownership verification submissions filed by campus students for recovered items.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-50 text-[#7C3AED]">
          {claims.length} Claims Filed
        </span>
      </div>

      {claims.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200">
          <p className="text-slate-500">No claims submitted yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {claims.map((claim) => {
            const relatedItem = items.find((i) => i.id === claim.reportId);
            return (
              <div
                key={claim.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-mono text-slate-400 font-bold">{claim.id}</span>
                    <span className="text-xs text-slate-400 ml-3">
                      Target Report: <strong>{relatedItem?.title || claim.reportId}</strong>
                    </span>
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      claim.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : claim.status === 'Rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {claim.status}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Claimant Details</span>
                    <p className="font-bold text-slate-800 text-sm">{claim.claimantName}</p>
                    <p className="text-slate-500">{claim.claimantContact}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Ownership Justification</span>
                    <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-normal">
                      {claim.proofDescription}
                    </p>
                  </div>
                </div>

                {claim.status === 'Pending' && (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onUpdateClaimStatus(claim.id, 'Rejected')}
                      className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center space-x-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject Claim</span>
                    </button>
                    <button
                      onClick={() => onUpdateClaimStatus(claim.id, 'Approved')}
                      className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 flex items-center space-x-1 shadow-md shadow-emerald-500/10"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Approve & Verify</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
