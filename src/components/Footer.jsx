import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-xl px-4 py-2 rounded-lg inline-block mb-4">
              SportNest
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your one-stop platform for booking premium sports facilities. 
              Play, compete, and enjoy with the best venues in town.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-cyan-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-cyan-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/all-facilities" className="text-gray-300 hover:text-cyan-400 transition">
                  All Facilities
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="text-gray-300 hover:text-cyan-400 transition">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link href="/add-facility" className="text-gray-300 hover:text-cyan-400 transition">
                  Add Facility
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-cyan-400">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-cyan-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  123 Sports Avenue, Dhaka 1200, Bangladesh
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-cyan-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+880 1234-567890</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-cyan-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@sportnest.com</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-cyan-400">Follow Us</h3>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 hover:bg-blue-800 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} SportNest. All rights reserved. 
            Designed with ❤️ for sports enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  );
}