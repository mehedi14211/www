import { GoogleGenAI, Type } from "@google/genai";

export async function onRequestPost(context: any) {
  try {
    const { request, env } = context;
    const { niche, videoFormat, tone, topic } = await request.json();

    if (!niche || !videoFormat || !tone) {
      return new Response(JSON.stringify({ error: "Niche, video format, and tone are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const apiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY is missing on Cloudflare. Please configure it in your Cloudflare Pages Settings." }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
    });

    const systemPrompt = `You are the lead content director and scriptwriter at MHF Studio, a premium, high-retention video editing agency.
Your task is to generate a comprehensive, highly engaging, and viral-optimized script strategy matching a specified niche, format, tone, and topic.
Provide EXACTLY 3 diverse hook options and a cohesive 4-part script flow. Make sure the content is highly professional, engaging, and contains no filler text.`;

    const userPrompt = `Generate a video strategy for the following specifications:
- Niche/Industry: ${niche}
- Video Format: ${videoFormat}
- Desired Tone: ${tone}
- Subject/Topic: ${topic || "Industry-specific secret or myth"}

Please provide a highly-polished, premium video script. Make sure it incorporates MHF Studio's style: cinematic b-rolls, clean, high-impact typography overlays, sound design triggers, and smooth, high-retention editing cues.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature: 0.8,
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hookOptions: {
              type: Type.ARRAY,
              description: "List of exactly 3 diverse hook options.",
              items: {
                type: Type.OBJECT,
                properties: {
                  visual: {
                    type: Type.STRING,
                    description: "A detailed description of what the viewer sees on screen in the first 3 seconds (b-roll, zoom, custom typography, or physical gesture)",
                  },
                  verbal: {
                    type: Type.STRING,
                    description: "The exact spoken hook line to captivate the audience",
                  },
                  pacing: {
                    type: Type.STRING,
                    description: "Editing tempo/pacing style for the hook (e.g. rapid snap cuts, slow zoom with a hard hit sound, text-on-beat)",
                  },
                },
                required: ["visual", "verbal", "pacing"],
              },
            },
            scriptFlow: {
              type: Type.ARRAY,
              description: "A cohesive 4-part script flow.",
              items: {
                type: Type.OBJECT,
                properties: {
                  sectionName: {
                    type: Type.STRING,
                    description: "e.g., Intro, Body Point 1, Body Point 2, Conclusion/CTA",
                  },
                  visualDescription: {
                    type: Type.STRING,
                    description: "High-fidelity visual blueprint of what the editor will construct (sound effects, motion graphics, overlay texts, zoom transitions)",
                  },
                  spokenLines: {
                    type: Type.STRING,
                    description: "The actual spoken content for this section of the video",
                  },
                },
                required: ["sectionName", "visualDescription", "spokenLines"],
              },
            },
            editingStyleGuide: {
              type: Type.OBJECT,
              properties: {
                colorGrading: {
                  type: Type.STRING,
                  description: "Recommended color grade matching the chosen tone",
                },
                soundDesign: {
                  type: Type.STRING,
                  description: "Key audio accents, transitions, and background music style",
                },
                textOverlays: {
                  type: Type.STRING,
                  description: "Font and motion graphic style instructions for captioning and typography overlays",
                },
              },
              required: ["colorGrading", "soundDesign", "textOverlays"],
            },
            ctaRecommendation: {
              type: Type.STRING,
              description: "The ideal Call to Action based on the video flow",
            },
          },
          required: ["hookOptions", "scriptFlow", "editingStyleGuide", "ctaRecommendation"],
        },
      },
    });

    let text = response.text;
    if (!text) {
      throw new Error("No response received from the Gemini AI engine.");
    }

    text = text.trim();
    if (text.startsWith("```json")) {
      text = text.slice(7);
    } else if (text.startsWith("```")) {
      text = text.slice(3);
    }
    if (text.endsWith("```")) {
      text = text.slice(0, -3);
    }
    text = text.trim();

    return new Response(text, {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    console.error("Strategy API error on Cloudflare:", error);
    return new Response(JSON.stringify({ error: error.message || "An internal error occurred." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
