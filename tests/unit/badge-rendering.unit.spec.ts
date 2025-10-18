import { test, expect } from '@playwright/test';
import { setupTestPage } from '../helpers/test-utils';

// Load the dummy html files from /tests/fixtures and run tests against them

test.describe('Badge Rendering - Unit Tests', () => {
  test('should add badge to a GitHub link', async ({ page }) => {
    await setupTestPage(page, 'github.html');

    const badges = await page.locator('img[src*="shields.io/github/stars"]').count();
    expect(badges).toBe(1);

    const vscodeBadge = page.locator('img[src*="microsoft/vscode"]');
    await expect(vscodeBadge).toBeVisible();
  });

  test('should not add a badge to other links', async ({ page }) => {
    await setupTestPage(page, 'other.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
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

  test('should shorten the URL', async ({ page }) => {
    await setupTestPage(page, 'github-full.html');

    const full = page.getByTestId('full');
    await expect(full).toHaveText('microsoft/vscode');

    const half = page.getByTestId('half');
    await expect(half).toHaveText('itenium-be/Git-NumberedAdd');

    const custom = page.getByTestId('custom');
    await expect(custom).toHaveText('Custom Description');
  });
});
