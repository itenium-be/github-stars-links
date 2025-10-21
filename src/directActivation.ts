import { getCurrentUrl, googleUrl } from "./config";
import { DirectActivation } from "./types";

const activateDirectlyOn: DirectActivation[] = [
  {url: 'https://stackoverflow.com'},
  {url: 'https://superuser.com'},
  {url: 'https://askubuntu.com'},
  {url: 'https://serverfault.com'},
  {url: /^https:\/\/.*\.stackexchange\.com/},
  {url: googleUrl},
  {url: /https:\/\/github.com/, observeNavigation: true},
  {url: 'https://www.npmjs.com/package', replaceText: false, observeNavigation: true, extraBadgeSelector: ':has(> #repository, > #homePage)'},
  {url: 'https://www.nuget.org/packages', extraBadgeSelector: ':has(> a[data-track="outbound-repository-url"])'},
  {url: 'https://marketplace.visualstudio.com', observe: '#repo-link-container'},
  {url: 'https://pypi.org/project/'},
  {url: 'https://rubygems.org/gems/', extraBadgeSelector: ':has(> #code)'},
  // {url: 'https://packagist.org/packages/'}, // DISABLED: It actually shows the stars on the page already
  {url: 'https://crates.io/crates/', observe: ':has(> a)'},
  {url: 'https://pkg.go.dev/github.com/', extraBadgeSelector: '.UnitMeta-repo'},
  // {url: 'https://swiftpackageindex.com/', extraBadgeSelector: ':has(> .github)'}, // DISABLED: It actually shows the stars on the page already
  {url: 'https://duckduckgo.com', observe: '.react-results--main', observeAllowDuplicates: false},
  // {url: ''},
];


export function findConfig() {
  const currentUrl = getCurrentUrl();
  return activateDirectlyOn.find(activator => isWhitelisted(activator.url, currentUrl));
}

function isWhitelisted(url: string | RegExp, currentUrl: string) {
  if (typeof url === 'string') {
    return currentUrl.startsWith(url);
  }
  // regex
  return currentUrl.match(url);
}
