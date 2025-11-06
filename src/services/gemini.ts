import { GoogleGenAI } from "@google/genai";

// FIX: Adhering to the Gemini API guidelines to use process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Sends a prompt to the Gemini AI model and gets a response.
 * @param {string} prompt The question or prompt to send to the AI.
 * @returns {Promise<string>} A promise that resolves to the AI's text response.
 */
export async function askGemini(prompt: string): Promise<string> {
  try {
    // Using gemini-2.5-flash as it's great for quick Q&A tasks.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error asking Gemini:", error);
    // Re-throw the error to allow the UI layer to handle it and display a consistent message.
    throw error;
  }
}