import React, { useState } from 'react';
import { ItemCategory, ItemReport, ItemType } from '../types';
import { PlusCircle, Image, CheckCircle } from 'lucide-react';

interface ReportItemProps {
  type: ItemType;
  onSubmit: (item: ItemReport) => void;
}

export const ReportItem: React.FC<ReportItemProps> = ({ type, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ItemCategory>('Electronics');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [color, setColor] = useState('');
  const [brand, setBrand] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const categories: ItemCategory[] = [
    'Electronics',
    'ID Cards',
    'Books and Stationery',
    'Bags',
    'Clothing',
    'Keys',
    'Wallets',
    'Accessories',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !location || !color || !contactName || !contactInfo) {
      alert('Please complete all mandatory fields.');
      return;
    }

    const newReport: ItemReport = {
      id: `REP-${Math.floor(1000 + Math.random() * 9000)}`,
      type,
      title,
      category,
      description,
      location,
      date,
      color,
      brand: brand || undefined,
      imageUrl: imageUrl || undefined,
      contactName,
      contactInfo,
      status: 'Open',
      createdAt: new Date().toISOString(),
    };

    onSubmit(newReport);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm animate-fadeIn">
      <div className="border-b border-slate-100 pb-5">
        <span
          className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
            type === 'lost' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
          }`}
        >
          {type === 'lost' ? 'Lost Item Registration' : 'Found Item Handover'}
        </span>
        <h2 className="text-2xl font-bold text-slate-900 mt-2">
          {type === 'lost' ? 'File a Lost Belonging Report' : 'Register a Recovered Item'}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Accurate descriptions and keywords increase the accuracy of algorithmic match score calculations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Item Name / Model <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Dell Inspiron 15, Blue Samsonite Bag"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ItemCategory)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Detailed Description <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={3}
            placeholder="Include distinctive marks, stickers, unique features, or contents..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {type === 'lost' ? 'Last Seen Location' : 'Location Found'} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Library Floor 2, Cafeteria"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Primary Colour <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Black, Blue, Silver"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Brand (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Apple, Casio, HP, Nike"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Image URL (Optional)
            </label>
            <input
              type="url"
              placeholder="https://example.com/item.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Reporter Contact Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Campus Email or Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. rahul@campus.edu or 9876543210"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#2563EB] text-white font-semibold text-sm hover:bg-blue-700 shadow-md shadow-blue-500/20 transition flex items-center space-x-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Submit {type === 'lost' ? 'Lost Item Report' : 'Found Item Record'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
