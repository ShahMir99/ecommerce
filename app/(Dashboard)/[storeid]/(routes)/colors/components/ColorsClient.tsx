"use client"

import { Plus } from "lucide-react"

import { Heading } from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { ColorsColumn, columns } from "./column"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import ApiList from "@/components/ui/api-list"

interface ColorsClientProps {
  data : ColorsColumn[]
}


const ColorsClient : React.FC<ColorsClientProps> = ({data}) => {
    const params = useParams();
    const router = useRouter()
  return (
    <>
    <div className="flex items-center justify-between">
        <Heading title={`Colors (${data.length})`} description="Manage Colors for you store"/>
        <Button onClick={() => router.push(`/${params.storeid}/colors/new`)} >
            <Plus className="mr-2 w-4 h-4"/>
            Add new
        </Button>
    </div>
    <Separator />
    <DataTable searchKey="name" columns={columns} data={data}/>
    <Heading title="API" description="Api calls for Colors"/>
    <Separator />
    <ApiList entityName="colors" entityIdName="colorId"/>
    </>
  )
}
export default ColorsClient