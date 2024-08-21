import Prisma from "@/lib/prismadb"


export const getTotalSales = async (storeId : string) => {
    const orderCount = await Prisma.order.count({
        where : {
            storeId,
            isPaid : true
        }
    })

    return orderCount;
}