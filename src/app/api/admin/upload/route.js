import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { saveCompressedImage } from '@/lib/imageUtils';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const type = formData.get('type') || 'settings';

    if (!file || file.size === 0) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', type);
    await fs.mkdir(uploadDir, { recursive: true });

    // Unique base name (timestamp + original name stripped of special chars)
    const baseName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '').replace(/\.[^.]+$/, '')}`;

    // Compress to WebP
    const fileName = await saveCompressedImage(file, uploadDir, baseName, 'screenshot');
    const url = `/uploads/${type}/${fileName}`;

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error('Settings Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
