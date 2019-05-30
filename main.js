chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    title: "Play Audio in Background",
    contexts: ["audio"]
  });
});
