import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/lemmy/{nameAtDomain}';

const knownLemmyInstances = [
  'lemmy.ml',
  'lemmy.world',
  'beehaw.org',
  'sh.itjust.works',
  'programming.dev',
];

export class LemmyMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/([^/]+)\/(?:c|u)\/([^/?#@]+)/);
    if (match) {
      const domain = match[1];
      const name = match[2];

      if (!knownLemmyInstances.includes(domain)) {
        return null;
      }

      const nameAtDomain = `${name}@${domain}`;

      return {
        baseUrl: link.href.toLowerCase(),
        badgeUrl: badgeUrlTemplate.replace('{nameAtDomain}', encodeURIComponent(nameAtDomain)),
        badgeType: 'lemmy',
      };
    }
    return null;
  }
}
