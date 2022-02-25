
import puppeteer from 'puppeteer'
import { minify } from 'html-minifier'
import path from 'path'
import fs from 'fs'
import { preview } from 'vite'
import { exit } from 'process'

(async () => {
  const server = await preview({
    preview: {
      port: 8080, 
      open: true
    }
  })
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  try {
    await page.goto('http://localhost:8080/drive', { waitUntil: 'networkidle0' })
 
  } catch (err) {
    console.error(err)
    server.close()
    throw new Error('page.goto/waitForSelector timed out.')
  }
  
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }])


  await page.evaluate(() => {
    const module = document.querySelector('link[rel="modulepreload"]')
    if (module) {
      module.remove()
    }
  })

  await page.evaluate(() => {
      document.querySelectorAll('script').forEach(element => {
          element.remove()
      })
  })

  const html = await page.content()
  const minified = minify(html)
  await page.screenshot({ path: 'thumbnail.png' })

  await browser.close()

  fs.writeFile('./docs/index.html', minified, () => {
    exit()
  })
})()

