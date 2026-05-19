"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaUsers, FaRupeeSign, FaCalendarCheck } from "react-icons/fa";

export default function AllFacilities() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const router = useRouter();

  useEffect(() => {
    fetchFacilities();
  }, [search, filterType]);

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (filterType !== "All") params.type = filterType;

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities`,
        { params }
      );
      setFacilities(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load facilities",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (id) => {
    const token = document.cookie.includes("token=");
    
    if (!token) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to book this facility",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2563eb",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
      return;
    }

    router.push(`/facility/${id}`);
  };

  const sportTypes = [
    "All",
    "Football",
    "Badminton",
    "Cricket",
    "Tennis",
    "Swimming",
    "Basketball",
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">
            All Facilities
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        {/* Search & Filter - Blue/Cyan Theme */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8 border-t-4 border-blue-600">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="🔍 Search by facility name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-blue-500 outline-none transition text-sm"
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-6 py-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-blue-500 outline-none transition bg-white text-sm"
            >
              {sportTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "All" ? "🏆 All Sports" : type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.length > 0 ? (
            facilities.map((facility) => (
              <div
                key={facility._id}
                onClick={() => router.push(`/facility/${facility._id}`)} // ✅ কার্ডে ক্লিক করলে ডিটেইলস পেজে যাবে
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-t-4 border-cyan-400 flex flex-col h-full cursor-pointer" // ✅ cursor-pointer যোগ করা হলো
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {facility.facility_type}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-blue-900 mb-3 line-clamp-1">
                    {facility.name}
                  </h3>

                  <div className="space-y-2 text-gray-700 text-sm mb-4">
                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-blue-600" />{" "}
                      {facility.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaUsers className="text-blue-600" /> Capacity:{" "}
                      {facility.capacity}
                    </p>
                    <p className="flex items-center gap-2 font-bold text-blue-700">
                      <FaRupeeSign /> ৳{facility.price_per_hour}/hour
                    </p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // ✅ বাটনে ক্লিক করলে কার্ডের onClick ট্রিগার হবে না
                        handleBookNow(facility._id);
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      <FaCalendarCheck /> Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-600 text-lg">
                😕 No facilities found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}