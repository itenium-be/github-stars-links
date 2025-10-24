import { BadgesUserConfig } from "./types";

export const googleUrl = /^https:\/\/(www.)?google\..*\/search/;

let cachedBadgesUserConfig: BadgesUserConfig | null = null;

export async function getBadgesUserConfig(): Promise<BadgesUserConfig> {
  if (cachedBadgesUserConfig) {
    return cachedBadgesUserConfig;
  }

  return new Promise((resolve) => {
    chrome.storage.sync.get(['badgesUserConfig'], (result) => {
      const config = result.badgesUserConfig || badgesUserConfig;
      cachedBadgesUserConfig = config;
      resolve(config);
    });
  });
}

export const getCurrentUrl = () => globalThis.window?.document.location.href.toLowerCase() || '';

/** Workaround for "429 Too Many Requests" from shields.io */
export const shieldsConfig = {
  /** Do this many requests */
  groupPer: 100,
  /** Then, wait this long. */
  waitMs: 3000,

  /** Still got 429? Retry in this many ms. */
  retryMs: 30000,
  /** Wait time multiplier increases for each iteration. */
  attempt: 1,
};


export const badgesUserConfig: BadgesUserConfig = {
  // GitHub Repository Badges
  githubRepository: {
    enabled: true,
    style: 'social' as const,
    label: 'Star',
    // logo: 'github',
  },
  githubWatchers: {
    enabled: false,
    style: 'social' as const,
    label: 'Watchers',
  },
  githubForks: {
    enabled: false,
    style: 'social' as const,
    label: 'Forks',
  },


  // GitHub Users/Companies
  githubUserStars: {
    enabled: true,
    style: 'social' as const,
    label: 'Star',
    affiliations: 'OWNER',
  },
  githubFollowers: {
    enabled: false,
    style: 'social' as const,
    label: 'Followers',
  },


  githubGistStars: {
    enabled: true,
    style: 'social' as const,
    label: 'Stars',
  },


  subredditSubscribers: {
    enabled: true,
    style: 'social' as const,
    label: 'Subscribers',
  },
  redditUserKarma: {
    enabled: true,
    style: 'social' as const,
    label: 'Karma',
  },

  // Bluesky User
  blueskyFollowers: {
    enabled: true,
    style: 'social' as const,
    label: 'Followers',
  },
  blueskyPosts: {
    enabled: false,
    style: 'social' as const,
    label: 'Posts',
  },


  hackerNewsKarma: {
    enabled: true,
    style: 'social' as const,
    label: 'Karma',
  },
  twitchStatus: {
    enabled: true,
    style: 'social' as const,
    label: 'Status',
  },


  // Youtube Video
  youtubeVideoViews: {
    enabled: true,
    style: 'social' as const,
    label: 'Views',
  },
  youtubeVideoLikes: {
    enabled: false,
    style: 'social' as const,
    label: 'Likes',
  },
  youtubeVideoComments: {
    enabled: false,
    style: 'social' as const,
    label: 'Comments',
  },


  // Youtube Channel
  youtubeChannelViews: {
    enabled: false,
    style: 'social' as const,
    label: 'Views',
  },
  youtubeChannelSubscribers: {
    enabled: true,
    style: 'social' as const,
    label: 'Subscribers',
  },


  twitterUrl: {
    enabled: false,
    style: 'social' as const,
    label: 'Tweet',
  },
  twitterFollow: {
    enabled: false,
    style: 'social' as const,
    label: 'Follow',
  },


  nostrBandFollowers: {
    enabled: false,
    style: 'social' as const,
    label: 'Followers',
  },

  // Minecraft mods
  modrinthFollowers: {
    enabled: false,
    style: 'social' as const,
    label: 'Followers',
  },

  // Hangar (minecraft plugins)
  hangarWatchers: {
    enabled: false,
    style: 'social' as const,
    label: 'Watchers',
  },
  hangarStars: {
    enabled: false,
    style: 'social' as const,
    label: 'Stars',
  },

  // Plugins for games?
  thunderstoreLikes: {
    enabled: false,
    style: 'social' as const,
    label: 'Likes',
  },


  lemmy: {
    enabled: true,
    style: 'social' as const,
    label: 'Subscribers',
  },

  // mastodonFollow: {
  //   enabled: true,
  //   style: 'social' as const,
  //   label: 'Follow',
  // },

  // Gitlab
  gitlabStars: {
    enabled: true,
    style: 'social' as const,
    label: 'Stars',
  },
  gitlabForks: {
    enabled: false,
    style: 'social' as const,
    label: 'Forks',
  },


  wordPressPlugin: {
    enabled: true,
    style: 'social' as const,
    label: 'Downloads',
    logo: 'wordpress',
  },
  wordPressPluginRating: {
    enabled: false,
    style: 'social' as const,
    label: 'Rating',
    logo: 'wordpress',
  },
  wordPressPluginStars: {
    enabled: false,
    style: 'social' as const,
    label: 'Stars',
    logo: 'wordpress',
  },


  wordPressThemeDownloads: {
    enabled: true,
    style: 'social' as const,
    label: 'Downloads',
    logo: 'wordpress',
  },
  wordPressThemeRating: {
    enabled: false,
    style: 'social' as const,
    label: 'Rating',
    logo: 'wordpress',
  },
  wordPressThemeStars: {
    enabled: false,
    style: 'social' as const,
    label: 'Stars',
    logo: 'wordpress',
  },


  vsMarketplace: {
    enabled: false,
    style: 'social' as const,
    label: 'Installs',
  },


  chromeWebStore: {
    enabled: true,
    style: 'social' as const,
    label: 'Users',
    logo: 'googlechrome',
  },
  chromeWebStoreRating: {
    enabled: false,
    style: 'social' as const,
    label: 'Rating',
    logo: 'googlechrome',
  },
  chromeWebStoreStars: {
    enabled: false,
    style: 'social' as const,
    label: 'Stars',
    logo: 'googlechrome',
  },
  chromeWebStoreLastUpdated: {
    enabled: false,
    style: 'social' as const,
    label: 'Updated',
    logo: 'googlechrome',
  },
  chromeWebStoreRatingCount: {
    enabled: false,
    style: 'social' as const,
    label: 'Ratings',
    logo: 'googlechrome',
  },


  firefoxAddon: {
    enabled: true,
    style: 'social' as const,
    label: 'Users',
    logo: 'firefox',
  },
  firefoxAddonRating: {
    enabled: false,
    style: 'social' as const,
    label: 'Rating',
    logo: 'firefox',
  },
  firefoxAddonStars: {
    enabled: false,
    style: 'social' as const,
    label: 'Stars',
    logo: 'firefox',
  },
  firefoxAddonDownloads: {
    enabled: false,
    style: 'social' as const,
    label: 'Downloads',
    logo: 'firefox',
  }
}
