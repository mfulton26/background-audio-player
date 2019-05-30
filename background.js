const audioElement = new Audio();
audioElement.addEventListener("play", updateIcon);
audioElement.addEventListener("pause", updateIcon);
audioElement.addEventListener("load", updateIcon);
audioElement.addEventListener("loadend", updateIcon);
audioElement.addEventListener("emptied", updateIcon);

let clickMode = "pause";

async function togglePlayback() {
  if (audioElement.src) {
    if (audioElement.paused) {
      if (clickMode !== "pause") {
        audioElement.load();
      }
      await audioElement.play();
    } else {
      if (clickMode === "pause") {
        audioElement.pause();
      } else {
        audioElement.load();
      }
    }
  } else {
    chrome.runtime.openOptionsPage();
  }
}

function updateIcon() {
  chrome.browserAction.setIcon({ path: iconPath() });
}

function iconPath() {
  if (audioElement.paused) {
    return "images/ic_play_arrow_black_24dp_2x.png";
  } else {
    return "images/ic_" + clickMode + "_black_24dp_2x.png";
  }
}

chrome.browserAction.onClicked.addListener(togglePlayback);

chrome.commands.onCommand.addListener(async function(command) {
  switch (command) {
    case "play-pause":
      await togglePlayback();
      break;
    case "stop":
      audioElement.load();
      break;
  }
});

document.addEventListener("DOMContentLoaded", function() {
  chrome.runtime.getBackgroundPage(function() {
    chrome.storage.sync.get(
      {
        audioUrl: "https://audiocdn.mainstreaming.tv/101156/mmc",
        autoPlay: false,
        clickMode: "pause",
        volume: 1
      },
      async function(items) {
        clickMode = items.clickMode;
        audioElement.src = items.audioUrl;
        audioElement.volume = items.volume;
        if (items.autoPlay) {
          await audioElement.play();
        }
      }
    );
  });
});
