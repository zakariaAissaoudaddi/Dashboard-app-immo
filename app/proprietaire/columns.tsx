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

export type Proprietaire = {
  id: string
  amount: number
  username: string
  email: string
  status: "pending" | "processing" | "success" | "failed"
}

export const columns: ColumnDef<Proprietaire>[] = [
  
]
