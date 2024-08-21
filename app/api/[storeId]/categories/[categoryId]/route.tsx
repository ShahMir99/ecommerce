import Prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {params}: {params : {categoryId: string }}
    ) {
        try{
            if(!params.categoryId){
                return new NextResponse("categoryId id is required" , {status : 400})
            }

            const category = await Prisma.category.findUnique({
                where : {
                    id : params.categoryId,
                },
                include : {
                    billboard : true
                }
            })
            
            return NextResponse.json(category)

        }catch(err){
            console.log('[CATEGORYID_GET]' , err);
            return new NextResponse("Internal Error" , {status : 500})
        }
}

export async function PATCH(
    req: Request,
    {params}: {params : { storeId : string ,categoryId: string }}
    ) {
        try{

            const {userId} = auth()
            const body = await req.json();
            const {name , billboardId} = body;
            
            if(!userId){
                return new NextResponse("Unauthenticated" , {status : 401})
            }

            if(!name){
                return new NextResponse("name is required" , {status : 400})
            }

            if(!billboardId){
                return new NextResponse("billboardId is required" , {status : 400})
            }

            if(!params.categoryId){
                return new NextResponse("categoryId id is required" , {status : 400})
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

            const billboard = await Prisma.category.updateMany({
                where : {
                    id : params.categoryId,
                },
                data : {
                    name,
                    billboardId
                }
            })

            return NextResponse.json(billboard)

        }catch(err){
            console.log('[CATEGORYID_PATCH]' , err);
            return new NextResponse("Internal Error" , {status : 500})
        }
}

export async function DELETE(
    req: Request,
    {params}: {params : { storeId : string ,categoryId: string }}
    ) {
        try{
            const {userId} = auth()
            
            if(!userId){
                return new NextResponse("Unauthenticated" , {status : 401})
            }

            if(!params.categoryId){
                return new NextResponse("categoryId id is required" , {status : 400})
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

            const category = await Prisma.category.deleteMany({
                where : {
                    id : params.categoryId,
                }
            })
            
            return NextResponse.json(category)

        }catch(err){
            console.log('[CATEGORYID_DELETE]' , err);
            return new NextResponse("Internal Error" , {status : 500})
        }
}

