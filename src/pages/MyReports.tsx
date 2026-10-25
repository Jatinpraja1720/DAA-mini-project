import React from 'react';
import { ItemReport } from '../types';
import { Trash2, Eye, MapPin, Calendar } from 'lucide-react';

interface MyReportsProps {
  items: ItemReport[];
  onSelectItem: (item: ItemReport) => void;
  onDeleteItem: (id: string) => void;
  onStatusChange: (id: string, status: ItemReport['status']) => void;
}

export const MyReports: React.FC<MyReportsProps> = ({
  items,
  onSelectItem,
  onDeleteItem,
  onStatusChange,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Manage Campus Reports</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            View, track resolution status, or remove your submitted lost and found logs.
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
          Total Logs: {items.length}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200">
          <p className="text-slate-500">No reports on record.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Report Details</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Location & Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-4">
                      <p className="font-bold text-sm text-slate-900">{item.title}</p>
                      <p className="text-slate-400 text-[11px] font-mono">{item.id} • {item.category}</p>
                    </td>
                    <td className="p-4">
                      <span
                        className={`font-bold uppercase text-[10px] px-2 py-0.5 rounded ${
                          item.type === 'lost' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.date}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <select
                        value={item.status}
                        onChange={(e) => onStatusChange(item.id, e.target.value as any)}
                        className="text-xs font-semibold rounded-lg border border-slate-200 bg-white p-1"
                      >
                        <option value="Open">Open</option>
                        <option value="Potential Match">Potential Match</option>
                        <option value="Claimed">Claimed</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => onSelectItem(item)}
                        className="p-1.5 text-slate-500 hover:text-[#2563EB] hover:bg-blue-50 rounded-lg transition"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete Report"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
