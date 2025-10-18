import { badgeRenderer } from "./badgeRenderer";
import { blackList } from "./blackList";
import { getCurrentUrl, shieldsConfig } from "./config";
import { BadgeInfo, BadgeLinkInfo } from "./types";

// Add a specific badge only once for a given page
let badgesAdded: BadgeInfo[] = [];


const currentUrl = getCurrentUrl();


export function findAndConvertLinks(linkContainers?: NodeListOf<Element>) {
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
      const url = `https://github.com/${userName.toLowerCase()}/${repoName.toLowerCase()}`;
      if (currentUrl.startsWith(url)) {
        return;
      }

      // Exclude GitHub's own pages
      if (blackList.includes(userName)) {
        return;
      }

      // Only add each badge once
      const alreadyAdded = badgesAdded.some(badge => badge.url === url);
      if (alreadyAdded) {
        // With a few exceptions
        const forceBadge = shouldForceBadge(a);
        if (!forceBadge)
          return;
      }

      badgesAdded.push({url, userName, repoName, el: a.el});
    }
  });

  let promises = Promise.resolve();
  badgesAdded.forEach((badge, index) => {
    promises = promises.then(() => badgeRenderer(badge.el, badge.userName, badge.repoName));
    if (index && index % shieldsConfig.groupPer === 0) {
      // Workaround for the "429 Too Many Requests" from shields.io
      promises = promises.then(sleeper(shieldsConfig.waitMs));
    }
  });

  console.info('github-stars-link: Added ' + badgesAdded.length + ' badges.');

  badgesAdded = [];
}


/**
 * Each badge is only displayed once,
 * but there are a few overrides possible
 * where the first url encountered is typically not the most visible one
 */
function shouldForceBadge(a: BadgeLinkInfo) {
  const isNpm = currentUrl.startsWith('https://www.npmjs.com/package/');
  if (isNpm) {
    const npmLabel = a.el.getAttribute('aria-labelledby');
    if (npmLabel && (npmLabel.includes('repository-link') || npmLabel.includes('homePage-link')))
      return true;
  }

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
