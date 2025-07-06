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
git clone https://github.com/kartikeykatyal/medimeet.git
cd medimeet
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