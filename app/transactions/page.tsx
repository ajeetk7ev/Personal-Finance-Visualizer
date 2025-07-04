"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Trash2, Loader2, FileText } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import EditTransactionDialog from "@/components/EditTransactionDialog";

type Transaction = {
  id: string;
  description: string;
  amount: number;
  date: string;
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTxId, setSelectedTxId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/transactions");
      if (!response.ok) throw new Error("Failed to fetch transactions");
      const data: Transaction[] = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedTxId) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/transactions/${selectedTxId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setTransactions((prev) => prev.filter((tx) => tx.id !== selectedTxId));
      toast.success("Transaction deleted successfully");
      setSelectedTxId(null);
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Failed to delete transaction");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6 px-4">
      <motion.h1
        className="text-3xl font-bold text-green-400 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FileText className="w-7 h-7" />
        All Transactions
      </motion.h1>

      {transactions.length === 0 ? (
        <motion.p
          className="text-zinc-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          No transactions found.
        </motion.p>
      ) : (
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {transactions.map((tx) => (
            <motion.div
              key={tx.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-zinc-800 text-white shadow-md transition">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold">{tx.description}</h2>
                    <p className="text-sm text-zinc-400">
                      {format(new Date(tx.date), "dd MMM yyyy")}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`text-lg font-bold ${tx.amount >= 0
                        ? "text-green-400"
                        : "text-red-400"
                        }`}
                    >
                      ₹{tx.amount.toFixed(2)}
                    </span>

                    {/* Edit Button */}
                    <EditTransactionDialog
                      transaction={tx}
                      onUpdateSuccess={fetchTransactions}
                    />

                    {/* Delete Button */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button onClick={() => setSelectedTxId(tx.id)}>
                          <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600 cursor-pointer transition-colors" />
                        </button>
                      </AlertDialogTrigger>

                      <AlertDialogContent className="backdrop-blur border border-zinc-700 bg-zinc-900/80 shadow-xl text-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-xl font-bold text-red-400">
                            Confirm Deletion
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-zinc-300">
                            Are you sure you want to delete this transaction? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={() => setSelectedTxId(null)}
                            className="border border-zinc-600 text-black"
                          >
                            Cancel
                          </AlertDialogCancel>

                          <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-500 hover:bg-red-600 text-white flex gap-2 items-center"
                          >
                            {isDeleting && (
                              <Loader2 className="animate-spin w-4 h-4" />
                            )}
                            {isDeleting ? "Deleting..." : "Yes, Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
