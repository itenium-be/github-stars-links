import { test, expect, chromium, BrowserContext } from '@playwright/test';
import * as path from 'path';
import { goToWhitelistedPage } from '../helpers/test-utils';

test.describe('E2E Tests - Whitelisted Sites', () => {
  let context: BrowserContext;

  test.beforeAll(async () => {
    const extensionPath = path.join(__dirname, '../../dist');

    context = await chromium.launchPersistentContext('', {
      headless: false, // Extensions require headless: false
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    });
  });

  test.afterAll(async () => {
    await context.close();
  });

  test('should automatically add badges on GitHub', async () => {
    const githubUrl = 'https://github.com/itenium-be/github-stars-links';
    const page = await goToWhitelistedPage(context, githubUrl);

    const badges = await page.locator('img[src*="shields.io/github/stars"]').count();
    expect(badges).toBeGreaterThan(0);

    const mikeImg = await page.locator('img[src="https://img.shields.io/github/stars/itenium-be/mi-ke.svg?style=social&label=Star"]').count();
    expect(mikeImg).toBe(1);
  });
});
