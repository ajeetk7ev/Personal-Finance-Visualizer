"use client";

import { Home, List, Menu, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { cn } from "@/lib/utils"; // If you don't have cn, I can provide a utility

const navLinks = [
  { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
  { href: "/transactions", label: "Transactions", icon: <List className="w-5 h-5" /> },
  { href: "/transactions/create", label: "Create Transaction", icon: <Plus className="w-5 h-5" /> },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="lg:hidden w-full  p-4 bg-zinc-900 text-white">
        <div className="w-full h-full mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-green-400">EXPENSIO</h1>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Menu className="w-6 h-6 cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-zinc-900 text-white w-64 p-6">
              <SheetTitle className="text-2xl font-bold mb-6 text-green-400">EXPENSIO</SheetTitle>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-2 hover:text-green-400",
                      pathname === link.href && "text-green-400 font-semibold"
                    )}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col bg-zinc-900 text-white h-screen w-64 p-6 fixed left-0 top-0">
        <h1 className="text-2xl font-bold tracking-wide text-green-400 mb-6">EXPENSIO</h1>
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 hover:text-green-400",
                pathname === link.href && "text-green-400 font-semibold"
              )}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
