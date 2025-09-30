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
import { table } from "console";
import { ArrowUpDown, Eye, FileUser, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Value } from "@radix-ui/react-select";


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
        <Checkbox onCheckedChange={(value)=>table.toggleAllPageRowsSelected(!!value)}
        checked={table.getIsAllPageRowsSelected()||table.getIsSomePageRowsSelected() && "indeterminate"}
        />
    ),
        cell:({row})=>(
            <Checkbox onCheckedChange={(value)=>row.toggleSelected(!!value)}
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
        <Button className="bg-red-500 hover:bg-red-600 text-white" size="icon" onClick={() => alert(`Delete ${employee.username}`)}>
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white" size="icon" onClick={() => alert(`Edit ${employee.username}`)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => alert(`View ${employee.username}`)}>
          <Eye  className="h-4 w-4" />
        </Button>
      </div>
    )
  },
}
]