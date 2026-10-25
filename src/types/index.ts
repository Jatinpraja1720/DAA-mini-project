export type ItemType = 'lost' | 'found';

export type ItemCategory =
  | 'Electronics'
  | 'ID Cards'
  | 'Books and Stationery'
  | 'Bags'
  | 'Clothing'
  | 'Keys'
  | 'Wallets'
  | 'Accessories'
  | 'Other';

export type ReportStatus = 'Open' | 'Potential Match' | 'Claimed' | 'Resolved';

export interface ItemReport {
  id: string;
  type: ItemType;
  title: string;
  category: ItemCategory;
  description: string;
  location: string;
  date: string;
  color: string;
  brand?: string;
  imageUrl?: string;
  contactName: string;
  contactInfo: string;
  status: ReportStatus;
  createdAt: string;
}

export interface Claim {
  id: string;
  reportId: string;
  claimantName: string;
  claimantContact: string;
  proofDescription: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
}

export interface AlgorithmStep {
  step: number;
  description: string;
  textIndex: number;
  patternIndex: number;
  isMatch: boolean;
}

export interface AlgorithmResult {
  algorithm: 'Naive' | 'KMP' | 'Rabin-Karp';
  matches: number[];
  comparisons: number;
  hashCollisions?: number;
  executionTimeMs: number;
  steps?: AlgorithmStep[];
  lpsArray?: number[];
}

export interface MatchBreakdown {
  nameScore: number;
  descriptionScore: number;
  categoryScore: number;
  colorScore: number;
  locationScore: number;
  brandScore: number;
  matchedKeywords: string[];
}

export interface MatchResult {
  lostItem: ItemReport;
  foundItem: ItemReport;
  overallScore: number;
  tier: 'High Match' | 'Medium Match' | 'Low Match';
  breakdown: MatchBreakdown;
  algorithmUsed: string;
  explanation: string;
}
