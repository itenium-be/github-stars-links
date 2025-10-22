import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/hackernews/user-karma/{userId}';

export class HackerNewsKarmaMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/(?:www\.)?news\.ycombinator\.com\/user\?id=([^&#]+)/);
    if (match) {
      const userId = match[1];

      return {
        baseUrl: `https://news.ycombinator.com/user?id=${userId.toLowerCase()}`,
        badgeUrl: badgeUrlTemplate.replace('{userId}', userId),
        badgeType: 'hackerNewsKarma',
      };
    }
    return null;
  }
}
