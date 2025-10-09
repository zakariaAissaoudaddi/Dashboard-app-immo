import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

// ✅ Reuse Prisma instance to avoid too many connections
const prisma = (globalThis as any).prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== "production") (globalThis as any).prisma = prisma

// ✅ GET one employee by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid employee ID" }, { status: 400 })
    }

    const employee = await prisma.employee.findUnique({
      where: { id },
    })

    if (!employee) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 })
    }

    return NextResponse.json(employee)
  } catch (error) {
    console.error("Error fetching employee:", error)
    return NextResponse.json({ error: "Failed to fetch employee" }, { status: 500 })
  }
}

// ✅ DELETE employee
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid employee ID" }, { status: 400 })
    }

    await prisma.employee.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Employee deleted successfully" })
  } catch (error) {
    console.error("Error deleting employee:", error)
    return NextResponse.json({ error: "Failed to delete employee" }, { status: 500 })
  }
}

// ✅ UPDATE employee
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid employee ID" }, { status: 400 })
    }

    const data = await req.json()

    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: {
        username: data.username,
        email: data.email,
        amount: Number(data.amount),
        status: data.status,
      },
    })

    return NextResponse.json(updatedEmployee)
  } catch (error) {
    console.error("Error updating employee:", error)
    return NextResponse.json({ error: "Failed to update employee" }, { status: 500 })
  }
}
