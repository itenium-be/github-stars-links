import { activateDirectlyOn } from "../directActivation";
import { DirectActivation } from "../types";

export function setupDirectActivationOptions() {
  loadDirectActivationList();
  document.getElementById('saveDaBtn')!.addEventListener('click', () => {
    saveDirectActivationConfig();
    showSaveDaStatus();
  });
  document.getElementById('resetDaBtn')!.addEventListener('click', resetDirectActivationToDefaults);
}

function loadDirectActivationList() {
  chrome.storage.sync.get(['directActivationConfig'], (result) => {
    const config: DirectActivation[] = result.directActivationConfig || activateDirectlyOn;

    const listEl = document.getElementById('directActivationList')!;
    listEl.innerHTML = config.map((activation, index) => {
      const urlDisplay = typeof activation.url === 'string' ? activation.url : activation.url.source;
      return `
        <div class="list-group-item">
          <div class="row align-items-center">
            <div class="col-auto">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="da-${index}"
                  ${activation.enabled ? 'checked' : ''} data-index="${index}">
              </div>
            </div>
            <div class="col">
              <strong>${activation.label}</strong>
              <br>
              <small class="text-muted">${urlDisplay}</small>
            </div>
          </div>
        </div>
      `;
    }).join('');

    document.querySelectorAll('[id^="da-"]').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        // Don't auto-save, just visual feedback that changes are pending
      });
    });
  });
}

function saveDirectActivationConfig() {
  chrome.storage.sync.get(['directActivationConfig'], (result) => {
    const config: DirectActivation[] = JSON.parse(JSON.stringify(result.directActivationConfig || activateDirectlyOn));

    document.querySelectorAll('[id^="da-"]').forEach(checkbox => {
      const input = checkbox as HTMLInputElement;
      const index = parseInt(input.dataset.index!);
      config[index].enabled = input.checked;
    });

    chrome.storage.sync.set({ directActivationConfig: config }, () => {
      console.log('Direct Activation configuration saved:', config);
    });
  });
}

function resetDirectActivationToDefaults() {
  if (confirm('Are you sure you want to reset Direct Activation settings to their default values?')) {
    chrome.storage.sync.set({ directActivationConfig: activateDirectlyOn }, () => {
      loadDirectActivationList();
      showSaveDaStatus();
      console.log('Reset Direct Activation to defaults');
    });
  }
}

function showSaveDaStatus() {
  const statusEl = document.getElementById('saveDaStatus')!;
  statusEl.style.display = 'inline';
  setTimeout(() => {
    statusEl.style.display = 'none';
  }, 2000);
}
