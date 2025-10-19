import { getCurrentUrl, googleUrl, shieldsConfig } from "./config";
import { findConfig } from "./directActivation";
import { BadgeInfo } from "./types";

const currentUrl = getCurrentUrl();

export function badgeRenderer(badge: BadgeInfo) {
  const urlConfig = findConfig();

  // Shorten link text
  if (!urlConfig || urlConfig.replaceText !== false) {
    const linkText = (badge.el.innerText || '').trim();
    if (linkText.startsWith('https://github.com/')) {
      badge.el.innerText = linkText.substr(19);
    } else if (linkText.startsWith('github.com/')) {
      badge.el.innerText = linkText.substr(11);
    }
  }

  // Add badge
  const badgeImg = document.createElement('img');
  badgeImg.src = badge.badgeUrl;
  badgeImg.onload = () => {
    const existingBadge = badge.el.querySelector('img[src*="shields.io"]');
    if (existingBadge) {
      return;
    }

    if (currentUrl.match(googleUrl)/* || currentUrl.endsWith('google.html')*/) {
      const img = badge.el.getElementsByTagName('img');
      if (!img || !img.length) {
        // Could also be a "sublink" -- which do not have images!
        badge.el.prepend(badgeImg);

      } else {
        // Google now displays a GitHub logo
        // --> We replace the logo with the GitHub badge
        const githubLogo = img[0]!.parentNode!.parentNode! as Element;
        githubLogo.replaceWith(badgeImg);
        img[0].style.cssText = 'margin-right: 8px;';

        // Sometimes Google adds some additional stuff
        // Make sure it does not overlap
        const extraStuff = badge.el.parentNode!.parentNode!.childNodes[1].childNodes[1] as HTMLElement;
        extraStuff.style.marginLeft = '80px';
      }

    } else if (currentUrl.startsWith('https://duckduckgo.com')) {
      const imgContainer = badge.el.parentNode!.parentNode as Element;
      const img = imgContainer.getElementsByTagName('img');
      if (img && img.length === 1) {
        const imgEl = img[0] as HTMLImageElement;
        if (!imgEl.src.includes('shields.io')) {
          (img[0].parentNode?.parentNode?.parentElement as Element)?.replaceWith(badgeImg);
        }
      }

    } else {
      // For all other websites:
      badge.el.prepend(badgeImg);
    }
  };
  badgeImg.onerror = () => setTimeout(() => {
    badgeRenderer(badge);
    shieldsConfig.attempt++;

  }, shieldsConfig.retryMs * shieldsConfig.attempt);


  badgeImg.style.cssText = 'margin-right: 8px; margin-bottom: -5px;';
  badgeImg.style.height = '20px';
}
