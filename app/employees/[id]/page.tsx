"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function EmployeeDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [employee, setEmployee] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const res = await fetch(`/api/employees/${params.id}`)
        if (!res.ok) throw new Error("Failed to load employee")
        const data = await res.json()
        setEmployee(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [params.id])

  if (loading) return <div className="p-6">Loading...</div>
  if (!employee) return <div className="p-6 text-red-500">Employee not found.</div>

  return (
    <div className="p-6 space-y-6">
      <Button
        onClick={() => router.back()}
        className="bg-blue-700 text-black hover:bg-blue-600"
      >
        ← Back to Employees
      </Button>

      <div className="p-6 bg-dark rounded-lg shadow-md space-y-2">
     
        <h1 className=" font-bold">Username: @{employee.username}</h1>
        <p>Email: {employee.email}</p>
        <p>Amount: ${employee.amount}</p>
        <p>Status: {employee.status}</p>
      </div>
    </div>
  )
}
