import { BadgesUserConfig } from '../types';
import { badgesUserConfig } from '../config';

type BadgeInfo = {
  key: keyof BadgesUserConfig;
  label: string;
  docsUrl: string;
};

type BadgeCategory = {
  name: string;
  badges: BadgeInfo[];
};

export const badgeCategories: BadgeCategory[] = [
  {
    name: 'GitHub Badges',
    badges: [
      { key: 'githubRepository', label: 'Repository Stars', docsUrl: 'https://shields.io/badges/git-hub-repo-stars' },
      { key: 'githubWatchers', label: 'Repository Watchers', docsUrl: 'https://shields.io/badges/git-hub-watchers' },
      { key: 'githubForks', label: 'Repository Forks', docsUrl: 'https://shields.io/badges/git-hub-forks' },
      { key: 'githubUserStars', label: 'User Stars', docsUrl: 'https://shields.io/badges/git-hub-users-stars' },
      { key: 'githubFollowers', label: 'User Followers', docsUrl: 'https://shields.io/badges/git-hub-followers' },
      { key: 'githubGistStars', label: 'Gist Stars', docsUrl: 'https://shields.io/badges/git-hub-gist-stars' },
    ]
  },
  {
    name: 'GitLab Badges',
    badges: [
      { key: 'gitlabStars', label: 'Project Stars', docsUrl: 'https://shields.io/badges/git-lab-stars' },
      { key: 'gitlabForks', label: 'Project Forks', docsUrl: 'https://shields.io/badges/git-lab-forks' },
    ]
  },
  {
    name: 'Social Media Badges',
    badges: [
      { key: 'subredditSubscribers', label: 'Subreddit Subscribers', docsUrl: 'https://shields.io/badges/subreddit-subscribers' },
      { key: 'redditUserKarma', label: 'Reddit User Karma', docsUrl: 'https://shields.io/badges/reddit-user-karma' },
      { key: 'blueskyFollowers', label: 'Bluesky Followers', docsUrl: 'https://shields.io/badges/bluesky-followers' },
      { key: 'blueskyPosts', label: 'Bluesky Posts', docsUrl: 'https://shields.io/badges/bluesky-posts' },
      { key: 'hackerNewsKarma', label: 'Hacker News Karma', docsUrl: 'https://shields.io/badges/hacker-news-user-karma' },
      { key: 'twitchStatus', label: 'Twitch Status', docsUrl: 'https://shields.io/badges/twitch-status' },
      { key: 'twitterUrl', label: 'Twitter/X URL', docsUrl: 'https://shields.io/badges/x-formerly-twitter-url' },
      { key: 'twitterFollow', label: 'Twitter/X Follow', docsUrl: 'https://shields.io/badges/x-formerly-twitter-follow' },
      { key: 'lemmy', label: 'Lemmy Community', docsUrl: 'https://shields.io/badges/lemmy' },
    ]
  },
  {
    name: 'YouTube Badges',
    badges: [
      { key: 'youtubeVideoViews', label: 'Video Views', docsUrl: 'https://shields.io/badges/you-tube-video-views' },
      { key: 'youtubeVideoLikes', label: 'Video Likes', docsUrl: 'https://shields.io/badges/you-tube-video-likes' },
      { key: 'youtubeVideoComments', label: 'Video Comments', docsUrl: 'https://shields.io/badges/you-tube-video-comments' },
      { key: 'youtubeChannelSubscribers', label: 'Channel Subscribers', docsUrl: 'https://shields.io/badges/you-tube-channel-subscribers' },
      { key: 'youtubeChannelViews', label: 'Channel Views', docsUrl: 'https://shields.io/badges/you-tube-channel-views' },
    ]
  },
  {
    name: 'Browser Extensions & Plugin Stores',
    badges: [
      { key: 'chromeWebStore', label: 'Chrome Web Store Users', docsUrl: 'https://shields.io/badges/chrome-web-store-users' },
      { key: 'chromeWebStoreRating', label: 'Chrome Web Store Rating', docsUrl: 'https://shields.io/badges/chrome-web-store-rating' },
      { key: 'chromeWebStoreStars', label: 'Chrome Web Store Stars', docsUrl: 'https://shields.io/badges/chrome-web-store-stars' },
      { key: 'chromeWebStoreLastUpdated', label: 'Chrome Web Store Last Updated', docsUrl: 'https://shields.io/badges/chrome-web-store-last-updated' },
      { key: 'chromeWebStoreRatingCount', label: 'Chrome Web Store Rating Count', docsUrl: 'https://shields.io/badges/chrome-web-store-rating-count' },
      { key: 'firefoxAddon', label: 'Firefox Add-on Users', docsUrl: 'https://shields.io/badges/mozilla-add-on-users' },
      { key: 'firefoxAddonRating', label: 'Firefox Add-on Rating', docsUrl: 'https://shields.io/badges/mozilla-add-on-rating' },
      { key: 'firefoxAddonStars', label: 'Firefox Add-on Stars', docsUrl: 'https://shields.io/badges/mozilla-add-on-stars' },
      { key: 'firefoxAddonDownloads', label: 'Firefox Add-on Downloads', docsUrl: 'https://shields.io/badges/mozilla-add-on-downloads' },
      { key: 'vsMarketplace', label: 'VS Code Marketplace Installs', docsUrl: 'https://shields.io/badges/visual-studio-marketplace-installs' },
      { key: 'wordPressPlugin', label: 'WordPress Plugin Downloads', docsUrl: 'https://shields.io/badges/wordpress-plugin-total-downloads' },
      { key: 'wordPressPluginRating', label: 'WordPress Plugin Rating', docsUrl: 'https://shields.io/badges/word-press-plugin-rating' },
      { key: 'wordPressPluginStars', label: 'WordPress Plugin Stars', docsUrl: 'https://shields.io/badges/word-press-plugin-stars' },
      { key: 'wordPressThemeDownloads', label: 'WordPress Theme Downloads', docsUrl: 'https://shields.io/badges/word-press-theme-downloads' },
      { key: 'wordPressThemeRating', label: 'WordPress Theme Rating', docsUrl: 'https://shields.io/badges/word-press-theme-rating' },
      { key: 'wordPressThemeStars', label: 'WordPress Theme Stars', docsUrl: 'https://shields.io/badges/word-press-theme-stars' },
    ]
  },
  {
    name: 'Gaming & Mod Platforms',
    badges: [
      { key: 'modrinthFollowers', label: 'Modrinth Followers', docsUrl: 'https://shields.io/badges/modrinth-followers' },
      { key: 'hangarWatchers', label: 'Hangar Watchers', docsUrl: 'https://shields.io/badges/hangar-watchers' },
      { key: 'hangarStars', label: 'Hangar Stars', docsUrl: 'https://shields.io/badges/hangar-stars' },
      { key: 'thunderstoreLikes', label: 'Thunderstore Likes', docsUrl: 'https://shields.io/badges/thunderstore-likes' },
    ]
  },
  {
    name: 'Other Platforms',
    badges: [
      { key: 'nostrBandFollowers', label: 'Nostr Band Followers', docsUrl: 'https://shields.io/badges/nostr-band-followers' },
    ]
  },
];


function validateBadgeCategories() {
  const allBadgesInConfig = Object.keys(badgesUserConfig) as Array<keyof BadgesUserConfig>;
  const allBadgesInCategories = badgeCategories.flatMap(cat => cat.badges.map(b => b.key));

  const missingInCategories = allBadgesInConfig.filter(key => !allBadgesInCategories.includes(key));
  const extraInCategories = allBadgesInCategories.filter(key => !allBadgesInConfig.includes(key));

  if (missingInCategories.length > 0) {
    console.error('❌ Badges missing from badgeCategories:', missingInCategories);
    throw new Error(`Configuration error: ${missingInCategories.length} badge(s) are in badgesUserConfig but not in badgeCategories: ${missingInCategories.join(', ')}`);
  }

  if (extraInCategories.length > 0) {
    console.error('❌ Extra badges in badgeCategories:', extraInCategories);
    throw new Error(`Configuration error: ${extraInCategories.length} badge(s) are in badgeCategories but not in badgesUserConfig: ${extraInCategories.join(', ')}`);
  }

  console.log(`✓ Badge configuration validated: ${allBadgesInConfig.length} badges configured correctly`);
}

validateBadgeCategories();
