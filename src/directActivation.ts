import { getCurrentUrl, googleUrl } from "./config";
import { BadgeInfo, DirectActivation } from "./types";

const activateDirectlyOn: DirectActivation[] = [
  {url: 'https://stackoverflow.com'},
  {url: 'https://superuser.com'},
  {url: 'https://askubuntu.com'},
  {url: 'https://serverfault.com'},
  {url: /^https:\/\/.*\.stackexchange\.com/},
  {url: googleUrl},
  {url: /https:\/\/github.com(?!\/notifications)/},
  {url: 'https://www.npmjs.com/package', observe: ':has(> #repository, > #homePage)', replaceText: false},
  {url: 'https://www.nuget.org/packages'},
  {url: 'https://marketplace.visualstudio.com', observe: '#repo-link-container'}
];


export function findConfig(badge: BadgeInfo) {
  return activateDirectlyOn.find(x => isWhitelisted(x, badge.url))
}

export const shouldActivate = () => activateDirectlyOn.find(x => isWhitelisted(x, getCurrentUrl()));

function isWhitelisted(directActivation: DirectActivation, currentUrl: string) {
  const url = directActivation.url;
  if (typeof url === 'string') {
    return currentUrl.startsWith(url);
  }
  // regex
  return currentUrl.match(url);
}
