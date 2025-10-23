import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/amo/stars/{addonId}';

export class FirefoxAddonStarsMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/addons\.mozilla\.org\/[^/]+\/firefox\/addon\/([^/]+)/);
    if (match) {
      const addonId = match[1];

      return {
        baseUrl: link.href.toLowerCase(),
        badgeUrl: badgeUrlTemplate.replace('{addonId}', addonId),
        badgeType: 'firefoxAddonStars',
      };
    }
    return null;
  }
}
