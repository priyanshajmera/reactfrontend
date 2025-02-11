import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Instagram, Twitter, Facebook, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Check if the app is running in a mobile environment
  const isMobileApp = window.matchMedia('(max-width: 768px)').matches && 
                     (window.Capacitor?.isNative || window.Capacitor?.platform !== 'web');

  // Don't render footer in mobile app
  if (isMobileApp) {
    return null;
  }

  return (
    <footer className="bg-neutral-900/80 border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-bold text-white">Slayrs</span>
            </Link>
            <p className="text-white/60 text-sm">
              Revolutionizing personal style with AI-powered fashion recommendations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-purple-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-purple-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-purple-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-purple-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/wardrobe" className="text-white/60 hover:text-purple-400 transition-colors text-sm">
                  My Wardrobe
                </Link>
              </li>
              <li>
                <Link to="/generate" className="text-white/60 hover:text-purple-400 transition-colors text-sm">
                  Generate Outfit
                </Link>
              </li>
              <li>
                <Link to="/ootd" className="text-white/60 hover:text-purple-400 transition-colors text-sm">
                  Outfit of the Day
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-white/60 hover:text-purple-400 transition-colors text-sm">
                  Upload Items
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-white/60 hover:text-purple-400 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/60 hover:text-purple-400 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/60 hover:text-purple-400 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/60 hover:text-purple-400 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <div className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 text-white/60 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
              />
              <button
                className="bg-purple-400 hover:bg-purple-500 text-white p-2 rounded-lg transition-colors"
                aria-label="Subscribe to newsletter"
              >
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/60 text-sm">
          <p>© {currentYear} Slayrs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
