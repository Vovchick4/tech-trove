import { NextResponse } from 'next/server'

import dbConnect from "../../data-source";
import ProductModel from '../../schema/product';

(async () => {
    await dbConnect();
})()

export async function GET() {
    try {
        const products = await ProductModel.find();
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data' });
    }
}