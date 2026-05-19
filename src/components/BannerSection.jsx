"use client";
import Link from "next/link";

export default function BannerSection() {
  return (
    <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-blue-900 overflow-hidden min-h-[800px] flex items-center">
      
      {/* Full Background Image - Stadium */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/stadium-bg.jpg')" }}
      ></div>
      
      {/* Dark Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-950/95 via-green-900/90 to-blue-950/80"></div>
      
      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-green-950 via-green-900/80 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* ========== Left Side: Content ========== */}
          <div className="text-center lg:text-left space-y-6 lg:pr-8">
            <span className="inline-block px-6 py-2.5 rounded-full bg-yellow-400/25 text-yellow-300 text-sm font-bold tracking-wider border-2 border-yellow-400/50 backdrop-blur-sm shadow-lg">
              WELCOME TO SPORTNEST 🇧🇷
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
              Play Like a <span className="text-yellow-400 drop-shadow-lg">Champion</span>
            </h1>
            
            <p className="text-base md:text-lg text-gray-200 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Book premium football turfs, badminton courts, and swimming pools instantly. 
              Experience the passion of sports with our easy reservation system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link 
                href="/all-facilities" 
                className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-blue-900 font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-2xl hover:shadow-yellow-400/40 transform hover:-translate-y-1 block text-center"
              >
                Explore Facilities ⚽
              </Link>
              
              <Link 
                href="/login" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 border-2 border-white/50 hover:border-white block text-center"
              >
                Sign In
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20 mt-8">
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-yellow-400">500+</p>
                <p className="text-sm text-gray-300 mt-1">Facilities</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-yellow-400">10k+</p>
                <p className="text-sm text-gray-300 mt-1">Bookings</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-yellow-400">5k+</p>
                <p className="text-sm text-gray-300 mt-1">Users</p>
              </div>
            </div>
          </div>

          {/* ========== Right Side: Two Players ========== */}
          <div className="relative flex justify-center items-end min-h-[600px] lg:min-h-[650px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-br from-yellow-400/25 to-green-400/25 rounded-full blur-3xl animate-pulse"></div>

            {/* Players Container */}
            <div className="relative w-full max-w-3xl h-[550px] flex items-end justify-center gap-2 lg:gap-4">
              
              {/* Player 1: Neymar (Left) */}
              <div className="relative w-48 sm:w-56 lg:w-64 h-[500px] z-20 transform hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-green-950/70 via-transparent to-transparent rounded-t-3xl"></div>
                <img src="/neymar.png" alt="Neymar Jr" className="w-full h-full object-cover object-top rounded-t-3xl shadow-2xl" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400 rounded-b-3xl"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-yellow-400/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-xl border-2 border-yellow-300">
                  <p className="text-sm font-bold text-green-900">🇧 Neymar Jr</p>
                  <p className="text-xs text-gray-800 font-semibold">Forward • Brazil</p>
                </div>
              </div>

              {/* ✅ FIX: Player 2 Wrapper Added Here */}
              <div className="relative w-48 sm:w-56 lg:w-64 h-[500px] z-10 transform hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-transparent to-transparent rounded-t-3xl"></div>
                <img src="/striker.png" alt="Striker Player" className="w-full h-full object-cover object-top rounded-t-3xl shadow-2xl" />
                
                {/* Blue Border Bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400 rounded-b-3xl"></div>
                
                {/* Player Info Badge */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-xl border-2 border-gray-200">
                  <p className="text-sm font-bold text-blue-700">⚽ Striker</p>
                  <p className="text-xs text-gray-600 font-semibold">Forward</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      
      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
        <svg className="relative block w-full h-16 sm:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f9fafb"></path>
        </svg>
      </div>
    </section>
  );
}