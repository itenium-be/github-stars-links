import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/amo/users/{addonId}';

export class FirefoxAddonMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/addons\.mozilla\.org\/[^/]+\/firefox\/addon\/([^/?#]+)/);
    if (match) {
      const addonId = match[1];

      return {
        baseUrl: link.href.toLowerCase(),
        badgeUrl: badgeUrlTemplate.replace('{addonId}', addonId),
        badgeType: 'firefoxAddon',
      };
    }
    return null;
  }
}
