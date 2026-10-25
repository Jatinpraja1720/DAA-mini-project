import React from 'react';
import { BookOpen, Award, CheckCircle, Code2, ShieldAlert } from 'lucide-react';

export const AboutProject: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Title Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm text-center sm:text-left">
        <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full">
          Academic Mini-Project
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-3">
          Smart Campus Lost-and-Found Item Matcher
        </h1>
        <p className="text-sm text-slate-600 mt-2 font-medium">
          Subject: <strong>Design and Analysis of Algorithms (DAA)</strong>
        </p>

        {/* Academic Details Placeholder Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-5 text-xs text-slate-600">
          <div>
            <span className="text-slate-400 block font-medium">College / Institution</span>
            <span className="font-bold text-slate-800">[Your University / College Name]</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Project Guide</span>
            <span className="font-bold text-slate-800">[Faculty Guide Name, Dept of CSE]</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Team Members</span>
            <span className="font-bold text-slate-800">[Student Name(s) & Roll Nos]</span>
          </div>
        </div>
      </div>

      {/* Problem Statement & Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Problem Statement</h2>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Students frequently misplace critical personal belongings such as ID cards, calculators,
            laptops, and keys across sprawling university facilities. Manually cross-referencing
            scattered social media notices or physical notice boards is inefficient, causing delay
            and unrecovered assets.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center mb-3">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Key Project Objectives</h2>
          <ul className="text-xs text-slate-600 mt-2 space-y-2 list-disc list-inside">
            <li>Demonstrate exact substring algorithms on real unstructured text.</li>
            <li>Provide a zero-backend, client-side verified matcher suitable for viva evaluation.</li>
            <li>Quantify algorithmic time & space complexities on live input streams.</li>
            <li>Deliver an intuitive university portal interface with privacy safeguards.</li>
          </ul>
        </div>
      </div>

      {/* Algorithms Summary */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Implemented String Matching Algorithms</h2>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-slate-900">1. Naive String Matching</h4>
            <p className="text-slate-600 mt-1">
              Checks for matching characters one by one for every sliding window position $0 \le i \le (N - M)$.
              It exhibits worst-case time complexity $O(N \cdot M)$ and operates in $O(1)$ auxiliary space.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/40 border border-blue-100">
            <h4 className="font-bold text-[#2563EB]">2. Knuth-Morris-Pratt (KMP) Algorithm</h4>
            <p className="text-slate-600 mt-1">
              Constructs an auxiliary $\pi$ (LPS) table of size $M$ in $O(M)$ time to track proper prefix-suffix lengths.
              It guarantees linear $O(N)$ text scanning with strictly zero backward backtracking in the main corpus.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50/40 border border-purple-100">
            <h4 className="font-bold text-[#7C3AED]">3. Rabin-Karp Algorithm</h4>
            <p className="text-slate-600 mt-1">
              Calculates modular polynomial rolling hashes for each window of length $M$ using Horner's rule.
              Achieves an average time of $O(N + M)$, gracefully catching character mismatches upon identical hash codes.
            </p>
          </div>
        </div>
      </div>

      {/* Limitations and Future Improvements */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-amber-500" />
          <span>System Limitations & Future Enhancements</span>
        </h2>
        <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
          <p>
            • <strong>Single-Node Browser Storage:</strong> Current records persist in browser <code>localStorage</code>.
            Future iterations can connect to a distributed PostgreSQL or Firebase backend.
          </p>
          <p>
            • <strong>Approximate Spell-Checking:</strong> The present engine relies on exact token matching via KMP and normalisation.
            Incorporating Levenshtein Distance (Dynamic Programming) will tolerate human misspellings.
          </p>
          <p>
            • <strong>Automated Image Feature Extraction:</strong> Deep convolutional networks could be integrated to compare item photos directly.
          </p>
        </div>
      </div>
    </div>
  );
};
