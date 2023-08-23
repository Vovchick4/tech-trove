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
        const perPage = 6;
        const page_slug: any = request.nextUrl.searchParams.get("page") || 1;
        const categories_slug: any = request.nextUrl.searchParams.get("categories_slug");

        const filterOps = {
            paginate: {
                skip: (Number(page_slug) - 1) * perPage,
                take: perPage
            },
            include: { categories: true, child_categories: true },
        }
        let finded: any = await prisma.product.findMany({ orderBy: { name: "asc" }, skip: filterOps.paginate.skip, take: filterOps.paginate.take, include: filterOps.include });
        let findedCount = await prisma.product.count({});
        if (!categories_slug) {
            return NextResponse.json({ products: { data: finded, count: findedCount }, message: "200 OK!" });
        } else if (categories_slug.split(",").length === 1) {
            finded = await prisma.product.findMany({ orderBy: { name: "asc" }, where: { categories: { some: { slug: { equals: categories_slug } } } }, skip: filterOps.paginate.skip, take: filterOps.paginate.take, include: filterOps.include });
            findedCount = await prisma.product.count({ where: { categories: { some: { slug: { equals: categories_slug } } } } });
            if (finded) {
                return NextResponse.json({ products: { data: finded, count: findedCount }, message: "200 OK!" });
            } else {
                return NextResponse.json({ products: { data: [], count: null }, message: "Not found products!" });
            }
        } else {
            finded = await prisma.product.findMany({ orderBy: { name: "asc" }, where: { child_categories: { some: { slug: { in: categories_slug.split(",") } } } }, skip: filterOps.paginate.skip, take: filterOps.paginate.take, include: filterOps.include });
            findedCount = await prisma.product.count({ where: { child_categories: { some: { slug: { in: categories_slug.split(",") } } } } });
            if (finded) {
                return NextResponse.json({ products: { data: finded, count: findedCount }, message: "200 OK!" });
            } else {
                return NextResponse.json({ products: { data: [], count: null }, message: "Not found products!" });
            }
        }
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data' });
    }
}