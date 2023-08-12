import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma-client'

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const created = await prisma.product.create({
            data,
            include: { categories: true }
        });

        return NextResponse.json(created);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data' });
    }
}

export async function GET(request: NextRequest) {
    try {
        const sub_categories_ids: any = request.nextUrl.searchParams.get("sub_categories_ids");

        const filterOps = {
            categories: { some: { sub_categories: { some: { slug: { in: new Array(sub_categories_ids) } } } } },
            include: { categories: { include: { sub_categories: true } } },
        }

        let finded: any = await prisma.product.findMany({ orderBy: { name: "asc" }, include: filterOps.include });
        if (!sub_categories_ids) {
            return NextResponse.json({ products: finded, message: "200 OK!" });
        }

        finded = await prisma.product.findMany({ orderBy: { name: "asc" }, where: { categories: filterOps.categories }, include: filterOps.include });
        if (finded) {
            return NextResponse.json({ products: finded, message: "200 OK!" });
        } else {
            return NextResponse.json({ products: [], message: "Not found products!" });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data' });
    }
}