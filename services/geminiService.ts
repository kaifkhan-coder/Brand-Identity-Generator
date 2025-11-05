import { GoogleGenAI, Type, GenerateContentResponse, Chat } from "@google/genai";
import { BrandIdentity, GeminiChat } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const brandIdentitySchema = {
  type: Type.OBJECT,
  properties: {
    companyName: {
      type: Type.STRING,
      description: "A short, catchy, and relevant company name based on the mission.",
    },
    logoPrompt: {
      type: Type.STRING,
      description: "A detailed, descriptive prompt for an AI image generator to create a primary logo. The logo should be iconic, memorable, and suitable for a modern brand. Describe the style (e.g., minimalist, geometric, abstract), colors, and imagery. It should be a single, concise paragraph.",
    },
    secondaryMarksPrompt: {
        type: Type.STRING,
        description: "A detailed, descriptive prompt for an AI image generator to create two simpler, secondary logo marks or icons based on the primary logo concept. The prompt should ask for two distinct variations.",
    },
    colorPalette: {
      type: Type.ARRAY,
      description: "A 5-color palette.",
      items: {
        type: Type.OBJECT,
        properties: {
          hex: { type: Type.STRING, description: "The hex code of the color." },
          name: { type: Type.STRING, description: "A descriptive name for the color (e.g., 'Primary Blue', 'Accent Gold')." },
          usage: { type: Type.STRING, description: "Brief usage guidelines for the color." },
        },
        required: ["hex", "name", "usage"],
      },
    },
    typography: {
      type: Type.OBJECT,
      properties: {
        headerFont: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "The name of the Google Font for headers." },
            googleFontUrl: { type: Type.STRING, description: "The full URL to import the font from fonts.googleapis.com." },
            weight: { type: Type.NUMBER, description: "A recommended font weight, e.g., 700 for bold." },
          },
          required: ["name", "googleFontUrl", "weight"],
        },
        bodyFont: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "The name of the Google Font for body text." },
            googleFontUrl: { type: Type.STRING, description: "The full URL to import the font from fonts.googleapis.com." },
            weight: { type: Type.NUMBER, description: "A recommended font weight, e.g., 400 for regular." },
          },
          required: ["name", "googleFontUrl", "weight"],
        },
      },
      required: ["headerFont", "bodyFont"],
    },
  },
  required: ["companyName", "logoPrompt", "secondaryMarksPrompt", "colorPalette", "typography"],
};

export const generateBrandIdentity = async (mission: string): Promise<BrandIdentity> => {
  try {
    const textGenResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert brand strategist and designer. Based on the following company mission, generate a complete brand identity. Mission: "${mission}". Your output MUST be a JSON object that strictly follows the provided schema. Do not include any text or markdown formatting before or after the JSON object.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: brandIdentitySchema,
      },
    });

    const brandDetails = JSON.parse(textGenResponse.text);

    const [primaryLogoResponse, secondaryLogoResponse] = await Promise.all([
      ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: brandDetails.logoPrompt,
        config: { numberOfImages: 1, aspectRatio: '1:1', outputMimeType: 'image/png' },
      }),
      ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: brandDetails.secondaryMarksPrompt,
        config: { numberOfImages: 2, aspectRatio: '1:1', outputMimeType: 'image/png' },
      })
    ]);

    if (!primaryLogoResponse.generatedImages?.[0]?.image?.imageBytes) {
        throw new Error("Primary logo generation failed.");
    }
     if (!secondaryLogoResponse.generatedImages?.[0]?.image?.imageBytes || !secondaryLogoResponse.generatedImages?.[1]?.image?.imageBytes) {
        throw new Error("Secondary logos generation failed.");
    }

    return {
      companyName: brandDetails.companyName,
      colorPalette: brandDetails.colorPalette,
      typography: brandDetails.typography,
      primaryLogo: primaryLogoResponse.generatedImages[0].image.imageBytes,
      secondaryLogo1: secondaryLogoResponse.generatedImages[0].image.imageBytes,
      secondaryLogo2: secondaryLogoResponse.generatedImages[1].image.imageBytes,
    };
  } catch (error) {
    console.error("Error generating brand identity:", error);
    throw new Error("Failed to generate brand identity. Please try again.");
  }
};


export const createChat = (): GeminiChat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
        systemInstruction: 'You are a helpful brand strategy assistant. Answer questions concisely and professionally.'
    }
  });
};

export const sendChatMessage = async (chat: GeminiChat, message: string): Promise<GenerateContentResponse> => {
    // FIX: The `sendMessage` method on a Chat object expects a string, not an object.
    return await chat.sendMessage(message);
};