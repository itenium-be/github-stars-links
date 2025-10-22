import { blackList } from "../blackList";
import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/github/stars/{userName}';

export class GithubUserMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/(?:www\.)?github\.com\/([^/#?]+)/);
    if (match) {
      const userName = match[1];

      // Exclude GitHub's own pages
      if (blackList.includes(userName)) {
        return null;
      }

      return {
        baseUrl: `https://github.com/${userName.toLowerCase()}`,
        badgeUrl: badgeUrlTemplate.replace('{userName}', userName),
        badgeType: 'githubUserStars',
      };
    }
    return null;
  }
}
