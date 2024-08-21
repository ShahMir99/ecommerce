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
            return new NextResponse("Label is Required" , {status : 400})
        }

        if(!params.storeId){
            return new NextResponse("name id is Required" , {status : 400})
        }

        if(!value){
            return new NextResponse("value is Required" , {status : 400})
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

        const size = await Prisma.size.create({
            data : {
               name,
               value,
               storeId : params.storeId    
            }
        })

        return NextResponse.json(size)

    } catch (err) {
        console.log('[SIZE_POST]' , err);
        return new NextResponse("Internal Error" , {status : 500})
    }
}


export async function GET(req: Request , {params } : {params : {storeId : string}}) {
    try {

        if(!params.storeId){
            return new NextResponse("Store id is Required" , {status : 400})
        }

        const size = await Prisma.size.findMany({
            where : {
                storeId : params.storeId
            }
        })

        return NextResponse.json(size)

    } catch (err) {
        console.log('[SIZE_GET]' , err);
        return new NextResponse("Internal Error" , {status : 500})
    }
}