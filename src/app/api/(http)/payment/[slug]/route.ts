import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-08-16',
})

export async function GET(request: NextRequest, { params: { slug } }: { params: { slug: string } }) {
    try {
        return NextResponse.json(await stripe.paymentIntents.retrieve(slug));
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}