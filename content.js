document.addEventListener('mouseup', event => {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText.length > 0) {
    chrome.runtime.sendMessage({ text: selectedText });
  }
});