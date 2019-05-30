document.addEventListener("DOMContentLoaded", function() {
  chrome.storage.sync.get(
    {
      audioUrl: "",
      autoPlay: false,
      clickMode: "pause",
      volume: 1
    },
    function(items) {
      const audioUrl = document.getElementById("audio-url");
      audioUrl.value = items.audioUrl;
      const autoPlay = document.getElementById("auto-play");
      autoPlay.checked = items.autoPlay;
      document.getElementById(items.clickMode + "-mode").checked = true;
      const volume = document.getElementById("volume");
      volume.value = items.volume;
    }
  );
});

document.getElementById("save").addEventListener("click", function() {
  const audioUrl = document.getElementById("audio-url").value;
  const autoPlay = document.getElementById("auto-play").checked;
  const clickMode = document.getElementById("pause-mode").checked
    ? "pause"
    : "stop";
  const volume = document.getElementById("volume").value;
  chrome.storage.sync.set(
    {
      audioUrl: audioUrl,
      autoPlay: autoPlay,
      clickMode: clickMode,
      volume: volume
    },
    function() {
      chrome.runtime.reload();
    }
  );
});

document
  .getElementById("keyboard-shortcuts")
  .addEventListener("click", function() {
    chrome.tabs.create({ url: "chrome://extensions/configureCommands" });
  });
