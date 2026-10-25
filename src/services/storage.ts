import { ItemReport, Claim } from '../types';

const STORAGE_KEYS = {
  ITEMS: 'campusfind_items_v1',
  CLAIMS: 'campusfind_claims_v1',
};

export const INITIAL_DEMO_ITEMS: ItemReport[] = [
  {
    id: 'REP-1001',
    type: 'lost',
    title: 'Apple MacBook Air M2 Space Grey',
    category: 'Electronics',
    description: 'Left inside the Central Library reading hall on the 2nd floor desk. Has an orange Rust sticker on the top cover.',
    location: 'Central Library, 2nd Floor Desk',
    date: '2026-10-22',
    color: 'Space Grey',
    brand: 'Apple',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    contactName: 'Aarav Sharma',
    contactInfo: 'aarav.sharma@campus.edu',
    status: 'Potential Match',
    createdAt: '2026-10-22T10:30:00.000Z',
  },
  {
    id: 'REP-1002',
    type: 'found',
    title: 'MacBook Air Space Grey Laptop',
    category: 'Electronics',
    description: 'Found a space grey Apple laptop with stickers on the lid left behind on desk 14 near the library journal rack.',
    location: 'Central Library Desk 14',
    date: '2026-10-22',
    color: 'Space Grey',
    brand: 'Apple',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    contactName: 'Security Desk (Officer Ramesh)',
    contactInfo: 'security@campus.edu',
    status: 'Potential Match',
    createdAt: '2026-10-22T13:15:00.000Z',
  },
  {
    id: 'REP-1003',
    type: 'lost',
    title: 'Blue Campus Student ID Card',
    category: 'ID Cards',
    description: 'Lost my university RFID identification card bearing Department of Computer Science logo.',
    location: 'Cafeteria Block A',
    date: '2026-10-23',
    color: 'Blue',
    brand: 'College Admin',
    contactName: 'Priya Verma',
    contactInfo: 'priya.v@campus.edu',
    status: 'Open',
    createdAt: '2026-10-23T09:00:00.000Z',
  },
  {
    id: 'REP-1004',
    type: 'found',
    title: 'Student Identity Card',
    category: 'ID Cards',
    description: 'Found blue lanyard with student RFID smartcard lying on table near juice counter in cafeteria.',
    location: 'Cafeteria Juice Counter',
    date: '2026-10-23',
    color: 'Blue',
    brand: 'College Admin',
    contactName: 'Ananya Roy',
    contactInfo: 'ananya.roy@campus.edu',
    status: 'Open',
    createdAt: '2026-10-23T11:45:00.000Z',
  },
  {
    id: 'REP-1005',
    type: 'lost',
    title: 'Casio Scientific Calculator fx-991EX',
    category: 'Electronics',
    description: 'Black calculator with silver buttons. Formula cheat sheet pasted on the sliding cover.',
    location: 'Auditorium Hall 3',
    date: '2026-10-21',
    color: 'Black',
    brand: 'Casio',
    contactName: 'Rohan Gupta',
    contactInfo: 'rohan.g@campus.edu',
    status: 'Open',
    createdAt: '2026-10-21T16:00:00.000Z',
  },
  {
    id: 'REP-1006',
    type: 'lost',
    title: 'Black Titan Leather Wallet',
    category: 'Wallets',
    description: 'Contains metro card, college bus pass, and driver license. Very urgent.',
    location: 'Sports Complex Badminton Court',
    date: '2026-10-20',
    color: 'Black',
    brand: 'Titan',
    contactName: 'Kunal Patil',
    contactInfo: 'kunal.p@campus.edu',
    status: 'Resolved',
    createdAt: '2026-10-20T14:20:00.000Z',
  },
  {
    id: 'REP-1007',
    type: 'found',
    title: 'Leather Wallet (Black)',
    category: 'Wallets',
    description: 'Found near badminton court benches. Handed over to coach.',
    location: 'Sports Complex',
    date: '2026-10-20',
    color: 'Black',
    brand: 'Titan',
    contactName: 'Coach Vikram',
    contactInfo: 'sports@campus.edu',
    status: 'Resolved',
    createdAt: '2026-10-20T15:30:00.000Z',
  },
];

export const INITIAL_DEMO_CLAIMS: Claim[] = [
  {
    id: 'CLM-501',
    reportId: 'REP-1007',
    claimantName: 'Kunal Patil',
    claimantContact: 'kunal.p@campus.edu',
    proofDescription: 'Verified driving license name matches enrollment register.',
    status: 'Approved',
    createdAt: '2026-10-20T17:00:00.000Z',
  },
];

export const StorageService = {
  getItems(): ItemReport[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ITEMS);
      if (!data) {
        this.saveItems(INITIAL_DEMO_ITEMS);
        return INITIAL_DEMO_ITEMS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_DEMO_ITEMS;
    }
  },

  saveItems(items: ItemReport[]): void {
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items));
  },

  addItem(item: ItemReport): void {
    const items = this.getItems();
    items.unshift(item);
    this.saveItems(items);
  },

  updateItem(updated: ItemReport): void {
    const items = this.getItems().map((item) => (item.id === updated.id ? updated : item));
    this.saveItems(items);
  },

  deleteItem(id: string): void {
    const items = this.getItems().filter((item) => item.id !== id);
    this.saveItems(items);
  },

  getClaims(): Claim[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CLAIMS);
      if (!data) {
        this.saveClaims(INITIAL_DEMO_CLAIMS);
        return INITIAL_DEMO_CLAIMS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_DEMO_CLAIMS;
    }
  },

  saveClaims(claims: Claim[]): void {
    localStorage.setItem(STORAGE_KEYS.CLAIMS, JSON.stringify(claims));
  },

  addClaim(claim: Claim): void {
    const claims = this.getClaims();
    claims.unshift(claim);
    this.saveClaims(claims);
  },

  updateClaimStatus(claimId: string, status: 'Approved' | 'Rejected'): void {
    const claims = this.getClaims().map((c) => (c.id === claimId ? { ...c, status } : c));
    this.saveClaims(claims);
  },

  resetDemoData(): void {
    this.saveItems(INITIAL_DEMO_ITEMS);
    this.saveClaims(INITIAL_DEMO_CLAIMS);
  },
};
