import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Wardrobe from './pages/Wardrobe';
import GenerateOutfit from './pages/GenerateOutfit';
import OOTD from './pages/OOTD';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/profile';
import AuthGuard from './components/AuthGuard'; // Import AuthGuard
import OutfitDetails from './pages/OutfitDetails';

const App: React.FC = () => {
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
            }  />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
