import { Chat } from "@google/genai";

export interface Color {
  hex: string;
  name: string;
  usage: string;
}

export interface Font {
  name:string;
  googleFontUrl: string;
  weight: number;
}

export interface Typography {
  headerFont: Font;
  bodyFont: Font;
}

export interface BrandIdentity {
  companyName: string;
  primaryLogo: string;
  secondaryLogo1: string;
  secondaryLogo2: string;
  colorPalette: Color[];
  typography: Typography;
}

export interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}

// FIX: Changed from `interface GeminiChat extends Chat` to a type alias.
// This correctly aliases the `Chat` type from the @google/genai library,
// ensuring that all its methods, like `sendMessage`, are available. An interface
// cannot correctly extend a class type in this manner.
export type GeminiChat = Chat;