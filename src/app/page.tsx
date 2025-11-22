import { Hero } from "@/components/landing/hero";
import { SocialProof } from "@/components/landing/social-proof";
import { Plane } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <Plane className="h-6 w-6" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight">VacationPlanner HQ</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">How it works</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Pricing</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Login</a>
        </nav>
      </header>

      <Hero />
      <SocialProof />

      <footer className="py-8 text-center text-sm text-muted-foreground mt-auto">
        <p>© 2025 VacationPlanner HQ. All rights reserved.</p>
      </footer>
    </main>
  );
}
