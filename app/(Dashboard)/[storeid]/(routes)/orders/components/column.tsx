"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OrderColumn = {
  id: string
  phone : string,
  adress : string,
  isPaid : boolean
  totalPrice : string,
  product : string,
  createAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey : "product",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "adress",
    header: "Adress",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  }
]
