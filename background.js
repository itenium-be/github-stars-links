function activateGitHubStars() {
  // Send message to the active tab's content script
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'activate-github-stars' });
    }
  });
}

// Handle keyboard shortcut
chrome.commands.onCommand.addListener(command => {
  if (command === 'activate-github-stars') {
    activateGitHubStars();
  }

  // TODO: this is not ideal, we're polluting the dev script (also in manifest.json)
  else if (command === 'reload') {
    chrome.runtime.reload();
  }
});

// Handle extension icon click
chrome.action.onClicked.addListener(() => {
  activateGitHubStars();
});
