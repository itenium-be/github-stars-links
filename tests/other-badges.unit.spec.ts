import { test, expect } from '@playwright/test';
import { setupTestPage } from './test-utils';

test.describe('Non github repository links that should get a badge', () => {
  test('should add badge to a GitHub user/company', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/github-user.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add followers badge to a GitHub user/company', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/github-followers.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add stars badge to a GitHub gist', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/github-gist-stars.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });
});
