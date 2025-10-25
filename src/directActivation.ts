import { getCurrentUrl, googleUrl } from "./config";
import { DirectActivation } from "./types";

export const activateDirectlyOn: DirectActivation[] = [
  {label: 'Stack Overflow', enabled: true, url: 'https://stackoverflow.com'},
  {label: 'Super User', enabled: true, url: 'https://superuser.com'},
  {label: 'Ask Ubuntu', enabled: true, url: 'https://askubuntu.com'},
  {label: 'Server Fault', enabled: true, url: 'https://serverfault.com'},
  {label: 'Stack Exchange Sites', enabled: true, url: /^https:\/\/.*\.stackexchange\.com/},
  {label: 'Google Search', enabled: true, url: googleUrl},
  {label: 'GitHub Issues', enabled: true, url: /https:\/\/github.com\/[^/#]+\/[^/#]+\/issues\/\d+/, observeNavigation: true, observe: ':has(> [data-testid="github-avatar"])', observeAllowDuplicates: true},
  {label: 'GitHub', enabled: true, url: /https:\/\/github.com/, observeNavigation: true},
  {label: 'npm', enabled: true, url: 'https://www.npmjs.com/package', replaceText: false, observeNavigation: true, extraBadgeSelector: ':has(> #repository, > #homePage)'},
  {label: 'NuGet', enabled: true, url: 'https://www.nuget.org/packages', extraBadgeSelector: ':has(> a[data-track="outbound-repository-url"])'},
  {label: 'VS Code Marketplace', enabled: true, url: 'https://marketplace.visualstudio.com', observe: '#repo-link-container'},
  {label: 'PyPI', enabled: true, url: 'https://pypi.org/project/'},
  {label: 'RubyGems', enabled: true, url: 'https://rubygems.org/gems/', extraBadgeSelector: ':has(> #code)'},
  {label: 'crates.io', enabled: true, url: 'https://crates.io/crates/', observe: ':has(> a)'},
  {label: 'Go Packages', enabled: true, url: 'https://pkg.go.dev/github.com/', extraBadgeSelector: '.UnitMeta-repo'},
  {label: 'DuckDuckGo', enabled: true, url: 'https://duckduckgo.com', observe: '.react-results--main', observeAllowDuplicates: false},
];


let cachedDirectActivationConfig: DirectActivation[] | null = null;

export async function getDirectActivationConfig(): Promise<DirectActivation[]> {
  if (cachedDirectActivationConfig) {
    return cachedDirectActivationConfig;
  }

  return new Promise((resolve) => {
    chrome.storage.sync.get(['directActivationConfig'], (result) => {
      const config = result.directActivationConfig || activateDirectlyOn;
      cachedDirectActivationConfig = config;
      resolve(config);
    });
  });
}

export async function findConfig() {
  const config = await getDirectActivationConfig();
  const currentUrl = getCurrentUrl();
  return config.find(activator => activator.enabled && isWhitelisted(activator.url, currentUrl));
}

function isWhitelisted(url: string | RegExp, currentUrl: string) {
  if (typeof url === 'string') {
    return currentUrl.startsWith(url);
  }
  // regex
  return currentUrl.match(url);
}
