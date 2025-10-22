import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/twitter/follow/{user}';

export class TwitterFollowMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/([^/?#]+)\/?$/);
    if (match) {
      const user = match[1];

      if (user === 'home' || user === 'explore' || user === 'notifications' || user === 'messages' || user === 'search' || user === 'i') {
        return null;
      }

      return {
        baseUrl: `https://twitter.com/${user.toLowerCase()}`,
        badgeUrl: badgeUrlTemplate.replace('{user}', user),
        badgeType: 'twitterFollow',
      };
    }
    return null;
  }
}
