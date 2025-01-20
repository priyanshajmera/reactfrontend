import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createLucideIcon, Upload, Wand2, ChevronRight, ChevronLeft } from 'lucide-react';
import { wardrobe } from '@lucide/lab';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

// Create a React component for the wardrobe icon
const WardrobeIcon = createLucideIcon('Wardrobe', wardrobe);
const username = JSON.parse(localStorage.getItem('userInfo')!)?.username || 'User';

function toProperCase(name) {
  if (!name) return ''; // Handle empty or undefined input
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

const ConvertedUsername = toProperCase(username);

const Dashboard = () => {
  const features = [
    {
      title: 'Add to Wardrobe',
      description: 'Add your outfits effortlessly and digitize your wardrobe with just a few clicks.',
      icon: Upload,
      link: '/upload',
      color: 'pink',
    },
    {
      title: 'My Wardrobe',
      description: 'Browse and manage your wardrobe by categories.',
      icon: WardrobeIcon,
      link: '/wardrobe',
      color: 'purple',
    },
    {
      title: 'Generate Outfit',
      description: 'Create perfect outfit combinations with AI',
      icon: Wand2,
      link: '/generate',
      color: 'pink',
    },
  ];

  const scrollContainerRef = useRef(null);
  const [showArrows, setShowArrows] = useState({ left: false, right: true });
  const [showFinalText, setShowFinalText] = useState(false); // State to control final text display

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      setShowArrows({
        left: container.scrollLeft > 0,
        right: container.scrollLeft < container.scrollWidth - container.clientWidth,
      });
    };

    const container = scrollContainerRef.current;
    container.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollBy = (offset) => {
    scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className="page-container pt-24">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Hello,{' '}
          {!showFinalText ? (
            <span className="text-purple-400">
              <Typewriter
                words={[ConvertedUsername]}
                cursorStyle="_"
                typeSpeed={100}
                deleteSpeed={50}
              />
            </span>
          ) : (
            <span className="text-purple-400">{ConvertedUsername}</span>
          )}
        </h1>
        <p className="text-white/60">Let's create your perfect look for today</p>
      </motion.div>

      {/* Feature Cards */}
      <div className="relative">
        {showArrows.left && (
          <button
            className="absolute left-[-0.25rem] top-1/2 transform -translate-y-1/2 glass bg-neutral-800/70 backdrop-blur-md border border-white/10 p-3 rounded-full z-20 hover:bg-neutral-800/90 transition"
            onClick={() => scrollBy(-300)}
          >
            <ChevronLeft className="text-white w-6 h-6" />
          </button>
        )}
        {showArrows.right && (
          <button
            className="absolute right-[-0.25rem] top-1/2 transform -translate-y-1/2 glass bg-neutral-800/70 backdrop-blur-md border border-white/10 p-3 rounded-full z-20 hover:bg-neutral-800/90 transition"
            onClick={() => scrollBy(300)}
          >
            <ChevronRight className="text-white w-6 h-6" />
          </button>
        )}

        <div ref={scrollContainerRef} className="overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide">
          <div className="flex space-x-6 pt-6 sm:pt-8 md:pt-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-80 flex-shrink-0"
              >
                <Link
                  to={feature.link}
                  className="glass h-full flex flex-col p-6 hover:scale-[1.02] transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl bg-${feature.color}-500/20 flex items-center justify-center mb-6`}>
                    <feature.icon className={`w-8 h-8 text-${feature.color}-400`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-white/60 mb-6 flex-grow">{feature.description}</p>
                  <div className="flex items-center text-purple-400 group">
                    <span className="group-hover:mr-2 transition-all">Explore</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
