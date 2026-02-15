
import { GoogleGenAI, Type } from "@google/genai";

const getApiKey = () => {
  const key = process.env.API_KEY;
  if (!key || key === "undefined" || key.length < 10) {
    console.warn("Gemini API Key is missing or invalid. AI features will be limited.");
    return null;
  }
  return key;
};

export const getAITutorHelp = async (question: string, context: string) => {
  const apiKey = getApiKey();
  if (!apiKey) return "The AI Tutor is currently unavailable. Please ensure the API key is configured.";

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `You are a helpful academic tutor for a Malawian student studying ${context}. Answer the following question in a simple, clear way that aligns with the MSCE (Malawi School Certificate of Education) curriculum if applicable: ${question}`,
      config: {
        temperature: 0.7,
      },
    });
    return response.text || "I'm sorry, I couldn't generate an answer. Please try rephrasing your question.";
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "The AI Tutor is currently busy. Please try again in a few moments.";
  }
};

export const summarizeLesson = async (lessonTitle: string, transcript: string) => {
  const apiKey = getApiKey();
  if (!apiKey) return { summaryPoints: ["AI summarization is unavailable without a valid API key."] };
  
  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Summarize the following lesson titled "${lessonTitle}" into 5 key bullet points: ${transcript}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summaryPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || "{\"summaryPoints\": []}");
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return { summaryPoints: ["An error occurred while generating the summary. Please check back later."] };
  }
};
