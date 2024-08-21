"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type ColorsColumn = {
  id: string
  name: string
  value: string
  createAt: string
}

export const columns: ColumnDef<ColorsColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell : ({row}) => (
      <div className="flex items-center gap-x-4">
        <div className="h-6 w-6 rounded-full border" style={{backgroundColor : row.original.value}}></div>
        {row.original.value}
      </div>
    )
  },
  {
    accessorKey: "createAt",
    header: "Date",
  },
  {
    id: "Actions",
    cell: ({row}) => <CellAction data={row.original}/>
  }
]
