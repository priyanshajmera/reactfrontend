import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Stars, UploadCloud, Palette, Wand } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.5
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      bounce: 0.2
    }
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 0.5,
      type: "spring",
      bounce: 0.2
    }
  })
};

const Home = () => {
  const navigate = useNavigate();
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  const features = [
    {
      icon: UploadCloud,
      title: "Digital Wardrobe",
      description: "Upload your clothing items and create a personalized digital wardrobe.",
      color: "purple",
      heading: "Digitize Your Wardrobe",
      subheading: "Transform your physical closet into a smart digital collection"
    },
    {
      icon: Palette,
      title: "Style Analysis",
      description: "Get personalized style recommendations based on your preferences and wardrobe.",
      color: "pink",
      heading: "Discover Your Style",
      subheading: "Let AI analyze and enhance your personal fashion sense"
    },
    {
      icon: Wand,
      title: "AI Outfit Generation",
      description: "Let our AI create perfect outfit combinations for any occasion.",
      color: "purple",
      heading: "Perfect Outfits Await",
      subheading: "Ready to revolutionize your style with AI?"
    }
  ];

  const paginate = (newDirection: number, targetIndex?: number) => {
    if (targetIndex !== undefined) {
      const direction = targetIndex > currentFeatureIndex ? 1 : -1;
      setPage([page + direction, direction]);
      setCurrentFeatureIndex(targetIndex);
    } else {
      const nextIndex = (currentFeatureIndex + newDirection + features.length) % features.length;
      setPage([page + newDirection, newDirection]);
      setCurrentFeatureIndex(nextIndex);
    }
  };

  // Auto transition effect - only when not on last card
  useEffect(() => {
    if (currentFeatureIndex < features.length - 1) {
      const timer = setInterval(() => {
        paginate(1);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(timer);
    }
  }, [currentFeatureIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentFeatureIndex]);

  const handleDragEnd = (e: any, { offset, velocity }: { offset: { x: number; y: number }; velocity: { x: number; y: number } }) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      if (currentFeatureIndex < features.length - 1) {
        paginate(1);
      }
    } else if (swipe > swipeConfidenceThreshold) {
      if (currentFeatureIndex > 0) {
        paginate(-1);
      }
    }
  };

  return (
    <div className="page-container min-h-screen pt-16 sm:pt-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 sm:mb-16 mt-16"
      >
        <div className="relative inline-block max-w-[90%] sm:max-w-none">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute -top-6 sm:-top-8 -right-6 sm:-right-8 text-purple-400"
          >
            <Stars className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.h1
              key={`heading-${currentFeatureIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent px-2 sm:px-4"
            >
              {features[currentFeatureIndex].heading}
            </motion.h1>
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={`subheading-${currentFeatureIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm sm:text-base lg:text-lg text-white/80 max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-2 sm:px-4"
          >
            {features[currentFeatureIndex].subheading}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      <div className="relative h-[350px] sm:h-[400px] max-w-4xl mx-auto">
        <AnimatePresence
          initial={false}
          custom={direction}
          mode="wait"
        >
          <motion.div
            key={page}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute w-full h-full flex items-center justify-center px-4 sm:px-6 touch-pan-y"
          >
            <div className="w-full max-w-sm sm:max-w-md select-none">
              <motion.div 
                className="gradient-border card-hover flex flex-col h-full rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm cursor-grab active:cursor-grabbing"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-6 sm:p-8 flex-grow flex flex-col items-center">
                  <motion.div
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                    className={`w-12 h-12 sm:w-16 sm:h-16 ${
                      features[currentFeatureIndex].color === 'purple' ? 'text-purple-400' : 'text-pink-400'
                    } mb-4 sm:mb-6`}
                  >
                    {React.createElement(features[currentFeatureIndex].icon, {
                      size: "100%"
                    })}
                  </motion.div>
                  <motion.h3 
                    className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {features[currentFeatureIndex].title}
                  </motion.h3>
                  <motion.p 
                    className="text-sm sm:text-base text-white/70 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {features[currentFeatureIndex].description}
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots Navigation */}
        <div className="absolute -bottom-4 sm:bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-3 pb-4">
          {features.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-300 ${
                currentFeatureIndex === index 
                  ? 'bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg shadow-purple-500/25' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              onClick={() => paginate(0, index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              initial={false}
              animate={{
                scale: currentFeatureIndex === index ? 1.2 : 1,
                transition: {
                  duration: 0.3,
                  ease: "easeInOut"
                }
              }}
              aria-label={`Go to slide ${index + 1}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  paginate(0, index);
                }
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 sm:mt-8 text-center"
      >
        {currentFeatureIndex === features.length - 1 && (
          <motion.button 
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Begin Your Style Journey
          </motion.button>
        )}
      </motion.div>

      {/* Background Elements */}
      <motion.div 
        className="fixed -z-10 top-1/4 left-1/4 w-24 sm:w-32 lg:w-48 h-24 sm:h-32 lg:h-48 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="fixed -z-10 bottom-1/4 right-1/4 w-24 sm:w-32 lg:w-48 h-24 sm:h-32 lg:h-48 bg-pink-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />
    </div>
  );
};

export default Home;
