"use client";

import { Home, List, Menu, Plus, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
  { href: "/transactions", label: "Transactions", icon: <List className="w-5 h-5" /> },
  { href: "/transactions/create", label: "Create Transaction", icon: <Plus className="w-5 h-5" /> },
  { href: "/budgets", label: "Budgets", icon: <Wallet className="w-5 h-5" /> }, // ✅ New Budgets link
];
const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Navbar */}
      <div className="lg:hidden w-full p-4 bg-zinc-900 text-white">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-green-400">EXPENSIO</h1>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Menu className="w-6 h-6 cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-zinc-900 text-white w-64 p-6">
              <SheetTitle className="text-2xl font-bold mb-6 text-green-400">EXPENSIO</SheetTitle>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                        isActive
                          ? "bg-zinc-800 text-green-400 font-semibold"
                          : "hover:bg-zinc-800 hover:text-green-300"
                      )}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col bg-zinc-900 text-white h-screen w-64 p-6 fixed left-0 top-0 border-r border-zinc-800">
        <h1 className="text-2xl font-bold tracking-wide text-green-400 mb-8">EXPENSIO</h1>
        <nav className="flex flex-col gap-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex items-center gap-3 rounded-md px-4 py-2 transition-all",
                  isActive
                    ? "bg-zinc-800 text-green-400 font-semibold"
                    : "hover:bg-zinc-800 hover:text-green-300"
                )}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-green-400 rounded-r-sm" />
                )}
                {link.icon}
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
