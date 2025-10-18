// ==UserScript==
// @name
// @namespace    https://itenium.be
// @author       Wouter Van Schandevijl
// @match        https://
// @grant        none
// ==/UserScript==


type DirectActivation = string | RegExp | { url: string; observe: string };

// Activate with "Control + Alt + G" but execute script right away on these sites:
const googleUrl = /^https:\/\/(www.)?google\..*\/search/;
const activateDirectlyOn: DirectActivation[] = [
  'https://stackoverflow.com',
  'https://superuser.com',
  'https://askubuntu.com',
  'https://serverfault.com',
  /^https:\/\/.*\.stackexchange\.com/,
  googleUrl, 'https://www.bing.com',
  /https:\/\/github.com(?!\/notifications)/,
  // {url: 'https://www.npmjs.com/package'/*, observe: '#repository ~ p'*/},
  'https://www.nuget.org/packages',
  {url: 'https://marketplace.visualstudio.com', observe: '#repo-link-container'}
];

// If not on one of these pages, activate with this shortcut
// e: KeyboardEvent: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
const isTheHotkey = (e: KeyboardEvent) => e.ctrlKey && e.altKey && e.code === 'KeyG';

// Adding on these pages would require some extra work
// https://yarnpkg.com/en/packages?q=react


// Ignore Github's own urls
const blackList = [
  '', 'site', 'about', 'pricing', 'contact', 'topics',
  'marketplace', 'blog', 'apps', 'features', 'trending',
  'collections', 'orgs', 'users', 'sponsors', 'settings',
  'user-attachments'
];



// ATTN: Whitelisted in manifest.json
// Example: https://img.shields.io/github/stars/laoujin/dotfiles.svg?style=social&label=Star
const badgeUrl = 'https://img.shields.io/github/stars/{userName}/{repoName}.svg?style=social&label=Star';

// Workaround for "429 Too Many Requests" from shields.io
const shieldsConfig = {
  groupPer: 100,  // Do this many requests
  waitMs: 3000,   // Then, wait this long.

  retryMs: 30000, // Still got 429? Retry in this many ms.
  attempt: 1,     // Wait time multiplier increases for each iteration.
};

// Add a specific badge only once for a given page
type BadgeInfo = {
  url: string;
  userName: string;
  repoName: string;
  el: HTMLAnchorElement;
}

let badgesAdded: BadgeInfo[] = [];


function convertLink(el: HTMLAnchorElement, userName: string, repoName: string) {
  // el == the <a> element

  // Shorten link text
  const linkText = (el.innerText || '').trim();
  if (linkText.startsWith('https://github.com/')) {
    el.innerText = linkText.substr(19);
  } else if (linkText.startsWith('github.com/')) {
    el.innerText = linkText.substr(11);
  }

  // Add badge
  const badge = document.createElement('img');
  badge.src = badgeUrl.replace('{userName}', userName).replace('{repoName}', repoName);
  // badge.setAttribute('starified', true);
  badge.onload = () => {
    if (currentUrl.match(googleUrl)) {
      const img = el.getElementsByTagName('img');
      if (!img || !img.length) {
        // Could also be a "sublink" -- which do not have images!
        if (el.childNodes.length === 1) {
          // el would be: <a>single node</a>
          el.prepend(badge);
        } else {
          console.log('Google changed its layout? Could not find Github logo "img" tag.', el.firstChild)
          console.log('el', el)
        }

      } else {
        // Google now displays a Github logo
        // --> We replace the logo with the Github badge
        const githubLogo = img[0]!.parentNode!.parentNode! as Element;
        githubLogo.replaceWith(badge);
        img[0].style.cssText = 'margin-right: 8px;';

        // Sometimes Google adds some additional stuff
        // Make sure it does not overlap
        const extraStuff = el.parentNode!.parentNode!.childNodes[1].childNodes[1] as HTMLElement;
        extraStuff.style.marginLeft = '80px';
      }
    } else {
      el.prepend(badge);
    }
  };
  badge.onerror = () => setTimeout(() => {
    convertLink(el, userName, repoName);
    shieldsConfig.attempt++;

  }, shieldsConfig.retryMs * shieldsConfig.attempt);


  badge.style.cssText = 'margin-right: 8px; margin-bottom: -5px;';
  badge.style.height = '20px';
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

type BadgeLinkInfo = {
  href: string;
  el: HTMLAnchorElement;
}


function findAndConvertAllLinks(linkContainers?: NodeListOf<Element>) {
  const links = linkContainers
    ? Array.from(linkContainers).flatMap(c => Array.from(c.querySelectorAll('a')))
    : Array.from(document.getElementsByTagName('a'));

  const githubLinks: BadgeLinkInfo[] = links
    .map(a => ({href: (a.getAttribute('href') || '').toLowerCase().trim(), el: a}))
    .filter(a => a.href.startsWith('https://github.com/'));

  githubLinks.forEach(a => {
    const match = a.href.match(/^\s*https:\/\/github.com\/([^/#]+)\/([^/#]+)(?:[\/#].*)?$/i);
    if (match) {
      const userName = match[1];
      const repoName = match[2].replace(/\.git$/i, '');

      // Do not replace badges on the repo page itself
      const url = `https://github.com/${userName.toLowerCase()}/${repoName.toLowerCase()}`;
      if (currentUrl.startsWith(url)) {
        return;
      }

      // Exclude Github's own pages
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
    promises = promises.then(() => convertLink(badge.el, badge.userName, badge.repoName));
    if (index && index % shieldsConfig.groupPer === 0) {
      // Workaround for the "429 Too Many Requests" from shields.io
      promises = promises.then(sleeper(shieldsConfig.waitMs));
    }
  });

  console.info('github-stars-link: Added ' + badgesAdded.length + ' badges.');

  badgesAdded = [];
}


function sleeper(ms: number) {
  return function() {
    return new Promise<void>(resolve => setTimeout(() => resolve(), ms));
  };
}


const currentUrl = globalThis.window?.document.location.href.toLowerCase() || '';

const activator = activateDirectlyOn.find(isWhitelisted);
if (activator) {
  findAndConvertAllLinks();

  if (typeof activator === 'object' && 'observe' in activator) {
    var githubLinkContainer = document.querySelectorAll(activator.observe);
    if (githubLinkContainer.length) {
      findAndConvertAllLinks(githubLinkContainer);
    }

    const observer = new MutationObserver(() => {
      githubLinkContainer = document.querySelectorAll(activator.observe);
      if (githubLinkContainer.length) {
        findAndConvertAllLinks(githubLinkContainer);
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('beforeunload', () => observer.disconnect());
  }

  // TODO duckduckgo loads results later apparently --> can be fixed with an observer now!
  // Exercise for at home: wait for the div to appear?
  // Or a quick hackish workaround?
  // setTimeout(() => findAndConvertAllLinks(), 1000);
} else {

  let activated = false;
  globalThis.window?.document.addEventListener('keydown', function(zEvent) {
    if (!activated && isTheHotkey(zEvent)) {
      activated = true;
      findAndConvertAllLinks();
    }
  });
}


function isWhitelisted(url: DirectActivation) {
  if (typeof url === 'object' && 'url' in url) {
    return currentUrl.startsWith(url.url);
  }

  if (typeof url === 'string') {
    return currentUrl.startsWith(url);
  }
  // regex
  return currentUrl.match(url);
}
