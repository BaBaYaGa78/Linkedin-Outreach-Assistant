# Quick Command Reference

## 🚀 GitHub Push Commands (Copy & Paste)

```bash
# 1. Navigate to your project folder
cd /path/to/linkedin-outreach-assistant

# 2. Initialize git repository
git init

# 3. Add all files
git add .

# 4. Create first commit
git commit -m "Initial commit: LinkedIn Outreach Assistant"

# 5. Add GitHub remote (replace BaBaYaGa78 if needed)
git remote add origin https://github.com/BaBaYaGa78/linkedin-outreach-assistant.git

# 6. Rename branch to main (if needed)
git branch -M main

# 7. Push to GitHub
git push -u origin main
```


## 🛠️ Backend Deployment (Vercel)

```bash
# Install Vercel globally
npm install -g vercel

# Navigate to backend
cd backend

# Install dependencies
npm install

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variable
vercel env add OPENAI_API_KEY production
# Paste your NEW API key when prompted

# Deploy to production
vercel --prod

# Your API endpoint will be: https://your-project.vercel.app/api/generate
```

## 🔧 Update Chrome Extension

After deploying backend, edit `chrome-extension/popup.js`:

Line 4:
```javascript
const API_ENDPOINT = "https://your-project.vercel.app/api/generate";
```

## 📦 Load Extension in Chrome

1. Open `chrome://extensions/`
2. Enable "Developer mode" (top right toggle)
3. Click "Load unpacked"
4. Select the `chrome-extension` folder
5. Done!

## 🔄 Future Updates

```bash
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Your change description"

# Push
git push
```

## 🆘 Common Issues

### Authentication error when pushing
```bash
# Use personal access token instead of password
# Create one at: https://github.com/settings/tokens
```

### Wrong branch name
```bash
# Rename to main
git branch -M main
git push -u origin main
```

### Changes not showing on GitHub
```bash
# Make sure you pushed
git push

# Or if first time
git push -u origin main
```

## ✅ Checklist

Before sharing your project:
- [ ] Pushed to GitHub
- [ ] Revoked old API key
- [ ] Created new API key
- [ ] Deployed backend
- [ ] Updated API_ENDPOINT in popup.js
- [ ] Tested extension in Chrome
- [ ] Verified no sensitive data in repo

## 📧 Need Help?

- GitHub Docs: https://docs.github.com
- Vercel Docs: https://vercel.com/docs
- Chrome Extensions: https://developer.chrome.com/docs/extensions/
