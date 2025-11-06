import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";

// Force dynamic rendering and disable caching
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!process.env.API_KEY) {
      // In a production environment, you'd want more robust logging here.
      console.error("API_KEY environment variable not set");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents:
        "Generate an inspiring quote from a fictional creator about their upcoming product launch, and a fictional creator handle. The handle should start with '@'.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quote: {
              type: Type.STRING,
              description:
                "An inspiring quote from a fictional creator about their upcoming product launch.",
            },
            handle: {
              type: Type.STRING,
              description: "A fictional creator handle, starting with '@'.",
            },
          },
          required: ["quote", "handle"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("API response did not contain any text.");
    }

    const jsonString = text.trim();
    // The response from the API is a JSON string that needs to be parsed.
    const data = JSON.parse(jsonString);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error generating spotlight:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { error: "Failed to generate spotlight", details: errorMessage },
      { status: 500 }
    );
  }
}
