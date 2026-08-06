import { getBrowser } from '../browser';
import * as cheerio from 'cheerio';

function parseGameHtml($, url) {
  let title = $('h1').first().text().trim() || $('title').text().trim();
  if (title.includes('Free Download')) {
    title = title.split('Free Download')[0].trim();
  }
  
  let coverImage = $('.wp-post-image').attr('src') || $('.wp-post-image').attr('data-lazy-src') || $('.wp-post-image').attr('data-src') || $('.post-inner img').first().attr('src');
  if (coverImage) {
    coverImage = coverImage.split('?')[0].replace(/-\d+x\d+(?=\.(jpg|jpeg|png|webp|gif)(\.webp)?$)/i, '');
  }
  if (coverImage && coverImage.startsWith('/')) coverImage = 'https://steamrip.com' + coverImage;
  else if (coverImage && coverImage.startsWith('//')) coverImage = 'https:' + coverImage;

  const screenshots = [];
  $('.entry-content img').each((i, el) => {
    let parentHref = $(el).closest('a').attr('href');
    let src = '';
    
    if (parentHref && parentHref.match(/\.(jpg|jpeg|png|webp|gif)(\.webp)?$/i)) {
      src = parentHref;
    } else {
      src = $(el).attr('data-src') || $(el).attr('data-lazy-src') || $(el).attr('src');
      if (src) {
        src = src.split('?')[0].replace(/-\d+x\d+(?=\.(jpg|jpeg|png|webp|gif)(\.webp)?$)/i, '');
      }
    }
    
    if (src && !src.startsWith('data:') && !src.includes('rating') && src !== coverImage) {
      if (src.startsWith('//')) src = 'https:' + src;
      else if (src.startsWith('/')) src = 'https://steamrip.com' + src;
      else if (!src.startsWith('http')) src = 'https://steamrip.com/' + src;
      
      if (!screenshots.includes(src)) {
        screenshots.push(src);
      }
    }
  });
  
  let gofileLink = null;
  let torrentLink = null;
  $('a').each((i, el) => {
    const href = $(el).attr('href');
    if (href) {
      if (href.includes('gofile.io')) {
        gofileLink = href.startsWith('//') ? 'https:' + href : href;
      }
      if (href.includes('.torrent') || href.includes('torrent') || href.includes('magnet:')) {
        torrentLink = href.startsWith('//') ? 'https:' + href : href;
      }
    }
  });

  if (!gofileLink) {
    $('.shortc-button').each((i, el) => {
      const href = $(el).attr('href');
      if (href && href.includes('gofile')) gofileLink = href;
      if (href && (href.includes('.torrent') || href.includes('torrent'))) torrentLink = href;
    });
  }

  let os = '', processor = '', ram = '', graphics = '', directx = '', storage = '', releaseYear = '';
  let category = '', developer = '', game_version = '', gameSize = '';

  $('.entry-content ul li, .entry-content p').each((i, el) => {
    const text = $(el).text().trim();
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('os:')) os = text.split(/OS:/i)[1]?.trim() || os;
    if (lowerText.includes('processor:')) processor = text.split(/Processor:/i)[1]?.trim() || processor;
    if (lowerText.includes('memory:')) ram = text.split(/Memory:/i)[1]?.trim() || ram;
    if (lowerText.includes('graphics:')) graphics = text.split(/Graphics:/i)[1]?.trim() || graphics;
    if (lowerText.includes('directx:')) directx = text.split(/DirectX:/i)[1]?.trim() || directx;
    if (lowerText.includes('storage:')) storage = text.split(/Storage:/i)[1]?.trim() || storage;
    if (lowerText.includes('game size:')) gameSize = text.split(/Game Size:/i)[1]?.trim() || gameSize;
    if (lowerText.includes('genre:')) category = text.split(/Genre:/i)[1]?.trim() || category;
    if (lowerText.includes('developer:')) developer = text.split(/Developer:/i)[1]?.trim() || developer;
    if (lowerText.includes('version:')) game_version = text.split(/Version:/i)[1]?.trim() || game_version;
    if (lowerText.includes('release date:')) {
       const dateStr = text.split(/Release Date:/i)[1]?.trim() || '';
       const match = dateStr.match(/(19|20)\d{2}/);
       if (match) releaseYear = match[0];
    }
  });

  if (gameSize) storage = gameSize;

  if (!releaseYear) {
    const pubTime = $('meta[property="article:published_time"]').attr('content') || $('time.published').attr('datetime');
    if (pubTime) {
      const match = pubTime.match(/(19|20)\d{2}/);
      if (match) releaseYear = match[0];
    }
  }

  let siteCategories = [];
  $('.post-cat').each((i, el) => {
    const catText = $(el).text().trim();
    if (catText) siteCategories.push(catText);
  });
  if (siteCategories.length > 0) {
    category = siteCategories.join(', ');
  }

  let description = '';
  $('.entry-content p').each((i, el) => {
    const $el = $(el);
    $el.find('a:has(img)').remove();
    $el.find('img').remove();
    
    const text = $el.text().trim();
    if (text && text.length > 30 && !text.toLowerCase().includes('os:') && !text.toLowerCase().includes('minimum:') && !text.toLowerCase().includes('recommended:')) {
      description += `<p>${$el.html()}</p>\n`;
    }
  });

  return {
    title: title || 'Unknown Scraped Game',
    coverImage: coverImage || '',
    description: description || '',
    os: os || 'Windows 10',
    processor: processor || 'Intel Core i5 / AMD Ryzen 5',
    ram: ram || '8 GB',
    graphics: graphics || 'NVIDIA GTX 1060 / AMD RX 580',
    directx: directx || '',
    storage: storage || '50 GB',
    category: category || 'Action',
    developer: developer || 'Unknown',
    releaseYear: releaseYear || '',
    gofileLink: gofileLink || '',
    torrentLink: torrentLink || '',
    game_version: game_version || '',
    images: screenshots.join(',')
  };
}

export async function scrapeSteamRIP(url) {
  // 1. Fast path: Direct HTTP fetch
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      cache: 'no-store'
    });

    if (res.ok) {
      const html = await res.text();
      const $ = cheerio.load(html);
      const parsed = parseGameHtml($, url);
      if (parsed && (parsed.gofileLink || parsed.torrentLink)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Direct HTTP fetch failed for game page, falling back to Puppeteer browser:', err.message);
  }

  // 2. Fallback path: Puppeteer browser via getBrowser()
  let browser = null;
  try {
    browser = await getBrowser();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));
    
    const html = await page.content();
    const $ = cheerio.load(html);
    const parsed = parseGameHtml($, url);
    await browser.close();
    return parsed;
  } catch (error) {
    if (browser) await browser.close().catch(() => {});
    throw error;
  }
}
