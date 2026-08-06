import { getBrowser } from '../browser';
import * as cheerio from 'cheerio';

function parseCatalogItems($, existingNames) {
  const games = [];
  
  // 1. Standard post-items
  $('.post-item, article, .post').each((i, el) => {
    const titleLink = $(el).find('.post-title a, h2.entry-title a, h2 a, a.post-url').first();
    const title = titleLink.text().trim();
    let url = titleLink.attr('href');
    
    let image = $(el).find('.wp-post-image, img').attr('data-lazy-src') ||
                $(el).find('.wp-post-image, img').attr('data-src') ||
                $(el).find('.wp-post-image, img').attr('src');
    
    if (image) {
      if (image.startsWith('/')) image = 'https://steamrip.com' + image;
      else if (image.startsWith('//')) image = 'https:' + image;
    }

    if (title && url) {
      if (!url.startsWith('http')) url = 'https://steamrip.com/' + url.replace(/^\//, '');

      let cleanTitle = title;
      if (cleanTitle.includes('Free Download')) {
        cleanTitle = cleanTitle.split('Free Download')[0].trim();
      }

      if (!existingNames.has(cleanTitle.toLowerCase().trim())) {
        games.push({ title: cleanTitle, url, image });
      }
    }
  });

  return games;
}

export async function fetchSteamRIPCatalog(pageUrl = 'https://steamrip.com/', existingNames = new Set()) {
  // 1. Fast path: Direct HTTP fetch (no browser binary needed)
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
      const parsed = parseCatalogItems($, existingNames);
      if (parsed && parsed.length > 0) {
        return parsed.slice(0, 10);
      }
    }
  } catch (err) {
    console.warn('Direct HTTP fetch failed, falling back to Puppeteer browser:', err.message);
  }

  // 2. Fallback path: Puppeteer browser using getBrowser()
  let browser = null;
  try {
    browser = await getBrowser();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
    await page.goto(pageUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));
    
    const html = await page.content();
    const $ = cheerio.load(html);
    const parsed = parseCatalogItems($, existingNames);
    await browser.close();
    return parsed.slice(0, 10);
  } catch (error) {
    if (browser) await browser.close().catch(() => {});
    throw error;
  }
}
