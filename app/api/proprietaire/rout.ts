import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = (globalThis as any).prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== "production") (globalThis as any).prisma = prisma

// ✅ Get all proprietaires
export async function GET() {
  try {
    const proprietaires = await prisma.proprietaire.findMany({
      orderBy: { id: "desc" },
    })
    return NextResponse.json(proprietaires)
  } catch (error) {
    console.error("Error fetching proprietaires:", error)
    return NextResponse.json(
      { error: "Failed to fetch proprietaires" },
      { status: 500 }
    )
  }
}

// ✅ Create a new proprietaire
export async function POST(req: Request) {
  try {
    const data = await req.json()
    const {
      username,
      email,
      nom,
      prenom,
      date_naissance,
    } = data

    if (!username || !email || !nom || !prenom) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const proprietaire = await prisma.proprietaire.create({
      data: {
        username,
        email,
        nom,
        prenom,
        date_naissance,
        civilite: "Monsieur",
        profession: "",
        lieu_travail: "",
        nature_piece: "CNI",
        numero_piece: "",
        date_delivrance: "",
        date_expiration: "",
        lieu_delivrance: "",
        adresse: "",
        ville: "",
        quertie: "",
        telephone: "",
        nom_personne_cas_urgence: "",
        prenom_personne_cas_urgence: "",
        telephone_personne_cas_urgence: "",
        password: "",
        courriel: "",
      },
    })

    return NextResponse.json(proprietaire)
  } catch (error) {
    console.error("Error creating proprietaire:", error)
    return NextResponse.json({ error: "Failed to create proprietaire" }, { status: 500 })
  }
}
