"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaMapMarkerAlt, FaRupeeSign, FaUsers } from "react-icons/fa";

export default function ManageFacilities() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingFacility, setEditingFacility] = useState(null);
  const [formData, setFormData] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetchMyFacilities();
  }, []);

  const fetchMyFacilities = async () => {
    try {
      // Get user email from cookie or localStorage
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-facilities?email=${userData.email}`,
        { withCredentials: true }
      );
      setFacilities(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load your facilities",
        confirmButtonColor: "#2563eb"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, facilityName) => {
    const result = await Swal.fire({
      title: "Delete Facility?",
      text: `Are you sure you want to delete "${facilityName}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${id}`,
          { withCredentials: true }
        );

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your facility has been deleted.",
          confirmButtonColor: "#2563eb"
        });

        setFacilities(facilities.filter(f => f._id !== id));
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete facility",
          confirmButtonColor: "#2563eb"
        });
      }
    }
  };

  const handleEdit = (facility) => {
    setEditingFacility(facility._id);
    setFormData({
      name: facility.name,
      facility_type: facility.facility_type,
      image: facility.image,
      location: facility.location,
      price_per_hour: facility.price_per_hour,
      capacity: facility.capacity,
      available_slots: facility.available_slots?.join(", "),
      description: facility.description
    });
  };

  const handleCancelEdit = () => {
    setEditingFacility(null);
    setFormData({});
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (id) => {
    try {
      const updatedData = {
        ...formData,
        price_per_hour: parseFloat(formData.price_per_hour),
        capacity: parseInt(formData.capacity),
        available_slots: formData.available_slots
          .split(",")
          .map(s => s.trim())
          .filter(s => s !== "")
      };

      await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${id}`,
        updatedData,
        { withCredentials: true }
      );

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Facility updated successfully",
        confirmButtonColor: "#2563eb"
      });

      setEditingFacility(null);
      fetchMyFacilities();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update facility",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">
            Manage My Facilities
          </h1>
          <div className="w-48 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        {/* Facilities List */}
        {facilities.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {facilities.map((facility) => (
              <div
                key={facility._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-blue-600 hover:shadow-xl transition-all duration-300"
              >
                {/* Edit Mode */}
                {editingFacility === facility._id ? (
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">
                      Edit Facility
                    </h3>
                    
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-blue-900 mb-1">
                            Facility Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-blue-500 text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-blue-900 mb-1">
                            Type *
                          </label>
                          <select
                            name="facility_type"
                            value={formData.facility_type}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-blue-500 text-sm bg-white"
                            required
                          >
                            <option value="Football">⚽ Football</option>
                            <option value="Badminton">🏸 Badminton</option>
                            <option value="Cricket">🏏 Cricket</option>
                            <option value="Tennis">🎾 Tennis</option>
                            <option value="Swimming">🏊 Swimming</option>
                            <option value="Basketball">🏀 Basketball</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-blue-900 mb-1">
                          Image URL *
                        </label>
                        <input
                          type="url"
                          name="image"
                          value={formData.image}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-blue-500 text-sm"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-blue-900 mb-1">
                            Location *
                          </label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-blue-500 text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-blue-900 mb-1">
                            Price/Hour (৳) *
                          </label>
                          <input
                            type="number"
                            name="price_per_hour"
                            value={formData.price_per_hour}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-blue-500 text-sm"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-blue-900 mb-1">
                            Capacity *
                          </label>
                          <input
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-blue-500 text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-blue-900 mb-1">
                            Time Slots (comma separated) *
                          </label>
                          <input
                            type="text"
                            name="available_slots"
                            value={formData.available_slots}
                            onChange={handleChange}
                            placeholder="9AM-11AM, 2PM-4PM"
                            className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-blue-500 text-sm"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-blue-900 mb-1">
                          Description *
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows="3"
                          className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-blue-500 text-sm resize-none"
                          required
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => handleUpdate(facility._id)}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2.5 rounded-lg transition shadow-md"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 rounded-lg transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  /* View Mode */
                  <>
                    <img
                      src={facility.image}
                      alt={facility.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-blue-900">
                          {facility.name}
                        </h3>
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          {facility.facility_type}
                        </span>
                      </div>

                      <div className="space-y-2 text-gray-700 text-sm mb-4">
                        <p className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-blue-600" />
                          {facility.location}
                        </p>
                        <p className="flex items-center gap-2">
                          <FaUsers className="text-blue-600" />
                          Capacity: {facility.capacity}
                        </p>
                        <p className="flex items-center gap-2 font-bold text-blue-700">
                          <FaRupeeSign /> ৳{facility.price_per_hour}/hour
                        </p>
                        <p className="text-gray-600">
                          📊 Bookings: <strong>{facility.booking_count}</strong>
                        </p>
                      </div>

                      <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                        {facility.description}
                      </p>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(facility)}
                          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2.5 rounded-lg transition shadow-md hover:shadow-lg"
                        >
                          <FaEdit /> Update
                        </button>
                        <button
                          onClick={() => handleDelete(facility._id, facility.name)}
                          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold py-2.5 rounded-lg transition shadow-md hover:shadow-lg"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🏟️</div>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">
              No Facilities Added Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start by adding your first sports facility!
            </p>
            <button
              onClick={() => router.push("/add-facility")}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Add Your First Facility
            </button>
          </div>
        )}
      </div>
    </div>
  );
}