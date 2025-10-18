import { getCurrentUrl, googleUrl, shieldsConfig } from "./config";

// Example: https://img.shields.io/github/stars/laoujin/dotfiles.svg?style=social&label=Star
const badgeUrl = 'https://img.shields.io/github/stars/{userName}/{repoName}.svg?style=social&label=Star';

const currentUrl = getCurrentUrl();

export function badgeRenderer(el: HTMLAnchorElement, userName: string, repoName: string) {
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
    badgeRenderer(el, userName, repoName);
    shieldsConfig.attempt++;

  }, shieldsConfig.retryMs * shieldsConfig.attempt);


  badge.style.cssText = 'margin-right: 8px; margin-bottom: -5px;';
  badge.style.height = '20px';
}
