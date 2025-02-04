import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, User, ChevronDown, LogOut, Sparkles, Menu, LogIn } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import { logout } from '../utils/logout';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const isHomePage = location.pathname === '/';
  const isDashboardPage = location.pathname === '/dashboard';
  const isLoginPage = location.pathname === '/login';
  const isSignUpPage = location.pathname === '/signup';

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
        <div className="flex items-center justify-between md:justify-between">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-purple-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo - Centered on mobile */}
          <Link
            to="/"
            className="flex items-center space-x-2 group text-white hover:text-purple-400 transition-colors absolute left-1/2 -translate-x-1/2 md:static md:transform-none"
          >
            <Sparkles className="w-6 h-6 text-purple-400 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-lg font-bold">Slayrs</span>
          </Link>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Conditional Home Icon */}
            {!isHomePage && !isDashboardPage && !isLoginPage && !isSignUpPage && (
              <Link
                to="/dashboard"
                className="hidden md:flex items-center space-x-1 group text-white hover:text-purple-400 transition-colors"
              >
                <Home className="w-6 h-6" />
                <span className="text-lg">Home</span>
              </Link>
            )}

            {/* Sign In Button or Profile Menu */}
            {isHomePage && !loggedIn ? (
              <Link
                to="/login"
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
              >
                Sign In
              </Link>
            ) : (
              loggedIn && (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="p-2 text-white hover:text-purple-400 transition-colors flex items-center space-x-1"
                    aria-label="Profile menu"
                  >
                    <User className="w-6 h-6" />
                    <ChevronDown className="w-4 h-4" />
                  </button>

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
                      <button
                        className="dropdown-item flex items-center space-x-2 p-3 w-full text-left hover:bg-purple-500/10 transition"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              {!isHomePage && !isDashboardPage && !isLoginPage && !isSignUpPage && (
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="w-6 h-6" />
                  <span>Home</span>
                </Link>
              )}
              {loggedIn && (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-6 h-6" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors"
                  >
                    <LogOut className="w-6 h-6" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;