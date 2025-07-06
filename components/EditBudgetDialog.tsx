"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import toast from "react-hot-toast";
import { predefinedCategories } from "@/data/category";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface EditBudgetDialogProps {
  budget: {
    id: string;
    month: string;
    category: string;
    amount: number;
  };
  onClose: () => void;
  onBudgetUpdated: () => void;
}

export default function EditBudgetDialog({
  budget,
  onClose,
  onBudgetUpdated,
}: EditBudgetDialogProps) {
  const [amount, setAmount] = useState(budget.amount);
  const [month, setMonth] = useState(budget.month);
  const [category, setCategory] = useState(budget.category);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/budgets/${budget.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, month, category }),
      });

      if (!res.ok) throw new Error("Failed to update budget");

      toast.success("Budget updated successfully");
      onBudgetUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Error updating budget");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 text-white border border-zinc-700">
        <DialogHeader>
          <DialogTitle className="text-green-400">Edit Budget</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="month" className="text-sm text-zinc-300">Month</Label>
            <Input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="bg-zinc-800 text-white  [&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-sm text-zinc-300">Category</Label>
            <Select value={category} onValueChange={setCategory} >
                <SelectTrigger className="bg-zinc-900 text-white w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 text-white">
                  {predefinedCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
          </div>

          <div>
            <Label htmlFor="amount" className="text-sm text-zinc-300">Amount</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="bg-zinc-800 text-white"
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline" className="text-black">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
