import Prisma from "@/lib/prismadb";
import { BillboardForm } from "./components/BillboardForm";

const BillboardPage = async (
    { params } : {params : {billboardId: string }}
    ) => {

        const billboard = await Prisma.billboard.findUnique({
            where : {
                id : params.billboardId
            }
        })

  return (
      <div className="flex-col">
       <div className="flex-1 space-y-4 p-8 pt-6">
            <BillboardForm initialData={billboard}/>
       </div>
      </div>
      )
};

export default BillboardPage;
