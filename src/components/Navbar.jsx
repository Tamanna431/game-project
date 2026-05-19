"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFootballBall, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = document.cookie.includes("token=");
    const userData = localStorage.getItem("user");
    setIsLoggedIn(token);
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Facilities", href: "/all-facilities" },
  ];

  const privateLinks = [
    { name: "My Bookings", href: "/my-bookings" },
    { name: "Add Facility", href: "/add-facility" },
    { name: "Manage Facilities", href: "/manage-facilities" },
  ];

  return (
    <nav className="bg-gradient-to-r from-sky-200 via-blue-100 to-cyan-100 shadow-md sticky top-0 z-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo with Icon */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xl px-5 py-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-0.5">
              <FaFootballBall className="text-2xl" />
              <span>SportNest</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                  pathname === link.href
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {isLoggedIn ? (
              <>
                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-100 transition-all duration-300"
                  >
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-blue-600 shadow-md"
                      />
                    ) : (
                      <FaUserCircle className="text-3xl text-blue-600" />
                    )}
                    <span className="text-gray-700 font-medium">
                      {user?.name || "User"}
                    </span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-blue-100 py-2 z-50">
                      {privateLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                          onClick={() => setDropdownOpen(false)}
                        >
                          {link.name}
                        </Link>
                      ))}
                      <hr className="my-2 border-blue-100" />
                      <button
                        onClick={() => {
                          localStorage.removeItem("user");
                          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                          window.location.href = "/";
                        }}
                        className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 transition font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3 ml-4">
                <Link
                  href="/signup"
                  className="px-6 py-2.5 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-blue-600 hover:bg-blue-100 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-100">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2.5 rounded-lg ${
                    pathname === link.href
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-100"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {isLoggedIn ? (
                <>
                  {privateLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-4 py-2.5 text-gray-700 hover:bg-blue-100 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      localStorage.removeItem("user");
                      window.location.href = "/";
                    }}
                    className="px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg text-left font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 px-4 mt-2">
                  <Link
                    href="/signup"
                    className="w-full border-2 border-blue-600 text-blue-600 font-semibold px-6 py-2.5 rounded-lg text-center hover:bg-blue-600 hover:text-white transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/login"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold px-6 py-2.5 rounded-lg text-center shadow-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}