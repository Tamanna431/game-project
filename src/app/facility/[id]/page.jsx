"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaUsers, FaRupeeSign, FaCalendar, FaClock, FaHourglassHalf } from "react-icons/fa";

export default function FacilityDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [bookingData, setBookingData] = useState({
    facility_id: id,
    facility_name: "",
    booking_date: "",
    time_slot: "",
    hours: 1,
    total_price: 0,
    status: "pending"
  });

  useEffect(() => {
    const token = document.cookie.includes("token=");
    setIsLoggedIn(token);
    
    const fetchFacility = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${id}`);
        setFacility(data);
        setBookingData(prev => ({
          ...prev,
          facility_id: data._id,
          facility_name: data.name,
          total_price: data.price_per_hour * 1
        }));
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load facility details",
          confirmButtonColor: "#2563eb"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFacility();
  }, [id]);

  const handleHoursChange = (e) => {
    const hours = parseInt(e.target.value);
    setBookingData({
      ...bookingData,
      hours: hours,
      total_price: facility.price_per_hour * hours
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to book this facility",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2563eb",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Go to Login"
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`,
        bookingData,
        { withCredentials: true }
      );

      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Booking Successful!",
          text: "Your facility has been booked successfully",
          confirmButtonColor: "#2563eb"
        }).then(() => {
          router.push("/my-bookings");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "Failed to create booking. Please try again.",
        confirmButtonColor: "#2563eb"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Facility Not Found</h2>
          <button
            onClick={() => router.push("/all-facilities")}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition"
          >
            Back to Facilities
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">Facility Details</h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Facility Details */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border-t-4 border-blue-600">
            <img
              src={facility.image}
              alt={facility.name}
              className="w-full h-72 object-cover"
            />
            <div className="p-6">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">{facility.name}</h2>
              
              <div className="space-y-3 mb-6">
                <p className="flex items-center gap-3 text-gray-700">
                  <FaMapMarkerAlt className="text-blue-600 text-lg" />
                  <span className="font-medium">{facility.location}</span>
                </p>
                <p className="flex items-center gap-3 text-gray-700">
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {facility.facility_type}
                  </span>
                </p>
                <p className="flex items-center gap-3 text-gray-700">
                  <FaUsers className="text-blue-600" />
                  <span>Capacity: <strong>{facility.capacity}</strong> people</span>
                </p>
                <p className="flex items-center gap-3 text-gray-700">
                  <FaRupeeSign className="text-blue-600" />
                  <span className="text-2xl font-bold text-blue-700">
                    ৳{facility.price_per_hour} <span className="text-sm font-normal text-gray-600">/hour</span>
                  </span>
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-blue-900 mb-2">Available Time Slots:</h3>
                <div className="flex flex-wrap gap-2">
                  {facility.available_slots?.map((slot, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-200"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">Description:</h3>
                <p className="text-gray-700 leading-relaxed">{facility.description}</p>
              </div>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="bg-white rounded-xl shadow-xl p-6 border-t-4 border-cyan-600">
            <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
              <FaCalendar className="text-cyan-600" />
              Book This Facility
            </h3>

            <form onSubmit={handleBooking} className="space-y-5">
              {/* Facility Name (Read-only) */}
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-1">
                  Facility Name
                </label>
                <input
                  type="text"
                  value={facility.name}
                  disabled
                  className="w-full px-4 py-2.5 border-2 border-blue-200 rounded-lg bg-gray-50 text-gray-700 text-sm"
                />
              </div>

              {/* Booking Date */}
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-1">
                  Booking Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={bookingData.booking_date}
                  onChange={(e) => setBookingData({ ...bookingData, booking_date: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-2.5 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-blue-500 text-sm transition"
                  required
                />
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-1">
                  Time Slot <span className="text-red-500">*</span>
                </label>
                <select
                  value={bookingData.time_slot}
                  onChange={(e) => setBookingData({ ...bookingData, time_slot: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-blue-500 text-sm transition bg-white"
                  required
                >
                  <option value="">Select a time slot</option>
                  {facility.available_slots?.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hours */}
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-1">
                  Hours <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={bookingData.hours}
                    onChange={handleHoursChange}
                    className="flex-1 px-4 py-2.5 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-blue-500 text-sm transition"
                    required
                  />
                  <FaHourglassHalf className="text-blue-600 text-xl" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Maximum 8 hours per booking</p>
              </div>

              {/* Total Price */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border-2 border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-900">Total Price:</span>
                  <span className="text-2xl font-bold text-blue-700">
                    ৳{bookingData.total_price}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  ৳{facility.price_per_hour} × {bookingData.hours} hour{bookingData.hours > 1 ? "s" : ""}
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}