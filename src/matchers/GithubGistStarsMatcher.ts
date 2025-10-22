import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/github/gist/stars/{gistId}';

export class GithubGistStarsMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/gist\.github\.com\/[^/]+\/([a-f0-9]+)/);
    if (match) {
      const gistId = match[1];

      return {
        baseUrl: link.href.toLowerCase().replace(/\/$/, ''),
        badgeUrl: badgeUrlTemplate.replace('{gistId}', gistId),
        badgeType: 'githubGistStars',
      };
    }
    return null;
  }
}
