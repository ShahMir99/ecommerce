import Prisma from "@/lib/prismadb";

interface GraphData {
  name: string;
  total: number;
}

export const getGraphRevenue = async (storeId: string) => {
  const paidCount = await Prisma.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const monthlyRevenue: { [key: number]: number } = {};

  for (const order of paidCount) {
    const month = order.createAt.getMonth();

    let revenueForOrder = 0;

    for (const items of order.orderItems) {
      revenueForOrder += items.product.price.toNumber();
    }

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  const GraphData: GraphData[] = [
    { name: "Jan",   total: 0 },
    { name: "Feb",   total: 0 },
    { name: "March", total: 0 },
    { name: "April", total: 0 },
    { name: "May",   total: 0 },
    { name: "June",  total: 0 },
    { name: "July",  total: 0 },
    { name: "Aug",   total: 0 },
    { name: "Sep",   total: 0 },
    { name: "Oct",   total: 0 },
    { name: "Nov",   total: 0 },
    { name: "Dec",   total: 0 },
  ];

  for (const month in monthlyRevenue) {
    GraphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return GraphData;
};
