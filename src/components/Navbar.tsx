import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, ChevronDown, LogOut, Settings, Sparkles } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Check if the current route is home
  const isHomePage = location.pathname === '/';
  const isDashboardPage = location.pathname === '/dashboard';

  return (
    <nav className="fixed w-full z-50 bg-neutral-900/95 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group text-white hover:text-purple-400 transition-colors"
          >
            <Sparkles className="w-6 h-6 text-purple-400 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-lg font-bold">LuxeStyle AI</span>
          </Link>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Conditional Home Icon */}
            {!isHomePage && !isDashboardPage && (
              <Link
                to="/dashboard"
                className="flex items-center space-x-1 group text-white hover:text-purple-400 transition-colors"
              >
                <Home className="w-6 h-6" />
                <span className="text-lg"> Home</span>
              </Link>
            )}

            {/* Conditional Sign In Button for Home Page */}
            {isHomePage ? (
              <Link
                to="/login"
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
              >
                Sign In
              </Link>
            ) : (
              /* Profile Menu */
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
                  <div className="absolute right-0 mt-2 w-48 bg-neutral-900/95 shadow-lg rounded-lg border border-white/10">
                    <Link
                      to="/profile"
                      className="dropdown-item flex items-center space-x-2 p-3 hover:bg-purple-500/10 transition"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    {/* <Link
                      to="/settings"
                      className="dropdown-item flex items-center space-x-2 p-3 hover:bg-purple-500/10 transition"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link> */}
                    <button
                      className="dropdown-item flex items-center space-x-2 p-3 w-full text-left hover:bg-purple-500/10 transition"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
