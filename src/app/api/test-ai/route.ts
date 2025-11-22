import { NextResponse } from "next/server";
import { generateItinerary } from "@/lib/ai-service";
import { UserProfile } from "@/lib/types";

export async function GET() {
    const mockProfile: UserProfile = {
        travelers: "Couple",
        budget: 5000,
        destination: "Japan",
        vibe: ["Food", "Culture", "Nature"],
        dates: "5 days"
    };

    try {
        const itinerary = await generateItinerary(mockProfile);
        return NextResponse.json(itinerary);
    } catch (error) {
        return NextResponse.json({ error: "Failed to generate itinerary", details: error }, { status: 500 });
    }
}
