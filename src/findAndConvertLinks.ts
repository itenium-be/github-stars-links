import { badgeRenderer } from "./badgeRenderer";
import { shieldsConfig } from "./config";
import { badgesConfig } from "./matchers/badgesConfig";
import { BadgeConfig, BadgeInfo, BadgeLinkInfo } from "./types";

export function findAndConvertLinks(linkContainers?: NodeListOf<Element>, allowDuplicates?: boolean) {
  const newBadges: BadgeInfo[] = [];

  const links = linkContainers
    ? Array.from(linkContainers).flatMap(c => c.tagName === 'A' ? [c as HTMLAnchorElement] : Array.from(c.querySelectorAll('a')))
    : Array.from(document.getElementsByTagName('a'));

  const githubLinks: BadgeLinkInfo[] = links
    .map(a => ({href: (a.getAttribute('href') || '').toLowerCase().trim(), el: a}));

  githubLinks.forEach(a => {
    badgesConfig.forEach(badgeConfig => {
      const match = badgeConfig.match(a);
      if (match?.config.enabled) {
        const badgeUrl = completeBadgeUrl(match.badgeUrl, match.config);
        newBadges.push({baseUrl: match.baseUrl, badgeUrl, el: a.el, badgeType: match.badgeType});
        return;
      }
    });
  });

  // Only add each badge once
  const filterDuplicates = allowDuplicates === undefined || allowDuplicates === false;
  const badgesToAdd = filterDuplicates
    ? newBadges.filter((badge, index, self) => index === self.findIndex(b => b.baseUrl === badge.baseUrl))
    : newBadges;

  let promises = Promise.resolve();
  badgesToAdd.forEach((badge, index) => {
    promises = promises.then(() => badgeRenderer(badge));
    if (index && index % shieldsConfig.groupPer === 0) {
      // Workaround for the "429 Too Many Requests" from shields.io
      promises = promises.then(sleeper(shieldsConfig.waitMs));
    }
  });

  console.info(`github-stars-link: Added ${badgesToAdd.length} badges for ${linkContainers ? 'observe' : 'global scan'} (filterDuplicates: ${filterDuplicates}).`);
}


export function completeBadgeUrl(badgeUrl: string, config: BadgeConfig): string {
  badgeUrl += '?';

  Object.entries(config)
    .filter(([key]) => key !== 'enabled')
    .forEach(([key, value]) => {
      if (value) {
        badgeUrl += `&${key}=${value}`;
      }
    });

  return badgeUrl;
}



function sleeper(ms: number) {
  return function() {
    return new Promise<void>(resolve => setTimeout(() => resolve(), ms));
  };
}
