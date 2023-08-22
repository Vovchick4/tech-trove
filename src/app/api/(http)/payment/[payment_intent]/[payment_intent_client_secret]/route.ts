import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';
import { prisma } from "@/app/api/lib/prisma-client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-08-16',
})

export async function POST(request: NextRequest,
    { params: { payment_intent, payment_intent_client_secret } }:
        { params: { payment_intent_client_secret: string, payment_intent: string } }) {
    try {
        if (payment_intent && payment_intent_client_secret) {
            const paymentIntents = await stripe.paymentIntents.retrieve(payment_intent);
            if (paymentIntents) {
                const getOrder = await prisma.order.findFirst({ where: { payment_intent: paymentIntents.id } })
                if (getOrder) {
                    return NextResponse.json({ payment: paymentIntents, order: getOrder });
                } else {
                    const { products } = await request.json();
                    const newOrder = await prisma.order.create({
                        data: {
                            total_price: paymentIntents.amount / 100,
                            items: products,
                            user_email: "ch.vova@gmail",
                            payment_intent: paymentIntents.id
                        }
                    })
                    return NextResponse.json({ payment: paymentIntents, order: newOrder });
                }
            } else {
                return NextResponse.json({ error: "Not found this payment intent!" });
            }
        } else {
            return NextResponse.json({ error: "Provide payment desc!" });
        }
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}