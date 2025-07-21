importScripts('config.js');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.text) {
    getGeminiDefinition(request.text);
  }
});

async function getGeminiDefinition(selectedText) {
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;
  const prompt = `Explain the concept "${selectedText}" in a clear and concise way for a browser extension. Limit the response to 2-3 sentences.`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }

    const data = await response.json();
    const definition = data.candidates[0].content.parts[0].text;
    
    console.log("Gemini Definition:", definition);

    const newHistoryItem = {
      term: selectedText,
      definition: definition,
      timestamp: new Date().toISOString()
    };

    chrome.storage.local.get({ history: [] }, (result) => {
      const history = result.history;
      history.unshift(newHistoryItem); 
    
      if (history.length > 20) {
        history.pop();
      }

      chrome.storage.local.set({ history: history }, () => {
        chrome.runtime.sendMessage({ newDefinition: newHistoryItem });
      });
    });


  } catch (error) {
    console.error("Error calling Gemini API:", error);
  }
}
