"use client"

import { Plus } from "lucide-react"

import { Heading } from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { BillboardColumn, columns } from "./column"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import ApiList from "@/components/ui/api-list"

interface BillboardClientProps {
  data : BillboardColumn[]
}


const BillboardClient : React.FC<BillboardClientProps> = ({data}) => {
    const params = useParams();
    const router = useRouter()
  return (
    <>
    <div className="flex items-center justify-between">
        <Heading title={`Billboard (${data.length})`} description="Manage Billboard for you store"/>
        <Button onClick={() => router.push(`/${params.storeid}/billboards/new`)} >
            <Plus className="mr-2 w-4 h-4"/>
            Add new
        </Button>
    </div>
    <Separator />
    <DataTable searchKey="label" columns={columns} data={data}/>
    <Heading title="API" description="Api calls for Billboards"/>
    <Separator />
    <ApiList entityName="billboards" entityIdName="billboardsId"/>
    </>
  )
}
export default BillboardClient