import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  const employees = await prisma.employee.findMany()
  return Response.json(employees)
}
