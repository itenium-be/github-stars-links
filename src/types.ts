export type DirectActivation = {
  url: string | RegExp;
  /**
   * A CSS Selector to observe in
   * which Github links get added
   **/
  observe?: string;
  /**
   * False: When observe is used but you want to
   * have max one badge for each github link
   * Default: True
   */
  observeAllowDuplicates?: boolean;
  /**
   * When false, do not replace the a.href text
   * This is disabled on npmjs.com for example,
   * because it breaks badge adding after searching+navigating to a different package
   **/
  replaceText?: boolean;
  /**
   * Some package sites are SPA and they change
   * location without reloading the page.
   * Set to true to listen to location changes
   * and remove/re-add all the badges when it does
   */
  observeNavigation?: boolean;
  /**
   * By default each badge to a specific repository
   * is only added once. For some pages this adds a
   * badge in a hard-to-see spot. Use this selector
   * to add the same badge there as well.
   */
  extraBadgeSelector?: string;
}

export type BadgeInfo = {
  /**
   * The link could be to github.com/userName/issues
   * The baseUrl would be just github.com/userName
   * Used so that each badge is only rendered once
   */
  baseUrl: string;
  /**
   * The shields.io url
   */
  badgeUrl: string;
  badgeType: keyof BadgesUserConfig;
  el: HTMLAnchorElement;
}

export type BadgeLinkInfo = {
  href: string;
  el: HTMLAnchorElement;
}

export interface BadgeMatcher {
  match(badge: BadgeLinkInfo): MatcherResult | null;
}

export type MatcherResult = {
  /** The base link url (for doubles deduplication) */
  baseUrl: string;
  /** The shields.io badge url */
  badgeUrl: string;
  /** The type of shields.io badge */
  badgeType: keyof BadgesUserConfig;
}

type ShieldsStyle = 'flat' | 'flat-square' | 'plastic' | 'for-the-badge' | 'social';


export type BadgeConfig = {
  enabled: boolean;
  style: ShieldsStyle;
  label?: string;
  /** from: https://simpleicons.org/ */
  logo?: string;
  logoColor?: string;
  logoSize?: 'auto' | string;
  color?: string;
  labelColor?: string;
  cacheSeconds?: string;
  // link?: string;
}

type AffiliationType = 'OWNER' | 'COLLABORATOR' | 'ORGANIZATION_MEMBER'
  | 'OWNER,COLLABORATOR,ORGANIZATION_MEMBER' | 'OWNER,COLLABORATOR'
  | 'OWNER,ORGANIZATION_MEMBER' | 'COLLABORATOR,ORGANIZATION_MEMBER';

type GithubUserBadgeConfig = BadgeConfig & {
  /**
   * Note that picking anything but OWNER may result in a timeout for the badge,
   * unless a sufficiently large cacheSeconds has been set.
   **/
  affiliations?: AffiliationType;
}

export type BadgesUserConfig = {
  /** See: https://shields.io/badges/git-hub-repo-stars */
  githubRepository: BadgeConfig;
  /** See: https://shields.io/badges/git-hub-users-stars */
  githubUserStars: GithubUserBadgeConfig;
}
