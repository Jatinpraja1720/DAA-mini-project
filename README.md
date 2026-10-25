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

🛠️ Technology Stack

Frontend: React, TypeScript, Tailwind CSS
Development Tool: Vite
Icons: Lucide React
Data Storage: Browser Local Storage

These technologies provide a component-based interface, structured code, responsive styling, and local data persistence.


The displayed structure is illustrative; folders and files may differ in your current version.

⚡ Getting Started

Run CampusFind locally by following these steps.

Prerequisites: Node.js and npm.

1. Clone the repository

git clone https://github.com/Jatinprajpa1720/DAA-mini-project.git

2. Open the project directory

cd DAA-mini-project

3. Install dependencies

npm install

4. Start the development server

npm run dev

5. Open the application

Visit the local URL shown in your terminal, usually:

http://localhost:5173/

🎯 Project Goals : 
Apply string-matching algorithms to a real-world problem.
Understand and compare algorithm time and space complexity.
Build a functional, user-friendly web interface.
Demonstrate the practical relevance of DAA concepts.
Explore how algorithmic techniques can improve item discovery.

🔮 Future Scope : 
CampusFind could be extended with user authentication, centralized database integration, image uploads, advanced matching techniques, notifications, and administrative tools.

These enhancements could help transform the project into a more complete campus-wide lost-and-found service.

⚠️ Current Limitations : 
Data is stored locally rather than in a shared database.
Reports are not automatically synchronized between different users or devices.
Matching quality depends on the implemented algorithms and the descriptions entered.
Additional security, validation, and testing would be needed for production use.

👨‍💻 Project Details
Project: CampusFind
Category: Design and Analysis of Algorithms (DAA) Mini Project
Domain: Web Development and String Matching
Developer: Jatin Prajapati

🔗 GitHub Repository: DAA-mini-project

<p align="center"> <strong>Built to make campus lost-and-found searching smarter. 🎓</strong> <br /> <sub>DAA Mini Project · CampusFind</sub> </p>
