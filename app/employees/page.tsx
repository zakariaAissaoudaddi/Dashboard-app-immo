"use client"

import * as React from "react"
import { columns, Employees } from "./columns"
import { DataTable } from "./data-table"

export default function EmployeesPage() {
  const [data, setData] = React.useState<Employees[]>([])
  const [loading, setLoading] = React.useState(true)

  // Fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/employees", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to fetch employees")
      const employees = await res.json()
      setData(employees)
    } catch (err) {
      console.error("Error fetching employees:", err)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
      <div className="font-semibold text-lg mb-4">All Employees</div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  )
}
