import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: {params:Promise<{id:string}>}) {
  try {
    const budget = await prisma.budget.findUnique({
      where: { id: (await params).id },
    });

    if (!budget) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    return NextResponse.json(budget);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch budget." }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: {params:Promise<{id:string}>}) {
  try {
    const { category, amount, month } = await req.json();

    const updated = await prisma.budget.update({
      where: { id: (await params).id },
      data: { category, amount: parseFloat(amount), month },
    });

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: {params:Promise<{id:string}>}) {
  try {
    await prisma.budget.delete({
      where: { id: (await params).id },
    });

    return NextResponse.json({ message: "Deleted successfully." });
  } catch (err) {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
