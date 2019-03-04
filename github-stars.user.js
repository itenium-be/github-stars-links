// ==UserScript==
// @name
// @namespace    https://itenium.be
// @author       Wouter Van Schandevijl
// @match        https://
// @grant        none
// ==/UserScript==

const blackList = ['', 'site', 'about', 'pricing', 'contact', 'topics']; // Github's own urls
const badgeUrl = 'https://img.shields.io/github/stars/{userName}/{repoName}.svg?style=social&label=Star';


function convertLink(el, userName, repoName) {
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

(function() {
  const collection = document.getElementsByTagName('a');
  const links = Array.prototype.slice.call(collection, 0);
  const githubLinks = links
    .map(a => ({href: (a.getAttribute('href') || '').toLowerCase().trim(), el: a}))
    .filter(a => a.href.startsWith('https://github.com/'));

  githubLinks.forEach(a => {
      const match = a.href.match(/^\s*https:\/\/github.com\/([^/]+)\/([^/]+)(?:\/.*)?$/i);
      if (match) {
        const userName = match[1];
        const repoName = match[2];
        if (!blackList.includes(userName)) {
          //console.log('hah', userName, repoName);
          convertLink(a.el, userName, repoName);
        }
      }
    });
})();
