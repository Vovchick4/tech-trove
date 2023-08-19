import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-08-16',
})

export async function GET(request: NextRequest, { params: { payment_intent, payment_intent_client_secret } }: { params: { payment_intent_client_secret: string, payment_intent: string } }) {
    try {
        if (payment_intent && payment_intent_client_secret) {
            const paymentIntents = await stripe.paymentIntents.retrieve(payment_intent);
            if (paymentIntents) {
                return NextResponse.json(paymentIntents);
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