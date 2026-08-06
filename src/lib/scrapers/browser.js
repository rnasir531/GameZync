import chromium from '@sparticuz/chromium';
import puppeteerCore from 'puppeteer-core';
import puppeteer from 'puppeteer';

export async function getBrowser() {
  const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NODE_ENV === 'production';

  if (isServerless) {
    try {
      const executablePath = await chromium.executablePath();
      if (executablePath) {
        return await puppeteerCore.launch({
          args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
          defaultViewport: chromium.defaultViewport,
          executablePath,
          headless: chromium.headless === 'shell' ? 'shell' : true,
        });
      }
    } catch (err) {
      console.warn('Chromium serverless launch warning:', err.message);
    }
  }

  // Fallback / Local Development
  const launchOptions = {
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  };

  if (process.env.CHROME_EXECUTABLE_PATH) {
    launchOptions.executablePath = process.env.CHROME_EXECUTABLE_PATH;
  }

  return await puppeteer.launch(launchOptions);
}
