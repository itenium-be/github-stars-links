import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/reddit/subreddit-subscribers/{subreddit}';

export class SubredditSubscribersMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/(?:www\.)?reddit\.com\/r\/([^/?#]+)/);
    console.log(`link: ${link.href} matching`);
    if (match) {
      const subreddit = match[1];

      return {
        baseUrl: `https://reddit.com/r/${subreddit.toLowerCase()}`,
        badgeUrl: badgeUrlTemplate.replace('{subreddit}', subreddit),
        badgeType: 'subredditSubscribers',
      };
    }
    return null;
  }
}
