import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/nostr-band/followers/{pubkey}';

export class NostrBandFollowersMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/(?:www\.)?nostr\.band\/([a-z0-9]{10,})/);
    if (match) {
      const pubkey = match[1];

      return {
        baseUrl: link.href.toLowerCase(),
        badgeUrl: badgeUrlTemplate.replace('{pubkey}', pubkey),
        badgeType: 'nostrBandFollowers',
      };
    }
    return null;
  }
}
