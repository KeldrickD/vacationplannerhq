import { NextResponse } from "next/server";
import { generateItinerary } from "@/lib/ai-service";
import { UserProfile } from "@/lib/types";

export async function POST(request: Request) {
    // Force recompile - testing hardcoded API key
    try {
        const profile: UserProfile = await request.json();
        const itinerary = await generateItinerary(profile);
        return NextResponse.json(itinerary);
    } catch (error) {
        console.error("Error in generate-itinerary API:", error);
        return NextResponse.json(
            { error: "Failed to generate itinerary" },
            { status: 500 }
        );
    }
}
