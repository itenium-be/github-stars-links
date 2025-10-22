import { BadgesUserConfig } from "./types";

export const googleUrl = /^https:\/\/(www.)?google\..*\/search/;

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
  githubRepository: {
    enabled: true,
    style: 'social' as const,
    label: 'Star',
    // logo: 'github',
  },
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
  blueskyFollowers: {
    enabled: true,
    style: 'social' as const,
    label: 'Followers',
  },
  blueskyPosts: {
    enabled: true,
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
    enabled: true,
    style: 'social' as const,
    label: 'Follow',
  }
}
