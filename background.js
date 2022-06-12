chrome.contextMenus.create({
  title: "URL Defang",
  contexts: ["all"],
  id: "URLDefang",
});

chrome.contextMenus.create({
  title: "Copy Defanged",
  contexts: ["all"],
  parentId: "URLDefang",
  id: "copyDefang",
});

chrome.contextMenus.create({
  title: "Copy Refanged",
  contexts: ["all"],
  parentId: "URLDefang",
  id: "copyRefang",
});

chrome.contextMenus.onClicked.addListener((e) => {
  if (e.menuItemId == "copyDefang") {
    sendRightClickEvent("copyDefang");
  } else if (e.menuItemId == "copyRefang") {
    sendRightClickEvent("copyRefang");
  }
});

function sendRightClickEvent(clickType) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { defangEvent: clickType });
  });
}
