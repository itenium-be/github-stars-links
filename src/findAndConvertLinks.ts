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

      // Only add each badge once
      if (allowDuplicates === undefined || allowDuplicates === false) {
        // But only when doing the global scan
        const alreadyAdded = newBadges.some(badge => badge.url === url);
        if (alreadyAdded) {
          // And with a few exceptions
          const forceBadge = shouldForceBadge(a);
          if (!forceBadge)
            return;
        }
      }

      let badgeUrl = badgesConfig.githubRepository.badgeUrl
        .replace('{userName}', userName)
        .replace('{repoName}', repoName);

      badgeUrl = completeBadgeUrl(badgeUrl, badgesConfig.githubRepository);

      newBadges.push({url, badgeUrl, el: a.el});

    } else {
      const userMatch = a.href.match(/^https?:\/\/(?:www\.)?github\.com\/([^/#]+)\/?$/);
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

        console.log(`pushing badge: ${badgeUrl}`);
        newBadges.push({url, badgeUrl, el: a.el});
      }
    }
  });

  let promises = Promise.resolve();
  newBadges.forEach((badge, index) => {
    promises = promises.then(() => badgeRenderer(badge));
    if (index && index % shieldsConfig.groupPer === 0) {
      // Workaround for the "429 Too Many Requests" from shields.io
      promises = promises.then(sleeper(shieldsConfig.waitMs));
    }
  });

  console.info(`github-stars-link: Added ${newBadges.length} badges for ${linkContainers ? 'observe' : 'global scan'}.`);
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



/**
 * Each badge is only displayed once,
 * but there are a few overrides possible
 * where the first url encountered is typically not the most visible one
 */
function shouldForceBadge(a: BadgeLinkInfo) {
  const isNuget = currentUrl.startsWith('https://www.nuget.org/packages/');
  if (isNuget) {
    const nugetDataTrack = a.el.getAttribute('data-track')
    if (nugetDataTrack === 'outbound-repository-url')
      return true;
  }

  return false;
}




function sleeper(ms: number) {
  return function() {
    return new Promise<void>(resolve => setTimeout(() => resolve(), ms));
  };
}
