import { Star } from "lucide-react";

export function SocialProof() {
    return (
        <section className="py-12 border-y border-border/50 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                            ))}
                        </div>
                        <p className="font-medium text-foreground">4.9/5 Average Rating</p>
                        <p className="text-sm text-muted-foreground">From 2,000+ reviews</p>
                    </div>

                    <div className="h-12 w-px bg-border hidden md:block" />

                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold font-heading text-primary">12,847</span>
                        <p className="font-medium text-foreground">Trips Planned This Month</p>
                    </div>

                    <div className="h-12 w-px bg-border hidden md:block" />

                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold font-heading text-secondary">$2.4M</span>
                        <p className="font-medium text-foreground">Travel Budget Optimized</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
