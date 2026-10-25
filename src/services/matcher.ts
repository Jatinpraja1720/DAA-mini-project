import { ItemReport, MatchResult, MatchBreakdown } from '../types';
import { kmpStringMatch } from '../algorithms/stringMatching';

// Configuration thresholds
export const MATCH_THRESHOLDS = {
  HIGH: 75,
  MEDIUM: 45,
};

// Initial weights configuration (sum = 100)
export const MATCH_WEIGHTS = {
  NAME: 35,
  DESCRIPTION: 30,
  CATEGORY: 15,
  COLOR: 10,
  LOCATION: 5,
  BRAND: 5,
};

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'in', 'on', 'at', 'with', 'and', 'or', 'for', 'to', 'of',
  'is', 'it', 'my', 'was', 'near', 'by', 'has', 'have', 'lost', 'found',
]);

/**
 * Text normalisation and keyword extraction
 */
export function cleanAndTokenize(text: string): string[] {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
}

/**
 * Compares two text blocks using the KMP string search algorithm
 */
function calculateTextSimilarityKMP(textA: string, textB: string): { score: number; keywords: string[] } {
  const tokensA = cleanAndTokenize(textA);
  const tokensB = cleanAndTokenize(textB);

  if (tokensA.length === 0 || tokensB.length === 0) {
    return { score: 0, keywords: [] };
  }

  const matchedKeywords: string[] = [];
  const searchCorpus = textB.toLowerCase();

  for (const token of tokensA) {
    const kmpRes = kmpStringMatch(searchCorpus, token);
    if (kmpRes.matches.length > 0) {
      matchedKeywords.push(token);
    }
  }

  // Jaccard-inspired keyword similarity ratio
  const uniqueMatches = Array.from(new Set(matchedKeywords));
  const uniqueTotal = Array.from(new Set([...tokensA, ...tokensB])).length;
  const score = uniqueTotal > 0 ? (uniqueMatches.length / uniqueTotal) * 100 : 0;

  return {
    score: Math.min(100, Math.round(score * 1.5)), // Scaled for realistic campus descriptions
    keywords: uniqueMatches,
  };
}

/**
 * Smart Lost-and-Found Matching Function
 * Compares a Lost Item report against a Found Item report
 */
export function computeMatchScore(lost: ItemReport, found: ItemReport): MatchResult {
  const nameSim = calculateTextSimilarityKMP(lost.title, found.title);
  const descSim = calculateTextSimilarityKMP(lost.description, found.description);

  // Exact or Partial Category Match
  const categoryScore = lost.category.toLowerCase() === found.category.toLowerCase() ? 100 : 0;

  // Colour Match
  let colorScore = 0;
  if (lost.color && found.color) {
    const c1 = lost.color.toLowerCase().trim();
    const c2 = found.color.toLowerCase().trim();
    if (c1 === c2 || c1.includes(c2) || c2.includes(c1)) {
      colorScore = 100;
    }
  }

  // Location Relevance
  let locationScore = 0;
  if (lost.location && found.location) {
    const l1 = cleanAndTokenize(lost.location);
    const l2 = cleanAndTokenize(found.location);
    const commonLoc = l1.filter((loc) => l2.includes(loc));
    if (commonLoc.length > 0) {
      locationScore = 100;
    }
  }

  // Brand Match (handles missing optional fields safely)
  let brandScore = 0;
  let brandWeightApplied = MATCH_WEIGHTS.BRAND;
  if (!lost.brand && !found.brand) {
    // If neither specified brand, do not penalise: allocate weight proportionally
    brandWeightApplied = 0;
  } else if (lost.brand && found.brand) {
    if (lost.brand.toLowerCase().trim() === found.brand.toLowerCase().trim()) {
      brandScore = 100;
    }
  }

  // Weighted total normalisation
  const totalPossibleWeight =
    MATCH_WEIGHTS.NAME +
    MATCH_WEIGHTS.DESCRIPTION +
    MATCH_WEIGHTS.CATEGORY +
    MATCH_WEIGHTS.COLOR +
    MATCH_WEIGHTS.LOCATION +
    brandWeightApplied;

  const rawWeightedSum =
    nameSim.score * (MATCH_WEIGHTS.NAME / 100) +
    descSim.score * (MATCH_WEIGHTS.DESCRIPTION / 100) +
    categoryScore * (MATCH_WEIGHTS.CATEGORY / 100) +
    colorScore * (MATCH_WEIGHTS.COLOR / 100) +
    locationScore * (MATCH_WEIGHTS.LOCATION / 100) +
    brandScore * (brandWeightApplied / 100);

  const overallScore = Math.min(100, Math.round((rawWeightedSum / totalPossibleWeight) * 100));

  let tier: 'High Match' | 'Medium Match' | 'Low Match' = 'Low Match';
  if (overallScore >= MATCH_THRESHOLDS.HIGH) {
    tier = 'High Match';
  } else if (overallScore >= MATCH_THRESHOLDS.MEDIUM) {
    tier = 'Medium Match';
  }

  const allMatchedKeywords = Array.from(new Set([...nameSim.keywords, ...descSim.keywords]));

  const reasons: string[] = [];
  if (categoryScore === 100) reasons.push(`Identical category (${lost.category})`);
  if (nameSim.score > 40) reasons.push('High title keyword overlap');
  if (colorScore === 100) reasons.push(`Matched colour attribute (${lost.color})`);
  if (brandScore === 100) reasons.push(`Brand confirmed (${lost.brand})`);
  if (locationScore === 100) reasons.push('Nearby campus location detected');

  const explanation =
    reasons.length > 0
      ? `Match determined based on ${reasons.join(', ')}.`
      : 'Low textual and attribute resemblance detected between reports.';

  const breakdown: MatchBreakdown = {
    nameScore: nameSim.score,
    descriptionScore: descSim.score,
    categoryScore,
    colorScore,
    locationScore,
    brandScore,
    matchedKeywords: allMatchedKeywords,
  };

  return {
    lostItem: lost,
    foundItem: found,
    overallScore,
    tier,
    breakdown,
    algorithmUsed: 'KMP Substring Tokenizer + Weighted Attribute Heuristic',
    explanation,
  };
}

/**
 * Finds all potential matches across the entire database.
 * Strictly pairs Lost items with Found items.
 */
export function runMatchingEngine(items: ItemReport[]): MatchResult[] {
  const lostItems = items.filter((item) => item.type === 'lost' && item.status !== 'Resolved');
  const foundItems = items.filter((item) => item.type === 'found' && item.status !== 'Resolved');

  const results: MatchResult[] = [];

  for (const lost of lostItems) {
    for (const found of foundItems) {
      const match = computeMatchScore(lost, found);
      if (match.overallScore >= MATCH_THRESHOLDS.MEDIUM) {
        results.push(match);
      }
    }
  }

  return results.sort((a, b) => b.overallScore - a.overallScore);
}
