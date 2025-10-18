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
});

// Handle extension icon click
chrome.action.onClicked.addListener(() => {
  activateGitHubStars();
});
