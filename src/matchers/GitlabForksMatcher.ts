import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/gitlab/forks/{projectId}';

export class GitlabForksMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/(?:www\.)?gitlab\.com\/([^/?#]+(?:\/[^/?#]+)*)/);
    if (match) {
      const projectId = encodeURIComponent(match[1]);

      return {
        baseUrl: link.href.toLowerCase(),
        badgeUrl: badgeUrlTemplate.replace('{projectId}', projectId),
        badgeType: 'gitlabForks',
      };
    }
    return null;
  }
}
