import { getToken } from "next-auth/jwt";
import {
    NextFetchEvent,
    NextMiddleware,
    NextRequest,
    NextResponse,
} from "next/server";

export default function WithAuthorization(
    middleware: NextMiddleware,
    requireAuth: string[] = []
) {
    return async (request: NextRequest, next: NextFetchEvent) => {
        const pathname = request.nextUrl.pathname;
        if (requireAuth.some((path) => pathname.startsWith(path))) {
            const token = await getToken({
                req: request,
                secret: process.env.NEXTAUTH_SECRET,
            });
            if (!token) {
                const url = new URL(`/login`, request.url);
                url.searchParams.set("callbackUrl ", encodeURI(request.url));
                return NextResponse.redirect(url);
            }
            if (token.role !== "admin") {
                const url = new URL(`/403`, request.url);
                return NextResponse.rewrite(url);
            }
        }
        return middleware(request, next);
    };
}