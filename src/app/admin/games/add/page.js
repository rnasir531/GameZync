import AddGameForm from '@/components/admin/forms/AddGameForm';

import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Add Game - NS Games Admin',
};

export default async function AdminAddGamePage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div style={{ padding: '20px' }}>
      <AddGameForm categories={categories} />
    </div>
  );
}
