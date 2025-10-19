import { test, expect, chromium, BrowserContext } from '@playwright/test';
import * as path from 'path';
import { goToWhitelistedPage, getBadgeLocator } from './test-utils';

// Test the actual sites for which directActivation.ts is configured

test.describe('directActivation Sites - Should automatically add badges', () => {
  let context: BrowserContext;

  test.beforeAll(async () => {
    const extensionPath = path.join(__dirname, '../dist');

    context = await chromium.launchPersistentContext('', {
      headless: false,
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
        // '--disable-blink-features=AutomationControlled',
        // '--no-sandbox',
        // '--disable-infobars',
        // '--start-maximized',
        // '--window-size=1280,720',
      ],
      // ignoreDefaultArgs: ['--enable-automation'],
      // userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      // To set userAgent: https://www.npmjs.com/package/user-agents
      // Could use playwright-extra and puppeteer-extra-plugin-stealth: https://stackoverflow.com/a/79382046/25184132
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

  test('on GitHub navigating from issues to issues/detail with SPA', async () => {
    const url = 'https://github.com/itenium-be/Mi-Ke/issues?q=%2352';
    const page = await goToWhitelistedPage(context, url);

    const detailsLink = page.getByTestId('issue-pr-title-link');
    await detailsLink.click();
    await page.waitForTimeout(3000);

    const badge = await getBadgeLocator(page, 'microsoft/calculator').count();
    expect(badge).toBe(1);
  });

  test('on StackOverflow', async () => {
    const url = 'https://stackoverflow.com/questions/50605219/difference-between-npx-and-npm';
    const page = await goToWhitelistedPage(context, url);

    const badge = await getBadgeLocator(page, 'facebook/create-react-app').count();
    expect(badge).toBe(1);
  });

  test.skip('on Google', async () => {
    const url = 'https://www.google.com/search?q=react+github';
    const page = await goToWhitelistedPage(context, url);

    const badge = await getBadgeLocator(page, 'facebook/react').count();
    expect(badge).toBe(1);
  });

  test.skip('on Google.fr', async () => {
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

  test('on npmjs.com', async () => {
    const url = 'https://www.npmjs.com/package/react';
    const page = await goToWhitelistedPage(context, url);

    const badge = await getBadgeLocator(page, 'facebook/react').count();
    expect(badge).toBe(1);
  });

  test('on npmjs.com, with many links to the same github repo', async () => {
    // Including repository-link and homePage-link
    const url = 'https://www.npmjs.com/package/date-holidays';
    const page = await goToWhitelistedPage(context, url);

    const badge = await getBadgeLocator(page, 'commenthol/date-holidays').count();
    expect(badge).toBe(3);

    const repoLink = page.locator('#repository-link');
    await expect(repoLink).toHaveText('github.com/commenthol/date-holidays');
  });

  test('on npmjs.com, switch to a different package, adds/updates badges', async () => {
    const url = 'https://www.npmjs.com/package/react';
    const page = await goToWhitelistedPage(context, url);

    const badge = await getBadgeLocator(page, 'facebook/react').count();
    expect(badge).toBe(1);

    const searchInput = page.getByRole('combobox');
    await searchInput.fill('@itenium/date-holidays-be');
    await page.waitForTimeout(2000);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await page.waitForTimeout(3000);

    const repoLink = page.locator('#repository-link');
    await expect(repoLink).toHaveText('github.com/itenium-be/date-holidays-be');

    const newBadge = await getBadgeLocator(page, 'itenium-be/date-holidays-be').count();
    expect(newBadge).toBe(2);
  });

  test('on npmjs.com, switch to a different package, removes badges if not a github link', async () => {
    const url = 'https://www.npmjs.com/package/@itenium/date-holidays-be';
    const page = await goToWhitelistedPage(context, url);

    const searchInput = page.getByRole('combobox');
    await searchInput.fill('react');
    await page.waitForTimeout(5000);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await page.waitForTimeout(3000);

    const newBadge = await getBadgeLocator(page, 'facebook/react').count();
    expect(newBadge).toBe(1);

    const oldBadge = await getBadgeLocator(page, 'itenium-be/date-holidays-be').count();
    expect(oldBadge).toBe(0);
  });

  test('on pypi.org', async () => {
    const url = 'https://pypi.org/project/requests/';
    const page = await goToWhitelistedPage(context, url);

    const badge = await getBadgeLocator(page, 'psf/requests').count();
    expect(badge).toBe(1);
  });

  test('on rubygems.org', async () => {
    const url = 'https://rubygems.org/gems/rails';
    const page = await goToWhitelistedPage(context, url);

    const badge = await getBadgeLocator(page, 'rails/rails').count();
    expect(badge).toBe(4);
  });

  test.skip('on packagist.org', async () => {
    // DISABLED: It actually shows the stars on the page already
    const url = 'https://packagist.org/packages/guzzlehttp/guzzle';
    const page = await goToWhitelistedPage(context, url);

    const badge = await getBadgeLocator(page, 'guzzle/guzzle').count();
    expect(badge).toBe(1);
  });

  test('on crates.io', async () => {
    const url = 'https://crates.io/crates/serde/1.0.228';
    const page = await goToWhitelistedPage(context, url);

    const badge = await getBadgeLocator(page, 'serde-rs/serde').count();
    expect(badge).toBeGreaterThan(0);
  });

  test('on pkg.go.dev', async () => {
    const url = 'https://pkg.go.dev/github.com/gin-gonic/gin';
    const page = await goToWhitelistedPage(context, url);

    const badge = await getBadgeLocator(page, 'gin-gonic/gin').count();
    expect(badge).toBeGreaterThan(0);
  });

  test.skip('on swiftpackageindex.com', async () => {
    // DISABLED: It actually shows the stars on the page already
    const url = 'https://swiftpackageindex.com/Alamofire/Alamofire';
    const page = await goToWhitelistedPage(context, url);

    const badge = await getBadgeLocator(page, 'Alamofire/Alamofire').count();
    expect(badge).toBeGreaterThan(0);
  });
});
