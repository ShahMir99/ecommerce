import Prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request , {params } : {params : {storeId : string}}) {
    try {

        const {userId} = auth();
        const body = await req.json()

        const {
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            images,
            isFeatured,
            isArchived
        } = body;

        if(!userId){
            return new NextResponse("Unauthenticated" , {status : 401})
        }

        if(!name){
            return new NextResponse("Name is Required" , {status : 400})
        }
        if(!price){
            return new NextResponse("Price is Required" , {status : 400})
        }
        if(!categoryId){
            return new NextResponse("categoryId is Required" , {status : 400})
        }
        if(!colorId){
            return new NextResponse("ColorId is Required" , {status : 400})
        }
        if(!sizeId){
            return new NextResponse("SizeId is Required" , {status : 400})
        }
        if(!images || !images.length){
            return new NextResponse("Images is Required" , {status : 400})
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

        const product = await Prisma.product.create({
            data : {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                images : {
                    createMany : {
                        data : [
                            ...images.map((image : {url : string}) => image)
                        ]
                    }
                },
                isFeatured,
                isArchived,
                storeId : params.storeId    
            }
        })

        return NextResponse.json(product)

    } catch (err) {
        console.log('[PRODUCT_POST]' , err);
        return new NextResponse("Internal Error" , {status : 500})
    }
}




export async function GET(req: Request , {params } : {params : {storeId : string}}) {
    try {
        const {searchParams} = new URL(req.url)
        const categoryId = searchParams.get("categoryId") || undefined
        const colorId = searchParams.get("colorId") || undefined
        const sizeId = searchParams.get("sizeId") || undefined
        const isFeatured = searchParams.get("isFeatured") || undefined

        if(!params.storeId){
            return new NextResponse("Store id is Required" , {status : 400})
        }

        const products = await Prisma.product.findMany({
            where : {
                storeId : params.storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured : isFeatured ? true : undefined,
                isArchived : false
            },
            include : {
                category : true,
                images : true,
                color : true,
                size : true

            },
            orderBy : {
                createAt :"desc"
            }
        })

        return NextResponse.json(products)

    } catch (err) {
        console.log('[PRODUCT_GET]' , err);
        return new NextResponse("Internal Error" , {status : 500})
    }
}