"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { predefinedCategories } from "@/data/category";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface CreateBudgetDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onBudgetCreated: () => void;
}

export default function CreateBudgetDialog({
  open,
  setOpen,
  onBudgetCreated,
}: CreateBudgetDialogProps) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!category || !amount || !month) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, amount: parseFloat(amount), month }),
      });

      if (!res.ok) throw new Error("Failed to create budget");

      toast.success("Budget created!");
      onBudgetCreated();
      setOpen(false);
      setCategory("");
      setAmount("");
      setMonth("");
    } catch (err) {
      toast.error("Failed to create budget");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2">
          <PlusCircle className="w-5 h-5" />
          Create Budget
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border border-zinc-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-green-400">Create New Budget</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
           <div className="space-y-2">
              <Label htmlFor="category" className="text-white">Budget Name</Label>
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


          <div className="space-y-1">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="e.g. 6000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-zinc-800 text-white"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="month">Month</Label>
            <Input
              id="month"
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="bg-zinc-800 text-white [&::-webkit-calendar-picker-indicator]:invert"
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
            {loading ? "Saving..." : "Save Budget"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
