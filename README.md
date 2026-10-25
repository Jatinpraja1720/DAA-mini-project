# CampusFind – Smart Campus Lost & Found Matcher
> **College Mini-Project for Design and Analysis of Algorithms (DAA)**

CampusFind is an algorithmic web application engineered to match lost personal belongings with found items across university premises. It demonstrates real-world applications of fundamental string matching algorithms (**Naive**, **Knuth-Morris-Pratt (KMP)**, and **Rabin-Karp**) alongside a weighted multi-attribute heuristic engine.

---

## 🌟 Key Features

1. **Dashboard Overview**: Dynamic live counters (Total Lost, Total Found, Algorithmic Matches, Resolved Cases) calculated directly from runtime data.
2. **Real String Matching Implementations**:
   - **Naive String Matching**: Direct sliding window comparison with character check counts ($O(N \cdot M)$ worst case).
   - **Knuth-Morris-Pratt (KMP)**: Preprocesses pattern into a Longest Prefix Suffix (LPS) table in $O(M)$ and performs linear string scanning in $O(N)$ with zero backtracking.
   - **Rabin-Karp**: Rolling polynomial hash with prime modulus arithmetic ($O(N + M)$ average, handles spurious hash collisions).
3. **Smart Weighted Match Engine**:
   - Compares Lost records against Found records exclusively.
   - Text Normalisation: Lowercasing, punctuation stripping, stop-word filtering, and tokenisation.
   - Weighted Breakdown: **Item Name (35%)**, **Description (30%)**, **Category (15%)**, **Colour (10%)**, **Location (5%)**, **Brand (5%)**.
   - Handles missing optional attributes gracefully without penalising reports.
4. **Interactive DAA Benchmark Lab**:
   - Real-time tester running custom texts against arbitrary patterns.
   - Live character comparison counter, match index reporting, and execution time measurement via `performance.now()`.
   - Side-by-side performance comparator.
5. **Claims & Verification System**: Demonstration workflow allowing students to file ownership claims and administrators to review and resolve cases.
6. **Zero Backend Required**: Persists data reliably via browser `localStorage` with built-in realistic demo data.

---

## 📊 Theoretical vs Practical Complexities

| Algorithm | Preprocessing Time | Matching Time | Worst-Case Time | Space Complexity | Best Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Naive** | $O(0)$ (None) | $O((N - M + 1) \cdot M)$ | $O(N \cdot M)$ | $O(1)$ | Short texts, rare pattern repeats |
| **KMP** | $O(M)$ (LPS Array) | $O(N)$ | $O(N + M)$ | $O(M)$ | Repetitive patterns, streaming text |
| **Rabin-Karp** | $O(M)$ (Hash) | $O(N + M)$ | $O(N \cdot M)$ | $O(1)$ | Multiple pattern search, fingerprinting |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0 or newer recommended)
- npm or yarn

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/campusfind.git
cd campusfind
npm install

Running Locally

Start the Vite development server:

npm run dev

Open your browser at http://localhost:5173.

Production Build

To verify type safety and generate an optimised production build:

npm run build

Preview the production build locally:

npm run preview

📂 Source Code Organisation

src/
├── algorithms/
│   └── stringMatching.ts    # Pure implementations of Naive, KMP, and Rabin-Karp
├── services/
│   ├── matcher.ts           # Tokenisation, weighted heuristic calculation
│   └── storage.ts           # Safe localStorage persistence and demo dataset
├── types/
│   └── index.ts             # TypeScript domain models
├── components/              # Modals, Toast notifications, Header, Sidebar
└── pages/                   # Dashboard, AllItems, SmartMatches, AlgorithmAnalysis, etc.

🛡️ Note on Demonstration Scope

This project is configured as a standalone single-user client-side demonstration
for college presentations. Contact details are masked in general listings and
claims management does not incorporate multi-tenant password authentication.


---

### 10. Verification of Project Requirements

- **Real Algorithms**: Implemented cleanly in `src/algorithms/stringMatching.ts` with true character comparison counters, LPS table calculation, and rolling hash calculation.
- **Matching Engine**: Lost reports are strictly evaluated against Found reports; missing optional fields (like Brand) are normalised so scores remain fair and balanced.
- **Design Guidelines**: Uses Tailwind CSS with the requested color palette (`#2563EB`, `#7C3AED`, `#EFF6FF`, `#F5F3FF`, `#1E293B`, `#16A34A`, `#F59E0B`, `#F8FAFC`).
- **Interactive Lab**: The Algorithm Analysis page lets you test any custom text and pattern, examine step traces, inspect the computed LPS table, and benchmark all three algorithms side-by-side.
- **Ready for GitHub & Viva**: Complete project layout, type checking, demo data reset functionality, and an academic README.
