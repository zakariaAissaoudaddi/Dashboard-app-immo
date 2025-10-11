"use client"

import * as React from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import type { Proprietaire } from "./columns" // ✅ import the correct type

export default function ProprietairesPage() {
  const [data, setData] = React.useState<Proprietaire[]>([]) // ✅ correct type
  const [loading, setLoading] = React.useState(true)
  
  // ✅ fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/proprietaire", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to fetch proprietaires")
      const proprietaires = await res.json()
      setData(proprietaires)
    } catch (err) {
      console.error("Error fetching proprietaires:", err)
    } finally {
      setLoading(false)
    } 
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
      <div className="font-semibold text-lg mb-4">Liste des Propriétaires</div>
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  )
}
