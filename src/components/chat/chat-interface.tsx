"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles } from "lucide-react";
import { MessageBubble } from "./message-bubble";
import { Itinerary, UserProfile } from "@/lib/types";

type Message = {
    id: string;
    role: "user" | "ai";
    content: string;
    timestamp: string;
};

interface ChatInterfaceProps {
    onItineraryGenerated?: (itinerary: Itinerary) => void;
}

export function ChatInterface({ onItineraryGenerated }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [step, setStep] = useState<"travelers" | "dates" | "budget" | "vibe" | "done">("travelers");
    const [profile, setProfile] = useState<any>({});
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize welcome message on client side to avoid hydration mismatch
    useEffect(() => {
        setMessages([{
            id: "welcome",
            role: "ai",
            content: "Hey! I'm your Travel Chief. Let's plan your dream trip. First, who are you traveling with?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (text: string = input) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Intake Logic
        let nextStep = step;
        let aiResponseText = "";
        let newProfile = { ...profile };

        if (step === "travelers") {
            newProfile.travelers = text;
            nextStep = "dates";
            aiResponseText = "Got it. When are you thinking of going? (e.g., March 2026, or specific dates)";
        } else if (step === "dates") {
            newProfile.dates = text;
            nextStep = "budget";
            aiResponseText = "Noted. What's your total budget for the trip? (approximate is fine)";
        } else if (step === "budget") {
            newProfile.budget = text;
            nextStep = "vibe";
            aiResponseText = "Almost there. What's the vibe? (e.g., Relaxing, Adventure, Foodie, Culture)";
        } else if (step === "vibe") {
            newProfile.vibe = text;
            nextStep = "done";
            aiResponseText = "Perfect. Give me a moment to build your itinerary...";
        } else {
            // Refinement mode
            aiResponseText = "Updating your itinerary...";
        }

        setProfile(newProfile);
        setStep(nextStep as any);

        // Simulate AI delay
        setTimeout(async () => {
            if (nextStep === "done" && step === "vibe") {
                // Generate Itinerary via API route
                try {
                    // Transform profile to match UserProfile type
                    const formattedProfile: UserProfile = {
                        travelers: newProfile.travelers,
                        budget: parseInt(newProfile.budget.replace(/[^0-9]/g, '')) || 5000,
                        vibe: newProfile.vibe.split(',').map((v: string) => v.trim()),
                        dates: newProfile.dates,
                        destination: newProfile.destination
                    };

                    const response = await fetch('/api/generate-itinerary', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formattedProfile)
                    });

                    if (!response.ok) {
                        throw new Error('API request failed');
                    }

                    const itinerary = await response.json();
                    if (onItineraryGenerated) {
                        onItineraryGenerated(itinerary);
                    }
                    aiResponseText = `I've planned a ${itinerary.trip_title} for you! Check it out on the right.`;
                } catch (error) {
                    console.error("Error generating itinerary:", error);
                    aiResponseText = "Sorry, I encountered an error generating your itinerary. Please try again.";
                }
            }

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: aiResponseText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const handleOptionClick = (option: string) => {
        handleSend(option);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth">
                {messages.map((msg) => (
                    <MessageBubble
                        key={msg.id}
                        role={msg.role}
                        content={msg.content}
                        timestamp={msg.timestamp}
                    />
                ))}

                {isTyping && (
                    <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 mt-1 shadow-sm mr-3">
                            <Sparkles className="h-4 w-4 animate-pulse" />
                        </div>
                        <div className="bg-card border border-border rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1">
                            <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                )}

                {/* Quick Options for Travelers */}
                {!isTyping && step === "travelers" && messages.length === 1 && (
                    <div className="flex flex-wrap gap-2 ml-11 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {["Solo", "Couple", "Family", "Friends"].map((opt) => (
                            <Button
                                key={opt}
                                variant="outline"
                                className="rounded-full border-primary/20 hover:bg-primary/5 hover:border-primary"
                                onClick={() => handleOptionClick(opt)}
                            >
                                {opt}
                            </Button>
                        ))}
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background/80 backdrop-blur-sm border-t border-border">
                <div className="relative flex items-center">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder={
                            step === "travelers" ? "Who's coming?" :
                                step === "dates" ? "When are you going?" :
                                    step === "budget" ? "What's the budget?" :
                                        step === "vibe" ? "What's the vibe?" :
                                            "Ask for changes..."
                        }
                        className="pr-12 h-14 rounded-full border-border shadow-sm focus-visible:ring-primary text-base"
                    />
                    <Button
                        size="icon"
                        className="absolute right-2 h-10 w-10 rounded-full shadow-sm"
                        onClick={() => handleSend()}
                        disabled={!input.trim() || isTyping}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
                <p className="text-xs text-center text-muted-foreground mt-2">
                    Press Enter to send · AI can make mistakes, check important info.
                </p>
            </div>
        </div>
    );
}
