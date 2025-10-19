import { findConfig } from './directActivation';
import { findAndConvertLinks, removeAllBadges } from './findAndConvertLinks';


const activator = findConfig();
if (activator) {
  findAndConvertLinks();

  if (activator.observeNavigation) {
    (window as any).navigation?.addEventListener('navigate', (event: any) => {
      removeAllBadges();

      setTimeout(() => {
        findAndConvertLinks();
        if (activator.extraBadgeSelector) {
          const githubLinkContainer = document.querySelectorAll(activator.extraBadgeSelector);
          findAndConvertLinks(githubLinkContainer, true);
        }
      }, 1000);
    });
  }

  if (activator.extraBadgeSelector) {
    const githubLinkContainer = document.querySelectorAll(activator.extraBadgeSelector);
    findAndConvertLinks(githubLinkContainer, true);
  }

  if (activator.observe) {
    const observer = new MutationObserver(() => {
      const githubLinkContainer = document.querySelectorAll(activator.observe!);
      if (githubLinkContainer.length) {
        findAndConvertLinks(githubLinkContainer, activator.observeAllowDuplicates);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('beforeunload', () => observer.disconnect());
  }
}


chrome.runtime.onMessage.addListener((message: { action: string }) => {
  if (message.action === 'activate-github-stars') {
    // Handle the shortcut press, as sent from background.js
    findAndConvertLinks();
  }
});
