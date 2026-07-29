import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  return NextResponse.json({ success: true, message: 'auth API is running on Next.js Edge.' });
}

export async function POST(req) {
  return NextResponse.json({ success: true, message: 'auth API is running on Next.js Edge.' });
}
