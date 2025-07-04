"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FilePlus } from "lucide-react";

export default function CreateTransactionPage() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    if (!description.trim()) return "Description is required.";
    if (!amount || isNaN(Number(amount))) return "Valid amount is required.";
    if (!date) return "Date is required.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          amount: parseFloat(amount),
          date: new Date(date),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save transaction");
      }

      router.push("/transactions");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-green-400 flex items-center gap-2">
        <FilePlus className="w-7 h-7 text-green-400" />
        Create New Transaction
      </h1>

      <Card className="bg-zinc-800 border-none shadow-lg">
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500 text-white text-sm px-4 py-2 rounded-md flex items-center justify-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Description</Label>
              <Input
                id="description"
                placeholder="e.g. Groceries, Uber Ride"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-zinc-900 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-white">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="e.g. 150.75"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-zinc-900 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-white">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-zinc-900 text-white"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold text-lg"
            >
              {loading ? "Saving..." : "Save Transaction"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
