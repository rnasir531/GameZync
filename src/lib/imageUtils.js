/**
 * imageUtils.js — Shared image compression utility
 * Uses sharp to compress images before saving to disk.
 * Cover images → WebP 85% quality, max 1280px wide
 * Screenshots  → WebP 80% quality, max 1920px wide
 */
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Save and compress an image file using sharp.
 * @param {File}   file        — The uploaded File object from formData
 * @param {string} outputPath  — Full absolute path to save the file (without extension)
 * @param {'cover'|'screenshot'|'thumbnail'} type — Determines compression settings
 * @returns {Promise<string>}  — Saved filename (e.g. 'thumb.webp')
 */
export async function saveCompressedImage(file, outputDir, baseName, type = 'screenshot') {
  const buffer = Buffer.from(await file.arrayBuffer());

  // Compression settings by type
  const settings = {
    cover:      { width: 1280, quality: 85 },
    screenshot: { width: 1920, quality: 80 },
    thumbnail:  { width: 640,  quality: 82 },
  };

  const { width, quality } = settings[type] || settings.screenshot;

  const outputFileName = `${baseName}.webp`;
  const outputPath = path.join(outputDir, outputFileName);

  await sharp(buffer)
    .resize({ width, withoutEnlargement: true }) // Never upscale
    .webp({ quality })
    .toFile(outputPath);

  return outputFileName;
}
