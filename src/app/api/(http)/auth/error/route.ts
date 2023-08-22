import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        return NextResponse.json(request.nextUrl.searchParams.get("error"));
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data' });
    }
}