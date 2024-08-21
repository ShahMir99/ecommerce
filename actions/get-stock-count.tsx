import Prisma from "@/lib/prismadb"


export const getStockCount = async (storeId : string) => {
    const orderCount = await Prisma.product.count({
        where : {
            storeId,
            isArchived : false
        }
    })

    return orderCount;
}