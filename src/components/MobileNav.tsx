import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ShoppingBag, Upload, Wand2, Heart } from 'lucide-react';

const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      name: 'Wardrobe',
      icon: ShoppingBag,
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
    <div className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom md:hidden">
      <div className="bg-neutral-900/95 backdrop-blur-md border-t border-white/10">
        <div className="flex items-center justify-around px-4 py-2">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <motion.button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className="flex flex-col items-center py-1 px-3"
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    color: isActive ? '#A855F7' : '#ffffff80'
                  }}
                >
                  <tab.icon className="w-6 h-6" />
                </motion.div>
                <span 
                  className={`text-xs mt-1 ${
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
  );
};

export default MobileNav; 
