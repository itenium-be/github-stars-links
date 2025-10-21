import { badgeRenderer } from "./badgeRenderer";
import { blackList } from "./blackList";
import { BadgeConfig, badgesConfig, getCurrentUrl, shieldsConfig } from "./config";
import { BadgeInfo, BadgeLinkInfo } from "./types";

const currentUrl = getCurrentUrl();


export function findAndConvertLinks(linkContainers?: NodeListOf<Element>, allowDuplicates?: boolean) {
  const newBadges: BadgeInfo[] = [];

  const links = linkContainers
    ? Array.from(linkContainers).flatMap(c => Array.from(c.querySelectorAll('a')))
    : Array.from(document.getElementsByTagName('a'));

  const githubLinks: BadgeLinkInfo[] = links
    .map(a => ({href: (a.getAttribute('href') || '').toLowerCase().trim(), el: a}));

  githubLinks.forEach(a => {
    const match = a.href.match(/^https?:\/\/(?:www\.)?github\.com\/([^/#]+)\/([^/#]+)/);
    if (match) {
      const userName = match[1];
      const repoName = match[2].replace(/\.git$/i, '');

      // Do not replace badges on the repo page itself
      const url = `https://github.com/${userName.toLowerCase()}/${repoName.toLowerCase()}`
      const urlTester = new RegExp(url, 'i');
      if (urlTester.test(currentUrl)) {
        return;
      }

      // Exclude GitHub's own pages
      if (blackList.includes(userName)) {
        return;
      }

      let badgeUrl = badgesConfig.githubRepository.badgeUrl
        .replace('{userName}', userName)
        .replace('{repoName}', repoName);

      badgeUrl = completeBadgeUrl(badgeUrl, badgesConfig.githubRepository);
      newBadges.push({url, badgeUrl, el: a.el, badgeType: 'github-repository'});

    } else {
      const userMatch = a.href.match(/^https?:\/\/(?:www\.)?github\.com\/([^/#?]+)\/?$/);
      if (userMatch) {
        const userName = userMatch[1];

        // Exclude GitHub's own pages
        if (blackList.includes(userName)) {
          return;
        }

        const url = `https://github.com/${userName.toLowerCase()}`;
        let badgeUrl = badgesConfig.githubUserStars.badgeUrl
          .replace('{userName}', userName);

        badgeUrl = completeBadgeUrl(badgeUrl, badgesConfig.githubUserStars);

        newBadges.push({url, badgeUrl, el: a.el, badgeType: 'github-user'});
      }
    }
  });

  // Only add each badge once
  const filterDuplicates = allowDuplicates === undefined || allowDuplicates === false;
  const badgesToAdd = filterDuplicates
    ? newBadges.filter((badge, index, self) => index === self.findIndex(b => b.url === badge.url))
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


function completeBadgeUrl(badgeUrl: string, config: BadgeConfig): string {
  badgeUrl += '?';

  Object.entries(config)
    .filter(([key]) => key !== 'badgeUrl')
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
