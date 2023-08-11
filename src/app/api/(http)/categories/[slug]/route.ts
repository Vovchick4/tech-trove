import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/lib/prisma-client";

export async function PUT(request: NextRequest, { params: { slug } }: { params: { slug: string } }) {
    try {
        const { product_ids, sub_categories_ids, ...data } = await request.json();

        const updated = await prisma.mainCategory.update({
            where: { id: slug },
            data: {
                ...data,
                product: { connect: product_ids.map((id: string) => ({ id })) },
                sub_categories: { connect: sub_categories_ids.map((id: string) => ({ id })) }
            },
            include: { products: true, sub_categories: true }
        });

        return NextResponse.json({ category: updated, message: "202 updated!" });
    } catch (error) {
        console.log("🚀 ~ file: route.ts:24 ~ PUT ~ error:", error)
        return NextResponse.json({ category: {}, message: "Not found categories!" });
    }
}