import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, MapPin, Sparkles } from "lucide-react";

export function Hero() {
    return (
        <section className="relative pt-20 pb-32 overflow-hidden">
            <div className="container mx-auto px-4 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/50 text-accent-foreground text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 border border-accent/20 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Now in public beta
                </div>

                <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-foreground mb-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                    Your personal <span className="text-primary relative inline-block">
                        AI travel chief
                        <svg className="absolute -bottom-2 left-0 w-full h-3 text-secondary/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                        </svg>
                    </span>
                </h1>

                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 font-medium">
                    The ultra-capable, slightly cheeky travel best friend who plans your perfect trip in 60 seconds. I plan. You pack. That’s it.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    <Link href="/plan">
                        <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all bg-primary text-primary-foreground hover:bg-primary/90">
                            Plan My Free Trip <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-2 hover:bg-accent/10 hover:text-foreground hover:border-accent">
                        <PlayCircle className="mr-2 h-5 w-5" /> Watch Demo
                    </Button>
                </div>

                {/* Voice Example Cards - Floating Elements */}
                <div className="relative max-w-5xl mx-auto mt-12 hidden md:block">
                    {/* Card 1: Left */}
                    <div className="absolute -top-20 -left-4 w-64 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20 transform -rotate-6 animate-in fade-in slide-in-from-left-8 duration-1000 delay-500 z-20">
                        <div className="flex items-start gap-3">
                            <div className="bg-secondary/10 p-2 rounded-full">
                                <MapPin className="h-5 w-5 text-secondary" />
                            </div>
                            <p className="text-sm text-left text-foreground/80 italic">
                                "I found a secret rice-terrace villa with a bathtub overlooking a volcano. You’re welcome."
                            </p>
                        </div>
                    </div>

                    {/* Card 2: Right */}
                    <div className="absolute -top-12 -right-4 w-64 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20 transform rotate-3 animate-in fade-in slide-in-from-right-8 duration-1000 delay-700 z-20">
                        <div className="flex items-start gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                                <Sparkles className="h-5 w-5 text-primary" />
                            </div>
                            <p className="text-sm text-left text-foreground/80 italic">
                                "You said ‘relaxing’. I removed the 5am hike and booked breakfast in bed."
                            </p>
                        </div>
                    </div>
                </div>

                {/* Demo Video Placeholder */}
                <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card animate-in fade-in zoom-in-95 duration-1000 delay-500 mt-8">
                    <div className="aspect-video bg-muted flex items-center justify-center group cursor-pointer relative overflow-hidden">
                        {/* Abstract Map Background */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center" />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="h-20 w-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10">
                            <PlayCircle className="h-10 w-10 text-primary fill-current" />
                        </div>
                        <p className="absolute bottom-8 text-white font-medium text-lg drop-shadow-md">See how it works (0:59)</p>
                    </div>
                </div>
            </div>

            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]" />
                <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] rounded-full bg-accent/10 blur-[80px]" />
            </div>
        </section>
    );
}
