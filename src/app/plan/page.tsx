"use client";

import { useState } from "react";
import { ChatInterface } from "@/components/chat/chat-interface";
import { ItineraryView } from "@/components/itinerary/itinerary-view";
import { Plane } from "lucide-react";
import Link from "next/link";
import { Itinerary } from "@/lib/types";

export default function PlanPage() {
    const [itinerary, setItinerary] = useState<Itinerary | null>(null);

    return (
        <div className="flex flex-col h-screen bg-background overflow-hidden">
            {/* Header */}
            <header className="h-16 border-b border-border flex items-center justify-between px-4 md:px-6 shrink-0 z-10 bg-background/80 backdrop-blur-md">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
                        <Plane className="h-5 w-5" />
                    </div>
                    <span className="font-heading font-bold text-lg tracking-tight hidden md:inline">VacationPlanner HQ</span>
                </Link>

                <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground hidden sm:block">
                        <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2 animate-pulse"></span>
                        AI Chief Online
                    </div>
                    <div className="h-8 w-8 rounded-full bg-secondary/20 border border-secondary text-secondary flex items-center justify-center font-bold text-xs">
                        JD
                    </div>
                </div>
            </header>

            {/* Main Content - Split View */}
            <main className="flex-1 flex overflow-hidden relative">
                {/* Left Panel: Chat */}
                <div className="w-full md:w-[450px] lg:w-[500px] border-r border-border flex flex-col bg-muted/10 relative z-10 shadow-xl md:shadow-none">
                    <ChatInterface onItineraryGenerated={setItinerary} />
                </div>

                {/* Right Panel: Itinerary Visualization */}
                <div className="flex-1 bg-muted/30 hidden md:block overflow-hidden relative">
                    <div className="absolute inset-0 overflow-y-auto p-6 md:p-8">
                        <ItineraryView itinerary={itinerary} />
                    </div>
                </div>
            </main>
        </div>
    );
}
