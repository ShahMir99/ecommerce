import Stripe from "stripe"
import {NextResponse} from "next/server"

import { stripe } from "@/lib/stripe"
import Prisma from "@/lib/prismadb"

const corsHeaders = {
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Methods" : "GET , POST , PUT , DELETE , OPTIONS",
    "Access-Control-Allow-Headers" : "Content-Type, Authorization"
}

export async function OPTIONS(){
    return NextResponse.json({}, {headers : corsHeaders})
}

export async function POST(req : Request , {params} : {params : {storeId : string}}){
    const {productsId} = await req.json();

    if(!productsId ||productsId.length === 0){
        return new NextResponse("Products id Required" , {status : 400})
    }

    const products = await Prisma.product.findMany({
        where : {
            id : {
                in : productsId
            }
        }
    })

    const line_items : Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    products.forEach((item) => {
        line_items.push({
            quantity : 1,
            price_data : {
                currency : 'PKR',
                product_data : {
                    name : item.name
                },
                unit_amount : item.price.toNumber() * 100
            }
        });
    })


    const order = await Prisma.order.create({
        data : {
            storeId : params.storeId,
            isPaid : false,
            orderItems : {
                create : productsId.map((productId : string) => ({
                    product : {
                        connect : {
                            id : productId
                        }
                    }
                }))
            }
        }
    })

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        billing_address_collection : "required",
        phone_number_collection : {
            enabled : true
        },

        success_url : `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
        cancel_url : `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
        metadata : {
            orderId : order.id
        }
    })


    return NextResponse.json({url : session.url},{
        headers : corsHeaders
    })
}   