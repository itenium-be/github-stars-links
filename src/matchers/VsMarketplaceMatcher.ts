import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/visual-studio-marketplace/i/{extensionId}';

export class VsMarketplaceMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/marketplace\.visualstudio\.com\/items\?itemName=([^&#]+)/);
    if (match) {
      const extensionId = match[1];

      return {
        baseUrl: `https://marketplace.visualstudio.com/items?itemName=${extensionId}`,
        badgeUrl: badgeUrlTemplate.replace('{extensionId}', extensionId),
        badgeType: 'vsMarketplace',
      };
    }
    return null;
  }
}
