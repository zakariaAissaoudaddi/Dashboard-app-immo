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
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
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
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
      },
    },
    {
      accessorKey: "status",
      header: "Status" ,
      
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 ">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]