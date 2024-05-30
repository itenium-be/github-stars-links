// ==UserScript==
// @name
// @namespace    https://itenium.be
// @author       Wouter Van Schandevijl
// @match        https://
// @grant        none
// ==/UserScript==


// Activate with "Control + Alt + G" but execute script right away one these sites:
const googleUrl = /^https:\/\/(www.)?google\..*\/search/;
const activateDirectlyOn = [
  'https://stackoverflow.com', 'https://superuser.com', 'https://askubuntu.com',
  'https://serverfault.com', /^https:\/\/.*\.stackexchange\.com/,
  googleUrl, 'https://www.bing.com',
  /https:\/\/github.com(?!\/notifications)/, 'https://www.npmjs.com/package', 'https://www.nuget.org/packages',
];

// If not on one of these pages, activate with this shortcut
// e: KeyboardEvent: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
const isTheHotkey = e => e.ctrlKey && e.altKey && e.code === 'KeyG';

// Adding on these pages would require some extra work
// https://yarnpkg.com/en/packages?q=react


// Ignore Github's own urls
const blackList = [
  '', 'site', 'about', 'pricing', 'contact', 'topics',
  'marketplace', 'blog', 'apps', 'features', 'trending',
  'collections', 'orgs'];



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
const badgesAdded = [];



function convertLink(el, userName, repoName) {
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
        img[0].parentNode.parentNode.replaceWith(badge);
        img[0].style.cssText = 'margin-right: 8px;';

        // Sometimes Google adds some additional stuff
        // Make sure it does not overlap
        const extraStuff = el.parentNode.parentNode.childNodes[1].childNodes[1];
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
function shouldForceBadge(a) {
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


function findAndConvertAllLinks() {
  const collection = document.getElementsByTagName('a');
  const links = Array.prototype.slice.call(collection, 0);
  const githubLinks = links
    .map(a => ({href: (a.getAttribute('href') || '').toLowerCase().trim(), el: a}))
    .filter(a => a.href.startsWith('https://github.com/'));

  githubLinks.forEach(a => {
    const match = a.href.match(/^\s*https:\/\/github.com\/([^/#]+)\/([^/#]+)(?:[\/#].*)?$/i);
    if (match) {
      const userName = match[1];
      const repoName = match[2];

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
      if (badgesAdded.some(badge => badge.url === url)) {
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
}


function sleeper(ms) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}


const currentUrl = globalThis.window?.document.location.href.toLowerCase() || '';


if (activateDirectlyOn.some(isWhitelisted)) {
  findAndConvertAllLinks();

  // duckduckgo loads results later apparently
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


function isWhitelisted(url) {
  if (typeof url === 'string') {
    return currentUrl.startsWith(url);
  }
  // regex
  return currentUrl.match(url);
}
