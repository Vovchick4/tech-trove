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
                    await prisma.order.update({
                        where: { payment_intent },
                        data: {
                            status: "paid"
                        },
                    })
                    return NextResponse.json({ payment: paymentIntents, order: getOrder, message: "this payment already has!" }, { status: 500 });
                } else {
                    const { user_email, user_id, items } = await request.json();
                    console.log("🚀 ~ file: route.ts:27 ~ items:", user_id);

                    let newOrder = null;
                    const findUser = await prisma.user.findFirst({ where: { email: user_id || "" } })
                    console.log("🚀 ~ file: route.ts:27 ~ items:", findUser);
                    if (findUser) {
                        newOrder = await prisma.order.create({
                            data: {
                                total_price: paymentIntents.amount / 100,
                                items,
                                user_email: user_email.email,
                                user: { connect: { id: findUser.id } },
                                payment_intent: paymentIntents.id,
                                status: "paid"
                            }
                        })
                    } else {
                        newOrder = await prisma.order.create({
                            data: {
                                total_price: paymentIntents.amount / 100,
                                items,
                                user_email: user_email.email,
                                payment_intent: paymentIntents.id,
                                status: "paid"
                            }
                        })
                    }

                    return NextResponse.json({ payment: paymentIntents, order: newOrder });
                }
            } else {
                return NextResponse.json({ error: "Not found this payment intent!" }, { status: 500 });
            }
        } else {
            return NextResponse.json({ error: "Provide payment desc!" }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}