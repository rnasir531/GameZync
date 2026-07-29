import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

export async function fetchSteamRIPCatalog(pageUrl = 'https://steamrip.com/', existingNames = new Set()) {
  let browser = null;
  try {
    browser = await puppeteer.launch({ 
      headless: 'new',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--headless=new', '--disable-gpu']
    });
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    await page.goto(pageUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // Wait for Cloudflare
    await new Promise(r => setTimeout(r, 6000));
    
    const html = await page.content();
    const $ = cheerio.load(html);
    
    const games = [];
    
    // Attempt 1: Standard post-items
    $('.post-item').each((i, el) => {
      const title = $(el).find('.post-title a').text().trim();
      let url = $(el).find('.post-title a').attr('href');
      let image = $(el).find('.wp-post-image').attr('data-lazy-src') ||
                  $(el).find('.wp-post-image').attr('data-src') ||
                  $(el).find('.wp-post-image').attr('src') ||
                  $(el).find('img').attr('data-lazy-src') || 
                  $(el).find('img').attr('data-src') || 
                  $(el).find('img').attr('src');
      
      if (image) {
        if (image.startsWith('/')) image = 'https://steamrip.com' + image;
        else if (image.startsWith('//')) image = 'https:' + image;
      }

      if (title && url) {
        if (!url.startsWith('http')) url = 'https://steamrip.com/' + url.replace(/^\//, '');
        games.push({ title, url, image });
      }
    });

    // Attempt 2: Articles (Fallback)
    if (games.length === 0) {
      $('article').each((i, el) => {
        const title = $(el).find('h2.entry-title a').text().trim() || $(el).find('h2 a').text().trim();
        let url = $(el).find('h2.entry-title a').attr('href') || $(el).find('h2 a').attr('href');
        let image = $(el).find('.wp-post-image').attr('data-lazy-src') ||
                    $(el).find('.wp-post-image').attr('data-src') ||
                    $(el).find('.wp-post-image').attr('src') ||
                    $(el).find('img').attr('data-lazy-src') || 
                    $(el).find('img').attr('data-src') || 
                    $(el).find('img').attr('src');
        
        if (image) {
          if (image.startsWith('/')) image = 'https://steamrip.com' + image;
          else if (image.startsWith('//')) image = 'https:' + image;
        }

        if (title && url) {
          if (!url.startsWith('http')) url = 'https://steamrip.com/' + url.replace(/^\//, '');
          games.push({ title, url, image });
        }
      });
    }

    const finalGames = [];
    
    // Process potential games: filter existing, then visit to check for GoFile
    for (const game of games) {
      if (finalGames.length >= 10) break;

      // Skip if already in database
      let cleanTitle = game.title;
      if (cleanTitle.includes('Free Download')) {
        cleanTitle = cleanTitle.split('Free Download')[0].trim();
      }
      if (existingNames.has(cleanTitle.toLowerCase())) continue;

      // Check GoFile link by visiting the page
      try {
        await page.goto(game.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        // Wait a bit for cloudflare if triggered
        await new Promise(r => setTimeout(r, 4000));
        
        const gameHtml = await page.content();
        const $g = cheerio.load(gameHtml);
        
        let hasGofile = false;
        $g('a').each((i, el) => {
          const href = $g(el).attr('href');
          if (href && href.includes('gofile.io')) hasGofile = true;
        });
        
        if (!hasGofile) {
          $g('.shortc-button').each((i, el) => {
            const href = $g(el).attr('href');
            if (href && href.includes('gofile')) hasGofile = true;
          });
        }

        if (hasGofile) {
          finalGames.push(game);
        }
      } catch (err) {
        console.log('Error checking gofile for ' + game.title, err.message);
      }
    }

    await browser.close();
    return finalGames;

  } catch (error) {
    if (browser) await browser.close();
    throw error;
  }
}
