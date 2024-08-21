import Prisma from "@/lib/prismadb"


export const getTotalRevenue = async (storeId : string) => {
    const paidOrer = await Prisma.order.findMany({
        where : {
            storeId,
            isPaid : true
        },
        include : {
            orderItems : {
                include : {
                    product : true
                }
            }
        }
    })

    const totalRevenue = paidOrer.reduce((total , order) => {
        const orderTotal = order.orderItems.reduce((orderSum , items) => {
            return orderSum + items.product.price.toNumber()
        },0)

        return total + orderTotal
    }, 0)


    return totalRevenue;
}