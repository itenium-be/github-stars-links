import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/thunderstore/likes/{namespace}/{packageName}';

export class ThunderstoreLikesMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/(?:www\.)?thunderstore\.io\/(?:c\/[^/]+\/)?p\/([^/]+)\/([^/?#]+)/);
    if (match) {
      const namespace = match[1];
      const packageName = match[2];

      return {
        baseUrl: link.href.toLowerCase(),
        badgeUrl: badgeUrlTemplate.replace('{namespace}', namespace).replace('{packageName}', packageName),
        badgeType: 'thunderstoreLikes',
      };
    }
    return null;
  }
}
