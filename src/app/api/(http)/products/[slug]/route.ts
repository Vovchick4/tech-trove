import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/lib/prisma-client";

export async function GET(request: NextRequest, { params: { slug } }: { params: { slug: string } }) {
    try {
        if (typeof slug === "string") {
            return NextResponse.json({ product: await prisma.product.findFirst({ where: { slug }, include: { categories: true } }) });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data' });
    }
}

export async function PUT(request: NextRequest, { params: { slug } }: { params: { slug: string } }) {
    try {
        const { categories_ids, ...data } = await request.json();

        const updated = await prisma.product.update({
            where: { id: slug },
            data: {
                ...data,
                categories: { connect: categories_ids.map((id: string) => ({ id })) },
            },
            include: { categories: true }
        });

        return NextResponse.json({ category: updated, message: "202 updated!" });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data' });
    }
}