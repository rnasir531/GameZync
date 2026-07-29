import UsersTableClient from '@/components/admin/tables/UsersTableClient';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export const metadata = { title: 'Manage Users - Admin Panel' };

export const revalidate = 0;

export default async function AdminUsersPage() {
  const users = await prisma.adminUser.findMany({
    orderBy: { id: 'asc' }
  });

  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  let currentUserId = null;
  
  if (token) {
    try {
      const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_local_dev');
      const { payload } = await jwtVerify(token, JWT_SECRET);
      currentUserId = payload.id;
    } catch (e) {
      console.error("JWT Decode error", e);
    }
  }

  return (
    <div className="container-fluid p-0">
      <UsersTableClient users={users} currentUserId={currentUserId} />
    </div>
  );
}
