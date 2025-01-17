import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, Heart, Briefcase } from 'lucide-react';

const GenerateOutfit = () => {
  return (
    <div className="page-container pt-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section-title"
      >
        Generate Your Perfect Outfit
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Outfit Parameters</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-white/80 mb-2">Time of Day</label>
              <div className="grid grid-cols-3 gap-4">
                {['Morning', 'Afternoon', 'Evening'].map((time) => (
                  <button
                    key={time}
                    className="glass p-3 text-center hover:bg-purple-500/20 transition-colors"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white/80 mb-2">Weather</label>
              <div className="grid grid-cols-2 gap-4">
                <button className="glass p-4 flex items-center justify-center space-x-2">
                  <Sun className="w-5 h-5" />
                  <span>Sunny</span>
                </button>
                <button className="glass p-4 flex items-center justify-center space-x-2">
                  <Cloud className="w-5 h-5" />
                  <span>Cloudy</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-white/80 mb-2">Occasion</label>
              <div className="grid grid-cols-2 gap-4">
                <button className="glass p-4 flex items-center justify-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Casual</span>
                </button>
                <button className="glass p-4 flex items-center justify-center space-x-2">
                  <Briefcase className="w-5 h-5" />
                  <span>Business</span>
                </button>
              </div>
            </div>

            <button className="btn-primary w-full">Generate Outfit</button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Generated Outfit</h2>
          <div className="aspect-square rounded-lg bg-white/5 flex items-center justify-center">
            <p className="text-white/50">Your outfit will appear here</p>
          </div>
          <div className="mt-6 space-y-4">
            <button className="btn-primary w-full">Save Outfit</button>
            <button className="glass w-full py-3">Try Another</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GenerateOutfit;