# Security Policy

## 🔐 Important Security Information

### API Key Security

**CRITICAL**: This repository previously contained an exposed OpenAI API key in `popup.js`. That key has been:
- ✅ Removed from the code
- ⚠️ **NEEDS TO BE REVOKED** by the owner

### If You Were the Original Owner

**Immediate Action Required**:


3. **Secure your new setup**:
   - Store the new API key in environment variables (`.env` file)
   - Use the backend API approach (never expose keys in client code)
   - Add `.env` to `.gitignore`

### Best Practices for Contributors

1. **Never commit**:
   - API keys
   - Passwords
   - Access tokens
   - Private keys
   - Any credentials

2. **Use environment variables**:
   ```javascript
   // ❌ NEVER do this
   const API_KEY = "sk-proj-abc123...";
   
   // ✅ DO this
   const API_KEY = process.env.OPENAI_API_KEY;
   ```

3. **Use `.gitignore`**:
   ```
   .env
   .env.local
   **/api-keys.txt
   ```

4. **Use a backend**:
   - Client-side code is always visible
   - API calls should go through your backend
   - Store secrets server-side only

### Reporting a Vulnerability

If you discover a security vulnerability in this project:

1. **Do NOT** open a public issue
2. Email the maintainer privately
3. Provide details about the vulnerability
4. Allow time for a fix before public disclosure

## License

This security policy is part of the LinkedIn Outreach Assistant project and follows the same MIT License.
