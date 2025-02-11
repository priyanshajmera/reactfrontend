import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, createLucideIcon, Upload, Wand2, Heart } from 'lucide-react';
import { wardrobe } from '@lucide/lab';

// Create a React component for the wardrobe icon
const WardrobeIcon = createLucideIcon('Wardrobe', wardrobe);

const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      name: 'Home',
      icon: Home,
      path: '/dashboard'
    },
    {
      name: 'Wardrobe',
      icon: WardrobeIcon,
      path: '/wardrobe'
    },
    {
      name: 'Upload',
      icon: Upload,
      path: '/upload'
    },
    {
      name: 'Generate',
      icon: Wand2,
      path: '/generate'
    },
    {
      name: 'Favorites',
      icon: Heart,
      path: '/favorites'
    }
  ];

  const isPublicPage = ['/', '/login', '/signup'].includes(location.pathname);

  if (isPublicPage) return null;

  return (
    <>
      {/* Spacer div to prevent content from being hidden behind the navbar */}
      <div className="h-20 md:hidden" />
      
      <div className="fixed bottom-0 left-0 right-0 z-[9999] safe-area-bottom md:hidden">
        <div className="bg-neutral-900 border-t border-white/10">
          <div className="flex items-center justify-between px-6 py-2 max-w-md mx-auto">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path;
              return (
                <motion.button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className="flex flex-col items-center relative"
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.name === 'Upload' ? (
                    <div className="bg-purple-600 p-4 rounded-full -mt-8 shadow-lg">
                      <tab.icon className="w-6 h-6 text-white" />
                    </div>
                  ) : (
                    <motion.div
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        color: isActive ? '#A855F7' : '#ffffff80'
                      }}
                    >
                      <tab.icon className="w-6 h-6" />
                    </motion.div>
                  )}
                  <span 
                    className={`text-xs mt-1 ${
                      tab.name === 'Upload' ? 'mt-3' : ''
                    } ${
                      isActive 
                        ? 'text-purple-400' 
                        : 'text-white/50'
                    }`}
                  >
                    {tab.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav; 
