"use client"

import { Heading } from "@/components/ui/Heading"
import { OrderColumn, columns } from "./column"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"

interface OrderClientProps {
  data : OrderColumn[]
}


const ProductClient : React.FC<OrderClientProps> = ({data}) => {

  return (
    <>
    <div className="flex items-center justify-between">
        <Heading title={`Orders (${data.length})`} description="Manage Orders for you store"/>
    </div>
    <Separator />
    <DataTable searchKey="product" columns={columns} data={data}/>
    </>
  )
}
export default ProductClient