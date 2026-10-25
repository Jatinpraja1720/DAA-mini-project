import React from 'react';
import {
  LayoutDashboard,
  Boxes,
  PlusCircle,
  HelpCircle,
  Sparkles,
  Folder,
  ShieldCheck,
  Binary,
  Info,
  RotateCcw,
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onResetData: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  onResetData,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'all-items', label: 'All Items', icon: Boxes },
    { id: 'report-lost', label: 'Report Lost', icon: PlusCircle },
    { id: 'report-found', label: 'Report Found', icon: HelpCircle },
    { id: 'smart-matches', label: 'Smart Matches', icon: Sparkles, badge: 'Smart' },
    { id: 'my-reports', label: 'My Reports', icon: Folder },
    { id: 'claims', label: 'Claims Management', icon: ShieldCheck },
    { id: 'algorithm-analysis', label: 'Algorithm Analysis', icon: Binary, highlight: true },
    { id: 'about-project', label: 'About Project', icon: Info },
  ];

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
              CF
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-900 leading-tight">CampusFind</h1>
              <p className="text-xs text-slate-500 font-medium">Smart Matcher • DAA</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-50 text-[#2563EB] shadow-sm font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-5 h-5 ${
                      isActive
                        ? 'text-[#2563EB]'
                        : item.highlight
                        ? 'text-[#7C3AED]'
                        : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-[11px] font-semibold bg-purple-100 text-[#7C3AED] rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-3 bg-slate-50/60">
          <button
            onClick={onResetData}
            className="w-full flex items-center justify-center space-x-2 text-xs font-semibold py-2 px-3 border border-slate-200 rounded-lg text-slate-600 hover:bg-white hover:text-red-600 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
          <div className="text-[11px] text-center text-slate-400">
            College DAA Mini-Project &copy; 2026
          </div>
        </div>
      </aside>
    </>
  );
};
