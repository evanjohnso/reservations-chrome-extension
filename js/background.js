chrome.runtime.onMessage.addListener((data) => {
  if (data.type === "notification") {
    chrome.notifications.onClicked.addListener(notificationCallBack);
    chrome.notifications.create("", data.options);
  }
});

function notificationCallBack() {
  chrome.runtime.sendMessage("", { type: "notificationClicked" });
}
