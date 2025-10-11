"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "@/components/ui/TablePagination"
import { Button } from "@/components/ui/button"
import { CircleFadingPlus, Trash2 } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [tableData, setTableData] = React.useState(data)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [open, setOpen] = React.useState(false)

  // Form fields
  const [username, setUsername] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [nom, setNom] = React.useState("")
  const [prenom, setPrenom] = React.useState("")
  const [date_naissance, setDate_naissance] = React.useState("")

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      rowSelection,
    },
  })

  // 🔄 Refresh data
  const refreshData = async () => {
    const res = await fetch("/api/proprietaire", { cache: "no-store" })
    if (res.ok) {
      const newData = await res.json()
      setTableData(newData)
    }
  }

  // ✅ Add new Proprietaire (with validation + error handling)
  async function handleAddProprietaire() {
    if (!username || !email || !nom || !prenom || !date_naissance) {
      alert("Please fill all fields before saving.")
      return
    }

    const res = await fetch("/api/proprietaire", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, nom, prenom, date_naissance }),
    })

    if (res.ok) {
      setOpen(false)
      setUsername("")
      setEmail("")
      setNom("")
      setPrenom("")
      setDate_naissance("")
      refreshData()
    } else {
      const error = await res.json()
      alert("Failed to add proprietaire: " + error.error)
    }
  }

  // ❌ Delete selected proprietaires
  async function handleDeleteProprietaire() {
    const selected = table.getSelectedRowModel().rows
    if (selected.length === 0) {
      alert("No proprietaire selected.")
      return
    }

    for (const row of selected) {
      const proprietaire = row.original as any
      await fetch(`/api/proprietaire/${proprietaire.id}`, { method: "DELETE" })
    }

    await refreshData()
  }

  return (
    <div>
      {/* Top buttons */}
      <div className="flex justify-end gap-2 mb-4">
        {/* Delete */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-red-500 hover:bg-red-600 text-white" size="icon">
              <Trash2 />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. It will permanently remove the selected proprietaires.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={handleDeleteProprietaire}
              >
                Confirm Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Add */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600 text-white" size="icon">
              <CircleFadingPlus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Proprietaire</DialogTitle>
              <DialogDescription>Fill the form below.</DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Prenom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
              <input
                type="date"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={date_naissance}
                onChange={(e) => setDate_naissance(e.target.value)}
              />
              <Button
                onClick={handleAddProprietaire}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}
