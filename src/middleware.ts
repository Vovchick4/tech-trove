import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt"

export default async function middleware(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAccountPage = req?.url?.includes('/account');

  if (token && !isAccountPage) {
    return NextResponse.redirect(new URL("/", req.url))
  } else if (!token && isAccountPage) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login/:path*', '/register/:path*', '/account/:path*'],
};
