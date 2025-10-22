import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/youtube/views/{videoId}';

export class YoutubeVideoViewsMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (match) {
      const videoId = match[1];

      return {
        baseUrl: `https://youtube.com/watch?v=${videoId}`,
        badgeUrl: badgeUrlTemplate.replace('{videoId}', videoId),
        badgeType: 'youtubeVideoViews',
      };
    }
    return null;
  }
}
