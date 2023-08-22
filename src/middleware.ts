import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt"

async function authMiddleware(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({
        req: req,
        secret: process.env.NEXTAUTH_SECRET,
      });    

    if (token) {
        return NextResponse.rewrite(new URL("/", req.url))
    } 

  return NextResponse.next();
}

export default authMiddleware;

// export async function middleware(request: NextApiRequest, res: NextApiResponse) {
//     const session = await getSession({ request });

//     let isLogin = request.cookies.get('logged');
//     //other middleware operations
//     if (isLogin) {
//         return NextResponse.rewrite(new URL("/", request.url))
//     }

//     return NextResponse.next();;
// };

export const config = {
  matcher: ['/login/:path*'],
};
