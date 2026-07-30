import { NextResponse } from 'next/server';
import { submitContactMessage, getContactMessages } from '@/services/messageService';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const data = await req.json();
    const result = await submitContactMessage(data);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Contact Message Error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const messages = await getContactMessages();
    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
