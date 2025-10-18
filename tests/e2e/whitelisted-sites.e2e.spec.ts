import { test, expect, chromium, BrowserContext } from '@playwright/test';
import * as path from 'path';
import { goToWhitelistedPage, getBadgeLocator } from '../helpers/test-utils';

// Test the actual sites for which directActivation.ts is configured

test.describe('Whitelisted Sites - Should automatically add badges', () => {
  let context: BrowserContext;

  test.beforeAll(async () => {
    const extensionPath = path.join(__dirname, '../../dist');

    context = await chromium.launchPersistentContext('', {
      headless: false,
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    });
  });

  test.afterAll(async () => {
    await context.close();
  });

  test('on GitHub', async () => {
    const url = 'https://github.com/itenium-be/github-stars-links';
    const page = await goToWhitelistedPage(context, url);

    const badges = await page.locator('img[src*="shields.io/github/stars"]').count();
    expect(badges).toBeGreaterThan(0);

    const mikeImg = await getBadgeLocator(page, 'itenium-be/mi-ke').count();
    expect(mikeImg).toBe(1);
  });

  test('on StackOverflow', async () => {
    const url = 'https://stackoverflow.com/questions/50605219/difference-between-npx-and-npm';
    const page = await goToWhitelistedPage(context, url);

    const badge = await getBadgeLocator(page, 'facebook/create-react-app').count();
    expect(badge).toBe(1);
  });

  test('on Google', async () => {
    const url = 'https://www.google.com/search?q=react+github';
    const page = await goToWhitelistedPage(context, url);

    const badge = await getBadgeLocator(page, 'facebook/react').count();
    expect(badge).toBe(1);
  });

  test('on Google.fr', async () => {
    const url = 'https://google.fr/search?q=react+github';
    const page = await goToWhitelistedPage(context, url);

    const badge = await getBadgeLocator(page, 'facebook/react').count();
    expect(badge).toBe(1);
  });

  test('on nuget it adds two badges', async () => {
    // The first badge is on github.com/name/repo/releases
    // which is a link at the bottom of the page
    const url = 'https://www.nuget.org/packages/Newtonsoft.Json';
    const page = await goToWhitelistedPage(context, url);

    await page.waitForTimeout(20000);

    const badge = await getBadgeLocator(page, 'jamesnk/newtonsoft.json').count();
    expect(badge).toBe(2);
  });

  test('on marketplace.visualstudio.com', async () => {
    const url = 'https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments';
    const page = await goToWhitelistedPage(context, url);

    const badge = await getBadgeLocator(page, 'aaron-bond/better-comments').count();
    expect(badge).toBe(1);
  });

  test('on marketplace.visualstudio.com, which has an observer, it also adds badges to other links', async () => {
    const url = 'https://marketplace.visualstudio.com/items?itemName=Prisma.prisma';
    const page = await goToWhitelistedPage(context, url);

    // Note that the github pages now forwards to: avocadowastaken/prettier-plugin-prisma
    const badge = await getBadgeLocator(page, 'umidbekk/prettier-plugin-prisma').count();
    expect(badge).toBe(1);
  });
});
