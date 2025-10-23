import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/hangar/stars/{slug}';

export class HangarStarsMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/(?:www\.)?hangar\.papermc\.io\/([^/?#]+)/);
    if (match) {
      const slug = match[1];

      return {
        baseUrl: link.href.toLowerCase(),
        badgeUrl: badgeUrlTemplate.replace('{slug}', slug),
        badgeType: 'hangarStars',
      };
    }
    return null;
  }
}
