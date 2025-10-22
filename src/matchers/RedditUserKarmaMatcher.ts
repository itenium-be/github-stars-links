import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/reddit/user-karma/{variant}/{username}';

export class RedditUserKarmaMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/(?:www\.)?reddit\.com\/user\/([^/?#]+)/);
    if (match) {
      const username = match[1];

      return {
        baseUrl: `https://reddit.com/user/${username.toLowerCase()}`,
        badgeUrl: badgeUrlTemplate.replace('{variant}', 'combined').replace('{username}', username),
        badgeType: 'redditUserKarma',
      };
    }
    return null;
  }
}
