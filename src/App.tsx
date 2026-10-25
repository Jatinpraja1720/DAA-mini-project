import React, { useState, useEffect } from 'react';
import { ItemReport, MatchResult, Claim } from './types';
import { StorageService } from './services/storage';
import { runMatchingEngine } from './services/matcher';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Toast } from './components/Toast';
import { ConfirmModal } from './components/ConfirmModal';
import { ItemDetailsModal } from './components/ItemDetailsModal';

import { Dashboard } from './pages/Dashboard';
import { AllItems } from './pages/AllItems';
import { ReportItem } from './pages/ReportItem';
import { SmartMatches } from './pages/SmartMatches';
import { MyReports } from './pages/MyReports';
import { Claims } from './pages/Claims';
import { AlgorithmAnalysis } from './pages/AlgorithmAnalysis';
import { AboutProject } from './pages/AboutProject';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [items, setItems] = useState<ItemReport[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [matches, setMatches] = useState<MatchResult[]>([]);

  // Modals & Notifications
  const [selectedItem, setSelectedItem] = useState<ItemReport | null>(null);
  const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Load Initial Data
  useEffect(() => {
    const loadedItems = StorageService.getItems();
    const loadedClaims = StorageService.getClaims();
    setItems(loadedItems);
    setClaims(loadedClaims);
    setMatches(runMatchingEngine(loadedItems));
  }, []);

  const refreshAll = (updatedItems: ItemReport[]) => {
    setItems(updatedItems);
    StorageService.saveItems(updatedItems);
    setMatches(runMatchingEngine(updatedItems));
  };

  const handleCreateReport = (newItem: ItemReport) => {
    const updated = [newItem, ...items];
    refreshAll(updated);
    setToastMessage({ message: `Report ${newItem.id} logged successfully!`, type: 'success' });
    setCurrentTab('smart-matches');
  };

  const handleUpdateStatus = (id: string, status: ItemReport['status']) => {
    const updated = items.map((i) => (i.id === id ? { ...i, status } : i));
    refreshAll(updated);
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem({ ...selectedItem, status });
    }
    setToastMessage({ message: `Report status updated to '${status}'.`, type: 'success' });
  };

  const handleDeleteItem = (id: string) => {
    setItemToDelete(id);
  };

  const confirmDeleteItem = () => {
    if (!itemToDelete) return;
    const updated = items.filter((i) => i.id !== itemToDelete);
    refreshAll(updated);
    setItemToDelete(null);
    setSelectedItem(null);
    setToastMessage({ message: 'Record deleted permanently.', type: 'success' });
  };

  const handleResetData = () => {
    StorageService.resetDemoData();
    const reloaded = StorageService.getItems();
    setItems(reloaded);
    setClaims(StorageService.getClaims());
    setMatches(runMatchingEngine(reloaded));
    setIsResetModalOpen(false);
    setToastMessage({ message: 'Demo dataset restored to initial state.', type: 'success' });
  };

  const handleSubmitClaim = (reportId: string, claimantName: string, claimantContact: string, proof: string) => {
    const newClaim: Claim = {
      id: `CLM-${Math.floor(100 + Math.random() * 900)}`,
      reportId,
      claimantName,
      claimantContact,
      proofDescription: proof,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    StorageService.addClaim(newClaim);
    setClaims(StorageService.getClaims());
    setToastMessage({ message: 'Claim submitted for administrative review.', type: 'success' });
  };

  const handleUpdateClaimStatus = (claimId: string, status: 'Approved' | 'Rejected') => {
    StorageService.updateClaimStatus(claimId, status);
    setClaims(StorageService.getClaims());

    if (status === 'Approved') {
      const claim = claims.find((c) => c.id === claimId);
      if (claim) {
        handleUpdateStatus(claim.reportId, 'Resolved');
      }
    }
    setToastMessage({ message: `Claim marked as ${status}.`, type: 'success' });
  };

  const getPageTitle = () => {
    switch (currentTab) {
      case 'dashboard': return 'Campus Dashboard';
      case 'all-items': return 'Campus Belongings Registry';
      case 'report-lost': return 'Report Lost Item';
      case 'report-found': return 'Report Found Item';
      case 'smart-matches': return 'Smart Matching Engine';
      case 'my-reports': return 'Report Management';
      case 'claims': return 'Claims & Verification';
      case 'algorithm-analysis': return 'DAA Algorithm Analysis';
      case 'about-project': return 'About CampusFind Project';
      default: return 'CampusFind';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onResetData={() => setIsResetModalOpen(true)}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        <Header
          title={getPageTitle()}
          onOpenMobileNav={() => setIsMobileOpen(true)}
          onNavigateReport={(type) => setCurrentTab(type === 'lost' ? 'report-lost' : 'report-found')}
        />

        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && (
            <Dashboard
              items={items}
              matches={matches}
              onNavigate={setCurrentTab}
              onSelectItem={setSelectedItem}
            />
          )}

          {currentTab === 'all-items' && (
            <AllItems
              items={items}
              onSelectItem={setSelectedItem}
              onDeleteItem={handleDeleteItem}
            />
          )}

          {currentTab === 'report-lost' && (
            <ReportItem type="lost" onSubmit={handleCreateReport} />
          )}

          {currentTab === 'report-found' && (
            <ReportItem type="found" onSubmit={handleCreateReport} />
          )}

          {currentTab === 'smart-matches' && (
            <SmartMatches matches={matches} onSelectItem={setSelectedItem} />
          )}

          {currentTab === 'my-reports' && (
            <MyReports
              items={items}
              onSelectItem={setSelectedItem}
              onDeleteItem={handleDeleteItem}
              onStatusChange={handleUpdateStatus}
            />
          )}

          {currentTab === 'claims' && (
            <Claims
              claims={claims}
              items={items}
              onUpdateClaimStatus={handleUpdateClaimStatus}
            />
          )}

          {currentTab === 'algorithm-analysis' && <AlgorithmAnalysis />}

          {currentTab === 'about-project' && <AboutProject />}
        </main>
      </div>

      {/* Item Details Modal */}
      <ItemDetailsModal
        item={selectedItem}
        allItems={items}
        onClose={() => setSelectedItem(null)}
        onSubmitClaim={handleSubmitClaim}
        onStatusChange={handleUpdateStatus}
      />

      {/* Confirmation Modals */}
      <ConfirmModal
        isOpen={isResetModalOpen}
        title="Reset Demo Records?"
        message="This will overwrite current reports and revert to initial college sample records."
        confirmLabel="Reset Everything"
        onConfirm={handleResetData}
        onCancel={() => setIsResetModalOpen(false)}
      />

      <ConfirmModal
        isOpen={itemToDelete !== null}
        title="Delete Item Report?"
        message="Are you sure you want to permanently delete this report? This action cannot be reversed."
        confirmLabel="Delete"
        onConfirm={confirmDeleteItem}
        onCancel={() => setItemToDelete(null)}
      />

      {/* Notifications */}
      {toastMessage && (
        <Toast
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
};
