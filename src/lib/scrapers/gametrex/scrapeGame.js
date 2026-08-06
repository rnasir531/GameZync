import { getBrowser } from '../browser';
import * as cheerio from 'cheerio';

function parseGameTrexHtml($, url) {
  let title = $('h1.entry-title').text().trim();
  if (title.includes('Free Download')) {
    title = title.split('Free Download')[0].trim();
  }
  
  let coverImage = $('.featured-image img').attr('src') || $('.post-image img').attr('src') || '';

  const screenshots = [];
  $('.entry-content img').each((i, el) => {
    let src = $(el).attr('src') || $(el).attr('data-lazy-src') || $(el).attr('data-src');
    if (src && !src.includes('rating') && src !== coverImage) {
      screenshots.push(src);
    }
  });
  
  let torrentLink = '';
  let directDownloadLink = '';
  
  $('a').each((i, el) => {
    const href = $(el).attr('href');
    const text = $(el).text().toLowerCase();
    if (href) {
      if (text.includes('torrent') || href.includes('torrent')) {
        torrentLink = href;
      } else if ($(el).find('img[alt*="download"]').length > 0 || $(el).find('img[src*="download"]').length > 0) {
        if (!directDownloadLink) directDownloadLink = href;
      } else if (href.includes('doovu.com') || href.includes('mega.nz') || href.includes('drive.google.com')) {
        if (!directDownloadLink) directDownloadLink = href;
      }
    }
  });

  let os = '', processor = '', ram = '', graphics = '', directx = '', storage = '', releaseYear = '';

  $('.entry-content ul li, .entry-content p').each((i, el) => {
    const text = $(el).text().trim();
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('os:')) os = text.split(/OS:/i)[1]?.trim() || os;
    if (lowerText.includes('processor:')) processor = text.split(/Processor:/i)[1]?.trim() || processor;
    if (lowerText.includes('memory:')) ram = text.split(/Memory:/i)[1]?.trim() || ram;
    if (lowerText.includes('graphics:')) graphics = text.split(/Graphics:/i)[1]?.trim() || graphics;
    if (lowerText.includes('directx:')) directx = text.split(/DirectX:/i)[1]?.trim() || directx;
    if (lowerText.includes('storage:')) storage = text.split(/Storage:/i)[1]?.trim() || storage;
    if (lowerText.includes('release date:')) {
       const dateStr = text.split(/Release Date:/i)[1]?.trim() || '';
       const match = dateStr.match(/(19|20)\d{2}/);
       if (match) releaseYear = match[0];
    }
  });

  if (!releaseYear) {
    const pubTime = $('meta[property="article:published_time"]').attr('content') || $('time.published').attr('datetime');
    if (pubTime) {
      const match = pubTime.match(/(19|20)\d{2}/);
      if (match) releaseYear = match[0];
    }
  }

  let description = '';
  let foundAbout = false;
  $('.entry-content').children().each((i, el) => {
    const $el = $(el);
    const text = $el.text().trim();
    const tagName = el.tagName ? el.tagName.toLowerCase() : '';
    
    if (tagName.match(/^h[2-4]$/) && text.toLowerCase().includes('about')) {
      foundAbout = true;
      return;
    }
    
    if (tagName.match(/^h[2-4]$/) && text.toLowerCase().includes('download')) {
      foundAbout = false;
      return false;
    }
    
    if (foundAbout) {
      if (tagName === 'ul' && text.toLowerCase().includes('os:')) {
          return;
      }
      $el.find('img').remove();
      description += $.html($el);
    }
  });
  
  if (!description) {
    $('.entry-content p').each((i, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 50 && !text.includes('OS:') && !text.toLowerCase().includes('download')) {
        description += `<p>${text}</p>`;
        return false;
      }
    });
  }

  return {
    title: title || 'Unknown Scraped Game',
    coverImage: coverImage || '',
    description: description || '',
    os: os || 'Windows 10',
    processor: processor || 'Intel Core i5 / AMD AMD Ryzen 5',
    ram: ram || '8 GB',
    graphics: graphics || 'NVIDIA GTX 1060 / AMD RX 580',
    directx: directx || '',
    storage: storage || '50 GB',
    releaseYear: releaseYear || '',
    gofileLink: '',
    torrentLink: torrentLink || directDownloadLink || '',
    images: screenshots.join(',')
  };
}

export async function scrapeGameTrex(url) {
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
      const parsed = parseGameTrexHtml($, url);
      if (parsed && (parsed.title || parsed.torrentLink)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('GameTrex direct fetch failed for game page, falling back to Puppeteer browser:', err.message);
  }

  // 2. Fallback path: Puppeteer browser via getBrowser()
  let browser = null;
  try {
    browser = await getBrowser();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    const html = await page.content();
    const $ = cheerio.load(html);
    const parsed = parseGameTrexHtml($, url);

    await browser.close();
    return parsed;

  } catch (error) {
    if (browser) await browser.close().catch(() => {});
    throw error;
  }
}
