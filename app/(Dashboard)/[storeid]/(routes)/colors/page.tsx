import {format} from "date-fns"

import ColorsClient from "./components/ColorsClient"
import Prisma from "@/lib/prismadb";
import { ColorsColumn } from "./components/column";

interface ColorsPageProps {
  params : {storeid : string}
}

const ColorsPage : React.FC<ColorsPageProps> = async ({params}) => {

  const Colors = await Prisma.color.findMany({
    where : {
      storeId : params.storeid
    },
    orderBy : {
      createAt : "desc"
    }
  })

  const formatedColors : ColorsColumn[] = Colors.map((item) => ({
    id : item.id,
    name : item.name,
    value : item.value,
    createAt : format(item.createAt , "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
          <ColorsClient data={formatedColors}/>
      </div>
    </div>
  )
}

export default ColorsPage