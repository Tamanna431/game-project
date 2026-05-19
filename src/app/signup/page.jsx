"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Common Input Style for Uniformity
  const inputStyle = "w-full px-4 py-3.5 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-blue-600 outline-none transition text-gray-700 bg-white";
  
  // Common Button Style for Uniformity
  const btnStyle = "w-full flex items-center justify-center gap-3 font-bold py-3.5 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-0.5";

  const validatePassword = (pwd) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      return Swal.fire({
        background: "#ffffff", // ✅ White Popup
        icon: "warning",
        title: "Weak Password",
        text: "Password must have 1 uppercase, 1 lowercase, and be min 6 chars.",
        confirmButtonColor: "#2563eb",
        customClass: { popup: 'rounded-xl' }
      });
    }

    setLoading(true);

    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/login",
    });

    setLoading(false);
    // SweetAlert কনফিগারেশন পরিবর্তন:

if (error) {
  Swal.fire({
    background: "linear-gradient(135deg, #1e3a8a 0%, #0891b2 100%)", // ✅ Blue Gradient
    color: "#ffffff",
    icon: "error",
    iconColor: "#fca5a5",
    title: "Sign Up Failed",
    text: error.message || "Email already exists.",
    confirmButtonColor: "#2563eb",
    customClass: { popup: 'rounded-xl' }
  });
} else {
  Swal.fire({
    background: "linear-gradient(135deg, #1e3a8a 0%, #0891b2 100%)", // ✅ Blue Gradient
    color: "#ffffff",
    icon: "success",
    iconColor: "#86efac",
    title: "Account Created!",
    text: "Please login now.",
    confirmButtonColor: "#2563eb",
    customClass: { popup: 'rounded-xl' }
  }).then(() => {
    window.location.href = "/login";
  });
}

};
  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 px-4">
      {/* Card Container */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-cyan-500">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Join SportNest & book your favorite venues
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* 1. Name Input */}
          <div>
            <label className=" block text-sm font-semibold text-blue-900 mb-1.5">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputStyle} // ✅ Same Style
              placeholder="John Doe"
              required
            />
          </div>

          {/* 2. Email Input */}
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputStyle} // ✅ Same Style
              placeholder="you@example.com"
              required
            />
          </div>

          {/* 3. Password Input */}
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputStyle} // ✅ Same Style
              placeholder="••••••••"
              required
            />
            <p className="text-xs text-gray-500 mt-1.5">
              Min 6 chars, 1 uppercase (A-Z), 1 lowercase (a-z)
            </p>
          </div>

          {/* ✅ Uniform Sign Up Button */}
          <button
            type="submit"
            disabled={loading}
            className={`${btnStyle} bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? "Creating..." : "Sign Up"}
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

        {/* ✅ Uniform Google Button (Same height/padding, just different color) */}
        <button
          onClick={handleGoogleSignUp}
          className={`${btnStyle} bg-white border-2 border-blue-200 text-blue-800 hover:bg-blue-50`}
        >
          <FaGoogle className="text-blue-500 text-xl" />
          Sign up with Google
        </button>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}