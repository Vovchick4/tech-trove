import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma-client';

export async function GET() {
  try {
    const finded = await prisma.mainCategory.findMany({ orderBy: { name: "asc" }, include: { products: true, sub_categories: true } });
    if (finded) {
      return NextResponse.json({ categories: finded, message: "200 OK!" });
    } else {
      return NextResponse.json({ categories: [], message: "Not found categories!" });
    }
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { product_ids, sub_categories_ids, ...data } = await request.json();

    const created = await prisma.mainCategory.create({
      data: {
        ...data,
        product: { connect: product_ids.map((id: string) => ({ id })) },
        sub_categories: { connect: sub_categories_ids.map((id: string) => ({ id })) }
      },
      include: { products: true, sub_categories: true }
    });

    return NextResponse.json({ category: created, message: "201 created!" });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}