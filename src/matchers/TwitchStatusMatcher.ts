import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/twitch/status/{user}';

export class TwitchStatusMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/(?:www\.)?twitch\.tv\/([^/?#]+)/);
    if (match) {
      const user = match[1];

      return {
        baseUrl: `https://twitch.tv/${user.toLowerCase()}`,
        badgeUrl: badgeUrlTemplate.replace('{user}', user),
        badgeType: 'twitchStatus',
      };
    }
    return null;
  }
}
