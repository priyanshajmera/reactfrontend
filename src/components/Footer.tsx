import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Instagram, Twitter, Facebook, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900/80 border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-bold text-white">LuxeStyle AI</span>
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

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-white/60 text-sm mb-4">
              Subscribe to our newsletter for style tips and updates.
            </p>
            <form className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input-glass w-full pl-10 pr-4 py-2"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/60 text-sm">
          <p>© {currentYear} LuxeStyle AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;