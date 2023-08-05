import { NextRequest, NextResponse } from 'next/server'

import Product from '../../schema/product';

const product = new Product();

export async function GET(request: NextRequest) {
    try {
        const getSlug = request.nextUrl.searchParams.get("slug");
        if (typeof getSlug === "string") {
            return NextResponse.json(await product.findBySlug(getSlug));
        }
        return NextResponse.json(await product.findAll());
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data' });
    }
}