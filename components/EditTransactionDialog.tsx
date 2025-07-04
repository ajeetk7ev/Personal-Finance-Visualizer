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
import { Loader2, Pencil } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";

type Transaction = {
  id: string;
  description: string;
  amount: number;
  date: string;
};

interface EditTransactionDialogProps {
  transaction: Transaction;
  onUpdateSuccess: () => void;
}

export default function EditTransactionDialog({
  transaction,
  onUpdateSuccess,
}: EditTransactionDialogProps) {
  const [editTx, setEditTx] = useState<Transaction>(transaction);
  const [isUpdating, setIsUpdating] = useState(false);
  const [open, setOpen] = useState(false); // <-- controlled state

  const handleChange = (field: keyof Transaction, value: string | number) => {
    setEditTx({ ...editTx, [field]: value });
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/transactions/${editTx.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editTx),
      });

      if (!res.ok) throw new Error("Failed to update");

      toast.success("Transaction updated successfully!");
      onUpdateSuccess();
      setOpen(false); 
    } catch (err) {
      toast.error("Update failed. Try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>
          <Pencil className="w-5 h-5 text-blue-400 hover:text-blue-500 cursor-pointer" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 text-white border border-zinc-700">
        <DialogHeader>
          <DialogTitle className="text-green-400">Edit Transaction</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-zinc-300">Description</label>
            <Input
              className="bg-zinc-800 text-white"
              value={editTx.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-zinc-300">Amount</label>
            <Input
              type="number"
              className="bg-zinc-800 text-white"
              value={editTx.amount}
              onChange={(e) => handleChange("amount", parseFloat(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm text-zinc-300">Date</label>
            <Input
              type="date"
              className="bg-zinc-800 text-white"
              value={format(new Date(editTx.date), "yyyy-MM-dd")}
              onChange={(e) => handleChange("date", e.target.value)}
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
            onClick={handleUpdate}
            disabled={isUpdating}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            {isUpdating ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin w-4 h-4" /> Updating...
              </span>
            ) : (
              "Update"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
