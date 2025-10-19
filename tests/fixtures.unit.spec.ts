import { test, expect } from '@playwright/test';
import { setupTestPage, triggerStarify } from './test-utils';

// Load the dummy html files from /tests/fixtures and run tests against them

test.describe('Badge Rendering against html fixtures', () => {
  test('should add badge to a GitHub link', async ({ page }) => {
    await setupTestPage(page, 'github.html');

    const badges = await page.locator('img[src*="shields.io/github/stars"]').count();
    expect(badges).toBe(1);

    const vscodeBadge = page.locator('img[src*="microsoft/vscode"]');
    await expect(vscodeBadge).toBeVisible();
  });

  test('should add badge even when the link is weird', async ({ page }) => {
    await setupTestPage(page, 'github-special.html');

    const withSpaces = await page.locator('img[src*="microsoft/vscode"]').count();
    expect(withSpaces).toBe(1);

    const withCasing = await page.locator('img[src*="itenium-be/git-numberedadd"]').count();
    expect(withCasing).toBe(1);

    const withHttp = await page.locator('img[src*="thomhurst/tunit"]').count();
    expect(withHttp).toBe(1);

    const withWww = await page.locator('img[src*="facebook/react"]').count();
    expect(withWww).toBe(1);

    const withAll = await page.locator('img[src*="typescript-cheatsheets/react"]').count();
    expect(withAll).toBe(1);
  });

  test('should not add a badge to other links', async ({ page }) => {
    await setupTestPage(page, 'other.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(0);
  });

  test('should not add a badge to blacklisted GitHub links', async ({ page }) => {
    await setupTestPage(page, 'blacklisted.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(0);
  });

  test('should work correctly with GitHub and other links', async ({ page }) => {
    await setupTestPage(page, 'integration.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(2);
  });

  test('should work correctly when the github link ends with repoName.git', async ({ page }) => {
    await setupTestPage(page, 'with-git-extension.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should not add the same badge twice', async ({ page }) => {
    await setupTestPage(page, 'double.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should not add the same badge twice even when the links are not exactly the same', async ({ page }) => {
    await setupTestPage(page, 'double-diff.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add the 2 badges when the links start with the same string', async ({ page }) => {
    await setupTestPage(page, 'double-diff-real.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(2);
  });

  test('should shorten the URL', async ({ page }) => {
    await setupTestPage(page, 'github-full.html');

    const full = page.getByTestId('full');
    await expect(full).toHaveText('microsoft/vscode');

    const half = page.getByTestId('half');
    await expect(half).toHaveText('itenium-be/Git-NumberedAdd');

    const custom = page.getByTestId('custom');
    await expect(custom).toHaveText('Custom Description');
  });

  test('should not add a badge twice when triggering the extension multiple times', async ({ page }) => {
    await setupTestPage(page, 'github.html');

    const badgesFirst = await page.locator('img[src*="shields.io/github/stars"]').count();
    expect(badgesFirst).toBe(1);

    await triggerStarify(page);

    const badgesAfter = await page.locator('img[src*="shields.io/github/stars"]').count();
    expect(badgesAfter).toBe(1);
  });
});
