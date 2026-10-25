import { AlgorithmResult, AlgorithmStep } from '../types';

/**
 * NAIVE STRING MATCHING ALGORITHM
 * Worst-case time complexity: O((N - M + 1) * M) ≈ O(N * M)
 * Auxiliary Space: O(1)
 */
export function naiveStringMatch(text: string, pattern: string, recordSteps = false): AlgorithmResult {
  const startTime = performance.now();
  const matches: number[] = [];
  const steps: AlgorithmStep[] = [];
  let comparisons = 0;

  const n = text.length;
  const m = pattern.length;

  if (m === 0 || n === 0 || m > n) {
    return {
      algorithm: 'Naive',
      matches: [],
      comparisons: 0,
      executionTimeMs: Number((performance.now() - startTime).toFixed(4)),
      steps: [],
    };
  }

  let stepCount = 0;
  for (let i = 0; i <= n - m; i++) {
    let j = 0;
    while (j < m) {
      comparisons++;
      const isMatch = text[i + j].toLowerCase() === pattern[j].toLowerCase();

      if (recordSteps && stepCount < 100) {
        stepCount++;
        steps.push({
          step: stepCount,
          description: `Compare T[${i + j}] ('${text[i + j]}') with P[${j}] ('${pattern[j]}') -> ${isMatch ? 'Match' : 'Mismatch'}`,
          textIndex: i + j,
          patternIndex: j,
          isMatch,
        });
      }

      if (!isMatch) break;
      j++;
    }

    if (j === m) {
      matches.push(i);
      if (recordSteps && stepCount < 100) {
        steps.push({
          step: ++stepCount,
          description: `Full pattern match confirmed at window offset ${i}`,
          textIndex: i,
          patternIndex: m - 1,
          isMatch: true,
        });
      }
    }
  }

  const executionTimeMs = Number((performance.now() - startTime).toFixed(4));
  return { algorithm: 'Naive', matches, comparisons, executionTimeMs, steps };
}

/**
 * KNUTH-MORRIS-PRATT (KMP) ALGORITHM
 * Preprocessing time: O(M) for LPS (Longest Prefix Suffix) table
 * Searching time: O(N)
 * Total time complexity: O(N + M)
 * Auxiliary Space: O(M)
 */
export function computeKMPPrefixArray(pattern: string): { lps: number[]; comparisons: number } {
  const m = pattern.length;
  const lps = new Array<number>(m).fill(0);
  let length = 0;
  let i = 1;
  let comparisons = 0;

  while (i < m) {
    comparisons++;
    if (pattern[i].toLowerCase() === pattern[length].toLowerCase()) {
      length++;
      lps[i] = length;
      i++;
    } else {
      if (length !== 0) {
        length = lps[length - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return { lps, comparisons };
}

export function kmpStringMatch(text: string, pattern: string, recordSteps = false): AlgorithmResult {
  const startTime = performance.now();
  const matches: number[] = [];
  const steps: AlgorithmStep[] = [];
  let totalComparisons = 0;

  const n = text.length;
  const m = pattern.length;

  if (m === 0 || n === 0 || m > n) {
    return {
      algorithm: 'KMP',
      matches: [],
      comparisons: 0,
      executionTimeMs: Number((performance.now() - startTime).toFixed(4)),
      steps: [],
      lpsArray: [],
    };
  }

  const { lps, comparisons: lpsComparisons } = computeKMPPrefixArray(pattern);
  totalComparisons += lpsComparisons;

  let i = 0; // index for text
  let j = 0; // index for pattern
  let stepCount = 0;

  while (i < n) {
    totalComparisons++;
    const isCharMatch = text[i].toLowerCase() === pattern[j].toLowerCase();

    if (recordSteps && stepCount < 100) {
      stepCount++;
      steps.push({
        step: stepCount,
        description: `Compare text[${i}] ('${text[i]}') with pattern[${j}] ('${pattern[j]}')`,
        textIndex: i,
        patternIndex: j,
        isMatch: isCharMatch,
      });
    }

    if (isCharMatch) {
      i++;
      j++;
    }

    if (j === m) {
      matches.push(i - j);
      if (recordSteps && stepCount < 100) {
        steps.push({
          step: ++stepCount,
          description: `Pattern found at index ${i - j}. Shifting pattern index via LPS[${j - 1}] = ${lps[j - 1]}`,
          textIndex: i - 1,
          patternIndex: j - 1,
          isMatch: true,
        });
      }
      j = lps[j - 1];
    } else if (i < n && !isCharMatch) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }

  const executionTimeMs = Number((performance.now() - startTime).toFixed(4));
  return { algorithm: 'KMP', matches, comparisons: totalComparisons, executionTimeMs, steps, lpsArray: lps };
}

/**
 * RABIN-KARP ALGORITHM
 * Uses rolling hash with prime modulus
 * Expected time: O(N + M)
 * Worst-case time (spurious hits): O(N * M)
 * Auxiliary Space: O(1)
 */
export function rabinKarpStringMatch(text: string, pattern: string, recordSteps = false): AlgorithmResult {
  const startTime = performance.now();
  const matches: number[] = [];
  const steps: AlgorithmStep[] = [];
  let comparisons = 0;
  let hashCollisions = 0;

  const n = text.length;
  const m = pattern.length;

  if (m === 0 || n === 0 || m > n) {
    return {
      algorithm: 'Rabin-Karp',
      matches: [],
      comparisons: 0,
      hashCollisions: 0,
      executionTimeMs: Number((performance.now() - startTime).toFixed(4)),
      steps: [],
    };
  }

  const d = 256; // number of characters in alphabet
  const q = 101; // prime number for modulo
  let pHash = 0; // hash value for pattern
  let tHash = 0; // hash value for text window
  let h = 1;

  for (let i = 0; i < m - 1; i++) {
    h = (h * d) % q;
  }

  // Pre-calculate hash of pattern and first window
  for (let i = 0; i < m; i++) {
    pHash = (d * pHash + pattern.charCodeAt(i)) % q;
    tHash = (d * tHash + text.charCodeAt(i)) % q;
  }

  let stepCount = 0;

  for (let i = 0; i <= n - m; i++) {
    if (pHash === tHash) {
      // Hash match -> verify character by character to prevent false positives
      let j = 0;
      let fullMatch = true;

      while (j < m) {
        comparisons++;
        if (text[i + j].toLowerCase() !== pattern[j].toLowerCase()) {
          fullMatch = false;
          hashCollisions++;
          if (recordSteps && stepCount < 100) {
            steps.push({
              step: ++stepCount,
              description: `Spurious Hash Hit at offset ${i} (Hash ${pHash}), but character mismatch at pos ${j}`,
              textIndex: i + j,
              patternIndex: j,
              isMatch: false,
            });
          }
          break;
        }
        j++;
      }

      if (fullMatch) {
        matches.push(i);
        if (recordSteps && stepCount < 100) {
          steps.push({
            step: ++stepCount,
            description: `Hash match (${pHash}) confirmed exact match at offset ${i}`,
            textIndex: i,
            patternIndex: 0,
            isMatch: true,
          });
        }
      }
    }

    // Compute rolling hash for next window
    if (i < n - m) {
      tHash = (d * (tHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
      if (tHash < 0) {
        tHash = tHash + q;
      }
    }
  }

  const executionTimeMs = Number((performance.now() - startTime).toFixed(4));
  return {
    algorithm: 'Rabin-Karp',
    matches,
    comparisons,
    hashCollisions,
    executionTimeMs,
    steps,
  };
}
