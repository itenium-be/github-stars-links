import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/bluesky/posts/{actor}';

export class BlueskyPostsMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/(?:www\.)?bsky\.app\/profile\/([^/?#]+)/);
    if (match) {
      const actor = match[1];

      return {
        baseUrl: `https://bsky.app/profile/${actor.toLowerCase()}`,
        badgeUrl: badgeUrlTemplate.replace('{actor}', actor),
        badgeType: 'blueskyPosts',
      };
    }
    return null;
  }
}
