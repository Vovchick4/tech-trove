import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma-client";
import { ObjectId } from 'mongodb'
export async function POST(req: NextRequest) {
    try {
        const { id, name, email, password } = (await req.json()) as {
            id: string;
            name: string;
            email: string;
            password: string;
        };
        const hashed_password = await hash(password, 12);

        if (await prisma.user.findFirst({ where: { email } })) {
            return NextResponse.json({
                message: "User with this email already exists!"
            });
        }
        

        const user = await prisma.user.create({
            data: {
                id: new ObjectId().toString(),
                name,
                email: email.toLowerCase(),
                password: hashed_password,
            },
        });

        return NextResponse.json({
            user: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: error.message,
            }),
            { status: 500 }
        );
    }
}