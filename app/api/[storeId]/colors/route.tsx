import Prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request , {params } : {params : {storeId : string}}) {
    try {

        const {userId} = auth();
        const body = await req.json()

        const {name , value} = body;

        if(!userId){
            return new NextResponse("Unauthenticated" , {status : 401})
        }

        if(!name){
            return new NextResponse("Name is Required" , {status : 400})
        }

        if(!params.storeId){
            return new NextResponse("Store id is Required" , {status : 400})
        }

        if(!value){
            return new NextResponse("Value is Required" , {status : 400})
        }

        const storeByUser = await Prisma.store.findFirst({
            where : {
                id : params.storeId,
                userId
            }
        });

        if(!storeByUser){
            return new NextResponse("Unauthorized" , {status : 403})
        }

        const color = await Prisma.color.create({
            data : {
               name,
               value,
               storeId : params.storeId    
            }
        })

        return NextResponse.json(color)

    } catch (err) {
        console.log('[COLOR_POST]' , err);
        return new NextResponse("Internal Error" , {status : 500})
    }
}


export async function GET(req: Request , {params } : {params : {storeId : string}}) {
    try {

        if(!params.storeId){
            return new NextResponse("Store id is Required" , {status : 400})
        }

        const colos = await Prisma.color.findMany({
            where : {
                storeId : params.storeId
            }
        })

        return NextResponse.json(colos)

    } catch (err) {
        console.log('[COLORS_GET]' , err);
        return new NextResponse("Internal Error" , {status : 500})
    }
}