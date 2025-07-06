"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import CreateBudgetDialog from "@/components/CreateBudgetDialog";
import EditBudgetDialog from "@/components/EditBudgetDialog";
import toast from "react-hot-toast";

interface Budget {
  id: string;
  month: string;
  category: string;
  amount: number;
}

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [open, setOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const res = await fetch("/api/budgets");
      const data = await res.json();
      const sorted = data.sort((a: Budget, b: Budget) =>
        a.month.localeCompare(b.month)
      );
      setBudgets(sorted);
    } catch (err) {
      console.error("Failed to load budgets", err);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;

    try {
      const res = await fetch(`/api/budgets/${deletingId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      toast.success("Budget deleted");
      fetchBudgets();
      setDeletingId(null);
    } catch (err) {
      toast.error("Error deleting budget");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-400">Budgets</h1>
       {/* Create Dialog */}
      <CreateBudgetDialog open={open} setOpen={setOpen} onBudgetCreated={fetchBudgets} />
      </div>

      {budgets.length === 0 ? (
        <p className="text-zinc-400">No budgets available. Create your first one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {budgets.map((budget) => (
            <Card
              key={budget.id}
              className="bg-zinc-800 text-white shadow hover:shadow-lg transition relative"
            >
              <CardContent className="p-4 space-y-1">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-zinc-400">
                      {format(new Date(budget.month + "-01"), "MMMM yyyy")}
                    </p>
                    <h2 className="text-lg font-semibold">{budget.category}</h2>
                    <p className="text-green-400 font-bold">
                      ₹{budget.amount.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex gap-2 items-start">
                    {/* Edit Button */}
                    <button onClick={() => setEditingBudget(budget)}>
                      <Pencil className="w-5 h-5 text-blue-400 hover:text-blue-500" />
                    </button>

                    {/* Delete Button */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button onClick={() => setDeletingId(budget.id)}>
                          <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-zinc-900 text-white border border-zinc-700">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-red-400">
                            Delete Budget?
                          </AlertDialogTitle>
                          <p className="text-zinc-300 text-sm">
                            Are you sure you want to delete this budget? This action is irreversible.
                          </p>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setDeletingId(null)} className="text-black">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-600 text-white"
                          >
                            Yes, Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      

      {/* Edit Dialog */}
      {editingBudget && (
        <EditBudgetDialog
          budget={editingBudget}
          onClose={() => setEditingBudget(null)}
          onBudgetUpdated={fetchBudgets}
        />
      )}
    </div>
  );
}
