"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

interface Budget {
  id: string;
  month: string; // format: "yyyy-MM"
  category: string;
  amount: number;
}

interface Transaction {
  id: string;
  amount: number;
  date: string;
  category?: string;
}

export default function BudgetVsActualChart() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const [budgetRes, transactionRes] = await Promise.all([
        fetch("/api/budgets"),
        fetch("/api/transactions"),
      ]);
      const budgetsData = await budgetRes.json();
      const transactionsData = await transactionRes.json();
      setBudgets(budgetsData);
      setTransactions(transactionsData);
    };

    fetchData();
  }, []);

  const filteredBudgets = budgets.filter(
    (b) =>
      (!selectedMonth || b.month === selectedMonth) &&
      (!selectedCategory || b.category === selectedCategory)
  );

  const data = filteredBudgets.map((budget) => {
    const actualSpent = transactions
      .filter(
        (t) =>
          t.category === budget.category &&
          format(new Date(t.date), "yyyy-MM") === budget.month
      )
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      name: `${budget.category} (${budget.month})`,
      Budgeted: budget.amount,
      Spent: actualSpent,
    };
  });

  // Generate insights
  const overBudget = data.filter((d) => d.Spent > d.Budgeted);
  const underBudget = data.filter((d) => d.Spent < d.Budgeted && d.Spent > 0);
  const unusedBudgets = data.filter((d) => d.Spent === 0);
  const topSpending = [...data].sort((a, b) => b.Spent - a.Spent)[0];

  // Filter dropdown options
  const months = Array.from(new Set(budgets.map((b) => b.month)));
  const categories = Array.from(new Set(budgets.map((b) => b.category)));

  return (
    <Card className="bg-zinc-800 p-4 text-white rounded-2xl">
      <CardContent>
        <h3 className="text-xl font-semibold mb-4">Budget vs Actual</h3>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-full md:w-40 bg-zinc-900 border-zinc-700 text-white">
              <SelectValue placeholder="Filter by Month" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 text-white">
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48 bg-zinc-900 border-zinc-700 text-white">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 text-white">
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Chart */}
        {data.length === 0 ? (
          <p className="text-zinc-400">No budget data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="Budgeted" fill="#34d399" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Spent" fill="#f87171" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {/* Insights */}
        <div className="space-y-3 mt-6 text-sm text-zinc-300">
          <h4 className="text-lg font-semibold text-white">💡 Spending Insights</h4>

          {overBudget.length > 0 && (
            <p>
              🔴 Overbudget in:{" "}
              <strong>{overBudget.map((d) => d.name).join(", ")}</strong>
            </p>
          )}

          {underBudget.length > 0 && (
            <p>
              🟢 Underspent in:{" "}
              <strong>{underBudget.map((d) => d.name).join(", ")}</strong>
            </p>
          )}

          {unusedBudgets.length > 0 && (
            <p>
              🟡 No spending in:{" "}
              <strong>{unusedBudgets.map((d) => d.name).join(", ")}</strong>
            </p>
          )}

          {topSpending && (
            <p>
              💰 Highest spend:{" "}
              <strong>{topSpending.name}</strong> — ₹
              {topSpending.Spent.toFixed(2)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
