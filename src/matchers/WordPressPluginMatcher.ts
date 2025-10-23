import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

// TODO: could configure interval (daily, weekly, ...)
// https://shields.io/badges/word-press-plugin-downloads

const badgeUrlTemplate = 'https://img.shields.io/wordpress/plugin/dt/{slug}';

export class WordPressPluginMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/(?:www\.)?wordpress\.org\/plugins\/([^/?#]+)/);
    if (match) {
      const slug = match[1];

      return {
        baseUrl: `https://wordpress.org/plugins/${slug.toLowerCase()}`,
        badgeUrl: badgeUrlTemplate.replace('{slug}', slug),
        badgeType: 'wordPressPlugin',
      };
    }
    return null;
  }
}
