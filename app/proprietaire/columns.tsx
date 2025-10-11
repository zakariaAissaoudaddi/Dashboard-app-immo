"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, Pencil, Trash2 } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useRouter } from "next/navigation"

export type Proprietaire = {
  id: number
  civilite: "Madame" | "Monsieur" | "Mademoiselle"
  nom: string
  prenom: string
  date_naissance: string
  profession: string
  lieu_travail: string
  nature_piece: "CNI" | "PASSEPORT" | "PERMIS_DE_CONDUIRE"
  numero_piece: string
  date_delivrance: string
  date_expiration: string
  lieu_delivrance: string
  adresse: string
  ville: string
  quertie: string
  telephone: string
  nom_personne_cas_urgence: string
  prenom_personne_cas_urgence: string
  telephone_personne_cas_urgence: string
  username: string
  email: string
  password: string
  courriel: string
}

export const columns: ColumnDef<Proprietaire>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        checked={row.getIsSelected()}
      />
    ),
  },
  {
    accessorKey: "nom",
    header: "Nom",
    cell: ({ row }) => <div>{row.getValue("nom")}</div>,
  },
  {
    accessorKey: "prenom",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Prenom
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("prenom")}</div>,
  },
  {
    accessorKey: "telephone",
    header: "Téléphone",
    cell: ({ row }) => <div>{row.getValue("telephone")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const router = useRouter()
      const proprietaire = row.original

      return (
        <div className="flex justify-end space-x-2">
          {/* ✅ View details in a Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
            </SheetTrigger>

            <SheetContent className="w-full sm:w-[700px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Détails du Propriétaire</SheetTitle>
                <SheetDescription>
                  Informations complètes de {proprietaire.username}
                </SheetDescription>
              </SheetHeader>

              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div><strong>Civilité:</strong> {proprietaire.civilite}</div>
                <div><strong>Nom:</strong> {proprietaire.nom}</div>
                <div><strong>Prénom:</strong> {proprietaire.prenom}</div>
                <div><strong>Date de naissance:</strong> {proprietaire.date_naissance}</div>
                <div><strong>Profession:</strong> {proprietaire.profession}</div>
                <div><strong>Lieu de travail:</strong> {proprietaire.lieu_travail}</div>
                <div><strong>Nature pièce:</strong> {proprietaire.nature_piece}</div>
                <div><strong>Numéro pièce:</strong> {proprietaire.numero_piece}</div>
                <div><strong>Date délivrance:</strong> {proprietaire.date_delivrance}</div>
                <div><strong>Date expiration:</strong> {proprietaire.date_expiration}</div>
                <div><strong>Lieu délivrance:</strong> {proprietaire.lieu_delivrance}</div>
                <div><strong>Adresse:</strong> {proprietaire.adresse}</div>
                <div><strong>Ville:</strong> {proprietaire.ville}</div>
                <div><strong>Quartier:</strong> {proprietaire.quertie}</div>
                <div><strong>Téléphone:</strong> {proprietaire.telephone}</div>
                <div><strong>Contact d'urgence (Nom):</strong> {proprietaire.nom_personne_cas_urgence}</div>
                <div><strong>Contact d'urgence (Prénom):</strong> {proprietaire.prenom_personne_cas_urgence}</div>
                <div><strong>Contact d'urgence (Téléphone):</strong> {proprietaire.telephone_personne_cas_urgence}</div>
                <div><strong>Nom d'utilisateur:</strong> {proprietaire.username}</div>
                <div><strong>Email:</strong> {proprietaire.email}</div>
                <div><strong>Courriel:</strong> {proprietaire.courriel}</div>
                <div><strong>Mot de passe:</strong> {proprietaire.password}</div>
              </div>
            </SheetContent>
          </Sheet>

          {/* ✅ Edit button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/proprietaire/edit/${proprietaire.id}`)}
          >
            <Pencil className="h-4 w-4" />
          </Button>

          {/* ✅ Delete button (to be implemented later) */}
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]
