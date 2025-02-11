import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, ChevronDown, LogOut, Sparkles, Menu, LogIn } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import { logout } from '../utils/logout';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const isPublicPage = ['/', '/login', '/signup'].includes(location.pathname);

  const isTokenValid = (token: string) => {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenValid(token)) {
      setLoggedIn(true);
    } else {
      localStorage.removeItem('token');
      setLoggedIn(false);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    logout(navigate, setLoggedIn);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-neutral-900/95 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between md:justify-between relative">
          {/* Mobile Menu Button - Hidden on public pages */}
          {!isPublicPage && (
            <button
              className="md:hidden p-2 text-white hover:text-purple-400 absolute left-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          {/* Centered Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Sparkles className="w-8 h-8 text-purple-400" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Slayrs
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation - Hidden on public pages */}
          {!isPublicPage && (
            <div className="hidden md:flex items-center space-x-6 absolute right-0">
              {loggedIn && (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 text-white hover:text-purple-400"
                  >
                    <User className="w-5 h-5" />
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-neutral-800 rounded-lg shadow-lg py-2">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-white hover:bg-purple-500/20"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-white hover:bg-purple-500/20 flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu - Hidden on public pages */}
        {!isPublicPage && isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {loggedIn && (
              <div className="space-y-4">
                <Link
                  to="/profile"
                  className="block text-white hover:text-purple-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-white hover:text-purple-400 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
