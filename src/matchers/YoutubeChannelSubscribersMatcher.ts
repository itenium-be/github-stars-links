import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/youtube/channel/subscribers/{channelId}';

export class YoutubeChannelSubscribersMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/(?:www\.)?youtube\.com\/channel\/([^/?#]+)/);
    if (match) {
      const channelId = match[1];

      return {
        baseUrl: link.href.toLowerCase(),
        badgeUrl: badgeUrlTemplate.replace('{channelId}', encodeURIComponent(channelId)),
        badgeType: 'youtubeChannelSubscribers',
      };
    }
    return null;
  }
}
