export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-green-800 via-blue-900 to-green-800 text-white mt-20">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Contact Information */}
          <div>
            <h4 className="text-lg font-bold text-yellow-400 mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>Av. Paulista, 1000<br/>São Paulo, Brazil</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📧</span>
                <a href="mailto:info@sportnest.com" className="hover:text-yellow-400 transition">
                  info@sportnest.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span>
                <span>+55 11 98765-4321</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Social Links */}
          <div>
            <h4 className="text-lg font-bold text-yellow-400 mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-full flex items-center justify-center transition"
                aria-label="Facebook"
              >
                📘
              </a>
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-pink-600 rounded-full flex items-center justify-center transition"
                aria-label="Instagram"
              >
                📸
              </a>
              {/* X (New Logo - Requirement) */}
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-black rounded-full flex items-center justify-center transition"
                aria-label="X"
              >
                𝕏
              </a>
              {/* YouTube */}
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition"
                aria-label="YouTube"
              >
                📺
              </a>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-yellow-400 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-yellow-400 transition">🏠 Home</a>
              </li>
              <li>
                <a href="/facilities" className="hover:text-yellow-400 transition">⚽ All Facilities</a>
              </li>
              <li>
                <a href="/login" className="hover:text-yellow-400 transition">🔐 Login</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-white/70">
          <p>
            © {currentYear} SportNest. All rights reserved. 
            Made with ❤️ in Brazil 🇧
          </p>
        </div>
      </div>

      {/* Brazilian Flag Bottom Stripe */}
      <div className="h-2 bg-gradient-to-r from-green-600 via-yellow-400 to-blue-700"></div>
    </footer>
  );
}