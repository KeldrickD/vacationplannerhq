import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import { Itinerary, UserProfile } from "./types";
import * as dotenv from 'dotenv';
import * as path from 'path';

// Manually load .env.local since Next.js isn't picking it up
if (typeof window === 'undefined') {
    dotenv.config({ path: path.join(process.cwd(), '.env.local') });
}

// Lazy initialization to avoid client-side errors
let genAI: GoogleGenerativeAI | null = null;
let openai: OpenAI | null = null;

function getGeminiClient() {
    if (!genAI && process.env.GEMINI_API_KEY) {
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    }
    return genAI;
}

function getOpenAIClient() {
    if (!openai && process.env.OPENAI_API_KEY) {
        openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    return openai;
}

// Mock response for fallback
const MOCK_ITINERARY: Itinerary = {
    trip_title: "Romantic Bali Escape",
    overview: "A magical 8-day journey through Bali's cultural heart and coastal gems. From the rice terraces of Ubud to the cliffside sunsets of Uluwatu, this trip balances relaxation with authentic local experiences.",
    total_cost_breakdown: {
        flights: 1200,
        accommodation: 1400,
        food_drinks: 800,
        activities_transport: 500,
        buffer: 300,
        grand_total: 4200
    },
    flights: {
        outbound: "Singapore Airlines, 18h, $600/pp, [Book Now](#)",
        return: "Singapore Airlines, 19h, $600/pp, [Book Now](#)"
    },
    accommodations: [
        {
            nights: "1-4",
            name: "Komaneka at Bisma (Ubud)",
            price_total: 800,
            booking_link: "#",
            why: "Hidden gem in the jungle but close to town. Infinity pool overlooks the river valley."
        },
        {
            nights: "5-8",
            name: "Mick's Place (Bingin Beach)",
            price_total: 600,
            booking_link: "#",
            why: "Boutique cliffside bungalows with the best sunset view in Bali. Very private."
        }
    ],
    itinerary: [
        {
            day: 1,
            date: "2026-03-15",
            title: "Arrival & Jungle Vibes",
            morning: "Land at DPS, private transfer to Ubud (1.5h). Check in and decompress.",
            afternoon: "Light lunch at Kafe Ubud. Walk the Campuhan Ridge Walk for sunset views.",
            evening: "Relaxing massage at the hotel spa.",
            dinner: "Hujan Locale - modern Indonesian cuisine (Reservation booked).",
            stay: "Komaneka at Bisma"
        },
        {
            day: 2,
            date: "2026-03-16",
            title: "Water Temples & Rice Terraces",
            morning: "Early start (7am) to Tegalalang Rice Terrace before the crowds.",
            afternoon: "Visit Tirta Empul for a purification ritual. Lunch at a local warung.",
            evening: "Return to hotel for pool time.",
            dinner: "Locavore (Splurge dinner) - 7-course tasting menu.",
            stay: "Komaneka at Bisma"
        },
        {
            day: 3,
            date: "2026-03-17",
            title: "Hidden Waterfalls",
            morning: "Trek to Kanto Lampo Waterfall (less touristy than others).",
            afternoon: "Cooking class at a local organic farm.",
            evening: "Free time to explore Ubud market.",
            dinner: "Street food night market tour.",
            stay: "Komaneka at Bisma"
        }
    ],
    packing_list: [
        "Lightweight rain jacket (tropical showers)",
        "Reef-safe sunscreen",
        "Sarong (for temple visits)",
        "Comfortable walking sandals",
        "Universal power adapter",
        "Mosquito repellent",
        "Swimwear (2-3 sets)",
        "Light linen clothes",
        "Camera/GoPro",
        "Dry bag for water activities"
    ],
    pro_tips: [
        "Download GoJek app for cheap local transport and food delivery.",
        "Don't drink tap water, even for brushing teeth.",
        "Cash is king in smaller warungs, keep IDR handy."
    ]
};

export async function generateItinerary(profile: UserProfile): Promise<Itinerary> {
    console.log("🚀 generateItinerary called with profile:", profile);
    const prompt = buildPrompt(profile);

    // Try OpenAI first (User requested switch)
    console.log("📡 Attempting to get OpenAI client...");
    const openaiClient = getOpenAIClient();
    console.log("📡 OpenAI client:", openaiClient ? "FOUND" : "NULL");

    if (openaiClient) {
        try {
            console.log("Attempting to generate itinerary with OpenAI...");
            const completion = await openaiClient.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert travel planner. Always respond with valid JSON matching the exact schema provided."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                response_format: { type: "json_object" }
            });

            const content = completion.choices[0].message.content;
            if (content) {
                console.log("✓ OpenAI API succeeded");
                return JSON.parse(content) as Itinerary;
            }
        } catch (error) {
            console.warn("OpenAI API failed:", error);
        }
    }

    // Fallback to Gemini
    console.log("📡 Attempting to get Gemini client...");
    const geminiClient = getGeminiClient();
    console.log("📡 Gemini client:", geminiClient ? "FOUND" : "NULL");

    if (geminiClient) {
        try {
            console.log("Attempting to generate itinerary with Gemini...");
            const model = geminiClient.getGenerativeModel({
                model: "gemini-2.0-flash",
                generationConfig: { responseMimeType: "application/json" }
            });

            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();

            console.log("✓ Gemini API succeeded");
            return JSON.parse(text) as Itinerary;

        } catch (error) {
            console.warn("Gemini API failed:", error);
        }
    }

    // Final fallback to mock data
    console.warn("No API keys available or all APIs failed, returning mock data.");
    await new Promise(resolve => setTimeout(resolve, 1000));
    return MOCK_ITINERARY;
}

