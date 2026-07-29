import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { query } from '@/lib/db';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const submitter_email = String(formData.get('submitter_email') || '').trim();
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
    const direct_download_link = String(formData.get('direct_download_link') || '').trim();
    const torrent_link = String(formData.get('torrent_link') || '').trim();
    const trailer_url = String(formData.get('trailer_url') || '').trim();

    // Ensure review_games table exists
    await query(`
      CREATE TABLE IF NOT EXISTS review_games (
        id SERIAL PRIMARY KEY,
        submitter_email TEXT,
        name TEXT NOT NULL,
        game_version TEXT,
        description TEXT,
        os TEXT,
        processor TEXT,
        graphics_card TEXT,
        directx TEXT,
        ram TEXT,
        storage TEXT,
        developer_publisher TEXT,
        category TEXT,
        direct_download_link TEXT,
        torrent_link TEXT,
        trailer_url TEXT,
        is_featured INT DEFAULT 0,
        release_year INT DEFAULT 2024,
        status TEXT DEFAULT 'unread',
        cover_image TEXT,
        images TEXT,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Handle categories
    const categoryIds = formData.getAll('categories[]');
    
    // Fetch ALL selected category names
    let categoryNames = [];
    for (const catId of categoryIds) {
      if (catId) {
        const { rows: catRows } = await query('SELECT name FROM categories WHERE id = $1 LIMIT 1', [parseInt(catId, 10)]);
        if (catRows && catRows[0]) categoryNames.push(catRows[0].name);
      }
    }
    const categoryStr = categoryNames.length > 0 ? categoryNames.join(', ') : 'Action';

    // 1. Create DB Record in review_games
    const { rows: insertedRows } = await query(`
      INSERT INTO review_games (
        submitter_email, name, game_version, description, os, processor, graphics_card, directx, ram, storage,
        developer_publisher, category, direct_download_link, torrent_link, trailer_url,
        is_featured, release_year, status, cover_image, images, image_url
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, 'unread', '', '', '')
      RETURNING id
    `, [
      submitter_email, name, game_version, description, os, processor, graphics_card, directx, ram, storage,
      developer_publisher, categoryStr, direct_download_link, torrent_link, trailer_url,
      0, release_year
    ]);

    const gameId = insertedRows[0].id;

    // 2. Link ALL categories in review_game_categories
    await query(`
      CREATE TABLE IF NOT EXISTS review_game_categories (
        game_id INT NOT NULL,
        category_id INT NOT NULL,
        PRIMARY KEY (game_id, category_id)
      )
    `);
    
    for (const catId of categoryIds) {
      if (catId) {
        await query('INSERT INTO review_game_categories (game_id, category_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [gameId, parseInt(catId, 10)]);
      }
    }

    // 3. Handle File Uploads (Safe Vercel Read-Only Fallback to Data URLs)
    const coverFile = formData.get('cover_image');
    let coverPath = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop';
    
    if (coverFile && typeof coverFile === 'object' && coverFile.size > 0) {
      try {
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'reviews', gameId.toString());
        await fs.mkdir(uploadDir, { recursive: true });
        const ext = path.extname(coverFile.name || 'cover.jpg') || '.jpg';
        const coverFileName = `thumb${ext}`;
        const fullPath = path.join(uploadDir, coverFileName);
        const buffer = Buffer.from(await coverFile.arrayBuffer());
        await fs.writeFile(fullPath, buffer);
        coverPath = `/uploads/reviews/${gameId}/${coverFileName}`;
      } catch (e) {
        // Fallback to inline Base64 Data URL if filesystem is read-only (Vercel)
        const buffer = Buffer.from(await coverFile.arrayBuffer());
        const mime = coverFile.type || 'image/jpeg';
        coverPath = `data:${mime};base64,${buffer.toString('base64')}`;
      }
      await query('UPDATE review_games SET cover_image = $1, image_url = $2 WHERE id = $3', [coverPath, coverPath, gameId]);
    }

    // Handle Screenshots
    const rawImageFiles = [...formData.getAll('images'), ...formData.getAll('images[]')];
    const validScreenshots = rawImageFiles.filter(f => f && typeof f === 'object' && f.size > 0);
    
    if (validScreenshots.length > 0) {
      const savedPaths = [];
      for (let i = 0; i < validScreenshots.length; i++) {
        const file = validScreenshots[i];
        try {
          const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'reviews', gameId.toString());
          await fs.mkdir(uploadDir, { recursive: true });
          const ext = path.extname(file.name || 'ss.jpg') || '.jpg';
          const fileName = `ss_${Date.now()}_${i}${ext}`;
          const filePath = path.join(uploadDir, fileName);
          const buffer = Buffer.from(await file.arrayBuffer());
          await fs.writeFile(filePath, buffer);
          savedPaths.push(`/uploads/reviews/${gameId}/${fileName}`);
        } catch (e) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const mime = file.type || 'image/jpeg';
          savedPaths.push(`data:${mime};base64,${buffer.toString('base64')}`);
        }
      }
      
      const newImagesString = savedPaths.join(',');
      await query('UPDATE review_games SET images = $1 WHERE id = $2', [newImagesString, gameId]);
    }

    return NextResponse.json({ success: true, id: gameId });
  } catch (err) {
    console.error('Error submitting game for review:', err);
    return NextResponse.json({ error: err?.message || 'Failed to submit game for review' }, { status: 500 });
  }
}
