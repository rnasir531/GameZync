import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

async function ensureTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS site_settings (
      setting_key VARCHAR(255) PRIMARY KEY,
      setting_value TEXT NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Seed defaults if empty
  const { rows } = await pool.query('SELECT COUNT(*) FROM site_settings');
  if (parseInt(rows[0].count) === 0) {
    await pool.query(`
      INSERT INTO site_settings (setting_key, setting_value) VALUES 
      ('site_name', 'PlayFusion Pro'),
      ('site_description', 'The ultimate platform for gaming.'),
      ('contact_email', 'admin@playfusion.com'),
      ('maintenance_mode', 'false'),
      ('allow_registration', 'true'),
      ('social_facebook', ''),
      ('social_twitter', ''),
      ('social_instagram', ''),
      ('social_discord', ''),
      ('social_youtube', ''),
      ('smtp_host', ''),
      ('smtp_port', ''),
      ('smtp_user', ''),
      ('smtp_pass', ''),
      ('google_analytics_id', ''),
      ('seo_keywords', 'games, pc games, download'),
      ('seo_og_image', ''),
      ('appearance_logo', ''),
      ('appearance_favicon', ''),
      ('appearance_primary_color', '#10b981'),
      ('ad_header', ''),
      ('ad_sidebar', ''),
      ('ad_footer', '')
    `);
  }
}

export async function GET(req) {
  try {
    await ensureTableExists();
    
    const { rows } = await pool.query('SELECT setting_key, setting_value FROM site_settings');
    const settings = {};
    rows.forEach(row => {
      settings[row.setting_key] = row.setting_value;
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Settings GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    await ensureTableExists();

    // Use a transaction to update all settings safely
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      for (const [key, value] of Object.entries(data)) {
        await client.query(`
          INSERT INTO site_settings (setting_key, setting_value, updated_at) 
          VALUES ($1, $2, CURRENT_TIMESTAMP)
          ON CONFLICT (setting_key) 
          DO UPDATE SET setting_value = EXCLUDED.setting_value, updated_at = CURRENT_TIMESTAMP
        `, [key, String(value)]);
      }

      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }

    return NextResponse.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Settings POST Error:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
