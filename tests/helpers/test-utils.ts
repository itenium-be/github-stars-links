import { Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

let scriptContent = '';

/** Set up a page with Chrome API mock and inject the userscript */
export async function setupTestPage(page: Page, fixtureName: string) {
  // Load our static HTML page
  const fixturePath = path.join(__dirname, `../fixtures/${fixtureName}`);
  await page.goto(`file://${fixturePath}`);


  // Make sure we don't crash on "chrome.runtime"
  await mockChromeAPI(page);


  // Add our content script
  if (!scriptContent) {
    const scriptPath = path.join(__dirname, '../../github-stars.user.js');
    scriptContent = fs.readFileSync(scriptPath, 'utf-8');
  }
  await page.addScriptTag({ content: scriptContent });


  // Trigger the starifying
  await page.evaluate(() => {
    const callback = (window as any).__chromeMessageCallback;
    if (callback) {
      callback({ action: 'activate-github-stars' });
    }
  });

  // Wait for badges to be processed
  await page.waitForTimeout(2000);
}


/** Mock the Chrome Extension API */
async function mockChromeAPI(page: Page) {
  await page.addScriptTag({
    content: `
      window.chrome = {
        runtime: {
          onMessage: {
            addListener: function(callback) {
              console.log('Chrome runtime mock: message listener registered');
              // Store the callback so tests can trigger it if needed
              window.__chromeMessageCallback = callback;
            }
          }
        }
      };
    `
  });
}
