
import { GoogleGenAI, Type } from "@google/genai";

// Using the recommended way to initialize GoogleGenAI and generate content
// Tutoring for MSCE subjects like Math and Science is a complex task, so we use gemini-3-pro-preview
export const getAITutorHelp = async (question: string, context: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `You are a helpful academic tutor for a Malawian student studying ${context}. Answer the following question in a simple, clear way that aligns with the MSCE (Malawi School Certificate of Education) curriculum if applicable: ${question}`,
      config: {
        temperature: 0.7,
      },
    });
    // Accessing .text as a property, not a method
    return response.text || "I'm sorry, I couldn't generate an answer.";
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "The AI Tutor is resting. Please try again later.";
  }
};

// Summarization is a basic text task, so we use gemini-3-flash-preview
export const summarizeLesson = async (lessonTitle: string, transcript: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
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
    // Accessing .text as a property and parsing the JSON result
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return { summaryPoints: ["Summary could not be generated at this time."] };
  }
};
