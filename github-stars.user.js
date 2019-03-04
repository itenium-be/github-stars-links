// ==UserScript==
// @name
// @namespace    https://itenium.be
// @author       Wouter Van Schandevijl
// @match        https://
// @grant        none
// ==/UserScript==


// Activate with "Control + Alt + G" but execute script right away one these sites:
const activateDirectlyOn = [
  'https://stackoverflow.com', 'https://superuser.com', 'https://askubuntu.com',
  'https://serverfault.com', /^https:\/\/.*\.stackexchange\.com/,
  /^https:\/\/(www.)?google\..*\/search/, 'https://www.bing.com',
  'https://github.com'
];



// Github's own urls
const blackList = ['', 'site', 'about', 'pricing', 'contact', 'topics', 'marketplace'];

// ATTN: Whitelisted in manifest.json
// Example: https://img.shields.io/github/stars/laoujin/dotfiles.svg?style=social&label=Star
const badgeUrl = 'https://img.shields.io/github/stars/{userName}/{repoName}.svg?style=social&label=Star';

const badgesAdded = [];

function convertLink(el, userName, repoName, url) {
  // Only add each badge once
  if (badgesAdded.includes(url)) {
    return;
  }
  badgesAdded.push(url);


  // Shorten link text
  const linkText = (el.innerText || '').trim();
  if (linkText.startsWith('https://github.com/')) {
    el.innerText = linkText.substr(19);
  }



  // Add badge
  const badge = document.createElement('img');
  badge.src = badgeUrl.replace('{userName}', userName).replace('{repoName}', repoName);
  badge.style.cssText = 'margin-right: 8px';
  if (el.firstChild && el.firstChild.style) {
    el.firstChild.style.display = 'inline';
  }
  el.prepend(badge);
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

        if (!blackList.includes(userName)) {
          convertLink(a.el, userName, repoName, url);
        }
      }
    });
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
    if (!activated && zEvent.ctrlKey && zEvent.altKey && zEvent.code === 'KeyG') {
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
