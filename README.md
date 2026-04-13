# LinkedIn Outreach Assistant

A Chrome extension that helps craft personalized LinkedIn messages for recruiters, hiring managers, and product managers using AI.

## 🚀 Features

- **Persona-based messaging**: Tailor messages for hiring managers, PMs, direct recruiters, or general recruiters
- **Message type selection**: Connection requests (300 chars) or InMail (400-600 chars)
- **Resume integration**: Store your resume and automatically reference relevant experience
- **Job description parsing**: Paste job descriptions to align your message
- **Revision support**: Iteratively refine messages with custom suggestions
- **Anti-generic**: Built-in prompts to avoid LinkedIn clichés and robotic phrasing

## 📁 Project Structure

```
linkedin-outreach-assistant/
├── chrome-extension/          # Chrome extension files
│   ├── manifest.json         # Extension configuration
│   ├── popup.html            # Main popup interface
│   ├── popup.js              # Popup logic and API calls
│   ├── options.html          # Settings page
│   ├── options.js            # Settings logic
│   └── icon.png              # Extension icon
├── backend/                   # Backend API (optional)
│   └── generate.js           # Serverless function for AI generation
└── README.md
```

## ⚙️ Setup

### Prerequisites

- Google Chrome browser
- A backend API endpoint (or deploy the included serverless function)
- OpenAI API key (to be configured in your backend)

### Backend Setup

The extension requires a backend API to securely handle OpenAI API calls. You have two options:

#### Option 1: Deploy to Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Navigate to the backend folder and create a `package.json`:
   ```bash
   cd backend
   npm init -y
   npm install node-fetch
   ```

3. Deploy to Vercel:
   ```bash
   vercel
   ```

4. Set your OpenAI API key as an environment variable in Vercel:
   - Go to your Vercel project dashboard
   - Settings → Environment Variables
   - Add: `OPENAI_API_KEY` = `your-api-key-here`

5. Copy your deployment URL (e.g., `https://your-project.vercel.app/api/generate`)

#### Option 2: Use Your Own Backend

Create an endpoint that:
- Accepts POST requests with a `prompt` field
- Calls OpenAI API with your API key
- Returns `{ message: "generated text" }`

### Chrome Extension Installation

1. Update the API endpoint in `chrome-extension/popup.js`:
   ```javascript
   const API_ENDPOINT = "YOUR_BACKEND_API_ENDPOINT";
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" (toggle in top right)

4. Click "Load unpacked"

5. Select the `chrome-extension` folder

6. The extension icon should appear in your Chrome toolbar

## 🛠️ Usage

### Initial Setup

1. Click the extension icon and go to "Options" (right-click icon → Options)

2. Fill in your information:
   - **Resume**: Paste your resume or key experience points
   - **Additional Info**: Any extra context (projects, skills, interests)
   - **Prompt Style Instructions**: Custom tone guidance (e.g., "Be casual" or "Focus on technical skills")

3. Click "Save"

### Generating Messages

1. Click the extension icon

2. Select:
   - **Who you're messaging**: Hiring Manager, PM, Direct Recruiter, or General Recruiter
   - **Message type**: Connection Request or InMail

3. (Optional) Paste the job description

4. Click "Generate Message"

5. Review the generated message

6. (Optional) Use "Suggest a Revision" to refine the message

## 🔒 Security Notes

**IMPORTANT**: Never commit API keys to GitHub. The original version of this extension had an exposed API key, which has been removed. Always:

- Store API keys in environment variables
- Use a backend to handle API calls
- Add `.env` files to `.gitignore`

## 🛡️ Privacy

**Your data stays private:**
- Resume and personal info are stored **locally in your browser only** (Chrome local storage)
- Data is never uploaded anywhere except:
  - When you click "Generate Message" - only then is your resume sent to the backend API
  - The backend uses it to generate a message and does not store it
- Uninstalling the extension deletes all stored data
- Each user must enter their own information - nothing is shared between users

**This is a personal tool:** Each person who installs this extension enters their own resume and preferences. No data is hardcoded or shared.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🐛 Known Issues

- Extension requires an active internet connection
- Backend API endpoint must be configured before use
- Character limits are enforced by LinkedIn, not the extension

## 💡 Future Improvements

- [ ] Add support for follow-up messages
- [ ] Profile scraping for better personalization
- [ ] A/B testing message variants
- [ ] Analytics on message performance
- [ ] Support for other platforms (Twitter, email)

## 👤 Author

Created by BaBaYaGa78

## 🙏 Acknowledgments

- OpenAI for GPT API
- Chrome Extensions documentation