function buildPrompt(profile: UserProfile): string {
    return `
You are an expert travel planner. Create a detailed, personalized travel itinerary based on the following user profile:
${JSON.stringify(profile, null, 2)}

The output must be a valid JSON object matching this schema:
{
    "trip_title": "string",
    "overview": "string",
    "total_cost_breakdown": {
        "flights": number,
        "accommodation": number,
        "food_drinks": number,
        "activities_transport": number,
        "buffer": number,
        "grand_total": number
    },
    "flights": {
        "outbound": "string",
        "return": "string"
    },
    "accommodations": [
        {
            "nights": "string",
            "name": "string",
            "price_total": number,
            "booking_link": "string",
            "why": "string"
        }
    ],
    "itinerary": [
        {
            "day": number,
            "date": "string (YYYY-MM-DD)",
            "title": "string",
            "morning": "string",
            "afternoon": "string",
            "evening": "string",
            "dinner": "string",
            "stay": "string"
        }
    ],
    "packing_list": ["string"],
    "pro_tips": ["string"]
}

Be specific, creative, and practical. Ensure the total cost matches the user's budget.
    `.trim();
}

export async function refineItinerary(currentItinerary: Itinerary, instruction: string): Promise<Itinerary> {
    const prompt = `
You are an expert travel planner. Update the following itinerary based on this user instruction: "${instruction}"

Current Itinerary:
${JSON.stringify(currentItinerary, null, 2)}

Return the fully updated JSON object with the same schema.
    `.trim();

    // Try OpenAI first
    const openaiClient = getOpenAIClient();
    if (openaiClient) {
        try {
            console.log("Attempting to refine itinerary with OpenAI...");
            const completion = await openaiClient.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert travel planner. Always respond with valid JSON matching the exact schema provided."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                response_format: { type: "json_object" }
            });

            const text = completion.choices[0].message.content;
            if (!text) throw new Error("No response from OpenAI");

            console.log("✓ OpenAI API succeeded");
            return JSON.parse(text) as Itinerary;

        } catch (error) {
            console.warn("OpenAI API failed:", error);
        }
    }

    // Fallback to Gemini
    const geminiClient = getGeminiClient();
    if (geminiClient) {
        try {
            console.log("Attempting to refine itinerary with Gemini...");
            const model = geminiClient.getGenerativeModel({
                model: "gemini-2.0-flash",
                generationConfig: { responseMimeType: "application/json" }
            });

            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();

            console.log("✓ Gemini API succeeded");
            return JSON.parse(text) as Itinerary;

        } catch (error) {
            console.warn("Gemini API failed:", error);
        }
    }

    // Final fallback: simple mock refinement
    console.warn("No API keys available or all APIs failed, returning mock refinement.");
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
        ...currentItinerary,
        trip_title: currentItinerary.trip_title + " (Refined)",
        overview: "Updated based on your request: " + instruction
    };
}
