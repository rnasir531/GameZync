import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

// Auth health-check endpoint
export async function GET() {
  return NextResponse.json({ success: true, message: 'Auth API is running.' });
}

export async function POST() {
  return NextResponse.json({ success: true, message: 'Auth API is running.' });
}
