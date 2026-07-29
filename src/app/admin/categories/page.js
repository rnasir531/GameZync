import { revalidatePath } from 'next/cache';
import CategoryForm from '@/components/admin/categories/CategoryForm';
import CategoryList from '@/components/admin/categories/CategoryList';

import prisma from '@/lib/prisma';

async function addCategory(formData) {
  "use server";
  const name = formData.get('name');
  const icon = formData.get('icon');
  
  if (name) {
    await prisma.category.create({
      data: { name, icon: icon || 'fa-gamepad' }
    });
    revalidatePath('/admin/categories');
  }
}

async function deleteCategory(formData) {
  "use server";
  const id = parseInt(formData.get('id'));
  
  if (id) {
    await prisma.category.delete({ where: { id } });
    revalidatePath('/admin/categories');
  }
}

export default async function AdminCategories() {
  const categories = await prisma.category.findMany();

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px' }}>Manage Categories</h1>
      
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <CategoryForm action={addCategory} />
        <CategoryList categories={categories} deleteAction={deleteCategory} />
      </div>
    </div>
  );
}
