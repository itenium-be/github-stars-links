export const googleUrl = /^https:\/\/(www.)?google\..*\/search/;

export const getCurrentUrl = () => globalThis.window?.document.location.href.toLowerCase() || '';


type ShieldsStyle = 'flat' | 'flat-square' | 'plastic' | 'for-the-badge' | 'social';


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

export type BadgeConfig = {
  badgeUrl: string;
  style: ShieldsStyle;
  label: string;
  /** from: https://simpleicons.org/ */
  logo?: string;
  // ATTN: Not implemented
  // logoColor?: string;
  // logoSize?: 'auto' | string;
  // color?: string;
  // labelColor?: string;
}

type AffiliationType = 'OWNER' | 'COLLABORATOR' | 'ORGANIZATION_MEMBER'
  | 'OWNER,COLLABORATOR,ORGANIZATION_MEMBER' | 'OWNER,COLLABORATOR'
  | 'OWNER,ORGANIZATION_MEMBER' | 'COLLABORATOR,ORGANIZATION_MEMBER';

type UserBadgeConfig = BadgeConfig & {
  affiliations?: AffiliationType;
}

type BadgesConfig = {
  /** See: https://shields.io/badges/git-hub-repo-stars */
  githubRepository: BadgeConfig;
  /** See: https://shields.io/badges/git-hub-users-stars */
  githubUserStars: UserBadgeConfig;
}


export const badgesConfig: BadgesConfig = {
  githubRepository: {
    badgeUrl: 'https://img.shields.io/github/stars/{userName}/{repoName}.svg',
    style: 'social' as ShieldsStyle,
    label: 'Star',
    // logo: 'github',
  },
  githubUserStars: {
    badgeUrl: 'https://img.shields.io/github/stars/{userName}',
    style: 'flat' as ShieldsStyle,
    label: 'Star',
  }
}
