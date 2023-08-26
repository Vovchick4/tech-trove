import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/lib/prisma-client";
import { authOptions } from "../../../lib/auth-options";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse(
            JSON.stringify({ status: "fail", message: "You are not logged in" }),
            { status: 401 }
        );
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user?.email || "",
        },
        include: { Order: true }
    });

    if (!user) {
        return new NextResponse(
            JSON.stringify({ status: "fail", message: "You are not logged in" }),
            { status: 401 }
        );
    }

    (user.password as string | undefined) = undefined;

    return NextResponse.json({
        authenticated: !!session,
        session: user,
    });
}