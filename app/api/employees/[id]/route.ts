import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

// DELETE employee
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.employee.delete({
      where: { id: Number(params.id) },
    })
    return NextResponse.json({ message: "Employee deleted" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}

// UPDATE employee
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json()
    const updated = await prisma.employee.update({
      where: { id: Number(params.id) },
      data: {
        username: data.username,
        email: data.email,
        amount: Number(data.amount),
        status: data.status,
      },
    })
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
