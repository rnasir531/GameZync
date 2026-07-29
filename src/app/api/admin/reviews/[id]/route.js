import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { logActivity } from '@/lib/activityLogger';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const reviewId = parseInt(id, 10);
    
    await pool.query('DELETE FROM review_game_categories WHERE game_id = $1', [reviewId]);
    await pool.query('DELETE FROM review_games WHERE id = $1', [reviewId]);

    await logActivity('rejected_user_game', `Rejected/Deleted user submitted game ID: ${reviewId}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const reviewId = parseInt(id, 10);
    const formData = await request.formData();
    
    const name = String(formData.get('name') || '').trim();
    const game_version = String(formData.get('game_version') || '').trim();
    const release_year_raw = formData.get('release_year');
    const release_year = parseInt(release_year_raw || '2024', 10) || 2024;
    const description = String(formData.get('description') || '').trim();
    const developer_publisher = String(formData.get('developer_publisher') || '').trim();
    const is_featured = formData.get('is_featured') ? 1 : 0;
    
    const os = String(formData.get('os') || '').trim();
    const processor = String(formData.get('processor') || '').trim();
    const graphics_card = String(formData.get('graphics_card') || '').trim();
    const directx = String(formData.get('directx') || '').trim();
    const ram = String(formData.get('ram') || '').trim();
    const storage = String(formData.get('storage') || '').trim();
    
    const direct_download_link = String(formData.get('direct_download_link') || '').trim();
    const torrent_link = String(formData.get('torrent_link') || '').trim();
    const trailer_url = String(formData.get('trailer_url') || '').trim();
    const status = String(formData.get('status') || 'published').trim();

    // Handle Category
    const categoryIds = formData.getAll('categories[]');
    let categoryNames = [];
    for (const catId of categoryIds) {
      if (catId) {
        const { rows: catRows } = await pool.query('SELECT name FROM categories WHERE id = $1 LIMIT 1', [parseInt(catId, 10)]);
        if (catRows[0]) categoryNames.push(catRows[0].name);
      }
    }
    const categoryStr = categoryNames.length > 0 ? categoryNames.join(', ') : 'Action';

    // If status is published or archived, move game to main games table (or Archive Box)
    if (status === 'published' || status === 'archived') {
      const { rows: rgRows } = await pool.query('SELECT * FROM review_games WHERE id = $1', [reviewId]);
      const rg = rgRows[0] || {};

      const { rows: insertedGame } = await pool.query(`
        INSERT INTO games (
          name, game_version, description, os, processor, graphics_card, directx, ram, storage,
          developer_publisher, category, direct_download_link, torrent_link, trailer_url,
          cover_image, images, is_featured, release_year, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
        RETURNING *
      `, [
        name, game_version, description, os, processor, graphics_card, directx, ram, storage,
        developer_publisher, categoryStr, direct_download_link, torrent_link, trailer_url,
        rg.cover_image || rg.image_url || '', rg.images || '',
        is_featured, release_year, status
      ]);

      const newGameId = insertedGame[0].id;

      for (const catId of categoryIds) {
        if (catId) {
          await pool.query('INSERT INTO game_categories (game_id, category_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [newGameId, parseInt(catId, 10)]);
        }
      }

      await pool.query('DELETE FROM review_game_categories WHERE game_id = $1', [reviewId]);
      await pool.query('DELETE FROM review_games WHERE id = $1', [reviewId]);

      await logActivity('approved_user_game', `Processed user submitted game "${name}" into main games with status: ${status}`);

      return NextResponse.json({ success: true, game: insertedGame[0], status, movedToGames: true });
    }

    // Otherwise update in review_games
    await pool.query(`
      UPDATE review_games SET
        name = $1,
        game_version = $2,
        release_year = $3,
        description = $4,
        developer_publisher = $5,
        is_featured = $6,
        os = $7,
        processor = $8,
        graphics_card = $9,
        directx = $10,
        ram = $11,
        storage = $12,
        direct_download_link = $13,
        torrent_link = $14,
        trailer_url = $15,
        category = $16,
        status = $17
      WHERE id = $18
    `, [
      name, game_version, release_year, description, developer_publisher,
      is_featured, os, processor, graphics_card, directx, ram, storage,
      direct_download_link, torrent_link, trailer_url, categoryStr, status, reviewId
    ]);

    await pool.query('DELETE FROM review_game_categories WHERE game_id = $1', [reviewId]);
    for (const catId of categoryIds) {
      if (catId) {
        await pool.query('INSERT INTO review_game_categories (game_id, category_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [reviewId, parseInt(catId, 10)]);
      }
    }

    const { rows: updatedRows } = await pool.query('SELECT * FROM review_games WHERE id = $1', [reviewId]);

    return NextResponse.json({ success: true, id: reviewId, game: updatedRows[0] || { id: reviewId } });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: error?.message || 'Failed to update review' }, { status: 500 });
  }
}
