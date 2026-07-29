import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_local_dev');

export async function logActivity(action, details) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    
    if (!token) {
      console.warn('logActivity: No admin_session token found.');
      return;
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const admin_id = payload.id;

    if (!admin_id) {
      console.warn('logActivity: No admin_id in token payload.');
      return;
    }

    await prisma.activityLog.create({
      data: {
        admin_id: parseInt(admin_id),
        action,
        details,
      }
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
}
