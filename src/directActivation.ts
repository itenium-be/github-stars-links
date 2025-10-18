import { getCurrentUrl, googleUrl } from "./config";
import { DirectActivation } from "./types";

const activateDirectlyOn: DirectActivation[] = [
  'https://stackoverflow.com',
  'https://superuser.com',
  'https://askubuntu.com',
  'https://serverfault.com',
  /^https:\/\/.*\.stackexchange\.com/,
  googleUrl,
  /https:\/\/github.com(?!\/notifications)/,
  // {url: 'https://www.npmjs.com/package'/*, observe: '#repository ~ p'*/},
  'https://www.nuget.org/packages',
  {url: 'https://marketplace.visualstudio.com', observe: '#repo-link-container'}
];

const currentUrl = getCurrentUrl();

export const shouldActivate = () => activateDirectlyOn.find(isWhitelisted);

function isWhitelisted(url: DirectActivation) {
  if (typeof url === 'object' && 'url' in url) {
    return currentUrl.startsWith(url.url);
  }

  if (typeof url === 'string') {
    return currentUrl.startsWith(url);
  }
  // regex
  return currentUrl.match(url);
}
