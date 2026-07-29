import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import pool from '@/lib/db';

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const gameId = parseInt(id, 10);
    const formData = await request.formData();
    
    const name = String(formData.get('name') || '').trim();
    const game_version = String(formData.get('game_version') || '').trim();
    const release_year_raw = formData.get('release_year');
    const release_year = parseInt(release_year_raw || '2024', 10) || 2024;
    const description = String(formData.get('description') || '').trim();
    const os = String(formData.get('os') || '').trim();
    const processor = String(formData.get('processor') || '').trim();
    const graphics_card = String(formData.get('graphics_card') || '').trim();
    const directx = String(formData.get('directx') || '').trim();
    const ram = String(formData.get('ram') || '').trim();
    const storage = String(formData.get('storage') || '').trim();
    const developer_publisher = String(formData.get('developer_publisher') || '').trim();
    const is_featured = formData.get('is_featured') ? 1 : 0;
    const direct_download_link = String(formData.get('direct_download_link') || '').trim();
    const torrent_link = String(formData.get('torrent_link') || '').trim();
    const trailer_url = String(formData.get('trailer_url') || '').trim();
    const status = String(formData.get('status') || 'published').trim();

    // Handle categories
    const categoryIds = formData.getAll('categories[]');
    
    let mainCategory = 'Action';
    if (categoryIds.length > 0) {
      const { rows: catRows } = await pool.query('SELECT name FROM categories WHERE id = $1 LIMIT 1', [parseInt(categoryIds[0], 10)]);
      if (catRows[0]) mainCategory = catRows[0].name;
    }

    // 1. Update Game
    await pool.query(`
      UPDATE games SET
        name = $1,
        game_version = $2,
        description = $3,
        os = $4,
        processor = $5,
        graphics_card = $6,
        directx = $7,
        ram = $8,
        storage = $9,
        developer_publisher = $10,
        category = $11,
        direct_download_link = $12,
        torrent_link = $13,
        trailer_url = $14,
        is_featured = $15,
        release_year = $16,
        status = $17
      WHERE id = $18
    `, [
      name, game_version, description, os, processor, graphics_card, directx, ram, storage,
      developer_publisher, mainCategory, direct_download_link, torrent_link, trailer_url,
      is_featured, release_year, status, gameId
    ]);

    // 2. Update Categories (delete all then re-add)
    await pool.query('DELETE FROM game_categories WHERE game_id = $1', [gameId]);
    for (const catId of categoryIds) {
      if (catId) {
        await pool.query('INSERT INTO game_categories (game_id, category_id) VALUES ($1, $2)', [gameId, parseInt(catId, 10)]);
      }
    }

    // 3. Handle File Uploads (only if new files are uploaded)
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'games', gameId.toString());

    // Handle Cover Image
    const coverFile = formData.get('cover_image');
    if (coverFile && typeof coverFile === 'object' && coverFile.size > 0 && coverFile.name) {
      await fs.mkdir(uploadDir, { recursive: true });
      const ext = path.extname(coverFile.name) || '.jpg';
      const coverFileName = `thumb${ext}`;
      const coverPath = path.join(uploadDir, coverFileName);
      const buffer = Buffer.from(await coverFile.arrayBuffer());
      await fs.writeFile(coverPath, buffer);
      
      const relativeCoverPath = `/uploads/games/${gameId}/${coverFileName}`;
      await pool.query('UPDATE games SET image_url = $1 WHERE id = $2', [relativeCoverPath, gameId]);
    }

    // Handle Screenshots
    const screenshotFiles = formData.getAll('images');
    const validScreenshots = screenshotFiles.filter(f => f && typeof f === 'object' && f.size > 0 && f.name);
    
    if (validScreenshots.length > 0) {
      await fs.mkdir(uploadDir, { recursive: true });
      const savedPaths = [];
      for (let i = 0; i < validScreenshots.length; i++) {
        const file = validScreenshots[i];
        const ext = path.extname(file.name) || '.jpg';
        const fileName = `ss_${Date.now()}_${i}${ext}`;
        const filePath = path.join(uploadDir, fileName);
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(filePath, buffer);
        savedPaths.push(`/uploads/games/${gameId}/${fileName}`);
      }
      
      const newImagesString = savedPaths.join(',');
      await pool.query('UPDATE games SET images = $1 WHERE id = $2', [newImagesString, gameId]);
    }

    return NextResponse.json({ success: true, id: gameId, status });
  } catch (err) {
    console.error('Error updating game:', err);
    return NextResponse.json({ error: err?.message || 'Failed to update game' }, { status: 500 });
  }
}
