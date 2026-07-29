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

    const buffer = Buffer.from(await file.arrayBuffer());

    // Try saving to disk (local dev environment)
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', type);
      await fs.mkdir(uploadDir, { recursive: true });

      const baseName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '').replace(/\.[^.]+$/, '')}`;

      // For ICO / Icon files, save directly
      if (file.name.toLowerCase().endsWith('.ico') || file.type.includes('icon') || file.type.includes('x-icon')) {
        const icoFileName = `${baseName}.ico`;
        const icoPath = path.join(uploadDir, icoFileName);
        await fs.writeFile(icoPath, buffer);
        return NextResponse.json({ success: true, url: `/uploads/${type}/${icoFileName}` });
      }

      const fileName = await saveCompressedImage(file, uploadDir, baseName, 'screenshot');
      const url = `/uploads/${type}/${fileName}`;
      return NextResponse.json({ success: true, url });
    } catch (fsErr) {
      console.warn('Disk upload failed (Vercel read-only filesystem fallback):', fsErr.message);
      
      // Fallback to Base64 Data URI for Vercel Serverless
      const mimeType = file.type || 'image/png';
      const base64Data = buffer.toString('base64');
      const dataUri = `data:${mimeType};base64,${base64Data}`;
      return NextResponse.json({ success: true, url: dataUri });
    }
  } catch (error) {
    console.error('Settings Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
