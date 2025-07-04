"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

type Transaction = {
  id: string;
  description: string;
  amount: number;
  date: string;
  category?: string;
};

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
  const highestExpense = Math.max(...transactions.map((t) => t.amount), 0);

  const monthlyData = transactions.reduce((acc, t) => {
    const month = format(new Date(t.date), "MMM");
    const existing = acc.find((item) => item.name === month);
    if (existing) {
      existing.value += t.amount;
    } else {
      acc.push({ name: month, value: t.amount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-green-400 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-green-400" />
          Personal Finance Dashboard
        </h1>
        <p className="text-zinc-400 mb-4">
          Track your expenses, see insights, and manage your spending smartly.
        </p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {[totalSpent, transactions.length, highestExpense].map((val, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="bg-zinc-800 text-white p-4 shadow-md rounded-2xl">
              <CardContent>
                <p className="text-zinc-400 text-sm">
                  {i === 0
                    ? "Total Spent"
                    : i === 1
                      ? "Transactions"
                      : "Biggest Expense"}
                </p>
                <h2
                  className={`text-2xl font-bold ${i === 0
                    ? "text-green-400"
                    : i === 2
                      ? "text-red-400"
                      : ""
                    }`}
                >
                  {i === 0
                    ? "₹" + (+val).toFixed(2)
                    : i === 2
                      ? "₹" + (+val).toFixed(2)
                      : i === 1
                        ? val
                        : ""}
                        
                  
                </h2>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="grid grid-cols-1 gap-8 mt-6"
      >
        <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }}>
          <Card className="bg-zinc-800 p-4 shadow-md text-white rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Monthly Expenses</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#34d399"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={true}
                  className="cursor-pointer transition-transform duration-200 hover:scale-105"
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        className="mt-10 space-y-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <h3 className="text-xl font-semibold text-white">Recent Transactions</h3>
        {transactions.slice(0, 5).map((tx) => (
          <motion.div
            key={tx.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center bg-zinc-900 rounded-lg p-3 text-white shadow hover:shadow-lg transition">
              <div>
                <p className="font-medium">{tx.description}</p>
                <p className="text-sm text-zinc-400">
                  {format(new Date(tx.date), "dd MMM yyyy")}
                </p>
              </div>
              <span
                className={`text-lg font-semibold ${tx.amount >= 0 ? "text-green-400" : "text-red-400"
                  }`}
              >
                ₹{tx.amount.toFixed(2)}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
