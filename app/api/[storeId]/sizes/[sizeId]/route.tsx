import Prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {params}: {params : {sizeId: string }}
    ) {
        try{
            if(!params.sizeId){
                return new NextResponse("sizeId is required" , {status : 400})
            }

            const size = await Prisma.size.findUnique({
                where : {
                    id : params.sizeId,
                }
            })
            
            return NextResponse.json(size)

        }catch(err){
            console.log('[SIZE_GET]' , err);
            return new NextResponse("Internal Error" , {status : 500})
        }
}

export async function PATCH(
    req: Request,
    {params}: {params : { storeId : string ,sizeId: string }}
    ) {
        try{

            const {userId} = auth()
            const body = await req.json();
            const {name , value} = body;
            
            if(!userId){
                return new NextResponse("Unauthenticated" , {status : 401})
            }

            if(!name){
                return new NextResponse("name is required" , {status : 400})
            }

            if(!value){
                return new NextResponse("value is required" , {status : 400})
            }

            if(!params.sizeId){
                return new NextResponse("billboardId id is required" , {status : 400})
            }

            const storeByUser = await Prisma.store.findFirst({
                where : {
                    id : params.storeId,
                    userId
                }
            });

            if(!storeByUser){
                return new NextResponse("Unauthrized" , {status : 400})
            }

            const size = await Prisma.size.updateMany({
                where : {
                    id : params.sizeId,
                },
                data : {
                    name,
                    value
                }
            })
            return NextResponse.json(size)

        }catch(err){
            console.log('[SIZE_PATCH]' , err);
            return new NextResponse("Internal Error" , {status : 500})
        }
}

export async function DELETE(
    req: Request,
    {params}: {params : { storeId : string ,sizeId: string }}
    ) {
        try{
            const {userId} = auth()
            
            if(!userId){
                return new NextResponse("Unauthenticated" , {status : 401})
            }

            if(!params.sizeId){
                return new NextResponse("sizeId id is required" , {status : 400})
            }

            const storeByUser = await Prisma.store.findFirst({
                where : {
                    id : params.storeId,
                    userId
                }
            });

            if(!storeByUser){
                return new NextResponse("Unauthrized" , {status : 400})
            }

            const size = await Prisma.size.deleteMany({
                where : {
                    id : params.sizeId,
                }
            })
            
            return NextResponse.json(size)

        }catch(err){
            console.log('[Size_DELETE]' , err);
            return new NextResponse("Internal Error" , {status : 500})
        }
}

