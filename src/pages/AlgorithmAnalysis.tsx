import React, { useState } from 'react';
import {
  naiveStringMatch,
  kmpStringMatch,
  rabinKarpStringMatch,
} from '../algorithms/stringMatching';
import { AlgorithmResult } from '../types';
import { Binary, Play, Zap, CheckCircle2, AlertCircle } from 'lucide-react';

export const AlgorithmAnalysis: React.FC = () => {
  const [sampleText, setSampleText] = useState(
    'Found a space grey Apple MacBook Air laptop with stickers in the Central Library near desk 14'
  );
  const [samplePattern, setSamplePattern] = useState('MacBook');
  const [selectedAlgo, setSelectedAlgo] = useState<'Naive' | 'KMP' | 'Rabin-Karp'>('KMP');
  const [interactiveResult, setInteractiveResult] = useState<AlgorithmResult | null>(null);

  // Benchmarking states
  const [benchResults, setBenchResults] = useState<{
    naive: AlgorithmResult;
    kmp: AlgorithmResult;
    rk: AlgorithmResult;
  } | null>(null);

  const runSingleInteractive = () => {
    let res: AlgorithmResult;
    if (selectedAlgo === 'Naive') {
      res = naiveStringMatch(sampleText, samplePattern, true);
    } else if (selectedAlgo === 'KMP') {
      res = kmpStringMatch(sampleText, samplePattern, true);
    } else {
      res = rabinKarpStringMatch(sampleText, samplePattern, true);
    }
    setInteractiveResult(res);
  };

  const runAllBenchmark = () => {
    const naive = naiveStringMatch(sampleText, samplePattern);
    const kmp = kmpStringMatch(sampleText, samplePattern);
    const rk = rabinKarpStringMatch(sampleText, samplePattern);
    setBenchResults({ naive, kmp, rk });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Overview */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#7C3AED] bg-purple-50 px-2.5 py-1 rounded-full mb-2">
          <Binary className="w-3.5 h-3.5" />
          <span>DAA Syllabus Verification & Benchmarking</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          String Matching Algorithms Analysis
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Comprehensive comparison of Naive, Knuth-Morris-Pratt (KMP), and Rabin-Karp pattern
          matching algorithms used to locate keywords in lost and found postings.
        </p>
      </div>

      {/* Theoretical Complexity Comparison Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-4">
          Theoretical Complexity Matrix
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Algorithm</th>
                <th className="p-3.5">Preprocessing Time</th>
                <th className="p-3.5">Matching Time</th>
                <th className="p-3.5">Worst-Case Time</th>
                <th className="p-3.5">Auxiliary Space</th>
                <th className="p-3.5">Best Application Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50/60">
                <td className="p-3.5 font-bold text-slate-900">Naive String Matching</td>
                <td className="p-3.5 font-mono text-slate-500">O(0) — None</td>
                <td className="p-3.5 font-mono">O((N - M + 1) * M)</td>
                <td className="p-3.5 font-mono font-bold text-red-600">O(N * M)</td>
                <td className="p-3.5 font-mono text-emerald-600">O(1)</td>
                <td className="p-3.5">Short texts, small patterns with minimal repeat letters</td>
              </tr>
              <tr className="hover:bg-slate-50/60 bg-blue-50/30">
                <td className="p-3.5 font-bold text-[#2563EB]">Knuth-Morris-Pratt (KMP)</td>
                <td className="p-3.5 font-mono text-slate-700">O(M) (LPS array)</td>
                <td className="p-3.5 font-mono font-bold text-emerald-600">O(N)</td>
                <td className="p-3.5 font-mono font-bold text-emerald-600">O(N + M)</td>
                <td className="p-3.5 font-mono">O(M)</td>
                <td className="p-3.5">Repetitive texts, real-time token scanning, zero backtracking</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="p-3.5 font-bold text-[#7C3AED]">Rabin-Karp</td>
                <td className="p-3.5 font-mono text-slate-700">O(M) (Hash calculation)</td>
                <td className="p-3.5 font-mono font-bold text-emerald-600">O(N + M) (average)</td>
                <td className="p-3.5 font-mono font-bold text-amber-600">O(N * M) (worst)</td>
                <td className="p-3.5 font-mono text-emerald-600">O(1)</td>
                <td className="p-3.5">Multiple pattern searches and document fingerprinting</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Demonstration Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Live Interactive Algorithm Demonstration
        </h3>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Corpus Text (N = {sampleText.length} chars)
            </label>
            <textarea
              rows={2}
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Pattern (M = {samplePattern.length} chars)
              </label>
              <input
                type="text"
                value={samplePattern}
                onChange={(e) => setSamplePattern(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select Algorithm
              </label>
              <select
                value={selectedAlgo}
                onChange={(e) => setSelectedAlgo(e.target.value as any)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-white"
              >
                <option value="Naive">Naive String Matching</option>
                <option value="KMP">Knuth-Morris-Pratt (KMP)</option>
                <option value="Rabin-Karp">Rabin-Karp</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={runSingleInteractive}
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-[#2563EB] text-white hover:bg-blue-700 shadow-sm flex items-center space-x-1.5"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Execute {selectedAlgo}</span>
            </button>
            <button
              onClick={runAllBenchmark}
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-[#7C3AED] text-white hover:bg-purple-700 shadow-sm flex items-center space-x-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Compare All 3 Side-by-Side</span>
            </button>
          </div>
        </div>

        {/* Interactive Single Execution Result */}
        {interactiveResult && (
          <div className="mt-5 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Matches Found</span>
                <p className="text-xl font-black text-slate-800 mt-0.5">{interactiveResult.matches.length}</p>
                <p className="text-[10px] text-slate-400 font-mono">
                  {interactiveResult.matches.length > 0
                    ? `At offsets: [${interactiveResult.matches.join(', ')}]`
                    : 'None'}
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Comparisons</span>
                <p className="text-xl font-black text-[#2563EB] mt-0.5">{interactiveResult.comparisons}</p>
                <p className="text-[10px] text-slate-400">Total Character Checks</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Execution Time</span>
                <p className="text-xl font-black text-emerald-600 mt-0.5">{interactiveResult.executionTimeMs} ms</p>
                <p className="text-[10px] text-slate-400">Measured via performance.now()</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Auxiliary Space</span>
                <p className="text-xl font-black text-purple-600 mt-0.5">
                  {selectedAlgo === 'KMP' ? `O(${samplePattern.length})` : 'O(1)'}
                </p>
                <p className="text-[10px] text-slate-400">
                  {selectedAlgo === 'KMP' ? 'LPS table size' : 'Constant memory'}
                </p>
              </div>
            </div>

            {interactiveResult.lpsArray && (
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs font-mono">
                <strong className="text-slate-800">Computed KMP LPS Array for "{samplePattern}": </strong>
                <span className="text-purple-700">[{interactiveResult.lpsArray.join(', ')}]</span>
              </div>
            )}

            {/* Execution Trace */}
            {interactiveResult.steps && interactiveResult.steps.length > 0 && (
              <div>
                <span className="text-xs font-bold uppercase text-slate-500 mb-2 block">
                  Algorithm Trace (First {interactiveResult.steps.length} Steps)
                </span>
                <div className="max-h-48 overflow-y-auto bg-white rounded-xl border border-slate-200 p-2 divide-y divide-slate-100 font-mono text-[11px]">
                  {interactiveResult.steps.map((st) => (
                    <div key={st.step} className="py-1 px-2 flex items-center justify-between">
                      <span>
                        Step {st.step}: {st.description}
                      </span>
                      <span className={st.isMatch ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                        {st.isMatch ? '✓' : '✗'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Side-by-Side Comparison */}
        {benchResults && (
          <div className="mt-6 pt-5 border-t border-slate-200 space-y-4">
            <h4 className="text-sm font-bold text-slate-900">
              Side-by-Side Benchmark Output (Exact Same Inputs)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h5 className="font-bold text-slate-800 text-sm">Naive Algorithm</h5>
                <div className="mt-2 text-xs space-y-1 text-slate-600">
                  <p>Comparisons: <strong className="text-slate-900">{benchResults.naive.comparisons}</strong></p>
                  <p>Time: <strong className="text-slate-900">{benchResults.naive.executionTimeMs} ms</strong></p>
                  <p>Matches: <strong>{benchResults.naive.matches.length}</strong></p>
                  <p className="text-[11px] text-slate-400 mt-2">No preprocessing overhead; shifts pattern by 1 each time.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200">
                <h5 className="font-bold text-[#2563EB] text-sm">Knuth-Morris-Pratt (KMP)</h5>
                <div className="mt-2 text-xs space-y-1 text-slate-600">
                  <p>Comparisons: <strong className="text-[#2563EB]">{benchResults.kmp.comparisons}</strong></p>
                  <p>Time: <strong className="text-[#2563EB]">{benchResults.kmp.executionTimeMs} ms</strong></p>
                  <p>Matches: <strong>{benchResults.kmp.matches.length}</strong></p>
                  <p className="text-[11px] text-slate-400 mt-2">Utilizes LPS table to skip redundant re-examinations.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200">
                <h5 className="font-bold text-[#7C3AED] text-sm">Rabin-Karp Algorithm</h5>
                <div className="mt-2 text-xs space-y-1 text-slate-600">
                  <p>Comparisons: <strong className="text-[#7C3AED]">{benchResults.rk.comparisons}</strong></p>
                  <p>Time: <strong className="text-[#7C3AED]">{benchResults.rk.executionTimeMs} ms</strong></p>
                  <p>Collisions: <strong>{benchResults.rk.hashCollisions || 0}</strong></p>
                  <p className="text-[11px] text-slate-400 mt-2">Hashes sliding windows; verifies chars on hash matches.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
