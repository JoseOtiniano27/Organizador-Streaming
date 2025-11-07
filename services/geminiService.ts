
import { GoogleGenAI } from "@google/genai";
import { Client } from '../types';

const MODEL_NAME = 'gemini-2.5-pro';

export async function analyzeWithGemini(clients: Client[], userPrompt: string): Promise<string> {
  // IMPORTANT: Do not expose API keys in client-side code in a real production app.
  // This is for demonstration purposes only, assuming the key is in an environment variable.
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const clientDataString = JSON.stringify(clients.map(c => ({
      name: c.name,
      email: c.email,
      phone: c.phone,
      expirationDate: c.expirationDate
  })), null, 2);

  const fullPrompt = `
    You are an expert business analyst for a small streaming service reseller.
    Here is the current list of clients in JSON format. Today's date is ${new Date().toISOString()}.

    CLIENT DATA:
    ${clientDataString}

    Based on this data, please perform the following task:
    TASK: "${userPrompt}"

    Provide a clear, concise, and actionable response. If you suggest messages, make them sound friendly and professional.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: fullPrompt,
      config: {
        // Using "thinking mode" with max budget for complex analysis as requested.
        thinkingConfig: { thinkingBudget: 32768 }
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to communicate with Gemini API.");
  }
}
   