import Prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {

        const {userId} = auth();
        const body = await req.json()

        const {name} = body;

        if(!userId){
            return new NextResponse("Unauthorized" , {status : 401})
        }

        if(!name){
            return new NextResponse("name is Required" , {status : 400})
        }

        const store = await Prisma.store.create({
            data : {
               name,
               userId
            }
        })

        return NextResponse.json(store)

    } catch (err) {
        console.log('[STORE_POST]' , err);
        return new NextResponse("Internal Error" , {status : 500})
    }
}


