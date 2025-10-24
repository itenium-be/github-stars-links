import { badgesUserConfig } from '../config';
import { BadgesUserConfig, BadgeConfig } from '../types';
import { badgeCategories, directActivationUrls } from './optionsConfig';


document.addEventListener('DOMContentLoaded', () => {
  loadDirectActivationList();
  generateBadgesUI();
  loadBadgesConfig();

  document.getElementById('saveBtn')!.addEventListener('click', saveBadgesConfig);
  document.getElementById('resetBtn')!.addEventListener('click', resetToDefaults);
  document.getElementById('applyBulkStyle')!.addEventListener('click', applyBulkStyleChange);
});

function applyBulkStyleChange() {
  const dropdown = document.getElementById('bulkStyleChange') as HTMLSelectElement;
  const selectedStyle = dropdown.value;

  if (!selectedStyle) {
    alert('Please select a style first');
    return;
  }

  const allStyleSelects = document.querySelectorAll('[data-field="style"]') as NodeListOf<HTMLSelectElement>;
  allStyleSelects.forEach(select => {
    select.value = selectedStyle;
  });

  dropdown.value = '';

  alert(`Applied "${selectedStyle}" style to all ${allStyleSelects.length} badges. Don't forget to click "Save Settings"!`);
}

function loadDirectActivationList() {
  const listEl = document.getElementById('directActivationList')!;
  listEl.innerHTML = directActivationUrls.map(url =>
    `<div class="list-group-item">✓ ${url}</div>`
  ).join('');
}

function generateBadgesUI() {
  const accordion = document.getElementById('badgesAccordion')!;

  badgeCategories.forEach((category, catIndex) => {
    const categoryId = `category-${catIndex}`;
    const isFirst = catIndex === 0;

    const accordionItem = `
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button ${isFirst ? '' : 'collapsed'}" type="button"
                  data-bs-toggle="collapse" data-bs-target="#${categoryId}">
            ${category.name}
          </button>
        </h2>
        <div id="${categoryId}" class="accordion-collapse collapse ${isFirst ? 'show' : ''}"
            data-bs-parent="#badgesAccordion">
          <div class="accordion-body">
            ${category.badges.map(badge => generateBadgeConfigUI(badge.key, badge.label, badge.docsUrl)).join('')}
          </div>
        </div>
      </div>
    `;

    accordion.innerHTML += accordionItem;
  });
}

function generateBadgeConfigUI(badgeKey: keyof BadgesUserConfig, label: string, docsUrl: string): string {
  return `
    <div class="badge-config-section" data-badge="${badgeKey}">
      <div class="row align-items-center mb-2">
        <div class="col-auto">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="${badgeKey}-enabled" data-field="enabled">
          </div>
        </div>
        <div class="col">
          <span class="badge-name">${label}</span>
          <a href="${docsUrl}" target="_blank" rel="noopener noreferrer" class="ms-2 text-decoration-none" title="View documentation">
            📖
          </a>
        </div>
      </div>

      <div class="badge-details" id="${badgeKey}-details">
        <div class="row g-2">
          <div class="col-md-3">
            <label class="form-label" for="${badgeKey}-style">Style</label>
            <select class="form-select form-select-sm" id="${badgeKey}-style" data-field="style">
              <option value="flat">Flat</option>
              <option value="flat-square">Flat Square</option>
              <option value="plastic">Plastic</option>
              <option value="for-the-badge">For The Badge</option>
              <option value="social">Social</option>
            </select>
          </div>

          <div class="col-md-3">
            <label class="form-label" for="${badgeKey}-label">Label</label>
            <input type="text" class="form-control form-control-sm" id="${badgeKey}-label" data-field="label" placeholder="Optional">
          </div>

          <div class="col-md-3">
            <label class="form-label" for="${badgeKey}-logo">
              Logo
              <a href="https://simpleicons.org/" target="_blank" rel="noopener noreferrer" class="ms-1 text-decoration-none" title="Browse icons">
                🔍
              </a>
            </label>
            <input type="text" class="form-control form-control-sm" id="${badgeKey}-logo" data-field="logo" placeholder="Optional">
          </div>

          <div class="col-md-3">
            <label class="form-label" for="${badgeKey}-color">Color</label>
            <input type="text" class="form-control form-control-sm" id="${badgeKey}-color" data-field="color" placeholder="Optional">
          </div>
        </div>

        <div class="row g-2 mt-1">
          <div class="col-md-3">
            <label class="form-label" for="${badgeKey}-logoColor">Logo Color</label>
            <input type="text" class="form-control form-control-sm" id="${badgeKey}-logoColor" data-field="logoColor" placeholder="Optional">
          </div>

          <div class="col-md-3">
            <label class="form-label" for="${badgeKey}-logoSize">Logo Size</label>
            <input type="text" class="form-control form-control-sm" id="${badgeKey}-logoSize" data-field="logoSize" placeholder="auto">
          </div>

          <div class="col-md-3">
            <label class="form-label" for="${badgeKey}-labelColor">Label Color</label>
            <input type="text" class="form-control form-control-sm" id="${badgeKey}-labelColor" data-field="labelColor" placeholder="Optional">
          </div>

          <div class="col-md-3">
            <label class="form-label" for="${badgeKey}-cacheSeconds">Cache (seconds)</label>
            <input type="text" class="form-control form-control-sm" id="${badgeKey}-cacheSeconds" data-field="cacheSeconds" placeholder="Optional">
          </div>
        </div>
      </div>
    </div>
  `;
}

