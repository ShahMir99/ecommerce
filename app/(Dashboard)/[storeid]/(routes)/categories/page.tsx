import {format} from "date-fns"

import CategoryClient from "./components/CategoryClient"
import Prisma from "@/lib/prismadb";
import { CategoryColumn } from "./components/column";


const CategoriesPage = async ({params} : {params : {storeid : string}}) => {

  const categories = await Prisma.category.findMany({
    where : {
      storeId : params.storeid
    },
    include : {
      billboard : true
    },
    orderBy : {
      createAt : "desc"
    }
  })


  const formatedCategories : CategoryColumn[] = categories.map((item) => ({
    id : item.id,
    name : item.name,
    billboardLabel : item.billboard.label,
    createAt : format(item.createAt , "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
          <CategoryClient data={formatedCategories}/>
      </div>
    </div>
  )
}

export default CategoriesPage