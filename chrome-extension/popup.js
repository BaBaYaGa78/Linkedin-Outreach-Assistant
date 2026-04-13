// NOTE: API key should be stored securely on a backend server
// This extension requires a backend API endpoint to function

const API_ENDPOINT = "YOUR_BACKEND_API_ENDPOINT"; // e.g., https://your-domain.com/api/generate

// Shared function to send prompt to your backend
async function generateMessage(fullPrompt) {
  const output = document.getElementById("generatedMessage");
  output.value = "Generating message... please wait.";

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: fullPrompt
      })
    });

    const data = await response.json();

    if (response.ok) {
      output.value = data.message || data.choices[0].message.content.trim();
    } else {
      output.value = `Error: ${data.error?.message || "Unknown error"}`;
    }
  } catch (error) {
    output.value = `Error: ${error.message}`;
  }
}

// Helper function to build prompt based on selected options and inputs
function buildPrompt(persona, messageType, resumeText, additionalInfo, jobDescription, promptInstructions) {
  let personaNote = "";
  if (persona === "hiring_manager") {
    personaNote = "This person likely makes final hiring decisions. Use points from my resume to highlight why I am a great fit for the role described in the job Description. Find parallels between my experience and the job Description.";
  } else if (persona === "pm") {
    personaNote = "This is a product manager who works at the place where I am applying. The conversation must either lead to a coffee chat or potentially a referral. The request for help must be subtle. Use my resume creatively to establish common ground.";
  } else if (persona === "direct_recruiter") {
    personaNote = "This recruiter works directly for the company and is hiring for the role. Use my resume to highlight my fit for the role, drawing connections with the job Description.";
  } else if (persona === "recruiter") {
    personaNote = "This is a recruiter who may forward my resume or help in another way. They are likely looking for keyword alignment with the job Description, so emphasize terms like AI, product, etc.";
  }

  let messageTone = "";
  if (messageType === "connection_request") {
    messageTone = "Keep the message under 300 characters. Be concise, natural, and warm.";
  } else if (messageType === "inmail") {
    messageTone = "Ideal length is 400–600 characters, extend if helpful. Be human, warm, and aligned with persona and job context.";
  }

  const defaultPromptGuidelines = `
Avoid generic phrases like:
- "I came across your profile"
- "I was impressed by your experience"
- "Hi there!"

Do NOT sound robotic or overly formal.
Avoid fluff or compliments unless contextually genuine.
Do NOT copy phrases from LinkedIn cliches.
Write like a real person who's curious and friendly.

Instead:
- Be casual but respectful.
- Reference specific, mutual, or relevant things if possible.
- Aim for short, real conversation openers that feel like they could be sent from a phone.
`;

  const fullInstructions = `${promptInstructions}\n\n${defaultPromptGuidelines}\n\n${messageTone}`;

  const prompt = `
You are a helpful assistant writing a short, casual, and human-sounding LinkedIn message **from the user to someone they're reaching out to**.

Instructions:
- The message should sound like it's coming **from the user**, directed **to the recipient** (e.g., a PM, recruiter, or hiring manager).
- Use relevant details from the user's resume and job description to personalize it.
- The tone should be warm,natural, human like and conversational, and free from robotic-sounding phrasing.
- Persona: ${persona}
- Message Type: ${messageType}
- Respect LinkedIn's character limits (especially 300 characters for connection requests).
- Never write as if the recipient is talking to the user. This is from the user's point of view.
- Use only relevant items from my Resume, you don't have to use everything from my resume, be strategic and shrewd about it, instigate interest


Persona Notes:
${personaNote}

Writing Style Guidelines:
${fullInstructions}

Resume:
${resumeText}

Additional Info:
${additionalInfo}

${jobDescription ? `Job Description:\n${jobDescription}` : ""}

Write the message now.
`;

  return prompt;
}

// Generate Button Click Handler
document.getElementById("generateBtn").addEventListener("click", async function () {
  const persona = document.querySelector('input[name="persona"]:checked')?.value;
  const messageType = document.querySelector('input[name="message_type"]:checked')?.value;
  const jobDescription = document.getElementById("jobDescription").value.trim();

  if (!persona || !messageType) {
    alert("Please select both who you're messaging and the message type.");
    return;
  }

  chrome.storage.local.get(["resumeText", "additionalInfo", "promptInstructions"], async function (data) {
    const resumeText = data.resumeText || "[No resume found]";
    const additionalInfo = data.additionalInfo || "[No additional info]";
    const promptInstructions = data.promptInstructions || "[No instructions found]";

    if (!resumeText || !promptInstructions) {
      alert("Please make sure you've saved your resume and prompt instructions in the options page.");
      return;
    }

    const prompt = buildPrompt(persona, messageType, resumeText, additionalInfo, jobDescription, promptInstructions);
    generateMessage(prompt);
  });
});

// Regenerate with Revisions Button Handler
document.getElementById("regenerateBtn").addEventListener("click", async function () {
  const previousMessage = document.getElementById("generatedMessage").value;
  const revisionSuggestion = document.getElementById("revisionSuggestion").value.trim();

  if (!previousMessage || previousMessage.startsWith("Generating") || previousMessage.startsWith("Error")) {
    alert("Please generate a message first.");
    return;
  }

  if (!revisionSuggestion) {
    alert("Please enter a revision suggestion.");
    return;
  }

  const prompt = `
You previously wrote this LinkedIn message:

"${previousMessage}"

The user wants the following revisions:
"${revisionSuggestion}"

Please rewrite the message accordingly, keeping it short, conversational, and appropriate for LinkedIn. Avoid clichés and robotic phrasing.
  `;

  generateMessage(prompt);
});
