"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Common Input Style
  const inputStyle = "w-full px-4 py-3.5 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-blue-600 outline-none transition text-gray-700 bg-white";
  
  // Common Button Style
  const btnStyle = "w-full flex items-center justify-center gap-3 font-bold py-3.5 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-0.5";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      Swal.fire({
        background: "linear-gradient(135deg, #1e3a8a 0%, #0891b2 100%)", // ✅ Blue Gradient
        color: "#ffffff", // White text
        icon: "error",
        iconColor: "#fca5a5",
        title: "Login Failed",
        text: error.message || "Invalid email or password.",
        confirmButtonColor: "#2563eb",
        confirmButtonText: "Try Again",
        customClass: { 
          popup: 'rounded-xl',
          title: 'font-bold'
        }
      });
    } else {
      Swal.fire({
        background: "linear-gradient(135deg, #1e3a8a 0%, #0891b2 100%)", // ✅ Blue Gradient
        color: "#ffffff", // White text
        icon: "success",
        iconColor: "#86efac",
        title: "Welcome Back!",
        text: "Login successful.",
        timer: 1500,
        showConfirmButton: false,
        customClass: { 
          popup: 'rounded-xl',
          title: 'font-bold'
        }
      }).then(() => {
        window.location.href = "/";
      });
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-cyan-500">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Sign in to manage your bookings
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputStyle}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputStyle}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`${btnStyle} bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className={`${btnStyle} bg-white border-2 border-blue-200 text-blue-800 hover:bg-blue-50`}
        >
          <FaGoogle className="text-red-500 text-xl" />
          Sign in with Google
        </button>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}