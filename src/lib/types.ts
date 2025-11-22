export interface Itinerary {
    trip_title: string;
    overview: string;
    total_cost_breakdown: {
        flights: number;
        accommodation: number;
        food_drinks: number;
        activities_transport: number;
        buffer: number;
        grand_total: number;
    };
    flights: {
        outbound: string;
        return: string;
    };
    accommodations: {
        nights: string;
        name: string;
        price_total: number;
        booking_link: string;
        why: string;
    }[];
    itinerary: {
        day: number;
        date: string;
        title: string;
        morning: string;
        afternoon: string;
        evening: string;
        dinner: string;
        stay: string;
    }[];
    packing_list: string[];
    pro_tips: string[];
}

export interface UserProfile {
    travelers: string;
    budget: number;
    vibe: string[];
    destination?: string;
    dates?: string;
}
