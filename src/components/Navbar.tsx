import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, User, ChevronDown, LogOut, Sparkles } from 'lucide-react';
import {jwtDecode} from 'jwt-decode'; // Install this library using npm install jwt-decode

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // State to check if user is logged in
  const [loggedIn, setLoggedIn] = useState(false);

  // Check if the current route is home, dashboard, login, or signup
  const isHomePage = location.pathname === '/';
  const isDashboardPage = location.pathname === '/dashboard';
  const isLoginPage = location.pathname === '/login';
  const isSignUpPage = location.pathname === '/signup';

  // Function to check token validity
  const isTokenValid = (token: string) => {
    try {
      const decoded: { exp: number } = jwtDecode(token); // Decode the token to get the expiration time
      const currentTime = Math.floor(Date.now() / 1000); // Get the current time in seconds
      return decoded.exp > currentTime; // Return true if the token is not expired
    } catch (error) {
      return false; // If decoding fails, treat the token as invalid
    }
  };

  // Check for JWT token and handle expiration
  useEffect(() => {
    const token = localStorage.getItem('token'); // Replace 'jwtToken' with your token key
    if (token && isTokenValid(token)) {
      setLoggedIn(true); // Token is valid, user is logged in
    } else {
      localStorage.removeItem('token'); // Token is invalid or expired, remove it
      setLoggedIn(false); // Set loggedIn to false
    }
  }, [location.pathname]); // Recheck token validity when the location changes

  // Handle logout
  const handleLogout = () => {
    localStorage.clear(); // Remove the token from localStorage
    setLoggedIn(false); // Update the state
    setIsProfileOpen(false); // Close the profile menu
    navigate('/login'); // Redirect to the login page
  };

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
            <span className="text-lg font-bold">Slayrs</span>
          </Link>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Conditional Home Icon */}
            {!isHomePage && !isDashboardPage && !isLoginPage && !isSignUpPage && (
              <Link
                to="/dashboard"
                className="flex items-center space-x-1 group text-white hover:text-purple-400 transition-colors"
              >
                <Home className="w-6 h-6" />
                <span className="text-lg"> Home</span>
              </Link>
            )}

            {/* Conditional Sign In Button for Home Page */}
            {isHomePage && !loggedIn ? (
              <Link
                to="/login"
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
              >
                Sign In
              </Link>
            ) : (
              loggedIn && (
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
      </div>
    </nav>
  );
};

export default Navbar;