function loadBadgesConfig() {
  chrome.storage.sync.get(['badgesUserConfig'], (result) => {
    const config: BadgesUserConfig = result.badgesUserConfig || badgesUserConfig;

    (Object.keys(config) as Array<keyof BadgesUserConfig>).forEach(badgeKey => {
      const badgeConfig = config[badgeKey];
      const section = document.querySelector(`[data-badge="${badgeKey}"]`);

      if (section) {
        const enabledInput = section.querySelector(`#${badgeKey}-enabled`) as HTMLInputElement;
        if (enabledInput) {
          enabledInput.checked = badgeConfig.enabled;

          enabledInput.addEventListener('change', () => {
            toggleBadgeDetails(badgeKey, enabledInput.checked);
          });

          toggleBadgeDetails(badgeKey, badgeConfig.enabled);
        }

        const styleSelect = section.querySelector(`#${badgeKey}-style`) as HTMLSelectElement;
        if (styleSelect) styleSelect.value = badgeConfig.style;

        (Object.keys(badgeConfig) as Array<keyof BadgeConfig>).forEach(field => {
          if (field !== 'enabled' && field !== 'style') {
            const input = section.querySelector(`#${badgeKey}-${field}`) as HTMLInputElement;
            if (input && badgeConfig[field] !== undefined) {
              input.value = String(badgeConfig[field]);
            }
          }
        });
      }
    });
  });
}

function toggleBadgeDetails(badgeKey: keyof BadgesUserConfig, show: boolean) {
  const details = document.getElementById(`${badgeKey}-details`);
  if (details) {
    if (show) {
      details.classList.remove('d-none');
    } else {
      details.classList.add('d-none');
    }
  }
}

function saveBadgesConfig() {
  const config: BadgesUserConfig = JSON.parse(JSON.stringify(badgesUserConfig));

  (Object.keys(config) as Array<keyof BadgesUserConfig>).forEach(badgeKey => {
    const section = document.querySelector(`[data-badge="${badgeKey}"]`);

    if (section) {
      const enabledInput = section.querySelector(`#${badgeKey}-enabled`) as HTMLInputElement;
      if (enabledInput) config[badgeKey].enabled = enabledInput.checked;

      const styleSelect = section.querySelector(`#${badgeKey}-style`) as HTMLSelectElement;
      if (styleSelect) config[badgeKey].style = styleSelect.value as any;

      ['label', 'logo', 'logoColor', 'logoSize', 'color', 'labelColor', 'cacheSeconds'].forEach(field => {
        const input = section.querySelector(`#${badgeKey}-${field}`) as HTMLInputElement;
        if (input && input.value.trim()) {
          (config[badgeKey] as any)[field] = input.value.trim();
        } else if (input) {
          delete (config[badgeKey] as any)[field];
        }
      });
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
