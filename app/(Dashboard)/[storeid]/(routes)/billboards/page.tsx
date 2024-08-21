import {format} from "date-fns"

import BillboardClient from "./components/BillboardClient"
import Prisma from "@/lib/prismadb";
import { BillboardColumn } from "./components/column";

interface BillboardPageProps {
  params : {storeid : string}
}

const BillboardPage : React.FC<BillboardPageProps> = async ({params}) => {

  const AllBillboards = await Prisma.billboard.findMany({
    where : {
      storeId : params.storeid
    },
    orderBy : {
      createAt : "desc"
    }
  })

  console.log(AllBillboards)

  const formatedCoulmn : BillboardColumn[] = AllBillboards.map((item) => ({
    id : item.id,
    label : item.label,
    imageUrl : item.imageUrl,
    createAt : format(item.createAt , "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
          <BillboardClient data={formatedCoulmn}/>
      </div>
    </div>
  )
}

export default BillboardPage