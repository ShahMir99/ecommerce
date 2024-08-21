import Prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {params}: {params : { storeid: string }}
    ) {
        try{

            const {userId} = auth()
            const body = await req.json();
            const {name} = body;
            
            if(!userId){
                return new NextResponse("Unauthenticated" , {status : 401})
            }

            if(!name){
                return new NextResponse("name is required" , {status : 400})
            }

            if(!params.storeid){
                return new NextResponse("store id is required" , {status : 400})
            }

            const store = await Prisma.store.updateMany({
                where : {
                    id : params.storeid,
                    userId
                },
                data : {
                    name
                }
            })

            return NextResponse.json(store)

        }catch(err){
            console.log('[STORE_PATCH]' , err);
            return new NextResponse("Internal Error" , {status : 500})
        }
}

export async function DELETE(
    req: Request,
    {params}: {params : { storeid: string }}
    ) {
        try{
            const {userId} = auth()
            
            if(!userId){
                return new NextResponse("Unauthenticated" , {status : 401})
            }

            if(!params.storeid){
                return new NextResponse("store id is required" , {status : 400})
            }

            const store = await Prisma.store.deleteMany({
                where : {
                    id : params.storeid,
                    userId
                }
            })
            
            return NextResponse.json(store)

        }catch(err){
            console.log('[STORE_DELETE]' , err);
            return new NextResponse("Internal Error" , {status : 500})
        }
}


export async function GET(
    req: Request,
    {params}: {params : { storeid: string }}
    ) {
        try{
            if(!params.storeid){
                return new NextResponse("store id is required" , {status : 400})
            }

            const store = await Prisma.store.findUnique({
                where : {
                    id : params.storeid
                }
            })
        
            return NextResponse.json(store)

        }catch(err){
            console.log('[STORE_GET]' , err);
            return new NextResponse("Internal Error" , {status : 500})
        }
}
