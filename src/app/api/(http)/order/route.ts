import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma-client";

export interface IOrder {
    payId: string;
    user_email: string;
    items: any[];
    total_price: number;
    user_id: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { payId, user_id, ...rest }: IOrder = await req.json();

        const findUser = await prisma.user.findFirst({ where: { email: user_id } })

        if (findUser) {
            await prisma.order.create({
                data: {
                    ...rest,
                    payment_intent: payId,
                    user: { connect: findUser },
                },
                include: { user: true }
            })
        } else {
            await prisma.order.create({
                data: {
                    ...rest,
                    payment_intent: payId,
                },
                include: { user: true }
            })
        }

        return NextResponse.json({ message: "Succed! Create a new order" });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}