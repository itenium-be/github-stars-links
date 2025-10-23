import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/modrinth/followers/{projectId}';

export class ModrinthFollowersMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/(?:www\.)?modrinth\.com\/(?:mod|modpack|plugin|datapack|shader)\/([^/?#]+)/);
    if (match) {
      const projectId = match[1];

      return {
        baseUrl: link.href.toLowerCase(),
        badgeUrl: badgeUrlTemplate.replace('{projectId}', projectId),
        badgeType: 'modrinthFollowers',
      };
    }
    return null;
  }
}
