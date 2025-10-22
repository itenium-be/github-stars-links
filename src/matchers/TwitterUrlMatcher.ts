import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/twitter/url?url={url}';

export class TwitterUrlMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/([^/?#]+)\/status\/([0-9]+)/);
    if (match) {
      const username = match[1];
      const tweetId = match[2];
      const url = `https://twitter.com/${username}/status/${tweetId}`;

      return {
        baseUrl: url.toLowerCase(),
        badgeUrl: badgeUrlTemplate.replace('{url}', encodeURIComponent(url)),
        badgeType: 'twitterUrl',
      };
    }
    return null;
  }
}
