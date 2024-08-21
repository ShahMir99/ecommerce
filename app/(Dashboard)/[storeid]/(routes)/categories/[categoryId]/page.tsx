import Prisma from "@/lib/prismadb";
import { CategoryForm } from "./components/CategoryForm";

const CategoryIdPage = async (
    { params } : {params : {categoryId: string , storeid : string}}
    ) => {

        const category = await Prisma.category.findUnique({
            where : {
                id : params.categoryId
            }
        })

        const billboards = await Prisma.billboard.findMany({
            where : {
                storeId : params.storeid
            }
        })

  return (
      <div className="flex-col">
       <div className="flex-1 space-y-4 p-8 pt-6">
            <CategoryForm initialData={category} billboards={billboards}/>
       </div>
      </div>
      )
};

export default CategoryIdPage;
