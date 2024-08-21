import {format} from "date-fns"

import SizesClient from "./components/SizesClient"
import Prisma from "@/lib/prismadb";
import { SizesColumn } from "./components/column";

interface SizesPageProps {
  params : {storeid : string}
}

const SizesPage : React.FC<SizesPageProps> = async ({params}) => {

  const sizes = await Prisma.size.findMany({
    where : {
      storeId : params.storeid
    },
    orderBy : {
      createAt : "desc"
    }
  })

  const formatedSizes : SizesColumn[] = sizes.map((item) => ({
    id : item.id,
    name : item.name,
    value : item.value,
    createAt : format(item.createAt , "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
          <SizesClient data={formatedSizes}/>
      </div>
    </div>
  )
}

export default SizesPage