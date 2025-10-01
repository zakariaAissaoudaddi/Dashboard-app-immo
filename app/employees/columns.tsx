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

export type Employees = {
  id: string
  amount: number
  username: string
  email: string
  status: "pending" | "processing" | "success" | "failed"
}

export const columns: ColumnDef<Employees>[] = [
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
    accessorKey: "username",
    header: "User",
    cell: ({ row }) => <div>{row.getValue("username")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <div>{row.getValue("amount")}</div>,
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const employee = row.original
      return (
        <div className="flex justify-end gap-2">
          {/* Delete */}
          <Button
            className="bg-red-500 hover:bg-red-600 text-white"
            size="icon"
            onClick={async () => {
              const res = await fetch(`/api/employees/${employee.id}`, {
                method: "DELETE",
              })
              if (res.ok) window.location.reload()
              else alert("Delete failed")
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          {/* Edit */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white"
                size="icon"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit {employee.username}</SheetTitle>
                <SheetDescription>
                  Update employee details and save.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <input
                  id="username"
                  type="text"
                  defaultValue={employee.username}
                  className="w-full rounded border px-2 py-1"
                />
                <input
                  id="email"
                  type="email"
                  defaultValue={employee.email}
                  className="w-full rounded border px-2 py-1"
                />
                <input
                  id="amount"
                  type="number"
                  defaultValue={employee.amount}
                  className="w-full rounded border px-2 py-1"
                />

                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={async () => {
                    const updated = {
                      username: (document.querySelector(
                        "#username"
                      ) as HTMLInputElement).value,
                      email: (document.querySelector(
                        "#email"
                      ) as HTMLInputElement).value,
                      amount: Number(
                        (document.querySelector(
                          "#amount"
                        ) as HTMLInputElement).value
                      ),
                      status: "pending",
                    }

                    const res = await fetch(
                      `/api/employees/${employee.id}`,
                      {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updated),
                      }
                    )
                    if (res.ok) window.location.reload()
                    else alert("Update failed")
                  }}
                >
                  Save changes
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* View */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => alert(`View ${employee.username}`)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]
