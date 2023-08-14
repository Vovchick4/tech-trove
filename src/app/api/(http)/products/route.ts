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
        const categories_slug: any = request.nextUrl.searchParams.get("categories_slug");

        const filterOps = {
            include: { categories: true, child_categories: true },
        }

        let finded: any = await prisma.product.findMany({ orderBy: { name: "asc" }, include: filterOps.include });
        if (!categories_slug) {
            return NextResponse.json({ products: finded, message: "200 OK!" });
        } else if (categories_slug.split(",").length === 1) {
            console.log(categories_slug.split(",").length);

            finded = await prisma.product.findMany({ orderBy: { name: "asc" }, where: { categories: { some: { slug: { equals: categories_slug } } } }, include: filterOps.include });
            if (finded) {
                return NextResponse.json({ products: finded, message: "200 OK!" });
            } else {
                return NextResponse.json({ products: [], message: "Not found products!" });
            }
        } else {
            finded = await prisma.product.findMany({ orderBy: { name: "asc" }, where: { child_categories: { some: { slug: { in: categories_slug.split(",") } } } }, include: filterOps.include });
            if (finded) {
                return NextResponse.json({ products: finded, message: "200 OK!" });
            } else {
                return NextResponse.json({ products: [], message: "Not found products!" });
            }
        }
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data' });
    }
}