import { getBrowser } from '../browser';
import * as cheerio from 'cheerio';

function parseGameTrexCatalog($, existingNames) {
  const games = [];
  $('article').each((i, el) => {
    let title = $(el).find('h2.entry-title a').text().trim();
    let url = $(el).find('h2.entry-title a').attr('href') || $(el).find('.post-image a').attr('href');
    let image = $(el).find('.post-image img').attr('src') || $(el).find('.post-image img').attr('data-src');
    
    if (title.includes('Free Download')) {
      title = title.split('Free Download')[0].trim();
    }

    if (title && url && !existingNames.has(title.toLowerCase().trim())) {
      games.push({ title, url, image });
    }
  });
  return games;
}

export async function fetchGameTrexCatalog(pageUrl = 'https://gametrex.com/', existingNames = new Set()) {
  // 1. Fast path: Direct HTTP fetch
  try {
    const res = await fetch(pageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      cache: 'no-store'
    });

    if (res.ok) {
      const html = await res.text();
      const $ = cheerio.load(html);
      const parsed = parseGameTrexCatalog($, existingNames);
      if (parsed && parsed.length > 0) {
        return parsed.slice(0, 10);
      }
    }
  } catch (err) {
    console.warn('GameTrex direct fetch failed, falling back to Puppeteer browser:', err.message);
  }

  // 2. Fallback path: Puppeteer browser via getBrowser()
  let browser = null;
  try {
    browser = await getBrowser();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
    await page.goto(pageUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    const html = await page.content();
    const $ = cheerio.load(html);
    const parsed = parseGameTrexCatalog($, existingNames);

    await browser.close();
    return parsed.slice(0, 10);

  } catch (error) {
    if (browser) await browser.close().catch(() => {});
    throw error;
  }
}
