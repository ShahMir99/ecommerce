import Prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("productId id is required", { status: 400 });
    }

    const Product = await Prisma.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(Product);
  } catch (err) {
    console.log("[PRODUCT_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is Required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is Required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("CategoryId is Required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("ColorId is Required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("SizeId is Required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images is Required", { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse("productId id is required", { status: 400 });
    }

    const storeByUser = await Prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUser) {
      return new NextResponse("Unauthrized", { status: 400 });
    }

    await Prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived
      },
    });

    const Product = await Prisma.product.update({
        where : {
            id : params.productId
        },
        data : {
            images : {
                createMany : {
                    data : [
                        ...images.map((image : {url : string}) => image)
                    ]
                }
            }
        }
    })

    return NextResponse.json(Product);
  } catch (err) {
    console.log("[PRODUCT_PATCH]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse("productId id is required", { status: 400 });
    }

    const storeByUser = await Prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUser) {
      return new NextResponse("Unauthrized", { status: 400 });
    }

    const product = await Prisma.product.deleteMany({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (err) {
    console.log("[PRODUCT_DELETE]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
