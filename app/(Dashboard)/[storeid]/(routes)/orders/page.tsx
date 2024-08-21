import {format} from "date-fns"

import ProductClient from "./components/ProductClient"
import Prisma from "@/lib/prismadb";
import { OrderColumn } from "./components/column";
import { formatter } from "@/lib/utils";

interface OrdersPageProps {
  params : {storeid : string}
}

const OrdersPage : React.FC<OrdersPageProps> = async ({params}) => {

  const Orders = await Prisma.order.findMany({
    where : {
      storeId : params.storeid
    },
    include : {
      orderItems : {
        include : {
          product : true
        }
      }
    },
    orderBy : {
      createAt : "desc"
    }
  })


  const formatedOrders : OrderColumn[] = Orders.map((item) => ({
    id : item.id,
    phone : item.phone,
    adress : item.adress,
    product : item.orderItems.map((orderitem) => orderitem.product.name).join(', '),
    totalPrice : formatter.format(item.orderItems.reduce((total , item) => {
        return total + Number(item.product.price)
    },0)),
    isPaid : item.isPaid,
    createAt : format(item.createAt , "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
          <ProductClient data={formatedOrders}/>
      </div>
    </div>
  )
}

export default OrdersPage