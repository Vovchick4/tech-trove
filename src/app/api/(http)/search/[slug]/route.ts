import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/lib/prisma-client";

export async function GET(request: NextRequest, { params: { slug } }: { params: { slug: string } }) {
    try {
        if (typeof slug === "string" && slug.trim().length > 0) {
            const categories = await prisma.mainCategory.findMany({ where: { OR: [{ name: { contains: slug, mode: "insensitive" } }, { slug: { contains: slug, mode: "insensitive" } }] }, orderBy: { name: "asc" } })
            const products = await prisma.product.findMany({ where: { OR: [{ name: { contains: slug, mode: "insensitive" } }, { slug: { contains: slug, mode: "insensitive" } }] }, orderBy: { name: "asc" } })

            return NextResponse.json({
                result: [{
                    name: "Category",
                    data: categories || [],
                }, {
                    name: "Product",
                    data: products || [],
                }]
            });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data' });
    }
}
