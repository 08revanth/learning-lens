importScripts('config.js');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  
  if (request.text) {
    getGeminiDefinition(request.text);
  }
});
function updatePopup(historyItem) {
  const definitionContainer = document.getElementById('definition-container');
  if (historyItem && historyItem.definition) {
    typewriterEffect(definitionContainer, historyItem.definition);
  }
}

function updateHistoryList(history) {
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = ''; 
  
  for (let i = 1; i < history.length; i++) {
    const item = history[i];
    const listItem = document.createElement('li');
    listItem.textContent = item.term;
    listItem.title = item.definition; // Show full definition on hover
    historyList.appendChild(listItem);
  }
}

function typewriterEffect(element, text, speed = 20) {
  let i = 0;
  element.innerHTML = "";
  element.style.cursor = 'wait';

  const timer = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
      element.style.cursor = 'default';
    }
  }, speed);
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get({ history: [] }, (result) => {
    const history = result.history;
    if (history.length > 0) {
      updatePopup(history[0]); 
      updateHistoryList(history); 
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.newDefinition) {
    chrome.storage.local.get({ history: [] }, (result) => {
       const history = result.history;
       updatePopup(history[0]);
       updateHistoryList(history);
    });
  }
});

async function getGeminiDefinition(selectedText) {
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

  const prompt = `Explain the concept "${selectedText}" in a clear and concise way for a browser extension. Limit the response to 2-3 sentences.`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
    
      const errorBody = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }

    const data = await response.json();
    const definition = data.candidates[0].content.parts[0].text;
    
    console.log("Gemini Definition:", definition);
    chrome.storage.local.set({ lastDefinition: definition });
    chrome.runtime.sendMessage({ newDefinition: definition });

  } catch (error) {
    console.error("Error calling Gemini API:", error);
  }
}
