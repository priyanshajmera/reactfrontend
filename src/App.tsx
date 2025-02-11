import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Wardrobe from './pages/Wardrobe';
import GenerateOutfit from './pages/GenerateOutfit';
import OOTD from './pages/OOTD';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/profile';
import AuthGuard from './components/AuthGuard';
import OutfitDetails from './pages/OutfitDetails';
import { StatusBar, Style } from '@capacitor/status-bar';
import Favorites from './pages/fav';

const App: React.FC = () => {
  useEffect(() => {
    const configureStatusBar = async () => {
      try {
        await StatusBar.setOverlaysWebView({ overlay: false });
        await StatusBar.setStyle({ style: Style.Dark }); // or Style.Light based on theme
      } catch (error) {
        console.log('StatusBar plugin not available');
      }
    };
    configureStatusBar();
  }, []);
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          />
          <Route
            path="/upload"
            element={
              <AuthGuard>
                <Upload />
              </AuthGuard>
            }
          />
          <Route
            path="/wardrobe"
            element={
              <AuthGuard>
                <Wardrobe />
              </AuthGuard>
            }
          />
          <Route
            path="/generate"
            element={
              <AuthGuard>
                <GenerateOutfit />
              </AuthGuard>
            }
          />
          <Route
            path="/ootd"
            element={
              <AuthGuard>
                <OOTD />
              </AuthGuard>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthGuard>
                <Profile />
              </AuthGuard>
            }
          />

          <Route path="/wardrobe/:id" element={
            <AuthGuard>
              <OutfitDetails />
            </AuthGuard>
          } />
          <Route path="/favorites" element={
            <AuthGuard>
              <Favorites />
            </AuthGuard>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
