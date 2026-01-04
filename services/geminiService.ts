import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// CAUTION: In a real app, API keys should not be exposed on the client.
// This is for demonstration purposes within this specific environment.
const API_KEY = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

// Initialize the Google GenAI client if the key is available
try {
    if (API_KEY) {
        ai = new GoogleGenAI({ apiKey: API_KEY });
    }
} catch (e) {
    console.error("Failed to initialize Gemini Client", e);
}

/**
 * Generates a response from the Gemini AI model based on chat history and a new user prompt.
 * 
 * @param history - Array of previous message strings (formatted as "User: ..." or "AI: ...")
 * @param userPrompt - The latest message from the user
 * @returns A promise resolving to the AI's text response
 */
export const generateAIResponse = async (history: string[], userPrompt: string): Promise<string> => {
  if (!ai) return "I'm offline right now (Missing API Key).";

  try {
    // Select the appropriate model for basic text tasks/chat
    const model = 'gemini-3-flash-preview';
    
    // Construct a system-prompt like context using the chat history
    // This gives the AI 'memory' of the recent conversation
    const context = `You are a helpful AI assistant in a social media app called Nexus Social. Keep responses concise and friendly.
    
    Recent Chat History:
    ${history.join('\n')}
    `;

    // Send the request to Gemini
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: `
      ${context}
      User: ${userPrompt}
      AI:`,
    });

    return response.text || "I didn't catch that.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to my brain right now.";
  }
};