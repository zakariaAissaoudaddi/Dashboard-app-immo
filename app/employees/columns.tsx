"use client"

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, FileUser, Pencil, Trash2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"


export type Employees = {
    id:string;
    amount:number;
    username:string;
    email:string;
    status:"pending" | "processing"| "success" | "failed" ;
}

export const columns: ColumnDef<Employees>[] = [
  {
    id:"select",
    header:({table})=>( 
      <Checkbox 
        onCheckedChange={(value)=>table.toggleAllPageRowsSelected(!!value)}
        checked={table.getIsAllPageRowsSelected()||table.getIsSomePageRowsSelected() && "indeterminate"}
      />
    ),
    cell:({row})=>(
      <Checkbox 
        onCheckedChange={(value)=>row.toggleSelected(!!value)}
        checked={row.getIsSelected()}
      />
    )
  },
  {
    accessorKey: "username",
    header: "user",
    cell: ({ row }) => <div className="text-left">{row.getValue("username")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div className="text-left w-full">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="mx-auto"
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="text-left w-full">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue("status")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-left">Amount</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue("amount")}</div>,
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
            onClick={() => alert(`Delete ${employee.username}`)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          {/* Edit (Sheet) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit {employee.username}</SheetTitle>
                <SheetDescription>
                  Update the employee information and save changes.
                </SheetDescription>
              </SheetHeader>

              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  defaultValue={employee.username}
                  className="w-full rounded border px-2 py-1"
                />
                <input
                  type="email"
                  defaultValue={employee.email}
                  className="w-full rounded border px-2 py-1"
                />
                <input
                  type="number"
                  defaultValue={employee.amount}
                  className="w-full rounded border px-2 py-1"
                />

                <Button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white">
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
            <Eye  className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  }
]
