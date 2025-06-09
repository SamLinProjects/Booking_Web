'use client';
import { useRouter } from 'next/navigation';

export default function useBooking() {
    const router = useRouter();

    // POST
    const postBooking = async ({
        user_id,
        itinerary_id,
    }: {
        user_id: number;
        itinerary_id: number;
    }) => {
        try {
            const res = await fetch(`/api/users/${user_id}/itineraries/${itinerary_id}`, {
                method: 'POST', 
            });
            if (!res.ok) {
                const errorData = await res.json();
                alert("Failed to book itinerary: " + errorData.message);
                throw new Error(errorData.message);
            }
            console.log("Booking successful.");
            alert("Itinerary booked successfully!");
            return await res.json();
        } catch (error) {
            console.error("Error during booking:", error);
            alert("An error occurred while booking the itinerary. Please try again.");
        }
    }

    // GET
    const getBookings = async (user_id: number) => {
        try {
            const res = await fetch(`/api/users/${user_id}/itineraries`, {
                method: 'GET',
            });
            if (!res.ok) {
                const errorData = await res.json();
                alert("Failed to fetch bookings: " + errorData.message);
                throw new Error(errorData.message);
            }
            return await res.json();
        } catch (error) {
            console.error("Error fetching bookings:", error);
            alert("An error occurred while fetching bookings. Please try again.");
        }
    }

    // GET by ID
    const getBookingById = async (user_id: number, itinerary_id: number) => {
        try {
            const res = await fetch(`/api/users/${user_id}/itineraries/${itinerary_id}`, {
                method: 'GET',
            });
            if (!res.ok) {
                const errorData = await res.json();
                alert("Failed to fetch booking: " + errorData.message);
                throw new Error(errorData.message);
            }
            return await res.json();
        } catch (error) {
            console.error("Error fetching booking by ID:", error);
            alert("An error occurred while fetching the booking. Please try again.");
        }
    }

    // DELETE
    const deleteBooking = async (user_id: number, itinerary_id: number) => {
        try {
            const res = await fetch(`/api/users/${user_id}/itineraries/${itinerary_id}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                const errorData = await res.json();
                alert("Failed to cancel booking: " + errorData.message);
                throw new Error(errorData.message);
            }
            console.log("Booking cancelled.");
            alert("Booking cancelled successfully!");
            router.refresh();
        } catch (error) {
            console.error("Error during cancelling booking:", error);
            alert("An error occurred while cancelling the booking. Please try again.");
        }
    }

    return {
        postBooking,
        getBookings,
        getBookingById,
        deleteBooking,
    }
}