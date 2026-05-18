"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = null; //  authentication 

  return (
    <nav className="bg-linear-to-r from-green-600 via-yellow-400 to-blue-700 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo with Brazilian Style */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Brazilian Flag Inspired Logo */}
              <div className="w-12 h-12 bg-green-600 rounded-full border-4 border-yellow-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-yellow-400 text-lg font-bold">⚽</span>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white drop-shadow-lg tracking-wide">
                Sport<span className="text-yellow-300">Nest</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link 
              href="/" 
              className="text-white font-semibold hover:text-yellow-300 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/20 backdrop-blur-sm"
            >
              🏠 Home
            </Link>
            <Link 
              href="/facilities" 
              className="text-white font-semibold hover:text-yellow-300 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/20 backdrop-blur-sm"
            >
              ⚽ All Facilities
            </Link>
            
            {user ? (
              <>
                <Link href="/my-bookings" className="text-white font-semibold hover:text-yellow-300 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/20">
                  📅 My Bookings
                </Link>
                <Link href="/add-facility" className="text-white font-semibold hover:text-yellow-300 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/20">
                  ➕ Add Facility
                </Link>
                <Link href="/manage-facilities" className="text-white font-semibold hover:text-yellow-300 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/20">
                  ⚙️ Manage
                </Link>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  🚪 Logout
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                className="bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-bold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 border-2 border-white/30"
              >
                ⚽ Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/20 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-6 space-y-4 bg-linear-to-b from-green-700/50 to-blue-800/50 rounded-xl mt-2 backdrop-blur-md border border-white/20">
            <Link 
              href="/" 
              className="block text-white font-semibold hover:text-yellow-300 px-6 py-3 hover:bg-white/10 rounded-lg transition"
              onClick={() => setMenuOpen(false)}
            >
              🏠 Home
            </Link>
            <Link 
              href="/facilities" 
              className="block text-white font-semibold hover:text-yellow-300 px-6 py-3 hover:bg-white/10 rounded-lg transition"
              onClick={() => setMenuOpen(false)}
            >
              ⚽ All Facilities
            </Link>
            {!user && (
              <Link 
                href="/login" 
                className="block bg-linear-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold px-6 py-3 rounded-full mx-6 text-center shadow-lg"
                onClick={() => setMenuOpen(false)}
              >
                ⚽ Login
              </Link>
            )}
          </div>
        )}
      </div>
      
      {/* Brazilian Flag Stripes Decoration */}
      <div className="h-2 bg-linear-to-r from-green-600 via-yellow-400 to-blue-700"></div>
    </nav>
  );
}