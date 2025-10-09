import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = (globalThis as any).prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== "production") (globalThis as any).prisma = prisma

// GET all employees
export async function GET() {
  const employees = await prisma.employee.findMany()
  return NextResponse.json(employees)
}

// POST new employee
export async function POST(req: Request) {
  try {
    const data = await req.json()
    const newEmployee = await prisma.employee.create({
      data: {
        username: data.username,
        email: data.email,
        amount: Number(data.amount),
        status: data.status || "pending",
      },
    })
    return NextResponse.json(newEmployee)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 })
  }
}



