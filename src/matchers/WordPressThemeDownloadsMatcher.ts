import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/wordpress/theme/dt/{slug}';

export class WordPressThemeDownloadsMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/(?:www\.)?wordpress\.org\/themes\/([^/?#]+)/);
    if (match) {
      const slug = match[1];

      return {
        baseUrl: `https://wordpress.org/themes/${slug.toLowerCase()}`,
        badgeUrl: badgeUrlTemplate.replace('{slug}', slug),
        badgeType: 'wordPressThemeDownloads',
      };
    }
    return null;
  }
}
