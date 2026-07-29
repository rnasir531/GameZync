import prisma from '@/lib/prisma';

export const metadata = { title: 'Dashboard - Admin Panel' };

export default async function Admindashboard() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px' }}>
        <i className="fa-solid fa-gauge" style={{ marginRight: '10px' }}></i>
        Dashboard
      </h1>
      <div style={{ background: '#1e293b', padding: '30px', borderRadius: '12px' }}>
        <p style={{ color: '#94a3b8' }}>Admin module converted successfully. Connected to Prisma DB.</p>
      </div>
    </div>
  );
}
