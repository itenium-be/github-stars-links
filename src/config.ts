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
    enabled: true,
    style: 'social' as const,
    label: 'Followers',
  }
}
