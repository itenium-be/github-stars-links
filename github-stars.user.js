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


// Some pages that should show badges immediately:
// https://www.google.com/search?q=react+github
// https://github.com/sindresorhus/awesome
// https://stackoverflow.com/questions/50605219/difference-between-npx-and-npm



// Ignore Github's own urls
const blackList = ['', 'site', 'about', 'pricing', 'contact', 'topics', 'marketplace', 'blog', 'apps'];



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
  // Shorten link text
  const linkText = (el.innerText || '').trim();
  if (linkText.startsWith('https://github.com/')) {
    el.innerText = linkText.substr(19);
  }


  // Add badge
  const badge = document.createElement('img');
  badge.src = badgeUrl.replace('{userName}', userName).replace('{repoName}', repoName);
  badge.onload = () => el.prepend(badge);
  badge.onerror = () => setTimeout(() => {
    convertLink(el, userName, repoName);
    shieldsConfig.attempt++;

  }, shieldsConfig.retryMs * shieldsConfig.attempt);


  badge.style.cssText = 'margin-right: 8px; margin-bottom: -5px;';
  if (el.firstChild && el.firstChild.style) {
    el.firstChild.style.display = 'inline';
  }

  if (currentUrl.match(googleUrl)) {
    const cite = el.getElementsByTagName('cite');
    if (!cite || !cite.length) {
      console.error('Google changed its layout? Could not find "cite" tag.');
      return;
    }

    // Fix for text covering the badge with absolute positioning
    cite[0].style.marginLeft = '100px';
  }
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


const currentUrl = document.location.href.toLowerCase();


if (activateDirectlyOn.some(isWhitelisted)) {
  findAndConvertAllLinks();

  // duckduckgo loads results later apparently
  // Exercise for at home: wait for the div to appear?
  // Or a quick hackish workaround?
  // setTimeout(() => findAndConvertAllLinks(), 1000);
} else {

  let activated = false;
  document.addEventListener('keydown', function(zEvent) {
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
