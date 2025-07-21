# 🚀 Learning Lens: AI-Powered Browser Extension

Learning Lens is a browser extension that transforms web pages into an interactive learning platform. Simply select any text on a page to get an instant, AI-powered definition.

## ✨ Features

- **Instant Definitions:** Get clear, concise explanations for any word or concept powered by the Google Gemini API.
- **Sleek UI:** A modern, dark-themed interface with animated, futuristic text effects.
- **Seamless Integration:** Works on any webpage without interrupting your workflow.
- **Lightweight & Fast:** Built with pure JavaScript for a minimal performance footprint.

## 🛠️ Tech Stack

- **Framework:** Browser Extension (Manifest V3)
- **Core Logic:** JavaScript (ES6)
- **AI Engine:** Google Gemini API
- **Styling:** CSS3 with Google Fonts

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need a modern web browser that supports extensions, like Google Chrome or Brave.

### Installation

1.  **Clone the repo**
    ```sh
    git clone [https://github.com/08revanth/learning-lens.git](https://github.com/08revanth/learning-lens.git)
    ```
2.  **Get a Google AI API Key**
    - Go to [Google AI Studio](https://aistudio.google.com).
    - Click "Get API key" and create a new key.

3.  **Configure the API Key**
    - In the project's root directory, create a new file named `config.js`.
    - Add the following line to it, replacing `YOUR_API_KEY` with the key you just created:
      ```javascript
      const API_KEY = 'YOUR_API_KEY';
      ```

4.  **Load the Extension in Chrome**
    - Open Chrome and navigate to `chrome://extensions`.
    - Enable "Developer mode" in the top right corner.
    - Click "Load unpacked" and select the project folder.
    - Pin the "Learning Lens" extension to your toolbar, and you're ready to go!

---

## 🔮 Future Enhancements

- **Concept Mapping:** Use embeddings to find related concepts and visualize them with D3.js.
- **History:** Save previous definitions in `chrome.storage` for users to review later.
- **Custom Prompts:** Allow users to customize the prompt sent to the AI (e.g., "Explain this like I'm five").
- **Firebase Integration:** Add an option to save and share knowledge maps publicly.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.