chrome.commands.onCommand.addListener(command => {
  if (command === 'activate-github-stars') {
    // Send message to the active tab's content script
    // when the activate shortcut is pressed
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'activate-github-stars' });
      }
    });
  }
});
