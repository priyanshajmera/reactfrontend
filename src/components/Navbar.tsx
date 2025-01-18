import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, User, LogOut, Settings, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  return (
    <nav className="fixed w-full z-50 bg-neutral-900/95 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between lg:justify-start">
          {/* Mobile menu button - Left */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-purple-400 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo - Center on mobile, left on desktop */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group lg:ml-0 mx-auto lg:mr-8"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="relative">
              <Sparkles className="w-6 h-6 text-purple-400 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="text-lg font-bold text-white">
              LuxeStyle AI
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-8 flex-grow">
            <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'text-purple-400' : 'text-white/80'}`}>
              Dashboard
            </Link>
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
          </div>

          {/* Profile Menu - Right */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="p-2 text-white hover:text-purple-400 transition-colors flex items-center space-x-1"
              aria-label="Profile menu"
            >
              <User className="w-6 h-6" />
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="dropdown-menu">
                <Link 
                  to="/profile" 
                  className="dropdown-item flex items-center space-x-2"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <Link 
                  to="/settings" 
                  className="dropdown-item flex items-center space-x-2"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
                <button 
                  className="dropdown-item flex items-center space-x-2 w-full text-left"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div 
          className={`
            lg:hidden fixed inset-x-0 top-[57px] bg-neutral-900/95 backdrop-blur-md border-b border-white/10
            transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
          `}
        >
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-3">
            <Link 
              to="/dashboard" 
              className={`py-3 px-4 rounded-lg ${location.pathname === '/dashboard' ? 'bg-purple-500/20 text-purple-400' : 'text-white/80'} hover:bg-purple-500/10 transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
