"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import Image from "next/image"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
  id: string
  label: string
  imageUrl: string
  createAt: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    id : "imageUrl",
    header: "Images",
    cell : ({row}) => (
      <Image 
      src={row.original.imageUrl}
      alt="Image"
      width={70}
      height={70}
      />
    )
  },
  {
    accessorKey: "label",
    header: "Label",
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
