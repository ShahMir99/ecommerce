import Prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {params}: {params : {billboardId: string }}
    ) {
        try{
            if(!params.billboardId){
                return new NextResponse("billboardId id is required" , {status : 400})
            }

            const billboard = await Prisma.billboard.findUnique({
                where : {
                    id : params.billboardId,
                }
            })
            
            return NextResponse.json(billboard)

        }catch(err){
            console.log('[BILLBOARD_GET]' , err);
            return new NextResponse("Internal Error" , {status : 500})
        }
}

export async function PATCH(
    req: Request,
    {params}: {params : { storeId : string ,billboardId: string }}
    ) {
        try{

            const {userId} = auth()
            const body = await req.json();
            const {label , imageUrl} = body;
            
            if(!userId){
                return new NextResponse("Unauthenticated" , {status : 401})
            }

            if(!label){
                return new NextResponse("label is required" , {status : 400})
            }

            if(!imageUrl){
                return new NextResponse("imageUrl is required" , {status : 400})
            }

            if(!params.billboardId){
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

            const billboard = await Prisma.billboard.updateMany({
                where : {
                    id : params.billboardId,
                },
                data : {
                    label,
                    imageUrl
                }
            })

            return NextResponse.json(billboard)

        }catch(err){
            console.log('[BILLBOARD_PATCH]' , err);
            return new NextResponse("Internal Error" , {status : 500})
        }
}

export async function DELETE(
    req: Request,
    {params}: {params : { storeId : string ,billboardId: string }}
    ) {
        try{
            const {userId} = auth()
            
            if(!userId){
                return new NextResponse("Unauthenticated" , {status : 401})
            }

            if(!params.billboardId){
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

            const billboard = await Prisma.billboard.deleteMany({
                where : {
                    id : params.billboardId,
                }
            })
            
            return NextResponse.json(billboard)

        }catch(err){
            console.log('[BILLBOARD_DELETE]' , err);
            return new NextResponse("Internal Error" , {status : 500})
        }
}

