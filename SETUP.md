# Step-by-Step Setup Guide

## 📋 Prerequisites Checklist

Before you begin, make sure you have:
- [ ] Git installed on your computer
- [ ] A GitHub account (username: BaBaYaGa78)
- [ ] Chrome browser installed
- [ ] OpenAI API account (for backend)

## 🚀 Part 1: Push to GitHub

### Step 1: Initialize Git Repository (Local)

Open your terminal/command prompt and navigate to your project folder:

```bash
# Navigate to the project folder
cd /path/to/linkedin-outreach-assistant

# Initialize git
git init

# Check git status
git status
```

### Step 2: Stage All Files

```bash
# Add all files to staging
git add .

# Verify files are staged
git status
```

### Step 3: Create Initial Commit

```bash
# Commit with a message
git commit -m "Initial commit: LinkedIn Outreach Assistant Chrome Extension"
```

### Step 4: Create GitHub Repository

1. Go to https://github.com/BaBaYaGa78
2. Click the "+" icon in top right → "New repository"
3. Repository name: `linkedin-outreach-assistant`
4. Description: "Chrome extension for crafting personalized LinkedIn messages using AI"
5. Choose: **Public** or **Private**
6. **DO NOT** initialize with README (you already have one)
7. Click "Create repository"

### Step 5: Connect Local to GitHub

GitHub will show you commands. Use these:

```bash
# Add remote repository
git remote add origin https://github.com/BaBaYaGa78/linkedin-outreach-assistant.git

# Verify remote
git remote -v

# Push to GitHub
git push -u origin main
```

**If you get an error about "master" vs "main":**
```bash
# Rename branch to main
git branch -M main

# Then push
git push -u origin main
```

### Step 6: Verify on GitHub

1. Go to https://github.com/BaBaYaGa78/linkedin-outreach-assistant
2. Refresh the page
3. You should see all your files!

## 🔐 Part 2: Secure Your API Key

**CRITICAL - DO THIS IMMEDIATELY**

### Step 1: Revoke Exposed API Key

1. Go to https://platform.openai.com/api-keys
2. Find the key starting with: `sk-proj-B-NXrkZq3v0-2tJKDH51...`
3. Click "Revoke" or "Delete"
4. Confirm deletion

### Step 2: Generate New API Key

1. On the same page, click "Create new secret key"
2. Give it a name: "LinkedIn Assistant Backend"
3. **Copy the key immediately** (you won't see it again)
4. Store it somewhere safe (like a password manager)

### Step 3: Check for Unauthorized Usage

1. Go to https://platform.openai.com/usage
2. Look for any suspicious activity
3. Check billing for unexpected charges

## 🛠️ Part 3: Deploy Backend (Optional but Recommended)

### Option A: Deploy to Vercel (Free)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to backend folder:
```bash
cd backend
npm install
```

3. Login to Vercel:
```bash
vercel login
```

4. Deploy:
```bash
vercel
```

5. Follow prompts:
   - Link to existing project? **No**
   - Project name: `linkedin-assistant-backend`
   - Directory: `./`
   - Override settings? **No**

6. Set environment variable:
```bash
vercel env add OPENAI_API_KEY production
```
Then paste your new API key when prompted.

7. Redeploy:
```bash
vercel --prod
```

8. Copy your deployment URL (e.g., `https://linkedin-assistant-backend.vercel.app`)

### Option B: Use Another Backend

Deploy `backend/generate.js` to:
- AWS Lambda
- Google Cloud Functions
- Netlify Functions
- Railway
- Render

## 🔧 Part 4: Configure Chrome Extension

### Step 1: Update API Endpoint

1. Open `chrome-extension/popup.js`
2. Find line 4: `const API_ENDPOINT = "YOUR_BACKEND_API_ENDPOINT";`
3. Replace with your backend URL:
   ```javascript
   const API_ENDPOINT = "https://your-project.vercel.app/api/generate";
   ```

### Step 2: Load Extension in Chrome

1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right)
4. Click "Load unpacked"
5. Navigate to and select the `chrome-extension` folder
6. Click "Select Folder"

### Step 3: Configure Your Resume

1. Click the extension icon in Chrome
2. Right-click → "Options"
3. Fill in:
   - Your resume
   - Additional info
   - Prompt style instructions
4. Click "Save"

## ✅ Part 5: Test It

1. Click the extension icon
2. Select persona and message type
3. Optionally paste a job description
4. Click "Generate Message"
5. Wait for the AI-generated message

## 📝 Future Updates

When you make changes:

```bash
# Check what changed
git status

# Add changes
git add .

# Commit changes
git commit -m "Description of what you changed"

# Push to GitHub
git push
```

## 🆘 Troubleshooting

### "Permission denied" when pushing to GitHub

Solution: Set up SSH keys or use a personal access token
- Guide: https://docs.github.com/en/authentication

### Extension doesn't load in Chrome

- Make sure you selected the `chrome-extension` folder, not the root folder
- Check Chrome console for errors (Inspect → Console)

### API calls fail

- Verify your backend URL is correct
- Check backend logs for errors
- Ensure environment variables are set
- Test backend endpoint with curl or Postman

### Git asks for username/password repeatedly

Solution: Use credential helper
```bash
git config --global credential.helper cache
```

## 🎉 You're Done!

Your project is now:
- ✅ On GitHub
- ✅ Secure (API key removed from code)
- ✅ Ready to use (if backend is deployed)
- ✅ Ready to share with others

**Important**: Update the API endpoint in `popup.js` before the extension will work!
