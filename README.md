# 💸 Personal-Finance-Visualizer

> A modern, responsive web app to manage and track your daily finances – built with Next.js, MongoDB, and elegant UI animations.
---

## 📌 Stage 1 – Basic Transaction Tracking

This repository includes **Stage 1** of the Personal Finance Visualizer assignment.

### ✨ Features Implemented

- ✅ Create, Edit, and Delete Transactions
- ✅ Input Fields: `Amount`, `Description`, `Date`
- ✅ Client-side form validation
- ✅ Monthly expense tracking with **Bar Chart**
- ✅ Toast notifications for actions (success/failure)
- ✅ Confirmation dialog for safe deletes
- ✅ Responsive layout with dark mode support
- ✅ Polished UI using `shadcn/ui` + `TailwindCSS`
- ✅ Entry/exit animations using `framer-motion`

---



## 🚀 Stage 2 – Categories, Filters, and Dashboard Summary

### ✅ Features Added in Stage 2

#### 🏷️ Transaction Categories
- Introduced **predefined categories** like `Food`, `Travel`, `Health`, `Shopping`, and more.
- Category selection integrated in both **Create** and **Edit** transaction forms.

#### 📊 Filtering Capabilities
- Filter transactions by **Month** and **Category**.
- Analyze spending patterns quickly and intuitively.

#### 📈 Dashboard Summary
- Dashboard now includes:
  - 📊 Monthly **Bar Chart** for visualizing expenses.
  - 🔍 Summary stats:
    - Total Spent
    - Number of Transactions
    - Highest Single Expense

#### 🧾 Recent Transactions
- Shows the **latest 5 entries** at a glance with clean UI.

#### ✨ UI & UX Enhancements
- Improved form fields, select dropdowns, and responsive design.
- Consistent color scheme and better hover interactions.

---

## ✅ Stage 3 – Budgeting, Comparison & Insights

This repository now includes **Stage 3** of the assignment: powerful **budgeting features**, **visual comparisons**, and **spending insights**.

---
### 🎯 Features Added in Stage 3

- 📝 **Create, Edit & Delete Budgets**
  - Monthly budgets by **category**
  - Seamless UI with modal dialog form

- 📊 **Budget vs Actual Comparison**
  - Compare actual spending vs budgeted amount
  - Visualized with a **dual bar chart**
  - Color-coded: Green for Budgeted, Red for Spent

- 🔍 **Filterable Visuals**
  - Filter by **month** and **category** for targeted analysis

- 💡 **Smart Spending Insights**
  - 🔴 Over-budget detection
  - 🟢 Under-budget & efficient spending highlights
  - 🟡 Unused budget categories
  - 💰 Highest spending zone

---

### 📌 Summary of All Stages

| Stage | Description |
|-------|-------------|
| ✅ Stage 1 | Transaction creation, bar chart visualization, toast notifications |
| ✅ Stage 2 | Categories, filters, pie chart breakdown, dashboard summary |
| ✅ Stage 3 | Budget management, comparison chart, spending insights |

---


## 🛠️ Tech Stack

| Category         | Tech Used                        |
|------------------|----------------------------------|
| Framework        | [Next.js 15 (App Router)](https://nextjs.org/) |
| Database         | [MongoDB](https://www.mongodb.com/) + [Prisma ORM](https://www.prisma.io/) |
| Styling          | [Tailwind CSS](https://tailwindcss.com/) |
| UI Components    | [shadcn/ui](https://ui.shadcn.com/) |
| Charts           | [Recharts](https://recharts.org/en-US) |
| Animations       | [Framer Motion](https://www.framer.com/motion/) |
| Notifications    | [react-hot-toast](https://react-hot-toast.com/) |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **npm/pnpm** package manager
- **Git** version control

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ajeetk7ev/Personal-Finance-Visualizer.git
cd Personal-Finance-Visualizer
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```

4. **Configure environment variables** (see Environment Variables section)

5. **Database setup**
```bash
npx prisma generate
npx prisma db push
```

6. **Run development server**
```bash
pnpm dev
# or
npm run dev
```

7. **Open your browser**
```
http://localhost:3000
```

## 🔧 Environment Variables

Create a `.env` file in your project root:

```env
# Database
DATABASE_URL="your-mongodb-url"
