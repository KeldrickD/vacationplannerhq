import { Itinerary } from "@/lib/types";
import { MapPin, Calendar, DollarSign, Plane, Hotel, Utensils, Camera, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ItineraryViewProps {
    itinerary: Itinerary | null;
}

export function ItineraryView({ itinerary }: ItineraryViewProps) {
    if (!itinerary) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-accent/30 rounded-full flex items-center justify-center mb-6">
                    <MapPin className="h-10 w-10 text-accent-foreground/50" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                    Your Itinerary Will Appear Here
                </h2>
                <p className="text-muted-foreground max-w-md mb-8">
                    Chat with the AI Chief to generate a personalized day-by-day plan, complete with hidden gems and budget breakdown.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl opacity-50 pointer-events-none select-none blur-[1px]">
                    {/* Skeleton Cards */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-card rounded-xl p-4 border border-border shadow-sm h-32 flex flex-col justify-between">
                            <div className="h-4 w-20 bg-muted rounded-full" />
                            <div className="space-y-2">
                                <div className="h-3 w-full bg-muted rounded-full" />
                                <div className="h-3 w-2/3 bg-muted rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header Section */}
            <div className="relative rounded-3xl overflow-hidden bg-primary text-primary-foreground p-8 md:p-12 shadow-xl">
                <div className="relative z-10">
                    <Badge className="mb-4 bg-secondary text-secondary-foreground hover:bg-secondary/90 border-none">
                        AI Generated Trip
                    </Badge>
                    <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">{itinerary.trip_title}</h1>
                    <p className="text-primary-foreground/80 text-lg max-w-2xl leading-relaxed">
                        {itinerary.overview}
                    </p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            {/* Cost Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Budget</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${itinerary.total_cost_breakdown.grand_total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Flights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${itinerary.total_cost_breakdown.flights}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Stay</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${itinerary.total_cost_breakdown.accommodation}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Activities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${itinerary.total_cost_breakdown.activities_transport}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Day by Day */}
            <div>
                <h3 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-primary" /> Day-by-Day
                </h3>
                <div className="space-y-6">
                    {itinerary.itinerary.map((day) => (
                        <Card key={day.day} className="overflow-hidden border-l-4 border-l-primary">
                            <CardHeader className="bg-muted/20 pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                                            {day.day}
                                        </span>
                                        {day.title}
                                    </CardTitle>
                                    <span className="text-sm text-muted-foreground font-medium">{day.date}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4 grid gap-4">
                                <div className="grid grid-cols-[24px_1fr] gap-3">
                                    <div className="mt-1"><span className="block w-2 h-2 rounded-full bg-yellow-400 mx-auto" /></div>
                                    <div><span className="font-semibold text-sm uppercase text-muted-foreground tracking-wider">Morning</span> <p>{day.morning}</p></div>
                                </div>
                                <div className="grid grid-cols-[24px_1fr] gap-3">
                                    <div className="mt-1"><span className="block w-2 h-2 rounded-full bg-orange-400 mx-auto" /></div>
                                    <div><span className="font-semibold text-sm uppercase text-muted-foreground tracking-wider">Afternoon</span> <p>{day.afternoon}</p></div>
                                </div>
                                <div className="grid grid-cols-[24px_1fr] gap-3">
                                    <div className="mt-1"><span className="block w-2 h-2 rounded-full bg-indigo-400 mx-auto" /></div>
                                    <div><span className="font-semibold text-sm uppercase text-muted-foreground tracking-wider">Evening</span> <p>{day.evening}</p></div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                                    <Utensils className="h-4 w-4" /> Dinner: <span className="text-foreground font-normal">{day.dinner}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                                    <Hotel className="h-4 w-4" /> Stay: <span className="text-foreground font-normal">{day.stay}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Accommodations */}
            <div>
                <h3 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                    <Hotel className="h-6 w-6 text-primary" /> Where You'll Stay
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {itinerary.accommodations.map((stay, idx) => (
                        <Card key={idx} className="group hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-lg">{stay.name}</CardTitle>
                                <div className="text-sm text-muted-foreground">Nights {stay.nights} · ${stay.price_total} total</div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm mb-4">{stay.why}</p>
                                <a href={stay.booking_link} className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                                    Check Availability <CheckCircle2 className="h-3 w-3" />
                                </a>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Packing List */}
            <div>
                <h3 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6 text-primary" /> Smart Packing List
                </h3>
                <Card>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {itinerary.packing_list.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <div className="h-4 w-4 rounded border border-primary flex items-center justify-center shrink-0">
                                        <div className="h-2 w-2 bg-primary rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <span className="text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
