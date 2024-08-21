import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getTotalSales } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { Overview } from "@/components/Overview";
import { Heading } from "@/components/ui/Heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import {DollarSign , CreditCard , Package} from "lucide-react"

interface DashboardPageProps {
  params: { storeid: string };
}

const Dashboard: React.FC<DashboardPageProps> = async ({ params }) => {

    const totalRevenue = await getTotalRevenue(params.storeid)
    const totalSales = await getTotalSales(params.storeid)
    const StockCount = await getStockCount(params.storeid)

    const GraphRevenue = await getGraphRevenue(params.storeid)


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="OverView Of Your Store" />
        <Separator />
        <div className="grid gap-4 sm:grid-cols-3  lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2 justify-between">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {formatter.format(totalRevenue)}
                    </div>
                </CardContent>
            </Card>
            {/* Card two */}
            <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2 justify-between">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        +{totalSales}
                    </div>
                </CardContent>
            </Card>
            {/* Card three */}
            <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2 justify-between">
                    <CardTitle className="text-sm font-medium">Product in Stock</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {StockCount}
                    </div>
                </CardContent>
            </Card>
        </div>
        <Card className=" col-span-4">
            <CardHeader>
                <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <Overview data={GraphRevenue} />
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
