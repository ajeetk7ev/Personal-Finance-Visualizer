import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {

    const { category, amount, month } = await req.json();
    console.log("Creating budget:", { category, amount, month });

    if (!category || !amount || !month) {
      return NextResponse.json({ error: "All fields required." }, { status: 400 });
    }

    const newBudget = await prisma.budget.create({
      data: {
        category,
        amount: parseFloat(amount),
        month,
      },
    });

    return NextResponse.json(newBudget, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create budget." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const budgets = await prisma.budget.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(budgets);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch budgets." }, { status: 500 });
  }
}
