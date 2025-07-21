// This function creates the typewriter animation
function typewriterEffect(element, text, speed = 20) {
  let i = 0;
  element.innerHTML = ""; // Clear any previous text
  element.style.cursor = 'wait'; // Change cursor to show work is in progress

  const timer = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(timer); // Stop the animation when the text is fully typed
      element.style.cursor = 'default'; // Return cursor to normal
    }
  }, speed);
}

// This function is called to update the popup
function updatePopup(definition) {
  const definitionContainer = document.getElementById('definition-container');
  if (definition) {
    typewriterEffect(definitionContainer, definition);
  }
}

// 1. When the popup opens, immediately check storage for the last definition
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['lastDefinition'], (result) => {
    updatePopup(result.lastDefinition);
  });
});

// 2. Set up a listener to hear announcements from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.newDefinition) {
    updatePopup(request.newDefinition);
  }
});