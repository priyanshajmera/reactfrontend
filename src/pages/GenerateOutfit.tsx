import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, Heart, Briefcase, ShoppingBag, Building, PartyPopper, Thermometer, Umbrella, Snowflake, Shirt, Star, Check, X } from 'lucide-react';

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
              <label className="block text-white/80 mb-2">Occasion</label>
              <div className="grid grid-cols-3 gap-4">
                {[{ label: 'Casual', icon: ShoppingBag }, { label: 'Work', icon: Building }, { label: 'Party', icon: PartyPopper }].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    className="glass p-3 flex items-center justify-center space-x-2 hover:bg-purple-500/20 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white/80 mb-2">Weather</label>
              <div className="grid grid-cols-3 gap-4">
                {[{ label: 'Hot', icon: Thermometer }, { label: 'Rainy', icon: Umbrella }, { label: 'Cold', icon: Snowflake }].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    className="glass p-3 flex items-center justify-center space-x-2 hover:bg-purple-500/20 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white/80 mb-2">Style</label>
              <div className="grid grid-cols-3 gap-4">
                {[{ label: 'Classic', icon: Shirt }, { label: 'Minimalistic', icon: Heart }, { label: 'Trendy', icon: Star }].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    className="glass p-3 flex items-center justify-center space-x-2 hover:bg-purple-500/20 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white/80 mb-2">Fit</label>
              <div className="grid grid-cols-3 gap-4">
                {[{ label: 'Loose', icon: Shirt }, { label: 'Fitted', icon: Heart }, { label: 'Relaxed', icon: ShoppingBag }].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    className="glass p-3 flex items-center justify-center space-x-2 hover:bg-purple-500/20 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white/80 mb-2">Time of Day</label>
              <div className="grid grid-cols-2 gap-4">
                {[{ label: 'Day', icon: Sun }, { label: 'Night', icon: Cloud }].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    className="glass p-3 flex items-center justify-center space-x-2 hover:bg-purple-500/20 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white/80 mb-2">Layering</label>
              <div className="grid grid-cols-2 gap-4">
                {[{ label: 'Yes', icon: Check }, { label: 'No', icon: X }].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    className="glass p-3 flex items-center justify-center space-x-2 hover:bg-purple-500/20 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                ))}
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
