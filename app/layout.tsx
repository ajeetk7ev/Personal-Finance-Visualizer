import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/home/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Finance Visualizer",
  description:
    "Track your income, expenses, and financial health with a clean and intuitive dashboard. Built with Next.js, ShadCN, and Recharts.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-white flex lg:flex-row flex-col">
        <Sidebar />
        <main className="lg:ml-64 p-6  w-full">{children}</main>
      </body>
    </html>
  );
}
