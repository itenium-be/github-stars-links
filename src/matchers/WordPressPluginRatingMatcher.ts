import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/wordpress/plugin/rating/{slug}';

export class WordPressPluginRatingMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/(?:www\.)?wordpress\.org\/plugins\/([^/?#]+)/);
    if (match) {
      const slug = match[1];

      return {
        baseUrl: `https://wordpress.org/plugins/${slug.toLowerCase()}`,
        badgeUrl: badgeUrlTemplate.replace('{slug}', slug),
        badgeType: 'wordPressPluginRating',
      };
    }
    return null;
  }
}
