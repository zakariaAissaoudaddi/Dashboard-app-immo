import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = (globalThis as any).prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== "production") (globalThis as any).prisma = prisma

// ✅ GET one proprietaire by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid proprietaire ID" }, { status: 400 })
    }

    const proprietaire = await prisma.proprietaire.findUnique({ where: { id } })
    if (!proprietaire) {
      return NextResponse.json({ error: "Proprietaire not found" }, { status: 404 })
    }

    return NextResponse.json(proprietaire)
  } catch (error) {
    console.error("Error fetching proprietaire:", error)
    return NextResponse.json({ error: "Failed to fetch proprietaire" }, { status: 500 })
  }
}

// ✅ DELETE proprietaire
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid proprietaire ID" }, { status: 400 })
    }

    await prisma.proprietaire.delete({ where: { id } })
    return NextResponse.json({ message: "Proprietaire deleted successfully" })
  } catch (error) {
    console.error("Error deleting proprietaire:", error)
    return NextResponse.json({ error: "Failed to delete proprietaire" }, { status: 500 })
  }
}

// ✅ UPDATE proprietaire
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid proprietaire ID" }, { status: 400 })
    }

    const data = await req.json()

    const updatedProprietaire = await prisma.proprietaire.update({
      where: { id },
      data,
    })

    return NextResponse.json(updatedProprietaire)
  } catch (error) {
    console.error("Error updating proprietaire:", error)
    return NextResponse.json({ error: "Failed to update proprietaire" }, { status: 500 })
  }
}
