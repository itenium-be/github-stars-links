// import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

// ATTN: You would need to have a link to the ID (number) for this badge to work
// https://mastodon.social/api/v1/accounts/lookup?acct=Gargron

// const badgeUrlTemplate = 'https://img.shields.io/mastodon/follow/{id}?domain={domain}';

// export class MastodonFollowMatcher implements BadgeMatcher {
//   match(link: BadgeLinkInfo): MatcherResult | null {
//     const match = link.href.match(/^https?:\/\/([^/]+)\/@([^/?#]+)/);
//     if (match) {
//       const domain = match[1];
//       const username = match[2];

//       return {
//         baseUrl: link.href.toLowerCase(),
//         badgeUrl: badgeUrlTemplate.replace('{id}', encodeURIComponent(username)).replace('{domain}', encodeURIComponent(`https://${domain}`)),
//         badgeType: 'mastodonFollow',
//       };
//     }
//     return null;
//   }
// }
