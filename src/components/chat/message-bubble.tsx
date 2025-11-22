import { cn } from "@/lib/utils";
import { Plane, User } from "lucide-react";

interface MessageBubbleProps {
    role: "user" | "ai";
    content: string | React.ReactNode;
    timestamp?: string;
}

export function MessageBubble({ role, content, timestamp }: MessageBubbleProps) {
    const isAi = role === "ai";

    return (
        <div className={cn(
            "flex w-full gap-3 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300",
            isAi ? "justify-start" : "justify-end"
        )}>
            {isAi && (
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <Plane className="h-4 w-4" />
                </div>
            )}

            <div className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3 text-sm md:text-base shadow-sm",
                isAi
                    ? "bg-card border border-border text-foreground rounded-tl-none"
                    : "bg-primary text-primary-foreground rounded-tr-none"
            )}>
                <div className="whitespace-pre-wrap leading-relaxed">
                    {content}
                </div>
                {timestamp && (
                    <div className={cn(
                        "text-[10px] mt-1 opacity-70",
                        isAi ? "text-muted-foreground" : "text-primary-foreground"
                    )}>
                        {timestamp}
                    </div>
                )}
            </div>

            {!isAi && (
                <div className="h-8 w-8 rounded-full bg-secondary/20 border border-secondary text-secondary flex items-center justify-center shrink-0 mt-1">
                    <User className="h-4 w-4" />
                </div>
            )}
        </div>
    );
}
