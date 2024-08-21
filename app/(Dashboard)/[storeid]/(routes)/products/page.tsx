import {format} from "date-fns"

import ProductClient from "./components/ProductClient"
import Prisma from "@/lib/prismadb";
import { ProductColumn } from "./components/column";
import { formatter } from "@/lib/utils";

interface ProductsPageProps {
  params : {storeid : string}
}

const ProductsPage : React.FC<ProductsPageProps> = async ({params}) => {

  const Products = await Prisma.product.findMany({
    where : {
      storeId : params.storeid
    },
    include : {
      category : true,
      size : true,
      color : true
    },
    orderBy : {
      createAt : "desc"
    }
  })

  const formatedProducts : ProductColumn[] = Products.map((item) => ({
    id : item.id,
    name : item.name,
    isFeatured : item.isFeatured,
    isArchived : item.isArchived,
    price : formatter.format(item.price.toNumber()),
    category : item.category.name,
    size : item.size.name,
    color : item.color.value,
    createAt : format(item.createAt , "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
          <ProductClient data={formatedProducts}/>
      </div>
    </div>
  )
}

export default ProductsPage