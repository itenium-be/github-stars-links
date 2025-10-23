import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/wordpress/theme/rating/{slug}';

export class WordPressThemeRatingMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/(?:www\.)?wordpress\.org\/themes\/([^/?#]+)/);
    if (match) {
      const slug = match[1];

      return {
        baseUrl: `https://wordpress.org/themes/${slug.toLowerCase()}`,
        badgeUrl: badgeUrlTemplate.replace('{slug}', slug),
        badgeType: 'wordPressThemeRating',
      };
    }
    return null;
  }
}
