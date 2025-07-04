import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const id = (await params).id;
    await prisma.transaction.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Transaction deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ message: "Failed to delete" }, { status: 500 });
  }
}



export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> } ) {
  try {
    const id = (await params).id;
    const body = await req.json();
    const { description, amount, date } = body;

    if (!description || typeof amount !== "number" || !date) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const updatedTx = await prisma.transaction.update({
      where: { id },
      data: {
        description,
        amount,
        date: new Date(date),
      },
    });

    return NextResponse.json(updatedTx, { status: 200 });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 });
  }
}

