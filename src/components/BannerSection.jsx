"use client";
import Link from "next/link";

export default function BannerSection() {
  return (
    <section className="relative overflow-hidden min-h-[500px] flex items-center bg-gradient-to-br from-sky-900 via-blue-900 to-cyan-900">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
        style={{ backgroundImage: "url('/bg.png')" }}
      ></div>
      
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-300/90 via-blue-400/80 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* ========== Left Side: Content ========== */}
          <div className="text-center lg:text-left space-y-6 lg:pr-8">
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
              Play Like a <span className="text-cyan-400 drop-shadow-lg">Champion</span>
            </h1>
            
            {/* Short Description */}
            <p className="text-base md:text-lg text-blue-100 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Book premium football turfs, badminton courts, and swimming pools instantly. 
              Experience the passion of sports with our easy reservation system.
            </p>
            
            {/* Explore Facilities Button */}
            <div className="pt-4">
              <Link 
                href="/all-facilities" 
                className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-2xl hover:shadow-cyan-500/30 transform hover:-translate-y-1 text-center"
              >
                Explore Facilities 
              </Link>
            </div>
          </div>

          {/* ========== Right Side: Neymar Only ========== */}
          <div className="relative flex justify-center items-end">
            {/* Glow Effect behind Neymar */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-3xl"></div>
            
            <img 
              src="/neymar.png" 
              alt="Neymar Jr" 
              className="relative w-[420px] lg:w-[520px] drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>

        </div>
      </div>
    </section>
  );
}