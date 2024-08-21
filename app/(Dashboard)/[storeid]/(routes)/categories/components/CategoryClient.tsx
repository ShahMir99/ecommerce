"use client"

import { Plus } from "lucide-react"

import { Heading } from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { CategoryColumn, columns } from "./column"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import ApiList from "@/components/ui/api-list"

interface CategoryClientProps {
  data : CategoryColumn[]
}


const CategoryClient : React.FC<CategoryClientProps> = ({data}) => {
    const params = useParams();
    const router = useRouter()
  return (
    <>
    <div className="flex items-center justify-between">
        <Heading title={`Categories (${data.length})`} description="Manage Categories for you store"/>
        <Button onClick={() => router.push(`/${params.storeid}/categories/new`)} >
            <Plus className="mr-2 w-4 h-4"/>
            Add new
        </Button>
    </div>
    <Separator />
    <DataTable searchKey="name" columns={columns} data={data}/>
    <Heading title="API" description="Api calls for Categories"/>
    <Separator />
    <ApiList entityName="categories" entityIdName="categoryId"/>
    </>
  )
}
export default CategoryClient