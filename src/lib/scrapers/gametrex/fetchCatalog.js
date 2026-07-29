import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

export async function fetchGameTrexCatalog(pageUrl = 'https://gametrex.com/', existingNames = new Set()) {
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
    
    const html = await page.content();
    const $ = cheerio.load(html);
    
    const games = [];
    
    $('article').each((i, el) => {
      let title = $(el).find('h2.entry-title a').text().trim();
      let url = $(el).find('h2.entry-title a').attr('href') || $(el).find('.post-image a').attr('href');
      let image = $(el).find('.post-image img').attr('src') || $(el).find('.post-image img').attr('data-src');
      
      if (title.includes('Free Download')) {
        title = title.split('Free Download')[0].trim();
      }

      if (title && url) {
        games.push({ title, url, image });
      }
    });

    const finalGames = [];
    
    for (const game of games) {
      if (finalGames.length >= 10) break;
      
      if (existingNames.has(game.title.toLowerCase())) continue;

      finalGames.push(game);
    }

    await browser.close();
    return finalGames;

  } catch (error) {
    if (browser) await browser.close();
    throw error;
  }
}
