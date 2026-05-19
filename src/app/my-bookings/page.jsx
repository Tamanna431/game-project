"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { FaCalendar, FaClock, FaRupeeSign, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings`,
        { withCredentials: true }
      );
      setBookings(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load bookings",
        confirmButtonColor: "#2563eb"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel it!"
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${id}`,
          { withCredentials: true }
        );

        Swal.fire({
          icon: "success",
          title: "Cancelled!",
          text: "Your booking has been cancelled.",
          confirmButtonColor: "#2563eb"
        });

        setBookings(bookings.filter(booking => booking._id !== id));
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to cancel booking",
          confirmButtonColor: "#2563eb"
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">
            My Bookings
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        {/* Bookings List */}
        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600 hover:shadow-xl transition-all duration-300"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {/* Facility Name */}
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Facility</p>
                    <p className="font-bold text-blue-900 text-lg">
                      {booking.facility_name}
                    </p>
                  </div>

                  {/* Booking Date */}
                  <div>
                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                      <FaCalendar className="text-blue-600" /> Date
                    </p>
                    <p className="font-semibold text-gray-800">
                      {new Date(booking.booking_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </p>
                  </div>

                  {/* Time Slot */}
                  <div>
                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                      <FaClock className="text-blue-600" /> Time Slot
                    </p>
                    <p className="font-semibold text-gray-800">{booking.time_slot}</p>
                  </div>

                  {/* Total Price */}
                  <div>
                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                      <FaRupeeSign className="text-blue-600" /> Total Price
                    </p>
                    <p className="font-bold text-blue-700 text-lg">
                      ৳{booking.total_price}
                    </p>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-100 gap-4">
                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Status:</span>
                    {booking.status === "pending" ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                        <FaClock className="text-xs" /> Pending
                      </span>
                    ) : booking.status === "confirmed" ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        <FaCheckCircle className="text-xs" /> Confirmed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                        <FaTimesCircle className="text-xs" /> Cancelled
                      </span>
                    )}
                  </div>

                  {/* Cancel Button */}
                  {booking.status === "pending" && (
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <FaTrash className="text-sm" />
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">
              No Bookings Yet
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't booked any facilities yet. Start exploring!
            </p>
            <button
              onClick={() => router.push("/all-facilities")}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Explore Facilities
            </button>
          </div>
        )}
      </div>
    </div>
  );
}