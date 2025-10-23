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

  test('should add watchers badge to a GitHub repository', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/github-watchers.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add subscribers badge to a subreddit', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/subreddit-subscribers.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add followers badge to a Bluesky profile', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/bluesky-followers.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add posts badge to a Bluesky profile', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/bluesky-posts.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add karma badge to a Hacker News user', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/hackernews-karma.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add forks badge to a GitHub repository', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/github-forks.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add karma badge to a Reddit user', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/reddit-user-karma.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add status badge to a Twitch channel', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/twitch-status.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add views badge to a YouTube video', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/youtube-video-views.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add likes badge to a YouTube video', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/youtube-video-likes.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add comments badge to a YouTube video', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/youtube-video-comments.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add views badge to a YouTube channel', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/youtube-channel-views.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add subscribers badge to a YouTube channel', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/youtube-channel-subscribers.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add URL badge to a Twitter tweet', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/twitter-url.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add follow badge to a Twitter profile', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/twitter-follow.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add likes badge to a Thunderstore package', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/thunderstore-likes.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add followers badge to a Nostr Band profile', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/nostr-band-followers.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add followers badge to a Modrinth project', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/modrinth-followers.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add follow badge to a Mastodon profile', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/mastodon-follow.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add badge to a Lemmy community', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/lemmy.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add watchers badge to a Hangar plugin', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/hangar-watchers.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add stars badge to a Hangar plugin', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/hangar-stars.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add stars badge to a GitLab project', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/gitlab-stars.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add forks badge to a GitLab project', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/gitlab-forks.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add downloads badge to a WordPress plugin', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/wordpress-plugin.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add installs badge to a VS Marketplace extension', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/vs-marketplace.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add users badge to a Chrome Web Store extension', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/chrome-web-store.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add users badge to a Firefox addon', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/firefox-addon.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add rating badge to a Chrome Web Store extension', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/chrome-web-store-rating.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add stars badge to a Chrome Web Store extension', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/chrome-web-store-stars.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add last updated badge to a Chrome Web Store extension', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/chrome-web-store-last-updated.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });

  test('should add rating count badge to a Chrome Web Store extension', async ({ page }) => {
    await setupTestPage(page, 'badgeTypes/chrome-web-store-rating-count.html');

    const badges = await page.locator('img[src*="shields.io"]').count();
    expect(badges).toBe(1);
  });
});
