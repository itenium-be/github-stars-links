import { activateDirectlyOn } from "../directActivation";
import { DirectActivation } from "../types";

// TODO: Dear Claud:
// directActivation: The options page has been hidden, because there are some bugs
// url can be a regex or a string: when retrieving it from disk, it needs to be converted to a RegExp again
// When the url is a RegExp, it shows "undefined" in the options UI
// Right now the url is just a label, but the user must be able to change this (must work for string & RegExp)
// The user must also be able to change the other fields: observe, extraBadgeSelector etc
// The user must be able to enter additional sites where it activates directly

// Gulpfile: when zipping the manifest.json, I want to delete the "reload" command from it first

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
