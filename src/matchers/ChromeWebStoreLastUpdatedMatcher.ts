import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/chrome-web-store/last-updated/{extensionId}';

export class ChromeWebStoreLastUpdatedMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/chrome\.google\.com\/webstore\/detail\/[^/]*\/([a-z]+)/);
    if (match) {
      const extensionId = match[1];

      return {
        baseUrl: link.href.toLowerCase(),
        badgeUrl: badgeUrlTemplate.replace('{extensionId}', extensionId),
        badgeType: 'chromeWebStoreLastUpdated',
      };
    }
    return null;
  }
}
