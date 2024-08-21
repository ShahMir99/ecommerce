import Prisma from "@/lib/prismadb";
import { ProductForm } from "./components/ProductForm";

const ProductPage = async (
    { params } : {params : {productId: string , storeId : string }}
    ) => {

        const product = await Prisma.product.findUnique({
            where : {
                id : params.productId
            },
            include : {
                images : true
            }
        })

        const category = await Prisma.category.findMany({
            where : {
                storeId : params.storeId
            }
        })

        const size = await Prisma.size.findMany({
            where : {
                storeId : params.storeId
            }
        })

        const color = await Prisma.color.findMany({
            where : {
                storeId : params.storeId
            }
        })

  return (
      <div className="flex-col">
       <div className="flex-1 space-y-4 p-8 pt-6">
            <ProductForm initialData={product} category={category} size={size} color={color} />
       </div>
      </div>
      )
};

export default ProductPage;
