"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";

export default function AddFacility() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    facility_type: "",
    image: "",
    location: "",
    price_per_hour: "",
    capacity: "",
    available_slots: "",
    description: "",
    owner_email: "user@example.com",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imgbbFormData = new FormData();
    imgbbFormData.append("image", file);

    setImageLoading(true);
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        imgbbFormData
      );

      if (response.data.success) {
        setFormData({
          ...formData,
          image: response.data.data.display_url,
        });
        Swal.fire({
          icon: "success",
          title: "✅ Image Uploaded!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "❌ Upload Failed",
        text: "Failed to upload image.",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.image) {
      Swal.fire({
        icon: "warning",
        title: "⚠️ Image Required",
        text: "Please upload an image first",
        confirmButtonColor: "#2563eb",
      });
      setLoading(false);
      return;
    }

    try {
      const facilityData = {
        ...formData,
        price_per_hour: parseFloat(formData.price_per_hour),
        capacity: parseInt(formData.capacity),
        available_slots: formData.available_slots
          .split(",")
          .map((slot) => slot.trim())
          .filter((slot) => slot !== ""),
        booking_count: 0,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities`,
        facilityData,
        { withCredentials: true }
      );

      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "🎉 Success!",
          text: "Facility added successfully!",
          confirmButtonColor: "#2563eb",
        });
        router.push("/manage-facilities");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "❌ Error!",
        text: "Failed to add facility.",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">
             Add New Facility
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full mt-2"></div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-xl border-t-4 border-blue-600 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: Name & Type */}
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
                  placeholder="e.g. Premium Football Turf"
                  className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-blue-500 text-sm transition"
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
                  className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-blue-500 text-sm transition bg-white"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Football">⚽ Football</option>
                  <option value="Badminton">🏸 Badminton</option>
                  <option value="Cricket">🏏 Cricket</option>
                  <option value="Tennis">🎾 Tennis</option>
                  <option value="Swimming">🏊 Swimming</option>
                  <option value="Basketball">🏀 Basketball</option>
                </select>
              </div>
            </div>

            {/* Row 2: Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-1">
                Facility Image *
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-1 px-3 py-2 border-2 border-blue-200 rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
                  disabled={imageLoading}
                />
                {imageLoading && (
                  <span className="text-xs text-cyan-600 font-medium">
                    ⏳ Uploading...
                  </span>
                )}
              </div>
              {formData.image && (
                <div className="mt-2 relative">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-32 h-20 object-cover rounded-lg border-2 border-blue-500 shadow-md"
                  />
                  <div className="absolute -top-2 -right-2 bg-cyan-400 text-blue-900 text-xs font-bold px-2 py-1 rounded-full">
                    ✓
                  </div>
                </div>
              )}
            </div>

            {/* Row 3: Location & Price */}
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
                  placeholder="📍 e.g. Dhaka"
                  className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-blue-500 text-sm transition"
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
                  placeholder="💰 500"
                  min="0"
                  className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-blue-500 text-sm transition"
                  required
                />
              </div>
            </div>

            {/* Row 4: Capacity & Slots */}
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
                  placeholder="👥 20"
                  min="1"
                  className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-blue-500 text-sm transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-1">
                  Time Slots *
                </label>
                <input
                  type="text"
                  name="available_slots"
                  value={formData.available_slots}
                  onChange={handleChange}
                  placeholder="⏰ 9AM-11AM, 2PM-4PM"
                  className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-blue-500 text-sm transition"
                  required
                />
              </div>
            </div>

            {/* Row 5: Description */}
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="📝 Tell about your facility..."
                rows="3"
                className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-blue-500 text-sm resize-none transition"
                required
              />
            </div>

            {/* Submit Button - Navbar Style */}
            <button
              type="submit"
              disabled={loading || imageLoading}
              className={`w-full py-3 px-4 rounded-lg font-bold text-white text-sm transition-all shadow-lg ${
                loading || imageLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transform hover:-translate-y-0.5 hover:shadow-xl"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Adding...
                </span>
              ) : (
                "🎯 Add Facility"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}