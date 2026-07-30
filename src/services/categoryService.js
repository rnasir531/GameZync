/**
 * services/categoryService.js
 * ─────────────────────────────────────────────────────────────
 * Category management business logic.
 * ─────────────────────────────────────────────────────────────
 */

import { getAllCategories, getCategoryNamesByIds } from '@/lib/db/queries';

/**
 * Get all categories ordered by name.
 */
export async function getCategories() {
  const { rows } = await getAllCategories();
  return rows || [];
}

/**
 * Resolve category names from a list of IDs.
 */
export async function resolveCategoryNames(ids) {
  return getCategoryNamesByIds(ids);
}
