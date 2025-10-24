import { badgesUserConfig } from '../config';
import { BadgesUserConfig } from '../types';

const directActivationUrls = [
  'https://stackoverflow.com',
  'https://superuser.com',
  'https://askubuntu.com',
  'https://serverfault.com',
  '*.stackexchange.com',
  'Google Search',
  'https://github.com',
  'https://www.npmjs.com/package',
  'https://www.nuget.org/packages',
  'https://marketplace.visualstudio.com',
  'https://pypi.org/project/',
  'https://rubygems.org/gems/',
  'https://crates.io/crates/',
  'https://pkg.go.dev/github.com/',
  'https://duckduckgo.com'
];

document.addEventListener('DOMContentLoaded', () => {
  loadDirectActivationList();
  loadBadgesConfig();

  document.getElementById('saveBtn')!.addEventListener('click', saveBadgesConfig);
  document.getElementById('resetBtn')!.addEventListener('click', resetToDefaults);

  document.querySelectorAll('input[type="checkbox"][data-badge]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      showSaveStatus();
    });
  });
});

function loadDirectActivationList() {
  const listEl = document.getElementById('directActivationList')!;
  listEl.innerHTML = directActivationUrls.map(url =>
    `<div class="list-group-item">
      <i class="bi bi-check-circle text-success"></i> ${url}
    </div>`
  ).join('');
}

function loadBadgesConfig() {
  chrome.storage.sync.get(['badgesUserConfig'], (result) => {
    const config: BadgesUserConfig = result.badgesUserConfig || badgesUserConfig;

    (Object.keys(config) as Array<keyof BadgesUserConfig>).forEach(badgeKey => {
      const checkbox = document.getElementById(badgeKey) as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = config[badgeKey].enabled;
      }
    });
  });
}

function saveBadgesConfig() {
  const config: BadgesUserConfig = JSON.parse(JSON.stringify(badgesUserConfig));

  document.querySelectorAll('input[type="checkbox"][data-badge]').forEach(checkbox => {
    const input = checkbox as HTMLInputElement;
    const badgeKey = input.dataset.badge as keyof BadgesUserConfig;
    if (config[badgeKey]) {
      config[badgeKey].enabled = input.checked;
    }
  });

  chrome.storage.sync.set({ badgesUserConfig: config }, () => {
    showSaveStatus();
    console.log('Badges configuration saved:', config);
  });
}

function resetToDefaults() {
  if (confirm('Are you sure you want to reset all settings to their default values?')) {
    chrome.storage.sync.set({ badgesUserConfig: badgesUserConfig }, () => {
      loadBadgesConfig();
      showSaveStatus();
      console.log('Reset to default configuration');
    });
  }
}

function showSaveStatus() {
  const statusEl = document.getElementById('saveStatus')!;
  statusEl.style.display = 'inline';
  setTimeout(() => {
    statusEl.style.display = 'none';
  }, 2000);
}
