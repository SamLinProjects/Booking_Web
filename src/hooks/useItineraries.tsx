'use client';
import { useRouter } from "next/navigation";

export default function useItineraries() {
    const router = useRouter();

    // POST
    const postItinerary = async ({
        type, 
        name, 
        description,
        image,
        url,
        start,
        destination,
        departure_time,
        arrival_time,
        price
    }: {
        type: string;
        name: string;
        description?: string;
        image?: string;
        url: string;
        start?: string;
        destination?: string;
        departure_time?: string;
        arrival_time?: string;
        price: number;
    }) => {
        try {
            const body: any = { type, name, url, price };
            if (description) body.description = description;
            if (image) body.image = image;
            if (start) body.start = start;
            if (destination) body.destination = destination;
            if (departure_time) body.departure_time = departure_time;
            if (arrival_time) body.arrival_time = arrival_time;

            const res = await fetch('/api/itineraries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            if (!res.ok) {
                const errorData = await res.json();
                alert("Failed to post itinerary: " + errorData.message);
                throw new Error(errorData.message);
            }
            console.log("Itinerary posted.");
            alert("Itinerary posted successfully!");
            router.refresh();
        } catch (error) {
            console.error("Error during posting itinerary:", error);
            alert("An error occurred while posting the itinerary. Please try again.");
        }
    }

    // GET
    const getItineraries = async () => {
        try {
            const res = await fetch('/api/itineraries', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!res.ok) {
                const errorData = await res.json();
                alert("Failed to fetch itineraries: " + errorData.message);
                throw new Error(errorData.message);
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Error during fetching itineraries:", error);
            alert("An error occurred while fetching itineraries. Please try again.");
        }
    }

    // DELETE
    const deleteItinerary = async (id: number) => {
        try {
            const res = await fetch(`/api/itineraries/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!res.ok) {
                const errorData = await res.json();
                alert("Failed to delete itinerary: " + errorData.message);
                throw new Error(errorData.message);
            }
            console.log("Itinerary deleted.");
            alert("Itinerary deleted successfully!");
            router.refresh();
        } catch (error) {
            console.error("Error during deleting itinerary:", error);
            alert("An error occurred while deleting the itinerary. Please try again.");
        }
    }

    // PUT
    const updateItinerary = async ({
        id, 
        type,
        name,
        description,
        image,
        url,
        start,
        destination,
        departure_time,
        arrival_time,
        price
    }: {
        id: number;
        type?: string;
        name?: string;
        description?: string;
        image?: string;
        url?: string;
        start?: string;
        destination?: string;
        departure_time?: string;
        arrival_time?: string;
        price?: number;
    }) => {
        try {
            const body: any = {};
            if (type) body.type = type;
            if (name) body.name = name;
            if (description) body.description = description;
            if (image) body.image = image;
            if (url) body.url = url;
            if (start) body.start = start;
            if (destination) body.destination = destination;
            if (departure_time) body.departure_time = departure_time;
            if (arrival_time) body.arrival_time = arrival_time;
            if (price !== undefined) body.price = price;

            const res = await fetch(`/api/itineraries/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            if (!res.ok) {
                const errorData = await res.json();
                alert("Failed to update itinerary: " + errorData.message);
                throw new Error(errorData.message);
            }
            console.log("Itinerary updated.");
            alert("Itinerary updated successfully!");
            router.refresh();
        } catch (error) {
            console.error("Error during updating itinerary:", error);
            alert("An error occurred while updating the itinerary. Please try again.");
        }
    }

    const searchItineraries = async ({
        type, 
        country,
        city,
        keyword, 
        start_time, 
        end_time,
        start_place, 
        end_place,
        adult,
        budget,
    }: {
        type: string;
        country?: string;
        city?: string;
        keyword?: string;
        start_time?: string;
        end_time?: string;
        start_place?: string;
        end_place?: string;
        adult?: number;
        budget?: number;
    }) => {
        try {
            const res = await fetch('/api/itineraries/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: type,
                    query: {
                        country: country,
                        city: city,
                        keyword: keyword,
                        start_time: start_time,
                        end_time: end_time,
                        start_place: start_place,
                        end_place: end_place,
                        adult: adult,
                        budget: budget
                    }
                }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                alert("Failed to search itineraries: " + errorData.message);
                throw new Error(errorData.message);
            }
            const data = await res.json();
            const results = data.results;
            console.log("Search results:", results);
            try {
                results.forEach((item: any) => {
                    postItinerary({
                        type: type,
                        name: item.title,
                        description: item?.description,
                        image: item?.image,
                        url: item.link,
                        start: item?.start_place,
                        destination: item?.end_place,
                        departure_time: item?.start_time,
                        arrival_time: item?.end_time,
                        price: item.price
                    })
                    
                })
            } catch (error) {
                console.error("Error during posting search results:", error);
                alert("An error occurred while processing search results. Please try again.");
            }

            return data;
        } catch (error) {
            console.error("Error during searching itineraries:", error);
            alert("An error occurred while searching itineraries. Please try again.");
        }
    }

    return {
        postItinerary,
        getItineraries,
        deleteItinerary,
        updateItinerary, 
        searchItineraries
    }
}