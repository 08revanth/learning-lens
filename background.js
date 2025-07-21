importScripts('config.js');
// This is the listener for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Check if the message contains the text we're looking for
  if (request.text) {
    // Call the Gemini API
    getGeminiDefinition(request.text);
  }
});

// The function that makes the API call
async function getGeminiDefinition(selectedText) {
  // !!! IMPORTANT: Make sure your actual API key is here
 // const API_KEY = ' '; 

  // CORRECTED: Using the stable and current model endpoint
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
      // This will catch other errors like 400 or 500
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