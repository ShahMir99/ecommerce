import Prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {params}: {params : {colorId: string }}
    ) {
        try{
            if(!params.colorId){
                return new NextResponse("colorId id is required" , {status : 400})
            }

            const color = await Prisma.color.findUnique({
                where : {
                    id : params.colorId,
                }
            })
            
            return NextResponse.json(color)

        }catch(err){
            console.log('[COLORS_GET]' , err);
            return new NextResponse("Internal Error" , {status : 500})
        }
}

export async function PATCH(
    req: Request,
    {params}: {params : { storeId : string ,colorId: string }}
    ) {
        try{

            const {userId} = auth()
            const body = await req.json();
            const {name , value} = body;
            
            if(!userId){
                return new NextResponse("Unauthenticated" , {status : 401})
            }

            if(!name){
                return new NextResponse("Name is required" , {status : 400})
            }

            if(!value){
                return new NextResponse("Value is required" , {status : 400})
            }

            if(!params.colorId){
                return new NextResponse("colorId id is required" , {status : 400})
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

            const color = await Prisma.color.updateMany({
                where : {
                    id : params.colorId,
                },
                data : {
                    name,
                    value
                }
            })

            return NextResponse.json(color)

        }catch(err){
            console.log('[COLORS_PATCH]' , err);
            return new NextResponse("Internal Error" , {status : 500})
        }
}

export async function DELETE(
    req: Request,
    {params}: {params : { storeId : string ,colorId: string }}
    ) {
        try{
            const {userId} = auth()
            
            if(!userId){
                return new NextResponse("Unauthenticated" , {status : 401})
            }

            if(!params.colorId){
                return new NextResponse("colorId id is required" , {status : 400})
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

            const color = await Prisma.color.deleteMany({
                where : {
                    id : params.colorId,
                }
            })
            
            return NextResponse.json(color)

        }catch(err){
            console.log('[COLORS_DELETE]' , err);
            return new NextResponse("Internal Error" , {status : 500})
        }
}

