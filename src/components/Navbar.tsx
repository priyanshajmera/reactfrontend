import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="fixed w-full z-50 bg-neutral-900/95 border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="relative">
              <Sparkles className="w-6 h-6 text-purple-400 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="text-lg font-bold text-white">
              LuxeStyle AI
            </span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-purple-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/upload" className={`nav-link ${location.pathname === '/upload' ? 'text-purple-400' : 'text-white/80'}`}>
              Upload
            </Link>
            <Link to="/wardrobe" className={`nav-link ${location.pathname === '/wardrobe' ? 'text-purple-400' : 'text-white/80'}`}>
              Wardrobe
            </Link>
            <Link to="/generate" className={`nav-link ${location.pathname === '/generate' ? 'text-purple-400' : 'text-white/80'}`}>
              Generate
            </Link>
            <Link to="/ootd" className={`nav-link ${location.pathname === '/ootd' ? 'text-purple-400' : 'text-white/80'}`}>
              OOTD
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-white/80 hover:text-purple-400 transition-colors">
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`
            lg:hidden fixed inset-x-0 top-[57px] bg-neutral-900/95 border-b border-white/10
            transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
          `}
        >
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-3">
            <Link 
              to="/upload" 
              className={`py-3 px-4 rounded-lg ${location.pathname === '/upload' ? 'bg-purple-500/20 text-purple-400' : 'text-white/80'} hover:bg-purple-500/10 transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              Upload
            </Link>
            <Link 
              to="/wardrobe" 
              className={`py-3 px-4 rounded-lg ${location.pathname === '/wardrobe' ? 'bg-purple-500/20 text-purple-400' : 'text-white/80'} hover:bg-purple-500/10 transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              Wardrobe
            </Link>
            <Link 
              to="/generate" 
              className={`py-3 px-4 rounded-lg ${location.pathname === '/generate' ? 'bg-purple-500/20 text-purple-400' : 'text-white/80'} hover:bg-purple-500/10 transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              Generate
            </Link>
            <Link 
              to="/ootd" 
              className={`py-3 px-4 rounded-lg ${location.pathname === '/ootd' ? 'bg-purple-500/20 text-purple-400' : 'text-white/80'} hover:bg-purple-500/10 transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              OOTD
            </Link>
            <div className="pt-3 border-t border-white/10 space-y-3">
              <Link 
                to="/login" 
                className="block py-3 px-4 rounded-lg text-white/80 hover:bg-purple-500/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="block py-3 px-4 rounded-lg bg-purple-500 hover:bg-purple-600 text-white text-center transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;