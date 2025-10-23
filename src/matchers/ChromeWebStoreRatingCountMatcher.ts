import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/chrome-web-store/rating-count/{extensionId}';

export class ChromeWebStoreRatingCountMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/chrome\.google\.com\/webstore\/detail\/[^/]*\/([a-z]+)/);
    if (match) {
      const extensionId = match[1];

      return {
        baseUrl: link.href.toLowerCase(),
        badgeUrl: badgeUrlTemplate.replace('{extensionId}', extensionId),
        badgeType: 'chromeWebStoreRatingCount',
      };
    }
    return null;
  }
}
