import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import pool from '@/lib/db';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Extract standard fields
    const name = formData.get('name') || '';
    const game_version = formData.get('game_version') || '';
    const release_year = formData.get('release_year') || '2024';
    const description = formData.get('description') || '';
    const os = formData.get('os') || '';
    const processor = formData.get('processor') || '';
    const graphics_card = formData.get('graphics_card') || '';
    const directx = formData.get('directx') || '';
    const ram = formData.get('ram') || '';
    const storage = formData.get('storage') || '';
    const developer_publisher = formData.get('developer_publisher') || '';
    const is_featured = formData.get('is_featured') ? 1 : 0;
    const direct_download_link = formData.get('direct_download_link') || '';
    const torrent_link = formData.get('torrent_link') || '';
    const trailer_url = formData.get('trailer_url') || '';
    const status = formData.get('status') || 'published';

    // Handle categories
    const categoryIds = formData.getAll('categories[]');
    
    let mainCategory = 'Action';
    if (categoryIds.length > 0) {
      const { rows: catRows } = await pool.query('SELECT name FROM categories WHERE id = $1 LIMIT 1', [parseInt(categoryIds[0])]);
      if (catRows[0]) mainCategory = catRows[0].name;
    }

    // 1. Create DB Record first to get the ID
    const { rows: insertedRows } = await pool.query(`
      INSERT INTO games (
        name, game_version, description, os, processor, graphics_card, directx, ram, storage,
        developer_publisher, category, direct_download_link, torrent_link, trailer_url,
        is_featured, release_year, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING id
    `, [
      name, game_version, description, os, processor, graphics_card, directx, ram, storage,
      developer_publisher, mainCategory, direct_download_link, torrent_link, trailer_url,
      is_featured, release_year, status
    ]);

    const gameId = insertedRows[0].id;

    // 2. Link categories
    for (const catId of categoryIds) {
      await pool.query('INSERT INTO game_categories (game_id, category_id) VALUES ($1, $2)', [gameId, parseInt(catId, 10)]);
    }

    // 3. Handle File Uploads
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'games', gameId.toString());
    await fs.mkdir(uploadDir, { recursive: true });

    // Handle Cover Image
    let relativeCoverPath = '';
    const coverFile = formData.get('cover_image');
    if (coverFile && coverFile.size > 0) {
      const ext = path.extname(coverFile.name) || '.jpg';
      const coverFileName = `thumb${ext}`;
      const coverPath = path.join(uploadDir, coverFileName);
      const buffer = Buffer.from(await coverFile.arrayBuffer());
      await fs.writeFile(coverPath, buffer);
      relativeCoverPath = `/uploads/games/${gameId}/${coverFileName}`;
      await pool.query('UPDATE games SET image_url = $1 WHERE id = $2', [relativeCoverPath, gameId]);
    }

    // Handle Screenshots
    const screenshotFiles = formData.getAll('images');
    const validScreenshots = screenshotFiles.filter(f => f && f.size > 0);
    
    if (validScreenshots.length > 0) {
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

    return NextResponse.json({ success: true, id: gameId });
  } catch (err) {
    console.error('Error adding game:', err);
    return NextResponse.json({ error: 'Failed to add game' }, { status: 500 });
  }
}
