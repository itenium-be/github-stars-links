import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/gitlab/stars/{projectId}';

export class GitlabStarsMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/(?:www\.)?gitlab\.com\/([^/?#]+(?:\/[^/?#]+)*)/);
    if (match) {
      const projectId = encodeURIComponent(match[1]);

      return {
        baseUrl: link.href.toLowerCase(),
        badgeUrl: badgeUrlTemplate.replace('{projectId}', projectId),
        badgeType: 'gitlabStars',
      };
    }
    return null;
  }
}
