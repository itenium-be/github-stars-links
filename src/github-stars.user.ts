import { isTheHotkey } from './config';
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
} else {

  let activated = false;
  globalThis.window?.document.addEventListener('keydown', function(zEvent) {
    if (!activated && isTheHotkey(zEvent)) {
      activated = true;
      findAndConvertLinks();
    }
  });
}
