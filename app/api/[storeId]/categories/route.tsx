import Prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request , {params } : {params : {storeId : string}}) {
    try {

        const {userId} = auth();
        
        const body = await req.json()

        const {name , billboardId} = body;

        if(!userId){
            return new NextResponse("Unauthenticated" , {status : 401})
        }

        if(!name){
            return new NextResponse("Unauthenticated" , {status : 401})
        }

        if(!billboardId){
            return new NextResponse("billboardId is Required" , {status : 400})
        }

        if(!params.storeId){
            return new NextResponse("Store id is Required" , {status : 400})
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

        const category = await Prisma.category.create({
            data : {
               name,
               billboardId,
               storeId : params.storeId    
            }
        })

        return NextResponse.json(category)

    } catch (err) {
        console.log('[CATEGORIES_POST]' , err);
        return new NextResponse("Internal Error" , {status : 500})
    }
}


export async function GET(req: Request , {params } : {params : {storeId : string}}) {
    try {

        if(!params.storeId){
            return new NextResponse("Store id is Required" , {status : 400})
        }

        const categories = await Prisma.category.findMany({
            where : {
                storeId : params.storeId
            }
        })

        return NextResponse.json(categories)

    } catch (err) {
        console.log('[CATEGORIES_GET]' , err);
        return new NextResponse("Internal Error" , {status : 500})
    }
}