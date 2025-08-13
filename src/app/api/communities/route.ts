
import { getCommunities } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const communities = await getCommunities();
        return NextResponse.json({ communities });
    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
