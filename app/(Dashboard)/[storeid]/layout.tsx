import Navbar from "@/components/Navbar"
import Prisma from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
    children,
    params
}:{
    children : React.ReactNode,
    params : {storeId : string}
}) {
    const {userId} = auth()
    if(!userId){
        redirect('/sign-in')
    }

    const store = await Prisma.store.findFirst({
        where : {
            id : params.storeId,
            userId
        }
    })

    if(!store){
        redirect('/sign-in')
    }

    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}