import { badgeRenderer } from "./badgeRenderer";
import { blackList } from "./blackList";
import { getCurrentUrl, shieldsConfig } from "./config";
import { BadgeInfo, BadgeLinkInfo } from "./types";

const currentUrl = getCurrentUrl();


export function findAndConvertLinks(linkContainers?: NodeListOf<Element>) {
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

      // console.log(`starting badge: ${userName}/${repoName}`);

      // Do not replace badges on the repo page itself
      const url = `https://github.com/${userName.toLowerCase()}/${repoName.toLowerCase()}`;
      if (currentUrl.startsWith(url)) {
        return;
      }

      // Exclude GitHub's own pages
      if (blackList.includes(userName)) {
        return;
      }

      // Only add each badge once
      if (!linkContainers) {
        // But only when doing the global scan
        const alreadyAdded = newBadges.some(badge => badge.url === url);
        if (alreadyAdded) {
          // And with a few exceptions
          const forceBadge = shouldForceBadge(a);
          if (!forceBadge)
            return;
        }
      }

      // console.log(`pushing badge: ${userName}/${repoName}`);
      newBadges.push({url, userName, repoName, el: a.el});
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

export function removeAllBadges() {
  const badges = document.querySelectorAll('img[src*="shields.io/github/stars"]');
  badges.forEach(badge => badge.remove());
  console.info(`github-stars-link: Removed ${badges.length} badges.`);
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
