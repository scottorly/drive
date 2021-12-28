'use strict';

const puppeteer = require('puppeteer');
const minify = require('html-minifier').minify;
const path = require('path');
const fs = require('fs');
const { createServer } = require('vite');
const { exit } = require('process');

(async () => {
  const server = await createServer({
    root: __dirname,
    server: {
      port: 3000
    }
  })
  await server.listen()
  const browser = await puppeteer.launch({executablePath: '/usr/local/bin/chromium'});
  const page = await browser.newPage();

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
 
  } catch (err) {
    console.error(err);
    server.close();
    throw new Error('page.goto/waitForSelector timed out.');
  }
  
  await page.evaluate(() => {
      document.querySelectorAll('script').forEach(element => {
          element.remove();
      });
  });

  const html = await page.content();
  const minified = minify(html)
  console.log(minified)
  await browser.close();

  fs.writeFile('./docs/index.html', minified, () => {
    server.close();
    exit();
  });
})()

