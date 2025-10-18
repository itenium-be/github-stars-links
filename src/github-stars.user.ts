import { shouldActivate } from './directActivation';
import { findAndConvertLinks } from './findAndCovertLinks';


const activator = shouldActivate();
if (activator) {
  findAndConvertLinks();

  if (typeof activator === 'object' && 'observe' in activator) {
    var githubLinkContainer = document.querySelectorAll(activator.observe);
    if (githubLinkContainer.length) {
      findAndConvertLinks(githubLinkContainer);
    }

    const observer = new MutationObserver(() => {
      githubLinkContainer = document.querySelectorAll(activator.observe);
      if (githubLinkContainer.length) {
        findAndConvertLinks(githubLinkContainer);
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    // window.addEventListener('beforeunload', () => observer.disconnect());
  }
}


chrome.runtime.onMessage.addListener((message: { action: string }) => {
  if (message.action === 'activate-github-stars') {
    // Handle the shortcut press, as sent from background.js
    findAndConvertLinks();
  }
});
