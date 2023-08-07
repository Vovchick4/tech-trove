import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma-client';

export async function GET(request: NextRequest) {
    try {
        const getSlug = request.nextUrl.searchParams.get("slug");
        if (typeof getSlug === "string") {
            return NextResponse.json(await prisma.product.findFirst({ where: { slug: getSlug } }));
        }
        return NextResponse.json(await prisma.product.findMany());
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data' });
    }
}