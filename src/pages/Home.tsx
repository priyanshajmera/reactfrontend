import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Upload, Palette, Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate=useNavigate();
  return (
    <div className="page-container pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <div className="relative inline-block">
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
            className="absolute -top-8 sm:-top-12 -right-8 sm:-right-12 text-purple-400"
          >
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent px-4">
            Elevate Your Style with AI
          </h1>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed px-4"
        >
          Experience personalized fashion recommendations powered by artificial intelligence.
          Upload your wardrobe and let our AI stylist create stunning outfits just for you.
        </motion.p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-16 px-4">
        {[
          {
            icon: Upload,
            title: "Digital Wardrobe",
            description: "Upload your clothing items and create a personalized digital wardrobe.",
            color: "purple"
          },
          {
            icon: Palette,
            title: "Style Analysis",
            description: "Get personalized style recommendations based on your preferences and wardrobe.",
            color: "pink"
          },
          {
            icon: Wand2,
            title: "AI Outfit Generation",
            description: "Let our AI create perfect outfit combinations for any occasion.",
            color: "purple"
          }
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.2 }}
            className="gradient-border card-hover flex flex-col h-full"
          >
            <div className="p-6 sm:p-8 flex-grow flex flex-col items-center">
              <feature.icon className={`w-10 h-10 sm:w-12 sm:h-12 ${feature.color === 'purple' ? 'text-purple-400' : 'text-pink-400'} mb-4`} />
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center">{feature.title}</h3>
              <p className="text-white/70 text-sm sm:text-base text-center">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 sm:mt-16 text-center px-4"
      >
        <button className="btn-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto" onClick={()=>navigate('/dashboard')}>
         
          Start Your Style Journey
        </button>
      </motion.div>

      {/* Floating elements */}
      <div className="fixed -z-10 top-1/4 left-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="fixed -z-10 bottom-1/4 right-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-pink-500/20 rounded-full blur-3xl" />
    </div>
  );
};

export default Home;
