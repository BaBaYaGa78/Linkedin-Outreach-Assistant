// Load saved data when the options page opens
document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get(["resumeText", "additionalInfo", "promptInstructions"], function (data) {
    if (data.resumeText) {
      document.getElementById("resume").value = data.resumeText;
    }
    if (data.additionalInfo) {
      document.getElementById("info").value = data.additionalInfo;
    }
    if (data.promptInstructions) {
      document.getElementById("instructions").value = data.promptInstructions;
    }
  });
});

// This runs when the "Save" button is clicked
document.getElementById("saveBtn").addEventListener("click", function () {
  const resumeText = document.getElementById("resume").value;
  const additionalInfo = document.getElementById("info").value;
  const promptInstructions = document.getElementById("instructions").value;

  // Save these values in Chrome local storage (only stored on this device)
  chrome.storage.local.set({
    resumeText,
    additionalInfo,
    promptInstructions
  }, function () {
    alert("Saved successfully! Your data is stored locally on this device only.");
  });
});
